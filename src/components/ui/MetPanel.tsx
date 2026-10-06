"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart, PhoneCall, PhoneOff } from "lucide-react";
import { useClock } from "@/lib/hooks";
import { GIRLS, NEW_REL, STATUS_LABEL, talk } from "@/lib/romance";
import { useGame } from "@/lib/store";

function FriendCall({ id, onEnd }: { id: string; onEnd: () => void }) {
  const g = GIRLS.find((x) => x.id === id)!;
  const { hour } = useClock();
  const asleep = hour >= 23 || hour < 6;
  const [phase, setPhase] = useState<"ringing" | "live" | "none">("ringing");
  const [line, setLine] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      if (asleep) setPhase("none");
      else {
        setPhase("live");
        setLine(talk(id).say);
      }
    }, 1800);
    return () => clearTimeout(t);
  }, [id, asleep]);
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <motion.div
        animate={phase === "ringing" ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="grid size-24 place-items-center rounded-full bg-rose-100 text-3xl font-bold text-rose-700"
      >
        {g.name.slice(0, 1)}
      </motion.div>
      <p className="mt-4 text-xl font-bold text-stone-900">{g.name}</p>
      <p className="mt-1 text-sm text-stone-500">{phase === "ringing" ? "Calling…" : phase === "none" ? "No answer. She's asleep." : "Connected"}</p>
      {phase === "live" && <p className="mt-4 max-w-xs rounded-2xl rounded-tl-sm bg-rose-50 px-4 py-2.5 text-sm text-rose-950 ring-1 ring-rose-100">{line}</p>}
      <div className="mt-6 flex items-center gap-3">
        {phase === "live" && (
          <button onClick={() => { const o = talk(id); if (o.err) useGame.getState().toast(o.err, "bad"); else setLine(o.say); }} className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition active:scale-95">
            Keep talking
          </button>
        )}
        <button onClick={onEnd} className="grid size-14 place-items-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-600/30 transition active:scale-90" aria-label="Hang up">
          <PhoneOff className="size-6" />
        </button>
      </div>
    </div>
  );
}

export function MetPanel() {
  const [calling, setCalling] = useState<string | null>(null);
  const romance = useGame((s) => s.romance);
  const known = GIRLS.filter((g) => (romance[g.id] ?? NEW_REL).affection > 0 || (romance[g.id]?.status ?? "stranger") !== "stranger");

  if (calling) return <FriendCall id={calling} onEnd={() => setCalling(null)} />;

  return (
    <>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">People of Ibadan you&apos;ve met</p>
      {known.length === 0 ? (
        <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5">Tap someone in the city to say hello. The people you get to know show up here.</p>
      ) : (
        <ul className="space-y-2">
          {known.map((g) => {
            const r = romance[g.id] ?? NEW_REL;
            return (
              <li key={g.id} className="flex items-center justify-between gap-3 rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-stone-900">{g.name}</p>
                  <p className="flex items-center gap-1 text-xs text-rose-600">
                    <Heart className="size-3 fill-rose-500" /> {STATUS_LABEL[r.status]} · {Math.round(r.affection)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button onClick={() => setCalling(g.id)} aria-label={`Call ${g.name}`} className="grid size-9 place-items-center rounded-full bg-emerald-600 text-white transition active:scale-90">
                    <PhoneCall className="size-4" />
                  </button>
                  <button
                    onClick={() => {
                      useGame.getState().patch({ selected: { type: "npc", id: g.id }, sheet: null });
                    }}
                    className="rounded-full bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white transition active:scale-95"
                  >
                    Meet
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

    </>
  );
}
