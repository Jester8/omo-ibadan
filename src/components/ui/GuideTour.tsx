"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TOPICS, TOUR } from "@/lib/guide";
import { useGame } from "@/lib/store";

const KEY = "omo-ibadan-tour-v2";

/** A short walkthrough the first time you enter the city. Open the full guide later with the ? button. */
export default function GuideTour() {
  const pid = useGame((s) => s.profile?.id);
  const hasProfile = !!pid;
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!hasProfile) return;
    try {
      if (localStorage.getItem(`${KEY}:${pid}`)) return;
    } catch {
      /* private mode: just show it */
    }
    const t = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(t);
  }, [hasProfile, pid]);

  const done = () => {
    setOpen(false);
    try {
      localStorage.setItem(`${KEY}:${pid}`, "1");
    } catch {
      /* ignore */
    }
  };

  const topic = TOPICS.find((t) => t.id === TOUR[i])!;
  const last = i === TOUR.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="tour" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[55] grid place-items-center bg-stone-950/55 p-4 backdrop-blur-sm">
          <motion.div initial={{ y: 24, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 26 }} className="w-full max-w-sm rounded-[1.8rem] bg-white p-6 shadow-2xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
              Welcome to Ibadan · {i + 1} of {TOUR.length}
            </p>
            <AnimatePresence mode="wait">
              <motion.div key={topic.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}>
                <div className="mt-3 text-5xl">{topic.emoji}</div>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-stone-900">{topic.title}</h2>
                <ul className="mt-3 space-y-2">
                  {topic.lines.map((l) => (
                    <li key={l} className="text-[14px] leading-relaxed text-stone-600">
                      {l}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex items-center justify-center gap-1.5">
              {TOUR.map((_, k) => (
                <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-amber-500" : "w-1.5 bg-stone-300"}`} />
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <button onClick={done} className="rounded-full px-3 py-2 text-sm font-semibold text-stone-400 transition hover:text-stone-600">
                Skip
              </button>
              <div className="flex items-center gap-2">
                {i > 0 && (
                  <button onClick={() => setI(i - 1)} aria-label="Previous" className="grid size-11 place-items-center rounded-full bg-stone-100 text-stone-700 transition active:scale-90">
                    <ChevronLeft className="size-5" strokeWidth={2.4} />
                  </button>
                )}
                <button onClick={() => (last ? done() : setI(i + 1))} className="flex h-11 items-center gap-1 rounded-full bg-stone-900 pl-5 pr-3.5 text-sm font-bold text-white transition active:scale-95">
                  {last ? "Start exploring" : "Next"} <ChevronRight className="size-5" strokeWidth={2.4} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
