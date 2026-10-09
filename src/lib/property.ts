import type { ActionResult } from "./socialApi";

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
/* Property owner replaces every body. */
export function quoteSale(plotId: string): SaleQuote { return { plotId, gross: 0, parts: { land: 0, built: 0, decor: 0 }, pendingRent: 0, loanPaid: 0, net: 0, repBack: 0, blocked: "Not ready." }; }
export async function sellPlot(plotId: string): Promise<ActionResult> { void plotId; return { ok: false, message: "Not ready." }; }
/** The server says this plot is free land again (everyone gets this). */
export function applyPlotFree(plotId: string): void { void plotId; }
