"use client";

import { AnimatePresence, motion } from "motion/react";
import { Phone, PhoneOff, Users } from "lucide-react";
import { useGame } from "@/lib/store";
import { net } from "@/lib/net";
import { voice } from "@/lib/voice";
import { PLACES } from "@/lib/places";
import { MuteButton } from "./parts";

function roomLabel(room: string): string {
  if (room.startsWith("place:")) return PLACES.find((p) => p.id === room.slice(6))?.name ?? "Voice room";
  if (room.startsWith("home:")) return "House party";
  return "Call";
}

export function VoiceBar() {
  const v = useGame((s) => s.voice);
  const call = useGame((s) => s.call);
  return (
    <AnimatePresence>
      {v.room && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-stone-900/92 py-2 pl-4 pr-2 text-white shadow-2xl backdrop-blur-xl sm:bottom-5"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-semibold">{call.phase === "live" ? `On a call with ${call.peerName}` : roomLabel(v.room)}</span>
          <span className="flex items-center gap-1 text-xs text-stone-300">
            <Users className="size-3.5" /> {v.peers.length + 1}
          </span>
          <MuteButton />
          <button
            onClick={() => (call.phase !== "idle" ? net.hangup() : voice.leave())}
            className="grid size-9 place-items-center rounded-full bg-rose-600 transition active:scale-90"
            aria-label="Leave voice"
          >
            <PhoneOff className="size-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function IncomingCall() {
  const inc = useGame((s) => s.incoming);
  return (
    <AnimatePresence>
      {inc && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="absolute left-1/2 top-4 z-50 flex w-[min(24rem,calc(100vw-1.5rem))] -translate-x-1/2 items-center gap-3 rounded-3xl bg-stone-900 p-3 pr-3.5 text-white shadow-2xl"
        >
          <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="grid size-12 place-items-center rounded-full bg-emerald-500 text-lg font-bold">
            {inc.name.slice(0, 1).toUpperCase()}
          </motion.span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{inc.name}</p>
            <p className="text-xs text-stone-400">Incoming voice call…</p>
          </div>
          <button onClick={() => net.answer(false)} className="grid size-11 place-items-center rounded-full bg-rose-600 transition active:scale-90" aria-label="Decline">
            <PhoneOff className="size-5" />
          </button>
          <button onClick={() => net.answer(true)} className="grid size-11 place-items-center rounded-full bg-emerald-500 transition active:scale-90" aria-label="Answer">
            <Phone className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toasts() {
  const toasts = useGame((s) => s.toasts);
  return (
    <div className="pointer-events-none absolute left-1/2 top-4 z-40 flex -translate-x-1/2 flex-col items-center gap-2 max-sm:top-auto max-sm:bottom-24">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: -14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow-xl ring-1 ${
              t.tone === "good" ? "bg-emerald-600 text-white ring-emerald-700" : t.tone === "bad" ? "bg-rose-600 text-white ring-rose-700" : "bg-stone-900 text-white ring-black"
            }`}
          >
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function Hint() {
  return (
    <div className="pointer-events-none absolute bottom-5 right-5 z-10 hidden items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-stone-500 ring-1 ring-black/5 backdrop-blur-xl lg:flex">
      Click to walk · WASD · drag to rotate · scroll to zoom
    </div>
  );
}
