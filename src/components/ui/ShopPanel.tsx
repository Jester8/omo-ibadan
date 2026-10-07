"use client";

import { useState } from "react";
import { Shirt, ShoppingBasket } from "lucide-react";
import { useGame } from "@/lib/store";
import { naira } from "@/lib/plots";
import { buyGood, CLOTHES, FOOD, type Good } from "@/lib/shop";

/** What this market or mall sells: groceries for your provisions, and clothes. A clean list, one line each. */
export default function ShopPanel({ clothes = true }: { clothes?: boolean }) {
  const [tab, setTab] = useState<"food" | "clothes">("food");
  const money = useGame((s) => s.money);
  const pantry = useGame((s) => s.pantry);
  const frame = useGame((s) => s.profile?.look.frame ?? "m");
  const list = (tab === "food" ? FOOD : CLOTHES).filter((g) => !g.frames || g.frames.includes(frame));

  const buy = (g: Good) => {
    const err = buyGood(g);
    if (err) useGame.getState().toast(err, "bad");
  };

  return (
    <div className="mt-4 rounded-2xl bg-white ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-2 border-b border-stone-100 px-3 py-2.5">
        <div className="flex gap-1">
          <button onClick={() => setTab("food")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition active:scale-95 ${tab === "food" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`}>
            <ShoppingBasket className="size-3.5" /> Food
          </button>
          {clothes && (
            <button onClick={() => setTab("clothes")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition active:scale-95 ${tab === "clothes" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`}>
              <Shirt className="size-3.5" /> Clothes
            </button>
          )}
        </div>
        <p className="text-[11px] font-semibold text-stone-500">{tab === "food" ? `Provisions: ${pantry}` : naira(money)}</p>
      </div>
      <ul className="max-h-56 divide-y divide-stone-100 overflow-y-auto">
        {list.map((g) => (
          <li key={g.id} className="flex items-center gap-3 px-3 py-2">
            <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-stone-50 text-xl">
              {g.emoji}
              {g.swatch && <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-white" style={{ background: g.swatch }} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold text-stone-900">{g.name}</span>
              <span className="block truncate text-[11px] text-stone-500">{g.pantry ? `+${g.pantry} meal${g.pantry > 1 ? "s" : ""} of provisions` : g.blurb}</span>
            </span>
            <button disabled={money < g.price} onClick={() => buy(g)} className="shrink-0 rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40">
              {naira(g.price)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
