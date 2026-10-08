"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ImagePlus, Send, X } from "lucide-react";
import { useGame } from "@/lib/store";
import { PLACES } from "@/lib/places";
import { net, roomOf } from "@/lib/net";
import { rt } from "@/lib/interiorRuntime";
import { useSecond } from "@/lib/hooks";
import { compressToBytes } from "@/lib/photos";

/** The chat card. Comms owns the round buttons and decides when this is open. */
export default function ChatDock({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [text, setText] = useState("");
  const atPlace = useGame((s) => s.atPlace);
  const chat = useGame((s) => s.chat);
  const muted = useGame((s) => s.muted);
  const [menu, setMenu] = useState<string | null>(null);
  const interior = useGame((s) => s.interior);
  const room = roomOf(atPlace, interior);
  const label = interior ? rt.layout?.name : atPlace ? PLACES.find((p) => p.id === atPlace)?.name : "The streets";
  const msgs = chat.filter((m) => m.room === room && !(m.fromPid && muted.includes(m.fromPid))).slice(-40);
  const end = useRef<HTMLDivElement>(null);
  const pick = useRef<HTMLInputElement>(null);
  /** a chat picture opened bigger */
  const [zoom, setZoom] = useState<string | null>(null);
  const typingMap = useGame((s) => s.typing);
  const remotesMap = useGame((s) => s.remotes);
  const sec = useSecond();
  const typers = Object.entries(typingMap)
    .filter(([k, v]) => k.startsWith("room:") && sec * 1000 - v.at < 4000 && remotesMap[k.slice(5)]?.room === room)
    .map(([, v]) => v.name);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs.length, open]);

  /** Pick a picture, shrink it to about 10 KB and send it to the room. */
  const sendImage = async (f: File | undefined) => {
    if (!f) return;
    const data = await compressToBytes(f);
    if (!data) return useGame.getState().toast("Could not shrink that picture. Try another one.", "bad");
    net.chatImage(data);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    net.chat(text);
    setText("");
  };

  return (
    <>
    <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="flex h-[min(20rem,45dvh)] w-[min(21rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl bg-white/90 shadow-xl ring-1 ring-black/5 backdrop-blur-xl sm:h-80 sm:w-[22rem]"
          >
            <div className="flex items-center justify-between border-b border-stone-100 px-4 py-2.5">
              <div>
                <p className="text-sm font-semibold text-stone-900">{label}</p>
                <p className="text-[11px] text-stone-400">Chat with everyone here</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => net.emote("wave")} title="Wave (Z)" className="rounded-full px-2 py-1 text-base transition hover:bg-stone-100 active:scale-90">👋</button>
                <button onClick={() => net.emote("dance")} title="Dance (X)" className="rounded-full px-2 py-1 text-base transition hover:bg-stone-100 active:scale-90">💃</button>
              </div>
              <button onClick={onClose} aria-label="Hide chat" className="rounded-full p-1 text-stone-400 hover:bg-stone-100">
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 space-y-1.5 overflow-y-auto px-4 py-2.5 text-[13px]">
              {msgs.length === 0 && <p className="pt-6 text-center text-xs text-stone-400">No one has said anything yet. Say hello 👋</p>}
              {msgs.map((m) => {
                const canModerate = !m.self && !!m.fromId;
                return (
                  <div key={m.id}>
                    <p className="leading-snug">
                      {canModerate ? (
                        <button onClick={() => setMenu(menu === m.id ? null : m.id)} className="font-semibold text-indigo-600 hover:underline">
                          {m.from}
                        </button>
                      ) : (
                        <span className={`font-semibold ${m.self ? "text-emerald-700" : "text-stone-800"}`}>{m.from}</span>
                      )}
                      {!m.img && <span className="text-black"> {m.text}</span>}
                    </p>
                    {m.img && (
                      <button onClick={() => setZoom(m.img!)} aria-label={`Open the picture from ${m.from}`} className="mt-1 block max-w-full overflow-hidden rounded-2xl bg-stone-100 ring-1 ring-black/10 transition active:scale-[0.98]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.img} alt={`Picture from ${m.from}`} loading="lazy" draggable={false} className="block h-auto max-h-40 w-auto max-w-full object-contain" />
                      </button>
                    )}
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
            {typers.length > 0 && <p className="px-4 pb-1 text-[11px] font-semibold text-stone-500">{typers.slice(0, 2).join(" and ")} {typers.length > 1 ? "are" : "is"} typing...</p>}
            <form onSubmit={submit} className="flex gap-2 border-t border-stone-100 p-2.5">
              <input ref={pick} type="file" accept="image/*" className="hidden" onChange={(e) => { void sendImage(e.target.files?.[0]); e.target.value = ""; }} />
              <button type="button" onClick={() => pick.current?.click()} aria-label="Send a picture" title="Send a picture" className="grid size-9 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200 active:scale-90">
                <ImagePlus className="size-4" />
              </button>
              <input
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  net.typing();
                }}
                maxLength={200}
                placeholder="Say something…"
                className="min-w-0 flex-1 rounded-full bg-stone-100 px-4 py-2 text-sm text-black outline-none ring-2 ring-transparent transition focus:bg-white focus:ring-emerald-500"
              />
              <button type="submit" aria-label="Send" className="grid size-9 place-items-center rounded-full bg-emerald-700 text-white transition active:scale-90 disabled:opacity-40" disabled={!text.trim()}>
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
    </AnimatePresence>
    {zoom && (
      <div onClick={() => setZoom(null)} className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={zoom} alt="" className="h-auto max-h-[80dvh] w-auto max-w-[92vw] rounded-2xl bg-white object-contain shadow-2xl" />
      </div>
    )}
    </>
  );
}
