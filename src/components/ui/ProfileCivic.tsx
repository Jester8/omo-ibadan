"use client";

import { FUEL_CAP } from "@/lib/fuel";
import { KNOWLEDGE_PAY_PER_LEVEL, knowProgress } from "@/lib/knowledge";
import { useGame } from "@/lib/store";

/** The Education and Fuel tiles of the Me sheet: what you have studied, and the petrol in your jerrycans. */
export default function ProfileCivic() {
  const know = useGame((s) => s.stats.know ?? 0);
  const fuel = useGame((s) => s.fuel);
  const p = knowProgress(know);
  const bonus = Math.round(KNOWLEDGE_PAY_PER_LEVEL * p.level * 100);
  return (
    <div className="mt-5 grid grid-cols-2 gap-2">
      <div className="rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Education</p>
        <p className="mt-0.5 text-sm font-bold leading-tight text-stone-900">{p.name}</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200">
          <div className="h-full rounded-full bg-sky-500" style={{ width: `${p.pct}%` }} />
        </div>
        <p className="mt-1.5 text-xs text-stone-500">{p.next === null ? "Top of the ladder" : `${p.cur} / ${p.next} to the next level`}{bonus > 0 ? ` · +${bonus}% pay` : ""}</p>
      </div>
      <div className="rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Fuel</p>
        <p className="mt-0.5 text-sm font-bold text-stone-900">{Math.round(fuel * 10) / 10} / {FUEL_CAP} L</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200">
          <div className="h-full rounded-full bg-amber-500" style={{ width: `${Math.min(100, (fuel / FUEL_CAP) * 100)}%` }} />
        </div>
        <p className="mt-1.5 text-xs text-stone-500">Runs your home generator</p>
      </div>
    </div>
  );
}
