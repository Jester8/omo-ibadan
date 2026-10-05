"use client";

import { AnimatePresence, motion } from "motion/react";
import { Footprints, X } from "lucide-react";
import { PLACES, KIND_COLORS } from "@/lib/places";
import { useGame } from "@/lib/store";
import { useClock } from "@/lib/hooks";
import { KEKE_FARE, rideToPlace, walkToPlace } from "@/lib/movement";
import { naira } from "@/lib/plots";
import { ActionRow, VoiceRoomCard } from "./parts";
import PlotPanelBody from "./PlotPanel";

function PlaceBody({ id }: { id: string }) {
  const place = PLACES.find((p) => p.id === id)!;
  const at = useGame((s) => s.atPlace === id);
  const busy = useGame((s) => s.busy);
  const select = useGame((s) => s.select);
  const color = KIND_COLORS[place.kind];

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl text-2xl" style={{ background: `${color}22` }}>
            {place.emoji}
          </div>
          <div>
            <h2 className="text-lg font-semibold leading-tight text-stone-900">{place.name}</h2>
            <p className="text-xs font-semibold capitalize" style={{ color }}>
              {place.kind} · {place.district}
            </p>
          </div>
        </div>
        <button onClick={() => select(null)} aria-label="Close" className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
          <X className="size-5" />
        </button>
      </div>
      <p className="mt-3 text-sm text-stone-600">{place.blurb}</p>

      {!at && (
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <button
            onClick={() => walkToPlace(id)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-stone-900 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 active:scale-[0.98]"
          >
            <Footprints className="size-4" /> Walk here
          </button>
          <button
            onClick={() => rideToPlace(id)}
            className="rounded-2xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-900 ring-1 ring-amber-200 transition hover:bg-amber-200 active:scale-[0.98]"
          >
            🛺 Keke · {naira(KEKE_FARE)}
          </button>
        </div>
      )}

      {busy && at && (
        <div className="mt-4 overflow-hidden rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
          <p className="text-sm font-semibold text-emerald-800">{busy.label}…</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-100">
            <motion.div key={busy.start} className="h-full rounded-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: busy.secs, ease: "linear" }} />
          </div>
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {place.actions.map((a, i) => (
          <motion.li key={a.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + i * 0.05 }}>
            <ActionRow
              a={a}
              enabled={at && !busy}
              onRun={() => {
                const err = useGame.getState().runAction(a);
                if (err) useGame.getState().toast(err, "bad");
              }}
            />
          </motion.li>
        ))}
      </ul>

      {place.voice && at && (
        <div className="mt-3">
          <VoiceRoomCard room={`place:${id}`} label={`${place.name} voice`} />
        </div>
      )}
    </>
  );
}

export default function SidePanel() {
  const selected = useGame((s) => s.selected);
  useClock();
  return (
    <AnimatePresence mode="wait">
      {selected && (
        <motion.aside
          key={`${selected.type}:${selected.id}`}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="absolute inset-x-3 bottom-3 z-20 max-h-[62dvh] overflow-y-auto rounded-3xl bg-white/92 p-5 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl sm:inset-x-auto sm:bottom-auto sm:right-5 sm:top-20 sm:max-h-[calc(100dvh-7rem)] sm:w-[24rem]"
        >
          {selected.type === "place" ? <PlaceBody id={selected.id} /> : <PlotPanelBody id={selected.id} />}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
