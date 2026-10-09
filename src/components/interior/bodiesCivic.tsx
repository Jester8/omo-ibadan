"use client";

import type { FurnKind } from "@/lib/furniture";
import type { BodyRenderer } from "./extras";

/**
 * Renderers for the civic furniture: servicedesk, cellbars, fireengine, pigeonholes, waterpoint, fuelpump, jerrycans.
 * Owned by the INT-BODIES agent. Phase 0 ships an empty map: a kind without a renderer falls back to a brown box (Furniture.tsx), so nothing crashes.
 * Specs: PLAN-civic.md section D.
 */
export const CIVIC_BODIES: Partial<Record<FurnKind, BodyRenderer>> = {};
