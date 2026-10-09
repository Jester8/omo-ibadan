import { create } from "zustand";
import { FEATURES } from "./features";
import { forceExit } from "./interiorRuntime";
import { interiorKey } from "./interiors";
import { applyLoanView, loansOn, plotLabel } from "./loans";
import { applyPayment, owedNow, repEarned, saleValue } from "./moneyRules";
import { rebuildGrid } from "./pathing";
import { naira } from "./plots";
import type { PlotState } from "./protocol";
import { api, errorText, serverMode, type ActionResult } from "./socialApi";
import { flagOn, serverNow, useFlag } from "./socialState";
import { pendingRent, useGame } from "./store";

/* Selling land back to the city. The server decides the price (saleValue in moneyRules.ts) and pays through the ledger; the sheet shows the same numbers. */

export type SaleQuote = {
  plotId: string;
  gross: number;
  parts: { land: number; built: number; decor: number };
  /** uncollected rent that is collected first (and is not part of `gross`) */
  pendingRent: number;
  /** goes to the bank first when there is a loan */
  loanPaid: number;
  /** what the player receives */
  net: number;
  /** reputation taken back */
  repBack: number;
  /** why the sale cannot go ahead right now, or null */
  blocked: string | null;
};

/** What GET /api/plots/quote last said about whether this plot can be sold (someone inside, for one). */
export const useSaleCheck = create<{ check: { plotId: string; blocked: string | null } | null }>()(() => ({ check: null }));

/** Ask the server whether this sale would go through (someone inside is something only it knows). No-op in the demo build. */
export async function loadSaleCheck(plotId: string): Promise<void> {
  if (!serverMode()) return;
  if (useSaleCheck.getState().check?.plotId !== plotId) useSaleCheck.setState({ check: null });
  const r = await api<{ blocked: { code: string; text: string } | null }>("GET", `/api/plots/quote?plotId=${encodeURIComponent(plotId)}`);
  if (r.ok && r.data) useSaleCheck.setState({ check: { plotId, blocked: r.data.blocked?.text ?? null } });
}

/** Is selling land on? The build switch, then the server's word (or the demo build, where it happens on this device). */
const salesOn = () => FEATURES.sales && flagOn("sales");
export function useSalesOn(): boolean {
  const on = useFlag("sales");
  return FEATURES.sales && on;
}
/** The numbers and the reason (if any) for selling `plotId` at `now`. Pure in its arguments, so the sheet can call it while rendering. */
export function quoteSaleAt(plotId: string, now: number): SaleQuote {
  const s = useGame.getState();
  const st = s.plots[plotId];
  const none = (blocked: string): SaleQuote => ({ plotId, gross: 0, parts: { land: 0, built: 0, decor: 0 }, pendingRent: 0, loanPaid: 0, net: 0, repBack: 0, blocked });
  if (!salesOn()) return none("Selling land is closed for now.");
  if (!st || st.ownerId !== s.profile?.id) return none("You do not own this land.");
  const { land, built, decor, gross } = saleValue(plotId, st);
  const loan = s.loan && loansOn() ? s.loan : null;
  const loanPaid = loan ? Math.min(gross, owedNow(loan, now + s.clockSkew)) : 0;
  const here = interiorKey({ kind: "home", id: plotId });
  const check = useSaleCheck.getState().check;
  let blocked: string | null = null;
  if (s.custody) blocked = "Your assets are frozen while you are in custody.";
  else if (s.interior && interiorKey(s.interior) === here) blocked = "Step outside first.";
  else if (Object.values(s.remotes).some((r) => r.room === here)) blocked = "Someone is inside. Ask them to leave first.";
  else if (serverMode() && s.net !== "online") blocked = "You are offline. Reconnect to sell.";
  else if (check && check.plotId === plotId && check.blocked) blocked = check.blocked;
  else if (gross <= 0) blocked = "The city does not buy this land.";
  return { plotId, gross, parts: { land, built, decor }, pendingRent: pendingRent(st, now), loanPaid, net: gross - loanPaid, repBack: Math.min(s.rep, repEarned(st)), blocked };
}
export const quoteSale = (plotId: string): SaleQuote => quoteSaleAt(plotId, Date.now());

/** The plot leaves this device: its record, its decor, its walls on the walk grid, and anyone standing inside. */
function removePlot(plotId: string): void {
  const s = useGame.getState();
  const inside = s.interior?.kind === "home" && s.interior.id === plotId;
  const plots = { ...s.plots };
  delete plots[plotId];
  const decor = { ...s.decor };
  delete decor[plotId];
  useGame.setState({ plots, decor, decorRev: s.decorRev + 1, knocks: s.knocks.filter((k) => k.plotId !== plotId) });
  rebuildGrid(Object.entries(plots).filter(([, p]) => p.tier > 0).map(([id]) => id));
  if (inside) forceExit();
}

/** a sale from this device is out: its own `plotFree` is not announced as a sale from somewhere else */
let selling = false;

type Settled = { gross: number; loanPaid: number; net: number; repBack: number };

/** The sale went through: the rent that had built up is yours, the reputation goes back, the plot is gone. The sale money itself arrives as a credit. */
function settle(plotId: string, before: PlotState, r: Settled, local: boolean): ActionResult {
  const s = useGame.getState();
  const rent = pendingRent(s.plots[plotId] ?? before, Date.now());
  const where = plotLabel(plotId);
  useGame.setState({ money: s.money + rent + (local ? r.net : 0), rep: Math.max(0, s.rep - Math.max(0, r.repBack)) });
  removePlot(plotId);
  useSaleCheck.setState({ check: null });
  const bits = [r.net > 0 ? `${naira(r.net)} ${local ? "is in your balance" : "is on its way to your balance"}` : "", r.loanPaid > 0 ? `${naira(r.loanPaid)} went to your loan` : "", rent > 0 ? `${naira(rent)} rent collected` : ""].filter(Boolean);
  const message = `Sold ${where}. ${bits.join(", ")}.`;
  useGame.getState().toast(message, "good");
  return { ok: true, message };
}

export async function sellPlot(plotId: string): Promise<ActionResult> {
  if (selling) return { ok: false, message: "One moment. The sale is still going through." };
  const q = quoteSaleAt(plotId, Date.now());
  if (q.blocked) return { ok: false, message: q.blocked };
  const before = useGame.getState().plots[plotId];
  selling = true;
  try {
    if (!serverMode()) {
      const loan = useGame.getState().loan;
      const pay = loan ? applyPayment(loan, q.gross, serverNow()) : null;
      const out = settle(plotId, before, { gross: q.gross, loanPaid: pay?.paid ?? 0, net: q.gross - (pay?.paid ?? 0), repBack: q.repBack }, true);
      if (pay && pay.paid > 0) applyLoanView(pay.closed ? null : pay.loan, "sale");
      return out;
    }
    const r = await api<{ ok: boolean; gross: number; loanPaid: number; net: number; repBack: number }>("POST", "/api/plots/sell", { plotId });
    if (!r.ok || !r.data?.ok) return { ok: false, message: errorText(r, "The sale did not go through.") };
    const d = r.data;
    const num = (v: number, fallback: number) => (Number.isFinite(v) ? v : fallback);
    // the server's own figures are the ones that were paid
    return settle(plotId, before, { gross: num(d.gross, q.gross), loanPaid: num(d.loanPaid, q.loanPaid), net: num(d.net, q.net), repBack: num(d.repBack, q.repBack) }, false);
  } finally {
    selling = false;
  }
}

/** The server says this plot is free land again (everyone gets this). */
export function applyPlotFree(plotId: string): void {
  const s = useGame.getState();
  const cur = s.plots[plotId];
  if (!cur || cur.ownerId.startsWith("npc:")) return;
  const mine = cur.ownerId === s.profile?.id;
  const where = mine ? plotLabel(plotId) : "";
  removePlot(plotId);
  if (mine && !selling) s.toast(`${where} is no longer yours. It was sold back to the city.`, "info");
}
