"use client";

import { useEffect, useRef } from "react";
import { cam, me, remoteMotion } from "@/lib/playerState";
import { KIND_COLORS, PLACES } from "@/lib/places";
import { PLOTS } from "@/lib/plots";
import { ROAD_LINES } from "@/lib/world";
import { colorFor } from "@/lib/look";
import { useGame } from "@/lib/store";
import { walkTo } from "@/lib/movement";

const SIZE = 148;
const SCALE = 2.6; // pixels per world unit
const ROADS = ROAD_LINES;

/** Rotation that puts the camera's forward direction at the top of the minimap. */
const rotation = () => -Math.PI / 2 - Math.atan2(-Math.cos(cam.az), -Math.sin(cam.az));

export default function Minimap() {
  const inside = useGame((s) => !!s.interior);
  if (inside) return null;
  return <MinimapCanvas />;
}

function MinimapCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

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
        ctx.moveTo(r, -46);
        ctx.lineTo(r, 46);
        ctx.moveTo(-46, r);
        ctx.lineTo(46, r);
      }
      ctx.stroke();

      for (const p of PLOTS) {
        const owned = st.plots[p.id];
        ctx.fillStyle = owned ? colorFor(owned.ownerId) : "#a8dcb9";
        ctx.fillRect(p.pos[0] - 1.2, p.pos[1] - 1.2, 2.4, 2.4);
      }
      for (const p of PLACES) {
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
  }, []);

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - rect.left - SIZE / 2;
    const dy = e.clientY - rect.top - SIZE / 2;
    const phi = rotation();
    const x = dx * Math.cos(phi) + dy * Math.sin(phi);
    const z = -dx * Math.sin(phi) + dy * Math.cos(phi);
    useGame.getState().select(null);
    walkTo(me.x + x / SCALE, me.z + z / SCALE);
  };

  return (
    <div className="absolute bottom-[5.4rem] right-3 z-10 rounded-full bg-white/80 p-1 shadow-xl ring-1 ring-black/5 backdrop-blur-xl sm:bottom-24 sm:right-5">
      <canvas ref={ref} onClick={onClick} style={{ width: SIZE, height: SIZE }} className="cursor-pointer rounded-full" aria-label="Minimap, click to walk" />
    </div>
  );
}
