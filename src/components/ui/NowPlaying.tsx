"use client";

import { Music2, Pause, X } from "lucide-react";
import { pause, stop, useMusic } from "@/lib/music";

/** Credit for whatever artist track is playing: title, artist and copyright owner. */
export default function NowPlaying() {
  const t = useMusic((s) => s.current);
  const playing = useMusic((s) => s.playing);
  if (!t) return null;
  return (
    <div className="absolute inset-x-3 bottom-[calc(9.2rem+env(safe-area-inset-bottom))] z-[14] mx-auto flex max-w-md items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2 text-black shadow-xl ring-1 ring-black/10 backdrop-blur sm:bottom-[8.4rem]">
      <Music2 className={`size-4 shrink-0 ${playing ? "animate-pulse text-emerald-300" : "text-stone-400"}`} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold">
          {t.title} · {t.artist}
        </p>
        <p className="truncate text-[10px] text-stone-500">© {t.rightsHolder}. All rights reserved.</p>
      </div>
      {playing && (
        <button onClick={pause} aria-label="Pause" className="rounded-full p-1.5 hover:bg-stone-100">
          <Pause className="size-4" />
        </button>
      )}
      <button onClick={stop} aria-label="Stop" className="rounded-full p-1.5 hover:bg-stone-100">
        <X className="size-4" />
      </button>
    </div>
  );
}
