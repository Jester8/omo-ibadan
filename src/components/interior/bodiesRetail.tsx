"use client";

import * as THREE from "three";
import { mat } from "@/components/world/materials";
import type { FurnKind } from "@/lib/furniture";
import type { Item } from "@/lib/interiors";
import type { BodyRenderer } from "./extras";
import { Bx, Cy, DARK, LIGHT, METAL, Sp, WHITE, WOOD, artMat, glass, glow, litMat, type BodyProps, type V3 } from "./prims";

/* ---------------------------------------------------------------------------------------------
 * Shop fittings: rails, shelves, display tables, counters, produce bins and mannequins.
 * Everything is drawn in the item's local space (origin on the floor, +z is the front, metres).
 * Goods use Gb / Gc / Gs, which skip the shadow pass: a stocked shelf has hundreds of small
 * meshes and only the fixtures themselves need to ground the room with shadows.
 * ------------------------------------------------------------------------------------------- */

const PAL = ["#d94a3a", "#2f3b82", "#e2a233", "#2f8f83", "#8a2f3c", "#f0e8d6", "#7c3aed", "#1f9d55", "#e85d9a", "#0ea5e9"];
const BRIGHT = ["#ef4444", "#f59e0b", "#facc15", "#22c55e", "#06b6d4", "#3b82f6", "#a855f7", "#ec4899", "#f97316"];
/** deep adire/ankara grounds: the white print of artMat shows up on all of them */
const ANKARA = ["#2f3b82", "#8a2f3c", "#2f8f83", "#b5533c", "#7c3aed", "#1f6f5a"];
const BAG_COLS = ["#d94a3a", "#2f3b82", "#e2a233", "#8a2f3c", "#2f8f83", "#111827", "#e8c9a0", "#7c3aed", "#e85d9a"];
const SCREENS = ["#38bdf8", "#f472b6", "#a3e635", "#fbbf24", "#a78bfa", "#34d399", "#fb7185", "#22d3ee"];
const CREAM = "#f4efe0";

const GOLD = new THREE.MeshStandardMaterial({ color: "#e0b038", emissive: new THREE.Color("#6b4a00"), emissiveIntensity: 0.45, roughness: 0.3, metalness: 0.45 });
const SILVER = new THREE.MeshStandardMaterial({ color: "#d6dae0", emissive: new THREE.Color("#4b5563"), emissiveIntensity: 0.35, roughness: 0.3, metalness: 0.45 });
const MIRROR = new THREE.MeshStandardMaterial({ color: "#dbeaf2", emissive: new THREE.Color("#7f9db0"), emissiveIntensity: 0.3, roughness: 0.05, metalness: 0.4 });

/** stable pseudo-random 0..1 from a number, so the same shop always stocks the same goods */
const rnd = (n: number) => {
  const s = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};
const pick = <T,>(list: readonly T[], n: number): T => list[Math.floor(rnd(n) * list.length)];
const at = <T,>(list: readonly T[], i: number): T => list[((i % list.length) + list.length) % list.length];
/** varies a display from shop to shop by where the item stands (see `rack` in Furniture.tsx) */
const seedOf = (it: Item) => Math.round(it.x * 7 + it.z * 13);

/* ---- goods primitives: like Bx / Cy / Sp, but they skip the shadow pass ---- */

function Gb({ p = [0, 0, 0], s, c = WHITE, r = 0.8, rot, m }: { p?: V3; s: V3; c?: string; r?: number; rot?: V3; m?: THREE.Material }) {
  return (
    <mesh position={[p[0], p[1] + s[1] / 2, p[2]]} rotation={rot} material={m ?? mat(c, r)}>
      <boxGeometry args={s} />
    </mesh>
  );
}

/** upright cylinder standing on p; r is the bottom radius and r2 the top, as in Cy */
function Gc({ p = [0, 0, 0], r, r2, h, c = WHITE, rough = 0.7, seg = 12, rot, m }: { p?: V3; r: number; r2?: number; h: number; c?: string; rough?: number; seg?: number; rot?: V3; m?: THREE.Material }) {
  return (
    <mesh position={[p[0], p[1] + h / 2, p[2]]} rotation={rot} material={m ?? mat(c, rough)}>
      <cylinderGeometry args={[r2 ?? r, r, h, seg]} />
    </mesh>
  );
}

function Gs({ p, r, c = WHITE, sc, rough = 0.6, m }: { p: V3; r: number; c?: string; sc?: V3; rough?: number; m?: THREE.Material }) {
  return (
    <mesh position={p} scale={sc} material={m ?? mat(c, rough)}>
      <sphereGeometry args={[r, 12, 9]} />
    </mesh>
  );
}

/** a cylinder lying along x or z and centred on p (Cy is bottom-based, so a rotated Cy would float); `yaw` swings it in the floor plane */
function Rod({ p, len, r, axis = "x", yaw = 0, c = METAL, rough = 0.5, seg = 10, m }: { p: V3; len: number; r: number; axis?: "x" | "z"; yaw?: number; c?: string; rough?: number; seg?: number; m?: THREE.Material }) {
  const rot: V3 = axis === "x" ? [0, yaw, Math.PI / 2] : [Math.PI / 2, 0, yaw];
  return (
    <mesh position={p} rotation={rot} material={m ?? mat(c, rough)}>
      <cylinderGeometry args={[r, r, len, seg]} />
    </mesh>
  );
}

/** a torus: `arc` = PI gives a handle arch standing on p, rot [PI/2, 0, 0] lays it flat */
function Ring({ p, r, t, arc = Math.PI * 2, rot, c, m }: { p: V3; r: number; t: number; arc?: number; rot?: V3; c?: string; m?: THREE.Material }) {
  return (
    <mesh position={p} rotation={rot} material={m ?? mat(c ?? METAL, 0.4)}>
      <torusGeometry args={[r, t, 6, 18, arc]} />
    </mesh>
  );
}

/** price-tag strip along a shelf edge: a white strip with a few coloured tags; z is the strip's face, the sign says which way it looks */
function Tags({ w, y, z, k = 0, n = 2 }: { w: number; y: number; z: number; k?: number; n?: number }) {
  const out = Math.sign(z) || 1;
  return (
    <>
      <Gb p={[0, y, z]} s={[w, 0.035, 0.012]} c="#f8f6ee" />
      {Array.from({ length: n }).map((_, i) => (
        <Gb key={i} p={[((i + 0.5) / n - 0.5) * w * 0.8 + (rnd(k + i) - 0.5) * 0.1, y + 0.004, z + out * 0.007]} s={[0.07, 0.027, 0.006]} c={i % 2 ? "#ef4444" : "#facc15"} />
      ))}
    </>
  );
}

/* ---- folded cloth ---- */

const FOLD_SETS: Record<string, { cols: string[]; lh: number; ank?: boolean }> = {
  jeans: { cols: ["#2b4a7a", "#3a5f94", "#22385e", "#4a6fa5"], lh: 0.09 },
  tees: { cols: [...BRIGHT, "#f8fafc"], lh: 0.07 },
  ankara: { cols: ANKARA, lh: 0.085, ank: true },
  polos: { cols: ["#f0e8d6", "#0ea5e9", "#16a34a", "#d94a3a", "#111827"], lh: 0.075 },
  towels: { cols: ["#f8fafc", "#fbcfe8", "#bae6fd", "#bbf7d0", "#fde68a"], lh: 0.07 },
};
const FOLD_ORDER = ["jeans", "tees", "ankara", "polos", "towels"];

/** a pile of folded cloth: layers in two colours, every other layer ankara-printed when `ank` */
function Pile({ p, w, d, layers, lh, c, c2, ank, k }: { p: V3; w: number; d: number; layers: number; lh: number; c: string; c2: string; ank?: boolean; k: number }) {
  return (
    <group position={p} rotation={[0, (rnd(k) - 0.5) * 0.14, 0]}>
      {Array.from({ length: layers }).map((_, i) => {
        const col = i % 2 ? c2 : c;
        return <Gb key={i} p={[(rnd(k + i) - 0.5) * 0.02, i * lh, (rnd(k + i + 9) - 0.5) * 0.02]} s={[w, lh - 0.004, d]} m={ank && i % 2 === 0 ? artMat(col) : mat(col, 0.92)} />;
      })}
    </group>
  );
}

/* ---------------------------------------------------------------------------------------------
 * clothesrail: a freestanding double-sided rail hung with shirts, dresses, jackets, kaftans and wrappers
 * ------------------------------------------------------------------------------------------- */

type GarmentKind = "shirt" | "dress" | "jacket" | "kaftan" | "wrap";
const GARMENT_KINDS: GarmentKind[] = ["shirt", "dress", "jacket", "kaftan", "wrap", "shirt", "dress"];
const JACKETS = ["#1f2937", "#2f3b82", "#4a3728", "#3f3f46", "#7f1d1d"];

/** one garment on its hanger, hanging down from y = 0 */
function Garment({ kind, c, ank }: { kind: GarmentKind; c: string; ank: boolean }) {
  const fab = ank ? artMat(c) : mat(c, 0.92);
  const hanger = <Gb p={[0, -0.05, 0]} s={[0.34, 0.012, 0.012]} c={WOOD} />;
  switch (kind) {
    case "shirt":
      return (
        <>
          {hanger}
          <Gb p={[0, -0.5, 0]} s={[0.3, 0.46, 0.035]} m={fab} />
          {[-1, 1].map((s) => (
            <Gb key={s} p={[s * 0.19, -0.34, 0]} s={[0.09, 0.26, 0.035]} m={fab} rot={[0, 0, s * 0.3]} />
          ))}
        </>
      );
    case "dress":
      return (
        <>
          {hanger}
          <Gb p={[0, -0.34, 0]} s={[0.22, 0.3, 0.03]} m={fab} />
          {/* a cone squashed flat so it reads as a flared skirt on a hanger */}
          <group position={[0, -0.9, 0]} scale={[1, 1, 0.22]}>
            <Gc r={0.2} r2={0.09} h={0.62} m={fab} seg={14} />
          </group>
        </>
      );
    case "jacket":
      return (
        <>
          {hanger}
          <Gb p={[0, -0.64, 0]} s={[0.34, 0.6, 0.06]} m={fab} />
          <Gb p={[0, -0.5, 0.032]} s={[0.1, 0.44, 0.008]} c="#f1ece0" />
          {[-1, 1].map((s) => (
            <Gb key={s} p={[s * 0.205, -0.58, 0]} s={[0.085, 0.5, 0.06]} m={fab} rot={[0, 0, s * 0.1]} />
          ))}
        </>
      );
    case "kaftan":
      return (
        <>
          {hanger}
          <Gb p={[0, -1.0, 0]} s={[0.36, 0.96, 0.035]} m={fab} />
          {[-1, 1].map((s) => (
            <Gb key={s} p={[s * 0.2, -0.46, 0]} s={[0.12, 0.4, 0.035]} m={fab} rot={[0, 0, s * 0.35]} />
          ))}
          <Gb p={[0, -0.34, 0.02]} s={[0.1, 0.26, 0.006]} m={GOLD} />
        </>
      );
    default:
      return (
        <>
          {hanger}
          <group position={[0, -0.84, 0]} scale={[1, 1, 0.22]}>
            <Gc r={0.2} r2={0.12} h={0.76} m={fab} seg={14} />
          </group>
        </>
      );
  }
}

function ClothesRail({ item, W, D }: BodyProps) {
  const s0 = seedOf(item);
  const n = Math.max(4, Math.round((W - 0.2) / 0.15));
  const x0 = -(W / 2 - 0.2);
  const pitch = (W - 0.4) / (n - 1);
  const ex = W / 2 - 0.06;
  return (
    <>
      {/* chrome frame: feet, four posts, end bars, two hanging rails */}
      {[-1, 1].map((s) => (
        <Bx key={`f${s}`} p={[s * ex, 0, 0]} s={[0.05, 0.035, D - 0.08]} c={METAL} r={0.35} />
      ))}
      {[-1, 1].flatMap((sx) =>
        [-1, 1].map((sz) => <Cy key={`p${sx}${sz}`} p={[sx * ex, 0.03, sz * 0.15]} r={0.014} h={1.42} c={METAL} seg={8} rough={0.3} />),
      )}
      {[-1, 1].map((s) => (
        <Bx key={`e${s}`} p={[s * ex, 1.45, 0]} s={[0.035, 0.03, 0.34]} c={METAL} r={0.35} />
      ))}
      {[-1, 1].map((s) => (
        <Rod key={`r${s}`} p={[0, 1.455, s * 0.15]} len={W - 0.12} r={0.012} axis="x" rough={0.3} />
      ))}
      {/* sale roundel on a post over a cross bar */}
      <Bx p={[0, 1.44, 0]} s={[0.02, 0.02, 0.3]} c={METAL} r={0.35} />
      <Gc p={[0, 1.46, 0]} r={0.006} h={0.14} c={METAL} />
      <Rod p={[0, 1.62, 0]} len={0.014} r={0.085} axis="z" c="#d94a3a" seg={18} />
      <Rod p={[0, 1.62, 0.009]} len={0.01} r={0.05} axis="z" c="#facc15" seg={18} />
      {[-1, 1].flatMap((side) =>
        Array.from({ length: n }).map((_, i) => {
          const k = s0 * 17 + i * 3 + (side + 1) * 29;
          const kind = pick(GARMENT_KINDS, k);
          const ank = kind === "kaftan" || kind === "wrap" || rnd(k + 2) < 0.4;
          const col = kind === "jacket" ? pick(JACKETS, k + 1) : ank ? pick(ANKARA, k + 1) : pick(PAL, k + 1);
          // hung nearly edge-on, like a real rail, so each garment shows a slice of its face
          return (
            <group key={`${side}${i}`} position={[x0 + i * pitch, 1.44, side * 0.15]} rotation={[0, 1.15 + rnd(k + 3) * 0.2, 0]}>
              <Garment kind={kind} c={col} ank={ank} />
            </group>
          );
        }),
      )}
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * foldedshelf: a wall unit of five shelves of jeans, tees, ankara wraps, polos and towels
 * ------------------------------------------------------------------------------------------- */

function FoldedShelf({ item, W, D, H, c }: BodyProps) {
  const s0 = seedOf(item);
  const n = Math.max(2, Math.round((W - 0.1) / 0.32));
  const pw = (W - 0.12) / n;
  const ys = [0, 1, 2, 3, 4].map((k) => 0.1 + (k * (H - 0.45)) / 4);
  return (
    <>
      <Bx p={[0, 0, -D / 2 + 0.015]} s={[W, H, 0.03]} c="#e0d6c3" />
      {[-1, 1].map((s) => (
        <Bx key={s} p={[s * (W / 2 - 0.02), 0, 0]} s={[0.04, H, D]} c="#c9b48e" />
      ))}
      <Bx p={[0, 0, 0]} s={[W - 0.04, 0.07, D - 0.02]} c={DARK} />
      <Bx p={[0, H - 0.05, 0]} s={[W, 0.05, D]} c={c} />
      {ys.map((y, k) => {
        const set = FOLD_SETS[at(FOLD_ORDER, k + s0)];
        return (
          <group key={k}>
            <Bx p={[0, y, 0]} s={[W - 0.08, 0.03, D - 0.04]} c={WHITE} r={0.6} />
            <Tags w={W - 0.3} y={y - 0.002} z={D / 2 - 0.014} k={s0 + k} n={1} />
            {Array.from({ length: n }).map((_, j) => {
              const key = s0 * 13 + k * 7 + j;
              const layers = 2 + (rnd(key) > 0.5 ? 1 : 0);
              return (
                <Pile
                  key={j}
                  p={[-W / 2 + 0.06 + pw * (j + 0.5), y + 0.03, -0.02]}
                  w={pw - 0.04}
                  d={D - 0.14}
                  layers={layers}
                  lh={set.lh}
                  c={pick(set.cols, key + 1)}
                  c2={pick(set.cols, key + 2)}
                  ank={set.ank}
                  k={key}
                />
              );
            })}
          </group>
        );
      })}
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * shoes: sneakers, heels, loafers, sandals and boots, laid out in pairs
 * ------------------------------------------------------------------------------------------- */

type ShoeKind = "sneaker" | "heel" | "loafer" | "sandal" | "boot";
const SHOE_COLS: Record<ShoeKind, string[]> = {
  sneaker: ["#f4f1e8", "#d94a3a", "#2f3b82", "#111827", "#f59e0b", "#1f9d55"],
  heel: ["#d94a3a", "#111827", "#e0b038", "#e8c9a0", "#7c3aed", "#e85d9a"],
  loafer: ["#5a3a24", "#111827", "#8a5a3c", "#7f1d1d"],
  sandal: ["#e0b038", "#d94a3a", "#2f8f83", "#e8c9a0"],
  boot: ["#111827", "#5a3a24", "#8a5a3c", "#6b4a2f"],
};
const SHOE_KINDS: ShoeKind[] = ["sneaker", "heel", "loafer", "sandal", "boot"];

/** one shoe lying flat with its toe towards +z, centred on x */
function Shoe({ kind, c, x }: { kind: ShoeKind; c: string; x: number }) {
  switch (kind) {
    case "sneaker":
      return (
        <group position={[x, 0, 0]}>
          <Gb s={[0.095, 0.03, 0.27]} c="#f4f1e8" r={0.5} />
          <Gb p={[0, 0.03, -0.035]} s={[0.085, 0.07, 0.19]} c={c} r={0.6} />
        </group>
      );
    case "heel":
      return (
        <group position={[x, 0, 0]}>
          {/* the sole is pitched toe-down and the heel is a thin post under the back */}
          <group position={[0, 0.05, 0]} rotation={[0.4, 0, 0]}>
            <Gb s={[0.07, 0.012, 0.25]} c={c} r={0.35} />
            <Gb p={[0, 0.012, -0.04]} s={[0.065, 0.05, 0.14]} c={c} r={0.35} />
          </group>
          <Gc p={[0, 0, -0.1]} r={0.009} h={0.09} c={c} rough={0.35} />
        </group>
      );
    case "loafer":
      return (
        <group position={[x, 0, 0]}>
          <Gb s={[0.088, 0.018, 0.27]} c="#1a1210" />
          <Gb p={[0, 0.018, -0.015]} s={[0.082, 0.055, 0.235]} c={c} r={0.45} />
        </group>
      );
    case "sandal":
      return (
        <group position={[x, 0, 0]}>
          <Gb s={[0.085, 0.02, 0.265]} c="#c9a37a" />
          <Gb p={[0, 0.02, 0.03]} s={[0.09, 0.03, 0.11]} c={c} r={0.5} />
        </group>
      );
    default:
      return (
        <group position={[x, 0, 0]}>
          <Gb s={[0.098, 0.025, 0.275]} c="#1a1210" />
          <Gb p={[0, 0.025, 0.02]} s={[0.09, 0.075, 0.225]} c={c} r={0.55} />
          <Gb p={[0, 0.025, -0.075]} s={[0.092, 0.22, 0.1]} c={c} r={0.55} />
        </group>
      );
  }
}

function Pair({ kind, c, p, rotY = 0 }: { kind: ShoeKind; c: string; p: V3; rotY?: number }) {
  return (
    <group position={p} rotation={[0, rotY, 0]}>
      <Shoe kind={kind} c={c} x={-0.062} />
      <Shoe kind={kind} c={c} x={0.062} />
    </group>
  );
}

/* ---------------------------------------------------------------------------------------------
 * shoeshelf: four tiers of shoe pairs with a price strip on every shelf edge and a lit header
 * ------------------------------------------------------------------------------------------- */

const TIER_KINDS: ShoeKind[][] = [
  ["boot", "loafer", "boot"],
  ["sneaker", "sneaker", "loafer"],
  ["heel", "heel", "sandal"],
  ["sandal", "sneaker", "heel"],
];

function ShoeShelf({ item, W, D, H, c }: BodyProps) {
  const s0 = seedOf(item);
  const ys = [0.1, 0.5, 0.9, 1.3];
  const n = Math.max(3, Math.round((W - 0.2) / 0.28));
  return (
    <>
      <Bx p={[0, 0, -D / 2 + 0.015]} s={[W, H, 0.03]} c="#e6dcc8" />
      {[-1, 1].map((s) => (
        <Bx key={s} p={[s * (W / 2 - 0.02), 0, 0]} s={[0.04, H, D]} c={DARK} />
      ))}
      {ys.map((y, k) => (
        <group key={k}>
          <Bx p={[0, y, 0]} s={[W - 0.08, 0.03, D - 0.04]} c="#cdb88f" r={0.6} />
          <Tags w={W - 0.3} y={y - 0.002} z={D / 2 - 0.014} k={s0 + k} n={1} />
          {/* the boot and heel tiers hold one pair fewer: those shoes cost more meshes to draw */}
          {Array.from({ length: k % 2 ? n : n - 1 }).map((_, j, row) => {
            const key = s0 * 31 + k * 11 + j;
            const kind = pick(TIER_KINDS[k], key);
            const pitch = (W - 0.16) / row.length;
            return <Pair key={j} kind={kind} c={pick(SHOE_COLS[kind], key + 1)} p={[-W / 2 + 0.08 + (j + 0.5) * pitch, y + 0.03, 0.02]} rotY={(rnd(key + 2) - 0.5) * 0.25} />;
          })}
        </group>
      ))}
      <Bx p={[0, H - 0.1, 0]} s={[W, 0.1, D]} c={c} />
      <Gb p={[0, H - 0.115, D / 2 - 0.05]} s={[W - 0.2, 0.02, 0.025]} m={litMat("#fff3d0", 1.3, "#d6cdb4")} />
    </>
  );
}

/* ---- bags, bottles and gadgets: small things shared by several displays ---- */

/** a handbag standing on p: tote, satchel or clutch depending on k */
function Handbag({ p, c, c2, k }: { p: V3; c: string; c2: string; k: number }) {
  const shape = Math.floor(rnd(k) * 3);
  return (
    <group position={p} rotation={[0, (rnd(k + 5) - 0.5) * 0.5, 0]}>
      {shape === 0 && (
        <>
          <Gb s={[0.26, 0.2, 0.1]} c={c} r={0.55} />
          <Gb p={[0, 0.1, 0]} s={[0.264, 0.05, 0.104]} c={c2} r={0.55} />
          <Ring p={[0, 0.2, 0]} r={0.07} t={0.008} arc={Math.PI} c={c2} />
        </>
      )}
      {shape === 1 && (
        <>
          <Gb s={[0.24, 0.15, 0.09]} c={c} r={0.5} />
          <Gb p={[0, 0.11, 0]} s={[0.245, 0.055, 0.094]} c={c2} r={0.5} />
          <Gb p={[0, 0.08, 0.047]} s={[0.04, 0.045, 0.008]} m={GOLD} />
          <Ring p={[0, 0.15, 0]} r={0.075} t={0.007} arc={Math.PI} c={c} />
        </>
      )}
      {shape === 2 && (
        <>
          <Gb s={[0.26, 0.13, 0.04]} c={c} r={0.4} rot={[-0.12, 0, 0]} />
          <Gb p={[0, 0.09, 0]} s={[0.262, 0.05, 0.042]} c={c2} r={0.4} rot={[-0.12, 0, 0]} />
          <Gb p={[0, 0.07, 0.024]} s={[0.04, 0.04, 0.008]} m={GOLD} />
        </>
      )}
    </group>
  );
}

/** a rucksack standing (or hanging, from its top handle) at p */
function Backpack({ p, c, c2 }: { p: V3; c: string; c2: string }) {
  return (
    <group position={p}>
      <Gb s={[0.28, 0.38, 0.12]} c={c} r={0.7} />
      <Gb p={[0, 0.04, 0.065]} s={[0.2, 0.15, 0.04]} c={c2} r={0.7} />
      <Ring p={[0, 0.38, 0]} r={0.04} t={0.007} arc={Math.PI} c="#111827" />
    </group>
  );
}

/** a perfume bottle or boxed flacon, 0.13-0.25 m tall; the shape follows k */
function Bottle({ p, c, k, sc = 1 }: { p: V3; c: string; k: number; sc?: number }) {
  const shape = Math.floor(rnd(k) * 4);
  return (
    <group position={p} scale={sc}>
      {shape === 0 && (
        <>
          <Gc r={0.032} h={0.13} c={c} rough={0.2} />
          <Gc p={[0, 0.13, 0]} r={0.02} h={0.04} m={GOLD} />
        </>
      )}
      {shape === 1 && (
        <>
          <Gb s={[0.075, 0.12, 0.045]} c={c} r={0.2} />
          <Gb p={[0, 0.12, 0]} s={[0.04, 0.045, 0.03]} c="#111827" />
        </>
      )}
      {shape === 2 && (
        <>
          <Gs p={[0, 0.055, 0]} r={0.05} c={c} sc={[1, 1.05, 0.75]} rough={0.2} />
          <Gc p={[0, 0.1, 0]} r={0.018} h={0.055} m={SILVER} />
        </>
      )}
      {shape === 3 && (
        <>
          <Gc r={0.022} h={0.2} c={c} rough={0.2} />
          <Gc p={[0, 0.2, 0]} r={0.015} h={0.04} c="#111827" />
        </>
      )}
    </group>
  );
}

/** a phone leaning on a little stand, its screen lit in a colour set by k */
function Phone({ p, k, rotY = 0 }: { p: V3; k: number; rotY?: number }) {
  return (
    <group position={p} rotation={[0, rotY, 0]}>
      <Gb s={[0.08, 0.03, 0.07]} c="#d1d5db" />
      <group position={[0, 0.03, 0]} rotation={[-0.28, 0, 0]}>
        <Gb s={[0.072, 0.145, 0.009]} c="#111827" r={0.3} />
        <Gb p={[0, 0.008, 0.0052]} s={[0.064, 0.128, 0.002]} m={litMat(at(SCREENS, k), 1.0, "#0b0d12")} />
      </group>
    </group>
  );
}

function Laptop({ p, k }: { p: V3; k: number }) {
  return (
    <group position={p}>
      <Gb s={[0.3, 0.018, 0.2]} c="#9ca3af" r={0.4} />
      <group position={[0, 0.018, -0.09]} rotation={[-0.22, 0, 0]}>
        <Gb s={[0.3, 0.2, 0.012]} c="#9ca3af" r={0.4} />
        <Gb p={[0, 0.012, 0.0065]} s={[0.27, 0.17, 0.003]} m={litMat(at(SCREENS, k), 1.0, "#0b0d12")} />
      </group>
    </group>
  );
}

/* ---------------------------------------------------------------------------------------------
 * displaytable: a floor table whose goods follow item.variant (default "folded")
 * ------------------------------------------------------------------------------------------- */

const TABLE_TOP = 0.79;

function TableBase({ W, D, c }: { W: number; D: number; c: string }) {
  return (
    <>
      <Bx s={[W - 0.12, 0.74, D - 0.12]} c={DARK} />
      <Bx p={[0, 0.7, 0]} s={[W + 0.01, 0.04, D + 0.01]} c={c} r={0.7} />
      <Bx p={[0, 0.74, 0]} s={[W, 0.05, D]} c="#f2ede1" r={0.5} />
    </>
  );
}

/** pairs on two risers with a lit edge, and two spot lamps on slim poles */
function TableShoes({ f, s0 }: { f: number; s0: number }) {
  const T = TABLE_TOP;
  const slots: V3[] = [
    [-0.36, T + 0.16, -0.35], [0, T + 0.16, -0.35], [0.36, T + 0.16, -0.35],
    [-0.2, T + 0.08, 0], [0.2, T + 0.08, 0],
    [-0.3, T, 0.32], [0.3, T, 0.32],
  ];
  const spot = litMat("#fff3d0", 1.5, "#d6cdb4");
  return (
    <>
      <Gb p={[0, T, -0.35]} s={[1.0 * f, 0.16, 0.3]} c="#f8fafc" r={0.4} />
      <Gb p={[0, T, 0]} s={[1.0 * f, 0.08, 0.32]} c="#e5e7eb" r={0.4} />
      <Gb p={[0, T + 0.13, -0.195]} s={[0.96 * f, 0.02, 0.01]} m={spot} />
      <Gb p={[0, T + 0.05, 0.165]} s={[0.96 * f, 0.02, 0.01]} m={spot} />
      {slots.map((sl, i) => {
        const key = s0 * 5 + i;
        const kind = pick(SHOE_KINDS, key);
        return <Pair key={i} kind={kind} c={pick(SHOE_COLS[kind], key + 1)} p={[sl[0] * f, sl[1], sl[2]]} rotY={(rnd(key + 2) - 0.5) * 0.4} />;
      })}
      {[-1, 1].map((s) => (
        <group key={s}>
          <Gc p={[s * 0.52 * f, T, -0.5]} r={0.008} h={0.5} c={METAL} />
          <Gb p={[s * 0.52 * f, T + 0.5, -0.5]} s={[0.08, 0.04, 0.05]} m={spot} rot={[0.5, 0, 0]} />
        </group>
      ))}
    </>
  );
}

function TableBags({ f, s0 }: { f: number; s0: number }) {
  const T = TABLE_TOP;
  return (
    <>
      <Gb p={[0, T, -0.32]} s={[1.0 * f, 0.14, 0.34]} c="#f8fafc" r={0.4} />
      {[-0.36, 0, 0.36].map((x, i) => (
        <Handbag key={`b${i}`} p={[x * f, T + 0.14, -0.32]} c={at(BAG_COLS, s0 + i * 2)} c2={at(BAG_COLS, s0 + i * 2 + 4)} k={s0 + i} />
      ))}
      {[-0.28, 0.1].map((x, i) => (
        <Handbag key={`f${i}`} p={[x * f, T, 0.2]} c={at(BAG_COLS, s0 + i * 3 + 1)} c2={at(BAG_COLS, s0 + i * 3 + 6)} k={s0 + i + 7} />
      ))}
      <Backpack p={[0.42 * f, T, 0.22]} c={at(BAG_COLS, s0 + 3)} c2={at(BAG_COLS, s0 + 8)} />
    </>
  );
}

function TableFolded({ f, s0 }: { f: number; s0: number }) {
  const T = TABLE_TOP;
  return (
    <>
      {([[-0.3, -0.28], [0.3, -0.28], [-0.3, 0.28], [0.3, 0.28]] as const).map(([x, z], i) => {
        const set = FOLD_SETS[at(FOLD_ORDER, s0 + i * 2)];
        const key = s0 * 9 + i;
        return <Pile key={i} p={[x * f, T, z]} w={0.42} d={0.4} layers={4} lh={set.lh} c={pick(set.cols, key)} c2={pick(set.cols, key + 1)} ank={set.ank} k={key} />;
      })}
      {/* a tent card between the piles */}
      <Gb p={[0, T, 0]} s={[0.2, 0.12, 0.012]} c="#f8fafc" rot={[-0.2, 0, 0]} />
      <Gb p={[0, T + 0.07, 0.004]} s={[0.2, 0.05, 0.014]} c="#d94a3a" rot={[-0.2, 0, 0]} />
    </>
  );
}

/** a jeweller-style case: watches on velvet cushions under a glass top with an LED strip */
function TableWatches({ W, D, s0 }: { W: number; D: number; s0: number }) {
  const cush = ["#5b1224", "#1e2a5a", "#111827"];
  const rim = "#2a1e1a";
  return (
    <>
      <Bx s={[W, 0.58, D]} c={rim} r={0.5} />
      <Gb p={[0, 0.58, 0]} s={[W - 0.12, 0.02, D - 0.12]} m={litMat("#ffb24a", 0.35, "#4a1020")} />
      <Gb p={[0, 0.6, 0]} s={[W - 0.04, 0.19, D - 0.04]} m={glass} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Bx p={[0, 0.78, s * (D / 2 - 0.02)]} s={[W, 0.03, 0.04]} c={rim} r={0.5} />
          <Bx p={[s * (W / 2 - 0.02), 0.78, 0]} s={[0.04, 0.03, D - 0.08]} c={rim} r={0.5} />
          <Gb p={[0, 0.765, s * (D / 2 - 0.09)]} s={[W - 0.24, 0.012, 0.02]} m={litMat("#fff2cc", 1.6, "#d8cfb8")} />
        </group>
      ))}
      {[-0.35, 0, 0.35].flatMap((x, i) =>
        [-0.22, 0.2].map((z, j) => {
          const key = s0 * 7 + i * 2 + j;
          return (
            <group key={`${i}${j}`}>
              <Gb p={[x, 0.62, z]} s={[0.17, 0.045, 0.15]} c={at(cush, i + j)} r={0.95} />
              <Ring p={[x, 0.7, z]} r={0.05} t={0.013} rot={[Math.PI / 2, 0, 0]} c={pick(["#111827", "#5a3a24", "#d94a3a", "#e0b038"], key)} />
              <Gc p={[x, 0.69, z]} r={0.04} h={0.014} m={rnd(key + 3) > 0.5 ? GOLD : SILVER} seg={16} />
            </group>
          );
        }),
      )}
    </>
  );
}

/** two rows of phones with lit screens on a stepped stand, plus a tablet and accessory boxes in front */
function TablePhones({ f, s0 }: { f: number; s0: number }) {
  const T = TABLE_TOP;
  return (
    <>
      <Gb p={[0, T, -0.32]} s={[1.0 * f, 0.1, 0.3]} c="#e5e7eb" r={0.4} />
      {[-2, -1, 0, 1, 2].map((i) => (
        <group key={i}>
          <Phone p={[i * 0.2 * f, T + 0.1, -0.32]} k={s0 + i + 2} />
          <Phone p={[i * 0.2 * f, T, 0.0]} k={s0 + i + 9} />
        </group>
      ))}
      <group position={[-0.3 * f, T, 0.33]} rotation={[-0.35, 0, 0]}>
        <Gb s={[0.26, 0.18, 0.012]} c="#111827" r={0.3} />
        <Gb p={[0, 0.012, 0.0065]} s={[0.23, 0.15, 0.003]} m={litMat(at(SCREENS, s0 + 4), 1.0, "#0b0d12")} />
      </group>
      {[0.05, 0.22, 0.4].map((x, i) => (
        <Gb key={i} p={[x * f, T, 0.33]} s={[0.12, 0.035, 0.08]} c={at(BRIGHT, s0 + i * 3)} r={0.5} />
      ))}
    </>
  );
}

/** bottles on a mirrored three-step pyramid with a tall hero bottle at the top */
function TablePerfume({ f, s0 }: { f: number; s0: number }) {
  const T = TABLE_TOP;
  const cols = ["#e85d9a", "#d89b3c", "#38bdf8", "#7c3aed", "#1f9d55", "#f0e8d6", "#8a2f3c", "#2dd4bf"];
  const ring: Array<[number, number]> = [[-0.32, -0.32], [0, -0.34], [0.32, -0.32], [-0.34, 0], [0.34, 0], [-0.32, 0.32], [0, 0.34], [0.32, 0.32]];
  return (
    <>
      <Gb p={[0, T, 0]} s={[0.92 * f, 0.08, 0.92]} m={MIRROR} />
      <Gb p={[0, T + 0.08, 0]} s={[0.58 * f, 0.08, 0.58]} c="#f8fafc" r={0.4} />
      <Gb p={[0, T + 0.16, 0]} s={[0.28 * f, 0.08, 0.28]} c="#e5e7eb" r={0.4} />
      <Gb p={[0, T + 0.065, 0.46]} s={[0.9 * f, 0.012, 0.012]} m={litMat("#fff3d0", 1.4, "#e5e7eb")} />
      {ring.map(([x, z], i) => (
        <Bottle key={i} p={[x * f, T + 0.08, z]} c={at(cols, s0 + i)} k={s0 * 3 + i} />
      ))}
      {([[-0.14, -0.14], [0.14, -0.14], [-0.14, 0.14], [0.14, 0.14]] as const).map(([x, z], i) => (
        <Bottle key={`m${i}`} p={[x * f, T + 0.16, z]} c={at(cols, s0 + i + 3)} k={s0 * 5 + i} sc={1.1} />
      ))}
      <Bottle p={[0, T + 0.24, 0]} c="#e0b038" k={s0 + 1} sc={1.5} />
    </>
  );
}

function DisplayTable({ item, W, D, c }: BodyProps) {
  const v = item.variant ?? "folded";
  const s0 = seedOf(item);
  const f = W / 1.2;
  if (v === "watches") return <TableWatches W={W} D={D} s0={s0} />;
  return (
    <>
      <TableBase W={W} D={D} c={c} />
      {v === "shoes" && <TableShoes f={f} s0={s0} />}
      {v === "bags" && <TableBags f={f} s0={s0} />}
      {v === "phones" && <TablePhones f={f} s0={s0} />}
      {v === "perfume" && <TablePerfume f={f} s0={s0} />}
      {!["shoes", "bags", "phones", "perfume"].includes(v) && <TableFolded f={f} s0={s0} />}
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * bagwall: a wall unit of suitcases, a Ghana-must-go, duffels and handbags, with rucksacks on pegs
 * ------------------------------------------------------------------------------------------- */

/** the red, white and blue woven zip bag every Nigerian knows */
function GhanaMustGo({ p }: { p: V3 }) {
  return (
    <group position={p}>
      <Gb s={[0.5, 0.4, 0.17]} c="#f4f1e8" />
      {[-0.17, -0.057, 0.057, 0.17].map((dx) => (
        <Gb key={dx} p={[dx, 0, 0.0865]} s={[0.04, 0.4, 0.004]} c="#d94a3a" />
      ))}
      {[0.08, 0.26].map((hy) => (
        <Gb key={hy} p={[0, hy, 0.0875]} s={[0.5, 0.045, 0.004]} c="#2f3b82" />
      ))}
      <Gb p={[0, 0.4, 0]} s={[0.22, 0.025, 0.05]} c="#111827" />
    </group>
  );
}

function BagWall({ item, W, D, H, c, c2 }: BodyProps) {
  const s0 = seedOf(item);
  const f = W / 1.8;
  const ys = [0.14, 0.6, 1.06];
  const nb = Math.max(3, Math.round((W - 0.2) / 0.32));
  const pitch = (W - 0.2) / nb;
  const bx = (j: number) => -W / 2 + 0.1 + (j + 0.5) * pitch;
  const y0 = ys[0] + 0.03;
  return (
    <>
      <Bx p={[0, 0, -D / 2 + 0.02]} s={[W, H, 0.04]} c="#d8ccb4" />
      {[-1, 1].map((s) => (
        <Bx key={s} p={[s * (W / 2 - 0.02), 0, 0]} s={[0.04, H, D]} c={DARK} />
      ))}
      <Bx s={[W - 0.04, 0.08, D - 0.02]} c={DARK} />
      <Bx p={[0, H - 0.12, 0]} s={[W, 0.12, D]} c={c} />
      {ys.map((y) => (
        <Bx key={y} p={[0, y, 0]} s={[W - 0.08, 0.03, D - 0.04]} c="#6b4a2f" r={0.6} />
      ))}
      {/* bottom shelf: travel bags */}
      <group position={[-0.62 * f, y0, 0]}>
        <Gb s={[0.34, 0.46, 0.18]} c={c} r={0.4} />
        <Gb p={[0, 0.2, 0]} s={[0.345, 0.03, 0.185]} c={c2} />
        <Gb p={[0, 0.46, 0]} s={[0.12, 0.03, 0.04]} c="#111827" />
      </group>
      <GhanaMustGo p={[-0.1 * f, y0, 0]} />
      <group position={[0.46 * f, y0, 0]}>
        <Rod p={[0, 0.11, 0]} len={0.48} r={0.11} c={at(BAG_COLS, s0 + 1)} rough={0.7} seg={14} />
        <Rod p={[0, 0.11, 0]} len={0.1} r={0.113} c={at(BAG_COLS, s0 + 5)} rough={0.7} seg={14} />
        <Ring p={[0, 0.21, 0]} r={0.08} t={0.01} arc={Math.PI} c="#111827" />
      </group>
      <Backpack p={[0.76 * f, y0, 0]} c={at(BAG_COLS, s0 + 2)} c2={at(BAG_COLS, s0 + 6)} />
      {/* middle and top shelves: handbags */}
      {[1, 2].flatMap((row) =>
        Array.from({ length: nb }).map((_, j) => {
          const key = s0 * 11 + row * 17 + j;
          return <Handbag key={`${row}${j}`} p={[bx(j), ys[row] + 0.03, 0]} c={pick(BAG_COLS, key)} c2={pick(BAG_COLS, key + 1)} k={key} />;
        }),
      )}
      {/* rucksacks hanging from pegs above the top shelf */}
      {[-0.66, -0.22, 0.22, 0.66].map((x, i) => (
        <group key={i}>
          <Rod p={[x * f, 1.86, -D / 2 + 0.08]} len={0.08} r={0.008} axis="z" />
          <Backpack p={[x * f, 1.47, -D / 2 + 0.1]} c={at(BAG_COLS, s0 + i * 2 + 3)} c2={at(BAG_COLS, s0 + i * 2 + 7)} />
        </group>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * jewelrycase: a glass-top jeweller counter, lit from inside, with chains, rings, watches and coral beads
 * ------------------------------------------------------------------------------------------- */

function JewelryCase({ W, D, H }: BodyProps) {
  const base = 0.76;
  const y0 = base + 0.052; // top of the velvet
  const flat: V3 = [Math.PI / 2, 0, 0];
  const led = litMat("#fff2cc", 1.6, "#d8cfb8");
  return (
    <>
      <Bx s={[W, base, D]} c="#2b1d17" r={0.5} />
      {[0.12, 0.62].map((y) => (
        <Gb key={y} p={[0, y, D / 2 + 0.004]} s={[W - 0.2, 0.012, 0.008]} m={GOLD} />
      ))}
      <Bx p={[0, base, 0]} s={[W + 0.02, 0.04, D + 0.02]} m={GOLD} />
      {/* velvet bed glows warm from below the glass; strips under the lid light it from above */}
      <Gb p={[0, base + 0.04, 0]} s={[W - 0.1, 0.012, D - 0.1]} m={litMat("#ffb24a", 0.4, "#6b1d2a")} />
      <Gb p={[0, base + 0.04, 0]} s={[W - 0.04, H - base - 0.04, D - 0.04]} m={glass} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Gb p={[0, H - 0.02, s * (D / 2 - 0.02)]} s={[W, 0.02, 0.02]} m={GOLD} />
          <Gb p={[0, H - 0.05, s * (D / 2 - 0.07)]} s={[W - 0.2, 0.01, 0.02]} m={led} />
        </group>
      ))}
      {/* two necklaces: gold chains with a gold pendant, silver with a blue stone */}
      {[-0.42, 0.42].map((x, i) => (
        <group key={x}>
          <Ring p={[x, y0 + 0.006, 0]} r={0.12} t={0.006} rot={flat} m={i ? SILVER : GOLD} />
          <Ring p={[x, y0 + 0.006, 0]} r={0.09} t={0.006} rot={flat} m={i ? SILVER : GOLD} />
          <Gs p={[x, y0 + 0.014, 0.12]} r={0.017} m={i ? undefined : GOLD} c={i ? "#38bdf8" : undefined} rough={0.2} />
        </group>
      ))}
      {/* a strand of coral beads, as worn to every Yoruba wedding */}
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 8) * Math.PI;
        return <Gs key={i} p={[Math.cos(a) * 0.17, y0 + 0.016, 0.07 - Math.sin(a) * 0.14]} r={0.016} c={i % 4 === 2 ? "#f0e8d6" : "#d94a3a"} rough={0.35} />;
      })}
      {/* rings on cushions */}
      {[-0.28, -0.1, 0.1, 0.28].slice(0, 3).map((x, i) => (
        <group key={x}>
          <Gb p={[x, y0, 0.18]} s={[0.05, 0.03, 0.05]} c="#111827" />
          <Ring p={[x, y0 + 0.047, 0.18]} r={0.017} t={0.005} m={GOLD} />
          <Gs p={[x, y0 + 0.068, 0.18]} r={0.011} c={at(["#e85d9a", "#38bdf8", "#22c55e"], i)} rough={0.2} />
        </group>
      ))}
      {/* two watches and a stack of bangles */}
      {[-0.2, 0.2].map((x, i) => (
        <group key={x}>
          <Ring p={[x, y0 + 0.01, -0.15]} r={0.032} t={0.01} rot={flat} c={i ? "#5a3a24" : "#111827"} />
          <Gc p={[x, y0 + 0.004, -0.15]} r={0.026} h={0.012} m={i ? SILVER : GOLD} seg={16} />
        </group>
      ))}
      {[0, 0.018].map((dy) => (
        <Ring key={dy} p={[0, y0 + 0.01 + dy, -0.17]} r={0.04} t={0.007} rot={flat} m={GOLD} />
      ))}
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * perfumeshelf: boutique shelves of perfume bottles over a row of boxed cosmetics, with a mirror band
 * ------------------------------------------------------------------------------------------- */

function PerfumeShelf({ item, W, D, H }: BodyProps) {
  const s0 = seedOf(item);
  const ys = [0.14, 0.54, 0.92, 1.3];
  const n = Math.max(4, Math.round((W - 0.2) / 0.15));
  const pitch = (W - 0.16) / n;
  const cols = ["#e85d9a", "#d89b3c", "#38bdf8", "#7c3aed", "#1f9d55", "#f0e8d6", "#8a2f3c", "#f59e0b", "#2dd4bf"];
  const boxes = ["#e85d9a", "#f0e8d6", "#111827", "#7c3aed", "#d94a3a", "#2dd4bf", "#e0b038"];
  const led = litMat("#fff1c8", 1.3, "#d9d2bd");
  return (
    <>
      <Bx p={[0, 0, -D / 2 + 0.015]} s={[W, H, 0.03]} c="#241b2c" />
      <Gb p={[0, 1.5, -D / 2 + 0.032]} s={[W - 0.16, 0.24, 0.01]} m={MIRROR} />
      {[-1, 1].map((s) => (
        <Bx key={s} p={[s * (W / 2 - 0.02), 0, 0]} s={[0.04, H, D]} c="#2f2538" />
      ))}
      <Bx p={[0, H - 0.05, 0]} s={[W, 0.05, D]} c="#2f2538" />
      {ys.map((y, k) => (
        <group key={k}>
          <Bx p={[0, y, 0]} s={[W - 0.08, 0.03, D - 0.04]} c="#3a2f45" r={0.4} />
          {Array.from({ length: n }).map((_, j) => {
            const x = -W / 2 + 0.08 + (j + 0.5) * pitch;
            const key = s0 * 19 + k * 13 + j;
            if (k === 0) {
              // boxed cosmetics: palettes, creams and lipsticks, each with a gold band
              const bh = 0.11 + rnd(key) * 0.05;
              return (
                <group key={j}>
                  <Gb p={[x, y + 0.03, 0]} s={[pitch * 0.7, bh, 0.05]} c={at(boxes, key + j)} r={0.45} />
                  <Gb p={[x, y + 0.03 + bh * 0.4, 0]} s={[pitch * 0.7 + 0.002, 0.02, 0.052]} m={GOLD} />
                </group>
              );
            }
            return <Bottle key={j} p={[x, y + 0.03, 0]} c={at(cols, key)} k={key} />;
          })}
        </group>
      ))}
      {/* LED strips under the upper shelves and the cap light the bottles below */}
      {[ys[1], ys[2], ys[3], H - 0.05].map((y) => (
        <Gb key={y} p={[0, y - 0.015, D / 2 - 0.07]} s={[W - 0.16, 0.012, 0.02]} m={led} />
      ))}
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * electronicswall: TVs and monitors with glowing screens, a shelf of speakers and radios, laptops, phones
 * ------------------------------------------------------------------------------------------- */

const SCREEN_COLS: Array<[string, string]> = [["#38bdf8", "#ef4444"], ["#f97316", "#fde047"], ["#22c55e", "#f8fafc"], ["#a855f7", "#f472b6"], ["#06b6d4", "#facc15"]];

/** a wall-mounted screen with a lit picture and a lit caption bar; every fourth uses the shared blue glow */
function Tv({ x, y, w, h, k }: { x: number; y: number; w: number; h: number; k: number }) {
  const [a, b] = at(SCREEN_COLS, k);
  return (
    <group position={[x, y, -0.09]}>
      <Gb s={[w, h, 0.04]} c="#0e0f12" r={0.3} />
      <Gb p={[0, 0.03, 0.0215]} s={[w - 0.06, h - 0.06, 0.005]} m={k % 4 === 3 ? glow.screen : litMat(a, 1.0, "#0b0d12")} />
      <Gb p={[-w * 0.12, 0.05, 0.025]} s={[w * 0.5, 0.035, 0.004]} m={litMat(b, 1.2, "#0b0d12")} />
    </group>
  );
}

/** a speaker tower: cabinet, woofer and tweeter */
function SpeakerTower({ p }: { p: V3 }) {
  return (
    <group position={p}>
      <Gb s={[0.16, 0.3, 0.12]} c="#16181d" r={0.5} />
      <Rod p={[0, 0.09, 0.062]} len={0.012} r={0.045} axis="z" c="#2d3139" seg={16} />
      <Rod p={[0, 0.23, 0.062]} len={0.012} r={0.02} axis="z" c="#4b5563" seg={12} />
    </group>
  );
}

function ElectronicsWall({ W, D, H }: BodyProps) {
  const f = W / 2.4;
  const shelfY = [0.06, 0.34, 0.62];
  const boxes = ["#2563eb", "#dc2626", "#f59e0b", "#16a34a", "#7c3aed"];
  return (
    <>
      <Bx p={[0, 0, -D / 2 + 0.02]} s={[W, H, 0.04]} c="#181a20" r={0.6} />
      {[-1, 1].map((s) => (
        <Bx key={s} p={[s * (W / 2 - 0.015), 0, 0]} s={[0.03, H, D]} c="#0f1115" r={0.5} />
      ))}
      {shelfY.map((y) => (
        <Bx key={y} p={[0, y, 0]} s={[W - 0.06, 0.03, D - 0.04]} c="#2b2e36" r={0.5} />
      ))}
      {/* light strips: a blue header and a violet glow along the floor */}
      <Gb p={[0, H - 0.1, -0.09]} s={[W - 0.1, 0.03, 0.02]} m={litMat("#60a5fa", 1.4, "#1e293b")} />
      <Gb p={[0, 0.02, D / 2 - 0.03]} s={[W - 0.1, 0.02, 0.02]} m={litMat("#a855f7", 1.2, "#2e1065")} />
      {/* screens: three big TVs over four monitors */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <Tv key={`t${i}`} x={x * f} y={1.4} w={0.74 * f} h={0.46} k={i} />
      ))}
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <Tv key={`m${i}`} x={x * f} y={0.96} w={0.52 * f} h={0.34} k={i + 3} />
      ))}
      {/* audio shelf: speaker towers, two radios and a soundbar */}
      <SpeakerTower p={[-1.0 * f, shelfY[2] + 0.03, 0]} />
      <SpeakerTower p={[1.0 * f, shelfY[2] + 0.03, 0]} />
      <group position={[-0.55 * f, shelfY[2] + 0.03, 0]}>
        <Gb s={[0.3, 0.17, 0.1]} c="#8a5a3c" r={0.6} />
        <Gb p={[-0.07, 0.025, 0.051]} s={[0.12, 0.12, 0.004]} c="#1f1a14" />
        <Gb p={[0.08, 0.1, 0.051]} s={[0.09, 0.035, 0.004]} m={litMat("#fbbf24", 1.2, "#6b5a2a")} />
        <Gc p={[0.172, 0.152, 0]} r={0.004} h={0.3} c={METAL} rot={[0, 0, -0.5]} />
      </group>
      <group position={[0, shelfY[2] + 0.03, 0]}>
        <Gb s={[0.6, 0.07, 0.09]} c="#0f1115" r={0.4} />
        <Gb p={[0.25, 0.035, 0.046]} s={[0.03, 0.012, 0.004]} m={litMat("#38bdf8", 1.4, "#0b0d12")} />
      </group>
      <group position={[0.55 * f, shelfY[2] + 0.03, 0]}>
        <Gb s={[0.34, 0.18, 0.1]} c="#c0392b" r={0.5} />
        {[-1, 1].map((s) => (
          <Rod key={s} p={[s * 0.09, 0.09, 0.052]} len={0.01} r={0.05} axis="z" c="#1f2228" seg={16} />
        ))}
        <Ring p={[0, 0.18, 0]} r={0.08} t={0.008} arc={Math.PI} c="#111827" />
      </group>
      {/* middle shelf: two open laptops and four phones on stands */}
      {[-0.85, -0.35].map((x, i) => (
        <Laptop key={i} p={[x * f, shelfY[1] + 0.03, 0]} k={i + 1} />
      ))}
      {[0.15, 0.4, 0.65, 0.9].map((x, i) => (
        <Phone key={i} p={[x * f, shelfY[1] + 0.03, 0.02]} k={i} />
      ))}
      {/* bottom shelf: boxed consoles and gadgets */}
      {boxes.map((col, i) => (
        <group key={i}>
          <Gb p={[(-0.95 + i * 0.45) * f, shelfY[0] + 0.03, 0]} s={[0.3, 0.2, 0.22]} c={col} r={0.5} />
          <Gb p={[(-0.95 + i * 0.45) * f, shelfY[0] + 0.1, 0.112]} s={[0.24, 0.06, 0.004]} c="#f8fafc" />
        </group>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * gondola: a supermarket aisle shelf stocked on both faces; item.variant = snacks | drinks | cereal | cans
 * ------------------------------------------------------------------------------------------- */

const DRINK_COLS = ["#2b1810", "#f59e0b", "#4ade80", "#9bd4e6", "#dc2626", "#facc15"];
const CARTON_COLS = ["#16a34a", "#f97316", "#e11d48", "#facc15", "#7c3aed"];
const CAN_COLS = ["#dc2626", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#0891b2"];

/** one row of product facings along a shelf; `side` is +1 for the front face and -1 for the back */
function Facings({ variant, n, W, y, z, side, k }: { variant: string; n: number; W: number; y: number; z: number; side: number; k: number }) {
  const pitch = (W - 0.14) / n;
  return (
    <>
      {Array.from({ length: n }).map((_, j) => {
        const key = k * 29 + j;
        const x = -W / 2 + 0.07 + (j + 0.5) * pitch;
        if (variant === "drinks") {
          const rad = Math.min(pitch * 0.4, 0.045);
          return j % 2 === 0 ? (
            <group key={j} position={[x, y, z]}>
              <Gc r={rad} h={0.26} c={pick(DRINK_COLS, key)} rough={0.2} />
              <Gc p={[0, 0.08, 0]} r={rad + 0.002} h={0.09} c={pick(["#f8fafc", "#ef4444", "#facc15"], key + 1)} />
            </group>
          ) : (
            <group key={j} position={[x, y, z]}>
              <Gb s={[pitch * 0.78, 0.26, 0.075]} c={pick(CARTON_COLS, key)} r={0.45} />
              <Gb p={[0, 0.09, 0]} s={[pitch * 0.78 + 0.002, 0.09, 0.077]} c="#f8fafc" />
            </group>
          );
        }
        if (variant === "cereal") {
          const bw = pitch * 0.85;
          return (
            <group key={j} position={[x, y, z]}>
              <Gb s={[bw, 0.3, 0.06]} c={pick(BRIGHT, key)} r={0.45} />
              <Gb p={[0, 0.1, 0]} s={[bw + 0.002, 0.13, 0.062]} c={pick(PAL, key + 1)} r={0.45} />
            </group>
          );
        }
        if (variant === "cans") {
          const rad = Math.min(pitch * 0.44, 0.06);
          return (
            <group key={j} position={[x, y, z]}>
              <Gc r={rad} h={0.21} c={pick(CAN_COLS, key)} rough={0.3} />
              <Gc p={[0, 0.07, 0]} r={rad + 0.002} h={0.08} c="#f8fafc" />
            </group>
          );
        }
        // snacks: crisp packets leaning back against the spine
        const bw = pitch * 0.8;
        return (
          <group key={j} position={[x, y, z]} rotation={[-0.1 * side, 0, 0]}>
            <Gb s={[bw, 0.2 + rnd(key + 2) * 0.07, 0.07]} c={pick(BRIGHT, key)} r={0.4} />
            <Gb p={[0, 0.07, 0]} s={[bw + 0.002, 0.07, 0.072]} c={pick(PAL, key + 1)} r={0.4} />
          </group>
        );
      })}
    </>
  );
}

function Gondola({ item, W, D, H, c }: BodyProps) {
  const v = item.variant ?? "snacks";
  const s0 = seedOf(item);
  const ys = [0.12, 0.46, 0.8, 1.14];
  const counts = [3, 5, 5, 4].map((n) => Math.max(3, Math.round((n * W) / 1.8)));
  const depth = D / 2 - 0.05;
  const zc = 0.025 + depth / 2;
  return (
    <>
      <Bx s={[W, 0.1, D - 0.04]} c="#4b5563" />
      <Bx p={[0, 0.06, 0]} s={[W - 0.08, H - 0.06, 0.05]} c="#cfd3d8" r={0.5} />
      {[-1, 1].map((s) => (
        <Bx key={s} p={[s * (W / 2 - 0.02), 0, 0]} s={[0.04, H, D - 0.06]} c={c} />
      ))}
      <Bx p={[0, H - 0.05, 0]} s={[W, 0.05, D - 0.06]} c="#e5e7eb" r={0.5} />
      {[-1, 1].flatMap((side) =>
        ys.map((y, k) => (
          <group key={`${side}${k}`}>
            <Bx p={[0, y, side * zc]} s={[W - 0.08, 0.025, depth]} c="#d9dde2" r={0.5} />
            {/* yellow shelf-edge price labels */}
            <Gb p={[0, y - 0.004, side * (0.025 + depth + 0.005)]} s={[W - 0.12, 0.032, 0.01]} c="#fde047" />
            <Facings variant={v} n={counts[k]} W={W} y={y + 0.025} z={side * zc} side={side} k={s0 + k * 3 + (side + 1) * 7} />
          </group>
        )),
      )}
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * produce: five sloped bins of fruit (oranges, bananas, melons, pineapples, mangoes) or
 * veg (tomatoes, ata rodo, onions, ugu, yam); item.variant = fruit | veg (default veg)
 * ------------------------------------------------------------------------------------------- */

const VEG_BINS = ["tomato", "ata", "onion", "ugu", "yam"];
const FRUIT_BINS = ["orange", "banana", "melon", "pineapple", "mango"];
const BOARD_Y = 0.03; // top of the sloped board, in the board's own frame

/** a heap of round produce: a 3 x 3 layer with a few on top (frame: y up from the board, z down the slope) */
function Heap({ x, k, r, cols, sc = [1, 1, 1], extra = 2 }: { x: number; k: number; r: number; cols: string[]; sc?: V3; extra?: number }) {
  const out: Array<{ p: V3; i: number }> = [];
  for (let i = 0; i < 9; i++) out.push({ p: [x + ((i % 3) - 1) * r * 1.8, BOARD_Y + r * sc[1], (Math.floor(i / 3) - 1) * 0.15 - 0.02], i });
  for (let i = 0; i < extra; i++) out.push({ p: [x + (i - (extra - 1) / 2) * r * 1.4, BOARD_Y + r * sc[1] * 2.1, -0.095 + i * 0.15], i: 9 + i });
  return (
    <>
      {out.map(({ p, i }) => (
        <Gs key={i} p={p} r={r} c={pick(cols, k * 7 + i)} sc={sc} rough={0.45} />
      ))}
    </>
  );
}

function BinFill({ type, x, k }: { type: string; x: number; k: number }) {
  const y0 = BOARD_Y;
  switch (type) {
    case "tomato":
      return <Heap x={x} k={k} r={0.05} cols={["#d62d20", "#e0422e", "#c0261a"]} />;
    case "ata":
      return <Heap x={x} k={k} r={0.04} cols={["#d62d20", "#f97316", "#e11d48"]} sc={[1, 0.85, 1]} />;
    case "onion":
      return <Heap x={x} k={k} r={0.05} cols={["#a23b4e", "#c96a4a", "#b4476a"]} sc={[1, 0.85, 1]} />;
    case "orange":
      return <Heap x={x} k={k} r={0.05} cols={["#f08a1c", "#f59e0b", "#ea7a12"]} />;
    case "mango":
      return <Heap x={x} k={k} r={0.05} cols={["#e8a13a", "#d9552f", "#8fbf3a", "#f0c040"]} sc={[1, 0.85, 0.8]} extra={0} />;
    case "ugu":
      return (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <Gs key={i} p={[x + ((i % 2) - 0.5) * 0.12, y0 + 0.035 + (i >= 8 ? 0.05 : 0), -0.2 + Math.floor(i / 2) * 0.1 + (i >= 8 ? 0.0 : 0)]} r={0.07} sc={[1.2, 0.5, 1]} c={pick(["#2f8f3a", "#3aa84a", "#1f6f33"], k + i)} rough={0.8} />
          ))}
        </>
      );
    case "yam":
      return (
        <>
          {([[-0.06, 0], [0.06, 0], [0, 1]] as const).map(([dx, layer], i) => (
            <group key={i}>
              <Rod p={[x + dx, y0 + 0.04 + layer * 0.07, 0]} len={0.4} r={0.04} axis="z" c="#8a5a3c" rough={0.9} />
              <Rod p={[x + dx, y0 + 0.04 + layer * 0.07, 0.205]} len={0.012} r={0.041} axis="z" c="#e8d9b0" />
            </group>
          ))}
        </>
      );
    case "banana":
      return (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <Rod key={i} p={[x + ((i % 4) - 1.5) * 0.045, y0 + 0.022 + (i % 2) * 0.03, i < 4 ? -0.12 : 0.14]} len={0.25} r={0.021} axis="z" c={i % 5 === 0 ? "#b6c73a" : "#f5d442"} yaw={((i % 4) - 1.5) * 0.08} />
          ))}
        </>
      );
    case "melon":
      return (
        <>
          <Gs p={[x, y0 + 0.1, -0.17]} r={0.12} sc={[1, 0.85, 1.25]} c="#2f7d3b" />
          <Gs p={[x, y0 + 0.04, 0.12]} r={0.115} sc={[1, 0.7, 1.15]} c="#3f9a4b" />
          <Gs p={[x, y0 + 0.105, 0.12]} r={0.105} sc={[1, 0.15, 1.1]} c="#e0344b" />
        </>
      );
    default:
      return (
        <>
          {[-0.18, 0, 0.18].map((z, i) => (
            <group key={i} position={[x + (i - 1) * 0.02, y0, z]}>
              <Gs p={[0, 0.095, 0]} r={0.07} sc={[1, 1.35, 1]} c="#d9a21b" />
              <Gc p={[0, 0.19, 0]} r={0.035} r2={0.006} h={0.12} c="#2f8f3a" />
            </group>
          ))}
        </>
      );
  }
}

function Produce({ item, W, D }: BodyProps) {
  const v = item.variant ?? "veg";
  const s0 = seedOf(item);
  const n = 5;
  const bw = (W - 0.12) / n;
  const L = D - 0.25; // length of the sloped board
  const bins = v === "fruit" ? FRUIT_BINS : VEG_BINS;
  const off = Math.abs(s0) % n;
  return (
    <>
      {/* stepped crate body under the slope, a back panel and a chalk price slate */}
      <Bx p={[0, 0, 0.14]} s={[W - 0.08, 0.44, 0.34]} c={LIGHT} />
      <Bx p={[0, 0, -0.17]} s={[W - 0.08, 0.58, 0.3]} c={WOOD} />
      <Bx p={[0, 0.12, 0.14 + 0.171]} s={[W - 0.1, 0.02, 0.01]} c={DARK} />
      <Bx p={[0, 0.28, 0.14 + 0.171]} s={[W - 0.1, 0.02, 0.01]} c={DARK} />
      <Bx p={[0, 0, -D / 2 + 0.03]} s={[W - 0.04, 0.75, 0.04]} c={DARK} />
      <Gb p={[0, 0.75, -D / 2 + 0.06]} s={[0.5, 0.2, 0.02]} c="#1f2937" rot={[-0.15, 0, 0]} />
      {["#f8fafc", "#facc15", "#fb7185"].map((col, i) => (
        <Gb key={col} p={[-0.05 + i * 0.03, 0.8 + i * 0.045, -D / 2 + 0.073]} s={[0.34 - i * 0.06, 0.015, 0.004]} c={col} rot={[-0.15, 0, 0]} />
      ))}
      <group position={[0, 0.58, 0.02]} rotation={[0.38, 0, 0]}>
        <Bx s={[W - 0.06, BOARD_Y, L]} c={LIGHT} />
        <Bx p={[0, BOARD_Y, L / 2 - 0.01]} s={[W - 0.06, 0.08, 0.02]} c={WOOD} />
        {Array.from({ length: n + 1 }).map((_, i) => (
          <Bx key={i} p={[-(W - 0.12) / 2 + i * bw, BOARD_Y, 0]} s={[0.02, 0.07, L]} c={WOOD} />
        ))}
        {bins.map((_, j) => (
          <BinFill key={j} type={at(bins, j + off)} x={-(W - 0.12) / 2 + bw * (j + 0.5)} k={s0 + j} />
        ))}
      </group>
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * cashdesk: a checkout counter with belt, till, card reader, bell, carrier bags and a sweets rack
 * ------------------------------------------------------------------------------------------- */

function CashDesk({ W, D, c, c2 }: BodyProps) {
  const T = 0.95; // counter top
  const f = W / 1.6;
  return (
    <>
      <Bx s={[W, 0.9, D]} c={c2} r={0.6} />
      <Bx p={[0, 0.9, 0]} s={[W + 0.04, 0.05, D + 0.04]} c="#2a2c32" r={0.35} />
      <Bx p={[0, 0.14, D / 2 + 0.005]} s={[W - 0.14, 0.62, 0.012]} c={c} r={0.8} />
      <Bx p={[0, 0, D / 2 + 0.003]} s={[W - 0.04, 0.08, 0.01]} c="#1f2228" />
      {/* the belt: rubber with steel side rails, an orange divider and the shopping going through */}
      <Gb p={[-0.38 * f, T, 0]} s={[0.84 * f, 0.025, 0.4]} c="#23262c" r={0.9} />
      {[-1, 1].map((s) => (
        <Gb key={s} p={[-0.38 * f, T, s * 0.215]} s={[0.84 * f, 0.05, 0.02]} m={SILVER} />
      ))}
      <Gb p={[0.0, T + 0.025, 0]} s={[0.03, 0.07, 0.3]} c="#f97316" />
      <Gb p={[-0.62 * f, T + 0.025, 0.02]} s={[0.1, 0.16, 0.07]} c="#38bdf8" r={0.5} />
      <Gc p={[-0.45 * f, T + 0.025, -0.04]} r={0.03} h={0.2} c="#f59e0b" rough={0.3} />
      <Gb p={[-0.3 * f, T + 0.025, 0.05]} s={[0.2, 0.09, 0.1]} c="#c9954d" />
      <Gc p={[-0.14 * f, T + 0.025, -0.06]} r={0.035} h={0.11} c="#dc2626" rough={0.3} />
      {/* the till faces the customer: drawer, keypad and a tilted lit screen */}
      <group position={[0.42 * f, T, -0.08]}>
        <Gb s={[0.34, 0.1, 0.3]} c="#d1d5db" r={0.4} />
        <Gb p={[0, 0.1, 0.06]} s={[0.3, 0.012, 0.12]} c="#1f2228" />
        <group position={[0, 0.1, -0.08]} rotation={[-0.25, 0, 0]}>
          <Gb s={[0.3, 0.2, 0.035]} c="#14161a" r={0.3} />
          <Gb p={[0, 0.03, 0.0185]} s={[0.26, 0.14, 0.004]} m={glow.screen} />
        </group>
      </group>
      <group position={[0.42 * f, T, 0.22]} rotation={[-0.3, 0, 0]}>
        <Gb s={[0.075, 0.11, 0.045]} c="#1f2228" r={0.3} />
        <Gb p={[0, 0.07, 0.0235]} s={[0.05, 0.028, 0.004]} m={litMat("#86efac", 1.2, "#14301f")} />
        <Gb p={[0, 0.02, 0.0235]} s={[0.05, 0.04, 0.004]} c="#6b7280" />
      </group>
      {/* service bell */}
      <Gc p={[0.72 * f, T, 0.05]} r={0.05} h={0.012} m={SILVER} />
      <Gs p={[0.72 * f, T + 0.012, 0.05]} r={0.04} sc={[1, 0.7, 1]} m={SILVER} />
      <Gs p={[0.72 * f, T + 0.04, 0.05]} r={0.011} m={SILVER} />
      {/* a stack of carrier bags */}
      <Gb p={[0.68 * f, T, -0.24]} s={[0.22, 0.03, 0.16]} c="#f8fafc" rot={[0, 0.1, 0]} />
      <Gb p={[0.68 * f, T + 0.03, -0.24]} s={[0.22, 0.015, 0.16]} c={c} rot={[0, -0.05, 0]} />
      <Gb p={[0.68 * f, T + 0.045, -0.24]} s={[0.22, 0.03, 0.16]} c="#f8fafc" rot={[0, 0.06, 0]} />
      {/* sweets rack at the customer end */}
      <group position={[0.68 * f, T, 0.22]}>
        <Gb s={[0.26, 0.05, 0.18]} c="#3b2a1d" />
        <Gb p={[0, 0.05, -0.04]} s={[0.26, 0.05, 0.1]} c="#3b2a1d" />
        {Array.from({ length: 5 }).map((_, i) => (
          <group key={i}>
            <Gb p={[-0.1 + i * 0.05, 0.05, 0.05]} s={[0.04, 0.045, 0.05]} c={at(BRIGHT, i * 2)} r={0.5} />
            <Gb p={[-0.1 + i * 0.05, 0.1, -0.04]} s={[0.04, 0.04, 0.045]} c={at(BRIGHT, i * 2 + 5)} r={0.5} />
          </group>
        ))}
      </group>
      {/* lane light on a pole: green while the till is open and the power is on */}
      <Gc p={[-0.76 * f, T, -0.28]} r={0.012} h={0.4} c={METAL} />
      <Gb p={[-0.76 * f, T + 0.4, -0.28]} s={[0.24, 0.12, 0.04]} m={litMat("#34d399", 1.4, "#14532d")} />
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * dressedmannequin: a faceless full-body mannequin on a base; item.variant = agbada | suit | dress | ankara
 * ------------------------------------------------------------------------------------------- */

const SKIN = "#e4d6bd";
const SUITS = ["#1f2937", "#1e3a5f", "#3f3f46", "#4a3728", "#5b1a2a"];

function DressedMannequin({ item, c, c2 }: BodyProps) {
  const v = item.variant ?? "ankara";
  const s0 = seedOf(item);
  const suit = item.c ?? pick(SUITS, s0);
  const head = (
    <>
      <Cy p={[0, 1.44, 0]} r={0.04} h={0.12} c={SKIN} seg={10} />
      <Sp p={[0, 1.68, 0]} r={0.085} c={SKIN} sc={[0.88, 1.22, 1]} rough={0.5} />
    </>
  );
  const body = (
    <>
      <Sp p={[0, 0.92, 0]} r={0.14} c={SKIN} sc={[1, 0.6, 0.75]} rough={0.5} />
      <Cy p={[0, 0.95, 0]} r={0.115} r2={0.16} h={0.5} c={SKIN} seg={16} rough={0.5} />
      <Sp p={[0, 1.42, 0]} r={0.1} c={SKIN} sc={[1.75, 0.5, 0.95]} rough={0.5} />
    </>
  );
  const arms = [-1, 1].map((s) => <Cy key={s} p={[s * 0.205, 0.88, 0]} r={0.03} r2={0.042} h={0.56} c={SKIN} seg={10} rot={[0, 0, s * 0.06]} rough={0.5} />);
  return (
    <>
      <Cy r={0.2} h={0.025} c={DARK} seg={22} rough={0.5} />
      {v === "agbada" && (
        <>
          {/* sokoto trousers under a wide flowing robe with a gold-embroidered chest, plus a fila cap */}
          {[-1, 1].map((s) => (
            <Cy key={s} p={[s * 0.075, 0.025, 0]} r={0.07} r2={0.08} h={0.8} c={CREAM} seg={10} />
          ))}
          <Cy p={[0, 0.9, 0]} r={0.14} r2={0.165} h={0.58} c={CREAM} seg={16} />
          {head}
          <Cy p={[0, 0.3, 0]} r={0.3} r2={0.16} h={1.1} c={c} seg={24} rough={0.85} />
          <Cy p={[0, 0.3, 0]} r={0.303} r2={0.299} h={0.05} m={GOLD} seg={24} />
          <Bx p={[0, 1.08, 0.187]} s={[0.09, 0.22, 0.012]} c={CREAM} rot={[-0.127, 0, 0]} />
          <Bx p={[0, 0.85, 0.215]} s={[0.2, 0.3, 0.014]} m={GOLD} rot={[-0.127, 0, 0]} />
          {[-1, 1].map((s) => (
            <group key={s} position={[s * 0.22, 0.78, 0]} rotation={[0, 0, s * 0.1]} scale={[1, 1, 0.35]}>
              <Cy r={0.11} r2={0.04} h={0.66} c={c} seg={14} rough={0.85} />
            </group>
          ))}
          <Cy p={[0, 1.74, 0]} r={0.093} r2={0.095} h={0.07} c={c2} seg={16} />
          <Sp p={[0.02, 1.82, 0]} r={0.095} c={c2} sc={[1.05, 0.7, 1.05]} />
          <Gs p={[0.1, 1.78, 0]} r={0.07} c={c2} sc={[1.1, 0.6, 0.9]} />
        </>
      )}
      {v === "suit" && (
        <>
          {[-1, 1].map((s) => (
            <group key={s}>
              <Cy p={[s * 0.075, 0.025, 0]} r={0.06} r2={0.08} h={0.9} c={suit} seg={10} rough={0.85} />
              <Bx p={[s * 0.075, 0.025, 0.04]} s={[0.085, 0.04, 0.22]} c="#111111" r={0.4} />
              <Cy p={[s * 0.225, 0.88, 0]} r={0.05} r2={0.06} h={0.6} c={suit} seg={10} rot={[0, 0, s * 0.05]} rough={0.85} />
              <Sp p={[s * 0.235, 0.84, 0]} r={0.032} c={SKIN} rough={0.5} />
              <Bx p={[s * 0.075, 1.1, 0.114]} s={[0.05, 0.36, 0.008]} c="#111827" rot={[0, 0, -s * 0.25]} />
            </group>
          ))}
          <Bx p={[0, 0.88, 0]} s={[0.37, 0.62, 0.22]} c={suit} r={0.85} />
          <Bx p={[0, 1.0, 0.112]} s={[0.1, 0.48, 0.008]} c="#f4f1e8" />
          <Bx p={[0, 0.98, 0.118]} s={[0.035, 0.34, 0.008]} c={c2} />
          {head}
        </>
      )}
      {v === "dress" && (
        <>
          {/* strapless gown: flared skirt with a ruffled hem, a sash and bare shoulders */}
          {head}
          <Sp p={[0, 1.42, 0]} r={0.1} c={SKIN} sc={[1.75, 0.5, 0.95]} rough={0.5} />
          {arms}
          <Cy p={[0, 0.05, 0]} r={0.3} r2={0.13} h={0.98} c={c} seg={24} rough={0.6} />
          <Cy p={[0, 0.05, 0]} r={0.305} r2={0.298} h={0.05} c={c2} seg={24} />
          <Cy p={[0, 1.0, 0]} r={0.118} r2={0.17} h={0.42} c={c} seg={18} rough={0.6} />
          <Cy p={[0, 0.98, 0]} r={0.131} h={0.05} c={c2} seg={18} />
        </>
      )}
      {v !== "agbada" && v !== "suit" && v !== "dress" && (
        <>
          {/* ankara iro and buba with an ipele sash and a gele head wrap */}
          {head}
          {body}
          {arms}
          <Cy p={[0, 0.05, 0]} r={0.27} r2={0.13} h={0.9} m={artMat(c)} seg={22} />
          <Cy p={[0, 0.93, 0]} r={0.14} r2={0.175} h={0.55} m={artMat(c2)} seg={18} />
          {[-1, 1].map((s) => (
            <Cy key={s} p={[s * 0.225, 1.12, 0]} r={0.085} r2={0.05} h={0.34} m={artMat(c2)} seg={12} rot={[0, 0, s * 0.14]} />
          ))}
          <Bx p={[0.02, 1.0, 0.17]} s={[0.09, 0.52, 0.014]} m={artMat(c)} rot={[0, 0, -0.5]} />
          <Gs p={[0, 1.77, 0]} r={0.1} sc={[1.15, 0.85, 1.1]} m={artMat(c)} />
          <Gs p={[0, 1.86, 0]} r={0.09} sc={[1.7, 0.8, 0.7]} m={artMat(c2)} />
          {[-1, 1].map((s) => (
            <Gs key={s} p={[s * 0.15, 1.83, 0]} r={0.07} sc={[1, 1.3, 0.7]} m={artMat(c)} />
          ))}
        </>
      )}
    </>
  );
}

export const RETAIL_BODIES: Partial<Record<FurnKind, BodyRenderer>> = {
  clothesrail: ClothesRail,
  foldedshelf: FoldedShelf,
  shoeshelf: ShoeShelf,
  displaytable: DisplayTable,
  bagwall: BagWall,
  jewelrycase: JewelryCase,
  perfumeshelf: PerfumeShelf,
  electronicswall: ElectronicsWall,
  gondola: Gondola,
  produce: Produce,
  cashdesk: CashDesk,
  dressedmannequin: DressedMannequin,
};
