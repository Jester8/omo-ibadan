"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { daylight, gameMinutes, nepaOut } from "@/lib/time";
import { useGame } from "@/lib/store";
import { me } from "@/lib/playerState";
import { lampMat, signMat, windowMats } from "./materials";

const SKY: [number, string][] = [
  [0, "#10162b"],
  [5, "#28304f"],
  [6.5, "#f0b48a"],
  [8.5, "#eaf2e6"],
  [16, "#eaf2e6"],
  [18, "#f2a878"],
  [19.7, "#232a4a"],
  [24, "#10162b"],
];

const _a = new THREE.Color();
const _b = new THREE.Color();

function skyAt(h: number, out: THREE.Color) {
  for (let i = 0; i < SKY.length - 1; i++) {
    const [h0, c0] = SKY[i];
    const [h1, c1] = SKY[i + 1];
    if (h >= h0 && h <= h1) return out.set(c0).lerp(_b.set(c1), (h - h0) / (h1 - h0));
  }
  return out.set(SKY[0][1]);
}

const SHADOW_RES: [number, number] = typeof window !== "undefined" && window.innerWidth < 640 ? [1024, 1024] : [2048, 2048];

export default function Lighting() {
  const sun = useRef<THREE.DirectionalLight>(null);
  const amb = useRef<THREE.AmbientLight>(null);
  useFrame(({ scene }) => {
    const now = Date.now();
    const h = gameMinutes(now, useGame.getState().clockOverride) / 60;
    const day = daylight(h);
    const nepa = nepaOut(now);

    skyAt(h, _a);
    scene.background = scene.background instanceof THREE.Color ? scene.background.copy(_a) : _a.clone();
    if (scene.fog instanceof THREE.Fog) scene.fog.color.copy(_a);
    else scene.fog = new THREE.Fog(_a.clone(), 70, 180);

    const ang = ((h - 6) / 12) * Math.PI;
    if (sun.current) {
      const up = Math.max(Math.sin(ang), 0.18);
      // the sun's shadow box follows the player around the (large) city
      sun.current.position.set(me.x + Math.cos(ang) * 22, up * 24 + 4, me.z + 12);
      sun.current.target.position.set(me.x, 0, me.z);
      sun.current.target.updateMatrixWorld();
      sun.current.intensity = 0.75 + day * 1.6;
      const warm = 1 - Math.min(1, Math.abs(Math.sin(ang)) * 2.2);
      sun.current.color.set(day > 0.1 ? "#ffffff" : "#a9bcff").lerp(_b.set("#ffb27a"), warm * day);
    }
    if (amb.current) {
      amb.current.intensity = 0.8 + day * 0.5;
      amb.current.color.set(day > 0.1 ? "#ffffff" : "#7c8cc7");
    }

    const dark = 1 - day;
    const k = nepa ? 0.08 : 1;
    const glow = dark * 1.3 * k;
    windowMats.forEach((m) => (m.emissiveIntensity = glow));
    lampMat.emissiveIntensity = dark * 2.4 * (nepa ? 0.1 : 1);
    signMat.emissiveIntensity = dark * 1.4 * (nepa ? 0.35 : 1) + 0.03;
  });

  return (
    <>
      <ambientLight ref={amb} intensity={1} />
      <directionalLight
        ref={sun}
        position={[10, 24, 12]}
        intensity={2}
        castShadow
        shadow-mapSize={SHADOW_RES}
        shadow-camera-left={-32}
        shadow-camera-right={32}
        shadow-camera-top={32}
        shadow-camera-bottom={-32}
        shadow-camera-near={1}
        shadow-camera-far={90}
        shadow-bias={-0.0004}
      />
    </>
  );
}
