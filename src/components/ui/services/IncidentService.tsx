"use client";

import { closeService } from "@/lib/services";
import type { ServiceBodyProps } from "./types";

const card = "rounded-2xl bg-white p-4 ring-1 ring-black/5";

/**
 * The fire station's emergency desk. There are no live fires yet (no incident system), so the desk says so plainly and points at what
 * the station does offer, instead of a dead panel.
 */
export default function IncidentService({ ctx }: ServiceBodyProps) {
  void ctx;
  return (
    <div className="space-y-3">
      <div className={card}>
        <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">Right now</p>
        <p className="mt-0.5 text-lg font-extrabold text-stone-900">No fires reported</p>
        <p className="mt-1 text-sm text-stone-600">The engine is washed, the crew is on standby and the desk is open day and night.</p>
      </div>
      <div className={card}>
        <p className="text-sm font-bold text-stone-900">Hurt or ill?</p>
        <p className="mt-0.5 text-sm text-stone-600">The fire service does not treat patients. Go to the reception desk or the emergency desk at UCH or Adeoyo, which are also open day and night.</p>
      </div>
      <div className={card}>
        <p className="text-sm font-bold text-stone-900">Want to help?</p>
        <p className="mt-0.5 text-sm text-stone-600">Join the fire drill, wash the engine or take a standby shift. They are in the list on the station card.</p>
      </div>
      <button type="button" onClick={closeService} className="w-full rounded-xl bg-stone-100 px-4 py-2.5 text-sm font-semibold text-stone-700 transition active:scale-[0.98]">
        Close
      </button>
    </div>
  );
}
