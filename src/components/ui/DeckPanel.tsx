"use client";

import { ArrowDownToLine, Binoculars, RotateCw } from "lucide-react";
import { useState } from "react";
import { leaveDeck } from "@/lib/interiorRuntime";
import { PLACES } from "@/lib/places";
import { cam, me } from "@/lib/playerState";
import { useGame } from "@/lib/store";

const tower = PLACES.find((p) => p.id === "bowers")!;

/** Bower's Tower viewing deck: spin round, zoom out over Ibadan, or point the telescope at a landmark. */
export default function DeckPanel() {
  const deck = useGame((s) => s.deck);
  const [spin, setSpin] = useState(false);
  const [looking, setLooking] = useState<string | null>(null);
  if (!deck) return null;

  const spots = PLACES.filter((p) => p.id !== "bowers")
    .map((p) => ({ p, d: Math.hypot(p.pos[0] - me.x, p.pos[1] - me.z) }))
    .sort((a, b) => a.d - b.d);

  const look = (id: string | null) => {
    setLooking(id);
    if (!id) {
      cam.focus = null;
      cam.dist = 30;
      cam.el = 0.45;
      return;
    }
    const p = PLACES.find((x) => x.id === id)!;
    cam.focus = { x: p.pos[0], z: p.pos[1] };
    cam.az = Math.atan2(tower.pos[0] - p.pos[0], tower.pos[1] - p.pos[1]);
    cam.dist = 20;
    cam.el = 0.38;
  };

  return (
    <div className="absolute inset-x-3 bottom-[5.4rem] z-20 max-h-[42dvh] overflow-y-auto rounded-[1.6rem] bg-white/80 p-4 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-white/60 backdrop-blur-2xl sm:inset-x-auto sm:bottom-auto sm:right-5 sm:top-20 sm:w-[22rem]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-base font-bold text-stone-900">
            <Binoculars className="size-4 text-amber-600" /> Bower&apos;s Tower · Viewing deck
          </p>
          <p className="text-xs text-stone-500">Ibadan&apos;s sea of rusted roofs, 40 metres below.</p>
        </div>
        <button onClick={leaveDeck} className="flex shrink-0 items-center gap-1.5 rounded-full bg-stone-900 px-3 py-2 text-xs font-semibold text-white transition active:scale-95">
          <ArrowDownToLine className="size-3.5" /> Down
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => {
            cam.spin = !spin;
            setSpin(!spin);
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition active:scale-95 ${spin ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-700"}`}
        >
          <RotateCw className="size-3.5" /> Panorama
        </button>
        <button onClick={() => look(null)} className="flex-1 rounded-xl bg-stone-100 py-2 text-xs font-semibold text-stone-700 transition active:scale-95">
          Whole city
        </button>
      </div>

      <p className="mb-1.5 mt-3 text-xs font-bold uppercase tracking-wide text-stone-400">Telescope</p>
      <div className="flex flex-wrap gap-1.5">
        {spots.map(({ p, d }) => (
          <button
            key={p.id}
            onClick={() => look(p.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${looking === p.id ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
          >
            {p.emoji} {p.name.replace(/^The /, "")} · {Math.round(d * 25)}m
          </button>
        ))}
      </div>
    </div>
  );
}
