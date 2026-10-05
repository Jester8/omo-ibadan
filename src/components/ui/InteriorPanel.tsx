"use client";

import { motion } from "motion/react";
import { DoorOpen, Lightbulb, ZapOff } from "lucide-react";
import { PLACES } from "@/lib/places";
import { useGame } from "@/lib/store";
import { useClock } from "@/lib/hooks";
import { exitInterior, GENERATOR_FUEL, powerOn, rt, walkToFurn } from "@/lib/interiorRuntime";
import { naira, plotById } from "@/lib/plots";
import { ActionRow, VoiceRoomCard } from "./parts";

export default function InteriorPanel() {
  const interior = useGame((s) => s.interior);
  const busy = useGame((s) => s.busy);
  const generatorUntil = useGame((s) => s.generatorUntil);
  const plots = useGame((s) => s.plots);
  const { now } = useClock();
  const layout = interior ? rt.layout : null;
  if (!interior || !layout) return null;

  const place = interior.kind === "place" ? PLACES.find((p) => p.id === interior.id) : undefined;
  const plot = interior.kind === "home" && interior.id !== "flat" ? plots[interior.id] : undefined;
  const power = powerOn();
  const genLeft = Math.max(0, Math.ceil((generatorUntil - now) / 1000));
  const genIndex = layout.items.findIndex((it) => it.kind === "generator");
  const subtitle = place
    ? `${place.kind} · ${place.district}`
    : interior.id === "flat"
      ? "Your rented room and parlour"
      : plot
        ? `${plotById(interior.id)?.district} · ${plot.ownerName}`
        : "Home";

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-amber-100 text-2xl">{place?.emoji ?? "🏠"}</div>
          <div>
            <h2 className="text-lg font-semibold leading-tight text-stone-900">{layout.name}</h2>
            <p className="text-xs font-semibold text-amber-700 first-letter:uppercase">{subtitle}</p>
          </div>
        </div>
        <button onClick={exitInterior} className="flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-stone-700 active:scale-95">
          <DoorOpen className="size-3.5" /> Leave
        </button>
      </div>

      <div className={`mt-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ring-1 ${power ? "bg-emerald-50 ring-emerald-100" : "bg-amber-50 ring-amber-200"}`}>
        <div className="flex items-center gap-2.5">
          {power ? <Lightbulb className="size-4 text-emerald-600" /> : <ZapOff className="size-4 text-amber-600" />}
          <div>
            <p className={`text-sm font-semibold ${power ? "text-emerald-800" : "text-amber-800"}`}>{power ? "Light is on" : "NEPA took light"}</p>
            <p className="text-xs text-stone-500">{genLeft > 0 ? `Generator running · ${Math.floor(genLeft / 60)}:${String(genLeft % 60).padStart(2, "0")} left` : power ? "Fans, TV and fridge work" : "TV, fridge and fans are off"}</p>
          </div>
        </div>
        {!power && genIndex >= 0 && (
          <button onClick={() => walkToFurn(genIndex)} className="rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600 active:scale-95">
            Gen · {naira(GENERATOR_FUEL)}
          </button>
        )}
      </div>

      {busy && (
        <div className="mt-3 overflow-hidden rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
          <p className="text-sm font-semibold text-emerald-800">{busy.label}…</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-100">
            <motion.div key={busy.start} className="h-full rounded-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: busy.secs, ease: "linear" }} />
          </div>
        </div>
      )}

      <p className="mt-3 hidden text-sm text-stone-600 sm:block">
        Tap furniture to use it: sofas and chairs to relax, beds to sleep, the stove to cook, the TV for a show.
      </p>

      {place && (
        <ul className="mt-4 space-y-2">
          {place.actions.map((a) => (
            <li key={a.id}>
              <ActionRow
                a={a}
                enabled={!busy}
                onRun={() => {
                  const err = useGame.getState().runAction(a);
                  if (err) useGame.getState().toast(err, "bad");
                }}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3">
        <VoiceRoomCard room={place ? `place:${place.id}` : `home:${interior.id}`} label={place ? `${place.name} voice` : "House party voice"} />
      </div>
    </>
  );
}
