"use client";

import type { ServiceBodyProps } from "./types";

/** STUB written by the lead (Phase 0); owned by the HP agent from Phase 1. Keep the default export and the props. */
export default function HospitalDesk({ ctx }: ServiceBodyProps) {
  return <p className="text-sm text-stone-600">This desk is not open yet. ({ctx.id})</p>;
}
