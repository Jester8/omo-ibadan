"use client";

import { useState } from "react";
import { Droplets, Toilet, Utensils } from "lucide-react";
import { useGame } from "@/lib/store";
import { naira } from "@/lib/plots";
import { HOME_MENU } from "@/lib/menu";
import type { ActionDef } from "@/lib/places";
import FoodArt from "./FoodArt";

type Tab = "cook" | "eat" | "order" | "bath";

const run = (a: ActionDef) => {
  const err = useGame.getState().runAction(a);
  if (err) useGame.getState().toast(err, "bad");
};

/** Everything you do at home: cook, eat what you made, order food in, use the toilet and take a bath. */
export default function HomeLife() {
  const pantry = useGame((s) => s.pantry);
  const plates = useGame((s) => s.plates);
  const dishes = useGame((s) => s.dishes);
  const money = useGame((s) => s.money);
  const busy = useGame((s) => !!s.busy);
  const bladder = useGame((s) => s.needs.bladder);
  const hygiene = useGame((s) => s.needs.hygiene);
  const cooked = HOME_MENU.filter((d) => (dishes[d.id] ?? 0) > 0);
  const counted = cooked.reduce((n, d) => n + (dishes[d.id] ?? 0), 0);
  const leftovers = Math.max(0, plates - counted); // meals from before dishes were tracked
  const [tab, setTab] = useState<Tab>(cooked.length || leftovers ? "eat" : "cook");

  const chip = (id: Tab, label: string) => (
    <button key={id} onClick={() => setTab(id)} className={`flex-1 rounded-xl py-2 text-xs font-bold transition active:scale-95 ${tab === id ? "bg-stone-900 text-white" : "bg-white text-stone-700 ring-1 ring-black/10"}`}>
      {label}
    </button>
  );
  const tile = "flex min-w-0 flex-col items-center gap-1 rounded-2xl bg-white p-2.5 text-center ring-1 ring-black/5 transition enabled:active:scale-[0.97] enabled:hover:bg-emerald-50 disabled:opacity-45";

  return (
    <div className="mt-3 rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-100">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-sm font-bold text-amber-950">
          <Utensils className="size-4" /> Home life
        </p>
        <p className="text-[11px] font-semibold text-amber-900/80">
          Foodstuff <b>{pantry}</b> · Cooked <b>{plates}</b>
        </p>
      </div>
      <div className="mt-2 flex gap-1.5">
        {chip("cook", "Cook")}
        {chip("eat", "Eat")}
        {chip("order", "Order")}
        {chip("bath", "Bathroom")}
      </div>

      {tab === "cook" && (
        <>
          <p className="mt-2 text-[11px] text-amber-900/80">Pick a dish. It uses foodstuff from your pantry, and you can serve it to friends.</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {HOME_MENU.map((d) => (
              <button
                key={d.id}
                disabled={busy || pantry < d.pantry}
                onClick={() => run({ id: `cook-${d.id}`, label: `Cook ${d.name}`, secs: d.cookSecs, pantry: -d.pantry, plates: 1, dish: d.id, gain: { energy: -4, fun: 3 } })}
                className={tile}
              >
                <FoodArt dish={d.art} className="size-12" />
                <span className="w-full truncate text-[12px] font-bold text-black">{d.name}</span>
                <span className="text-[10px] text-stone-500">
                  {d.pantry} foodstuff · {d.cookSecs}s
                </span>
              </button>
            ))}
          </div>
          {pantry === 0 && (
            <button disabled={busy || money < 2200} onClick={() => run({ id: "groceries", label: "Order groceries", secs: 3, cost: 2200, pantry: 4 })} className="mt-2 w-full rounded-xl bg-amber-600 py-2.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40">
              Pantry empty: order groceries · {naira(2200)}
            </button>
          )}
        </>
      )}

      {tab === "eat" && (
        <>
          {cooked.length === 0 && leftovers === 0 ? (
            <p className="mt-2 rounded-xl bg-white p-3 text-xs text-stone-600 ring-1 ring-black/5">Nothing cooked yet. Cook a dish, or order one in.</p>
          ) : (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {cooked.map((d) => (
                <button key={d.id} disabled={busy} onClick={() => run({ id: `eat-${d.id}`, label: `Eat ${d.name}`, secs: 5, plates: -1, dish: d.id, gain: { hunger: d.hunger, fun: d.fun, bladder: -6 } })} className={tile}>
                  <FoodArt dish={d.art} className="size-12" />
                  <span className="w-full truncate text-[12px] font-bold text-black">{d.name}</span>
                  <span className="text-[10px] text-stone-500">x{dishes[d.id]} ready</span>
                </button>
              ))}
              {leftovers > 0 && (
                <button disabled={busy} onClick={() => run({ id: "eatmeal", label: "Eat a home meal", secs: 5, plates: -1, gain: { hunger: 55, fun: 4, bladder: -6 } })} className={tile}>
                  <span className="grid size-12 place-items-center text-3xl">🍲</span>
                  <span className="text-[12px] font-bold text-black">Home meal</span>
                  <span className="text-[10px] text-stone-500">x{leftovers} ready</span>
                </button>
              )}
            </div>
          )}
          <p className="mt-2 text-[11px] text-amber-900/80">A meal or two is enough. When you are full, eating waits until you are hungry again.</p>
        </>
      )}

      {tab === "order" && (
        <>
          <p className="mt-2 text-[11px] text-amber-900/80">Order in and it arrives at your door in a few seconds, ready to eat or to serve.</p>
          <ul className="mt-2 space-y-1.5">
            {HOME_MENU.map((d) => (
              <li key={d.id} className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-1.5 ring-1 ring-black/5">
                <FoodArt dish={d.art} className="size-11 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-bold text-black">{d.name}</span>
                  <span className="block truncate text-[10.5px] text-stone-500">{d.blurb}</span>
                </span>
                <button disabled={busy || money < d.order} onClick={() => run({ id: `order-${d.id}`, label: `Order ${d.name}`, secs: 4, cost: d.order, plates: 1, dish: d.id })} className="shrink-0 rounded-full bg-emerald-700 px-3 py-1.5 text-[11px] font-bold text-white transition active:scale-95 disabled:opacity-40">
                  {naira(d.order)}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {tab === "bath" && (
        <div className="mt-2 space-y-2">
          <button disabled={busy} onClick={() => run({ id: "toilet", label: "Use the toilet", secs: 4, gain: { bladder: 100 } })} className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left ring-1 ring-black/5 transition enabled:active:scale-[0.98] disabled:opacity-45">
            <span className="grid size-10 place-items-center rounded-xl bg-lime-100 text-lime-700">
              <Toilet className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-black">Use the toilet</span>
              <span className="block text-[11px] text-stone-500">Relief level {Math.round(bladder)}%</span>
            </span>
          </button>
          <button disabled={busy} onClick={() => run({ id: "bath", label: "Take a bath", secs: 7, gain: { hygiene: 100, energy: 6, fun: 5 } })} className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left ring-1 ring-black/5 transition enabled:active:scale-[0.98] disabled:opacity-45">
            <span className="grid size-10 place-items-center rounded-xl bg-cyan-100 text-cyan-700">
              <Droplets className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-black">Take a bath</span>
              <span className="block text-[11px] text-stone-500">Cleanliness {Math.round(hygiene)}%</span>
            </span>
          </button>
          <button disabled={busy} onClick={() => run({ id: "wash", label: "Wash your hands and face", secs: 2, gain: { hygiene: 15 } })} className="w-full rounded-xl bg-white py-2.5 text-xs font-bold text-stone-700 ring-1 ring-black/10 transition enabled:active:scale-95 disabled:opacity-45">
            Wash your hands and face
          </button>
        </div>
      )}
    </div>
  );
}
