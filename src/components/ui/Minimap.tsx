"use client";

import { useEffect, useRef, useState } from "react";
import { Map as MapIcon, X } from "lucide-react";
import { cam, me, remoteMotion } from "@/lib/playerState";
import { KIND_COLORS, PLACES } from "@/lib/places";
import { PLOTS } from "@/lib/plots";
import { AD_PLAZA, CAMPUS_PLACES, ROAD_LINES, WORLD_HALF } from "@/lib/world";
import { colorFor } from "@/lib/look";
import { useGame } from "@/lib/store";
import { walkTo } from "@/lib/movement";

const SHOWN = "omo-ibadan-map";
const readShown = () => {
  try {
    const v = localStorage.getItem(SHOWN);
    if (v !== null) return v === "1";
  } catch {
    /* private mode */
  }
  return window.innerWidth >= 640; // phones start with the map tucked away
};
const ROADS = ROAD_LINES;

/** Rotation that puts the camera's forward direction at the top of the minimap. */
const rotation = () => -Math.PI / 2 - Math.atan2(-Math.cos(cam.az), -Math.sin(cam.az));

export default function Minimap() {
  const inside = useGame((s) => !!s.interior);
  const [shown, setShown] = useState(true);
  const [tag, setTag] = useState<{ name: string; color: string; n: number } | null>(null);
  useEffect(() => {
    if (!tag) return;
    const t = setTimeout(() => setTag(null), 3500);
    return () => clearTimeout(t);
  }, [tag]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(readShown());
  }, []);
  const set = (v: boolean) => {
    setShown(v);
    try {
      localStorage.setItem(SHOWN, v ? "1" : "0");
    } catch {
      /* private mode */
    }
  };
  if (inside) return null;
  return (
    <div className="absolute bottom-[calc(5.4rem+env(safe-area-inset-bottom))] right-3 z-10 sm:bottom-24 sm:right-5">
      {shown ? (
        <div className="relative">
          {tag && (
            <div className="pointer-events-none absolute right-full top-1/2 mr-2 flex max-w-[10rem] -translate-y-1/2 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-lg ring-1 ring-black/10">
              <span className="size-2.5 shrink-0 rounded-full" style={{ background: tag.color }} />
              <span className="truncate">{tag.name}</span>
            </div>
          )}
          <MinimapCanvas onPick={(name, color) => setTag({ name, color, n: Date.now() })} />
          <button onClick={() => set(false)} aria-label="Hide map" className="absolute -left-1 -top-1 grid size-8 place-items-center rounded-full bg-white text-stone-600 shadow-lg ring-1 ring-black/10 transition active:scale-90">
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button onClick={() => set(true)} aria-label="Show map" className="grid size-12 place-items-center rounded-full bg-white/90 text-stone-700 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition active:scale-90 sm:size-14">
          <MapIcon className="size-5 sm:size-6" />
        </button>
      )}
    </div>
  );
}

function MinimapCanvas({ onPick }: { onPick: (name: string, color: string) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  // a smaller map on phones
  const [SIZE] = useState(() => (typeof window !== "undefined" && window.innerWidth < 640 ? 116 : 148));
  const SCALE = SIZE / 57; // pixels per world unit

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let last = 0;

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 80) return;
      last = t;
      const phi = rotation();
      const st = useGame.getState();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, SIZE, SIZE);

      ctx.save();
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 1, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = "#e6eee0";
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.translate(SIZE / 2, SIZE / 2);
      ctx.rotate(phi);
      ctx.scale(SCALE, SCALE);
      ctx.translate(-me.x, -me.z);

      ctx.strokeStyle = "#b8bec7";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (const r of ROADS) {
        ctx.moveTo(r, -WORLD_HALF);
        ctx.lineTo(r, WORLD_HALF);
        ctx.moveTo(-WORLD_HALF, r);
        ctx.lineTo(WORLD_HALF, r);
      }
      ctx.stroke();

      for (const p of PLOTS) {
        const owned = st.plots[p.id];
        ctx.fillStyle = owned ? colorFor(owned.ownerId) : "#a8dcb9";
        ctx.fillRect(p.pos[0] - 1.2, p.pos[1] - 1.2, 2.4, 2.4);
      }
      for (const p of PLACES) {
        if (CAMPUS_PLACES.includes(p.id) && !st.campus) continue;
        ctx.fillStyle = KIND_COLORS[p.kind];
        ctx.beginPath();
        ctx.arc(p.pos[0], p.pos[1], 1.55, 0, Math.PI * 2);
        ctx.fill();
        if (st.atPlace === p.id || (st.selected?.type === "place" && st.selected.id === p.id)) {
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      }
      // the Ad Plaza
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(AD_PLAZA.x - 1.7, AD_PLAZA.z - 1.7, 3.4, 3.4);
      ctx.fillStyle = "#6366f1";
      for (const r of remoteMotion.values()) {
        ctx.beginPath();
        ctx.arc(r.x, r.z, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // you, always at the centre, pointing the way you face
      ctx.save();
      ctx.translate(SIZE / 2, SIZE / 2);
      ctx.rotate(Math.atan2(Math.cos(me.ry), Math.sin(me.ry)) + phi);
      ctx.fillStyle = "#059669";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(7, 0);
      ctx.lineTo(-4.5, 4.2);
      ctx.lineTo(-4.5, -4.2);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [SIZE, SCALE]);

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - rect.left - SIZE / 2;
    const dy = e.clientY - rect.top - SIZE / 2;
    const phi = rotation();
    const x = dx * Math.cos(phi) + dy * Math.sin(phi);
    const z = -dx * Math.sin(phi) + dy * Math.cos(phi);
    const wx = me.x + x / SCALE;
    const wz = me.z + z / SCALE;
    const st = useGame.getState();
    // a tap on a place's dot (a generous 14px) shows what it is and opens it; a tap on empty ground walks there
    let best: (typeof PLACES)[number] | null = null;
    let bestD = 14 / SCALE;
    for (const p of PLACES) {
      if (CAMPUS_PLACES.includes(p.id) && !st.campus) continue;
      const d = Math.hypot(p.pos[0] - wx, p.pos[1] - wz);
      if (d < bestD) {
        best = p;
        bestD = d;
      }
    }
    if (best) {
      onPick(best.name, KIND_COLORS[best.kind]);
      st.select({ type: "place", id: best.id });
      return;
    }
    st.select(null);
    walkTo(wx, wz);
  };

  return (
    <div className="rounded-full bg-white/80 p-1 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
      <canvas ref={ref} onClick={onClick} style={{ width: SIZE, height: SIZE }} className="cursor-pointer rounded-full" aria-label="Minimap: tap a place to see it, tap the ground to walk" />
    </div>
  );
}
