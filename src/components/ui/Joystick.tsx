"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { stick } from "@/lib/playerState";
import { useGame } from "@/lib/store";
import { useStickMode } from "@/lib/walkStick";

/** Radius (px) the knob can travel from the middle. */
const RADIUS = 46;

const touchQuery = () => (typeof window === "undefined" ? null : window.matchMedia("(pointer: coarse)"));
const subscribeTouch = (cb: () => void) => {
  const q = touchQuery();
  q?.addEventListener("change", cb);
  return () => q?.removeEventListener("change", cb);
};
const isTouch = () => !!touchQuery()?.matches;

/**
 * A walking stick for touch screens, like in a game: hold the knob and push in a direction to walk that way (up is away from the
 * camera), push gently to walk slowly. Let go and you stop. Tapping the ground still walks to a spot, and a second finger on the
 * scene still turns the camera.
 */
export default function Joystick() {
  const mode = useStickMode((s) => s.mode);
  const touch = useSyncExternalStore(subscribeTouch, isTouch, () => false);
  const profile = useGame((s) => !!s.profile);
  const covered = useGame((s) => !!s.sheet || !!s.deck || !!s.computer || !!s.service || s.hideIcons);
  const show = profile && !covered && (mode === "on" || (mode === "auto" && touch));
  const base = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLDivElement>(null);
  const finger = useRef<number | null>(null);

  const rest = () => {
    finger.current = null;
    stick.x = 0;
    stick.y = 0;
    if (knob.current) knob.current.style.transform = "translate(0px, 0px)";
  };
  // hiding the stick (a sheet opened, the setting changed) lets go of it
  useEffect(() => {
    if (!show) rest();
    return rest;
  }, [show]);

  const push = (e: React.PointerEvent) => {
    const el = base.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let dx = e.clientX - (r.left + r.width / 2);
    let dy = e.clientY - (r.top + r.height / 2);
    const len = Math.hypot(dx, dy);
    if (len > RADIUS) {
      dx = (dx / len) * RADIUS;
      dy = (dy / len) * RADIUS;
    }
    stick.x = dx / RADIUS;
    stick.y = dy / RADIUS;
    if (knob.current) knob.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  if (!show) return null;
  return (
    <div
      ref={base}
      role="application"
      aria-label="Walking stick: hold and push to walk"
      onPointerDown={(e) => {
        if (finger.current !== null) return;
        finger.current = e.pointerId;
        e.currentTarget.setPointerCapture(e.pointerId);
        e.stopPropagation();
        push(e);
      }}
      onPointerMove={(e) => {
        if (e.pointerId === finger.current) push(e);
      }}
      onPointerUp={(e) => {
        if (e.pointerId === finger.current) rest();
      }}
      onPointerCancel={(e) => {
        if (e.pointerId === finger.current) rest();
      }}
      onLostPointerCapture={(e) => {
        if (e.pointerId === finger.current) rest();
      }}
      className="absolute bottom-[calc(env(safe-area-inset-bottom)+10.2rem)] left-3 z-[16] grid size-[8.5rem] touch-none select-none place-items-center rounded-full bg-black/10 ring-1 ring-white/50 backdrop-blur-sm sm:bottom-28 sm:left-6"
    >
      <div className="pointer-events-none absolute inset-3 rounded-full ring-1 ring-white/40" />
      <div ref={knob} className="pointer-events-none size-14 rounded-full bg-white/85 shadow-lg ring-1 ring-black/10" />
    </div>
  );
}
