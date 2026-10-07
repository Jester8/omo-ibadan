"use client";

import { climbTower } from "@/lib/interiorRuntime";
import { closesAt, eventFor, isOpen, opensAt } from "@/lib/events";
import GatePanel from "./GatePanel";
import PlayerPanel from "./PlayerPanel";
import CabPanel from "./CabPanel";
import { AnimatePresence, motion } from "motion/react";
import { DoorOpen, Footprints, MapPin, PanelRightOpen, X } from "lucide-react";
import { PLACES, KIND_COLORS } from "@/lib/places";
import { useGame } from "@/lib/store";
import { useClock } from "@/lib/hooks";
import { driveToPlace, quoteRide, rideToPlace, walkToPlace } from "@/lib/movement";
import { RIDES, carById, type RideId } from "@/lib/cars";
import { me } from "@/lib/playerState";
import { useEffect, useMemo, useState } from "react";
import { naira } from "@/lib/plots";
import { ActionRow, VoiceRoomCard } from "./parts";
import HereNow from "./HereNow";
import ShopPanel from "./ShopPanel";
import PlotPanelBody from "./PlotPanel";
import InteriorPanel from "./InteriorPanel";
import { enterInterior } from "@/lib/interiorRuntime";
import { placeLayout } from "@/lib/layouts";

/** A photo of the place, if one has been added to public/places. Without one, nothing is shown. */
function PlacePhoto({ id }: { id: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/places/${id}.jpg`} alt="" onError={() => setOk(false)} className="mb-3 h-24 w-full rounded-2xl object-cover sm:h-32" />;
}

function PlaceBody({ id }: { id: string }) {
  const place = PLACES.find((p) => p.id === id)!;
  const at = useGame((s) => s.atPlace === id);
  const busy = useGame((s) => s.busy);
  const select = useGame((s) => s.select);
  const color = KIND_COLORS[place.kind];
  const { hour } = useClock();
  const ev = eventFor(id, hour);
  const open = isOpen(id, hour);
  const money = useGame((s) => s.money);
  const myCars = useGame((s) => s.cars);
  const px = Math.round(me.x);
  const pz = Math.round(me.z);
  const quotes = useMemo(() => {
    void px;
    void pz;
    const rides = {} as Record<RideId, { fare: number; metres: number } | null>;
    let walk = 0;
    for (const r of RIDES) {
      rides[r.id] = quoteRide(id, r.id);
      if (rides[r.id]) walk = rides[r.id]!.metres;
    }
    return walk ? { rides, walk } : null;
  }, [id, px, pz]);

  return (
    <>
      <PlacePhoto id={id} />
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: `${color}22` }}>
            {place.emoji}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold leading-tight text-stone-900 sm:text-lg">{place.name}</h2>
            <p className="text-xs font-semibold capitalize" style={{ color }}>
              {place.kind} · {place.district}
            </p>
          </div>
        </div>
        <button onClick={() => select(null)} aria-label="Close" className="shrink-0 rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
          <X className="size-5" />
        </button>
      </div>
      <p className="mt-3 text-sm text-stone-600">{place.blurb}</p>
      {at && <HereNow />}
      {at && place.kind === "shop" && open && <ShopPanel />}

      {!at && (
        <div className="mt-4">
          <div className="flex items-start gap-2 rounded-2xl bg-stone-100 px-3.5 py-2.5 text-sm text-stone-700 ring-1 ring-black/5">
            <MapPin className="mt-0.5 size-4 shrink-0 text-stone-500" />
            <p>
              <b className="font-semibold text-stone-900">{place.name}</b>, {place.district}, Ibadan, Oyo State
              {quotes && <span className="text-stone-500"> · about {Math.round(quotes.walk)} m away</span>}
            </p>
          </div>
          <button
            onClick={() => walkToPlace(id)}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 active:scale-[0.98]"
          >
            <Footprints className="size-4" /> Walk here · free
          </button>
          {myCars.length > 0 && (
            <>
              <p className="mb-1.5 mt-3 text-xs font-bold uppercase tracking-wide text-stone-400">Drive yourself · free</p>
              <div className="grid grid-cols-2 gap-2">
                {myCars.map((cid) => {
                  const c = carById(cid);
                  return c ? (
                    <button key={cid} onClick={() => driveToPlace(id, cid)} className="rounded-2xl bg-emerald-50 px-2 py-2.5 text-center text-xs font-bold text-emerald-900 ring-1 ring-emerald-200 transition hover:bg-emerald-100 active:scale-[0.97]">
                      🚗 {c.name}
                    </button>
                  ) : null;
                })}
              </div>
            </>
          )}
          <p className="mb-1.5 mt-3 text-xs font-bold uppercase tracking-wide text-stone-400">Or pay for a ride</p>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {RIDES.map((r) => {
              const q = quotes?.rides[r.id];
              return (
                <button
                  key={r.id}
                  disabled={!q || money < q.fare}
                  onClick={() => rideToPlace(id, r.id)}
                  className="flex min-w-0 flex-col items-center gap-0.5 rounded-2xl bg-amber-50 px-1 py-2 text-center ring-1 ring-amber-200 sm:px-2 sm:py-2.5 transition hover:bg-amber-100 active:scale-[0.97] disabled:opacity-45"
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
                if (id === "airport" && (a.id === "book" || a.id === "board")) return useGame.getState().setSheet("flights");
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
  const shown = interior ? { type: "interior", id: `${interior.kind}:${interior.id}` } : selected;
  const key = shown ? `${shown.type}:${shown.id}` : "";
  const hidden = useGame((s) => s.panelHidden);
  // a new room or a new selection brings the panel back
  // and in your own home the panel stays out of the way, so the room fills the screen
  useEffect(() => {
    const st = useGame.getState();
    const it = st.interior;
    const plot = it && it.kind === "home" ? st.plots[it.id] : undefined;
    const atHome = !!it && it.kind === "home" && (it.id === "flat" || (!!plot && plot.ownerId === st.profile?.id && !plot.biz));
    useGame.setState({ panelHidden: atHome });
  }, [key]);
  // outside, a tapped place or house is a small card with its own close button
  const card = !interior;
  if (interior && hidden) {
    return (
      <button
        onClick={() => useGame.setState({ panelHidden: false })}
        aria-label="Open the panel"
        className="absolute bottom-[calc(5.4rem+env(safe-area-inset-bottom))] right-3 z-20 flex h-12 items-center gap-2 rounded-full bg-white/95 px-4 text-sm font-bold text-black shadow-xl ring-1 ring-black/10 backdrop-blur-xl transition active:scale-95 sm:right-5"
      >
        <PanelRightOpen className="size-5" /> Panel
      </button>
    );
  }
  return (
    <AnimatePresence mode="wait">
      {shown && (
        <motion.aside
          key={`${shown.type}:${shown.id}`}
          initial={{ opacity: 0, y: card ? -12 : 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: card ? -12 : 40, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className={`absolute z-20 overflow-y-auto rounded-[1.6rem] bg-white/85 p-4 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-white/60 backdrop-blur-2xl sm:inset-x-auto sm:bottom-auto sm:right-5 sm:top-20 sm:max-h-[calc(100dvh-7rem)] sm:w-[24rem] sm:p-5 ${
            card
              ? "left-3 top-[calc(env(safe-area-inset-top)+13.2rem)] max-h-[calc(100dvh-20.5rem-env(safe-area-inset-top))] w-[min(19.5rem,calc(100vw-1.5rem))] sm:left-auto"
              : "right-3 bottom-[calc(5.4rem+env(safe-area-inset-bottom))] max-h-[52dvh] w-[min(21.5rem,calc(100vw-1.5rem))] !rounded-[1.8rem]"
          }`}
        >
          <div>
            {interior ? <InteriorPanel /> : selected?.type === "place" ? <PlaceBody id={selected.id} /> : selected?.type === "player" ? <PlayerPanel id={selected.id} /> : selected?.type === "gate" ? <GatePanel id={selected.id} /> : selected?.type === "cab" ? <CabPanel id={selected.id} /> : selected ? <PlotPanelBody id={selected.id} /> : null}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
