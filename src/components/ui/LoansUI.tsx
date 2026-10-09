"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Landmark, Lock, Minus, Plus, TriangleAlert, X } from "lucide-react";
import { useGame } from "@/lib/store";
import { naira } from "@/lib/plots";
import { useSecond } from "@/lib/hooks";
import { MIN } from "@/lib/custodyRules";
import { LOAN, owedAfter } from "@/lib/moneyRules";
import type { LoanView } from "@/lib/protocol";
import { TITLES } from "@/lib/titles";
import { clockAt, loadOffer, loanNow, plotLabel, repayLoan, takeLoan, useLoanOfferNow, useLoansOn } from "@/lib/loans";
import { serverMode } from "@/lib/socialApi";

const termLabel = (min: number) => (min === 60 ? "1 hour" : `${min / 60} hours`);
/** a stretch of time as a countdown: 12:34, or 2:14:05 when it is over an hour */
const span = (ms: number) => {
  const t = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = String(t % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
};
/** the bank's clock: this device's second plus the offset the server last told us */
function useBankNow(): number {
  const sec = useSecond();
  const skew = useGame((s) => s.clockSkew);
  return sec * 1000 + skew;
}

/** a confirm card that appears below the fold on a small screen scrolls itself into view */
const intoView = (el: HTMLElement | null) => el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
const label = "text-[11px] font-bold uppercase tracking-wide text-stone-400";
const Row = ({ k, v, strong }: { k: string; v: string; strong?: boolean }) => (
  <div className="flex items-baseline justify-between gap-3 py-1">
    <span className="min-w-0 text-xs text-stone-500">{k}</span>
    <span className={`shrink-0 text-right text-sm tabular-nums ${strong ? "font-extrabold text-stone-900" : "font-semibold text-stone-800"}`}>{v}</span>
  </div>
);

/** The Loans tab of the bank app. */
export function LoansPanel() {
  const on = useLoansOn();
  const loan = useGame((s) => s.loan);
  if (!on) return <p className="rounded-2xl bg-white p-4 text-sm text-stone-600 ring-1 ring-black/5">The bank is closed for now.</p>;
  return loan ? <ActiveLoan loan={loan} /> : <Offer />;
}

/* ------------------------------------------------ borrowing ------------------------------------------------ */

function Offer() {
  const o = useLoanOfferNow();
  const now = useBankNow();
  const [raw, setRaw] = useState<number | null>(null);
  const [term, setTerm] = useState<number>(LOAN.defaultTerm);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  useEffect(() => {
    void loadOffer();
  }, []);

  const top = Math.max(LOAN.minAmount, o.limit);
  const start = Math.max(LOAN.minAmount, Math.floor(o.limit / 2 / LOAN.step) * LOAN.step);
  const amount = Math.min(top, Math.max(LOAN.minAmount, raw ?? start));
  const share = Math.floor((o.collateral * LOAN.collateralShare) / 1000) * 1000;
  const title = TITLES[Math.max(0, (LOAN.titleBase as readonly number[]).indexOf(o.titleBase))].name;
  const within = owedAfter(amount, term, 60);
  const atDeadline = owedAfter(amount, term, term);
  const set = (n: number) => {
    setRaw(Math.min(top, Math.max(LOAN.minAmount, n)));
    setConfirming(false);
    setMsg(null);
  };
  const take = async () => {
    setBusy(true);
    const r = await takeLoan(amount, term);
    setBusy(false);
    setConfirming(false);
    setMsg({ ok: r.ok, text: r.message });
    if (r.ok) useGame.getState().toast(r.message, "good");
  };
  const chip = (on: boolean) => `flex-1 rounded-xl py-2 text-xs font-bold transition active:scale-95 ${on ? "bg-stone-900 text-white" : "bg-white text-stone-700 ring-1 ring-black/10"}`;

  return (
    <>
      <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
        <p className={label}>Borrow from the bank</p>
        <p className="mt-1 text-lg font-extrabold leading-tight text-stone-900">You can borrow up to {naira(o.limit)}</p>
        <p className="mt-1 text-xs text-stone-500">
          {title} {naira(o.titleBase)}
          {share > 0 ? ` + 40% of your land and businesses ${naira(share)}` : ""}
          {o.titleBase + share > LOAN.hardCap ? `. The bank never lends more than ${naira(LOAN.hardCap)}.` : ""}
        </p>
      </div>

      <div className="mt-3 space-y-3 rounded-2xl bg-stone-100/70 p-3">
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className={label}>How much</p>
            <p className="text-base font-extrabold tabular-nums text-stone-900">{naira(amount)}</p>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <button onClick={() => set(amount - LOAN.step)} disabled={amount <= LOAN.minAmount} aria-label="Borrow less" className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-stone-700 ring-1 ring-black/10 transition active:scale-90 disabled:opacity-40">
              <Minus className="size-4" />
            </button>
            <input type="range" min={LOAN.minAmount} max={top} step={LOAN.step} value={amount} onChange={(e) => set(Number(e.target.value))} aria-label="Loan amount" className="h-8 min-w-0 flex-1 accent-emerald-600" />
            <button onClick={() => set(amount + LOAN.step)} disabled={amount >= top} aria-label="Borrow more" className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-stone-700 ring-1 ring-black/10 transition active:scale-90 disabled:opacity-40">
              <Plus className="size-4" />
            </button>
          </div>
          <div className="flex justify-between text-[11px] text-stone-400">
            <span>{naira(LOAN.minAmount)}</span>
            <span>{naira(top)}</span>
          </div>
        </div>

        <div>
          <p className={label}>Pay it back within</p>
          <div className="mt-1.5 flex gap-1.5">
            {LOAN.terms.map((t) => (
              <button key={t} onClick={() => { setTerm(t); setConfirming(false); setMsg(null); }} className={chip(term === t)}>
                {termLabel(t)}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white px-3 py-2 ring-1 ring-black/5">
          <Row k="You get now" v={naira(amount)} />
          {term > 60 && <Row k="Pay back within 1 hour" v={naira(within)} />}
          <Row k={`Pay back by the deadline (${termLabel(term)})`} v={naira(atDeadline)} strong />
          <p className="border-t border-stone-100 pt-2 text-[11px] leading-snug text-stone-500">
            Interest is 6% of what you owe, every hour. Miss the deadline and interest doubles, there is a {naira(Math.round(amount * LOAN.lateFeeShare))} fee, you lose {LOAN.repHit} reputation
            {serverMode() ? ", and after a final notice the bank puts a lien on one of your properties." : ". Without a server the bank cannot seize anything, but your reputation still pays."}
          </p>
        </div>

        {confirming && !o.blocked ? (
          <div ref={intoView} className="rounded-xl bg-white p-3 ring-1 ring-black/10">
            <p className="text-sm font-semibold text-black">
              Borrow {naira(amount)} for {termLabel(term)}? Pay back {naira(atDeadline)} by {clockAt(now + term * MIN)}.
            </p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => setConfirming(false)} className="flex-1 rounded-xl bg-stone-100 py-2.5 text-xs font-bold text-stone-700 transition active:scale-95">
                Cancel
              </button>
              <button disabled={busy} onClick={() => void take()} className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-50">
                {busy ? "One moment..." : "Confirm"}
              </button>
            </div>
          </div>
        ) : (
          <button disabled={!!o.blocked || busy} onClick={() => { setConfirming(true); setMsg(null); }} className="w-full rounded-xl bg-stone-900 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:opacity-40">
            Take {naira(amount)}
          </button>
        )}
        {o.blocked && <p className="px-1 text-xs font-semibold text-rose-600">{o.blocked}</p>}
        {msg && !msg.ok && <p className="px-1 text-xs font-semibold text-rose-600">{msg.text}</p>}
      </div>
    </>
  );
}

/* ------------------------------------------------ owing ------------------------------------------------ */

const TONE = {
  active: "from-emerald-700 via-emerald-600 to-teal-500",
  overdue: "from-amber-600 via-amber-500 to-orange-500",
  notice: "from-rose-700 via-rose-600 to-orange-600",
  seized: "from-rose-900 via-rose-800 to-stone-800",
} as const;

function ActiveLoan({ loan }: { loan: LoanView }) {
  const now = useBankNow();
  const money = useGame((s) => s.money);
  const server = serverMode();
  const v = loanNow(loan, now);
  const [text, setText] = useState("");
  const [all, setAll] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const typed = Math.floor(Number(text) || 0);
  const shown = all ? v.owed : typed;
  const charge = Math.min(shown, v.owed);
  const short = charge > money;
  const valid = shown >= 1 && !short;
  const clears = shown >= v.owed;
  const frac = Math.min(1, Math.max(0, (now - loan.takenAt) / Math.max(1, loan.dueAt - loan.takenAt)));
  const chip = server && v.stage === "notice" && v.toLien !== null ? `Final notice · ${span(v.toLien)}` : v.stage === "notice" ? "Final notice" : v.stage === "seized" ? `Lien on ${loan.seizedPlot ? plotLabel(loan.seizedPlot, true) : "a property"}` : v.stage === "overdue" ? "Overdue" : "On time";

  const pay = async () => {
    setBusy(true);
    const r = await repayLoan(all ? v.payAll : typed);
    setBusy(false);
    setConfirming(false);
    setMsg({ ok: r.ok, text: r.message });
    if (r.ok) {
      setText("");
      setAll(false);
      useGame.getState().toast(r.message, "good");
    }
  };
  const pick = (n: number, everything = false) => {
    setAll(everything);
    setText(String(Math.max(1, n)));
    setConfirming(false);
    setMsg(null);
  };

  return (
    <>
      <div className={`rounded-2xl bg-gradient-to-br ${TONE[v.stage]} p-4 text-white shadow-lg`}>
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/75">
            <Landmark className="size-3.5" /> Your loan
          </p>
          <span className="flex max-w-[60%] items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold">
            {v.stage === "seized" ? <Lock className="size-3 shrink-0" /> : v.stage !== "active" ? <TriangleAlert className="size-3 shrink-0" /> : null}
            <span className="truncate">{chip}</span>
          </span>
        </div>
        <p className="mt-3 text-[11px] font-semibold text-white/70">You owe</p>
        <p className="text-2xl font-extrabold tabular-nums">{naira(v.owed)}</p>
        <p className="mt-1 text-xs text-white/85">
          Principal {naira(v.left)} · Interest and fees {naira(v.interest)}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/25" role="progressbar" aria-label="Time to the deadline" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(frac * 100)}>
          <div className="h-full rounded-full bg-white" style={{ width: `${frac * 100}%` }} />
        </div>
        <p className="mt-1.5 text-xs font-semibold text-white/90">{v.toDue > 0 ? `Due in ${span(v.toDue)} (${clockAt(loan.dueAt)})` : `Was due ${clockAt(loan.dueAt)}. Overdue by ${span(-v.toDue)}`}</p>
      </div>

      <p className="mt-3 rounded-2xl bg-white p-3 text-xs leading-snug text-stone-600 ring-1 ring-black/5">
        {v.stage === "active" && "Pay back before the deadline and you pay no penalty. You can pay any amount, any time: interest and fees go first, then the principal."}
        {v.stage === "overdue" && `Interest now runs at double. ${server ? `The final notice follows ${LOAN.noticeAfterDueMin} minutes after the deadline.` : "You have lost some reputation."} Pay now to stop it growing.`}
        {v.stage === "notice" && (server ? (v.toLien !== null && v.toLien > 0 ? `Pay within ${span(v.toLien)} or the bank puts a lien on one of your properties.` : "The bank can put a lien on one of your properties at any moment. Pay now.") : "Your loan is still unpaid. Without a server the bank cannot seize anything, but your reputation has already paid.")}
        {v.stage === "seized" && `The bank has a lien on ${loan.seizedPlot ? plotLabel(loan.seizedPlot) : "a property"}. Visitors and customers are turned away until you clear the loan. You can still go in, and you can sell it.`}
      </p>

      <p className={`mb-1.5 mt-4 ${label}`}>Pay back</p>
      <div className="space-y-2 rounded-2xl bg-stone-100/70 p-3">
        <input
          value={all ? String(v.owed) : text}
          onChange={(e) => { setAll(false); setText(e.target.value.replace(/[^\d]/g, "").slice(0, 9)); setConfirming(false); setMsg(null); }}
          inputMode="numeric"
          placeholder="Amount in naira"
          aria-label="Amount to pay back"
          className="w-full rounded-xl bg-white px-3.5 py-2.5 text-sm font-medium text-black outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-emerald-500"
        />
        <div className="flex gap-1.5">
          {[
            { id: "five", text: naira(LOAN.minAmount), on: () => pick(Math.min(LOAN.minAmount, v.owed)) },
            { id: "half", text: "Half", on: () => pick(Math.floor(v.owed / 2)) },
            { id: "all", text: "All", on: () => pick(v.owed, true) },
          ].map((c) => (
            <button key={c.id} onClick={c.on} className="flex-1 rounded-lg bg-white py-1.5 text-[11px] font-bold text-stone-700 ring-1 ring-black/10 transition active:scale-95">
              {c.text}
            </button>
          ))}
        </div>
        <p className="px-1 text-[11px] text-stone-500">
          You have {naira(money)}.{v.saved > 0 ? ` Paying it all now saves you ${naira(v.saved)} compared with the deadline.` : ""}
        </p>
        {confirming && valid ? (
          <div ref={intoView} className="rounded-xl bg-white p-3 ring-1 ring-black/10">
            <p className="text-sm font-semibold text-black">{clears ? `Pay ${naira(v.owed)} and clear your loan?` : `Pay ${naira(charge)} to the bank? You will still owe about ${naira(v.owed - charge)}.`}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => setConfirming(false)} className="flex-1 rounded-xl bg-stone-100 py-2.5 text-xs font-bold text-stone-700 transition active:scale-95">
                Cancel
              </button>
              <button disabled={busy} onClick={() => void pay()} className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-50">
                {busy ? "One moment..." : "Confirm"}
              </button>
            </div>
          </div>
        ) : (
          <button disabled={!valid || busy} onClick={() => { setConfirming(true); setMsg(null); }} className="w-full rounded-xl bg-stone-900 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:opacity-40">
            {short ? "Not enough balance" : shown >= 1 ? `Pay ${naira(charge)}` : "Pay"}
          </button>
        )}
        {msg && <p className={`px-1 text-xs font-semibold ${msg.ok ? "text-emerald-700" : "text-rose-600"}`}>{msg.text}</p>}
      </div>
    </>
  );
}

/* ------------------------------------------------ the card in the alert column ------------------------------------------------ */

/** how long before the deadline the bank starts reminding you */
const SOON_MS = 5 * MIN;

/** The final-notice / overdue card shown in the alert column. */
export function LoanNotice() {
  const on = useLoansOn();
  const loan = useGame((s) => s.loan);
  const inBank = useGame((s) => s.sheet === "bank");
  const now = useBankNow();
  const [closed, setClosed] = useState<string | null>(null);
  const server = serverMode();
  const v = loan ? loanNow(loan, now) : null;
  const kind = v ? (v.stage !== "active" ? v.stage : v.toDue <= SOON_MS ? "soon" : null) : null;
  const key = loan && kind ? `${loan.id}:${kind}` : null;
  const show = on && !inBank && !!loan && !!v && !!kind && key !== closed;

  let title = "";
  let body = "";
  if (loan && v && kind) {
    if (kind === "soon") {
      title = "Your loan is due soon";
      body = `Due in ${span(v.toDue)}. Pay ${naira(v.owed)} to stay clear of the penalty.`;
    } else if (kind === "overdue") {
      title = "Your loan is overdue";
      body = `You owe ${naira(v.owed)}. Interest now runs at double. Pay it now.`;
    } else if (kind === "notice") {
      title = "Final notice from the bank";
      body = server && v.toLien !== null && v.toLien > 0 ? `Pay within ${span(v.toLien)} or the bank puts a lien on one of your properties.` : `You owe ${naira(v.owed)}. Pay it now.`;
    } else {
      title = `The bank has a lien on ${loan.seizedPlot ? plotLabel(loan.seizedPlot) : "a property"}`;
      body = `Visitors and customers are turned away until you pay ${naira(v.owed)}.`;
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          role="alert"
          className="pointer-events-auto flex items-center gap-3 rounded-3xl bg-white p-3 pr-2.5 text-black shadow-2xl ring-1 ring-black/10"
        >
          <span className={`grid size-11 shrink-0 place-items-center rounded-full text-white ${kind === "soon" ? "bg-emerald-600" : kind === "overdue" ? "bg-amber-500" : "bg-rose-600"}`}>{kind === "seized" ? <Lock className="size-5" /> : <Landmark className="size-5" />}</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-tight">{title}</p>
            <p className="mt-0.5 text-xs leading-snug text-stone-500">{body}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <button onClick={() => setClosed(key)} aria-label="Close" className="grid size-8 place-items-center rounded-full text-stone-400 transition hover:bg-stone-100 active:scale-90">
              <X className="size-4" />
            </button>
            <button onClick={() => useGame.getState().setSheet("bank")} className="rounded-full bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition active:scale-95">
              Pay
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
