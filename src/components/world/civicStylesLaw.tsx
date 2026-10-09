"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { B, C, CivicFacade, Dome, Sign, bodyMat, civicGlow, memoGeo, part, type StyleProps, type V3 } from "./civicKit";

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

/* ------------------------------------------------------------------ EFCC ------------------------------------------------------------------ */

const STEEL = "#aeb6bf", PLINTH = "#cfd4da";

/** The EFCC: a glass-and-steel mid-rise with a green-white-green band, a canopy over the door, and a mast with a red aviation lamp. */
function Office({ size: [w, h, d] }: StyleProps) {
  const bw = w - 0.5, bd = d - 1.0, zc = -0.25, bh = h - 0.3, zf = zc + bd / 2;
  const g = memoGeo(`office|${w}|${h}|${d}`, () => {
    const bands: THREE.BufferGeometry[] = [];
    for (let i = 1; i < 4; i++) bands.push(B(bw + 0.04, 0.05, bd + 0.04, STEEL, [0, 0.14 + (bh * i) / 4, zc]));
    return {
      body: [
        B(w, 0.04, d + 0.4, PLINTH, [0, 0, 0.1]), // slab
        B(bw + 0.1, 0.14, bd + 0.1, PLINTH, [0, 0.04, zc]), // plinth
        ...bands,
        B(0.07, bh, 0.07, STEEL, [-bw / 2, 0.18, zf]), B(0.07, bh, 0.07, STEEL, [bw / 2, 0.18, zf]),
        // the national colours across the front, near the top
        B(bw - 0.1, 0.1, 0.03, GREEN, [0, 3.1, zf + 0.02]), B(bw - 0.1, 0.1, 0.03, "#f7f7f5", [0, 3.2, zf + 0.02]), B(bw - 0.1, 0.1, 0.03, GREEN, [0, 3.3, zf + 0.02]),
        // the door, set back in dark glass, with a steel canopy on two slim columns
        B(0.6, 0.78, 0.04, "#1c2f3b", [0, 0.18, zf + 0.025]),
        B(1.7, 0.06, 0.9, STEEL, [0, 0.98, zf + 0.45]), B(0.05, 0.8, 0.05, STEEL, [-0.78, 0.18, zf + 0.82]), B(0.05, 0.8, 0.05, STEEL, [0.78, 0.18, zf + 0.82]),
        // the roof: a plant room and a mast
        B(0.9, 0.3, 0.7, "#9aa3ad", [-0.5, 0.14 + bh, zc]), C(0.025, 0.95, "#b9bec7", [0.55, 0.14 + bh, zc], 0.025, 6),
      ],
      glow: [B(1.9, 0.5, 0.025, "#e8f6ff", [0, 0.22, zf + 0.012]), B(0.07, 0.07, 0.07, "#ff3b30", [0.55, 0.14 + bh + 0.95, zc])],
    };
  });
  return (
    <>
      <CivicFacade p={[0, 0.18, zc]} w={bw} h={bh - 0.04} d={bd} tint="#8cc0d6" />
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#e8f6ff")} dispose={null} />
      <Sign text="EFCC" bg={GREEN} fg="#ffffff" w={1.1} h={0.34} p={[0, 2.78, zf + 0.04]} />
    </>
  );
}

/* ------------------------------------------------------------------ prison ------------------------------------------------------------------ */

/** The Agodi Custodial Centre: a walled compound with four empty watchtowers, a gatehouse, a cell block and a yard. Nobody is drawn in it. */
function Prison({ size: [w, h, d] }: StyleProps) {
  const hw = w / 2, hd = d / 2, WALLH = 0.95, T = 0.18, gate = 0.5;
  const g = memoGeo(`prison|${w}|${h}|${d}`, () => {
    const walls: THREE.BufferGeometry[] = [];
    const wallRun = (len: number, x: number, z: number, alongX: boolean) => {
      walls.push(B(alongX ? len : T, WALLH, alongX ? T : len, "#a9a59b", [x, 0.03, z]));
      walls.push(B(alongX ? len + 0.02 : T + 0.06, 0.07, alongX ? T + 0.06 : len + 0.02, "#8f8b82", [x, 0.03 + WALLH, z])); // coping
      walls.push(B(alongX ? len : 0.03, 0.03, alongX ? 0.03 : len, "#2b2d31", [x, 0.03 + WALLH + 0.07 + 0.03, z])); // razor wire
    };
    wallRun(w, 0, -hd + T / 2, true);
    wallRun(d - 0.2, -hw + T / 2, 0, false);
    wallRun(d - 0.2, hw - T / 2, 0, false);
    const seg = hw - gate;
    wallRun(seg, -(hw + gate) / 2, hd - T / 2, true);
    wallRun(seg, (hw + gate) / 2, hd - T / 2, true);
    const towers: THREE.BufferGeometry[] = [];
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
      const x = sx * (hw - 0.17), z = sz * (hd - 0.17);
      towers.push(B(0.34, 1.55, 0.34, "#9b978d", [x, 0.03, z]), B(0.58, 0.36, 0.58, "#5b6169", [x, 1.6, z]), B(0.7, 0.07, 0.7, "#3f444b", [x, 1.96, z]));
    }
    const poles: THREE.BufferGeometry[] = [];
    for (const x of [-1.9, 0, 1.9]) for (const z of [-hd + 0.45, hd - 0.9]) poles.push(C(0.02, 1.15, "#4b5058", [x, 0.03, z], 0.02, 5), B(0.14, 0.05, 0.08, "#4b5058", [x, 1.18, z]));
    const lamps: THREE.BufferGeometry[] = [];
    for (const x of [-1.9, 0, 1.9]) for (const z of [-hd + 0.45, hd - 0.9]) lamps.push(B(0.11, 0.04, 0.06, "#e8f4ff", [x, 1.14, z]));
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) lamps.push(B(0.16, 0.1, 0.05, "#e8f4ff", [sx * (hw - 0.17), 1.66, sz * (hd - 0.17) + sz * 0.3]));
    // inside: the yard, the long cell block with its barred windows, and a small admin block
    const bars: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 6; i++) bars.push(B(0.2, 0.3, 0.03, "#1e2227", [-1.5 + i * 0.6, 0.45, -hd + 0.55 + 1.4 / 2 + 0.01 + 0.3]));
    return {
      body: [
        B(w - 0.2, 0.04, d - 0.2, "#c9c3b2", [0, 0, 0]), B(w - 1.0, 0.02, 1.7, "#e6e1d2", [0, 0.04, 0.8]), // ground and the yard
        ...walls, ...towers, ...poles,
        B(w - 1.9, 0.95, 1.4, "#b7b4ac", [-0.3, 0.04, -hd + 0.55]), B(w - 1.8, 0.07, 1.5, "#6b7078", [-0.3, 0.99, -hd + 0.55]), ...bars,
        // the gatehouse: flat roof, a closed steel gate
        B(2.0, 1.35, 0.8, "#98948a", [0, 0.03, hd - 0.4]), B(2.1, 0.07, 0.9, "#6b7078", [0, 1.38, hd - 0.4]), B(0.9, 0.82, 0.04, "#3b434d", [0, 0.03, hd + 0.01]),
        B(0.04, 0.82, 0.05, "#252a30", [-0.3, 0.03, hd + 0.03]), B(0.04, 0.82, 0.05, "#252a30", [0, 0.03, hd + 0.03]), B(0.04, 0.82, 0.05, "#252a30", [0.3, 0.03, hd + 0.03]),
      ],
      glow: lamps,
    };
  });
  return (
    <>
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <CivicFacade p={[1.9, 0.04, -hd + 0.55]} w={1.1} h={0.8} d={0.9} tint="#d5dae3" />
      <mesh geometry={g.glow} material={civicGlow("#e8f4ff")} dispose={null} />
      <Sign text="AGODI CUSTODIAL CENTRE" bg="#475569" fg="#ffffff" w={1.9} h={0.3} p={[0, 1.15, hd + 0.04]} />
    </>
  );
}

/* ------------------------------------------------------------------ court ------------------------------------------------------------------ */

const STONE = "#efeadc", GOLD = "#d6b44a";

/** The triangle above the columns: 3.6 wide, 0.7 high, 0.8 deep, with the point up and the flat face to the front. */
const pediment = (() => {
  const t = new THREE.Shape();
  t.moveTo(-1.8, 0);
  t.lineTo(1.8, 0);
  t.lineTo(0, 0.7);
  t.closePath();
  return new THREE.ExtrudeGeometry(t, { depth: 0.8, bevelEnabled: false });
})();

/** The High Court: a stone block behind a six-column portico and a pediment, a small red dome, two flags. */
function Court({ size: [w, h, d] }: StyleProps) {
  const bw = w * 0.9, bd = d * 0.7, bh = h * 0.62, zc = -d / 2 + bd / 2 + 0.05, zf = zc + bd / 2;
  const colH = bh - 0.12, colZ = zf + 0.55;
  const g = memoGeo(`court|${w}|${h}|${d}`, () => {
    const cols: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 6; i++) {
      const x = -1.5 + i * 0.6;
      cols.push(C(0.085, colH, "#f6f3ec", [x, 0.12, colZ], 0.085, 10), B(0.22, 0.04, 0.22, STONE, [x, 0.12, colZ]), B(0.2, 0.04, 0.2, STONE, [x, 0.12 + colH - 0.04, colZ]));
    }
    return {
      body: [
        B(w, 0.04, d + 0.3, "#cfd3d9", [0, 0, 0.1]),
        // three steps, a portico floor, the entablature and the pediment
        B(3.6, 0.04, 0.5, "#ddd8c8", [0, 0.04, zf + 1.05]), B(3.5, 0.04, 0.4, "#e4dfcf", [0, 0.08, zf + 0.95]), B(3.4, 0.04, 0.3, "#ebe6d6", [0, 0.12, zf + 0.85]),
        ...cols,
        B(3.6, 0.12, 0.8, STONE, [0, 0.12 + colH, colZ]),
        part(pediment, STONE, [0, 0.12 + colH + 0.12, colZ - 0.4]),
        // the scales of justice, in gold, on the face of the pediment
        B(0.03, 0.22, 0.03, GOLD, [0, 0.24 + colH + 0.28, colZ + 0.42]), B(0.34, 0.025, 0.03, GOLD, [0, 0.24 + colH + 0.5, colZ + 0.42]),
        B(0.1, 0.02, 0.03, GOLD, [-0.15, 0.24 + colH + 0.44, colZ + 0.42]), B(0.1, 0.02, 0.03, GOLD, [0.15, 0.24 + colH + 0.44, colZ + 0.42]),
        // the dome and the roof
        B(bw - 0.3, 0.06, bd - 0.2, "#c9c3b0", [0, 0.04 + bh, zc]), C(0.3, 0.2, STONE, [0, 0.1 + bh, zc], 0.3, 12), Dome(0.28, "#7a1f2e", [0, 0.3 + bh, zc]),
        ...flag(-2.0, zf + 1.1), ...flag(2.0, zf + 1.1),
      ],
      glow: [B(0.1, 0.05, 0.1, "#ffe9b0", [-1.5, 0.14, colZ + 0.2]), B(0.1, 0.05, 0.1, "#ffe9b0", [0, 0.14, colZ + 0.2]), B(0.1, 0.05, 0.1, "#ffe9b0", [1.5, 0.14, colZ + 0.2]), B(0.5, 0.7, 0.02, "#ffd98a", [0, 0.14, zf + 0.012])],
    };
  });
  return (
    <>
      <CivicFacade p={[0, 0.04, zc]} w={bw} h={bh} d={bd} tint="#eee8da" />
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#ffe9b0")} dispose={null} />
      <Sign text="OYO STATE HIGH COURT" bg="#7a1f2e" fg="#f6e9c8" w={1.6} h={0.28} p={[0, 0.24 + colH + 0.13, colZ + 0.42 + 0.01]} />
    </>
  );
}

export type LawStyle = "police" | "office" | "prison" | "court";
export const LAW_STYLES: Record<LawStyle, (p: StyleProps) => ReactNode> = {
  police: Police,
  office: Office,
  prison: Prison,
  court: Court,
};
