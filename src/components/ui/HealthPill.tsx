"use client";

import { ILLNESSES } from "@/lib/health";
import { useGame } from "@/lib/store";

const SEVERITY = ["mild", "moderate", "severe"] as const;

/** The "you feel unwell" pill in the HUD. Nothing shows while you are healthy. Tap it to open the Health app. */
export default function HealthPill() {
  const ill = useGame((s) => s.medical.illness);
  const setSheet = useGame((s) => s.setSheet);
  if (!ill) return null;
  const def = ILLNESSES[ill.id];
  return (
    <button
      onClick={() => setSheet("health")}
      className="absolute left-3 top-[calc(env(safe-area-inset-top)+0.9rem)] z-10 flex h-9 max-w-[11rem] items-center gap-1.5 rounded-full bg-red-50/95 pl-2 pr-3 text-xs font-bold text-red-800 shadow-lg ring-1 ring-red-200 backdrop-blur-xl transition active:scale-95 sm:left-5 sm:top-5"
      aria-label={`${def.name}, ${SEVERITY[ill.severity - 1]}. Open the Health app`}
    >
      <span className="text-base leading-none">{def.emoji}</span>
      <span className="truncate">{def.name}, {SEVERITY[ill.severity - 1]}</span>
    </button>
  );
}
