import {
  EMERGENCY, ESCALATE_SECS, FALSE_ALARM_COOLDOWN_MS, FEES, HOSPITALS, ILLNESSES, ILLNESS_IDS, IMMUNE_SECS, SYMPTOMS,
  cardNumber, quoteCase, type Admission, type Cause, type IllnessId, type Line, type Severity, type Visit,
} from "./health";
import { S } from "./furniture";
import { rt, walkToFurn } from "./interiorRuntime";
import { remoteSits } from "./playerState";
import type { ActionDef, Needs } from "./places";
import { naira } from "./plots";
import { useGame } from "./store";
import { gameMinutes } from "./time";

/** Store glue for illness, tickets and treatment. The rules and prices are in health.ts; the desk screens are services/HospitalDesk.tsx. */
export const isHospital = (placeId: string | null | undefined): boolean => placeId === "uch" || placeId === "adeoyo";

/** Not saved: the risk meter, the seconds ill, how long you stay healthy for, and which ticket has been announced. */
const clk = { risk: 0, illSec: 0, immune: IMMUNE_SECS.session as number, called: "" };

/** The normal rate each need falls at (store.ts tick), so an illness can add a fraction of it. */
const BASE: Record<keyof Needs, number> = { hunger: 0.12, energy: 0.08, fun: 0.07, social: 0.05, bladder: 0.09, hygiene: 0.035 };
const clamp = (n: number) => Math.max(0, Math.min(100, n));
const hourNow = () => gameMinutes(Date.now(), useGame.getState().clockOverride) / 60;
const money = (n: number) => naira(n);

const charge = (amount: number): string | null => {
  const s = useGame.getState();
  if (s.money < amount) return `You need ${money(amount)}.`;
  useGame.setState({ money: s.money - amount });
  return null;
};

const addVisit = (v: Omit<Visit, "id"> & { id?: string }) =>
  useGame.setState((s) => {
    const seq = s.medical.seq + 1;
    const visit: Visit = { ...v, id: v.id ?? `v${seq}` };
    return { medical: { ...s.medical, seq, history: [visit, ...s.medical.history].slice(0, 30) } };
  });

/* ------------------------------------------------------------ the desk ------------------------------------------------------------ */

/** New patient registration: one card works at both hospitals. */
export function registerPatient(place: string): string | null {
  const s = useGame.getState();
  if (!s.profile) return "Sign in first.";
  if (s.medical.card) return "You are already registered.";
  const err = charge(FEES.register);
  if (err) return err;
  const now = Date.now();
  useGame.setState((st) => ({ medical: { ...st.medical, card: { no: cardNumber(st.profile!.id, now), since: now, place } } }));
  addVisit({ at: now, place, kind: "registration", illness: null, severity: null, lines: [{ label: "Registration", amount: FEES.register }], total: FEES.register, note: "Health card issued." });
  useGame.getState().recordStat("checkins");
  useGame.getState().toast(`Registered. Your health card is ${useGame.getState().medical.card?.no}.`, "good");
  return null;
}

/** What the case would cost right now (recomputed at charge time, so a stale screen never underpays). */
export function quoteNow(place: string) {
  const s = useGame.getState();
  const i = s.medical.illness;
  if (!i) return null;
  return quoteCase(i, { hour: hourNow(), place, staff: false, nurse: s.background?.job === "nurse" });
}

/** Pay the quote and take a ticket for a bed. */
export function bookCase(place: string): string | null {
  const s = useGame.getState();
  if (!s.medical.card) return "Register as a patient first.";
  if (!s.medical.illness) return "You do not seem ill.";
  if (s.medical.admission) return `You already have ticket ${s.medical.admission.ticket}.`;
  const q = quoteNow(place)!;
  const err = charge(q.total);
  if (err) return err;
  const now = Date.now();
  const i = s.medical.illness;
  const seq = s.medical.seq + 1;
  const adm: Admission = { id: `a${seq}`, ticket: `Q-${String(seq).padStart(3, "0")}`, place, kind: "case", illness: i.id, severity: i.severity, lines: q.lines, total: q.total, issuedAt: now, calledAt: now + q.waitSecs * 1000, byAmbulance: false };
  useGame.setState((st) => ({ medical: { ...st.medical, seq, admission: adm } }));
  useGame.getState().toast(`Ticket ${adm.ticket}. Take a seat: you will be called in about ${Math.round(q.waitSecs)} seconds.`, "info");
  return null;
}

/** Lab tests when what you described does not fit: the true diagnosis comes back. */
export function runLab(place: string): string | null {
  const s = useGame.getState();
  if (!s.medical.illness) return "You do not seem ill.";
  const err = charge(FEES.lab);
  if (err) return err;
  const def = ILLNESSES[s.medical.illness.id];
  addVisit({ at: Date.now(), place, kind: "lab", illness: def.id, severity: s.medical.illness.severity, lines: [{ label: "Lab tests", amount: FEES.lab }], total: FEES.lab, note: `Tests show ${def.name}.` });
  return null;
}

/** What the routine check-up costs you right now: the check-up gives a little food, so a governor with the food policy makes it 20% cheaper (runAction applies that). */
export const checkupPrice = (): number => (useGame.getState().election?.governor?.policy === "food" ? Math.round(FEES.checkup * 0.8) : FEES.checkup);

/** The routine check-up for a healthy visitor: the old paid action, with a receipt of what was really paid. */
export function routineCheckup(place: string): string | null {
  const a: ActionDef = { id: "checkup", label: "Routine check-up", secs: 6, cost: FEES.checkup, gain: { energy: 15, fun: 5, hunger: 10 } };
  const before = useGame.getState().money;
  const err = useGame.getState().runAction(a, {
    onDone: () => {
      addVisit({ at: Date.now(), place, kind: "checkup", illness: null, severity: null, lines: [{ label: "Routine check-up", amount: paid }], total: paid, note: "Nothing found." });
      useGame.getState().recordStat("treated");
    },
  });
  // runAction takes the money straight away, so the difference is the price actually charged
  const paid = err ? 0 : before - useGame.getState().money;
  return err;
}

/** Seconds until the emergency desk will see a false alarm again, or 0. */
export const falseAlarmWaitSecs = (now: number) => Math.max(0, Math.ceil((useGame.getState().medical.lastFalseAlarmAt + FALSE_ALARM_COOLDOWN_MS - now) / 1000));

/** The emergency desk: no queue, any condition, no card. If nothing is wrong you pay a small triage fee and cannot try again for 3 minutes. */
export function admitEmergency(place: string): string | null {
  const s = useGame.getState();
  const now = Date.now();
  const wait = falseAlarmWaitSecs(now);
  if (wait > 0) return `The emergency desk will see you again in ${Math.floor(wait / 60)}:${String(wait % 60).padStart(2, "0")}.`;
  if (s.medical.admission) return `You already have ticket ${s.medical.admission.ticket}: go to a bed.`;
  const i = s.medical.illness;
  if (!i) {
    const err = charge(FEES.falseAlarm);
    if (err) return err;
    addVisit({ at: now, place, kind: "falsealarm", illness: null, severity: null, lines: [{ label: "Triage fee", amount: FEES.falseAlarm }], total: FEES.falseAlarm, note: "Nothing life-threatening found." });
    useGame.setState((st) => ({ medical: { ...st.medical, lastFalseAlarmAt: now } }));
    useGame.getState().toast(`Nothing life-threatening found. ${money(FEES.falseAlarm)} triage fee.`, "info");
    return null;
  }
  const err = charge(FEES.emergency);
  if (err) return err;
  const seq = s.medical.seq + 1;
  const lines: Line[] = [{ label: "Emergency admission", amount: FEES.emergency }];
  const adm: Admission = { id: `a${seq}`, ticket: `E-${String(seq).padStart(3, "0")}`, place, kind: "emergency", illness: i.id, severity: i.severity, lines, total: FEES.emergency, issuedAt: now, calledAt: now, byAmbulance: false };
  useGame.setState((st) => ({ medical: { ...st.medical, seq, admission: adm } }));
  useGame.getState().toast("Admitted. Lie on any free bed: no queue.", "good");
  return null;
}

export function cancelTicket(): void {
  const s = useGame.getState();
  if (!s.medical.admission) return;
  useGame.setState((st) => ({ medical: { ...st.medical, admission: null } }));
  s.toast("Ticket cancelled. There is no refund.", "info");
}

/* ------------------------------------------------------------ beds ------------------------------------------------------------ */

const occupied = (x: number, z: number) => [...remoteSits.values()].some((u) => u.pose === "lie" && Math.hypot(u.x - x * S, u.z - z * S) < 0.5 * S);

/**
 * Called by startUse for a hospital bed. null = no ticket, so the plain ward rest runs; "refuse" = the reason was toasted;
 * otherwise the treatment to run on this bed.
 */
export function beginWardStay(index: number): { action: ActionDef; scale: number; onDone: () => void } | "refuse" | null {
  const s = useGame.getState();
  const it = rt.layout?.items[index];
  const here = rt.ref?.kind === "place" ? rt.ref.id : null;
  if (!it || !isHospital(here)) return null;
  if (occupied(it.x, it.z)) {
    s.toast("That bed is taken. Try another.", "info");
    return "refuse";
  }
  const adm = s.medical.admission;
  if (!adm) return null;
  if (adm.kind === "case" && s.medical.illness?.id !== adm.illness) {
    useGame.setState((st) => ({ medical: { ...st.medical, admission: null } }));
    s.toast(`Ticket ${adm.ticket} is void: you are no longer ill with that. There is no refund.`, "info");
    return "refuse";
  }
  if (adm.place !== here) {
    s.toast(`Your ticket ${adm.ticket} is for ${HOSPITALS[adm.place]?.name ?? "another hospital"}.`, "info");
    return "refuse";
  }
  const wait = Math.ceil((adm.calledAt - Date.now()) / 1000);
  if (wait > 0) {
    s.toast(`Wait for your number: ${adm.ticket} is called in 0:${String(wait).padStart(2, "0")}.`, "info");
    return "refuse";
  }
  const def = adm.illness ? ILLNESSES[adm.illness] : null;
  const emergency = adm.kind === "emergency";
  const action: ActionDef = emergency
    ? { id: "treat", label: "Emergency treatment", secs: EMERGENCY.secs, cost: 0, gain: EMERGENCY.gain }
    : { id: "treat", label: "Ward treatment", secs: def?.secs ?? 8, cost: 0, gain: def?.gain ?? { energy: 20 } };
  return { action, scale: 1, onDone: () => completeTreatment(adm) };
}

/** Discharge: cure the illness, write the receipt, start the immunity. Idempotent on the admission id. */
export function completeTreatment(adm: Admission): void {
  const s = useGame.getState();
  if (s.medical.admission?.id !== adm.id) return;
  const def = adm.illness ? ILLNESSES[adm.illness] : null;
  const now = Date.now();
  // an emergency admission cures whatever you have; a case ticket only the illness it was bought for (never a different, dearer one)
  const cures = adm.kind === "emergency" || s.medical.illness?.id === adm.illness;
  const visit: Visit = { id: adm.id, at: now, place: adm.place, kind: adm.kind, illness: adm.illness, severity: adm.severity, lines: adm.lines, total: adm.total, note: def ? `Cured of ${def.name}.` : "Treated." };
  useGame.setState((st) => ({ medical: { ...st.medical, illness: cures ? null : st.medical.illness, admission: null, history: [visit, ...st.medical.history].slice(0, 30) } }));
  clk.immune = adm.kind === "emergency" ? IMMUNE_SECS.emergency : IMMUNE_SECS.case;
  clk.illSec = 0;
  s.recordStat("treated");
  s.toast(`Discharged${def ? `: cured of ${def.name.toLowerCase()}` : ""}. Receipt in your Health app.`, "good");
}

/** Walk to the nearest bed nobody real is lying on. `prefer` says which end: casualty beds are at x < 0, ward beds at x > 0. */
export function walkToFreeBed(prefer: "casualty" | "ward" = "ward"): boolean {
  const l = rt.layout;
  if (!l) return false;
  const beds = l.items.map((it, i) => ({ it, i })).filter(({ it }) => it.kind === "hospitalbed" && !occupied(it.x, it.z));
  if (!beds.length) {
    useGame.getState().toast("Every bed is taken. Wait a moment.", "info");
    return false;
  }
  const pref = beds.filter(({ it }) => (prefer === "casualty" ? it.x < 0 : it.x > 0));
  const pool = pref.length ? pref : beds;
  return walkToFurn(pool[0].i);
}

/* ------------------------------------------------------------ getting ill ------------------------------------------------------------ */

/** Fall ill. A player has one illness at a time: this replaces it only when the new one is an injury or worse. */
export function onset(id: IllnessId, severity?: Severity, cause?: Cause): void {
  const s = useGame.getState();
  const def = ILLNESSES[id];
  const cur = s.medical.illness;
  const sev = severity ?? def.onset;
  if (cur && !(id === "injury" || sev > cur.severity)) return;
  useGame.setState((st) => ({ medical: { ...st.medical, illness: { id, severity: sev, since: Date.now(), cause } } }));
  clk.illSec = 0;
  clk.risk = 0;
  const feel = def.symptoms.map((x) => SYMPTOMS[x].label).join(", ");
  s.toast(`\u{1F912} You feel unwell: ${feel}. Check in at UCH or Adeoyo.`, "bad");
}

/** Hurt by someone or something (the justice design calls this). */
export function injure(src: { cause: Cause["kind"]; byPid?: string; byName?: string; severity?: Severity }): void {
  const cur = useGame.getState().medical.illness;
  onset("injury", Math.max(src.severity ?? 2, cur?.id === "injury" ? cur.severity : 1) as Severity, { kind: src.cause, byPid: src.byPid, byName: src.byName });
}

const pickIllness = (needs: Needs, night: boolean): IllnessId => {
  const w: Record<IllnessId, number> = {
    cold: 3,
    malaria: 2 + (night ? 5 : 0),
    typhoid: needs.hygiene < 25 ? 5 : 0.5,
    foodpoison: needs.hygiene < 35 ? 2 : 0.3,
    exhaustion: needs.energy < 10 ? 8 : 0,
    injury: 0,
  };
  const total = ILLNESS_IDS.reduce((a, k) => a + w[k], 0);
  let r = Math.random() * total;
  for (const k of ILLNESS_IDS) {
    r -= w[k];
    if (r < 0) return k;
  }
  return "cold";
};

let wired = false;
/** Eating can make you ill: a small chance, bigger when you are dirty. Wired on the first tick so importing this file does nothing. */
function wire() {
  if (wired) return;
  wired = true;
  let lastAte = useGame.getState().stats.ate;
  useGame.subscribe((st) => {
    const ate = st.stats.ate;
    if (ate <= lastAte) {
      lastAte = ate;
      return;
    }
    lastAte = ate;
    if (st.medical.illness || clk.immune > 0) return;
    if (Math.random() < (st.needs.hygiene < 30 ? 0.1 : 0.02)) onset("foodpoison");
  });
}

/** Called once a second from WorldClient's Runtime. */
export function tickHealth(dt: number): void {
  const s = useGame.getState();
  if (!s.profile || s.onboard || s.flight) return;
  wire();
  const ill = s.medical.illness;
  if (ill) {
    const def = ILLNESSES[ill.id];
    clk.illSec += dt;
    // the extra drain: a fraction of the normal rate for each need the illness hits, times the severity
    const needs = { ...s.needs };
    for (const k of Object.keys(def.drain) as (keyof Needs)[]) needs[k] = clamp(needs[k] - BASE[k] * (def.drain[k] ?? 0) * ill.severity * dt);
    useGame.setState({ needs });
    if (def.selfClearMin !== null && clk.illSec >= def.selfClearMin * 60) {
      useGame.setState((st) => ({ medical: { ...st.medical, illness: null } }));
      clk.immune = IMMUNE_SECS.selfClear;
      s.toast(`You feel better: the ${def.name.toLowerCase()} has passed.`, "good");
    } else if (ill.id === "exhaustion" && needs.energy >= 60) {
      useGame.setState((st) => ({ medical: { ...st.medical, illness: null } }));
      clk.immune = IMMUNE_SECS.selfClear;
      s.toast("You have rested enough: the exhaustion has passed.", "good");
    } else if (def.selfClearMin === null && ill.severity < 3 && clk.illSec >= ESCALATE_SECS * (ill.severity - def.onset + 1)) {
      const sev = (ill.severity + 1) as Severity;
      useGame.setState((st) => ({ medical: { ...st.medical, illness: st.medical.illness ? { ...st.medical.illness, severity: sev } : null } }));
      s.toast(`Your ${def.name.toLowerCase()} is getting worse. See a doctor.`, "bad");
    }
  } else if (clk.immune > 0) {
    clk.immune = Math.max(0, clk.immune - dt);
  } else {
    const h = gameMinutes(Date.now(), s.clockOverride) / 60;
    const night = !s.interior && (h < 6 || h >= 19);
    clk.risk += dt * (0.03 + (s.needs.hygiene < 15 ? 0.1 : 0) + (s.needs.hunger < 10 ? 0.08 : 0) + (s.needs.energy < 10 ? 0.05 : 0) + (night ? 0.03 : 0));
    if (clk.risk >= 100) onset(pickIllness(s.needs, night));
  }
  const adm = useGame.getState().medical.admission;
  // a case ticket is for one illness: when that one is gone (it cleared by itself) or replaced by another, the ticket is void
  if (adm && adm.kind === "case") {
    const now = useGame.getState().medical.illness;
    if (!now || now.id !== adm.illness) {
      useGame.setState((st) => ({ medical: { ...st.medical, admission: null } }));
      s.toast(`Ticket ${adm.ticket} is void: you are no longer ill with that. There is no refund.`, "info");
      return;
    }
  }
  if (adm && Date.now() >= adm.calledAt && clk.called !== adm.id) {
    clk.called = adm.id;
    if (adm.kind === "case") s.toast(`${adm.ticket}, please come to a bed.`, "info");
  }
}

/** Dev helpers, exposed on window.__omo.hospital in development. */
export const devHospital: Record<string, unknown> = {
  makeIll: (id: IllnessId = "malaria", severity?: Severity) => onset(id, severity),
  clearIllness: () => {
    useGame.setState((st) => ({ medical: { ...st.medical, illness: null, admission: null } }));
    clk.immune = 600;
  },
  giveCard: () => useGame.setState((st) => ({ medical: { ...st.medical, card: st.medical.card ?? { no: cardNumber(st.profile?.id ?? "dev", Date.now()), since: Date.now(), place: "uch" } } })),
  clk,
};
