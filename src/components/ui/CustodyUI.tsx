"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lock, ShieldAlert } from "lucide-react";
import type { BankItem } from "@/lib/bank";
import { askFriends, confirmCase, describeCase, fileReport, loadCases, loadHeld, loadRecent, nearestStation, payBail, payFine, timeLeft, withdrawCase } from "@/lib/custody";
import { REASONS, POLICE_REASONS, RULES, type Recent, type ReportBody } from "@/lib/custodyRules";
import { useSecond } from "@/lib/hooks";
import { naira } from "@/lib/plots";
import type { CaseCard, CaseReason } from "@/lib/protocol";
import { efccFilingOpen } from "@/lib/socialRules";
import { serverMode } from "@/lib/socialApi";
import { useGame } from "@/lib/store";

/*
 * Everything the player sees of the police, the EFCC and custody: the banner while held, the arrest overlay, bail requests from
 * friends, the cases list, the report picker and the Police app. The copy is plain words with the real numbers.
 */

const mmss = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
const button = "rounded-full px-3.5 py-1.5 text-xs font-bold transition active:scale-95 disabled:opacity-40";
const card = "rounded-2xl bg-white p-3.5 ring-1 ring-black/5";
const DEMO = "Police work when you play online with other people.";

/** Run an action, show its sentence as a toast, and keep the button busy meanwhile. */
function useAct() {
  const [busy, setBusy] = useState(false);
  const run = async (f: () => Promise<{ ok: boolean; message: string }>) => {
    if (busy) return;
    setBusy(true);
    const r = await f();
    setBusy(false);
    if (r.message) useGame.getState().toast(r.message, r.ok ? "good" : "bad");
    return r;
  };
  return { busy, run };
}

/* ------------------------------------------------------ while held ------------------------------------------------------ */

/** The strip at the top while in custody. Tap it for the details. */
export function CustodyBanner() {
  const c = useGame((s) => s.custody);
  const skew = useGame((s) => s.clockSkew);
  const inVoice = useGame((s) => !!s.voice.room);
  const now = useSecond() * 1000;
  if (!c) return null;
  return (
    <button
      onClick={() => useGame.getState().setSheet("custody")}
      aria-label="You are in custody. Open the details"
      className={`absolute left-1/2 z-[58] flex max-w-[calc(100vw-1rem)] -translate-x-1/2 items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-bold text-white shadow-2xl ring-1 ring-white/20 transition active:scale-95 ${inVoice ? "top-[calc(env(safe-area-inset-top)+3.7rem)] sm:top-[4.6rem]" : "top-[calc(env(safe-area-inset-top)+0.5rem)] sm:top-5"}`}
    >
      <Lock className="size-3.5 text-amber-300" />
      <span>In custody · {mmss(timeLeft(c, now, skew))}</span>
      <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[11px] text-stone-900">Bail {naira(c.bail)}</span>
    </button>
  );
}

/** The full-screen moment of an arrest. */
export function ArrestOverlay() {
  const f = useGame((s) => s.arrestFlash);
  return (
    <AnimatePresence>
      {f && (
        <motion.div key="arrest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[75] grid place-items-center bg-stone-950/90 px-6 text-center text-white">
          <div>
            <ShieldAlert className="mx-auto size-14 text-rose-400" />
            <p className="mt-3 text-3xl font-black tracking-wide">ARRESTED</p>
            <p className="mt-2 text-base font-semibold text-white/90">{REASONS[f.reason]?.label ?? "A report"}</p>
            <p className="mt-1 text-sm text-white/60">Reported by {f.by}</p>
            <p className="mt-4 text-sm text-white/70">Taken to the Agodi Custodial Centre</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** One request at a time from a friend who is in custody. */
export function BailAsks() {
  const ask = useGame((s) => s.bailAsks[0]);
  const skew = useGame((s) => s.clockSkew);
  const now = useSecond() * 1000;
  const { busy, run } = useAct();
  if (!ask) return null;
  const left = Math.max(0, ask.releaseAt - (now + skew));
  const dismiss = () => useGame.setState((st) => ({ bailAsks: st.bailAsks.filter((a) => a.caseId !== ask.caseId) }));
  return (
    <div className="pointer-events-auto flex items-center gap-3 rounded-3xl bg-white p-3 pr-3.5 text-black shadow-2xl ring-1 ring-black/10">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-stone-800 text-base font-bold text-white">{ask.name.slice(0, 1).toUpperCase()}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{ask.name} is in custody</p>
        <p className="text-xs leading-snug text-stone-500">
          {REASONS[ask.reason]?.label ?? "A report"} · bail {naira(ask.bail)} · out by themselves in {mmss(left)}
        </p>
      </div>
      <button onClick={dismiss} className={`${button} bg-stone-100 text-stone-700`}>
        Not now
      </button>
      <button
        disabled={busy}
        onClick={() =>
          void run(async () => {
            const r = await payBail(ask.caseId);
            if (r.ok) dismiss();
            return r;
          })
        }
        className={`${button} bg-emerald-600 text-white`}
      >
        Pay
      </button>
    </div>
  );
}

/** Your own custody, in the Police app and at the bail desk. */
export function CustodyDetails() {
  const c = useGame((s) => s.custody);
  const skew = useGame((s) => s.clockSkew);
  const money = useGame((s) => s.money);
  const friends = useGame((s) => s.friends);
  const now = useSecond() * 1000;
  const { busy, run } = useAct();
  const [sure, setSure] = useState(false);
  if (!c) return null;
  const left = timeLeft(c, now, skew);
  const total = Math.max(1, c.releaseAt - c.heldAt);
  const wait = Math.max(0, c.nextAskAt - (now + skew));
  const short = money < c.bail;
  const online = friends.filter((f) => f.online);
  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-stone-900 p-4 text-white">
        <p className="flex items-center gap-2 text-sm font-bold">
          <Lock className="size-4 text-amber-300" /> You are in custody
        </p>
        <p className="mt-1 text-xs text-white/70">
          {REASONS[c.reason]?.label ?? "A report"} · reported by {c.by}
        </p>
        <p className="mt-3 text-3xl font-black tabular-nums">{mmss(left)}</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-amber-400" style={{ width: `${Math.min(100, Math.max(0, ((total - left) / total) * 100))}%` }} />
        </div>
        <p className="mt-2 text-xs text-white/60">You are let out when the time runs out, or sooner if bail is paid.</p>
      </div>

      <div className={card}>
        <p className="text-sm font-bold text-stone-900">Bail: {naira(c.bail)}</p>
        {sure ? (
          <div className="mt-2 flex items-center gap-2">
            <button disabled={busy} onClick={() => void run(() => payBail(c.caseId))} className={`${button} bg-emerald-600 text-white`}>
              Yes, pay {naira(c.bail)}
            </button>
            <button onClick={() => setSure(false)} className={`${button} bg-stone-100 text-stone-700`}>
              Not yet
            </button>
          </div>
        ) : (
          <button onClick={() => setSure(true)} disabled={short} className={`${button} mt-2 bg-emerald-600 text-white`}>
            Pay bail
          </button>
        )}
        {short && (
          <p className="mt-2 text-xs text-stone-600">
            You have {naira(money)}. Ask your friends, or{" "}
            <button onClick={() => useGame.getState().setSheet("bank")} className="font-bold text-emerald-700 underline">
              borrow from the bank
            </button>
            .
          </p>
        )}
      </div>

      <div className={card}>
        <p className="text-sm font-bold text-stone-900">Ask your friends to pay</p>
        <p className="mt-0.5 text-xs text-stone-500">
          {c.asks >= RULES.maxAsks ? "You have asked as many times as you can." : c.asks > 0 ? `You have asked ${c.asks} time${c.asks === 1 ? "" : "s"}.` : "They see your request on their screen, or when they next log in."}
        </p>
        <button disabled={busy || wait > 0 || c.asks >= RULES.maxAsks} onClick={() => void run(askFriends)} className={`${button} mt-2 bg-stone-900 text-white`}>
          {wait > 0 ? `Ask again in ${mmss(wait)}` : "Ask friends"}
        </button>
        {online.length > 0 && <p className="mt-2 text-xs text-stone-500">Online now: {online.map((f) => f.name).join(", ")}</p>}
      </div>

      <p className="text-xs leading-relaxed text-stone-500">In here you can chat, call or message friends, use the bank, sleep, wash and eat the prison meal. You cannot leave until you are let out.</p>
    </div>
  );
}

/** Friends who are in custody and can be bailed out. */
export function HeldFriends() {
  const held = useGame((s) => s.heldFriends);
  const friends = useGame((s) => s.friends);
  const skew = useGame((s) => s.clockSkew);
  const now = useSecond() * 1000;
  const { busy, run } = useAct();
  useEffect(() => {
    void loadHeld();
  }, []);
  const rows = Object.entries(held);
  if (!rows.length) return <p className="rounded-2xl bg-white p-3.5 text-sm text-stone-600 ring-1 ring-black/5">None of your friends is in custody right now.</p>;
  return (
    <ul className="space-y-2">
      {rows.map(([pid, h]) => {
        const name = friends.find((f) => f.pid === pid)?.name ?? "A friend";
        return (
          <li key={h.caseId} className={`${card} flex items-center gap-3`}>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-stone-900">{name}</p>
              <p className="text-xs text-stone-500">
                {REASONS[h.reason]?.label ?? "A report"} · out in {mmss(h.releaseAt - (now + skew))}
              </p>
            </div>
            <button disabled={busy} onClick={() => void run(() => payBail(h.caseId))} className={`${button} bg-emerald-600 text-white`}>
              Pay {naira(h.bail)}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------- the cases ------------------------------------------------------- */

const STATUS_TEXT: Record<string, string> = { filed: "Waiting to be booked", held: "In custody", bailed: "Bailed out", served: "Time served", settled: "Settled", withdrawn: "Withdrawn", expired: "Lapsed", merged: "Joined to another case", dismissed: "Dismissed" };

function CaseRowView({ c, now, skew }: { c: CaseCard; now: number; skew: number }) {
  const { busy, run } = useAct();
  const open = c.status === "filed" || c.status === "held";
  const left = c.status === "filed" ? c.confirmBy - (now + skew) : c.releaseAt ? c.releaseAt - (now + skew) : 0;
  return (
    <li className={card}>
      <p className="text-sm font-bold text-stone-900">{c.role === "reporter" ? `You reported ${c.other.name}` : `${c.other.name} reported you`}</p>
      <p className="text-xs text-stone-500">
        {REASONS[c.reason]?.label ?? "A report"} · {STATUS_TEXT[c.status] ?? c.status}
        {open && left > 0 ? ` · ${mmss(left)} left` : ""}
      </p>
      <p className="sr-only">{describeCase(c)}</p>
      {c.role === "reporter" && c.status === "filed" && (
        <div className="mt-2 flex flex-wrap gap-2">
          <button disabled={busy || now + skew < c.bookableAt} onClick={() => void run(() => confirmCase(c.id))} className={`${button} bg-blue-700 text-white`}>
            Book now
          </button>
          <button disabled={busy} onClick={() => void run(() => withdrawCase(c.id))} className={`${button} bg-stone-100 text-stone-700`}>
            Withdraw
          </button>
        </div>
      )}
      {c.role === "reporter" && c.status === "held" && (
        <button disabled={busy} onClick={() => void run(() => withdrawCase(c.id))} className={`${button} mt-2 bg-stone-100 text-stone-700`}>
          Drop the charges
        </button>
      )}
      {c.role === "accused" && c.status === "filed" && c.fine > 0 && (
        <button disabled={busy} onClick={() => void run(() => payFine(c.id))} className={`${button} mt-2 bg-amber-500 text-stone-900`}>
          Pay the fine {naira(c.fine)}
        </button>
      )}
    </li>
  );
}

/** My cases, newest first. */
export function CasesList({ compact = false }: { compact?: boolean }) {
  const cases = useGame((s) => s.cases);
  const skew = useGame((s) => s.clockSkew);
  const now = useSecond() * 1000;
  useEffect(() => {
    void loadCases();
  }, []);
  if (!cases.length) return <p className="rounded-2xl bg-white p-3.5 text-sm text-stone-600 ring-1 ring-black/5">No cases. That is good news.</p>;
  return (
    <ul className="space-y-2">
      {(compact ? cases.slice(0, 3) : cases).map((c) => (
        <CaseRowView key={c.id} c={c} now={now} skew={skew} />
      ))}
    </ul>
  );
}

/* ------------------------------------------------------ filing a report ------------------------------------------------------ */

/** Pick a reason and file. Used from a player's card, a chat message, the Police app and the station counter. */
export function ReportPicker({ accused, defaultReason, via = "player", name, onDone }: { accused: string; defaultReason?: CaseReason; via?: ReportBody["via"]; name?: string; onDone: () => void }) {
  const [recent, setRecent] = useState<Recent | null>(null);
  const [reason, setReason] = useState<CaseReason>(defaultReason ?? "disturbance");
  const [sure, setSure] = useState(false);
  const money = useGame((s) => s.money);
  const { busy, run } = useAct();
  useEffect(() => {
    let dead = false;
    void loadRecent().then((list) => !dead && setRecent(list.find((p) => p.pid === accused) ?? null));
    return () => {
      dead = true;
    };
  }, [accused]);
  const reasons = POLICE_REASONS.filter((r) => r !== "assault" || defaultReason === "assault" || (recent?.hitMe ?? 0) > 0);
  const info = REASONS[reason];
  const station = nearestStation("police");
  return (
    <div className={card}>
      <p className="text-sm font-bold text-stone-900">Report {name ?? recent?.name ?? "this player"} to the police</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {reasons.map((r) => (
          <button key={r} onClick={() => { setReason(r); setSure(false); }} className={`${button} ${reason === r ? "bg-blue-700 text-white" : "bg-stone-100 text-stone-700"}`}>
            {REASONS[r].label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-stone-500">{info.blurb}</p>
      <p className="mt-1 text-xs text-stone-600">
        Filing costs {naira(info.fee)} (refunded when the case stands). If they are booked, bail is {naira(info.bail)} and they are held up to {info.holdMin} minutes. You then have {Math.round(RULES.confirmWindowMs / 60_000)} minutes to book it at {station ? station.name : "a station"}.
      </p>
      {sure ? (
        <div className="mt-2 flex items-center gap-2">
          <button
            disabled={busy || money < info.fee}
            onClick={() =>
              void run(async () => {
                const r = await fileReport(accused, reason, via);
                if (r.ok) onDone();
                return r;
              })
            }
            className={`${button} bg-blue-700 text-white`}
          >
            Yes, file it ({naira(info.fee)})
          </button>
          <button onClick={() => setSure(false)} className={`${button} bg-stone-100 text-stone-700`}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-2 flex items-center gap-2">
          <button onClick={() => setSure(true)} className={`${button} bg-blue-700 text-white`}>
            File a report
          </button>
          <button onClick={onDone} className={`${button} bg-stone-100 text-stone-700`}>
            Never mind
          </button>
        </div>
      )}
      {money < info.fee && <p className="mt-1 text-xs font-semibold text-rose-600">You have {naira(money)}.</p>}
    </div>
  );
}

/** People the player was with in the last ten minutes: the only ones they can report. */
export function WhoToReport() {
  const [people, setPeople] = useState<Recent[] | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  useEffect(() => {
    let dead = false;
    void loadRecent().then((l) => !dead && setPeople(l));
    return () => {
      dead = true;
    };
  }, []);
  if (picked) {
    const p = people?.find((x) => x.pid === picked);
    return <ReportPicker accused={picked} name={p?.name} defaultReason={p && p.hitMe > 0 ? "assault" : undefined} onDone={() => setPicked(null)} />;
  }
  if (people === null) return <p className="text-sm text-stone-500">Loading…</p>;
  if (!people.length) return <p className="rounded-2xl bg-white p-3.5 text-sm text-stone-600 ring-1 ring-black/5">You can report someone you were with in the last 10 minutes. There is nobody yet.</p>;
  return (
    <ul className="space-y-2">
      {people.map((p) => (
        <li key={p.pid} className={`${card} flex items-center gap-3`}>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-stone-900">{p.name}</p>
            <p className="text-xs text-stone-500">{p.hitMe > 0 ? `Hit you ${p.hitMe} time${p.hitMe === 1 ? "" : "s"}` : p.pokedMe > 0 ? `Poked you ${p.pokedMe} time${p.pokedMe === 1 ? "" : "s"}` : p.online ? "Online" : "Offline"}</p>
          </div>
          <button onClick={() => setPicked(p.pid)} className={`${button} bg-blue-700 text-white`}>
            Report
          </button>
        </li>
      ))}
    </ul>
  );
}

/** "Report to EFCC" on an outgoing bank row. Renders nothing unless the row qualifies. */
export function EfccReportButton({ item }: { item: BankItem }) {
  const open = useGame((s) => s.efccOpen);
  const sec = useSecond();
  const { busy, run } = useAct();
  const [sure, setSure] = useState(false);
  const age = sec * 1000 - item.at;
  if (!open || item.dir !== "out" || (item.kind && item.kind !== "transfer") || !item.pid || !item.username) return null;
  if (item.amount < RULES.efcc.minTransfer || age < RULES.efcc.ledgerMinAgeMs || age > RULES.efcc.windowMs) return null;
  const closed = !efccFilingOpen(sec * 1000);
  return (
    <div className="mt-1">
      {sure ? (
        <div className="flex items-center gap-2">
          <button
            disabled={busy}
            onClick={() =>
              void run(async () => {
                const r = await fileReport(item.pid!, "scam", "bank");
                if (r.ok) setSure(false);
                return r;
              })
            }
            className={`${button} bg-emerald-700 text-white`}
          >
            File it ({naira(REASONS.scam.fee)})
          </button>
          <button onClick={() => setSure(false)} className={`${button} bg-stone-100 text-stone-700`}>
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={() => (closed ? useGame.getState().toast("The EFCC office is closed. Money cases can be filed between 8:00 and 16:50.", "info") : setSure(true))} className="text-[11px] font-bold text-emerald-700 underline">
          Report to the EFCC
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------- the Police app ------------------------------------------------------- */

export function PoliceApp() {
  const open = useGame((s) => s.policeOpen);
  const held = useGame((s) => !!s.custody);
  const [tab, setTab] = useState<"cases" | "report" | "rules">("cases");
  const seg = (on: boolean) => `flex-1 rounded-lg py-1.5 text-xs font-semibold transition active:scale-95 ${on ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`;
  if (!serverMode()) return <p className="rounded-2xl bg-white p-4 text-sm text-stone-600 ring-1 ring-black/5">{DEMO}</p>;
  if (!open && !held) return <p className="rounded-2xl bg-white p-4 text-sm text-stone-600 ring-1 ring-black/5">The police are not open yet. They will be soon.</p>;
  return (
    <div className="space-y-3">
      {held && <CustodyDetails />}
      <div className="flex gap-0.5 rounded-xl bg-stone-200/70 p-0.5">
        <button onClick={() => setTab("cases")} className={seg(tab === "cases")}>
          My cases
        </button>
        <button onClick={() => setTab("report")} className={seg(tab === "report")} disabled={held}>
          Report someone
        </button>
        <button onClick={() => setTab("rules")} className={seg(tab === "rules")}>
          Rules
        </button>
      </div>
      {tab === "cases" && (
        <>
          <CasesList />
          <p className="pt-1 text-[11px] font-bold uppercase tracking-wider text-stone-400">Friends in custody</p>
          <HeldFriends />
        </>
      )}
      {tab === "report" && <WhoToReport />}
      {tab === "rules" && <PoliceRules />}
    </div>
  );
}

export function PoliceRules() {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-stone-600">
      <li>You can report someone you were with in the last 10 minutes. Filing costs a small fee, shown first, and it comes back if the case stands.</li>
      <li>After filing you have {Math.round(RULES.confirmWindowMs / 60_000)} minutes to book the case at a police station counter. Booking takes them into custody. If you do nothing it lapses and the fee is kept.</li>
      <li>A person in custody is let out when their time runs out (never more than 15 minutes), or when bail is paid by them or a friend.</li>
      <li>Before booking, the person you reported can pay a fine at a station to settle it.</li>
      <li>Hit or poked by someone? Report it from the alert. The game saw it, so it counts.</li>
      <li>After being let out nobody can hold you again for {Math.round(RULES.rearrestImmunityMs / 60_000)} minutes. False reports are dismissed by moderators and the reporter can be barred.</li>
    </ul>
  );
}
