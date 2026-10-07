"use client";

import { motion } from "motion/react";
import { DoorOpen, Lightbulb, ZapOff } from "lucide-react";
import { PLACES } from "@/lib/places";
import { useGame } from "@/lib/store";
import { useClock } from "@/lib/hooks";
import { exitInterior, GENERATOR_FUEL, powerOn, rt, walkToFurn } from "@/lib/interiorRuntime";
import { naira, plotById } from "@/lib/plots";
import { ActionRow, VoiceRoomCard } from "./parts";
import HereNow from "./HereNow";
import ShopPanel from "./ShopPanel";
import { DECOR, MAX_PER_KIND } from "@/lib/decor";
import { bizById } from "@/lib/business";
import type { ActionDef } from "@/lib/places";
import { refreshInterior } from "@/lib/interiorRuntime";

export default function InteriorPanel() {
  const interior = useGame((s) => s.interior);
  const busy = useGame((s) => s.busy);
  const generatorUntil = useGame((s) => s.generatorUntil);
  const plots = useGame((s) => s.plots);
  const decor = useGame((s) => s.decor);
  const money = useGame((s) => s.money);
  const pid = useGame((s) => s.profile?.id);
  const pantry = useGame((s) => s.pantry);
  const plates = useGame((s) => s.plates);
  const { now } = useClock();
  const layout = interior ? rt.layout : null;
  if (!interior || !layout) return null;

  const place = interior.kind === "place" ? PLACES.find((p) => p.id === interior.id) : undefined;
  const plot = interior.kind === "home" && interior.id !== "flat" ? plots[interior.id] : undefined;
  const biz = interior.kind === "home" ? bizById(plot?.biz) : undefined;
  const mineBiz = !!biz && plot?.ownerId === pid;
  // what you can do inside someone's business
  const BIZ_ACTIONS: Record<string, ActionDef> = {
    shop: { id: "snack", label: "Buy snacks & a cold drink", secs: 3, cost: 800, gain: { hunger: 22, fun: 4 } },
    salon: { id: "cut", label: "Get a fresh cut", secs: 5, cost: 2500, gain: { fun: 26, social: 8 } },
    cafe: { id: "coffee", label: "Coffee & a pastry", secs: 4, cost: 1500, gain: { hunger: 26, fun: 8, energy: 6 } },
    pharmacy: { id: "vitamins", label: "Buy vitamins", secs: 3, cost: 1200, gain: { energy: 14 } },
    gym: { id: "workout", label: "Day-pass workout", secs: 6, cost: 2000, gain: { fun: 22, energy: -10, social: 6 } },
    mart: { id: "bigshop", label: "Do a big shop (+3 provisions)", secs: 4, cost: 3500, pantry: 3 },
  };
  const bizAction = biz ? BIZ_ACTIONS[biz.id] : undefined;
  const power = powerOn();
  const genLeft = Math.max(0, Math.ceil((generatorUntil - now) / 1000));
  const genIndex = layout.items.findIndex((it) => it.kind === "generator");
  const subtitle = biz
    ? `${plotById(interior.id)?.district} · ${biz.emoji} ${biz.name}`
    : place
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

      <HereNow />
      {interior.kind === "home" && (
        <div className="mt-3">
          <VoiceRoomCard room={`home:${interior.id}`} label={biz ? "Chat with customers" : "Talk together"} />
        </div>
      )}
      {place?.kind === "shop" && <ShopPanel />}

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
        Tap furniture to use it: sofas and chairs to sit (friends in the room see you settle in), beds to sleep, the stove to cook, the TV for a show.
      </p>

      {place && (
        <ul className="mt-4 space-y-2">
          {place.actions.map((a) => (
            <li key={a.id}>
              <ActionRow
                a={a}
                enabled={!busy}
                onRun={() => {
                  if (place.id === "airport" && (a.id === "book" || a.id === "board")) return useGame.getState().setSheet("flights");
                  const err = useGame.getState().runAction(a);
                  if (err) useGame.getState().toast(err, "bad");
                }}
              />
            </li>
          ))}
        </ul>
      )}

      {biz && (
        <ul className="mt-4 space-y-2">
          {bizAction && (
            <li>
              <ActionRow
                a={bizAction}
                enabled={!busy}
                onRun={() => {
                  const err = useGame.getState().runAction(bizAction);
                  if (err) useGame.getState().toast(err, "bad");
                }}
              />
            </li>
          )}
          {mineBiz && (
            <li>
              <ActionRow
                a={{ id: "serve", label: "Serve customers", secs: 6, gain: { energy: -18 }, pay: 2500, rep: 1 }}
                enabled={!busy}
                onRun={() => {
                  const err = useGame.getState().runAction({ id: "serve", label: "Serve customers", secs: 6, gain: { energy: -18 }, pay: 2500, rep: 1 });
                  if (err) useGame.getState().toast(err, "bad");
                }}
              />
            </li>
          )}
        </ul>
      )}

      {interior.kind === "home" && !biz && (
        <div className="mt-3 rounded-2xl bg-amber-50 p-3.5 ring-1 ring-amber-100">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-amber-950">🍲 Kitchen</p>
              <p className="text-xs text-amber-800/80">
                Foodstuff <b>{pantry}</b> · Cooked meals <b>{plates}</b>
              </p>
            </div>
            <button
              disabled={!!busy || money < 2200}
              onClick={() => {
                const err = useGame.getState().runAction({ id: "groceries", label: "Order groceries", secs: 3, cost: 2200, pantry: 4 });
                if (err) useGame.getState().toast(err, "bad");
              }}
              className="shrink-0 rounded-full bg-amber-600 px-3.5 py-2 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40"
            >
              Groceries · {naira(2200)}
            </button>
          </div>
          <p className="mt-2 text-xs text-amber-900/70">Buy foodstuff here or at a market, cook at the stove, then eat at the dining table.</p>
        </div>
      )}

      {interior.kind === "home" && !biz && (interior.id === "flat" || plot?.ownerId === pid) && (
        <details className="mt-3 rounded-2xl bg-stone-50 ring-1 ring-black/5">
          <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-stone-800">Decorate your home</summary>
          <ul className="space-y-2 px-3 pb-3">
            {DECOR.map((d) => {
              const owned = (plot?.decor ?? decor[interior.id] ?? []).filter((x) => x === d.id).length;
              const locked = !!d.minTier && (plot?.tier ?? 0) < d.minTier;
              return (
                <li key={d.id} className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 ring-1 ring-black/5">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stone-900">
                      {d.name} {owned > 0 && <span className="text-xs font-medium text-emerald-600">×{owned}</span>}
                    </p>
                    <p className="text-xs text-stone-500">{locked ? "Needs a built house" : d.blurb}</p>
                  </div>
                  <button
                    disabled={locked || owned >= MAX_PER_KIND || money < d.price}
                    onClick={() => {
                      const st = useGame.getState();
                      const err = st.buyDecor(interior.id, d.id, plot?.tier ?? 0);
                      if (err) st.toast(err, "bad");
                      else {
                        refreshInterior();
                        st.toast(`${d.name} added`, "good");
                      }
                    }}
                    className="shrink-0 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition active:scale-95 disabled:bg-stone-200 disabled:text-stone-400"
                  >
                    {naira(d.price)}
                  </button>
                </li>
              );
            })}
          </ul>
        </details>
      )}

      <div className="mt-3">
        <VoiceRoomCard room={place ? `place:${place.id}` : `home:${interior.id}`} label={place ? `${place.name} voice` : "House party voice"} />
      </div>
    </>
  );
}
