"use client";

import { useRef, useState } from "react";
import { Camera, MessageCircle, Mic, MicOff, Radio } from "lucide-react";
import ChatDock from "./ChatDock";
import { voice } from "@/lib/voice";
import { roomHere } from "@/lib/voiceRoom";
import { useGame } from "@/lib/store";
import { net as netApi } from "@/lib/net";
import { compressImage } from "@/lib/photos";

const round = "relative grid size-12 place-items-center rounded-full shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition active:scale-90 sm:size-14";

/**
 * Chat and voice as a column of round buttons, with the chat card opening above them.
 * Stacked rather than side by side, so it stays out of the way on a laptop and on a phone.
 */
export default function Comms() {
  const [open, setOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 640);
  const v = useGame((s) => s.voice);
  const net = useGame((s) => s.net);
  const live = !!v.room && !v.room.startsWith("call:");
  const speaking = live && !v.muted && !!v.speaking.me;
  // any voice room or call: photos can be sent to the people on it
  const inVoice = !!v.room;
  const pick = useRef<HTMLInputElement>(null);
  const sendPhoto = async (f: File | undefined) => {
    if (!f) return;
    const data = await compressImage(f);
    if (!data) return useGame.getState().toast("That photo is too big. Try another.", "bad");
    netApi.photo(data);
    useGame.getState().toast("Photo sent. They can view it once.", "info");
  };

  return (
    <div className="absolute bottom-[5.4rem] left-3 z-10 flex flex-col items-start gap-2.5 sm:bottom-24 sm:left-5">
      <ChatDock open={open} onClose={() => setOpen(false)} />
      <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Hide chat" : "Open chat"} aria-pressed={open} className={`${round} ${open ? "bg-stone-900 text-white" : "bg-white/90 text-stone-700 hover:bg-white"}`}>
        <MessageCircle className="size-5 sm:size-6" />
      </button>
      {net === "online" && (
        <>
          <button
            onClick={() => (live ? voice.leave() : void voice.join(roomHere().room))}
            aria-label={live ? "Leave voice" : "Talk to people nearby"}
            className={`${round} ${live ? "bg-emerald-600 text-white" : "bg-white/90 text-stone-700 hover:bg-white"} ${speaking ? "ring-4 ring-emerald-300" : ""}`}
          >
            {live ? <Radio className={`size-5 sm:size-6 ${speaking ? "animate-pulse" : ""}`} /> : <Mic className="size-5 sm:size-6" />}
            {live && <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-stone-900 px-1 text-[10px] font-bold leading-5 text-white">{v.peers.length + 1}</span>}
          </button>
          {inVoice && (
            <>
              <input ref={pick} type="file" accept="image/*" className="hidden" onChange={(e) => { void sendPhoto(e.target.files?.[0]); e.target.value = ""; }} />
              <button onClick={() => pick.current?.click()} aria-label="Send a view-once photo" className={`${round} bg-white/90 text-stone-700 hover:bg-white`}>
                <Camera className="size-5 sm:size-6" />
              </button>
            </>
          )}
          {live && (
            <button onClick={() => voice.setMuted(!v.muted)} aria-label={v.muted ? "Unmute mic" : "Mute mic"} aria-pressed={v.muted} className={`${round} ${v.muted ? "bg-rose-600 text-white" : "bg-white/90 text-stone-700 hover:bg-white"}`}>
              {v.muted ? <MicOff className="size-5 sm:size-6" /> : <Mic className="size-5 sm:size-6" />}
            </button>
          )}
        </>
      )}
    </div>
  );
}
