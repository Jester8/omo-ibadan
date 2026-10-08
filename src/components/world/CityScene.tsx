"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Lighting from "./Lighting";
import Terrain from "./Terrain";
import Buildings from "./Buildings";
import Gates from "./Gates";
import Estates from "./Estates";
import CabRanks from "./CabRanks";
import PlotsLayer from "./PlotsLayer";
import Player from "./Player";
import { RemotePlayers } from "./People";
import AdBoards from "./AdBoards";
import Billboards from "./Billboards";
import { anchors } from "@/lib/overlay";
import { cam, me } from "@/lib/playerState";
import { useGame } from "@/lib/store";
import { DECK_Y } from "@/lib/interiorRuntime";
import { walkTo } from "@/lib/movement";
import InteriorScene from "@/components/interior/InteriorScene";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const limits = (): [number, number] => (useGame.getState().interior ? [4, 30] : useGame.getState().deck ? [6, 75] : [9, 60]);

function CameraRig() {
  const { camera, gl, size } = useThree();
  const target = useRef(new THREE.Vector3(me.x, 0.5, me.z));
  const dist = useRef(36);

  useEffect(() => {
    const el = gl.domElement;
    // one finger drags to turn and tilt; two fingers pinch to zoom, twist to rotate and slide up or down to tilt
    const pts = new Map<number, { x: number; y: number }>();
    let prev = { d: 0, ang: 0, my: 0 };
    const two = () => {
      const [a, b] = [...pts.values()];
      return { d: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), ang: Math.atan2(b.y - a.y, b.x - a.x), my: (a.y + b.y) / 2 };
    };
    const down = (e: PointerEvent) => {
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2) prev = two();
    };
    const move = (e: PointerEvent) => {
      const p = pts.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      p.x = e.clientX;
      p.y = e.clientY;
      if (pts.size === 1) {
        cam.az -= dx * 0.006;
        cam.el = clamp(cam.el + dy * 0.004, 0.35, 1.25);
      } else if (pts.size === 2) {
        const t = two();
        cam.dist = clamp(cam.dist * (prev.d / t.d), ...limits());
        let da = t.ang - prev.ang;
        if (da > Math.PI) da -= Math.PI * 2;
        if (da < -Math.PI) da += Math.PI * 2;
        cam.az -= da;
        cam.el = clamp(cam.el - (t.my - prev.my) * 0.004, 0.35, 1.25);
        prev = t;
      }
    };
    const up = (e: PointerEvent) => {
      pts.delete(e.pointerId);
      // the finger that stays down carries on as a one-finger drag from where it is
      if (pts.size === 2) prev = two();
    };
    // iOS Safari wants to zoom the whole page on a pinch: keep the gesture for the camera
    const noPageZoom = (e: Event) => e.preventDefault();
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      cam.dist = clamp(cam.dist + e.deltaY * 0.02, ...limits());
    };
    el.addEventListener("gesturestart", noPageZoom);
    el.addEventListener("gesturechange", noPageZoom);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", wheel, { passive: false });
    return () => {
      el.removeEventListener("gesturestart", noPageZoom);
      el.removeEventListener("gesturechange", noPageZoom);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("wheel", wheel);
    };
  }, [gl]);

  useFrame((_, dt) => {
    const k = 1 - Math.exp(-6 * dt);
    const hasProfile = !!useGame.getState().profile;
    if (!hasProfile) {
      cam.az += dt * 0.05;
      target.current.lerp(new THREE.Vector3(0, 0, 0), k);
    } else {
      const st = useGame.getState();
      const f = st.deck ? cam.focus : null;
      target.current.lerp(new THREE.Vector3(f ? f.x : me.use ? me.use.x : me.x, st.deck ? (f ? 1.5 : DECK_Y + 0.5) : 0.5, f ? f.z : me.use ? me.use.z : me.z), k);
      if (cam.spin) cam.az += dt * 0.18;
      // the optional slow orbit: only while you stand still
      else if (st.autoRotate && !me.path.length && me.speed < 0.2 && !st.busy) cam.az += dt * 0.12;
    }
    const wantDist = hasProfile ? cam.dist : 40;
    dist.current += (wantDist - dist.current) * (1 - Math.exp(-3 * dt));
    const el = cam.el;
    const d = dist.current;
    camera.position.set(
      target.current.x + Math.sin(cam.az) * Math.cos(el) * d,
      target.current.y + Math.sin(el) * d,
      target.current.z + Math.cos(cam.az) * Math.cos(el) * d,
    );
    camera.lookAt(target.current);
    // phones: the status card covers the top of the screen, so push the scene down a little
    const cam_ = camera as THREE.PerspectiveCamera;
    const w = size.width;
    const h = size.height;
    if (w < 640 && useGame.getState().profile) cam_.setViewOffset(w, h, 0, -h * 0.1, w, h);
    else if (cam_.view?.enabled) cam_.clearViewOffset();
  });
  return null;
}

const _v = new THREE.Vector3();

/** Moves DOM overlay elements (labels, name tags, bubbles) to the screen position of 3D anchors. */
function LabelProjector() {
  const { camera, size } = useThree();
  useFrame(() => {
    for (const a of anchors.values()) {
      a.get(_v);
      const far = a.maxDist !== undefined && Math.hypot(_v.x - me.x, _v.z - me.z) > a.maxDist;
      const zoomHidden = (a.maxCam !== undefined && cam.dist > a.maxCam) || (a.minCam !== undefined && cam.dist < a.minCam);
      _v.project(camera);
      const hidden = far || zoomHidden || _v.z > 1 || Math.abs(_v.x) > 1.15 || Math.abs(_v.y) > 1.15;
      a.el.style.opacity = hidden ? "0" : "1";
      a.el.style.visibility = hidden ? "hidden" : "visible";
      if (hidden) continue;
      const x = (_v.x * 0.5 + 0.5) * size.width;
      const y = (-_v.y * 0.5 + 0.5) * size.height;
      a.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -100%)`;
      a.el.style.zIndex = String(Math.round((1 - _v.z) * 10000));
    }
  });
  return null;
}

/** Everything outside: streets, buildings, plots, click-to-walk ground. Other players are added by RemotePlayers. */
function WorldContent() {
  const placesOnly = useGame((s) => s.placesOnly);
  return (
    <>
      <Lighting />
      <Terrain placesOnly={placesOnly} />
      <Buildings />
      <Gates />
      <Estates />
      <AdBoards />
      {!placesOnly && <Billboards />}
      <CabRanks />
      {!placesOnly && <PlotsLayer />}
      {/* invisible ground: click anywhere to walk */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={0.002}
        onClick={(e) => {
          if (e.delta > 6) return;
          const s = useGame.getState();
          s.select(null);
          walkTo(e.point.x, e.point.z);
        }}
      >
        <planeGeometry args={[140, 140]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  );
}

/** Phones and modest laptops: a lighter picture (no shadows, no anti-aliasing, a smaller render size) keeps it fast. */
const lowEnd = () => {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  return window.innerWidth < 768 || (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4 || matchMedia("(pointer: coarse)").matches;
};

export default function CityScene() {
  const inside = useGame((s) => !!s.interior);
  const placesOnly = useGame((s) => s.placesOnly);
  const [light] = useState(lowEnd);
  return (
    <Canvas
      dpr={light ? [1, 1.25] : [1, 1.5]}
      shadows={light ? false : "percentage"}
      camera={{ fov: 30, near: 0.5, far: 300, position: [24, 28, 24] }}
      gl={{ antialias: !light, powerPreference: "high-performance" }}
      className="!absolute inset-0 touch-none"
    >
      {inside ? <InteriorScene /> : <WorldContent />}
      <Player />
      {!placesOnly && <RemotePlayers />}
      <CameraRig />
      <LabelProjector />
    </Canvas>
  );
}
