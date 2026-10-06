import { PLOTS } from "./plots";
import type { PlotState } from "./protocol";
import { ESTATES, type Estate } from "./world";

export const PASS_MS = 30 * 60 * 1000;

type Access = { plots: Record<string, PlotState>; profileId?: string; passes: Record<string, number> };

/** Houses in this estate that belong to the player. */
export const ownsIn = (e: Estate, s: Pick<Access, "plots" | "profileId">) =>
  PLOTS.some((p) => e.districts.includes(p.district) && s.plots[p.id]?.ownerId === s.profileId);

export const passLeft = (e: Estate, passes: Record<string, number>, now: number) => Math.max(0, (passes[e.id] ?? 0) - now);

/** Residents walk in; everyone else needs a valid visitor pass. */
export const hasAccess = (e: Estate, s: Access, now: number) => ownsIn(e, s) || passLeft(e, s.passes, now) > 0;

export const openEstateIds = (s: Access, now: number) => ESTATES.filter((e) => hasAccess(e, s, now)).map((e) => e.id);
