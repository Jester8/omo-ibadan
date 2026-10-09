"use client";

import type { ReactNode } from "react";
import type { StyleProps } from "./civicKit";
import { LAW_STYLES, type LawStyle } from "./civicStylesLaw";
import { PUBLIC_STYLES, type PublicStyle } from "./civicStylesPublic";

/** Every civic PlaceStyle and its renderer. Spread into STYLES in Buildings.tsx. The two files it merges are owned by different agents. */
export type CivicStyle = LawStyle | PublicStyle;
export const CIVIC_STYLES: Record<CivicStyle, (p: StyleProps) => ReactNode> = { ...LAW_STYLES, ...PUBLIC_STYLES };
