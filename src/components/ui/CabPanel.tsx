"use client";

import { useMemo, useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { RIDES, rideById, type RideId } from "@/lib/cars";
import { quoteRide, rideToPlace } from "@/lib/movement";
import { PLACES } from "@/lib/places";
import { me } from "@/lib/playerState";
import { naira } from "@/lib/plots";
import { useGame } from "@/lib/store";
import { CAMPUS_PLACES } from "@/lib/world";

/** Climb into a parked cab and say where you are going. */
export default function CabPanel({ id }: { id: string }) {
  const [rank, rideId] = id.split(":") as [string, RideId];
  const ride = rideById(rideId);
  const [q, setQ] = useState("");
  const money = useGame((s) => s.money);
  const campus = useGame((s) => s.campus);
  const px = Math.round(me.x);
  const pz = Math.round(me.z);

  const list = useMemo(() => {
    void px;
    void pz;
    const term = q.trim().toLowerCase();
    return PLACES.filter((p) => (campus || !CAMPUS_PLACES.includes(p.id)) && (!term || `${p.name} ${p.district}`.toLowerCase().includes(term)))
      .map((p) => ({ p, quote: quoteRide(p.id, rideId) }))
      .filter((x) => x.quote)
      .sort((a, b) => a.quote!.metres - b.quote!.metres)
      .slice(0, 14);
  }, [q, rideId, campus, px, pz]);

  if (!ride) return null;
  void rank;

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl text-2xl" style={{ background: `${ride.color}22` }}>
            {ride.emoji}
          </div>
          <div>
            <h2 className="text-lg font-semibold leading-tight text-stone-900">{ride.name} · cab park</h2>
            <p className="text-xs font-semibold text-stone-500">“Where to, boss?”</p>
          </div>
        </div>
        <button onClick={() => useGame.getState().select(null)} aria-label="Close" className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
          <X className="size-5" />
        </button>
      </div>

      <div className="mt-3 flex gap-1.5">
        {RIDES.map((r) => (
          <button key={r.id} onClick={() => useGame.getState().select({ type: "cab", id: `${rank}:${r.id}` })} className={`flex-1 rounded-xl py-1.5 text-xs font-semibold transition active:scale-95 ${r.id === rideId ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`}>
            {r.emoji} {r.name}
          </button>
        ))}
      </div>

      <label className="mt-3 flex items-center gap-2 rounded-2xl bg-stone-100 px-3.5 py-2.5 ring-2 ring-transparent focus-within:bg-white focus-within:ring-emerald-500">
        <Search className="size-4 text-stone-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a place or district" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400" />
      </label>

      <ul className="mt-3 space-y-2">
        {list.map(({ p, quote }) => (
          <li key={p.id} className="flex items-center justify-between gap-3 rounded-2xl bg-stone-50 px-4 py-2.5 ring-1 ring-black/5">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-stone-900">
                {p.emoji} {p.name}
              </p>
              <p className="flex items-center gap-1 text-xs text-stone-500">
                <MapPin className="size-3" /> {p.district} · {Math.round(quote!.metres)} m
              </p>
            </div>
            <button
              disabled={money < quote!.fare}
              onClick={() => rideToPlace(p.id, rideId)}
              className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40"
              style={{ background: ride.color }}
            >
              {quote!.fare ? naira(quote!.fare) : "Free"}
            </button>
          </li>
        ))}
        {list.length === 0 && <li className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">No place matches “{q}”.</li>}
      </ul>
    </>
  );
}
