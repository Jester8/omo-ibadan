"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Send, X } from "lucide-react";
import { useGame } from "@/lib/store";
import { PLACES } from "@/lib/places";
import { net, roomOf } from "@/lib/net";

export default function ChatDock() {
  const [open, setOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 640);
  const [text, setText] = useState("");
  const atPlace = useGame((s) => s.atPlace);
  const chat = useGame((s) => s.chat);
  const muted = useGame((s) => s.muted);
  const [menu, setMenu] = useState<string | null>(null);
  const room = roomOf(atPlace);
  const label = atPlace ? PLACES.find((p) => p.id === atPlace)?.name : "The streets";
  const msgs = chat.filter((m) => m.room === room && !(m.fromPid && muted.includes(m.fromPid))).slice(-40);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs.length, open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    net.chat(text);
    setText("");
  };

  return (
    <div className="absolute bottom-3 left-3 z-10 sm:bottom-5 sm:left-5">
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="flex h-64 w-[min(20rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl bg-white/88 shadow-xl ring-1 ring-black/5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-stone-100 px-4 py-2.5">
              <div>
                <p className="text-sm font-semibold text-stone-900">{label}</p>
                <p className="text-[11px] text-stone-400">Chat with everyone here</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Hide chat" className="rounded-full p-1 text-stone-400 hover:bg-stone-100">
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 space-y-1.5 overflow-y-auto px-4 py-2.5 text-[13px]">
              {msgs.length === 0 && <p className="pt-6 text-center text-xs text-stone-400">No one has said anything yet. Say hello 👋</p>}
              {msgs.map((m) => {
                const canModerate = !m.self && !m.npc && !!m.fromId;
                return (
                  <div key={m.id}>
                    <p className="leading-snug">
                      {canModerate ? (
                        <button onClick={() => setMenu(menu === m.id ? null : m.id)} className="font-semibold text-indigo-600 hover:underline">
                          {m.from}
                        </button>
                      ) : (
                        <span className={`font-semibold ${m.self ? "text-emerald-700" : "text-stone-400"}`}>{m.from}</span>
                      )}
                      <span className="text-stone-700"> {m.text}</span>
                    </p>
                    {menu === m.id && canModerate && (
                      <div className="mt-1 flex gap-1.5">
                        <button
                          onClick={() => {
                            if (m.fromPid) useGame.getState().mute(m.fromPid);
                            useGame.getState().toast(`Muted ${m.from}`, "info");
                            setMenu(null);
                          }}
                          className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-600 transition hover:bg-stone-200"
                        >
                          Mute
                        </button>
                        <button
                          onClick={() => {
                            net.report(m.fromId!, m.text.slice(0, 80));
                            useGame.getState().toast("Reported. Thanks for keeping Ibadan friendly.", "info");
                            setMenu(null);
                          }}
                          className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600 transition hover:bg-rose-100"
                        >
                          Report
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={end} />
            </div>
            <form onSubmit={submit} className="flex gap-2 border-t border-stone-100 p-2.5">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={200}
                placeholder="Say something…"
                className="min-w-0 flex-1 rounded-full bg-stone-100 px-4 py-2 text-sm outline-none ring-2 ring-transparent transition focus:bg-white focus:ring-emerald-500"
              />
              <button type="submit" aria-label="Send" className="grid size-9 place-items-center rounded-full bg-emerald-700 text-white transition active:scale-90 disabled:opacity-40" disabled={!text.trim()}>
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="closed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl"
          >
            <MessageCircle className="size-4" /> Chat
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
