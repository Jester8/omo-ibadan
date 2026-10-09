/**
 * STUB written by the lead (Phase 0); owned by the justice client-lib agent from Phase 1. Keep every export below with the same name and signature
 * (store.ts, net.ts, interiorRuntime.ts, WorldClient.tsx and the justice UI import them). Replace the bodies; add more exports freely.
 * Spec: justice.md section 13 ("src/lib/custody.ts exports") with the deltas in PLAN-civic.md.
 */
import type { CaseCard, CaseKind, CaseReason, CustodyView, S2C } from "./protocol";
import type { Place } from "./places";
import type { Payee, Recent, ReportBody } from "./custodyRules";
import { blockers } from "./services";
import { useGame } from "./store";

/** A friend's request to bail someone out (S2C bailAsk). */
export type BailAsk = { caseId: number; pid: string; name: string; reason: CaseReason; bail: number; releaseAt: number };
/** A friend who is in custody (GET /api/custody/held or a bailAsk). */
export type HeldEntry = { caseId: number; bail: number; releaseAt: number; reason: CaseReason };
/** What the ArrestOverlay shows (store.arrestFlash). */
export type ArrestFlash = { reason: CaseReason; by: string; place: string };

// a held player cannot use place actions or desks (except the bail desk): services.ts asks every registered blocker
blockers.push(() => (useGame.getState().custody ? "You are in custody." : null));

/** The S2C messages net.ts forwards here: it has no other custody code. */
export type CustodyMessage = Extract<S2C, { t: "custody" | "caseUpdate" | "bailAsk" | "bailAskEnd" | "arrestNote" }>;
export function handleCustodyMessage(m: CustodyMessage): void {
  void m; // STUB
}
/** net.ts calls this when the socket opens: GET /api/custody/me (sets policeOpen, efccOpen, cases, custody) and the held-friends list. Nothing is called in demo mode. */
export async function onCustodySocketOpen(): Promise<void> {
  // STUB
}
/** WorldClient's Runtime calls this once when a profile is present: re-apply a persisted custody state silently, so a reload is not a way out. */
export function restoreCustody(): void {
  // STUB
}
/** WorldClient's Runtime calls this every second: the local release rule when the server never answered (justice 9.5) and other time-based housekeeping. */
export function custodyTick(): void {
  // STUB
}

/** Dev helpers, exposed on window.__omo.custody in development (e.g. apply a forged custody view to test the lockdown). */
export const devCustody: Record<string, unknown> = {};

export const isHeld = (): boolean => !!useGame.getState().custody;
export function custodyBlocks(): boolean {
  if (!isHeld()) return false;
  useGame.getState().toast("You are in custody.", "bad");
  return true;
}
export function applyCustody(view: CustodyView | null, serverNow?: number, opts?: { silent?: boolean }): void {
  void view; void serverNow; void opts; // STUB
}
export function releaseFromCustody(): void {
  // STUB
}
export const timeLeft = (c: CustodyView, now: number, skew: number): number => Math.max(0, c.releaseAt - (now + skew));
export const nearestStation = (kind: CaseKind): Place | null => { void kind; return null; }; // STUB
export const describeCase = (c: CaseCard): string => `Case #${c.id}`; // STUB
export const roomLabel = (room: string): string => room.replace(/-/g, " ");
export async function loadCases(): Promise<void> { /* STUB */ }
export async function loadHeld(): Promise<void> { /* STUB */ }
export async function loadRecent(): Promise<Recent[]> { return []; }
export async function loadPayees(): Promise<Payee[]> { return []; }
type Result = { ok: boolean; message: string };
export async function fileReport(accused: string, reason: CaseReason, via: ReportBody["via"] = "player"): Promise<Result & { card?: CaseCard }> { void accused; void reason; void via; return { ok: false, message: "Not available yet." }; }
export async function confirmCase(caseId: number): Promise<Result> { void caseId; return { ok: false, message: "Not available yet." }; }
export async function withdrawCase(caseId: number): Promise<Result> { void caseId; return { ok: false, message: "Not available yet." }; }
export async function payFine(caseId: number): Promise<Result> { void caseId; return { ok: false, message: "Not available yet." }; }
export async function payBail(caseId: number): Promise<Result> { void caseId; return { ok: false, message: "Not available yet." }; }
export async function askFriends(): Promise<Result> { return { ok: false, message: "Not available yet." }; }
