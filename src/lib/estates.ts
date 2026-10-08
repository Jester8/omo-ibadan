import { PLOTS } from "./plots";
import type { PlotState } from "./protocol";
import { ESTATES, type Estate } from "./world";

export const PASS_MS = 30 * 60 * 1000;
/** After a visitor pass is paid for, the guard needs this long to write the visitor in before the boom goes up. */
export const PASS_WAIT_MS = 60 * 1000;

type Access = {
  plots: Record<string, PlotState>;
  profileId?: string;
  /** when each estate's pass runs out */
  passes: Record<string, number>;
  /** when each pass opens the gate (a pass saved before the wait existed has none, so it works at once) */
  opens?: Record<string, number>;
};

/** Houses in this estate that belong to the player. */
export const ownsIn = (e: Estate, s: Pick<Access, "plots" | "profileId">) =>
  PLOTS.some((p) => e.districts.includes(p.district) && s.plots[p.id]?.ownerId === s.profileId);

export const passLeft = (e: Estate, passes: Record<string, number>, now: number) => Math.max(0, (passes[e.id] ?? 0) - now);

/** How long (ms) until a paid-for pass opens the gate; 0 when it is already open or there is no pass. */
export const passWait = (e: Estate, opens: Record<string, number> | undefined, now: number) => Math.max(0, (opens?.[e.id] ?? 0) - now);

/** Residents walk in; everyone else needs a visitor pass whose waiting minute is over. */
export const hasAccess = (e: Estate, s: Access, now: number) => ownsIn(e, s) || (passLeft(e, s.passes, now) > 0 && passWait(e, s.opens, now) === 0);

export const openEstateIds = (s: Access, now: number) => ESTATES.filter((e) => hasAccess(e, s, now)).map((e) => e.id);
