"use client";

import { ArrowDownToLine, Binoculars, RotateCw } from "lucide-react";
import { useState } from "react";
import { useClock } from "@/lib/hooks";
import { isOpen } from "@/lib/events";
import { leaveDeck } from "@/lib/interiorRuntime";
import { cam } from "@/lib/playerState";
import { useGame } from "@/lib/store";
import { LANDMARKS, TOWER_POS, distanceLabel } from "@/lib/tower";

/** Bower's Tower viewing deck: spin round, zoom out over Ibadan, or point the telescope at a landmark. */
export default function DeckPanel() {
  const deck = useGame((s) => s.deck);
  // the body mounts fresh each time you come up, so the telescope never remembers an old view
  return deck ? <DeckBody /> : null;
}

function DeckBody() {
  const [spin, setSpin] = useState(false);
  const [looking, setLooking] = useState<string | null>(null);
  const { hour } = useClock();

  const look = (id: string | null) => {
    setLooking(id);
    if (!id) {
      cam.focus = null;
      cam.dist = 30;
      cam.el = 0.45;
      return;
    }
    const p = LANDMARKS.find((x) => x.id === id)!;
    cam.focus = { x: p.x, z: p.z };
    cam.az = Math.atan2(TOWER_POS.x - p.x, TOWER_POS.z - p.z);
    cam.dist = 20;
    cam.el = 0.38;
  };

  return (
    <div className="absolute inset-x-3 bottom-[calc(5.4rem+env(safe-area-inset-bottom))] z-20 flex max-h-[42dvh] flex-col rounded-[1.6rem] bg-white/80 p-4 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-white/60 backdrop-blur-2xl sm:inset-x-auto sm:bottom-auto sm:right-5 sm:top-20 sm:w-[22rem]">
      <div className="flex shrink-0 items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-base font-bold text-stone-900">
            <Binoculars className="size-4 text-amber-600" /> Bower&apos;s Tower · Viewing deck
          </p>
          <p className="text-xs text-stone-500">Ibadan&apos;s sea of brown roofs, 40 metres below.</p>
        </div>
        <button onClick={leaveDeck} className="flex shrink-0 items-center gap-1.5 rounded-full bg-stone-900 px-3.5 py-2.5 text-xs font-semibold text-white transition active:scale-95">
          <ArrowDownToLine className="size-3.5" /> Down
        </button>
      </div>

      <div className="mt-3 flex shrink-0 gap-2">
        <button
          onClick={() => {
            cam.spin = !spin;
            setSpin(!spin);
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition active:scale-95 ${spin ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-700"}`}
        >
          <RotateCw className="size-3.5" /> Panorama
        </button>
        <button onClick={() => look(null)} className="flex-1 rounded-xl bg-stone-100 py-2.5 text-xs font-semibold text-stone-700 transition active:scale-95">
          Whole city
        </button>
      </div>

      <p className="mb-1.5 mt-3 shrink-0 text-xs font-bold uppercase tracking-wide text-stone-400">Telescope</p>
      <div className="flex max-h-[22dvh] flex-wrap gap-1.5 overflow-y-auto sm:max-h-[40dvh]">
        {LANDMARKS.map((p) => (
          <button
            key={p.id}
            onClick={() => look(p.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${looking === p.id ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
          >
            {p.emoji} {p.name} · {p.dir} · {distanceLabel(p.metres)}
            {!isOpen(p.id, hour) && <span className="ml-1 inline-block size-1.5 rounded-full bg-stone-400 align-middle" title="Closed now" />}
          </button>
        ))}
      </div>
    </div>
  );
}
