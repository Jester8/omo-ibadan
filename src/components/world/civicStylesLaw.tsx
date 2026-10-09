"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { B, C, CivicFacade, GenericCivic, Sign, bodyMat, civicGlow, memoGeo, type StyleProps, type V3 } from "./civicKit";

/**
 * Law and order: police, EFCC, the custodial centre, the court. Owned by the EXT-LAW agent.
 * Phase 0 ships `Police` complete (it is the pattern for every other style) and the other three as GenericCivic.
 * Recipes: PLAN-civic.md section C (exteriors) and places.md 5.5.
 */

const WALL = "#d5dae3", BLUE = "#1d3a8a", NAVY = "#16254f", YEL = "#f2c230", WHITE = "#f2f5fa", GREEN = "#1f9d55";

/** The Nigerian flag on a pole (x, z of the pole). */
const flag = (x: number, z: number) => [
  C(0.025, 1.9, "#b9bec7", [x, 0.04, z], 0.025, 6),
  B(0.11, 0.2, 0.012, GREEN, [x + 0.09, 1.7, z]), B(0.11, 0.2, 0.012, "#ffffff", [x + 0.2, 1.7, z]), B(0.11, 0.2, 0.012, GREEN, [x + 0.31, 1.7, z]),
];

/** A flashing blue-and-red light on the roof (the only animated part of a police station). */
function Beacon({ p }: { p: V3 }) {
  const m = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (m.current) m.current.emissive.set(Math.sin(clock.elapsedTime * 6) > 0 ? "#2563eb" : "#dc2626");
  });
  return (
    <mesh position={p}>
      <boxGeometry args={[0.16, 0.07, 0.1]} />
      <meshStandardMaterial ref={m} color="#cbd5e1" emissive="#2563eb" emissiveIntensity={1.2} />
    </mesh>
  );
}

function Police({ size: [w, h, d], id = "" }: StyleProps) {
  const hw = w / 2, hd = d / 2, bh = h * 0.76;
  const g = memoGeo(`police|${w}|${h}|${d}`, () => ({
    body: [
      B(w + 0.5, 0.04, d + 0.8, "#cfd3d9", [0, 0, 0.2]), // slab stays under the 0.05 selection ring
      // perimeter wall, 0.42 high, with a 1.4 m gate in the front
      B(w, 0.42, 0.1, WALL, [0, 0.04, -hd + 0.05]),
      B(0.1, 0.42, d - 0.2, WALL, [-hw + 0.05, 0.04, 0]), B(0.1, 0.42, d - 0.2, WALL, [hw - 0.05, 0.04, 0]),
      B(hw - 0.7, 0.42, 0.1, WALL, [-(hw + 0.7) / 2, 0.04, hd - 0.05]), B(hw - 0.7, 0.42, 0.1, WALL, [(hw + 0.7) / 2, 0.04, hd - 0.05]),
      B(0.14, 0.62, 0.14, BLUE, [-0.72, 0.04, hd - 0.05]), B(0.14, 0.62, 0.14, BLUE, [0.72, 0.04, hd - 0.05]),
      // roof, blue band and yellow stripe across the front of the block
      B(w - 0.5, 0.07, d * 0.63 + 0.2, NAVY, [0, 0.04 + bh, -0.35]),
      B(w - 0.68, 0.2, 0.03, BLUE, [0, 1.0, -0.35 + (d * 0.63) / 2 + 0.015]),
      B(w - 0.68, 0.05, 0.03, YEL, [0, 0.94, -0.35 + (d * 0.63) / 2 + 0.015]),
      // porch: two pillars, a canopy and the door
      B(0.08, 0.75, 0.08, WHITE, [-0.55, 0.04, 1.0]), B(0.08, 0.75, 0.08, WHITE, [0.55, 0.04, 1.0]),
      B(1.4, 0.06, 0.7, BLUE, [0, 0.79, 0.85]), B(0.55, 0.62, 0.03, NAVY, [0, 0.04, -0.35 + (d * 0.63) / 2 + 0.02]),
      // a patrol pickup parked sideways in the front yard (an object, never a person)
      B(1.0, 0.22, 0.5, WHITE, [-1.15, 0.04, 1.08]), B(1.02, 0.07, 0.52, BLUE, [-1.15, 0.15, 1.08]), B(0.4, 0.16, 0.44, "#dbe6f2", [-0.95, 0.26, 1.08]),
      ...flag(hw - 0.35, 1.0),
    ],
    glow: [B(0.2, 0.08, 0.06, "#ffe9b0", [0, 0.74, 0.66]), B(0.1, 0.1, 0.1, "#ffe9b0", [-0.72, 0.66, hd - 0.05]), B(0.1, 0.1, 0.1, "#ffe9b0", [0.72, 0.66, hd - 0.05])],
  }));
  const division = id === "police-mokola" ? "MOKOLA" : "DUGBE";
  return (
    <>
      <CivicFacade p={[0, 0.04, -0.35]} w={w - 0.7} h={bh} d={d * 0.63} tint={WHITE} />
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#ffe9b0")} dispose={null} />
      <Sign text={`POLICE · ${division}`} bg={BLUE} fg="#ffffff" w={1.5} h={0.36} p={[0, 1.3, -0.35 + (d * 0.63) / 2 + 0.035]} />
      <Beacon p={[0, 0.04 + bh + 0.1, -0.35]} />
    </>
  );
}

export type LawStyle = "police" | "office" | "prison" | "court";
export const LAW_STYLES: Record<LawStyle, (p: StyleProps) => ReactNode> = {
  police: Police,
  office: GenericCivic, // EFCC: recipe in PLAN-civic.md C.2
  prison: GenericCivic,
  court: GenericCivic,
};
