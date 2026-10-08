"use client";

import * as THREE from "three";
import { mat } from "@/components/world/materials";
import { adireTexture } from "./textures";

/** Drawing helpers shared by every furniture renderer (Furniture.tsx and the bodies*.tsx files). */

export type V3 = [number, number, number];

export const WOOD = "#8a5a3c";
export const DARK = "#5a3a24";
export const LIGHT = "#b8895a";
export const METAL = "#8c9096";
export const WHITE = "#efece4";

/* ---- glowing materials, dimmed centrally by the interior scene ---- */
export const glow = {
  screen: new THREE.MeshStandardMaterial({ color: "#1b2a3a", emissive: new THREE.Color("#8fc8ff"), emissiveIntensity: 0, roughness: 0.3 }),
  bulb: new THREE.MeshStandardMaterial({ color: "#fff4d6", emissive: new THREE.Color("#ffd98a"), emissiveIntensity: 0, roughness: 0.4 }),
  lantern: new THREE.MeshStandardMaterial({ color: "#ffe2a8", emissive: new THREE.Color("#ffb347"), emissiveIntensity: 0.4, roughness: 0.4, transparent: true, opacity: 0.9 }),
  neon: new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: new THREE.Color("#ff6fb1"), emissiveIntensity: 0, roughness: 0.4 }),
};

export const glass = new THREE.MeshStandardMaterial({ color: "#bfe0f2", roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.28 });
export const water = new THREE.MeshStandardMaterial({ color: "#5fb8e6", roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.85 });

const artCache = new Map<string, THREE.MeshStandardMaterial>();
export function artMat(color: string) {
  let m = artCache.get(color);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ map: adireTexture(color), roughness: 0.85 });
    artCache.set(color, m);
  }
  return m;
}

/* ---- primitives: bottom-based boxes and cylinders ---- */

export function Bx({ p = [0, 0, 0], s, c, r = 0.75, rot, m }: { p?: V3; s: V3; c?: string; r?: number; rot?: V3; m?: THREE.Material }) {
  return (
    <mesh position={[p[0], p[1] + s[1] / 2, p[2]]} rotation={rot} material={m ?? mat(c ?? WOOD, r)} castShadow receiveShadow>
      <boxGeometry args={s} />
    </mesh>
  );
}

export function Cy({ p = [0, 0, 0], r, r2, h, c, seg = 18, rough = 0.75, m, rot }: { p?: V3; r: number; r2?: number; h: number; c?: string; seg?: number; rough?: number; m?: THREE.Material; rot?: V3 }) {
  return (
    <mesh position={[p[0], p[1] + h / 2, p[2]]} rotation={rot} material={m ?? mat(c ?? WOOD, rough)} castShadow receiveShadow>
      <cylinderGeometry args={[r2 ?? r, r, h, seg]} />
    </mesh>
  );
}

export function Sp({ p, r, c, sc, rough = 0.7 }: { p: V3; r: number; c: string; sc?: V3; rough?: number }) {
  return (
    <mesh position={p} scale={sc} material={mat(c, rough)} castShadow>
      <sphereGeometry args={[r, 16, 12]} />
    </mesh>
  );
}

/** Four legs at the corners of a w x d footprint. */
export function Legs({ w, d, h, c = DARK, r = 0.025 }: { w: number; d: number; h: number; c?: string; r?: number }) {
  return (
    <>
      {[-1, 1].flatMap((sx) => [-1, 1].map((sz) => <Cy key={`${sx}${sz}`} p={[sx * (w / 2 - r * 2), 0, sz * (d / 2 - r * 2)]} r={r} h={h} c={c} seg={8} />))}
    </>
  );
}

/** What a furniture renderer receives. W and D include any per-item override; H is the catalogue height. */
export type BodyProps = { item: import("@/lib/interiors").Item; W: number; D: number; H: number; c: string; c2: string };
