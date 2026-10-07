"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FURN } from "@/lib/furniture";
import type { Item } from "@/lib/interiors";
import { mat } from "@/components/world/materials";
import { adireTexture } from "./textures";
import { interiorState } from "./power";

type V3 = [number, number, number];

const WOOD = "#8a5a3c";
const DARK = "#5a3a24";
const LIGHT = "#b8895a";
const METAL = "#8c9096";
const WHITE = "#efece4";

/* ---- glowing materials, dimmed centrally by the interior scene ---- */
export const glow = {
  screen: new THREE.MeshStandardMaterial({ color: "#1b2a3a", emissive: new THREE.Color("#8fc8ff"), emissiveIntensity: 0, roughness: 0.3 }),
  bulb: new THREE.MeshStandardMaterial({ color: "#fff4d6", emissive: new THREE.Color("#ffd98a"), emissiveIntensity: 0, roughness: 0.4 }),
  lantern: new THREE.MeshStandardMaterial({ color: "#ffe2a8", emissive: new THREE.Color("#ffb347"), emissiveIntensity: 0.4, roughness: 0.4, transparent: true, opacity: 0.9 }),
  neon: new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: new THREE.Color("#ff6fb1"), emissiveIntensity: 0, roughness: 0.4 }),
};

const glass = new THREE.MeshStandardMaterial({ color: "#bfe0f2", roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.28 });
const water = new THREE.MeshStandardMaterial({ color: "#5fb8e6", roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.85 });

const artCache = new Map<string, THREE.MeshStandardMaterial>();
function artMat(color: string) {
  let m = artCache.get(color);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ map: adireTexture(color), roughness: 0.85 });
    artCache.set(color, m);
  }
  return m;
}

/* ---- primitives: bottom-based boxes and cylinders ---- */

function Bx({ p = [0, 0, 0], s, c, r = 0.75, rot, m }: { p?: V3; s: V3; c?: string; r?: number; rot?: V3; m?: THREE.Material }) {
  return (
    <mesh position={[p[0], p[1] + s[1] / 2, p[2]]} rotation={rot} material={m ?? mat(c ?? WOOD, r)} castShadow receiveShadow>
      <boxGeometry args={s} />
    </mesh>
  );
}

function Cy({ p = [0, 0, 0], r, r2, h, c, seg = 18, rough = 0.75, m, rot }: { p?: V3; r: number; r2?: number; h: number; c?: string; seg?: number; rough?: number; m?: THREE.Material; rot?: V3 }) {
  return (
    <mesh position={[p[0], p[1] + h / 2, p[2]]} rotation={rot} material={m ?? mat(c ?? WOOD, rough)} castShadow receiveShadow>
      <cylinderGeometry args={[r2 ?? r, r, h, seg]} />
    </mesh>
  );
}

function Sp({ p, r, c, sc, rough = 0.7 }: { p: V3; r: number; c: string; sc?: V3; rough?: number }) {
  return (
    <mesh position={p} scale={sc} material={mat(c, rough)} castShadow>
      <sphereGeometry args={[r, 16, 12]} />
    </mesh>
  );
}

/** Four legs at the corners of a w x d footprint. */
function Legs({ w, d, h, c = DARK, r = 0.025 }: { w: number; d: number; h: number; c?: string; r?: number }) {
  return (
    <>
      {[-1, 1].flatMap((sx) => [-1, 1].map((sz) => <Cy key={`${sx}${sz}`} p={[sx * (w / 2 - r * 2), 0, sz * (d / 2 - r * 2)]} r={r} h={h} c={c} seg={8} />))}
    </>
  );
}

/* ---- animated bits ---- */

function Blades({ y, r = 0.55, n = 4, c = "#e8e2d2" }: { y: number; r?: number; n?: number; c?: string }) {
  const g = useRef<THREE.Group>(null);
  const speed = useRef(0);
  useFrame((_, dt) => {
    speed.current += ((interiorState.power ? 7 : 0) - speed.current) * Math.min(1, dt * 1.5);
    if (g.current) g.current.rotation.y += speed.current * dt;
  });
  return (
    <group position={[0, y, 0]}>
      <Cy p={[0, 0.02, 0]} r={0.09} h={0.1} c={DARK} seg={12} />
      <Cy p={[0, 0.12, 0]} r={0.015} h={0.2} c={METAL} seg={6} />
      <group ref={g}>
        {Array.from({ length: n }).map((_, i) => (
          <group key={i} rotation={[0, (i / n) * Math.PI * 2, 0]}>
            <Bx p={[r / 2 + 0.08, 0.0, 0]} s={[r, 0.015, 0.14]} c={c} rot={[0, 0, 0.06]} />
          </group>
        ))}
      </group>
    </group>
  );
}

/* ---- builders ---- */

function Sofa({ W, D, c, arms = true }: { W: number; D: number; c: string; arms?: boolean }) {
  return (
    <>
      <Bx s={[W, 0.3, D]} c={DARK} />
      <Bx p={[0, 0.3, 0.06]} s={[W - 0.06, 0.14, D - 0.2]} c={c} r={0.9} />
      <Bx p={[0, 0.3, -D / 2 + 0.13]} s={[W, 0.52, 0.24]} c={c} r={0.9} />
      {arms &&
        [-1, 1].map((s) => <Bx key={s} p={[s * (W / 2 - 0.1), 0.3, 0.02]} s={[0.2, 0.26, D - 0.08]} c={c} r={0.9} />)}
      {[-1, 1].map((s) => (
        <Bx key={`p${s}`} p={[s * (W / 2 - 0.35), 0.44, -D / 2 + 0.32]} s={[0.34, 0.28, 0.12]} c={s < 0 ? "#d89b3c" : "#2f3b82"} r={0.9} rot={[-0.2, 0, 0]} />
      ))}
    </>
  );
}

function Bed({ W, D, c, hospital = false }: { W: number; D: number; c: string; hospital?: boolean }) {
  const frame = hospital ? "#b8c0c6" : DARK;
  return (
    <>
      <Bx s={[W, 0.28, D]} c={frame} r={0.6} />
      <Bx p={[0, 0.28, 0.02]} s={[W - 0.08, 0.2, D - 0.1]} c={hospital ? "#f2f4f5" : "#f0e8d6"} r={0.9} />
      <Bx p={[0, 0.48, D * 0.2]} s={[W - 0.08, 0.07, D * 0.6]} c={hospital ? "#7aa7c7" : c} r={0.9} />
      {[-1, 1].map((s) => (
        <Bx key={s} p={[s * (W / 4 + (hospital ? 0 : 0)), 0.48, -D / 2 + 0.3]} s={[W / 2 - 0.15, 0.1, 0.34]} c="#fbf8f0" r={0.95} />
      ))}
      <Bx p={[0, 0, -D / 2 + 0.04]} s={[W, hospital ? 0.75 : 0.95, 0.08]} c={frame} r={0.6} />
      {hospital && [-1, 1].map((s) => <Bx key={`r${s}`} p={[s * (W / 2 - 0.02), 0.5, 0]} s={[0.03, 0.3, D * 0.7]} c={METAL} r={0.4} />)}
    </>
  );
}

function Plant({ big = false }: { big?: boolean }) {
  return (
    <>
      <Cy r={0.2} r2={0.16} h={0.32} c="#b5533c" seg={14} />
      <Cy p={[0, 0.32, 0]} r={0.02} h={0.45} c="#4a7a3a" seg={6} />
      <Sp p={[0, 0.85, 0]} r={0.28} c="#4f9a4d" sc={[1, 1.1, 1]} />
      <Sp p={[0.14, 0.6, 0.05]} r={0.2} c="#5fae58" />
      <Sp p={[-0.13, 0.7, -0.06]} r={0.2} c="#3f8f56" />
      {big && <Sp p={[0, 1.15, 0]} r={0.22} c="#5fae58" />}
    </>
  );
}

function Books({ W, shelves, h }: { W: number; shelves: number; h: number }) {
  const colors = ["#8a2f3c", "#2f3b82", "#d89b3c", "#2f8f83", "#5a3a24", "#b5533c", "#efe0c4"];
  const out: ReactNode[] = [];
  for (let s = 0; s < shelves; s++) {
    let x = -W / 2 + 0.08;
    let k = 0;
    while (x < W / 2 - 0.1) {
      const w = 0.04 + ((s * 7 + k * 13) % 5) * 0.012;
      const bh = 0.2 + ((s * 5 + k * 11) % 4) * 0.035;
      out.push(<Bx key={`${s}-${k}`} p={[x + w / 2, 0.12 + (s * (h - 0.2)) / shelves, 0.02]} s={[w, bh, 0.22]} c={colors[(s + k) % colors.length]} r={0.9} />);
      x += w + 0.004;
      k++;
    }
  }
  return <>{out}</>;
}

/* ---- the catalogue ---- */

function Body({ item, W, D, c, c2 }: { item: Item; W: number; D: number; c: string; c2: string }) {
  const H = FURN[item.kind].h;
  switch (item.kind) {
    case "sofa":
    case "loveseat":
      return <Sofa W={W} D={D} c={c} />;
    case "armchair":
      return <Sofa W={W} D={D} c={c} />;
    case "chair":
      return (
        <>
          <Bx p={[0, 0.42, 0]} s={[W, 0.05, D]} c={WOOD} />
          <Bx p={[0, 0.47, -D / 2 + 0.03]} s={[W, 0.42, 0.05]} c={WOOD} />
          <Legs w={W} d={D} h={0.42} />
        </>
      );
    case "plasticchair":
      return (
        <>
          <Bx p={[0, 0.4, 0]} s={[W, 0.05, D]} c={item.c ?? "#e8e4da"} r={0.4} />
          <Bx p={[0, 0.45, -D / 2 + 0.03]} s={[W - 0.04, 0.4, 0.04]} c={item.c ?? "#e8e4da"} r={0.4} />
          <Legs w={W} d={D} h={0.4} c="#c9c5ba" r={0.018} />
        </>
      );
    case "stool":
    case "barstool": {
      const sh = item.kind === "stool" ? 0.45 : 0.75;
      return (
        <>
          <Cy p={[0, sh - 0.05, 0]} r={0.2} h={0.06} c={WOOD} />
          {[0, 1, 2].map((i) => (
            <Cy key={i} p={[Math.sin((i / 3) * 6.28) * 0.14, 0, Math.cos((i / 3) * 6.28) * 0.14]} r={0.02} h={sh - 0.05} c={DARK} seg={6} />
          ))}
        </>
      );
    }
    case "bench":
      return (
        <>
          <Bx p={[0, 0.4, 0]} s={[W, 0.06, D]} c={LIGHT} />
          {[-1, 1].map((s) => <Bx key={s} p={[s * (W / 2 - 0.08), 0, 0]} s={[0.07, 0.4, D - 0.06]} c={DARK} />)}
        </>
      );
    case "pew":
      return (
        <>
          <Bx p={[0, 0.4, 0.04]} s={[W, 0.06, D - 0.12]} c={WOOD} />
          <Bx p={[0, 0.46, -D / 2 + 0.03]} s={[W, 0.5, 0.06]} c={WOOD} />
          {[-1, 1].map((s) => <Bx key={s} p={[s * (W / 2 - 0.04), 0, 0]} s={[0.08, 0.9, D]} c={DARK} />)}
        </>
      );
    case "coffeetable":
      return (
        <>
          <Bx p={[0, 0.36, 0]} s={[W, 0.05, D]} c={DARK} r={0.5} />
          <Bx p={[0, 0.41, 0]} s={[W * 0.55, 0.012, D * 0.4]} c={c} r={0.9} />
          <Legs w={W} d={D} h={0.36} />
        </>
      );
    case "diningtable":
      return (
        <>
          <Bx p={[0, 0.7, 0]} s={[W, 0.05, D]} c={WOOD} />
          <Bx p={[0, 0.75, 0]} s={[W * 0.6, 0.012, D * 0.28]} c={c} r={0.9} />
          <Legs w={W} d={D} h={0.7} r={0.035} />
        </>
      );
    case "roundtable":
      return (
        <>
          <Cy p={[0, 0.7, 0]} r={W / 2} h={0.05} c={item.c ?? LIGHT} />
          <Cy r={0.05} h={0.7} c={DARK} seg={8} />
          <Cy r={0.3} r2={0.3} h={0.04} c={DARK} />
        </>
      );
    case "desk":
    case "studentdesk":
      return (
        <>
          <Bx p={[0, 0.7, 0]} s={[W, 0.05, D]} c={item.kind === "desk" ? WOOD : LIGHT} />
          {item.kind === "desk" && <Bx p={[W / 2 - 0.22, 0, 0]} s={[0.4, 0.7, D - 0.06]} c={DARK} />}
          <Legs w={W} d={D} h={0.7} />
        </>
      );
    case "pcdesk":
      return (
        <>
          <Bx p={[0, 0.7, 0]} s={[W, 0.05, D]} c="#d8d4c8" r={0.5} />
          <Bx p={[W / 2 - 0.2, 0, 0]} s={[0.35, 0.7, D - 0.06]} c="#b8b4a8" />
          <Legs w={W} d={D} h={0.7} c={METAL} r={0.022} />
          <Bx p={[0, 0.75, -D / 2 + 0.2]} s={[0.55, 0.34, 0.04]} c="#17181c" r={0.3} />
          <mesh position={[0, 0.92, -D / 2 + 0.225]} material={glow.screen}>
            <boxGeometry args={[0.5, 0.29, 0.01]} />
          </mesh>
          <Cy p={[0, 0.75, -D / 2 + 0.2]} r={0.04} r2={0.06} h={0.06} c="#17181c" seg={8} />
          <Bx p={[0, 0.75, 0.05]} s={[0.42, 0.02, 0.14]} c="#2a2c32" />
        </>
      );
    case "counter":
    case "bar":
      return (
        <>
          <Bx s={[W, H - 0.05, D]} c={c2} r={0.6} />
          <Bx p={[0, H - 0.05, 0.02]} s={[W + 0.04, 0.06, D + 0.08]} c={DARK} r={0.4} />
          <Bx p={[0, 0.12, D / 2 + 0.005]} s={[W - 0.1, 0.06, 0.02]} c={c} r={0.9} />
          {item.kind === "bar" && [-1, 1].map((s) => <Cy key={s} p={[s * (W / 2 - 0.1), 0.05, D / 2 + 0.1]} r={0.02} h={0.15} c={METAL} seg={6} />)}
        </>
      );
    case "stall": {
      const goods = ["#d94a3a", "#e2a233", "#4f9a4d", "#f0e8d6", "#b5533c"];
      return (
        <>
          <Bx s={[W, 0.75, D]} c={DARK} />
          <Bx p={[0, 0.75, 0]} s={[W + 0.06, 0.05, D + 0.06]} c={c} r={0.9} />
          {Array.from({ length: 6 }).map((_, i) => (
            <Sp key={i} p={[-W / 2 + 0.3 + i * (W / 6.4), 0.88, ((i % 2) - 0.5) * 0.3]} r={0.1 + (i % 3) * 0.02} c={goods[(i + Math.round(item.x)) % goods.length]} />
          ))}
          <Bx p={[0, 0.8, -D / 2 + 0.05]} s={[W * 0.9, 0.22, 0.12]} c={goods[(Math.round(item.z) + 2) % goods.length]} r={0.9} />
        </>
      );
    }
    case "cabinet":
    case "sidetable":
      return (
        <>
          <Bx s={[W, H - 0.05, D]} c={WOOD} />
          <Bx p={[0, H - 0.05, 0]} s={[W + 0.03, 0.05, D + 0.03]} c={DARK} />
          <Bx p={[0, 0.1, D / 2 + 0.005]} s={[0.02, H - 0.3, 0.012]} c={DARK} />
        </>
      );
    case "bed":
    case "singlebed":
      return <Bed W={W} D={D} c={c} />;
    case "hospitalbed":
      return <Bed W={W} D={D} c={c} hospital />;
    case "wardrobe":
      return (
        <>
          <Bx s={[W, H, D]} c={WOOD} />
          {[-1, 1].map((s) => (
            <group key={s}>
              <Bx p={[s * (W / 4), 0.1, D / 2 + 0.005]} s={[W / 2 - 0.05, H - 0.2, 0.015]} c={LIGHT} r={0.6} />
              <Bx p={[s * 0.04, 0.9, D / 2 + 0.02]} s={[0.025, 0.16, 0.025]} c={DARK} />
            </group>
          ))}
        </>
      );
    case "bookshelf":
      return (
        <>
          <Bx s={[W, H, D]} c={DARK} />
          <Bx p={[0, 0.04, 0.02]} s={[W - 0.08, H - 0.1, D - 0.04]} c="#3a2618" />
          <Books W={W} shelves={5} h={H} />
        </>
      );
    case "fridge":
      return (
        <>
          <Bx s={[W, H, D]} c={WHITE} r={0.4} />
          <Bx p={[0, 1.15, D / 2 + 0.005]} s={[W - 0.02, 0.012, 0.012]} c={METAL} />
          <Bx p={[W / 2 - 0.1, 0.5, D / 2 + 0.02]} s={[0.025, 0.5, 0.03]} c={METAL} />
          <Bx p={[W / 2 - 0.1, 1.3, D / 2 + 0.02]} s={[0.025, 0.3, 0.03]} c={METAL} />
          <mesh position={[-W / 2 + 0.12, 1.5, D / 2 + 0.01]} material={glow.bulb}>
            <boxGeometry args={[0.04, 0.02, 0.01]} />
          </mesh>
        </>
      );
    case "stove":
      return (
        <>
          <Bx s={[W, H, D]} c={WHITE} r={0.4} />
          <Bx p={[0, 0.2, D / 2 + 0.005]} s={[W - 0.1, 0.45, 0.015]} c="#2a2c32" r={0.3} />
          {[-1, 1].flatMap((sx) => [-1, 1].map((sz) => <Cy key={`${sx}${sz}`} p={[sx * 0.15, H, sz * 0.14]} r={0.08} h={0.012} c="#2a2c32" seg={16} />))}
        </>
      );
    case "sink":
      return (
        <>
          <Bx s={[W, H - 0.04, D]} c="#d8d4c8" r={0.5} />
          <Bx p={[0, H - 0.04, 0]} s={[W + 0.02, 0.04, D + 0.02]} c={METAL} r={0.3} />
          <Bx p={[0, H, 0]} s={[W * 0.6, 0.012, D * 0.6]} c="#6a6e74" r={0.3} />
          <Cy p={[0, H, -D / 2 + 0.08]} r={0.015} h={0.25} c={METAL} seg={6} />
        </>
      );
    case "tv":
      return (
        <>
          <Bx s={[W, 0.45, D]} c={DARK} />
          <Bx p={[0, 0.45, 0]} s={[W * 0.92, 0.66, 0.07]} c="#111216" r={0.3} />
          <mesh position={[0, 0.78, 0.04]} material={glow.screen}>
            <boxGeometry args={[W * 0.86, 0.58, 0.012]} />
          </mesh>
        </>
      );
    case "rug":
      return (
        <mesh position={[0, 0.012, 0]} rotation-x={-Math.PI / 2} material={artMat(c)} receiveShadow>
          <planeGeometry args={[W, D]} />
        </mesh>
      );
    case "plant":
      return <Plant big />;
    case "lamp":
      return (
        <>
          <Cy r={0.12} r2={0.14} h={0.03} c={DARK} />
          <Cy r={0.012} h={1.2} c={METAL} seg={6} />
          <Cy p={[0, 1.15, 0]} r={0.12} r2={0.19} h={0.22} m={glow.bulb} seg={14} />
        </>
      );
    case "standingfan":
      return (
        <>
          <Cy r={0.16} h={0.03} c={DARK} />
          <Cy r={0.014} h={1.0} c={METAL} seg={6} />
          <Blades y={1.05} r={0.2} n={3} c="#cfd4d8" />
          <Cy p={[0, 1.04, 0.0]} r={0.26} h={0.01} c="#9aa0a6" seg={20} rot={[Math.PI / 2, 0, 0]} />
        </>
      );
    case "ceilingfan":
      return <Blades y={2.45} />;
    case "chandelier":
      return (
        <group position={[0, 2.2, 0]}>
          <Cy p={[0, 0.2, 0]} r={0.01} h={0.35} c={METAL} seg={6} />
          <mesh position={[0, 0.1, 0]} rotation-x={Math.PI / 2} material={mat("#c9a24a", 0.3)}>
            <torusGeometry args={[0.28, 0.02, 8, 24]} />
          </mesh>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[Math.sin((i / 6) * 6.28) * 0.28, 0.14, Math.cos((i / 6) * 6.28) * 0.28]} material={glow.bulb}>
              <sphereGeometry args={[0.04, 8, 6]} />
            </mesh>
          ))}
        </group>
      );
    case "generator":
      return (
        <>
          <Bx s={[W, 0.45, D]} c="#d94a3a" r={0.5} />
          <Bx p={[0, 0.45, 0]} s={[W - 0.1, 0.12, D - 0.06]} c="#2a2c32" />
          <Cy p={[W / 2 - 0.08, 0.5, -0.05]} r={0.035} h={0.22} c={METAL} seg={8} />
          {[-1, 1].map((s) => <Cy key={s} p={[s * (W / 2 - 0.05), 0, 0]} r={0.05} h={0.08} c="#17181c" seg={10} rot={[0, 0, Math.PI / 2]} />)}
          <Bx p={[-W / 2 + 0.15, 0.2, D / 2 + 0.005]} s={[0.2, 0.1, 0.01]} c="#f4f4f2" />
        </>
      );
    case "lantern":
      return (
        <group position={[0, item.y ?? 0, 0]}>
          <Cy r={0.07} h={0.02} c={METAL} seg={10} />
          <Cy p={[0, 0.02, 0]} r={0.055} h={0.16} m={glow.lantern} seg={12} />
          <Cy p={[0, 0.18, 0]} r={0.065} r2={0.04} h={0.04} c={METAL} seg={10} />
        </group>
      );
    case "waterdispenser":
      return (
        <>
          <Bx s={[W, 0.95, D]} c={WHITE} r={0.4} />
          <Cy p={[0, 0.95, 0]} r={0.14} h={0.34} c="#7fc4e8" seg={14} rough={0.2} />
          <Bx p={[0, 0.5, D / 2 + 0.005]} s={[0.18, 0.05, 0.02]} c="#3a7ab8" />
        </>
      );
    case "toilet":
      return (
        <>
          <Bx p={[0, 0, -D / 2 + 0.12]} s={[0.4, 0.8, 0.22]} c={WHITE} r={0.3} />
          <mesh position={[0, 0.2, 0.05]} scale={[1, 0.8, 1.35]} material={mat(WHITE, 0.3)} castShadow>
            <sphereGeometry args={[0.2, 14, 10]} />
          </mesh>
        </>
      );
    case "shower":
      return (
        <>
          <Bx s={[W, 0.08, D]} c={WHITE} r={0.3} />
          <mesh position={[0.4, 1.0, 0]} material={glass}>
            <boxGeometry args={[0.02, 1.9, D]} />
          </mesh>
          <mesh position={[0, 1.0, D / 2 - 0.02]} material={glass}>
            <boxGeometry args={[W, 1.9, 0.02]} />
          </mesh>
          <Cy p={[-W / 2 + 0.1, 1.8, -D / 2 + 0.1]} r={0.08} h={0.03} c={METAL} seg={12} />
        </>
      );
    case "basin":
      return (
        <>
          <Cy r={0.05} h={0.75} c={WHITE} seg={10} />
          <Bx p={[0, 0.75, 0]} s={[W, 0.12, D]} c={WHITE} r={0.3} />
          <Cy p={[0, 0.86, -D / 2 + 0.06]} r={0.012} h={0.14} c={METAL} seg={6} />
        </>
      );
    case "podium":
      return (
        <>
          <Bx s={[W, H - 0.1, D]} c={WOOD} />
          <Bx p={[0, H - 0.1, 0]} s={[W + 0.04, 0.05, D + 0.04]} c={DARK} rot={[-0.2, 0, 0]} />
        </>
      );
    case "blackboard":
      return (
        <group position={[0, item.y ?? 0.9, 0]}>
          <Bx s={[W + 0.1, H + 0.1, 0.06]} c={WOOD} />
          <Bx p={[0, 0.05, 0.035]} s={[W, H, 0.01]} c="#2a4a3a" r={0.9} />
          {[0.2, 0.5, 0.8].map((y, i) => <Bx key={i} p={[-W / 2 + 0.4 + i * 0.1, y, 0.045]} s={[W * (0.5 - i * 0.1), 0.02, 0.004]} c="#e8e4da" />)}
        </group>
      );
    case "altar":
      return (
        <>
          <Bx s={[W, H, D]} c="#e8e0cc" r={0.7} />
          <Bx p={[0, H, 0]} s={[W + 0.1, 0.05, D + 0.1]} c={c} r={0.9} />
          <Bx p={[0, H + 0.05, -D / 2 + 0.2]} s={[0.05, 0.6, 0.05]} c="#c9a24a" r={0.3} />
          <Bx p={[0, H + 0.4, -D / 2 + 0.2]} s={[0.3, 0.05, 0.05]} c="#c9a24a" r={0.3} />
          {[-1, 1].map((s) => <Cy key={s} p={[s * 0.6, H + 0.05, 0]} r={0.035} h={0.25} c="#f4f0e4" seg={8} />)}
        </>
      );
    case "pulpit":
      return (
        <>
          <Bx s={[W, H - 0.1, D]} c={DARK} />
          <Bx p={[0, H - 0.1, 0]} s={[W + 0.08, 0.06, D + 0.08]} c={WOOD} rot={[-0.15, 0, 0]} />
        </>
      );
    case "mimbar":
      return (
        <>
          {[0, 1, 2, 3].map((i) => <Bx key={i} p={[0, 0, D / 2 - i * 0.22]} s={[W - 0.1 * i, 0.3 + i * 0.3, 0.22]} c="#e8e0cc" />)}
          <Bx p={[0, 1.2, -D / 2 + 0.1]} s={[W - 0.3, 0.1, 0.5]} c="#2f6f4f" />
          <Bx p={[-W / 2 + 0.15, 0, -D / 2 + 0.2]} s={[0.1, 1.8, 0.5]} c="#e8e0cc" />
          <Bx p={[W / 2 - 0.15, 0, -D / 2 + 0.2]} s={[0.1, 1.8, 0.5]} c="#e8e0cc" />
          <Bx p={[0, 1.75, -D / 2 + 0.2]} s={[W, 0.12, 0.55]} c="#c9a24a" r={0.3} />
        </>
      );
    case "prayermat":
      return (
        <>
          <Bx s={[W, 0.02, D]} c="#2f6f4f" r={0.95} />
          <Bx p={[0, 0.02, 0]} s={[W - 0.12, 0.004, D - 0.12]} c="#d9c98a" r={0.95} />
          <Bx p={[0, 0.024, -D / 2 + 0.3]} s={[0.2, 0.004, 0.3]} c="#2f6f4f" r={0.95} />
        </>
      );
    case "displaycase":
      return (
        <>
          <Bx s={[W, 0.35, D]} c={DARK} />
          <mesh position={[0, 0.35 + (H - 0.4) / 2, 0]} material={glass}>
            <boxGeometry args={[W - 0.04, H - 0.4, D - 0.04]} />
          </mesh>
          <Bx p={[0, H - 0.05, 0]} s={[W, 0.05, D]} c={DARK} />
          {[-1, 0, 1].map((i) => <Sp key={i} p={[i * (W / 3.4), 0.5, 0]} r={0.08} c={["#c9a24a", "#b5533c", "#2f3b82"][i + 1]} />)}
        </>
      );
    case "arcade":
      return (
        <>
          <Bx s={[W, H, D]} c={item.c ?? "#3a3470"} r={0.5} />
          <mesh position={[0, 1.15, D / 2 + 0.005]} material={glow.screen}>
            <boxGeometry args={[W - 0.15, 0.4, 0.01]} />
          </mesh>
          <Bx p={[0, 0.85, D / 2 + 0.05]} s={[W - 0.1, 0.05, 0.25]} c="#1a1830" />
          <mesh position={[0, 1.7, D / 2 + 0.005]} material={glow.neon}>
            <boxGeometry args={[W - 0.15, 0.14, 0.01]} />
          </mesh>
          <Cy p={[-0.1, 0.88, D / 2 + 0.12]} r={0.015} h={0.1} c="#d94a3a" seg={6} />
        </>
      );
    case "clawmachine":
      return (
        <>
          <Bx s={[W, 0.7, D]} c="#e85d9a" r={0.5} />
          <mesh position={[0, 0.7 + 0.5, 0]} material={glass}>
            <boxGeometry args={[W - 0.06, 1.0, D - 0.06]} />
          </mesh>
          <Bx p={[0, 1.7, 0]} s={[W, 0.2, D]} c="#e85d9a" r={0.5} />
          {Array.from({ length: 6 }).map((_, i) => <Sp key={i} p={[((i % 3) - 1) * 0.2, 0.78, ((i % 2) - 0.5) * 0.3]} r={0.08} c={["#ffd166", "#06d6a0", "#ef476f"][i % 3]} />)}
        </>
      );
    case "fountain":
      return (
        <>
          <Cy r={W / 2} h={0.35} c="#d6d0c0" seg={28} />
          <mesh position={[0, 0.32, 0]} material={water} rotation-x={-Math.PI / 2}>
            <circleGeometry args={[W / 2 - 0.1, 28]} />
          </mesh>
          <Cy p={[0, 0.3, 0]} r={0.07} h={0.55} c="#d6d0c0" seg={10} />
          <Cy p={[0, 0.85, 0]} r={0.3} r2={0.05} h={0.12} c="#d6d0c0" seg={16} />
          <Sp p={[0, 1.0, 0]} r={0.08} c="#7fc4e8" rough={0.2} />
        </>
      );
    case "stage":
      return (
        <>
          <Bx s={[W, 0.3, D]} c={LIGHT} />
          <Bx p={[0, 0.3, D / 2 - 0.04]} s={[W, 0.02, 0.08]} c={DARK} />
        </>
      );
    case "drum":
      return (
        <group position={[0, item.y ?? 0, 0]}>
          <Cy p={[0, 0.45, 0]} r={0.2} r2={0.07} h={0.2} c="#a8483a" seg={14} />
          <Cy p={[0, 0.25, 0]} r={0.07} r2={0.2} h={0.2} c="#a8483a" seg={14} />
          <Cy p={[0, 0.65, 0]} r={0.2} h={0.03} c="#e8d9b0" seg={14} />
          <Cy p={[0, 0.2, 0]} r={0.2} h={0.03} c="#e8d9b0" seg={14} />
          <Cy p={[0, 0, 0]} r={0.02} h={0.2} c={DARK} seg={6} />
        </group>
      );
    case "rack": {
      const cols = ["#d94a3a", "#2f3b82", "#e2a233", "#2f8f83", "#8a2f3c", "#f0e8d6", "#7c3aed"];
      return (
        <>
          {[-1, 1].map((s) => <Cy key={s} p={[s * (W / 2 - 0.05), 0, 0]} r={0.02} h={H} c={METAL} seg={6} />)}
          <Cy p={[0, H - 0.05, 0]} r={0.015} h={W - 0.06} c={METAL} seg={6} rot={[0, 0, Math.PI / 2]} />
          {Array.from({ length: 9 }).map((_, i) => <Bx key={i} p={[-W / 2 + 0.14 + i * ((W - 0.28) / 8), 0.45, 0]} s={[0.08, H - 0.55, 0.3]} c={cols[(i + Math.round(item.x)) % cols.length]} r={0.9} />)}
        </>
      );
    }
    case "crates":
      return (
        <>
          <Bx s={[W, 0.3, D]} c={LIGHT} />
          <Bx p={[0.05, 0.3, 0]} s={[W - 0.15, 0.3, D - 0.1]} c={WOOD} />
          {Array.from({ length: 7 }).map((_, i) => <Sp key={i} p={[-0.25 + (i % 4) * 0.17, 0.66, -0.12 + Math.floor(i / 4) * 0.2]} r={0.09} c={item.c ?? "#d94a3a"} />)}
        </>
      );
    case "sacks":
      return (
        <>
          {[0, 1, 2].map((i) => <Sp key={i} p={[-0.2 + i * 0.22, 0.2 + (i === 1 ? 0.3 : 0), 0]} r={0.22} c="#d8c9a0" sc={[1, 1.2, 1]} />)}
        </>
      );
    case "umbrella": {
      const stripes = ["#d94a3a", "#f0e8d6", "#2f8f83", "#e2a233"];
      return (
        <group>
          <Cy r={0.03} h={2.1} c={METAL} seg={6} />
          <mesh position={[0, 2.2, 0]} castShadow>
            <coneGeometry args={[W / 2, 0.35, 12]} />
            <meshStandardMaterial color={stripes[Math.abs(Math.round(item.x + item.z)) % 4]} roughness={0.8} transparent opacity={0.72} />
          </mesh>
        </group>
      );
    }
    case "mortar":
      return (
        <>
          <Cy r={0.2} r2={0.14} h={0.5} c="#6b4a2f" seg={14} />
          <Cy p={[0, 0.5, 0]} r={0.24} r2={0.2} h={0.12} c="#7a5436" seg={14} />
          <Cy p={[0.18, 0.2, 0.05]} r={0.035} h={0.85} c="#a8794a" seg={8} rot={[0.1, 0, -0.25]} />
        </>
      );
    case "calabash":
      return (
        <>
          <Sp p={[0, 0.16, 0]} r={0.22} c="#c9a24a" sc={[1, 0.7, 1]} />
          <Sp p={[0.3, 0.1, 0.1]} r={0.14} c="#b8893a" sc={[1, 0.7, 1]} />
        </>
      );
    case "ibeji":
      return (
        <>
          <Bx s={[0.4, 0.06, 0.3]} c="#3b2a1d" />
          {[-1, 1].map((s) => (
            <group key={s} position={[s * 0.1, 0.06, 0]}>
              <Cy r={0.07} r2={0.05} h={0.3} c="#6b4a2f" seg={10} />
              <Sp p={[0, 0.4, 0]} r={0.075} c="#6b4a2f" />
              <Bx p={[0, 0.12, 0.05]} s={[0.1, 0.02, 0.03]} c="#c9a24a" />
            </group>
          ))}
        </>
      );
    case "mannequin":
      return (
        <>
          <Cy r={0.18} h={0.03} c={DARK} seg={14} />
          <Cy r={0.015} h={1.0} c={METAL} seg={6} />
          <Cy p={[0, 0.85, 0]} r={0.2} r2={0.14} h={0.55} c={c} seg={14} rough={0.8} />
          <Sp p={[0, 1.5, 0]} r={0.09} c="#e8d9b0" />
          <Bx p={[0, 0.85, 0.12]} s={[0.3, 0.45, 0.01]} m={artMat(c)} />
        </>
      );
    case "carvedstool":
      return (
        <>
          <Cy p={[0, 0.34, 0]} r={0.22} h={0.07} c="#6b4a2f" seg={16} />
          <Cy p={[0, 0.07, 0]} r={0.09} h={0.27} c="#5a3a24" seg={10} />
          <Cy r={0.2} h={0.07} c="#6b4a2f" seg={16} />
        </>
      );
    case "gascooker":
      return (
        <>
          <Bx s={[W, 0.85, D]} c={WHITE} r={0.4} />
          <Bx p={[0, 0.85, 0]} s={[W - 0.04, 0.04, D - 0.04]} c="#2a2c32" />
          {[-1, 1].map((s) => <Cy key={s} p={[s * 0.17, 0.89, 0]} r={0.08} h={0.015} c={METAL} seg={14} />)}
          <Bx p={[0, 0.2, D / 2 + 0.005]} s={[W - 0.12, 0.4, 0.015]} c="#2a2c32" r={0.3} />
          <Cy p={[W / 2 + 0.2, 0, 0]} r={0.13} h={0.55} c="#c24a3a" seg={14} />
          <Cy p={[W / 2 + 0.2, 0.55, 0]} r={0.05} h={0.08} c={METAL} seg={8} />
        </>
      );
    case "radio":
      return (
        <>
          <Bx s={[W, 0.26, D]} c="#3b2a1d" r={0.6} />
          <Bx p={[-0.08, 0.05, D / 2 + 0.005]} s={[0.18, 0.14, 0.01]} c="#d9c98a" />
          <Cy p={[0.12, 0.05, D / 2]} r={0.04} h={0.02} c={METAL} seg={10} rot={[Math.PI / 2, 0, 0]} />
          <Cy p={[0.15, 0.26, 0]} r={0.006} h={0.4} c={METAL} seg={5} rot={[0, 0, -0.5]} />
        </>
      );
    case "sewingmachine":
      return (
        <>
          <Bx p={[0, 0.55, 0]} s={[W, 0.04, D]} c={DARK} />
          <Bx p={[-W / 2 + 0.05, 0, 0]} s={[0.05, 0.55, D - 0.1]} c="#2a2c32" />
          <Bx p={[W / 2 - 0.05, 0, 0]} s={[0.05, 0.55, D - 0.1]} c="#2a2c32" />
          <Bx p={[0.2, 0.59, 0]} s={[0.3, 0.2, 0.14]} c="#1b1d22" />
          <Bx p={[-0.05, 0.59, -0.05]} s={[0.4, 0.18, 0.08]} c="#1b1d22" />
          <Cy p={[-0.25, 0.7, -0.02]} r={0.05} h={0.04} c={METAL} seg={10} />
          <Bx p={[0, 0.6, 0.18]} s={[0.4, 0.01, 0.1]} m={artMat(c)} />
        </>
      );
    case "meterbox":
      return (
        <group position={[0, item.y ?? 1.3, 0]}>
          <Bx s={[W, H, D]} c="#8c9096" r={0.4} />
          <mesh position={[0, 0.3, D / 2 + 0.005]} material={glow.bulb}>
            <boxGeometry args={[0.2, 0.07, 0.01]} />
          </mesh>
          <Bx p={[0, 0.08, D / 2]} s={[0.2, 0.12, 0.01]} c="#2a2c32" />
        </group>
      );
    case "calendar":
      return (
        <group position={[0, item.y ?? 1.5, 0]}>
          <Bx s={[W, H, D]} c="#f4f0e4" />
          <Bx p={[0, H - 0.12, D / 2]} s={[W, 0.12, 0.01]} c="#b5533c" />
          <Bx p={[0, 0.1, D / 2]} s={[W - 0.1, 0.26, 0.01]} m={artMat(c)} />
        </group>
      );
    case "provisions": {
      const cols = ["#d94a3a", "#e2a233", "#2f8f83", "#f0e8d6", "#2f3b82", "#8a2f3c"];
      return (
        <>
          <Bx s={[W, H, D]} c={DARK} />
          <Bx p={[0, 0.04, 0.03]} s={[W - 0.06, H - 0.1, D - 0.04]} c="#3a2618" />
          {[0.15, 0.55, 0.95, 1.35].flatMap((y) =>
            Array.from({ length: 7 }).map((_, i) => <Bx key={`${y}${i}`} p={[-W / 2 + 0.12 + i * ((W - 0.24) / 6), y + 0.03, 0.03]} s={[0.1, 0.18 + (i % 3) * 0.04, 0.1]} c={cols[(i + Math.round(y * 5)) % cols.length]} r={0.6} />),
          )}
        </>
      );
    }
    case "cooler":
      return (
        <>
          <Bx s={[W, H - 0.05, D]} c="#2f6fb8" r={0.5} />
          <Bx p={[0, H - 0.05, 0]} s={[W + 0.02, 0.05, D + 0.02]} c="#f4f4f2" r={0.5} />
          <Bx p={[0, H - 0.2, D / 2]} s={[0.12, 0.04, 0.03]} c="#d8d4c8" />
        </>
      );
    case "watertank":
      return (
        <>
          <Cy r={0.4} h={1.15} c="#2f6fb8" seg={20} rough={0.5} />
          <Cy p={[0, 1.15, 0]} r={0.36} r2={0.3} h={0.15} c="#2f6fb8" seg={20} rough={0.5} />
          <Cy p={[0, 1.3, 0]} r={0.1} h={0.04} c="#f4f4f2" seg={12} />
        </>
      );
    case "agbadastand":
      return (
        <>
          <Cy r={0.2} h={0.03} c={DARK} seg={14} />
          <Cy r={0.015} h={1.6} c={DARK} seg={6} />
          <Bx p={[0, 1.4, 0]} s={[0.7, 0.03, 0.03]} c={DARK} />
          <Cy p={[0, 0.25, 0]} r={0.36} r2={0.1} h={1.1} c={c} seg={18} rough={0.8} />
          <Bx p={[0, 1.2, 0.0]} s={[0.1, 0.18, 0.2]} c="#f4f0e4" />
        </>
      );
    case "curtain":
      return <Bx p={[0, 0, 0]} s={[W, H, 0.04]} c="#bcd7e2" r={0.9} />;
    case "flag": {
      const g = item.c ?? "#1f9d55";
      return (
        <>
          <Cy r={0.03} h={2.4} c={METAL} seg={6} />
          <Bx p={[0.2, 1.6, 0]} s={[0.12, 0.5, 0.015]} c={g} r={0.9} />
          <Bx p={[0.32, 1.6, 0]} s={[0.12, 0.5, 0.015]} c="#f4f4f2" r={0.9} />
          <Bx p={[0.44, 1.6, 0]} s={[0.12, 0.5, 0.015]} c={g} r={0.9} />
        </>
      );
    }
    case "trophycase":
      return (
        <>
          <Bx s={[W, 0.4, D]} c={DARK} />
          <mesh position={[0, 0.4 + (H - 0.5) / 2, 0]} material={glass}>
            <boxGeometry args={[W - 0.04, H - 0.5, D - 0.04]} />
          </mesh>
          <Bx p={[0, H - 0.1, 0]} s={[W, 0.1, D]} c={DARK} />
          {[0, 1].flatMap((r) => [-1, 0, 1].map((i) => (
            <group key={`${r}${i}`} position={[i * 0.3, 0.55 + r * 0.55, 0]}>
              <Cy r={0.05} r2={0.03} h={0.04} c="#c9a24a" seg={10} />
              <Cy p={[0, 0.04, 0]} r={0.02} h={0.08} c="#c9a24a" seg={8} />
              <Cy p={[0, 0.12, 0]} r={0.07} r2={0.04} h={0.12} c="#e8c15a" seg={12} rough={0.3} />
            </group>
          )))}
        </>
      );
    case "goalpost":
      return (
        <>
          {[-1, 1].map((s) => <Cy key={s} p={[s * (W / 2), 0, 0]} r={0.05} h={H} c="#f4f4f2" seg={8} />)}
          <Cy p={[0, H - 0.05, 0]} r={0.05} h={W} c="#f4f4f2" seg={8} rot={[0, 0, Math.PI / 2]} />
          <mesh position={[0, H / 2, -0.4]} material={glass}>
            <boxGeometry args={[W, H, 0.01]} />
          </mesh>
        </>
      );
    case "ticketbooth":
      return (
        <>
          <Bx s={[W, 1.2, D]} c="#c75c3a" />
          <mesh position={[0, 1.5, D / 2 - 0.1]} material={glass}>
            <boxGeometry args={[W - 0.2, 0.6, 0.02]} />
          </mesh>
          <Bx p={[0, 1.2, 0]} s={[W, 0.05, D]} c={DARK} />
          <Bx p={[0, 1.8, 0]} s={[W + 0.2, 0.08, D + 0.2]} c="#e2a233" />
          <Bx p={[-W / 2 + 0.05, 1.2, 0]} s={[0.05, 0.6, D]} c="#c75c3a" />
          <Bx p={[W / 2 - 0.05, 1.2, 0]} s={[0.05, 0.6, D]} c="#c75c3a" />
        </>
      );
    case "tank":
      return (
        <>
          <Bx s={[W, 0.4, D]} c={DARK} />
          <mesh position={[0, 0.4 + 0.5, 0]} material={water}>
            <boxGeometry args={[W - 0.06, 1.0, D - 0.06]} />
          </mesh>
          <Bx p={[0, H - 0.05, 0]} s={[W, 0.05, D]} c={DARK} />
          {Array.from({ length: 7 }).map((_, i) => <Sp key={i} p={[-W / 2 + 0.4 + i * (W / 8), 0.7 + (i % 3) * 0.2, ((i % 2) - 0.5) * 0.3]} r={0.05} c={["#ffb347", "#ff6b6b", "#ffd166"][i % 3]} sc={[1.6, 1, 0.6]} />)}
          <Bx p={[0, 0.4, 0]} s={[W - 0.3, 0.1, D - 0.3]} c="#c9b88a" />
        </>
      );
    case "stairs":
      return (
        <>
          {Array.from({ length: 8 }).map((_, i) => <Bx key={i} p={[0, 0, D / 2 - (i + 0.5) * (D / 8)]} s={[W, 0.3 * (i + 1), D / 8]} c={i % 2 ? WOOD : LIGHT} />)}
          <Bx p={[-W / 2 + 0.02, 0, 0]} s={[0.05, 2.4, D]} c="#00000000" m={glass} />
        </>
      );
    case "treadmill":
      return (
        <>
          <Bx p={[0, 0.06, 0.05]} s={[W - 0.1, 0.12, D - 0.2]} c="#2a2f3a" r={0.5} />
          <Bx p={[0, 0.18, 0.08]} s={[W - 0.26, 0.02, D - 0.4]} c="#14171d" r={0.9} />
          {[-1, 1].map((s) => <Bx key={s} p={[s * (W / 2 - 0.08), 0.12, 0.05]} s={[0.06, 0.08, D - 0.2]} c={METAL} r={0.4} />)}
          {[-1, 1].map((s) => <Cy key={`p${s}`} p={[s * (W / 2 - 0.1), 0.12, -D / 2 + 0.2]} r={0.025} h={0.95} c={METAL} seg={8} />)}
          <Bx p={[0, 1.0, -D / 2 + 0.18]} s={[W - 0.2, 0.24, 0.12]} c="#1d2330" r={0.4} rot={[-0.35, 0, 0]} />
          <Bx p={[0, 1.08, -D / 2 + 0.25]} s={[W - 0.42, 0.1, 0.02]} m={glow.screen} rot={[-0.35, 0, 0]} />
        </>
      );
    case "dumbbells": {
      const cols = ["#1f2937", "#374151", "#4b5563"];
      return (
        <>
          {[-1, 1].map((s) => <Bx key={s} p={[s * (W / 2 - 0.04), 0, 0]} s={[0.05, H, D - 0.1]} c={METAL} r={0.4} />)}
          {[0.32, 0.68].map((y) => <Bx key={y} p={[0, y, 0]} s={[W - 0.06, 0.04, D - 0.06]} c="#2a2f3a" r={0.6} />)}
          {[0.34, 0.7].flatMap((y, row) =>
            Array.from({ length: 6 }).map((_, i) => (
              <group key={`${row}${i}`} position={[-W / 2 + 0.22 + i * ((W - 0.4) / 5), y + 0.06, 0]}>
                <Cy r={0.014} h={0.2} c={METAL} seg={8} rot={[0, 0, Math.PI / 2]} p={[0, 0.0, 0]} />
                {[-1, 1].map((s) => <Cy key={s} p={[s * 0.1, -0.04 - i * 0.004, 0]} r={0.045 + i * 0.006} h={0.06} c={cols[(i + row) % 3]} seg={10} rot={[0, 0, Math.PI / 2]} />)}
              </group>
            )),
          )}
        </>
      );
    }
    case "weightbench":
      return (
        <>
          <Bx p={[0, 0.38, 0.1]} s={[0.36, 0.1, D - 0.3]} c="#1f2937" r={0.8} />
          <Bx p={[0, 0.06, 0.1]} s={[0.1, 0.32, D - 0.5]} c={METAL} r={0.4} />
          {[-1, 1].map((s) => <Bx key={s} p={[s * 0.55, 0, -0.32]} s={[0.07, 1.15, 0.07]} c={METAL} r={0.4} />)}
          <Cy p={[0, 1.02, -0.32]} r={0.016} h={W - 0.1} c={METAL} seg={10} rot={[0, 0, Math.PI / 2]} />
          {[-1, 1].flatMap((s) => [0, 1].map((k) => <Cy key={`${s}${k}`} p={[s * (W / 2 - 0.14 - k * 0.07), 0.8, -0.32]} r={0.22 - k * 0.04} h={0.05} c={k ? "#374151" : "#111827"} seg={16} rot={[0, 0, Math.PI / 2]} />))}
        </>
      );
    case "punchingbag":
      return (
        <>
          <Cy r={0.3} h={0.06} c="#2a2f3a" seg={16} />
          <Cy p={[-0.22, 0, 0]} r={0.04} h={1.9} c={METAL} seg={8} />
          <Bx p={[-0.04, 1.86, 0]} s={[0.42, 0.06, 0.06]} c={METAL} r={0.4} />
          <Cy p={[0.12, 1.1, 0]} r={0.012} h={0.76} c={METAL} seg={6} />
          <Cy p={[0.12, 0.34, 0]} r={0.17} h={0.78} c="#b91c1c" seg={16} rough={0.7} />
        </>
      );
    case "exercisebike":
      return (
        <>
          <Bx p={[0, 0.02, 0.1]} s={[0.4, 0.05, D - 0.1]} c="#2a2f3a" r={0.5} />
          <Cy p={[0, 0.05, 0.28]} r={0.2} h={0.12} c="#374151" seg={18} rot={[0, 0, Math.PI / 2]} />
          <Bx p={[0, 0.1, -0.1]} s={[0.07, 0.75, 0.07]} c={c2} r={0.5} rot={[0.3, 0, 0]} />
          <Bx p={[0, 0.88, -0.28]} s={[0.22, 0.06, 0.26]} c="#111827" r={0.8} />
          <Bx p={[0, 0.8, 0.28]} s={[0.4, 0.04, 0.05]} c={METAL} r={0.4} />
          <Bx p={[0, 0.9, 0.32]} s={[0.2, 0.1, 0.03]} m={glow.screen} />
        </>
      );
    case "yogamat":
      return <Bx s={[W, 0.02, D]} c={c} r={0.95} />;
    case "gymmirror":
      return (
        <>
          <Bx p={[0, 0.1, 0]} s={[W, H - 0.1, 0.04]} c="#2a2f3a" r={0.5} />
          <Bx p={[0, 0.16, 0.025]} s={[W - 0.12, H - 0.22, 0.01]} c="#cfe3ee" r={0.08} m={new THREE.MeshStandardMaterial({ color: "#cfe3ee", roughness: 0.05, metalness: 0.9 })} />
        </>
      );
    case "salonchair":
      return (
        <>
          <Cy r={0.26} h={0.05} c="#2a2f3a" seg={14} />
          <Cy p={[0, 0.05, 0]} r={0.05} h={0.34} c={METAL} seg={10} />
          <Bx p={[0, 0.38, 0]} s={[0.58, 0.12, 0.56]} c={c} r={0.5} />
          <Bx p={[0, 0.5, -0.24]} s={[0.56, 0.72, 0.1]} c={c} r={0.5} />
          <Bx p={[0, 1.18, -0.26]} s={[0.3, 0.12, 0.08]} c="#1f2937" r={0.6} />
          {[-1, 1].map((s) => <Bx key={s} p={[s * 0.3, 0.5, -0.02]} s={[0.06, 0.06, 0.4]} c="#111827" r={0.6} />)}
          <Bx p={[0, 0.06, 0.34]} s={[0.4, 0.04, 0.24]} c={METAL} r={0.4} />
        </>
      );
    case "dryer":
      return (
        <>
          <Cy r={0.22} h={0.05} c="#2a2f3a" seg={14} />
          <Cy p={[0, 0.05, 0]} r={0.035} h={1.3} c={METAL} seg={8} />
          <Sp p={[0, 1.5, 0]} r={0.3} c={c} sc={[1, 0.8, 1]} rough={0.35} />
          <Cy p={[0, 1.22, 0]} r={0.27} h={0.04} c="#e5e7eb" seg={16} />
        </>
      );
    case "mirrorstation":
      return (
        <>
          <Bx p={[0, 0.7, 0]} s={[W, 0.05, D]} c={LIGHT} r={0.6} />
          {[-1, 1].map((s) => <Bx key={s} p={[s * (W / 2 - 0.04), 0, 0]} s={[0.06, 0.7, D - 0.06]} c={DARK} />)}
          <Bx p={[0, 0.82, -D / 2 + 0.05]} s={[W - 0.1, 0.85, 0.04]} c="#cfe3ee" r={0.08} m={new THREE.MeshStandardMaterial({ color: "#cfe3ee", roughness: 0.05, metalness: 0.9 })} />
          {[-1, 1].flatMap((s) => [0, 1, 2].map((k) => <Sp key={`${s}${k}`} p={[s * (W / 2 - 0.06), 0.95 + k * 0.25, -D / 2 + 0.1]} r={0.04} c="#fff6d6" />))}
          {[0, 1, 2].map((i) => <Cy key={i} p={[-0.3 + i * 0.3, 0.75, 0.0]} r={0.035} h={0.18} c={["#7c3aed", "#0ea5e9", "#f59e0b"][i]} seg={8} />)}
        </>
      );
    case "espresso":
      return (
        <>
          <Bx s={[W, 0.9, D]} c={DARK} />
          <Bx p={[0, 0.9, 0]} s={[W, 0.04, D]} c="#d8d2c4" r={0.4} />
          <Bx p={[0, 0.94, -0.1]} s={[W - 0.2, 0.46, D - 0.28]} c="#9ca3af" r={0.3} />
          {[-0.18, 0.18].map((x) => <Cy key={x} p={[x, 0.98, 0.1]} r={0.04} h={0.1} c="#111827" seg={10} />)}
          {[-0.18, 0.18].map((x) => <Cy key={`c${x}`} p={[x, 0.94, 0.17]} r={0.04} h={0.07} c="#f4f1e6" seg={10} />)}
          <Bx p={[0, 1.2, 0.04]} s={[0.2, 0.1, 0.02]} m={glow.screen} />
        </>
      );
    case "menuboard":
      return (
        <group position={[0, item.y ?? 1.0, 0]}>
          <Bx p={[0, 0, 0]} s={[W, H, 0.06]} c="#1f2937" r={0.7} />
          {[0.8, 0.62, 0.44, 0.26].map((y, i) => (
            <group key={y}>
              <Bx p={[-W / 2 + 0.12 + 0.28, y, 0.03]} s={[0.55 - i * 0.05, 0.05, 0.01]} c="#f8fafc" r={0.9} />
              <Bx p={[W / 2 - 0.3, y, 0.03]} s={[0.2, 0.05, 0.01]} c="#fbbf24" r={0.9} />
            </group>
          ))}
        </group>
      );
    case "medshelf": {
      const boxes = ["#f8fafc", "#bae6fd", "#bbf7d0", "#fecaca", "#fef08a"];
      return (
        <>
          {[-1, 1].map((s) => <Bx key={s} p={[s * (W / 2 - 0.03), 0, 0]} s={[0.05, H, D]} c={METAL} r={0.4} />)}
          <Bx p={[0, 0, -D / 2 + 0.02]} s={[W, H, 0.03]} c="#e5e7eb" r={0.7} />
          {[0.15, 0.6, 1.05, 1.5].map((y, row) => (
            <group key={y}>
              <Bx p={[0, y, 0]} s={[W - 0.06, 0.03, D - 0.04]} c="#9ca3af" r={0.5} />
              {Array.from({ length: 9 }).map((_, i) => <Bx key={i} p={[-W / 2 + 0.18 + i * ((W - 0.36) / 8), y + 0.03, 0]} s={[0.1, 0.18 + ((i + row) % 3) * 0.05, 0.18]} c={boxes[(i + row) % boxes.length]} r={0.8} />)}
            </group>
          ))}
          <Bx p={[0, H - 0.02, 0.0]} s={[0.4, 0.1, 0.02]} c="#16a34a" r={0.6} />
        </>
      );
    }
    case "scale":
      return (
        <>
          <Bx s={[W, 0.05, D]} c="#e5e7eb" r={0.4} />
          <Bx p={[0.0, 0.05, 0.1]} s={[0.12, 0.02, 0.05]} m={glow.screen} />
        </>
      );
    case "trolley":
      return (
        <>
          <Bx p={[0, 0.3, 0]} s={[W - 0.1, 0.42, D - 0.2]} c="#cbd5e1" r={0.3} />
          <Bx p={[0, 0.74, -D / 2 + 0.12]} s={[W - 0.1, 0.05, 0.05]} c="#ef4444" r={0.5} />
          {[-1, 1].flatMap((sx) => [-1, 1].map((sz) => <Cy key={`${sx}${sz}`} p={[sx * (W / 2 - 0.1), 0.0, sz * (D / 2 - 0.16)]} r={0.04} h={0.08} c="#111827" seg={8} />))}
          <Bx p={[0, 0.55, 0]} s={[W - 0.16, 0.12, D - 0.28]} c="#fbbf24" r={0.8} />
        </>
      );
    case "freezer":
      return (
        <>
          <Bx s={[W, H - 0.12, D]} c="#f3f4f6" r={0.4} />
          <Bx p={[0, H - 0.12, 0]} s={[W - 0.06, 0.08, D - 0.06]} m={glass} />
          {Array.from({ length: 7 }).map((_, i) => <Bx key={i} p={[-W / 2 + 0.2 + i * ((W - 0.4) / 6), H - 0.3, -0.1 + (i % 2) * 0.16]} s={[0.14, 0.14, 0.14]} c={["#38bdf8", "#f472b6", "#fbbf24", "#34d399"][i % 4]} r={0.7} />)}
          <Bx p={[0, 0.0, D / 2 - 0.02]} s={[W - 0.1, 0.1, 0.03]} c="#9ca3af" r={0.5} />
        </>
      );
    case "wallart":
      return (
        <group position={[0, item.y ?? 1.5, 0]}>
          <Bx p={[0, -H / 2, 0]} s={[W + 0.08, H + 0.08, 0.05]} c="#3b2a1d" />
          <mesh position={[0, 0, 0.03]} material={artMat(c)}>
            <planeGeometry args={[W, H]} />
          </mesh>
        </group>
      );
    case "clock":
      return (
        <group position={[0, item.y ?? 1.9, 0]} rotation-x={Math.PI / 2}>
          <Cy r={0.2} h={0.04} c="#3b2a1d" seg={20} />
          <Cy p={[0, 0.04, 0]} r={0.17} h={0.01} c="#f4f0e4" seg={20} />
          <Bx p={[0, 0.05, 0.05]} s={[0.012, 0.004, 0.1]} c="#111" />
          <Bx p={[0.04, 0.05, 0]} s={[0.08, 0.004, 0.012]} c="#111" />
        </group>
      );
    case "pitch":
      return (
        <group>
          <mesh position={[0, 0.015, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[W, D]} />
            <meshStandardMaterial color="#58b66a" roughness={1} />
          </mesh>
          <Bx p={[0, 0.02, 0]} s={[0.05, 0.004, D]} c="#e9f7ec" />
          <mesh position={[0, 0.025, 0]} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.8, 0.85, 32]} />
            <meshBasicMaterial color="#e9f7ec" />
          </mesh>
        </group>
      );
    case "liftdoor":
      return (
        <>
          <Bx s={[W + 0.1, H + 0.05, 0.08]} c="#6b6e74" r={0.4} />
          {[-1, 1].map((s) => <Bx key={s} p={[s * (W / 4), 0.02, 0.05]} s={[W / 2 - 0.02, H - 0.05, 0.02]} c="#b8bcc2" r={0.3} />)}
        </>
      );
    default:
      return <Bx s={[W, H || 0.5, D]} c={WOOD} />;
  }
}

export default function FurnitureItem({ item, accent, trim, onUse }: { item: Item; accent: string; trim: string; onUse?: () => void }) {
  const def = FURN[item.kind];
  const W = item.w ?? def.w;
  const D = item.d ?? def.d;
  const c = item.c ?? accent;
  const c2 = item.c2 ?? trim;
  const body = useMemo(() => <Body item={item} W={W} D={D} c={c} c2={c2} />, [item, W, D, c, c2]);
  return (
    <group
      position={[item.x, item.kind === "radio" || item.kind === "calabash" || item.kind === "ibeji" ? (item.y ?? 0) : 0, item.z]}
      rotation-y={item.rot ?? 0}
      onClick={
        onUse && def.use
          ? (e) => {
              if (e.delta > 6) return;
              e.stopPropagation();
              onUse();
            }
          : undefined
      }
      onPointerOver={
        onUse && def.use
          ? (e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }
          : undefined
      }
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {body}
    </group>
  );
}
