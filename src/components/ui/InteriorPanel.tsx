"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { DoorOpen, Lightbulb, Music2, Play, Volume2, VolumeX, X, ZapOff } from "lucide-react";
import { PLACES } from "@/lib/places";
import { useGame } from "@/lib/store";
import { useClock } from "@/lib/hooks";
import { climbTower, exitInterior, GENERATOR_FUEL, powerOn, rt, walkToFurn } from "@/lib/interiorRuntime";
import { naira, plotById } from "@/lib/plots";
import { ActionRow, VoiceRoomCard } from "./parts";
import HereNow from "./HereNow";
import HomeLife from "./HomeLife";
import BusinessCenter from "./BusinessCenter";
import { payBusiness, workShift } from "@/lib/bank";
import FoodArt from "./FoodArt";
import { HOME_MENU } from "@/lib/menu";
import ShopPanel from "./ShopPanel";
import { DECOR, MAX_PER_KIND } from "@/lib/decor";
import { bizById } from "@/lib/business";
import type { ActionDef } from "@/lib/places";
import { interiorKey } from "@/lib/interiors";
import { net } from "@/lib/net";
import { refreshInterior } from "@/lib/interiorRuntime";
import { playClubMusic } from "@/lib/clubMusic";
import { useMusic } from "@/lib/music";
import { useClub, useSound } from "@/lib/soundStore";

/** What the club is playing, and a switch for the sound (the same mute as everywhere else). */
function ClubLine() {
  const track = useMusic((s) => s.current);
  const playing = useMusic((s) => s.playing);
  const blocked = useMusic((s) => s.blocked);
  const yielded = useClub((s) => s.yielded);
  const muted = useSound((s) => s.muted);
  const off = yielded && !track;
  const title = off ? "Club music is off" : blocked ? "Tap anywhere to start the music" : track ? `${track.title} · ${track.artist}` : "Getting the music on…";
  const sub = off ? "The house band is on standby" : muted ? "Sound is muted" : track ? `© ${track.rightsHolder}. All rights reserved.` : "";
  return (
    <div data-music-card className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-violet-50 px-4 py-2.5 ring-1 ring-violet-100">
      <div className="flex min-w-0 items-center gap-2.5">
        <Music2 className={`size-4 shrink-0 ${playing && !muted ? "animate-pulse text-violet-600" : "text-stone-400"}`} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-violet-950">{title}</p>
          {sub && <p className="truncate text-xs text-stone-500">{sub}</p>}
        </div>
      </div>
      {off ? (
        <button onClick={playClubMusic} aria-label="Play the club music" className="grid size-8 shrink-0 place-items-center rounded-full bg-violet-600 text-white transition hover:bg-violet-700 active:scale-90">
          <Play className="size-4" />
        </button>
      ) : (
        <button onClick={() => useSound.getState().set({ muted: !muted })} aria-label={muted ? "Unmute" : "Mute"} className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-violet-700 ring-1 ring-violet-200 transition hover:bg-violet-100 active:scale-90">
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
      )}
    </div>
  );
}

export default function InteriorPanel() {
  const interior = useGame((s) => s.interior);
  const busy = useGame((s) => s.busy);
  const generatorUntil = useGame((s) => s.generatorUntil);
  const plots = useGame((s) => s.plots);
  const decor = useGame((s) => s.decor);
  const money = useGame((s) => s.money);
  const pid = useGame((s) => s.profile?.id);
  const remotes = useGame((s) => s.remotes);
  const doing = useGame((s) => s.doing);
  const plates = useGame((s) => s.plates);
  const dishes = useGame((s) => s.dishes);
  const [serveId, setServeId] = useState<string | null>(null);
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
  const isStaff = !!biz && !mineBiz && !!plot?.staff?.some((s) => s.pid === pid);
  // hosting: serve the people who are with you. A home uses up a cooked meal; a cafe, shop or gym serves from stock.
  const mineHome = interior.kind === "home" && !biz && !!plot && plot.ownerId === pid;
  const guests = Object.values(remotes).filter((r) => r.room === interiorKey(interior));
  const SERVE_BIZ: Record<string, string> = { cafe: "coffee and a pastry", shop: "snacks and a cold drink", gym: "a cold drink" };
  // what you have cooked, so you choose which dish to serve
  const cookedDishes = HOME_MENU.filter((d) => (dishes[d.id] ?? 0) > 0);
  const picked = cookedDishes.find((d) => d.id === serveId) ?? cookedDishes[0];
  const canServe = (mineHome && (!!picked || plates > 0)) || (mineBiz && !!biz && !!SERVE_BIZ[biz.id]);
  // visiting someone at home: they are the host, and you can join in with what they are doing
  const visiting = interior.kind === "home" && !biz && !!plot && plot.ownerId !== pid;
  const host = visiting ? Object.values(remotes).find((r) => r.pid === plot?.ownerId && r.room === interiorKey(interior)) : undefined;
  const hostDoing = host ? (doing[host.id] ?? "").toLowerCase() : "";
  const joinAction: ActionDef | null = !host
    ? null
    : hostDoing.includes("cook")
      ? { id: "helpcook", label: `Help ${host.name} cook`, secs: 5, gain: { fun: 6, social: 12, energy: -4 } }
      : hostDoing.includes("eat")
        ? { id: "sharemeal", label: `Share the meal with ${host.name}`, secs: 5, gain: { hunger: 45, fun: 5, social: 10 } }
        : null;
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
          <div className="grid size-12 place-items-center rounded-2xl bg-amber-100 text-2xl">{place?.emoji ?? biz?.emoji ?? "🏠"}</div>
          <div>
            <h2 className="text-lg font-semibold leading-tight text-stone-900">{layout.name}</h2>
            <p className="text-xs font-semibold text-amber-700 first-letter:uppercase">{subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button onClick={exitInterior} className="flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-stone-700 active:scale-95">
            <DoorOpen className="size-3.5" /> Leave
          </button>
          <button onClick={() => useGame.setState({ panelHidden: true })} aria-label="Close the panel" title="Close the panel" className="grid size-8 place-items-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200 active:scale-90">
            <X className="size-4" />
          </button>
        </div>
      </div>

      <HereNow />
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

      {layout.vibe === "club" && <ClubLine />}

      {busy && (
        <div className="mt-3 overflow-hidden rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
          <p className="text-sm font-semibold text-emerald-800">{busy.label}…</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-100">
            <motion.div key={busy.start} className="h-full rounded-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: busy.secs, ease: "linear" }} />
          </div>
        </div>
      )}

      <p className="mt-3 hidden text-sm text-stone-600 sm:block">
        {biz
          ? mineBiz
            ? `Your ${biz.name.toLowerCase()} is open. Set prices, watch sales and hire staff below.`
            : biz.tip
          : "Tap furniture to use it: sofas and chairs to sit (friends in the room see you settle in), beds to sleep, the stove to cook, the TV for a show."}
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
                  // the tower's stairs: pay, climb, and arrive on the viewing deck
                  if (a.id === "climb") return climbTower();
                  const err = useGame.getState().runAction(a);
                  if (err) useGame.getState().toast(err, "bad");
                }}
              />
            </li>
          ))}
        </ul>
      )}

      {(mineHome || (mineBiz && biz && SERVE_BIZ[biz.id])) && guests.length > 0 && (
        <div className="mt-3 rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-100">
          <p className="text-sm font-bold text-amber-950">Serve your guests</p>
          <p className="mt-0.5 text-xs text-amber-900/80">{mineHome ? (plates > 0 ? `You have ${plates} cooked meal${plates > 1 ? "s" : ""}. Each plate you serve uses one.` : "No cooked food. Cook or order a dish first, then serve it.") : "Serve a guest from your stock."}</p>
          {mineHome && cookedDishes.length > 0 && (
            <div className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
              {cookedDishes.map((d) => (
                <button key={d.id} onClick={() => setServeId(d.id)} className={`flex shrink-0 items-center gap-1.5 rounded-full py-1 pl-1 pr-2.5 text-[11px] font-bold transition active:scale-95 ${picked?.id === d.id ? "bg-amber-500 text-white" : "bg-white text-stone-800 ring-1 ring-black/10"}`}>
                  <FoodArt dish={d.art} className="size-6" />
                  {d.name.split(" ")[0]} x{dishes[d.id]}
                </button>
              ))}
            </div>
          )}
          <ul className="mt-2 space-y-1.5">
            {guests.map((g) => (
              <li key={g.id} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 ring-1 ring-black/5">
                <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-black">{g.name}</span>
                <button
                  disabled={!canServe}
                  onClick={() => {
                    const dish = mineBiz && biz ? SERVE_BIZ[biz.id] : picked ? picked.name : "a home meal";
                    net.serve(g.id, dish, mineHome, picked?.id);
                    useGame.getState().toast(`Served ${g.name}: ${dish}`, "info");
                  }}
                  className="shrink-0 rounded-full bg-amber-500 px-3 py-1.5 text-[11px] font-bold text-white transition active:scale-95 disabled:opacity-40"
                >
                  Serve
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {visiting && (
        <div className="mt-3 rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
          <p className="text-sm font-bold text-emerald-900">{host ? `At ${host.name}'s home` : "Visiting"}</p>
          <p className="mt-0.5 text-xs text-emerald-800/80">
            {host ? (hostDoing ? `${host.name} is: ${hostDoing}. Join in below, or tap a seat to sit together.` : `${host.name} is here. Tap a sofa or chair to sit together.`) : "The host has stepped out."}
          </p>
          {joinAction && (
            <div className="mt-2">
              <ActionRow
                a={joinAction}
                enabled={!busy}
                onRun={() => {
                  const err = useGame.getState().runAction(joinAction);
                  if (err) useGame.getState().toast(err, "bad");
                }}
              />
            </div>
          )}
        </div>
      )}

      {mineBiz && <BusinessCenter plotId={interior.id} />}

      {biz && !mineBiz && (
        <ul className="mt-4 space-y-2">
          {bizAction && (
            <li>
              <ActionRow
                a={{ ...bizAction, cost: plot?.price ?? biz.price }}
                enabled={!busy}
                onRun={async () => {
                  // you pay the owner's price at the counter, and they are paid live
                  const price = plot?.price ?? biz.price;
                  if (useGame.getState().money < price) return useGame.getState().toast(`That costs ${naira(price)}.`, "bad");
                  const pay = await payBusiness(interior.id);
                  if (!pay.ok) return useGame.getState().toast(pay.message, "bad");
                  const err = useGame.getState().runAction({ ...bizAction, cost: 0 });
                  if (err) useGame.getState().toast(err, "bad");
                }}
              />
            </li>
          )}
          {isStaff && (
            <li>
              <ActionRow
                a={{ id: "shiftwork", label: `Work a shift for ${plot?.ownerName}: ${naira(plot?.wage ?? 2500)}`, secs: 6, gain: { energy: -18 }, rep: 1 }}
                enabled={!busy}
                onRun={() => {
                  const err = useGame.getState().runAction({ id: "shiftwork", label: "Work a shift", secs: 6, gain: { energy: -18 }, rep: 1 });
                  if (err) return useGame.getState().toast(err, "bad");
                  // when the shift is over, the owner pays the wage
                  setTimeout(() => void workShift(interior.id).then((r) => !r.ok && useGame.getState().toast(r.message, "bad")), 6400);
                }}
              />
            </li>
          )}
        </ul>
      )}

      {interior.kind === "home" && !biz && (interior.id === "flat" || mineHome) && <HomeLife />}

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
        <VoiceRoomCard room={place ? `place:${place.id}` : `home:${interior.id}`} label={place ? `${place.name} voice` : biz ? (mineBiz ? "Chat with customers" : `${biz.name} voice`) : "Talk together"} />
      </div>
    </>
  );
}
