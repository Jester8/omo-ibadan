"use client";

import { useMemo } from "react";
import { Footprints } from "lucide-react";
import { RIDES, carById, type RideId } from "@/lib/cars";
import { driveTo, quoteRideTo, rideTo, walkTo } from "@/lib/movement";
import { me } from "@/lib/playerState";
import { naira } from "@/lib/plots";
import { useGame } from "@/lib/store";

/** How to get to a spot: walk, drive yourself, or pay for an okada, a keke or a micra. */
export default function TravelOptions({ x, z, label = "Get there" }: { x: number; z: number; label?: string }) {
  const money = useGame((s) => s.money);
  const myCars = useGame((s) => s.cars);
  const px = Math.round(me.x);
  const pz = Math.round(me.z);
  const quotes = useMemo(() => {
    void px;
    void pz;
    const out = {} as Record<RideId, { fare: number; metres: number } | null>;
    let walk = 0;
    for (const r of RIDES) {
      out[r.id] = quoteRideTo(x, z, r.id);
      if (out[r.id]) walk = out[r.id]!.metres;
    }
    return { out, walk };
  }, [x, z, px, pz]);

  return (
    <div className="mt-3">
      <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-stone-400">
        {label}
        {quotes.walk > 0 && <span className="font-medium normal-case tracking-normal"> · about {Math.round(quotes.walk)} m away</span>}
      </p>
      <button onClick={() => walkTo(x, z)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 active:scale-[0.98]">
        <Footprints className="size-4" /> Walk · free
      </button>
      {myCars.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {myCars.map((cid) => {
            const c = carById(cid);
            return c ? (
              <button key={cid} onClick={() => driveTo(x, z, cid)} className="min-w-0 truncate rounded-2xl bg-emerald-50 px-2 py-2.5 text-center text-xs font-bold text-emerald-900 ring-1 ring-emerald-200 transition hover:bg-emerald-100 active:scale-[0.97]">
                🚗 Drive {c.name}
              </button>
            ) : null;
          })}
        </div>
      )}
      <div className="mt-2 grid grid-cols-3 gap-1.5 sm:gap-2">
        {RIDES.map((r) => {
          const q = quotes.out[r.id];
          return (
            <button
              key={r.id}
              disabled={!q || money < q.fare}
              onClick={() => rideTo(x, z, r.id)}
              className="flex min-w-0 flex-col items-center gap-0.5 rounded-2xl bg-amber-50 px-1 py-2 text-center ring-1 ring-amber-200 transition hover:bg-amber-100 active:scale-[0.97] disabled:opacity-45 sm:px-2 sm:py-2.5"
            >
              <span className="text-xl leading-none">{r.emoji}</span>
              <span className="text-xs font-bold text-amber-950">{r.name}</span>
              <span className="text-[11px] font-semibold text-amber-800">{q ? (q.fare ? naira(q.fare) : "Free") : "-"}</span>
              <span className="text-[10px] text-amber-700/80">{q ? `${Math.max(1, Math.round(q.metres / (r.speed * 25)))} min` : ""}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
