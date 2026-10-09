"use client";

import { HOSPITALS, ILLNESSES } from "@/lib/health";
import { walkToFreeBed } from "@/lib/hospital";
import { walkToDesk } from "@/lib/civic";
import { useSecond } from "@/lib/hooks";
import { useGame } from "@/lib/store";

const SEVERITY = ["mild", "moderate", "severe"] as const;

/** The hospital card in the place panels: what is wrong with you, where your ticket stands, and a button to the right spot. */
export default function HospitalCard({ placeId, inside }: { placeId: string; inside: boolean }) {
  const ill = useGame((s) => s.medical.illness);
  const adm = useGame((s) => s.medical.admission);
  const now = useSecond() * 1000;
  const def = ill ? ILLNESSES[ill.id] : null;
  const here = adm?.place === placeId;
  const wait = adm ? Math.max(0, Math.ceil((adm.calledAt - now) / 1000)) : 0;

  return (
    <div className="mt-4 rounded-2xl bg-red-50 p-3.5 ring-1 ring-red-100">
      <p className="text-sm font-bold text-red-950">{HOSPITALS[placeId]?.name ?? "Hospital"}</p>
      <p className="text-xs text-red-900/75">Open 24 hours. The emergency desk never closes.</p>
      {def && ill && (
        <p className="mt-2 rounded-xl bg-white/80 px-3 py-2 text-xs font-semibold text-red-900">
          {def.emoji} You have {def.name.toLowerCase()} ({SEVERITY[ill.severity - 1]}).
        </p>
      )}
      {adm && (
        <p className="mt-2 rounded-xl bg-white/80 px-3 py-2 text-xs font-semibold text-red-900">
          Ticket {adm.ticket}: {!here ? `for ${HOSPITALS[adm.place]?.name ?? "another hospital"}` : wait > 0 ? `called in ${Math.floor(wait / 60)}:${String(wait % 60).padStart(2, "0")}` : "called, please go to a bed"}
        </p>
      )}
      {inside ? (
        <div className="mt-3 grid grid-cols-1 gap-2">
          {adm && here && (
            <button onClick={() => walkToFreeBed(adm.kind === "emergency" ? "casualty" : "ward")} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition active:scale-[0.98]">
              Go to a free bed
            </button>
          )}
          <button
            onClick={() => {
              if (!walkToDesk("hospital")) useGame.getState().toast("You can't reach the desk from here.", "info");
            }}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-red-800 ring-1 ring-red-200 transition active:scale-[0.98]"
          >
            Go to reception
          </button>
        </div>
      ) : (
        <p className="mt-2 text-xs text-red-900/75">Go inside to reach reception.</p>
      )}
    </div>
  );
}
