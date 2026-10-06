"use client";

import { useEffect, useRef } from "react";
import { Eye, EyeOff, Moon, RotateCcw, RotateCw, Sun, SunMoon, ChevronsUp, ChevronsDown } from "lucide-react";
import { cam } from "@/lib/playerState";
import { useGame } from "@/lib/store";

const btn = "grid size-10 place-items-center rounded-xl bg-white/85 text-stone-700 shadow-lg ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white active:scale-95 select-none touch-none";

/** Hold a button to keep turning the camera. */
function Hold({ onTick, label, children }: { onTick: (dt: number) => void; label: string; children: React.ReactNode }) {
  const raf = useRef(0);
  const stop = () => cancelAnimationFrame(raf.current);
  useEffect(() => stop, []);
  const start = (e: React.PointerEvent) => {
    e.preventDefault();
    stop();
    let last = performance.now();
    const loop = (t: number) => {
      onTick(Math.min(0.05, (t - last) / 1000));
      last = t;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
  };
  return (
    <button aria-label={label} title={label} className={btn} onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onContextMenu={(e) => e.preventDefault()}>
      {children}
    </button>
  );
}

export default function ViewControls() {
  const placesOnly = useGame((s) => s.placesOnly);
  const timeMode = useGame((s) => s.timeMode);
  const setView = useGame((s) => s.patch);
  const interior = useGame((s) => s.interior);
  const selected = useGame((s) => s.selected);
  const flip = useGame((s) => s.panelFlip);
  const busy = useGame((s) => !!s.busy);
  // on phones the info panel covers the bottom of the screen: ride above it, as a row
  const roomOpen = !busy && !!interior && flip === `interior:${interior.kind}:${interior.id}`;
  const selOpen = !busy && !interior && !!selected && flip !== `${selected.type}:${selected.id}`;
  const deck = useGame((s) => s.deck);
  const lift = deck ? "max-sm:bottom-[43dvh] max-sm:flex-row" : roomOpen ? "max-sm:bottom-[47dvh] max-sm:flex-row" : selOpen ? "max-sm:bottom-[63dvh] max-sm:flex-row" : "max-sm:bottom-[4.5rem]";

  useEffect(() => {
    const keys = new Set<string>();
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (keys.has("q") || keys.has("arrowleft")) cam.az += dt * 1.8;
      if (keys.has("e") || keys.has("arrowright")) cam.az -= dt * 1.8;
      if (keys.has("arrowup")) cam.el = Math.min(1.25, cam.el + dt);
      if (keys.has("arrowdown")) cam.el = Math.max(0.35, cam.el - dt);
      raf = requestAnimationFrame(loop);
    };
    const typing = (e: KeyboardEvent) => ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName);
    const down = (e: KeyboardEvent) => !typing(e) && keys.add(e.key.toLowerCase());
    const up = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const nextTime = timeMode === "auto" ? "day" : timeMode === "day" ? "night" : "auto";
  const TimeIcon = timeMode === "day" ? Sun : timeMode === "night" ? Moon : SunMoon;

  return (
    <div className={`absolute left-3 z-[25] flex ${lift} bottom-[4.5rem] flex-col gap-1.5 sm:bottom-14 sm:left-5`}>
      <Hold label="Rotate left" onTick={(dt) => (cam.az += dt * 1.8)}>
        <RotateCcw className="size-5" />
      </Hold>
      <Hold label="Rotate right" onTick={(dt) => (cam.az -= dt * 1.8)}>
        <RotateCw className="size-5" />
      </Hold>
      <Hold label="Tilt up" onTick={(dt) => (cam.el = Math.min(1.25, cam.el + dt))}>
        <ChevronsUp className="size-5" />
      </Hold>
      <Hold label="Tilt down" onTick={(dt) => (cam.el = Math.max(0.35, cam.el - dt))}>
        <ChevronsDown className="size-5" />
      </Hold>
      <button
        aria-label={placesOnly ? "Show everything" : "Show only locations"}
        title={placesOnly ? "Show everything" : "Show only locations"}
        onClick={() => setView({ placesOnly: !placesOnly })}
        className={`${btn} ${placesOnly ? "!bg-emerald-600 !text-white" : ""}`}
      >
        {placesOnly ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
      <button
        aria-label={`Time: ${timeMode}`}
        title={`Time: ${timeMode} (tap for ${nextTime})`}
        onClick={() => setView({ timeMode: nextTime, clockOverride: nextTime === "day" ? 12 : nextTime === "night" ? 22 : null })}
        className={btn}
      >
        <TimeIcon className="size-5" />
      </button>
    </div>
  );
}
