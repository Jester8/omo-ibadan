import type { LoanView, LoanWhy } from "./protocol";
import type { ActionResult } from "./socialApi";

/* Loan owner replaces every body. */
/** The server's loan (or null) replaces the saved one. Handles the one-off reputation hit and the notices. */
export function applyLoanView(view: LoanView | null, why: LoanWhy, serverNow?: number): void { void view; void why; void serverNow; }
export async function loadLoan(): Promise<void> {}
/** What the player may borrow now: limit, how it is made up, and why not if they cannot. */
export function loanOffer(): { limit: number; titleBase: number; collateral: number; blocked: string | null } { return { limit: 0, titleBase: 0, collateral: 0, blocked: "Not ready." }; }
export async function takeLoan(amount: number, termMin: number): Promise<ActionResult> { void amount; void termMin; return { ok: false, message: "Not ready." }; }
export async function repayLoan(amount: number): Promise<ActionResult> { void amount; return { ok: false, message: "Not ready." }; }
/** Called every second by the social runtime: local overdue effects (demo mode) and the reputation hit. */
export function loanTick(): void {}
