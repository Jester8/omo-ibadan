"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { HOSPITALS, ILLNESSES, SYMPTOMS } from "@/lib/health";
import { walkToPlace } from "@/lib/movement";
import { naira } from "@/lib/plots";
import { useGame } from "@/lib/store";

const SEVERITY = ["mild", "moderate", "severe"] as const;
const TITLES: Record<string, string> = { registration: "Registration", checkup: "Routine check-up", lab: "Lab tests", falsealarm: "Emergency desk: nothing found", emergency: "Emergency", case: "Treatment" };

/** The phone's Health app: how you feel, your patient card, the hospitals, and your visits. */
export default function HealthApp() {
  const med = useGame((s) => s.medical);
  const setSheet = useGame((s) => s.setSheet);
  const [all, setAll] = useState(false);
  const ill = med.illness;
  const def = ill ? ILLNESSES[ill.id] : null;
  const history = all ? med.history : med.history.slice(0, 10);

  const go = (id: string) => {
    const s = useGame.getState();
    // from inside a room the city path would lead to a wall: leave the building first
    if (s.interior) return void s.toast("Leave the building first, then head to the hospital.", "info");
    s.select({ type: "place", id });
    // a refused walk (busy, in custody, on the tower) has already said why
    if (walkToPlace(id)) setSheet(null);
    else if (s.busy) s.toast("Finish what you're doing first.", "info");
  };

  return (
    <div className="space-y-3 p-4">
      <div className={`rounded-2xl p-4 ring-1 ${ill ? "bg-red-50 ring-red-100" : "bg-emerald-50 ring-emerald-100"}`}>
        {ill && def ? (
          <>
            <p className="text-3xl">{def.emoji}</p>
            <p className="mt-1 text-lg font-extrabold text-red-950">{def.name} <span className="text-sm font-semibold text-red-800/70">({SEVERITY[ill.severity - 1]})</span></p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {def.symptoms.map((s) => (
                <span key={s} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-red-800 ring-1 ring-red-100">{SYMPTOMS[s].label}</span>
              ))}
            </div>
            <p className="mt-2 text-xs text-red-900/75">You walk slower and tire faster until you are treated. A hospital reception desk can help, day or night.</p>
          </>
        ) : (
          <>
            <p className="text-lg font-extrabold text-emerald-900">You feel fine</p>
            <p className="text-xs text-emerald-800/75">Eat, wash and rest, and keep it that way.</p>
          </>
        )}
        {med.admission && <p className="mt-2 rounded-xl bg-white/80 px-3 py-2 text-xs font-semibold text-red-900">Ticket {med.admission.ticket} at {HOSPITALS[med.admission.place]?.name}.</p>}
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">Patient card</p>
        <p className="text-base font-extrabold text-stone-900">{med.card ? med.card.no : "Not registered"}</p>
        <p className="text-xs text-stone-500">{med.card ? `Since ${new Date(med.card.since).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}. Valid at UCH and Adeoyo.` : "Register at the reception desk of UCH or Adeoyo."}</p>
      </div>

      <div className="space-y-2">
        <p className="px-1 text-[11px] font-bold uppercase tracking-wide text-stone-400">Hospitals · open 24 hours</p>
        {Object.entries(HOSPITALS).map(([id, h]) => (
          <button key={id} onClick={() => go(id)} className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-left ring-1 ring-black/5 transition active:scale-[0.98]">
            <span>
              <span className="block text-sm font-bold text-stone-900">{h.name}</span>
              <span className="text-xs text-stone-500">{h.priceMul < 1 ? "Cheaper, longer queue" : "Shorter queue"}</span>
            </span>
            <ChevronRight className="size-4 text-stone-400" />
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <p className="px-1 text-[11px] font-bold uppercase tracking-wide text-stone-400">Your visits</p>
        {!history.length && <p className="rounded-2xl bg-white p-4 text-sm text-stone-500 ring-1 ring-black/5">No visits yet.</p>}
        {history.map((v) => (
          <details key={v.id} className="rounded-2xl bg-white ring-1 ring-black/5">
            <summary className="flex cursor-pointer select-none items-center justify-between gap-3 px-4 py-3 text-sm">
              <span className="min-w-0">
                <span className="block truncate font-semibold text-stone-900">{TITLES[v.kind]}{v.illness ? `: ${ILLNESSES[v.illness].name}` : ""}</span>
                <span className="text-xs text-stone-500">{HOSPITALS[v.place]?.code ?? v.place} · {new Date(v.at).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</span>
              </span>
              <span className="shrink-0 font-bold tabular-nums">{naira(v.total)}</span>
            </summary>
            <div className="space-y-1 px-4 pb-3 text-xs text-stone-600">
              {v.lines.map((l) => (
                <p key={l.label} className="flex justify-between"><span>{l.label}</span><span className="tabular-nums">{naira(l.amount)}</span></p>
              ))}
              <p className="pt-1 text-stone-500">{v.note}</p>
            </div>
          </details>
        ))}
        {!all && med.history.length > 10 && (
          <button onClick={() => setAll(true)} className="w-full rounded-xl bg-stone-100 py-2.5 text-sm font-semibold text-stone-700 transition active:scale-[0.98]">Show all {med.history.length}</button>
        )}
      </div>
    </div>
  );
}

/** One line in the Me sheet: how you feel, tap for the Health app. */
export function HealthChip() {
  const ill = useGame((s) => s.medical.illness);
  const setSheet = useGame((s) => s.setSheet);
  const def = ill ? ILLNESSES[ill.id] : null;
  return (
    <button onClick={() => setSheet("health")} className={`mt-5 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold ring-1 transition active:scale-[0.98] ${ill ? "bg-red-50 text-red-900 ring-red-100" : "bg-stone-50 text-stone-700 ring-black/5"}`}>
      <span>{def && ill ? `${def.emoji} ${def.name}, ${SEVERITY[ill.severity - 1]}` : "\u{1F49A} You feel fine"}</span>
      <ChevronRight className="size-4 text-stone-400" />
    </button>
  );
}
