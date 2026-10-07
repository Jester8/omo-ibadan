"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, Eye, X } from "lucide-react";
import { usePhotos, VIEW_SECS } from "@/lib/photos";

/**
 * Photos sent during a call. They arrive as small "view once" cards at the top of the screen; opening one shows it
 * for a few seconds, then it is deleted. On a laptop the picture opens at the top centre, out of the way of the city.
 */
export default function PhotoDrop() {
  const inbox = usePhotos((s) => s.inbox);
  const viewing = usePhotos((s) => s.viewing);

  return (
    <>
      <div className="pointer-events-none absolute inset-x-3 top-3 z-30 flex flex-col items-center gap-2 sm:top-5">
        <AnimatePresence>
          {!viewing &&
            inbox.map((p) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: -16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.95 }}
                onClick={() => usePhotos.getState().open(p.id)}
                className="pointer-events-auto flex w-[min(22rem,100%)] items-center gap-3 rounded-2xl bg-stone-900 px-4 py-3 text-left text-white shadow-2xl ring-1 ring-white/10 transition active:scale-[0.98]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-500">
                  <Camera className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{p.name} sent a photo</span>
                  <span className="flex items-center gap-1 text-xs text-white/70">
                    <Eye className="size-3.5" /> Tap to view once
                  </span>
                </span>
              </motion.button>
            ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>{viewing && <Viewer key={viewing.id} name={viewing.name} data={viewing.data} />}</AnimatePresence>
    </>
  );
}

function Viewer({ name, data }: { name: string; data: string }) {
  const [left, setLeft] = useState(VIEW_SECS);
  useEffect(() => {
    const id = setInterval(() => setLeft((n) => n - 1), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (left <= 0) usePhotos.getState().close();
  }, [left]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="absolute inset-x-3 top-3 z-40 mx-auto w-auto max-w-xl overflow-hidden rounded-3xl bg-stone-950 shadow-2xl ring-1 ring-white/10 sm:top-5 sm:w-[34rem]"
    >
      <div className="flex items-center justify-between px-4 py-2.5 text-white">
        <p className="truncate text-sm font-bold">{name} · view once</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white/60">{Math.max(left, 0)}s</span>
          <button onClick={() => usePhotos.getState().close()} aria-label="Close photo" className="grid size-8 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 active:scale-90">
            <X className="size-4" />
          </button>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={data} alt="" draggable={false} onContextMenu={(e) => e.preventDefault()} className="max-h-[60dvh] w-full select-none object-contain" />
      <div className="h-1 bg-white/10">
        <motion.div className="h-full bg-emerald-400" initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: VIEW_SECS, ease: "linear" }} />
      </div>
    </motion.div>
  );
}
