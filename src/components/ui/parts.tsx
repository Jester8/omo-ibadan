"use client";

import { Mic, MicOff, PhoneOff } from "lucide-react";
import { useGame } from "@/lib/store";
import { voice } from "@/lib/voice";
import FoodArt, { dishFor } from "./FoodArt";
import { naira } from "@/lib/plots";
import type { ActionDef, Needs } from "@/lib/places";
import { TITLES, titleIndex } from "@/lib/titles";

const NEED_LABEL: Record<keyof Needs, string> = { hunger: "hunger", energy: "energy", fun: "fun", social: "social" };

export function Chips({ a }: { a: ActionDef }) {
  const out: { t: string; tone: "good" | "bad" | "lock" }[] = [];
  if (a.cost) out.push({ t: `−${naira(a.cost)}`, tone: "bad" });
  if (a.pay) out.push({ t: `+${naira(a.pay)}`, tone: "good" });
  for (const k of Object.keys(a.gain ?? {}) as (keyof Needs)[]) {
    const v = a.gain![k]!;
    out.push({ t: `${v > 0 ? "+" : "−"}${Math.abs(v)} ${NEED_LABEL[k]}`, tone: v > 0 ? "good" : "bad" });
  }
  if (a.rep) out.push({ t: `+${a.rep} rep`, tone: "good" });
  if (a.boostMs) out.push({ t: "keke boost", tone: "good" });
  if (a.minRep) out.push({ t: `needs ${TITLES[titleIndex(a.minRep)].name}`, tone: "lock" });
  return (
    <span className="mt-1 flex flex-wrap gap-1">
      {out.map((c, i) => (
        <span
          key={i}
          className={`rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold ${
            c.tone === "good" ? "bg-emerald-50 text-emerald-700" : c.tone === "bad" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-700"
          }`}
        >
          {c.t}
        </span>
      ))}
      <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10.5px] font-semibold text-stone-500">{a.secs}s</span>
    </span>
  );
}

export function ActionRow({ a, enabled, onRun }: { a: ActionDef; enabled: boolean; onRun: () => void }) {
  const dish = a.cost ? dishFor(a) : null;
  return (
    <button
      disabled={!enabled}
      onClick={onRun}
      className="group flex w-full items-center gap-3 rounded-2xl bg-stone-50 px-3 py-2.5 text-left ring-1 ring-black/5 transition hover:bg-emerald-50 hover:ring-emerald-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-stone-50 disabled:hover:ring-black/5 sm:px-4 sm:py-3"
    >
      {dish && <FoodArt dish={dish} className="size-12 shrink-0 sm:size-14" />}
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-stone-900">{a.label}</span>
        <Chips a={a} />
      </span>
    </button>
  );
}

export function VoiceRoomCard({ room, label }: { room: string; label: string }) {
  const v = useGame((s) => s.voice);
  const inHere = v.room === room;
  return (
    <div className="rounded-2xl bg-emerald-50 p-3.5 ring-1 ring-emerald-100">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-900">
            <Mic className="size-4" /> {label}
          </p>
          <p className="text-xs text-emerald-700/80">
            {inHere ? (v.peers.length ? `${v.peers.length} talking with you` : "You're the first one here") : "Talk live with people here"}
          </p>
        </div>
        {inHere ? (
          <button onClick={() => voice.leave()} className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-rose-600 shadow-sm ring-1 ring-black/5 transition active:scale-95">
            <PhoneOff className="size-3.5" /> Leave
          </button>
        ) : (
          <button onClick={() => void voice.join(room)} className="rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 active:scale-95">
            Join voice
          </button>
        )}
      </div>
    </div>
  );
}

export function MuteButton() {
  const muted = useGame((s) => s.voice.muted);
  return (
    <button
      onClick={() => voice.setMuted(!muted)}
      className={`grid size-9 place-items-center rounded-full transition active:scale-90 ${muted ? "bg-rose-100 text-rose-600" : "bg-white text-stone-700 ring-1 ring-black/5"}`}
      aria-label={muted ? "Unmute" : "Mute"}
    >
      {muted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
    </button>
  );
}
