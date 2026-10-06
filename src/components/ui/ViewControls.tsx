"use client";

import { useEffect } from "react";
import { cam } from "@/lib/playerState";

/** Camera keys for desktop (Q and E). Dragging the scene also rotates and tilts; there are no on-screen buttons. */
export default function ViewControls() {
  useEffect(() => {
    const keys = new Set<string>();
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (keys.has("q")) cam.az += dt * 1.8;
      if (keys.has("e")) cam.az -= dt * 1.8;
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
  return null;
}
