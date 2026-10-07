"use client";

import { AnimatePresence, motion } from "motion/react";
import { Phone, PhoneOff, Users } from "lucide-react";
import { useGame } from "@/lib/store";
import { net } from "@/lib/net";
import { voice } from "@/lib/voice";
import { PLACES } from "@/lib/places";
import { MuteButton } from "./parts";
import { levelOf } from "@/lib/bonds";
import { answerBond } from "@/lib/social";

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
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.95 }}
          className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+0.5rem)] z-[55] flex max-w-[calc(100vw-1rem)] -translate-x-1/2 items-center gap-3 rounded-full bg-white py-2 pl-4 pr-2 text-black shadow-2xl ring-1 ring-black/10 sm:top-5"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-semibold">{call.phase === "live" ? `On a call with ${call.peerName}` : roomLabel(v.room)}</span>
          <span className="flex items-center gap-1 text-xs text-stone-600">
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
  const call = useGame((s) => s.call);
  const calling = call.phase === "calling";
  return (
    <AnimatePresence>
      {calling && (
        <motion.div
          key="calling"
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+1rem)] z-50 flex w-[min(24rem,calc(100vw-1.5rem))] -translate-x-1/2 items-center gap-3 rounded-3xl bg-white p-3 pr-3.5 text-black shadow-2xl ring-1 ring-black/10"
        >
          <motion.span animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="grid size-12 place-items-center rounded-full bg-emerald-500 text-lg font-bold text-white">
            {call.peerName.slice(0, 1).toUpperCase()}
          </motion.span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{call.peerName}</p>
            <p className="text-xs text-stone-500">Ringing…</p>
          </div>
          <button onClick={() => net.hangup()} className="grid size-11 place-items-center rounded-full bg-rose-600 text-white transition active:scale-90" aria-label="Cancel call">
            <PhoneOff className="size-5" />
          </button>
        </motion.div>
      )}
      {inc && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+1rem)] z-50 flex w-[min(24rem,calc(100vw-1.5rem))] -translate-x-1/2 items-center gap-3 rounded-3xl bg-white p-3 pr-3.5 text-black shadow-2xl ring-1 ring-black/10"
        >
          <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="grid size-12 place-items-center rounded-full bg-emerald-500 text-lg font-bold">
            {inc.name.slice(0, 1).toUpperCase()}
          </motion.span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{inc.name}</p>
            <p className="text-xs text-stone-500">Incoming voice call…</p>
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

/** A friend wants to get closer: say yes or not yet. */
export function RelAsks() {
  const asks = useGame((s) => s.relAsks);
  const a = asks[0];
  const l = a ? levelOf(a.level) : null;
  return (
    <AnimatePresence>
      {a && l && (
        <motion.div
          key={`${a.from}${a.level}`}
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+8.6rem)] z-50 flex w-[min(24rem,calc(100vw-1.5rem))] -translate-x-1/2 items-center gap-3 rounded-3xl bg-white p-3 pr-3.5 text-black shadow-2xl ring-1 ring-black/10 sm:top-40"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-rose-100 text-2xl">{l.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{a.name}</p>
            <p className="text-xs text-stone-500">wants to make you their {l.label.toLowerCase()}</p>
          </div>
          <button onClick={() => void answerBond(a.from, false)} className="rounded-full bg-stone-100 px-3 py-2 text-xs font-bold text-stone-700 transition active:scale-95">
            Not yet
          </button>
          <button onClick={() => void answerBond(a.from, true)} className="rounded-full bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition active:scale-95">
            Yes
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Someone is at your door: let them in or not. */
export function Knocks() {
  const knocks = useGame((s) => s.knocks);
  const k = knocks[0];
  return (
    <AnimatePresence>
      {k && (
        <motion.div
          key={`${k.from}${k.plotId}`}
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+4.6rem)] z-50 flex w-[min(24rem,calc(100vw-1.5rem))] -translate-x-1/2 items-center gap-3 rounded-3xl bg-white p-3 pr-3.5 text-black shadow-2xl ring-1 ring-black/10 sm:top-24"
        >
          <span className="grid size-12 place-items-center rounded-full bg-amber-500 text-lg font-bold text-white">{k.name.slice(0, 1).toUpperCase()}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{k.name}</p>
            <p className="text-xs text-stone-500">is at your door{knocks.length > 1 ? ` (+${knocks.length - 1} more)` : ""}</p>
          </div>
          <button onClick={() => net.knockReply(k.from, k.plotId, false)} className="rounded-full bg-stone-100 px-3.5 py-2 text-xs font-bold text-stone-700 transition active:scale-95">
            Not now
          </button>
          <button onClick={() => net.knockReply(k.from, k.plotId, true)} className="rounded-full bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition active:scale-95">
            Let in
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toasts() {
  const toasts = useGame((s) => s.toasts);
  const inCall = useGame((s) => !!s.voice.room);
  return (
    <div className={`pointer-events-none absolute left-1/2 ${inCall ? "top-[calc(env(safe-area-inset-top)+3.7rem)] sm:top-[4.6rem]" : "top-[calc(env(safe-area-inset-top)+0.5rem)] sm:top-5"} z-[60] flex w-[min(26rem,calc(100vw-1.5rem))] -translate-x-1/2 flex-col items-center gap-2`}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: -14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="flex max-w-full items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-xl ring-1 ring-black/10"
          >
            <span className={`size-2.5 shrink-0 rounded-full ${t.tone === "good" ? "bg-emerald-500" : t.tone === "bad" ? "bg-rose-500" : "bg-stone-400"}`} />
            <span className="min-w-0">{t.text}</span>
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
