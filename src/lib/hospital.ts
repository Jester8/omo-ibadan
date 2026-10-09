import type { ActionDef } from "./places";

/**
 * STUB written by the lead (Phase 0); owned by the HP (hospital) agent from Phase 1. Store glue for illness, tickets and treatment (hospital.md 4.2).
 * Keep these exports (interiorRuntime.ts and WorldClient.tsx import them); add the rest freely.
 */
export const isHospital = (placeId: string | null | undefined): boolean => placeId === "uch" || placeId === "adeoyo";
/** Called once a second from WorldClient's Runtime. */
export function tickHealth(dt: number): void {
  void dt; // STUB
}
/** Called by startUse for a bed whose use has special "ward". null = no ticket, run the plain ward rest; "refuse" = the reason was already toasted. */
export function beginWardStay(index: number): { action: ActionDef; scale: number; onDone: () => void } | "refuse" | null {
  void index; // STUB
  return null;
}
/** Dev helpers, exposed on window.__omo.hospital in development. */
export const devHospital: Record<string, unknown> = {};
