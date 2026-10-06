"use client";

import { climbTower } from "@/lib/interiorRuntime";
import { closesAt, eventFor, isOpen, opensAt } from "@/lib/events";
import NpcPanel from "./NpcPanel";
import { AnimatePresence, motion } from "motion/react";
import { DoorOpen, Footprints, X } from "lucide-react";
import { PLACES, KIND_COLORS } from "@/lib/places";
import { useGame } from "@/lib/store";
import { useClock } from "@/lib/hooks";
import { KEKE_FARE, rideToPlace, walkToPlace } from "@/lib/movement";
import { naira } from "@/lib/plots";
import { ActionRow, VoiceRoomCard } from "./parts";
import PlotPanelBody from "./PlotPanel";
import InteriorPanel from "./InteriorPanel";
import { enterInterior } from "@/lib/interiorRuntime";
import { placeLayout } from "@/lib/layouts";

function PlaceBody({ id }: { id: string }) {
  const place = PLACES.find((p) => p.id === id)!;
  const at = useGame((s) => s.atPlace === id);
  const busy = useGame((s) => s.busy);
  const select = useGame((s) => s.select);
  const color = KIND_COLORS[place.kind];
  const { hour } = useClock();
  const ev = eventFor(id, hour);
  const open = isOpen(id, hour);

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

      {at && placeLayout(id) && (
        <button
          onClick={() => enterInterior({ kind: "place", id })}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600 active:scale-[0.98]"
        >
          <DoorOpen className="size-4" /> Go inside
        </button>
      )}

      {busy && at && (
        <div className="mt-4 overflow-hidden rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
          <p className="text-sm font-semibold text-emerald-800">{busy.label}…</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-100">
            <motion.div key={busy.start} className="h-full rounded-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: busy.secs, ease: "linear" }} />
          </div>
        </div>
      )}

      {!open && (
        <div className="mt-3 rounded-2xl bg-stone-100 px-3.5 py-2.5 text-sm font-semibold text-stone-700 ring-1 ring-black/5">
          🔒 Closed right now · opens {opensAt(id)}, closes {closesAt(id)}
        </div>
      )}
      {ev && (
        <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-rose-50 px-3.5 py-2.5 ring-1 ring-rose-100">
          <span className="text-lg">{ev.emoji}</span>
          <div>
            <p className="text-sm font-bold text-rose-800">{ev.title} is on!</p>
            <p className="text-xs text-rose-700/80">{ev.blurb}</p>
          </div>
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {place.actions.map((a, i) => (
          <motion.li key={a.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + i * 0.05 }}>
            <ActionRow
              a={a}
              enabled={at && !busy && open}
              onRun={() => {
                if (a.id === "climb") return climbTower();
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
  const interior = useGame((s) => s.interior);
  useClock();
  // phones: rooms start with the panel folded away so the room itself is visible
  const flip = useGame((s) => s.panelFlip);
  const setFlip = (v: string | null) => useGame.getState().patch({ panelFlip: v });
  const shown = interior ? { type: "interior", id: `${interior.kind}:${interior.id}` } : selected;
  const key = shown ? `${shown.type}:${shown.id}` : "";
  const busy = useGame((s) => !!s.busy);
  // folded on phones while you are doing something, so you can watch your character
  const min = busy || (interior ? flip !== key : flip === key);
  const setMin = () => setFlip(flip === key ? null : key);
  return (
    <AnimatePresence mode="wait">
      {shown && (
        <motion.aside
          key={`${shown.type}:${shown.id}`}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className={`absolute inset-x-3 bottom-3 z-20 ${min ? "max-sm:max-h-12 max-sm:overflow-hidden max-sm:py-2" : interior ? "max-h-[44dvh]" : "max-h-[62dvh]"} overflow-y-auto rounded-[1.6rem] bg-white/80 p-5 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-white/60 backdrop-blur-2xl sm:inset-x-auto sm:bottom-auto sm:right-5 sm:top-20 sm:max-h-[calc(100dvh-7rem)] sm:w-[24rem]`}
        >
          <button
            onClick={setMin}
            aria-label={min ? "Show panel" : "Hide panel"}
            className="mx-auto -mt-2 mb-2 flex w-full items-center justify-center gap-1 text-[11px] font-semibold text-stone-400 sm:hidden"
          >
            <span className="h-1 w-10 rounded-full bg-stone-300" />
            {min && !busy ? "Show panel" : ""}
          </button>
          <div className={min ? "max-sm:hidden" : ""}>
            {interior ? <InteriorPanel /> : selected?.type === "place" ? <PlaceBody id={selected.id} /> : selected?.type === "npc" ? <NpcPanel id={selected.id} /> : selected ? <PlotPanelBody id={selected.id} /> : null}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
