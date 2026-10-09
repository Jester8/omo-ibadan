import { create } from "zustand";
import { MIN } from "./custodyRules";
import { FEATURES } from "./features";
import { LOAN, accrue, applyPayment, collateralOf, creditLimit, newLoan, owedNow, titleIndexOf } from "./moneyRules";
import { bizById } from "./business";
import { naira, plotById } from "./plots";
import type { LoanStage, LoanView, LoanWhy } from "./protocol";
import { api, errorText, serverMode, type ActionResult } from "./socialApi";
import { flagOn, serverNow, useFlag, useSocial } from "./socialState";
import { useGame } from "./store";
import { formatClock, gameMinutes } from "./time";

/*
 * Bank loans on the client. The rules and numbers are in moneyRules.ts (shared with the server).
 * With a server, the server keeps the loan: this file asks, shows what it answers, and never invents a loan.
 * Without one (demo build), the same functions run on the loan saved in the store, minus the lien.
 */

/* ------------------------------------------------ switches and small helpers ------------------------------------------------ */

/** Are loans on? The build switch, then the server's word (or the demo build, where they run on this device). */
export const loansOn = (): boolean => FEATURES.loans && flagOn("loans");
export function useLoansOn(): boolean {
  const on = useFlag("loans");
  return FEATURES.loans && on;
}

/** A time of day on the Ibadan clock, for example "2:20 pm". */
export const clockAt = (ms: number): string => formatClock(gameMinutes(ms));

const RANK: Record<LoanStage, number> = { active: 0, overdue: 1, notice: 2, seized: 3 };

/** Where the loan stands at `now` (the server's clock): the server's word for a notice or a lien, the due time for the rest. */
export const loanStageAt = (l: LoanView, now: number): LoanStage => (l.seizedPlot ? "seized" : l.noticeAt ? "notice" : now > l.dueAt ? "overdue" : "active");

/** Everything the loan cards show, worked out for `now`. */
export function loanNow(l: LoanView, now: number) {
  const a = accrue(l, now);
  return {
    owed: a.left + a.interest,
    left: a.left,
    interest: a.interest,
    stage: loanStageAt(l, now),
    /** ms to the deadline (negative once it has passed) */
    toDue: l.dueAt - now,
    /** ms until the lien, once the final notice has been served */
    toLien: l.noticeAt ? l.noticeAt + LOAN.seizeAfterNoticeMin * MIN - now : null,
    /** how much paying everything right now saves compared with waiting for the deadline (0 once it has passed) */
    saved: now < l.dueAt ? Math.max(0, owedNow(l, l.dueAt) - owedNow(l, now)) : 0,
    /** what "Pay all" sends: the debt in two minutes, so a minute ticking over cannot leave a naira unpaid. The server charges only what is owed. */
    payAll: owedNow(l, now + 2 * MIN),
  };
}

/** The plot under a lien in words: the district, and the business if there is one. */
export function plotLabel(plotId: string): string {
  const district = plotById(plotId)?.district ?? "your land";
  const biz = bizById(useGame.getState().plots[plotId]?.biz);
  return biz ? `${biz.name}, ${district}` : district;
}

/* ------------------------------------------------ the offer ------------------------------------------------ */

type ServerBlock = { code: string; text: string; until?: number };
type ServerOffer = { limit: number; titleBase: number; collateral: number; blocked: ServerBlock | null };
/** What GET /api/loan/offer last said. The server is the judge of the limit, so its numbers replace the local ones once they are here. */
export const useLoanOffer = create<{ server: ServerOffer | null }>()(() => ({ server: null }));

let offerCall: Promise<void> | null = null;
/** Ask the server what this player may borrow and why not (account age, a cooldown, a loan already). No-op in the demo build. */
export function loadOffer(): Promise<void> {
  if (!serverMode() || !FEATURES.loans) return Promise.resolve();
  offerCall ??= api<{ limit: number; titleBase: number; collateral: number; blocked: ServerBlock | null }>("GET", "/api/loan/offer")
    .then((r) => {
      if (r.ok && r.data && Number.isFinite(r.data.limit)) useLoanOffer.setState({ server: { limit: r.data.limit, titleBase: r.data.titleBase, collateral: r.data.collateral, blocked: r.data.blocked ?? null } });
    })
    .finally(() => {
      offerCall = null;
    });
  return offerCall;
}

function serverReason(b: ServerBlock | null): string | null {
  if (!b || b.code === "LOAN_ACTIVE") return null; // a loan already is the store's business: it knows the moment one is paid off
  if (b.until !== undefined && b.until <= serverNow()) return null; // the wait is over
  const when = b.until !== undefined && !/\d:\d\d/.test(b.text) ? ` Try again at ${clockAt(b.until)}.` : "";
  return `${b.text}${when}`;
}

/** What the player may borrow now: limit, how it is made up, and why not if they cannot. */
export function loanOffer(): { limit: number; titleBase: number; collateral: number; blocked: string | null } {
  const s = useGame.getState();
  const idx = titleIndexOf(s.rep);
  const srv = serverMode() ? useLoanOffer.getState().server : null;
  const titleBase = srv?.titleBase ?? LOAN.titleBase[idx];
  const collateral = srv?.collateral ?? collateralOf(s.plots, s.profile?.id ?? "");
  const limit = srv?.limit ?? creditLimit(idx, collateral);
  let blocked: string | null = null;
  if (!loansOn()) blocked = "The bank is closed for now.";
  else if (s.loan) blocked = "You already have a loan. Pay it off first.";
  else if (serverMode() && s.net !== "online") blocked = "You are offline. Reconnect to borrow.";
  else blocked = serverReason(srv?.blocked ?? null);
  return { limit, titleBase, collateral, blocked };
}

/** loanOffer(), for a component: it renders again whenever something the offer reads changes. */
export function useLoanOfferNow(): ReturnType<typeof loanOffer> {
  useGame((s) => s.rep);
  useGame((s) => s.plots);
  useGame((s) => s.loan);
  useGame((s) => s.net);
  useLoanOffer((s) => s.server);
  useSocial((s) => s.flags);
  return loanOffer();
}

/* ------------------------------------------------ the loan itself ------------------------------------------------ */

/** the device clock is trusted for countdowns only once the server has told us its own time */
let skewKnown = false;
/** a take request from this device is out, so its own `loan` push is not announced twice */
let takes = 0;
let working = false;

/** Take back the 5 reputation a missed deadline costs, once per loan. */
function repHitIfDue(now: number): void {
  const l = useGame.getState().loan;
  if (!l || l.repHit || loanStageAt(l, now) === "active") return;
  if (serverMode() && !skewKnown) return; // do not punish a wrong device clock
  useGame.setState((st) => ({ rep: Math.max(0, st.rep - LOAN.repHit), loan: st.loan && st.loan.id === l.id ? { ...st.loan, repHit: true } : st.loan }));
}

/** The server's loan (or null) replaces the saved one. Handles the one-off reputation hit and the notices. */
export function applyLoanView(view: LoanView | null, why: LoanWhy, serverNowMs?: number): void {
  const st = useGame.getState();
  const prev = st.loan;
  if (serverNowMs !== undefined && Number.isFinite(serverNowMs)) {
    skewKnown = true;
    useGame.setState({ clockSkew: serverNowMs - Date.now() });
  }
  const repHit = view && prev && prev.id === view.id ? prev.repHit : undefined;
  useGame.setState({ loan: view ? (repHit ? { ...view, repHit } : view) : null });
  const toast = useGame.getState().toast;
  const now = serverNow();
  const was = prev?.seizedPlot ? ` The lien on ${plotLabel(prev.seizedPlot)} is lifted.` : "";
  if (view && (why === "overdue" || why === "notice" || why === "seized") && RANK[view.stage] > RANK[prev?.stage ?? "active"]) {
    if (why === "overdue") toast(`Your bank loan is overdue. Interest now runs at double and a late fee was added. You owe ${naira(owedNow(view, now))}.`, "bad");
    else if (why === "notice") toast(`Final notice from Omo'badan Bank: pay within ${LOAN.seizeAfterNoticeMin} minutes or the bank puts a lien on one of your properties.`, "bad");
    else toast(`The bank has put a lien on ${view.seizedPlot ? plotLabel(view.seizedPlot) : "one of your properties"}. Visitors and customers are turned away until you clear the loan.`, "bad");
  } else if (why === "cleared" && prev) toast(`Your loan is cleared. You owe the bank nothing.${was}`, "good");
  else if (why === "sale" && prev) {
    if (!view) toast(`The sale paid off your loan.${was}`, "good");
    else if (owedNow(view, now) < owedNow(prev, now)) toast(`Part of the sale went to your loan. You still owe ${naira(owedNow(view, now))}.`, "info");
  } else if (why === "forgiven" && prev) toast(`The bank has cancelled your loan.${was}`, "good");
  else if (why === "take" && view && takes === 0 && prev?.id !== view.id) toast(`Loan approved. ${naira(view.principal)} is on its way to your balance.`, "good");
  repHitIfDue(now);
  if (serverMode() && why !== "repay" && why !== "overdue" && why !== "notice" && why !== "seized") {
    // what the server said about borrowing is out of date now (a loan taken, a loan cleared and the wait that follows)
    if (why !== "sync") useLoanOffer.setState({ server: null });
    void loadOffer();
  }
}

/** Ask the server for the loan it holds (on every connect). Demo build: nothing to ask. A server with loans off or too old answers with an error and the saved loan is left alone. */
export async function loadLoan(): Promise<void> {
  if (!serverMode() || !FEATURES.loans) return;
  const r = await api<{ loan: LoanView | null; now: number }>("GET", "/api/loan");
  if (r.ok && r.data && "loan" in r.data) applyLoanView(r.data.loan ?? null, "sync", r.data.now);
}

const refuse = (message: string): ActionResult => ({ ok: false, message });

export async function takeLoan(amount: number, termMin: number): Promise<ActionResult> {
  if (working) return refuse("One moment. The bank is still working on your last request.");
  const offer = loanOffer();
  if (offer.blocked) return refuse(offer.blocked);
  const sum = Math.floor(amount);
  if (!(LOAN.terms as readonly number[]).includes(termMin)) return refuse("Pick how long you need to pay it back.");
  if (!Number.isFinite(sum) || sum < LOAN.minAmount) return refuse(`The smallest loan is ${naira(LOAN.minAmount)}.`);
  if (sum % LOAN.step !== 0) return refuse(`Loans go up in steps of ${naira(LOAN.step)}.`);
  if (sum > offer.limit) return refuse(`The most you can borrow is ${naira(offer.limit)}.`);
  working = true;
  try {
    if (!serverMode()) {
      const now = serverNow();
      const loan: LoanView = { ...newLoan(sum, termMin, now), id: now, stage: "active", noticeAt: null, seizedPlot: null };
      useGame.setState((s) => ({ money: s.money + sum, loan }));
      return { ok: true, message: `Loan approved. ${naira(sum)} is in your balance.` };
    }
    takes++;
    try {
      const r = await api<{ loan: LoanView; now: number }>("POST", "/api/loan/take", { amount: sum, termMin });
      if (!r.ok || !r.data?.loan) {
        if (r.status === 409) void loadLoan();
        else if (r.status !== 0) void loadOffer();
        return refuse(errorText(r, "The bank could not give you that loan."));
      }
      applyLoanView(r.data.loan, "take", r.data.now);
      return { ok: true, message: `Loan approved. ${naira(sum)} is on its way to your balance.` };
    } finally {
      takes--;
    }
  } finally {
    working = false;
  }
}

export async function repayLoan(amount: number): Promise<ActionResult> {
  if (working) return refuse("One moment. The bank is still working on your last request.");
  const s = useGame.getState();
  const loan = s.loan;
  if (!loan || !loansOn()) return refuse(loan ? "The bank is closed for now." : "You have no loan to repay.");
  const sum = Math.floor(amount);
  if (!Number.isFinite(sum) || sum < 1) return refuse("Enter how much you want to pay.");
  if (serverMode() && s.net !== "online") return refuse("You are offline. Reconnect to pay.");
  const now = serverNow();
  // the bank takes at most what is owed, so that is what has to be in the balance
  const charge = Math.min(sum, owedNow(loan, now));
  if (charge > s.money) return refuse(`You have ${naira(s.money)}. This payment needs ${naira(charge)}.`);
  working = true;
  try {
    if (!serverMode()) {
      const p = applyPayment(loan, sum, now);
      if (p.paid <= 0) return refuse("Nothing to pay.");
      useGame.setState((st) => ({ money: Math.max(0, st.money - p.paid) }));
      applyLoanView(p.closed ? null : p.loan, p.closed ? "cleared" : "repay");
      return { ok: true, message: p.closed ? `Paid ${naira(p.paid)}. Your loan is cleared.` : `Paid ${naira(p.paid)}. You still owe ${naira(owedNow(p.loan, now))}.` };
    }
    const r = await api<{ loan: LoanView | null; paid: number; now: number }>("POST", "/api/loan/repay", { amount: sum });
    if (!r.ok || !r.data || !("loan" in r.data)) {
      if (r.status === 404 || r.status === 409) void loadLoan();
      return refuse(errorText(r, "The bank could not take that payment."));
    }
    const left = r.data.loan ?? null;
    applyLoanView(left, left ? "repay" : "cleared", r.data.now);
    const paid = naira(Number.isFinite(r.data.paid) ? r.data.paid : charge);
    return { ok: true, message: left ? `Paid ${paid}. You still owe ${naira(owedNow(left, r.data.now))}.` : `Paid ${paid}. Your loan is cleared.` };
  } finally {
    working = false;
  }
}

/**
 * Called every second by the social runtime. Without a server the bank can only do what this device can: the loan goes overdue at the
 * due time (double interest, the late fee, a toast) and the final notice follows 30 minutes later, and there is no lien. In both modes
 * the one-off reputation hit lands here.
 */
export function loanTick(): void {
  const l = useGame.getState().loan;
  if (!l || !loansOn()) return;
  const now = serverNow();
  if (!serverMode() && now > l.dueAt) {
    const toast = useGame.getState().toast;
    if (l.stage === "active") {
      toast(`Your bank loan is overdue. Interest now runs at double and a late fee of ${naira(Math.round(l.left * LOAN.lateFeeShare))} was added.`, "bad");
      useGame.setState({ loan: { ...l, stage: "overdue" } });
    }
    if (!l.noticeAt && now >= l.dueAt + LOAN.noticeAfterDueMin * MIN) {
      toast("Final notice from Omo'badan Bank: your loan is still unpaid. Pay it now.", "bad");
      useGame.setState((st) => (st.loan ? { loan: { ...st.loan, stage: "notice", noticeAt: now } } : st));
    }
  }
  repHitIfDue(now);
}
