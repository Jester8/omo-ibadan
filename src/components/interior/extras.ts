import type { ComponentType } from "react";
import type { FurnKind } from "@/lib/furniture";
import type { BodyProps } from "./prims";
import { CIVIC_BODIES } from "./bodiesCivic";
import { FOOD_BODIES } from "./bodiesFood";
import { LIGHT_BODIES } from "./bodiesLights";
import { RETAIL_BODIES } from "./bodiesRetail";

export type BodyRenderer = ComponentType<BodyProps>;

/** Renderers for the shop, food and lighting furniture. Furniture.tsx falls back to these for kinds it does not draw itself. */
export const EXTRA_BODIES: Partial<Record<FurnKind, BodyRenderer>> = { ...RETAIL_BODIES, ...FOOD_BODIES, ...LIGHT_BODIES, ...CIVIC_BODIES };
