"use client";

import { Mic, MicOff, Radio } from "lucide-react";
import { voice } from "@/lib/voice";
import { roomHere } from "@/lib/voiceRoom";
import { useGame } from "@/lib/store";

/** One-tap live voice with whoever is around you: street, venue or room. */
export default function TalkButton() {
  const v = useGame((s) => s.voice);
  const net = useGame((s) => s.net);
  const live = !!v.room && v.room !== "" && !v.room.startsWith("call:");
  if (net !== "online") return null;

  return (
    <div className="absolute bottom-[5.4rem] left-[5.6rem] z-10 flex items-center gap-1.5 sm:bottom-24 sm:left-[6.4rem]">
      <button
        onClick={() => (live ? voice.leave() : void voice.join(roomHere().room))}
        className={`flex h-11 items-center gap-2 rounded-2xl px-3.5 text-sm font-semibold shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition active:scale-95 ${live ? "bg-emerald-600 text-white" : "bg-white/85 text-stone-700 hover:bg-white"}`}
        aria-label={live ? "Leave voice" : "Talk to people nearby"}
      >
        {live ? <Radio className="size-4 animate-pulse" /> : <Mic className="size-4" />}
        {live ? `Live · ${v.peers.length + 1}` : "Talk"}
      </button>
      {live && (
        <button
          onClick={() => voice.setMuted(!v.muted)}
          className={`grid size-11 place-items-center rounded-2xl shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition active:scale-95 ${v.muted ? "bg-rose-600 text-white" : "bg-white/85 text-stone-700"}`}
          aria-label={v.muted ? "Unmute mic" : "Mute mic"}
        >
          {v.muted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
        </button>
      )}
    </div>
  );
}
