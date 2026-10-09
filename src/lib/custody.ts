/**
 * Police, the EFCC and custody on the player's device. The server is the judge: it decides who is held and for how long, and every
 * action here is a request to it. What lives here is what the player sees and feels: the arrest (the fade, the cell), the lockdown
 * while held, the release, the cases list, and the plain-words answers to every button.
 * Spec: justice.md sections 8, 9 and 13, with the changes in PLAN-social.md.
 */
import type { CaseCard, CaseKind, CaseReason, CustodyView, S2C } from "./protocol";
import type { Place } from "./places";
import { PLACES, doorOf } from "./places";
import type { Payee, Recent, ReportBody, ReportResult } from "./custodyRules";
import { REASONS, RULES, STATIONS } from "./custodyRules";
import { cellSpawnOf, interiorKey } from "./interiors";
import { enterInterior, forceExit, loadLayout } from "./interiorRuntime";
import { cancelDeck } from "./towerRuntime";
import { me } from "./playerState";
import { naira } from "./plots";
import { blockers } from "./services";
import { api, errorText, serverMode, type ActionResult } from "./socialApi";
import { flagOn } from "./socialState";
import { useGame } from "./store";
import { voice } from "./voice";

/** A friend's request to bail someone out (S2C bailAsk). */
export type BailAsk = { caseId: number; pid: string; name: string; reason: CaseReason; bail: number; releaseAt: number };
/** A friend who is in custody (GET /api/custody/held or a bailAsk). */
export type HeldEntry = { caseId: number; bail: number; releaseAt: number; reason: CaseReason };
/** What the ArrestOverlay shows (store.arrestFlash). */
export type ArrestFlash = { reason: CaseReason; by: string; place: string };

// a held player cannot use place actions or desks (except the bail desk): services.ts asks every registered blocker
blockers.push(() => (useGame.getState().custody ? "You are in custody." : null));

const DEMO_TEXT = "Police work when you play online with other people.";
const NOT_OPEN = "The police are not open yet.";

/** The server has spoken to this device since it loaded (so its clock and its word on custody are known). */
let heard = false;
/** A saved custody has been put back in force this session. */
let restored = false;
/** When the last custody message came over the socket (a slow answer from the REST call that started before it must not undo it). */
let lastPush = 0;

/* ------------------------------------------------------ the messages ------------------------------------------------------ */

/** The S2C messages socialNet forwards here. */
export type CustodyMessage = Extract<S2C, { t: "custody" | "caseUpdate" | "bailAsk" | "bailAskEnd" | "arrestNote" }>;
export function handleCustodyMessage(m: CustodyMessage): void {
  switch (m.t) {
    case "custody":
      lastPush = Date.now();
      applyCustody(m.c, m.now);
      break;
    case "caseUpdate":
      applyCaseUpdate(m.c, m.now);
      break;
    case "bailAsk": {
      useGame.setState((st) => ({
        bailAsks: [...st.bailAsks.filter((a) => a.caseId !== m.caseId), { caseId: m.caseId, pid: m.pid, name: m.name, reason: m.reason, bail: m.bail, releaseAt: m.releaseAt }],
        heldFriends: { ...st.heldFriends, [m.pid]: { caseId: m.caseId, bail: m.bail, releaseAt: m.releaseAt, reason: m.reason } },
      }));
      break;
    }
    case "bailAskEnd": {
      const s = useGame.getState();
      const gone = s.bailAsks.find((a) => a.caseId === m.caseId);
      useGame.setState((st) => ({
        bailAsks: st.bailAsks.filter((a) => a.caseId !== m.caseId),
        heldFriends: Object.fromEntries(Object.entries(st.heldFriends).filter(([, h]) => h.caseId !== m.caseId)),
      }));
      if (gone && m.why === "paid" && m.by) s.toast(`${m.by} paid ${gone.name}'s bail.`, "info");
      break;
    }
    case "arrestNote":
      useGame.getState().toast(`${m.name} was arrested: ${REASONS[m.reason]?.label ?? "a report"}.`, "info");
      break;
  }
}

function setSkew(serverNowMs: number | undefined) {
  if (serverNowMs === undefined || !Number.isFinite(serverNowMs)) return;
  heard = true;
  useGame.setState({ clockSkew: serverNowMs - Date.now() });
}

/** A case changed: keep the list, and say so in plain words. */
function applyCaseUpdate(card: CaseCard, serverNowMs: number): void {
  setSkew(serverNowMs);
  const before = useGame.getState().cases.find((c) => c.id === card.id);
  upsertCase(card);
  if (before?.status === card.status) return;
  const toast = useGame.getState().toast;
  const other = card.other.name;
  const reason = REASONS[card.reason]?.label.toLowerCase() ?? "a report";
  if (card.role === "reporter") {
    if (card.status === "held") toast(`${other} is in custody. Your case stands.`, "good");
    else if (card.status === "bailed") toast(`${other} was bailed out${card.paidBy ? ` by ${card.paidBy}` : ""}. Your fee of ${naira(card.fee)} was refunded.`, "info");
    else if (card.status === "served") toast(`${other} has served their time. Your fee of ${naira(card.fee)} was refunded.`, "info");
    else if (card.status === "settled") toast(`${other} settled the case. Your fee of ${naira(card.fee)} was refunded.`, "good");
    else if (card.status === "expired") toast(`Your case against ${other} lapsed because it was not booked in time. The fee of ${naira(card.fee)} was kept.`, "bad");
    else if (card.status === "merged") toast(`Your report against ${other} was joined to another one. Your fee was refunded.`, "info");
    else if (card.status === "dismissed") toast(`A moderator dismissed your case against ${other}.`, "bad");
  } else {
    if (card.status === "filed") toast(`${other} reported you for ${reason}. ${card.fine > 0 ? `You can pay ${naira(card.fine)} at a police station to settle it, or wait and see.` : "Wait and see."}`, "bad");
    else if (card.status === "bailed") toast(card.paidBy && card.paidBy !== "You" ? `Bail paid by ${card.paidBy}. You are free.` : "Bail paid. You are free.", "good");
    else if (card.status === "served") toast("You have served your time. You are free.", "good");
    else if (card.status === "settled") toast("The case against you is settled.", "good");
    else if (card.status === "withdrawn") toast(`${other} dropped the charges. You are free.`, "good");
    else if (card.status === "expired") toast(`The report from ${other} lapsed.`, "info");
    else if (card.status === "dismissed") toast("A moderator dismissed the case. You are free.", "good");
  }
}

function upsertCase(card: CaseCard): void {
  useGame.setState((st) => ({ cases: [card, ...st.cases.filter((c) => c.id !== card.id)].sort((a, b) => b.id - a.id).slice(0, 30) }));
}

/* --------------------------------------------------- opening and housekeeping --------------------------------------------------- */

/** socialNet calls this when the socket opens and the server says custody is on: the cases, the custody state, who is held. */
export async function onCustodySocketOpen(): Promise<void> {
  if (!serverMode()) return;
  await loadCases();
  void loadHeld();
}

/** Put a saved custody back in force, so a reload is not a way out. Called every second until it has been done once (it needs a profile). */
export function restoreCustody(): void {
  const s = useGame.getState();
  if (restored || !s.profile) return;
  restored = true;
  const view = s.custody;
  if (!view) return;
  lockdown();
  goToPrison(view);
}

/** The server never answered and the stay is over by this device's clock (plus a minute's grace): let the player out. */
export function custodyTick(): void {
  const s = useGame.getState();
  restoreCustody();
  if (s.custody && !heard && Date.now() + s.clockSkew > s.custody.releaseAt + 60_000) applyCustody(null);
}

/** Dev helpers, exposed on window.__omo.custody in development (e.g. apply a forged custody view to test the lockdown). */
export const devCustody: Record<string, unknown> = {
  apply: (v: CustodyView | null) => applyCustody(v, Date.now()),
};

export const isHeld = (): boolean => !!useGame.getState().custody;
export function custodyBlocks(): boolean {
  if (!isHeld()) return false;
  useGame.getState().toast("You are in custody.", "bad");
  return true;
}

/* ------------------------------------------------------ arrest and release ------------------------------------------------------ */

/** Stop everything the player was doing: no work, rides, driving, calls to the city, sitting. */
function lockdown(): void {
  const g = useGame.getState();
  g.cancelBusy();
  // a climb in progress is dropped, and a player on the deck is put back on the ground with the camera as it was
  cancelDeck();
  useGame.setState({ selected: null, computer: false, flight: null, deck: false, driving: false, ride: null, knocks: [], serves: [] });
  if (!g.call.room && g.voice.room) voice.leave();
  void import("./net").then(({ net }) => net.sit(null));
  me.use = null;
  me.path = [];
  me.goalPlace = null;
  me.pendingUse = null;
  me.pendingExit = false;
}

const prisonPlace = (view: CustodyView): Place | undefined => PLACES.find((p) => p.id === view.place);

/** Walk the player into their cell. A flight in the air waits (up to 30 seconds). With no prison to go to they stay where they are, locked. */
function goToPrison(view: CustodyView, tries = 0): void {
  const s = useGame.getState();
  if (s.custody?.caseId !== view.caseId) return; // let out in the meantime
  if (s.flight && tries < 30) {
    setTimeout(() => goToPrison(view, tries + 1), 1000);
    return;
  }
  const place = prisonPlace(view);
  const ref = { kind: "place" as const, id: view.place };
  if (s.interior && interiorKey(s.interior) === interiorKey(ref)) return;
  const layout = loadLayout(ref);
  if (!place || !layout) return;
  enterInterior(ref, { force: true, spawn: cellSpawnOf(layout, view.cell), returnTo: doorOf(place) });
}

/** The server put this player in custody (or told them again after a reconnect). */
export function applyCustody(view: CustodyView | null, serverNowMs?: number, opts: { silent?: boolean } = {}): void {
  setSkew(serverNowMs);
  const s = useGame.getState();
  if (!view) {
    if (s.custody) releaseFromCustody();
    return;
  }
  const fresh = !s.custody || s.custody.caseId !== view.caseId;
  useGame.setState({ custody: view });
  if (!fresh) return; // the same case again (an ask went out): nothing to redo
  restored = true;
  lockdown();
  if (!opts.silent) {
    useGame.setState({ arrestFlash: { reason: view.reason, by: view.by, place: view.place } });
    setTimeout(() => {
      if (useGame.getState().arrestFlash?.by === view.by) useGame.setState({ arrestFlash: null });
    }, 2400);
  }
  goToPrison(view);
}

/** Let the player out: the state is cleared first (so the guards open), then they walk out of the prison door. */
export function releaseFromCustody(): void {
  const s = useGame.getState();
  const view = s.custody;
  if (!view) return;
  useGame.setState({ custody: null, bailAsks: [], arrestFlash: null });
  const place = prisonPlace(view);
  if (place) me.worldReturn = doorOf(place);
  if (s.interior?.kind === "place" && s.interior.id === view.place) forceExit();
}

export const timeLeft = (c: CustodyView, now: number, skew: number): number => Math.max(0, c.releaseAt - (now + skew));

/* ------------------------------------------------------------ words ------------------------------------------------------------ */

/** The nearest station of this kind to where the player is standing (outdoors) or its first one. */
export const nearestStation = (kind: CaseKind): Place | null => {
  const list = STATIONS[kind].map((id) => PLACES.find((p) => p.id === id)).filter((p): p is Place => !!p);
  if (!list.length) return null;
  let best = list[0];
  let bestD = Infinity;
  for (const p of list) {
    const d = Math.hypot(p.pos[0] - me.x, p.pos[1] - me.z);
    if (d < bestD) {
      best = p;
      bestD = d;
    }
  }
  return best;
};

/** One line for a case, as its owner sees it. */
export function describeCase(c: CaseCard): string {
  const why = REASONS[c.reason]?.label ?? "a report";
  const state: Record<string, string> = { filed: "waiting to be booked", held: "in custody", bailed: "bailed out", served: "time served", settled: "settled", withdrawn: "withdrawn", expired: "lapsed", merged: "joined to another case", dismissed: "dismissed" };
  return c.role === "reporter" ? `Case #${c.id} against ${c.other.name}: ${why}, ${state[c.status] ?? c.status}` : `Case #${c.id} by ${c.other.name}: ${why}, ${state[c.status] ?? c.status}`;
}

/** Where someone is, in words. The raw room strings ("in:place:prison") never reach a player. */
export function roomLabel(room: string): string {
  if (!room || room === "streets") return "Out in the city";
  if (room.startsWith("call:")) return "On a call";
  const idOf = (prefix: string) => room.slice(prefix.length);
  if (room.startsWith("in:place:") || room.startsWith("place:")) {
    const id = room.startsWith("in:place:") ? idOf("in:place:") : idOf("place:");
    const p = PLACES.find((x) => x.id === id);
    return p ? (id === "prison" ? "In custody" : `At ${p.name}`) : "Indoors";
  }
  if (room.startsWith("in:home:") || room.startsWith("home:")) return "At home";
  if (room.startsWith("deck:")) return "On Bower's Tower";
  if (room.startsWith("street:")) return "Out in the city";
  return room.replace(/^in:/, "").replace(/[-:]/g, " ");
}

/* ------------------------------------------------------------ actions ------------------------------------------------------------ */

type Done = ActionResult;
const open = (): Done | null => (!serverMode() ? { ok: false, message: DEMO_TEXT } : !flagOn("custody") ? { ok: false, message: NOT_OPEN } : null);

export async function loadCases(): Promise<void> {
  if (open()) return;
  const asked = Date.now();
  const r = await api<import("./custodyRules").MeResult>("GET", "/api/custody/me");
  if (!r.ok || !r.data || !("custody" in r.data)) return;
  setSkew(r.data.now);
  useGame.setState({ cases: r.data.cases, policeOpen: r.data.enabled, efccOpen: r.data.enabled && r.data.efcc });
  // the server's word on custody replaces what was saved, unless something newer came over the socket while this was on its way
  if (r.data.custody || lastPush < asked) applyCustody(r.data.custody, r.data.now, { silent: true });
}

export async function loadHeld(): Promise<void> {
  if (open()) return;
  const r = await api<{ held: { caseId: number; pid: string; bail: number; releaseAt: number; reason: CaseReason }[] }>("GET", "/api/custody/held");
  if (!r.ok || !r.data?.held) return;
  useGame.setState({ heldFriends: Object.fromEntries(r.data.held.map((h) => [h.pid, { caseId: h.caseId, bail: h.bail, releaseAt: h.releaseAt, reason: h.reason }])) });
}

export async function loadRecent(): Promise<Recent[]> {
  if (open()) return [];
  const r = await api<{ people: Recent[] }>("GET", "/api/custody/recent");
  return r.ok && r.data?.people ? r.data.people : [];
}

export async function loadPayees(): Promise<Payee[]> {
  if (open() || !useGame.getState().efccOpen) return [];
  const r = await api<{ payees: Payee[] }>("GET", "/api/custody/payees");
  return r.ok && r.data?.payees ? r.data.payees : [];
}

/** File a report. The fee is taken by the server (a debit arrives); the case then waits at a counter to be booked. */
export async function fileReport(accused: string, reason: CaseReason, via: ReportBody["via"] = "player"): Promise<Done & { card?: CaseCard }> {
  const no = open();
  if (no) return no;
  const info = REASONS[reason];
  if (!info) return { ok: false, message: "Choose a reason." };
  const s = useGame.getState();
  if (s.custody) return { ok: false, message: "You cannot report from custody." };
  if (info.kind === "efcc" && !s.efccOpen) return { ok: false, message: "Money cases are not open yet." };
  if (s.money < info.fee) return { ok: false, message: `Filing this report costs ${naira(info.fee)}. You have ${naira(s.money)}.` };
  const r = await api<ReportResult>("POST", "/api/custody/report", { accused, reason, via });
  if (!r.ok || !r.data) return { ok: false, message: errorText(r, "Could not file the report.") };
  const d = r.data;
  if (d.referred) return { ok: true, message: "That person has been in custody too often today, so a moderator will look at your report instead. You were not charged." };
  upsertCase(d.case);
  const name = d.case.other.name;
  if (d.held) return { ok: true, message: `${name} was arrested. Case #${d.case.id} stands.`, card: d.case };
  const where = nearestStation(d.case.kind);
  return { ok: true, message: `Case #${d.case.id} filed against ${name}. Book it at ${where ? where.name : "a station"} within ${Math.round(RULES.confirmWindowMs / 60_000)} minutes or it lapses.`, card: d.case };
}

async function act(path: string, body: unknown, fallback: string, done: (d: { case?: CaseCard } & Record<string, unknown>) => string): Promise<Done> {
  const no = open();
  if (no) return no;
  const r = await api<{ case?: CaseCard } & Record<string, unknown>>("POST", path, body);
  if (!r.ok || !r.data) return { ok: false, message: errorText(r, fallback) };
  if (r.data.case) upsertCase(r.data.case);
  return { ok: true, message: done(r.data) };
}

/** Book a filed case at a counter: the accused is taken into custody. */
export const confirmCase = (caseId: number): Promise<Done> => act("/api/custody/confirm", { caseId }, "Could not book that case.", (d) => `${d.case?.other.name ?? "They"} ${d.case?.other.name ? "is" : "are"} now in custody.`);
export const withdrawCase = (caseId: number): Promise<Done> =>
  act("/api/custody/withdraw", { caseId }, "Could not drop that case.", (d) => (typeof d.refund === "number" && d.refund > 0 ? `Charges dropped. Your fee of ${naira(d.refund)} is coming back.` : "Charges dropped. The fee is not refunded this time."));

export async function payFine(caseId: number): Promise<Done> {
  const card = useGame.getState().cases.find((c) => c.id === caseId);
  if (card && useGame.getState().money < card.fine) return { ok: false, message: `The fine is ${naira(card.fine)}. You have ${naira(useGame.getState().money)}.` };
  return act("/api/custody/fine", { caseId }, "Could not pay that fine.", () => "Fine paid. The case is settled.");
}

export async function payBail(caseId: number): Promise<Done> {
  const s = useGame.getState();
  const bail = s.custody?.caseId === caseId ? s.custody.bail : (Object.values(s.heldFriends).find((h) => h.caseId === caseId)?.bail ?? s.bailAsks.find((a) => a.caseId === caseId)?.bail);
  if (bail !== undefined && s.money < bail) return { ok: false, message: `Bail is ${naira(bail)}. You have ${naira(s.money)}.${s.custody ? " Ask your friends, or borrow from the bank." : ""}` };
  return act("/api/custody/bail", { caseId }, "Could not pay that bail.", (d) => (d.by === "self" ? "Bail paid. You are free." : `Bail paid: ${naira(Number(d.amount ?? 0))}.`));
}

/** The prisoner asks their friends to pay their bail. */
export async function askFriends(): Promise<Done> {
  const no = open();
  if (no) return no;
  const r = await api<{ notified: number; offline: number; nextAskAt: number }>("POST", "/api/custody/ask", {});
  if (!r.ok || !r.data) return { ok: false, message: errorText(r, "Could not ask your friends.") };
  useGame.setState((st) => (st.custody ? { custody: { ...st.custody, asks: st.custody.asks + 1, nextAskAt: r.data!.nextAskAt } } : st));
  const { notified, offline } = r.data;
  if (!notified && !offline) return { ok: true, message: "You have no friends to ask yet. Add some, or borrow from the bank." };
  return { ok: true, message: `Asked ${notified} friend${notified === 1 ? "" : "s"}${offline ? ` (${offline} offline: they will see it when they log in)` : ""}.` };
}
