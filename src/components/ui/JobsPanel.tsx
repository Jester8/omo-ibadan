"use client";

import { useState } from "react";
import { Lock, MapPin, Search } from "lucide-react";
import { PLACES } from "@/lib/places";
import { me } from "@/lib/playerState";
import { naira } from "@/lib/plots";
import { useGame } from "@/lib/store";

/** Search every paid job in the city by place, role or district. */
export default function JobsPanel({ onPick }: { onPick?: () => void }) {
  const [q, setQ] = useState("");
  const rep = useGame((s) => s.rep);
  const jobs = PLACES.flatMap((p) => p.actions.filter((a) => a.pay).map((a) => ({ p, a, d: Math.hypot(p.pos[0] - me.x, p.pos[1] - me.z) * 25 })));
  const term = q.trim().toLowerCase();
  const list = jobs
    .filter(({ p, a }) => !term || `${p.name} ${p.district} ${p.kind} ${a.label}`.toLowerCase().includes(term))
    .sort((x, y) => (y.a.pay ?? 0) - (x.a.pay ?? 0));

  return (
    <>
      <label className="flex items-center gap-2 rounded-2xl bg-stone-100 px-3.5 py-2.5 ring-2 ring-transparent focus-within:bg-white focus-within:ring-emerald-500">
        <Search className="size-4 text-stone-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs: shift, tutor, market, Bodija…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400" />
      </label>
      <p className="mb-2 mt-3 text-xs text-stone-500">
        {list.length} job{list.length === 1 ? "" : "s"} · highest pay first
      </p>
      <ul className="space-y-2">
        {list.map(({ p, a, d }) => {
          const locked = !!a.minRep && rep < a.minRep;
          return (
            <li key={`${p.id}-${a.id}`} className="flex items-center justify-between gap-3 rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-stone-900">{a.label}</p>
                <p className="truncate text-xs text-stone-500">
                  {p.emoji} {p.name} · {p.district} · {Math.round(d)} m
                </p>
                <p className="mt-0.5 text-xs font-bold text-emerald-700">
                  {naira(a.pay ?? 0)} <span className="font-medium text-stone-400">· {a.secs}s</span>
                  {locked && (
                    <span className="ml-2 inline-flex items-center gap-1 font-semibold text-amber-700">
                      <Lock className="size-3" /> needs {a.minRep} rep
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => {
                  useGame.getState().select({ type: "place", id: p.id });
                  onPick?.();
                }}
                className="flex shrink-0 items-center gap-1 rounded-full bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white transition active:scale-95"
              >
                <MapPin className="size-3" /> Go
              </button>
            </li>
          );
        })}
        {list.length === 0 && <li className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">No jobs match “{q}”. Try a place or a district.</li>}
      </ul>
    </>
  );
}
