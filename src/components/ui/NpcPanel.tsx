"use client";

import { useState } from "react";
import { Footprints, Gift, GlassWater, Heart, HeartHandshake, MessageCircle, Sparkles, X } from "lucide-react";
import { NPCS } from "@/components/world/People";
import { useSecond } from "@/lib/hooks";
import { me } from "@/lib/playerState";
import { naira } from "@/lib/plots";
import { askGirlfriend, askOut, buyDrink, compliment, DATES, gift, girlById, NEW_REL, STATUS_LABEL, takeOnDate, talk, type Outcome } from "@/lib/romance";
import { useGame } from "@/lib/store";
import { walkTo } from "@/lib/movement";

const chip = "flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition active:scale-95 disabled:opacity-40";

export default function NpcPanel({ id }: { id: string }) {
  useSecond();
  const girl = girlById(id);
  const npc = NPCS.find((n) => n.id === id);
  const rel = useGame((s) => s.romance[id]) ?? NEW_REL;
  const busy = useGame((s) => s.busy);
  const money = useGame((s) => s.money);
  const [say, setSay] = useState<string>("");
  const close = () => useGame.getState().select(null);
  if (!npc) return null;

  const dist = Math.hypot(me.x - npc.st.x, me.z - npc.st.z);
  const near = dist < 3.2;
  const act = (fn: (id: string) => Outcome) => {
    const o = fn(id);
    if (o.err) useGame.getState().toast(o.err, "bad");
    else setSay(o.say);
  };

  const hearts = Math.round(rel.affection / 20);
  const canDate = rel.status === "dating" || rel.status === "girlfriend";

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold leading-tight text-stone-900">{npc.name}</h2>
          <p className="text-xs font-semibold text-rose-600">{STATUS_LABEL[rel.status]}</p>
        </div>
        <button onClick={close} aria-label="Close" className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
          <X className="size-5" />
        </button>
      </div>
      {girl && <p className="mt-1 text-xs text-stone-500">{girl.bio} Likes: {girl.likes.toLowerCase()}.</p>}

      <div className="mt-3 flex items-center gap-1" aria-label={`${rel.affection} affection`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Heart key={i} className={`size-5 transition ${i < hearts ? "fill-rose-500 text-rose-500" : "text-stone-300"}`} />
        ))}
        <span className="ml-2 text-xs font-semibold text-stone-500">{Math.round(rel.affection)}/100</span>
      </div>

      {say && <p className="mt-3 rounded-2xl rounded-tl-sm bg-rose-50 px-3.5 py-2.5 text-sm text-rose-950 ring-1 ring-rose-100">{say}</p>}

      {!near ? (
        <button onClick={() => walkTo(npc.st.x, npc.st.z + 0.9)} className={`${chip} mt-3 w-full bg-stone-900 text-white`}>
          <Footprints className="size-4" /> Walk up to {npc.name}
        </button>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button disabled={!!busy} onClick={() => act(talk)} className={`${chip} bg-stone-100 text-stone-800`}>
              <MessageCircle className="size-4" /> Chat
            </button>
            <button disabled={!!busy} onClick={() => act(compliment)} className={`${chip} bg-stone-100 text-stone-800`}>
              <Sparkles className="size-4" /> Compliment
            </button>
            <button disabled={!!busy || money < 1500} onClick={() => act(buyDrink)} className={`${chip} bg-stone-100 text-stone-800`}>
              <GlassWater className="size-4" /> Drink · {naira(1500)}
            </button>
            <button disabled={!!busy || money < 5000} onClick={() => act(gift)} className={`${chip} bg-stone-100 text-stone-800`}>
              <Gift className="size-4" /> Gift · {naira(5000)}
            </button>
          </div>
          {rel.status !== "dating" && rel.status !== "girlfriend" && (
            <button disabled={!!busy} onClick={() => act(askOut)} className={`${chip} mt-2 w-full bg-rose-600 text-white`}>
              <Heart className="size-4" /> Ask her out
            </button>
          )}
          {rel.status === "dating" && (
            <button disabled={!!busy} onClick={() => act(askGirlfriend)} className={`${chip} mt-2 w-full bg-rose-600 text-white`}>
              <HeartHandshake className="size-4" /> Ask her to be your girlfriend
            </button>
          )}
          {canDate && (
            <>
              <p className="mb-2 mt-4 text-sm font-bold text-stone-900">Take her on a date</p>
              <ul className="space-y-2">
                {DATES.map((d) => (
                  <li key={d.id} className="flex items-center justify-between gap-3 rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-stone-900">{d.label}</p>
                      <p className="text-xs text-stone-500">{d.blurb} +{d.gain} ♥</p>
                    </div>
                    <button
                      disabled={!!busy || money < d.cost}
                      onClick={() => act((i) => takeOnDate(i, d.id))}
                      className="shrink-0 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition active:scale-95 disabled:bg-stone-200 disabled:text-stone-400"
                    >
                      {naira(d.cost)}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
}
