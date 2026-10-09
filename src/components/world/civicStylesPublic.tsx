"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { B, C, CivicFacade, Sign, bodyMat, civicGlow, memoGeo, part, type StyleProps, type V3 } from "./civicKit";

/**
 * Public services and learning: fire station, post office, school, filling station, clinic, library, borehole, food bank.
 * Same kit and rules as civicStylesLaw.tsx: a few merged, vertex-coloured meshes per building (at most six draw calls), nothing
 * that looks like a person, glow only through civicGlow, signs only through Sign. Local frame: origin = bottom-centre of the
 * footprint, +z = front (door and sign), y up.
 */

const WHITE = "#f4f4f2", RED = "#d62828", GREEN = "#166534";

/** A hip roof (four slopes) over a w x d rectangle: a four-sided cone squashed to the size wanted. */
const hip = (w: number, d: number, rise: number, hex: string, p: V3) => part(new THREE.ConeGeometry(1, rise, 4).rotateY(Math.PI / 4), hex, [p[0], p[1] + rise / 2, p[2]], { s: [w / Math.SQRT2, 1, d / Math.SQRT2] });
/** A roof sheet tilted a little toward the front (a shed roof). */
const shed = (w: number, d: number, tilt: number, hex: string, p: V3) => part(new THREE.BoxGeometry(w, 0.06, d), hex, p, { rx: tilt });
const flag = (x: number, z: number) => [
  C(0.025, 1.7, "#b9bec7", [x, 0.04, z], 0.025, 6),
  B(0.11, 0.2, 0.012, "#1f9d55", [x + 0.09, 1.5, z]), B(0.11, 0.2, 0.012, "#ffffff", [x + 0.2, 1.5, z]), B(0.11, 0.2, 0.012, "#1f9d55", [x + 0.31, 1.5, z]),
];
const wheels = (x: number, z: number, along: "x" | "z", len: number, r = 0.07) => {
  const out: THREE.BufferGeometry[] = [];
  for (const a of [-1, 1]) for (const b of [-1, 1]) out.push(part(new THREE.CylinderGeometry(r, r, 0.07, 10), "#1b1d21", [x + (along === "x" ? a * len * 0.32 : b * 0.2), r, z + (along === "x" ? b * 0.2 : a * len * 0.32)], { rz: Math.PI / 2 * (along === "x" ? 0 : 1), rx: along === "x" ? Math.PI / 2 : 0 }));
  return out;
};

/* ------------------------------------------------------------ fire station ------------------------------------------------------------ */

/** A flashing blue light bar, the only moving part. */
function LightBar({ p }: { p: V3 }) {
  const m = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (m.current) m.current.emissive.set(Math.sin(clock.elapsedTime * 7) > 0 ? "#2563eb" : "#dc2626");
  });
  return (
    <mesh position={p}>
      <boxGeometry args={[0.2, 0.05, 0.08]} />
      <meshStandardMaterial ref={m} color="#cbd5e1" emissive="#2563eb" emissiveIntensity={1.2} />
    </mesh>
  );
}

function FireStation({ size: [w, h, d] }: StyleProps) {
  const hw = w / 2, hd = d / 2, zc = -0.2, hallD = 2.5, zf = zc + hallD / 2;
  const g = memoGeo(`fire|${w}|${h}|${d}`, () => {
    const doors: THREE.BufferGeometry[] = [];
    for (const x of [-0.95, 0.95]) {
      doors.push(B(1.4, 1.12, 0.03, "#3a1212", [x, 0.04, zf + 0.012]), B(1.25, 1.05, 0.03, RED, [x, 0.04, zf + 0.03]));
      for (const y of [0.35, 0.65, 0.95]) doors.push(B(1.25, 0.03, 0.035, "#7a1010", [x, y, zf + 0.05]));
    }
    // the drill tower at the back right
    const tx = hw - 0.55, tz = -hd + 0.5;
    const tower = [B(0.68, 2.9, 0.68, "#ead6d0", [tx, 0.04, tz]), B(0.8, 0.1, 0.8, "#a31d1d", [tx, 2.94, tz]), B(0.1, 0.3, 0.03, "#3a1212", [tx, 0.7, tz + 0.345]), B(0.1, 0.3, 0.03, "#3a1212", [tx, 1.4, tz + 0.345]), B(0.1, 0.3, 0.03, "#3a1212", [tx, 2.1, tz + 0.345])];
    // a fire engine parked in front of the left door (an object, never a person), and a hydrant
    const ex = -1.25, ez = zf + 0.5;
    const engine = [
      B(1.25, 0.3, 0.5, RED, [ex, 0.1, ez]), B(0.42, 0.22, 0.46, RED, [ex + 0.6, 0.1 + 0.3, ez]), B(0.3, 0.13, 0.02, "#cfe8ff", [ex + 0.62, 0.45, ez + 0.235]),
      B(1.1, 0.025, 0.07, "#cbd2d9", [ex - 0.1, 0.62, ez]), B(1.25, 0.04, 0.52, WHITE, [ex, 0.28, ez]),
      ...wheels(ex, ez, "x", 1.25),
    ];
    const hydrant = [C(0.05, 0.22, "#d62828", [0.35, 0.04, zf + 0.35], 0.05, 8), B(0.14, 0.05, 0.05, "#d62828", [0.35, 0.18, zf + 0.35])];
    return {
      body: [
        B(w + 0.2, 0.04, d + 0.3, "#cfd3d9", [0, 0, 0.1]),
        B(w - 0.2, 0.08, hallD + 0.1, "#7a1c1c", [0, 1.54, zc]),
        ...doors, ...tower, ...engine, ...hydrant,
        B(w - 0.5, 0.12, 0.04, "#a31d1d", [0, 1.28, zf + 0.02]),
      ],
      glow: [B(w - 1.0, 0.05, 0.03, "#fff1c8", [0, 1.18, zf + 0.04]), B(0.12, 0.1, 0.1, "#fff1c8", [hw - 0.55, 3.1, -hd + 0.5])],
    };
  });
  return (
    <>
      <CivicFacade p={[0, 0.04, zc]} w={w - 0.3} h={1.5} d={hallD} tint="#f1e3df" />
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#fff1c8")} dispose={null} />
      <Sign text="FIRE SERVICE" bg="#c81e1e" fg="#ffffff" w={1.4} h={0.3} p={[0, 1.4, zf + 0.06]} />
      <LightBar p={[-1.25 + 0.6, 0.1 + 0.3 + 0.24, zf + 0.5]} />
    </>
  );
}

/* ------------------------------------------------------------ filling station ------------------------------------------------------------ */

function Filling({ size: [w, h, d] }: StyleProps) {
  const hd = d / 2, cz = 0.35;
  const g = memoGeo(`filling|${w}|${h}|${d}`, () => {
    const cols: THREE.BufferGeometry[] = [];
    for (const x of [-1.9, 1.9]) for (const z of [cz - 0.65, cz + 0.65]) cols.push(B(0.07, 1.12, 0.07, "#e5e7eb", [x, 0.04, z]));
    const pumps: THREE.BufferGeometry[] = [];
    for (const ix of [-0.7, 0.7]) {
      pumps.push(B(0.5, 0.05, 1.2, "#b8bcc2", [ix, 0.04, cz]));
      for (const z of [cz - 0.28, cz + 0.28]) pumps.push(B(0.16, 0.46, 0.12, "#f2f2f0", [ix, 0.09, z]), B(0.17, 0.08, 0.13, RED, [ix, 0.5, z]));
    }
    const lines: THREE.BufferGeometry[] = [];
    for (const x of [-1.4, 0, 1.4]) lines.push(B(0.04, 0.005, 1.3, "#e8e8e8", [x, 0.042, cz]));
    return {
      body: [
        B(w, 0.04, d, "#3a3d42", [0, 0, 0]), B(w, 0.01, 0.06, "#f2c230", [0, 0.04, hd - 0.05]), ...lines,
        // the shop at the back
        B(2.3, 0.72, 0.9, WHITE, [0.5, 0.04, -hd + 0.55]), B(2.5, 0.08, 1.05, RED, [0.5, 0.76, -hd + 0.55]), B(1.6, 0.4, 0.02, "#7cc4e6", [0.5, 0.18, -hd + 1.01]),
        // the canopy: white, with a red fascia and a blue stripe
        B(4.4, 0.1, 1.7, WHITE, [0, 1.12, cz]), B(4.4, 0.16, 0.04, RED, [0, 1.06, cz + 0.85]), B(4.4, 0.04, 0.045, "#1d4ed8", [0, 1.02, cz + 0.85]),
        ...cols, ...pumps,
        // the price pylon at the front left
        B(0.05, 0.9, 0.05, "#4b5058", [-1.85, 0.04, hd - 0.2]), B(0.66, 0.2, 0.06, "#1f2937", [-1.85, 0.88, hd - 0.2]),
      ],
      glow: [B(4.0, 0.012, 1.4, "#fff6d6", [0, 1.1, cz]), B(0.1, 0.07, 0.01, "#9be9a8", [-0.7, 0.34, cz + 0.34]), B(0.1, 0.07, 0.01, "#9be9a8", [0.7, 0.34, cz + 0.34]), B(1.6, 0.4, 0.015, "#fff1c8", [0.5, 0.18, -hd + 1.02])],
    };
  });
  return (
    <>
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#fff6d6")} dispose={null} />
      <Sign text="MONIYA" bg={RED} fg="#ffffff" w={1.4} h={0.2} p={[0, 1.07, cz + 0.88]} />
      <Sign text="PETROL · DIESEL · GAS" bg="#111827" fg="#fde047" w={0.62} h={0.155} p={[-1.85, 0.98, hd - 0.2 + 0.035]} />
    </>
  );
}

/* ------------------------------------------------------------ post office ------------------------------------------------------------ */

function PostOffice({ size: [w, h, d] }: StyleProps) {
  const zc = -0.35, bd = 1.4, zf = zc + bd / 2;
  const g = memoGeo(`post|${w}|${h}|${d}`, () => ({
    body: [
      B(w, 0.04, d + 0.3, "#cfd3d9", [0, 0, 0.1]),
      hip(w - 0.1, bd + 0.35, 0.4, GREEN, [0, 1.04, zc]),
      B(w - 0.5, 0.14, 0.03, GREEN, [0, 0.82, zf + 0.015]), B(w - 0.5, 0.04, 0.03, "#fde047", [0, 0.78, zf + 0.015]),
      // the veranda
      B(2.0, 0.06, 0.6, GREEN, [-0.1, 0.78, zf + 0.3]), B(0.07, 0.74, 0.07, WHITE, [-1.0, 0.04, zf + 0.55]), B(0.07, 0.74, 0.07, WHITE, [0.8, 0.04, zf + 0.55]),
      B(0.7, 0.62, 0.03, "#2b2a28", [-0.1, 0.04, zf + 0.02]), B(0.02, 0.62, 0.035, "#6b5a3a", [-0.1, 0.04, zf + 0.025]),
      // a red post box, and the white mail van parked sideways in front on the left (an object, never a person)
      C(0.1, 0.4, "#d62828", [0.95, 0.04, zf + 0.45], 0.1, 10), C(0.1, 0.04, "#111111", [0.95, 0.44, zf + 0.45], 0.1, 10),
      B(1.0, 0.24, 0.46, WHITE, [-1.0, 0.1, zf + 0.82]), B(0.38, 0.18, 0.44, WHITE, [-0.62, 0.1 + 0.24, zf + 0.82]), B(1.02, 0.04, 0.47, "#166534", [-1.0, 0.2, zf + 0.82]),
      ...wheels(-1.0, zf + 0.82, "x", 1.0),
      ...flag(w / 2 - 0.35, zf + 0.5),
    ],
    glow: [B(0.1, 0.12, 0.08, "#ffe9b0", [0.55, 0.62, zf + 0.04]), B(0.5, 0.3, 0.02, "#ffe9b0", [1.0, 0.32, zf + 0.015])],
  }));
  return (
    <>
      <CivicFacade p={[0, 0.04, zc]} w={w - 0.4} h={0.98} d={bd} tint="#f6e7a4" />
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#ffe9b0")} dispose={null} />
      <Sign text="NIPOST" bg={GREEN} fg="#fde047" w={1.1} h={0.26} p={[0, 0.98, zf + 0.04]} />
    </>
  );
}

/* ------------------------------------------------------------ borehole ------------------------------------------------------------ */

function Borehole({ size: [w, h, d] }: StyleProps) {
  const zc = -0.3, bd = 1.2, zf = zc + bd / 2;
  const g = memoGeo(`borehole|${w}|${h}|${d}`, () => ({
    body: [
      B(w, 0.04, d + 0.3, "#cfd3d9", [0, 0, 0.1]),
      B(2.05, 0.06, bd + 0.2, "#e9eef0", [0, 1.02, zc]),
      B(0.42, 0.8, 0.03, "#2b5a6e", [-0.4, 0.04, zf + 0.015]), B(0.42, 0.8, 0.03, "#2b5a6e", [0.4, 0.04, zf + 0.015]),
      // the water tank on four legs on the roof, at the back
      ...[-0.25, 0.25].flatMap((x) => [-0.2, 0.2].map((z) => B(0.04, 0.5, 0.04, "#6b7280", [x, 1.08, zc - 0.25 + z]))),
      C(0.42, 0.55, "#3b82f6", [0, 1.58, zc - 0.25], 0.42, 14),
      // the hand pump on a small concrete apron, front right
      B(0.7, 0.03, 0.6, "#bfc3c9", [w / 2 - 0.5, 0.04, zf + 0.45]), C(0.04, 0.7, "#3b82a6", [w / 2 - 0.5, 0.07, zf + 0.45], 0.04, 8), B(0.2, 0.05, 0.05, "#3b82a6", [w / 2 - 0.4, 0.68, zf + 0.45]),
    ],
    glow: [B(0.1, 0.1, 0.07, "#fff1b0", [0, 0.86, zf + 0.04])],
  }));
  return (
    <>
      <CivicFacade p={[0, 0.04, zc]} w={1.9} h={0.98} d={bd} tint="#d5e4ea" />
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#fff1b0")} dispose={null} />
      <Sign text="BOREHOLE · TOILET" bg="#0ea5e9" fg="#ffffff" w={1.4} h={0.2} p={[0, 0.94, zf + 0.04]} />
    </>
  );
}

/* ------------------------------------------------------------ food bank ------------------------------------------------------------ */

function FoodBank({ size: [w, h, d] }: StyleProps) {
  const zc = -0.25, bd = 1.9, zf = zc + bd / 2;
  const g = memoGeo(`foodbank|${w}|${h}|${d}`, () => {
    const crates: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 6; i++) crates.push(B(0.22, 0.22, 0.22, i % 2 ? "#b8895a" : "#a5764a", [0.95 + (i % 3) * 0.23, 0.04 + Math.floor(i / 3) * 0.22, zf + 0.35]));
    return {
      body: [
        B(w, 0.04, d + 0.3, "#cfd3d9", [0, 0, 0.1]),
        shed(w - 0.1, bd + 0.3, -0.1, "#9a9a94", [0, 1.28, zc]),
        B(w - 0.5, 0.2, 0.03, "#d9822b", [0, 0.92, zf + 0.015]),
        B(1.4, 1.0, 0.04, "#6b3a1f", [0, 0.04, zf + 0.02]), B(1.2, 0.9, 0.03, "#c9c3b4", [0, 0.04, zf + 0.04]),
        ...[0.25, 0.45, 0.65].map((y) => B(1.2, 0.025, 0.035, "#a39d8c", [0, y, zf + 0.06])),
        ...crates,
        B(0.2, 0.16, 0.2, "#c9b88a", [-1.25, 0.04, zf + 0.35]), B(0.2, 0.14, 0.2, "#d8c9a0", [-1.05, 0.04, zf + 0.35]),
        // a hand trolley
        B(0.02, 0.5, 0.02, "#4b5058", [-0.55, 0.04, zf + 0.3]), B(0.18, 0.02, 0.14, "#4b5058", [-0.55, 0.06, zf + 0.37]),
      ],
      glow: [B(0.1, 0.12, 0.08, "#ffd98a", [0.85, 0.7, zf + 0.04])],
    };
  });
  return (
    <>
      <CivicFacade p={[0, 0.04, zc]} w={w - 0.4} h={1.18} d={bd} tint="#f3ead8" />
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#ffd98a")} dispose={null} />
      <Sign text="HOPE FOOD BANK" bg="#d9822b" fg="#ffffff" w={1.6} h={0.26} p={[0, 1.1, zf + 0.04]} />
    </>
  );
}

/* ------------------------------------------------------------ school ------------------------------------------------------------ */

function School({ size: [w, h, d] }: StyleProps) {
  const hw = w / 2, hd = d / 2, zc = -hd + 0.75, bd = 1.25, zf = zc + bd / 2, bw = 5.4;
  const g = memoGeo(`school|${w}|${h}|${d}`, () => {
    const fence: THREE.BufferGeometry[] = [];
    const run = (len: number, x: number, z: number, alongX: boolean) => fence.push(B(alongX ? len : 0.05, 0.35, alongX ? 0.05 : len, "#efe6c6", [x, 0.02, z]), B(alongX ? len : 0.07, 0.04, alongX ? 0.07 : len, "#3f8f56", [x, 0.37, z]));
    run(w, 0, -hd + 0.03, true);
    run(d - 0.1, -hw + 0.03, 0, false);
    run(d - 0.1, hw - 0.03, 0, false);
    const seg = hw - 0.6;
    run(seg, -(hw + 0.6) / 2, hd - 0.03, true);
    run(seg, (hw + 0.6) / 2, hd - 0.03, true);
    const cols: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 8; i++) cols.push(B(0.06, 0.78, 0.06, "#f4f1e6", [-2.5 + i * (5.0 / 7), 0.02, zf + 0.38]));
    return {
      body: [
        B(w - 0.1, 0.03, d - 0.1, "#d6d0b8", [0, 0, 0]),
        ...fence,
        // the classroom block roof, the veranda, the bell turret
        B(bw + 0.2, 0.07, bd + 0.2, "#3f8f56", [0, 1.2, zc]), B(bw, 0.05, 0.8, "#3f8f56", [0, 0.8, zf + 0.4]), ...cols,
        B(0.3, 0.3, 0.3, "#f4f1e6", [0, 1.27, zc]), B(0.4, 0.06, 0.4, "#3f8f56", [0, 1.57, zc]),
        // the field in front: grass, a centre line, two goalposts
        B(4.6, 0.012, 1.7, "#6fbf73", [0, 0.03, 0.55]), B(0.03, 0.014, 1.7, "#eaf7ea", [0, 0.04, 0.55]),
        ...[-2.3, 2.3].flatMap((x) => [B(0.03, 0.28, 0.03, WHITE, [x, 0.03, 0.3]), B(0.03, 0.28, 0.03, WHITE, [x, 0.03, 0.8]), B(0.03, 0.03, 0.55, WHITE, [x, 0.3, 0.55])]),
        // playground: a slide and a swing frame, at the back right of the field
        B(0.05, 0.4, 0.05, "#d62828", [hw - 0.55, 0.03, 0.2]), part(new THREE.BoxGeometry(0.1, 0.03, 0.55), "#facc15", [hw - 0.55, 0.22, 0.52], { rx: -0.55 }),
        B(0.04, 0.45, 0.04, "#4b5058", [hw - 0.9, 0.03, 0.95]), B(0.04, 0.45, 0.04, "#4b5058", [hw - 0.3, 0.03, 0.95]), B(0.62, 0.03, 0.04, "#4b5058", [hw - 0.6, 0.45, 0.95]),
        B(0.12, 0.9, 0.12, "#e8e2cf", [-0.6, 0.03, hd - 0.03]), B(0.12, 0.9, 0.12, "#e8e2cf", [0.6, 0.03, hd - 0.03]), B(1.32, 0.05, 0.1, "#2f6f4f", [0, 0.93, hd - 0.03]),
        ...flag(-hw + 0.5, hd - 0.6),
      ],
      glow: [B(0.1, 0.1, 0.1, "#ffe9b0", [-0.6, 0.98, hd - 0.03]), B(0.1, 0.1, 0.1, "#ffe9b0", [0.6, 0.98, hd - 0.03])],
    };
  });
  return (
    <>
      <CivicFacade p={[0, 0.03, zc]} w={bw} h={1.16} d={bd} tint="#f7edc4" />
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#ffe9b0")} dispose={null} />
      <Sign text="COMMUNITY PRIMARY SCHOOL" bg="#2f6f4f" fg="#fde68a" w={1.15} h={0.26} p={[0, 0.72, hd - 0.0 + 0.035]} />
    </>
  );
}

/* ------------------------------------------------------------ health centre ------------------------------------------------------------ */

function Clinic({ size: [w, h, d], id = "" }: StyleProps) {
  const zc = -0.3, bd = 1.4, zf = zc + bd / 2, bw = w - 0.5;
  const g = memoGeo(`clinic|${w}|${h}|${d}`, () => ({
    body: [
      B(w, 0.04, d + 0.3, "#cfd3d9", [0, 0, 0.1]),
      B(bw + 0.2, 0.08, bd + 0.2, "#2f855a", [0, 1.02, zc]),
      // the white panel the green cross sits on, and the veranda with three columns and two benches
      B(0.4, 0.4, 0.03, WHITE, [0, 0.66, zf + 0.02]),
      B(1.9, 0.06, 0.6, "#2f855a", [-0.3, 0.78, zf + 0.3]), ...[-1.2, -0.3, 0.6].map((x) => B(0.06, 0.74, 0.06, WHITE, [x, 0.04, zf + 0.58])),
      B(0.5, 0.05, 0.16, "#8b6b45", [-0.9, 0.14, zf + 0.42]), B(0.5, 0.05, 0.16, "#8b6b45", [0.2, 0.14, zf + 0.42]),
      B(0.62, 0.56, 0.03, "#5b7a69", [-0.3, 0.04, zf + 0.02]),
      // the water tank on stilts at the back, and a solar panel on the roof
      ...[-0.15, 0.15].flatMap((x) => [-0.15, 0.15].map((z) => B(0.035, 0.45, 0.035, "#6b7280", [bw / 2 - 0.45 + x, 1.08, zc - 0.3 + z]))),
      C(0.3, 0.4, "#3b82f6", [bw / 2 - 0.45, 1.53, zc - 0.3], 0.3, 12),
      part(new THREE.BoxGeometry(0.9, 0.03, 0.55), "#1e3a5f", [-bw / 2 + 0.7, 1.16, zc + 0.15], { rx: -0.45 }),
    ],
    glow: [B(0.1, 0.1, 0.07, "#ffe9b0", [-0.95, 0.62, zf + 0.04]), B(0.1, 0.1, 0.07, "#ffe9b0", [0.3, 0.62, zf + 0.04])],
  }));
  const cross = memoGeo(`clinic-cross|${w}`, () => ({ body: [B(0.01, 0.01, 0.01, "#000000", [0, -5, 0])], glow: [B(0.26, 0.08, 0.03, "#22c55e", [0, 0.82, zf + 0.04]), B(0.08, 0.26, 0.03, "#22c55e", [0, 0.73, zf + 0.04])] }));
  return (
    <>
      <CivicFacade p={[0, 0.04, zc]} w={bw} h={0.98} d={bd} tint="#eef6f0" />
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#ffe9b0")} dispose={null} />
      <mesh geometry={cross.glow} material={civicGlow("#22c55e")} dispose={null} />
      <Sign text={id === "health-centre" ? "OLODO HEALTH CENTRE" : "PRIMARY HEALTH CENTRE"} bg="#16a34a" fg="#ffffff" w={1.9} h={0.24} p={[0.3, 0.97, zf + 0.04]} />
    </>
  );
}

/* ------------------------------------------------------------ library and rec centre ------------------------------------------------------------ */

function Library({ size: [w, h, d] }: StyleProps) {
  const hw = w / 2, hd = d / 2, bw = w * 0.6, bx = -hw + bw / 2 + 0.05, zc = -0.35, bd = 1.9, zf = zc + bd / 2;
  const g = memoGeo(`library|${w}|${h}|${d}`, () => {
    const cols: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 4; i++) cols.push(C(0.07, 0.8, "#f1ead8", [bx - 0.9 + i * 0.6, 0.06, zf + 0.5], 0.07, 10));
    const books: THREE.BufferGeometry[] = [];
    ["#c2410c", "#1d4ed8", "#15803d", "#a21caf", "#ca8a04"].forEach((c, i) => books.push(B(0.12, 0.22, 0.02, c, [bx - 0.5 + i * 0.25, 0.9, zf + 0.025])));
    // the rec court on the right: teal, with lines and one basketball hoop
    const cx = hw - 0.95, cz = hd - 0.8;
    return {
      body: [
        B(w, 0.04, d + 0.3, "#cfd3d9", [0, 0, 0.1]),
        hip(bw + 0.15, bd + 0.25, 0.45, "#7c4a1e", [bx, 1.08, zc]),
        B(bw - 0.2, 0.06, 0.7, "#e9e0c8", [bx, 0.9, zf + 0.5]), ...cols, ...books,
        B(0.5, 0.62, 0.03, "#3b2a1a", [bx, 0.06, zf + 0.025]),
        B(1.7, 0.012, 1.4, "#2f9d77", [cx, 0.04, cz]), B(1.7, 0.014, 0.03, "#e8fff6", [cx, 0.05, cz]), B(0.03, 0.014, 1.4, "#e8fff6", [cx, 0.05, cz]), C(0.28, 0.014, "#2f9d77", [cx, 0.05, cz], 0.28, 14),
        B(0.04, 0.9, 0.04, "#4b5058", [cx, 0.05, cz - 0.7]), B(0.4, 0.28, 0.03, WHITE, [cx, 0.7, cz - 0.62]), B(0.14, 0.02, 0.14, "#f97316", [cx, 0.74, cz - 0.52]),
      ],
      glow: [B(0.1, 0.1, 0.07, "#ffe9b0", [bx + 0.5, 0.6, zf + 0.04]), B(0.14, 0.05, 0.14, "#fff6d6", [cx - 0.6, 0.98, cz - 0.62])],
    };
  });
  return (
    <>
      <CivicFacade p={[bx, 0.04, zc]} w={bw - 0.1} h={0.98} d={bd} tint="#d9c9a8" />
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <mesh geometry={g.glow} material={civicGlow("#ffe9b0")} dispose={null} />
      <Sign text="LIBRARY & REC CENTRE" bg="#7c4a1e" fg="#fde68a" w={1.55} h={0.26} p={[bx, 1.04, zf + 0.04]} />
    </>
  );
}

export type PublicStyle = "firestation" | "postoffice" | "school" | "filling" | "clinic" | "library" | "borehole" | "foodbank";
export const PUBLIC_STYLES: Record<PublicStyle, (p: StyleProps) => ReactNode> = {
  firestation: FireStation,
  postoffice: PostOffice,
  school: School,
  filling: Filling,
  clinic: Clinic,
  library: Library,
  borehole: Borehole,
  foodbank: FoodBank,
};
