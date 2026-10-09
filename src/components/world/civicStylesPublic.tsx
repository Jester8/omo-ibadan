"use client";

import type { ReactNode } from "react";
import { GenericCivic, type StyleProps } from "./civicKit";

/**
 * Public services and learning: fire station, post office, school, filling station, clinic, library, borehole, food bank.
 * Owned by the EXT-PUBLIC agent. Phase 0 ships every style as GenericCivic; replace them one by one (recipes: PLAN-civic.md section C).
 */
export type PublicStyle = "firestation" | "postoffice" | "school" | "filling" | "clinic" | "library" | "borehole" | "foodbank";
export const PUBLIC_STYLES: Record<PublicStyle, (p: StyleProps) => ReactNode> = {
  firestation: GenericCivic,
  postoffice: GenericCivic,
  school: GenericCivic,
  filling: GenericCivic,
  clinic: GenericCivic,
  library: GenericCivic,
  borehole: GenericCivic,
  foodbank: GenericCivic,
};
