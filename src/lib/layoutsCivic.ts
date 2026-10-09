import type { Layout } from "./interiors";
import { LAW_LAYOUTS } from "./layoutsLaw";
import { PUBLIC_LAYOUTS } from "./layoutsPublic";
import { HEALTH_LAYOUTS } from "./layoutsHealth";

/** All the civic interiors, merged into PLACE_LAYOUTS by layouts.ts. The three files are owned by three different agents; ids must not repeat. */
export const CIVIC_LAYOUTS: Record<string, Layout> = { ...LAW_LAYOUTS, ...PUBLIC_LAYOUTS, ...HEALTH_LAYOUTS };
