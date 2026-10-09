"use client";

import Pitch from "./Pitch";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { PLACES, type Place } from "@/lib/places";
import { CAMPUS_PLACES } from "@/lib/world";
import { useGame } from "@/lib/store";
import { CIVIC_STYLES } from "./civicStyles";
import { beamMat, boardMat, boardMats, discoMat, facadeMaterials, lampMat, mat, neonMat, poolMat, shopGlow, signMat, windowMats } from "./materials";

type V3 = [number, number, number];

/* ------------------------------ primitives ------------------------------ */
/* All positions are the BOTTOM-centre of the shape unless noted. */

function Box({ p = [0, 0, 0], s, c, rough, rot }: { p?: V3; s: V3; c: string; rough?: number; rot?: V3 }) {
  return (
    <mesh position={[p[0], p[1] + s[1] / 2, p[2]]} rotation={rot} material={mat(c, rough)} castShadow receiveShadow>
      <boxGeometry args={s} />
    </mesh>
  );
}

function Cyl({ p = [0, 0, 0], r, r2, h, c, seg = 28, open = false, rough }: { p?: V3; r: number; r2?: number; h: number; c: string; seg?: number; open?: boolean; rough?: number }) {
  return (
    <mesh position={[p[0], p[1] + h / 2, p[2]]} material={open ? new THREE.MeshStandardMaterial({ color: c, roughness: 0.8, side: THREE.DoubleSide }) : mat(c, rough)} castShadow receiveShadow>
      <cylinderGeometry args={[r2 ?? r, r, h, seg, 1, open]} />
    </mesh>
  );
}

function Ball({ p, r, c, scale, half = false }: { p: V3; r: number; c: string; scale?: V3; half?: boolean }) {
  return (
    <mesh position={p} scale={scale} material={mat(c, 0.6)} castShadow>
      <sphereGeometry args={[r, 28, 18, 0, Math.PI * 2, 0, half ? Math.PI / 2 : Math.PI]} />
    </mesh>
  );
}

function Facade({ p = [0, 0, 0], w, h, d, tint }: { p?: V3; w: number; h: number; d: number; tint: string }) {
  const mats = useMemo(() => facadeMaterials(w, h, d, tint), [w, h, d, tint]);
  useEffect(() => {
    const glow = mats.filter((m): m is THREE.MeshStandardMaterial => !!(m as THREE.MeshStandardMaterial).emissiveMap);
    glow.forEach((m) => windowMats.add(m));
  }, [mats]);
  return (
    <mesh position={[p[0], p[1] + h / 2, p[2]]} material={mats} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
    </mesh>
  );
}

/** A glowing sign band (centre position). Shared per-colour material, so it brightens at night and fades with NEPA; `pulse` makes it breathe (clubs). */
function Glow({ p, s, c, pulse = false }: { p: V3; s: V3; c?: string; pulse?: boolean }) {
  return (
    <mesh position={p} material={c ? neonMat(c, pulse) : signMat} castShadow>
      <boxGeometry args={s} />
    </mesh>
  );
}

/** A flat lit panel (doorway, shop window, light strip) in one of the shared glowing materials. Centre position. */
function Lit({ p, s, m = lampMat }: { p: V3; s: V3; m?: THREE.Material }) {
  return (
    <mesh position={p} material={m}>
      <boxGeometry args={s} />
    </mesh>
  );
}

function Awning({ p, w, colors }: { p: V3; w: number; colors: [string, string] }) {
  const n = Math.max(2, Math.round(w / 0.28));
  const seg = w / n;
  return (
    <group position={p} rotation={[0.35, 0, 0]}>
      {Array.from({ length: n }).map((_, i) => (
        <mesh key={i} position={[-w / 2 + seg * (i + 0.5), 0, 0]} material={mat(colors[i % 2])} castShadow>
          <boxGeometry args={[seg, 0.05, 0.5]} />
        </mesh>
      ))}
    </group>
  );
}

function Column({ p, h = 0.9, r = 0.07 }: { p: V3; h?: number; r?: number }) {
  return <Cyl p={p} r={r} h={h} c="#f6f3ec" seg={14} />;
}

/* ---------------------------- night lighting ---------------------------- */
/* Shops, eateries and clubs carry their lights on shared materials (see materials.ts), so Lighting.tsx
   switches them all with the hour and NEPA. No real point lights: those would cost far too much. */

const noRaycast = () => null;
const WHITE = new THREE.Color("#ffffff");

/** `c` mixed towards white by k (0..1), as a hex string. */
const lighten = (c: string, k: number) => "#" + new THREE.Color(c).lerp(WHITE, k).getHexString();

/** x, z, half-width, half-depth of a pool of light, in the place's own space. */
type Spot = [number, number, number, number];

/** Soft pools of light on the pavement (flat and additive). All the spots of one colour merge into one mesh. */
function Pools({ spots, color = "#ffc27a", pulse = false }: { spots: Spot[]; color?: string; pulse?: boolean }) {
  const geo = useMemo(() => {
    const parts = spots.map(([x, z, rx, rz]) => new THREE.PlaneGeometry(rx * 2, rz * 2).rotateX(-Math.PI / 2).translate(x, 0.115, z));
    const merged = mergeGeometries(parts);
    parts.forEach((g) => g.dispose());
    return merged;
  }, [spots]);
  useEffect(() => () => geo?.dispose(), [geo]);
  if (!geo) return null;
  return <mesh geometry={geo} material={poolMat(color, pulse)} raycast={noRaycast} />;
}

const BULB = new THREE.SphereGeometry(0.035, 6, 4);
const WIRE = mat("#2b2724");
const NO_LAMPS: V3[] = [];

/** a and b are the ends of a sagging cable, with n bulbs strung along it. */
type Str = { a: V3; b: V3; sag: number; n: number };

/** Festival bulbs over markets and eateries (plus loose stall lamps): one instanced mesh of bulbs and one merged wire. */
function StringLights({ strings, lamps = NO_LAMPS }: { strings: Str[]; lamps?: V3[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const built = useMemo(() => {
    const bulbs: V3[] = [...lamps];
    const tubes: THREE.BufferGeometry[] = [];
    for (const { a, b, sag, n } of strings) {
      for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n;
        bulbs.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t - sag * 4 * t * (1 - t) - 0.03, a[2] + (b[2] - a[2]) * t]);
      }
      // a quadratic curve whose middle control point sits 2 x sag low passes sag below the chord at the middle
      const mid = new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - sag * 2, (a[2] + b[2]) / 2);
      tubes.push(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(...a), mid, new THREE.Vector3(...b)), 10, 0.008, 3));
    }
    const wire = tubes.length ? mergeGeometries(tubes) : null;
    tubes.forEach((g) => g.dispose());
    return { bulbs, wire };
  }, [strings, lamps]);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    built.bulbs.forEach(([x, y, z], i) => mesh.setMatrixAt(i, m.makeTranslation(x, y, z)));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [built]);
  useEffect(() => () => built.wire?.dispose(), [built]);
  return (
    <>
      <instancedMesh ref={ref} args={[BULB, lampMat, built.bulbs.length]} raycast={noRaycast} />
      {built.wire && <mesh geometry={built.wire} material={WIRE} raycast={noRaycast} />}
    </>
  );
}

const BEAM_LEN = 3;
/** A shaft of light that widens upwards and fades out at the top (vertex colours, since it is additive). */
const BEAM = (() => {
  const g = new THREE.CylinderGeometry(0.3, 0.02, BEAM_LEN, 10, 1, true).translate(0, BEAM_LEN / 2, 0);
  const pos = g.attributes.position;
  const col = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const k = 1 - pos.getY(i) / BEAM_LEN;
    col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = k * k;
  }
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return g;
})();

/** Two searchlights sweeping slowly over a club roof. */
function Beams({ p, colors }: { p: V3; colors: [string, string] }) {
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (a.current) {
      a.current.rotation.x = 0.3 * Math.cos(t * 0.45);
      a.current.rotation.z = 0.5 * Math.sin(t * 0.6);
    }
    if (b.current) {
      b.current.rotation.x = -0.3 * Math.cos(t * 0.4 + 2);
      b.current.rotation.z = -0.5 * Math.sin(t * 0.5 + 1);
    }
  });
  return (
    <group position={p}>
      <group ref={a} position={[-0.35, 0, 0]}>
        <mesh geometry={BEAM} material={beamMat(colors[0])} raycast={noRaycast} />
      </group>
      <group ref={b} position={[0.35, 0, 0]}>
        <mesh geometry={BEAM} material={beamMat(colors[1])} raycast={noRaycast} />
      </group>
    </group>
  );
}

/* -------------------------------- styles -------------------------------- */

type SP = { size: V3; color: string; name?: string; id?: string };

function Tower({ size: [w, h, d], color }: SP) {
  return (
    <>
      <Box s={[w + 0.5, 0.15, d + 0.5]} c="#d9d4c7" />
      <Facade p={[0, 0.15, 0]} w={w} h={h * 0.72} d={d} tint={color} />
      <Facade p={[0, 0.15 + h * 0.72, 0]} w={w * 0.72} h={h * 0.26} d={d * 0.72} tint={color} />
      <Box p={[0, 0.15 + h * 0.98, 0]} s={[w * 0.8, 0.1, d * 0.8]} c="#f1ede2" />
      <Cyl p={[0, 0.15 + h * 0.98, 0]} r={0.035} h={0.9} c="#b9b3a3" seg={8} />
      <Glow p={[0, 0.15 + h * 0.5, d / 2 + 0.02]} s={[w * 0.55, 0.16, 0.04]} c="#e8b04a" />
    </>
  );
}

function Hall({ size: [w, h, d], color }: SP) {
  return (
    <>
      <Box s={[w + 0.3, 0.14, d + 0.3]} c="#e6e1d4" />
      <Box p={[0, 0.14, 0]} s={[w, h * 0.55, d * 0.85]} c={color} rough={0.6} />
      {[-1, -0.6, -0.2, 0.2, 0.6, 1].map((k) => (
        <Column key={k} p={[(k * w) / 2.3, 0.14, d / 2 - 0.1]} h={h * 0.55} />
      ))}
      <Box p={[0, 0.14 + h * 0.55, 0.05]} s={[w + 0.15, 0.1, d * 0.95]} c="#efeadc" />
      <mesh position={[0, 0.14 + h * 0.55 + 0.1 + 0.2, d / 2 - 0.1]} rotation={[Math.PI / 2, Math.PI / 2, 0]} material={mat("#efeadc")} castShadow>
        <cylinderGeometry args={[0.38, 0.38, w * 0.78, 3]} />
      </mesh>
      <Cyl p={[0, 0.14 + h * 0.65, -0.2]} r={0.5} h={0.3} c="#efeadc" />
      <Ball p={[0, 0.14 + h * 0.65 + 0.3, -0.2]} r={0.5} c="#4aa39b" half />
      <Cyl p={[0, 0.14 + h * 0.65 + 0.8, -0.2]} r={0.02} h={0.35} c="#d6b44a" seg={6} />
    </>
  );
}

function Market({ size: [w, h, d], color, name = "Market" }: SP) {
  const n = Math.max(3, Math.round(w / 0.85));
  const stripes = [color, "#f6efe2"] as [string, string];
  const sign = useBoard(name, "#3a2616", "#ffd98a");
  // festival bulbs: along the front awnings, a lamp under each, and across the yard of the big markets
  const { strings, lamps } = useMemo(() => {
    const awn = 0.1 + h * 0.85;
    const strings: Str[] = [{ a: [-w / 2 + 0.1, awn - 0.1, d / 2 - 0.3], b: [w / 2 - 0.1, awn - 0.1, d / 2 - 0.3], sag: 0.1, n: Math.round(w / 0.3) }];
    if (d > 4) {
      for (const k of [-0.25, 0, 0.25]) strings.push({ a: [w * k, awn - 0.12, d / 2 - 0.3], b: [w * k, 0.1 + h * 0.8, -d / 2 + 1.4], sag: 0.3, n: Math.round((d - 1.7) / 0.3) });
    }
    const lamps: V3[] = Array.from({ length: n }, (_, i): V3 => [-w / 2 + (w / n) * (i + 0.5), awn - 0.07, d / 2 - 0.62]);
    return { strings, lamps };
  }, [w, h, d, n]);
  return (
    <>
      <Box s={[w + 0.3, 0.1, d + 0.3]} c="#cdbfa9" />
      {Array.from({ length: n }).map((_, i) => {
        const x = -w / 2 + (w / n) * (i + 0.5);
        const tone = ["#e0663a", "#2f9d77", "#e0a62a", "#6c7ae0", "#d9568e"][i % 5];
        return (
          <group key={i} position={[x, 0.1, d / 2 - 0.7]}>
            <Box s={[w / n - 0.12, 0.35, 0.55]} c="#8a5a3c" />
            <Box p={[0, 0.35, 0]} s={[w / n - 0.2, 0.12, 0.35]} c={tone} />
            <Box p={[(w / n) * 0.2, 0.35, 0.08]} s={[0.18, 0.2, 0.18]} c="#f1d27a" />
            <Awning p={[0, h * 0.85, 0.15]} w={w / n - 0.06} colors={[tone, "#f8f3e8"]} />
          </group>
        );
      })}
      {Array.from({ length: n }).map((_, i) => {
        const x = -w / 2 + (w / n) * (i + 0.5);
        return (
          <group key={`b${i}`} position={[x, 0.1, -d / 2 + 0.7]}>
            <Box s={[w / n - 0.12, h * 0.8, 0.9]} c={i % 2 ? "#f2e6cf" : "#e9d9ba"} />
            <Awning p={[0, h * 0.8, 0.5]} w={w / n - 0.06} colors={stripes} />
          </group>
        );
      })}
      {/* the lit gateway over the entrance, with the market's name */}
      {[-0.74, 0.74].map((x) => (
        <Box key={x} p={[x, 0.1, d / 2 + 0.3]} s={[0.06, h * 1.15 + 0.2, 0.06]} c="#5a3a24" />
      ))}
      <mesh position={[0, 0.1 + h * 1.15 + 0.02, d / 2 + 0.3]} material={sign} castShadow>
        <boxGeometry args={[1.48, 0.37, 0.05]} />
      </mesh>
      <StringLights strings={strings} lamps={lamps} />
    </>
  );
}

function Campus({ size: [w, h, d], color }: SP) {
  return (
    <>
      <Box s={[w + 0.5, 0.1, d + 0.5]} c="#dcd6c6" />
      <Facade p={[0, 0.1, 0]} w={w * 0.72} h={h} d={d} tint={color} />
      <Facade p={[-w * 0.4, 0.1, 0.2]} w={w * 0.3} h={h * 0.65} d={d * 0.75} tint={color} />
      <Box p={[0, 0.1 + h, 0]} s={[w * 0.74, 0.08, d + 0.08]} c="#f3efe5" />
      <Box p={[w * 0.2, 0.1 + h, 0]} s={[0.8, 1.5, 0.8]} c="#e9e1cf" />
      <Cyl p={[w * 0.2, 0.1 + h + 1.5, 0]} r={0.62} r2={0} h={0.75} c="#4c5fb5" seg={4} />
      <Glow p={[w * 0.2, 0.1 + h + 1.0, 0.42]} s={[0.36, 0.36, 0.04]} c="#fff1c4" />
      {[-0.7, -0.35, 0, 0.35].map((k) => (
        <Column key={k} p={[k * w * 0.6, 0.1, d / 2 + 0.05]} h={h * 0.5} r={0.05} />
      ))}
    </>
  );
}

/** A white ambulance with a red stripe and a flashing light bar. +z is forward. */
function Ambulance({ p, ry = 0 }: { p: V3; ry?: number }) {
  const bar = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (bar.current) bar.current.emissiveIntensity = Math.sin(clock.elapsedTime * 7) > 0 ? 1.4 : 0.15;
  });
  return (
    <group position={p} rotation-y={ry}>
      <Box p={[0, 0.12, 0]} s={[0.46, 0.34, 1.0]} c="#f7f7f7" />
      <Box p={[0, 0.12, 0.62]} s={[0.46, 0.22, 0.3]} c="#f7f7f7" />
      <Box p={[0, 0.3, 0.7]} s={[0.4, 0.12, 0.12]} c="#8fb6d6" />
      <Box p={[0, 0.2, 0]} s={[0.475, 0.06, 1.02]} c="#d63a3a" />
      <Box p={[0.236, 0.28, -0.1]} s={[0.01, 0.16, 0.05]} c="#d63a3a" />
      <Box p={[0.236, 0.28, -0.1]} s={[0.01, 0.05, 0.16]} c="#d63a3a" />
      <mesh position={[0, 0.5, 0.45]}>
        <boxGeometry args={[0.3, 0.05, 0.08]} />
        <meshStandardMaterial ref={bar} color="#3b6fd6" emissive="#3b6fd6" emissiveIntensity={0.4} />
      </mesh>
      {[-0.26, 0.26].flatMap((x) => [-0.32, 0.5].map((z) => <Cyl key={`${x}${z}`} p={[x, 0, z]} r={0.09} h={0.06} c="#1b1e24" seg={10} />))}
    </group>
  );
}

function Hospital({ size: [w, h, d], color }: SP) {
  const front = d / 2;
  return (
    <>
      <Box s={[w + 0.4, 0.1, d + 0.4]} c="#dfe5e8" />
      <Facade p={[0, 0.1, 0]} w={w} h={h} d={d} tint="#eef3f6" />
      <Facade p={[w * 0.3, 0.1 + h, 0]} w={w * 0.4} h={h * 0.5} d={d * 0.7} tint="#eef3f6" />
      <Box p={[0, h + 0.1, 0]} s={[w + 0.1, 0.08, d + 0.1]} c={color} />
      {/* big red cross on the front and on the roof */}
      <Box p={[-w * 0.2, h * 0.55, front + 0.03]} s={[0.12, 0.56, 0.04]} c="#e04848" />
      <Box p={[-w * 0.2 - 0.22, h * 0.55 + 0.22, front + 0.03]} s={[0.56, 0.12, 0.04]} c="#e04848" />
      <Box p={[-w * 0.3, h + 0.18, 0]} s={[0.1, 0.5, 0.1]} c="#e04848" />
      <Box p={[-w * 0.3 - 0.2, h + 0.18 + 0.2, 0]} s={[0.5, 0.1, 0.1]} c="#e04848" />
      {/* helipad on the upper block */}
      <Cyl p={[w * 0.3, h * 1.5 + 0.18, 0]} r={Math.min(w, d) * 0.16} h={0.03} c="#4a5361" seg={24} />
      <Box p={[w * 0.3 - 0.07, h * 1.5 + 0.21, -0.02]} s={[0.04, 0.01, 0.2]} c="#ffffff" />
      <Box p={[w * 0.3 + 0.07, h * 1.5 + 0.21, -0.02]} s={[0.04, 0.01, 0.2]} c="#ffffff" />
      <Box p={[w * 0.3, h * 1.5 + 0.21, -0.02]} s={[0.18, 0.01, 0.04]} c="#ffffff" />
      {/* main entrance with a canopy on pillars */}
      <Box p={[w * 0.2, 0.1, front + 0.1]} s={[0.9, 0.5, 0.5]} c="#f7f7f7" />
      <Box p={[w * 0.2, 0.74, front + 0.55]} s={[1.3, 0.06, 0.9]} c={color} />
      {[-0.55, 0.55].map((x) => (
        <Column key={x} p={[w * 0.2 + x, 0.1, front + 0.95]} h={0.64} r={0.04} />
      ))}
      <Glow p={[w * 0.2, 0.85, front + 0.55]} s={[1.0, 0.1, 0.04]} c="#e04848" />
      {/* emergency bay: its own ramp, an EMERGENCY sign and an ambulance waiting */}
      <Box p={[-w * 0.36, 0.1, front + 0.55]} s={[1.5, 0.02, 1.0]} c="#c9d2d8" />
      <Box p={[-w * 0.36, 0.1, front + 0.55]} s={[1.5, 0.005, 0.05]} c="#e04848" />
      <Glow p={[-w * 0.36, 0.7, front + 0.05]} s={[0.9, 0.18, 0.04]} c="#e04848" />
      <Ambulance p={[-w * 0.36, 0.12, front + 0.6]} />
      {/* a small car park to the side, with bays */}
      <Box p={[w / 2 + 1.0, 0.0, 0]} s={[1.6, 0.03, d * 0.9]} c="#5c6370" />
      {[-0.3, 0, 0.3].map((k) => (
        <Box key={k} p={[w / 2 + 1.0, 0.03, k * d]} s={[1.5, 0.005, 0.04]} c="#f4f1e6" />
      ))}
      <Box p={[w / 2 + 1.0, 0.03, -d * 0.15]} s={[0.5, 0.2, 0.9]} c="#4a90e2" />
      <Box p={[w / 2 + 1.0, 0.03, d * 0.18]} s={[0.5, 0.2, 0.9]} c="#e8e3d6" />
    </>
  );
}

function Mosque({ size: [w, h, d], color }: SP) {
  return (
    <>
      <Box s={[w + 0.4, 0.1, d + 0.4]} c="#e4dcc6" />
      <Box p={[0, 0.1, 0]} s={[w, h * 0.55, d]} c={color} rough={0.7} />
      <Cyl p={[0, 0.1 + h * 0.55, 0]} r={w * 0.38} h={0.18} c="#f3ecd6" />
      <Ball p={[0, 0.1 + h * 0.55 + 0.18, 0]} r={w * 0.38} c="#3f9b8f" half />
      <Cyl p={[0, 0.1 + h * 0.55 + 0.18 + w * 0.38, 0]} r={0.02} h={0.3} c="#d6b44a" seg={6} />
      <Cyl p={[w / 2 - 0.05, 0.1, d / 2 - 0.05]} r={0.17} r2={0.13} h={h * 1.25} c="#f3ecd6" seg={14} />
      <Ball p={[w / 2 - 0.05, 0.1 + h * 1.25 + 0.05, d / 2 - 0.05]} r={0.17} c="#3f9b8f" half />
      <Box p={[0, 0.1, d / 2 + 0.01]} s={[0.5, 0.65, 0.04]} c="#5c7f78" />
    </>
  );
}

function Church({ size: [w, h, d], color }: SP) {
  return (
    <>
      <Box s={[w + 0.4, 0.1, d + 0.4]} c="#d7cdb9" />
      <Box p={[0, 0.1, 0.3]} s={[w * 0.75, h * 0.55, d * 0.7]} c={color} />
      <mesh position={[0, 0.1 + h * 0.55 + 0.28, 0.3]} rotation={[0, 0, Math.PI / 2]} material={mat("#a85a3c")} castShadow>
        <cylinderGeometry args={[0.55, 0.55, d * 0.72, 3]} />
      </mesh>
      <Box p={[0, 0.1, -d / 2 + 0.55]} s={[0.95, h * 1.15, 0.95]} c={color} />
      <Cyl p={[0, 0.1 + h * 1.15, -d / 2 + 0.55]} r={0.7} r2={0} h={0.95} c="#a85a3c" seg={4} />
      <Box p={[0, 0.1 + h * 1.15 + 0.9, -d / 2 + 0.55]} s={[0.04, 0.3, 0.04]} c="#f5f1e6" />
      <Box p={[-0.1, 0.1 + h * 1.15 + 1.05, -d / 2 + 0.55]} s={[0.24, 0.04, 0.04]} c="#f5f1e6" />
      <Box p={[0, 0.1, d / 2 + 0.28]} s={[0.5, 0.8, 0.04]} c="#7a5a40" />
    </>
  );
}

function Stadium({ size: [w, h], color }: SP) {
  const r = w / 2;
  return (
    <>
      <Cyl r={r + 0.2} h={0.1} c="#cfd8d6" seg={48} />
      <mesh position={[0, 0.12, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[r - 0.9, 48]} />
        <meshStandardMaterial color="#58b66a" roughness={0.9} />
      </mesh>
      <Cyl p={[0, 0.1, 0]} r={r} h={h * 0.6} c={color} seg={48} open />
      <Cyl p={[0, 0.1, 0]} r={r - 0.8} h={h * 0.25} c="#e9efef" seg={48} open />
      <mesh position={[0, 0.1 + h * 0.6, 0]} rotation-x={-Math.PI / 2} material={mat("#3b4a52")}>
        <ringGeometry args={[r - 0.8, r, 48]} />
      </mesh>
      <Pitch />
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const x = Math.cos(a) * (r + 0.15);
        const z = Math.sin(a) * (r + 0.15);
        return (
          <group key={i} position={[x, 0, z]}>
            <Cyl r={0.05} h={h * 1.9} c="#9aa6ab" seg={8} />
            <Box p={[0, h * 1.9, 0]} s={[0.42, 0.14, 0.2]} c="#fffbe6" />
            <mesh position={[0, h * 1.9 + 0.07, 0.11]} material={lampMat}>
              <boxGeometry args={[0.36, 0.1, 0.02]} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function Park({ size: [w, , d] }: SP) {
  return (
    <>
      <mesh position={[0, 0.06, 0]} rotation-x={-Math.PI / 2} scale={[w / 2, d / 2, 1]} receiveShadow>
        <circleGeometry args={[1, 48]} />
        <meshStandardMaterial color="#9ad88f" roughness={1} />
      </mesh>
      <mesh position={[0.6, 0.075, -0.2]} rotation-x={-Math.PI / 2} scale={[w * 0.28, d * 0.22, 1]}>
        <circleGeometry args={[1, 40]} />
        <meshStandardMaterial color="#6fb7de" roughness={0.2} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation-x={-Math.PI / 2} scale={[w * 0.42, d * 0.42, 1]}>
        <ringGeometry args={[0.985, 1, 64]} />
        <meshBasicMaterial color="#efe8d4" />
      </mesh>
      {[
        [-1.5, 1.0, 1],
        [1.7, 1.2, 0.8],
        [-0.4, -1.5, 1.1],
        [-1.9, -0.7, 0.8],
        [1.5, -1.3, 0.9],
      ].map(([x, z, s], i) => (
        <group key={i} position={[x, 0.06, z]} scale={s}>
          <Cyl r={0.07} h={0.55} c="#7a5a3c" seg={8} />
          <Ball p={[0, 0.85, 0]} r={0.5} c={i % 2 ? "#4f9a4d" : "#5fae58"} />
        </group>
      ))}
      <Box p={[-0.2, 0.06, 1.6]} s={[0.8, 0.22, 0.2]} c="#9a6a45" />
    </>
  );
}

function Mall({ size: [w, h, d], color, name = "Mall" }: SP) {
  const sign = useBoard(name, "#b02a6c", "#ffffff");
  const front = d / 2;
  const top = 0.1 + h;
  const trim = neonMat("#fff1c4", false, 0);
  return (
    <>
      <Box s={[w + 0.4, 0.1, d + 0.4]} c="#d9d6d2" />
      <Facade p={[0, 0.1, 0]} w={w} h={h} d={d} tint={color} />
      <Box p={[0, top, 0]} s={[w + 0.1, 0.1, d + 0.1]} c="#f4eef2" />
      <Glow p={[0, top + 0.38, d / 2 - 0.1]} s={[w * 0.6, 0.4, 0.1]} c="#ff6fb1" />
      {/* the mall's name, lit, set into the pink sign */}
      <mesh position={[0, top + 0.38, d / 2 - 0.039]} material={sign}>
        <boxGeometry args={[w * 0.56, 0.32, 0.02]} />
      </mesh>
      <Box p={[0, 0.1, d / 2 + 0.3]} s={[1.5, 0.08, 0.6]} c="#2a2f3a" />
      <Box p={[-w * 0.35, 0.1, d / 2 + 0.22]} s={[0.1, 0.9, 0.1]} c="#2a2f3a" />
      <Box p={[w * 0.35, 0.1, d / 2 + 0.22]} s={[0.1, 0.9, 0.1]} c="#2a2f3a" />
      {/* the entrance canopy on those posts: light under it, a coloured edge on it */}
      <Box p={[0, 1.0, front + 0.25]} s={[w * 0.7 + 0.2, 0.06, 0.5]} c="#2a2f3a" />
      <Lit p={[0, 0.992, front + 0.25]} s={[w * 0.7, 0.015, 0.4]} />
      <mesh position={[0, 1.03, front + 0.515]} material={neonMat(color, false, 0)}>
        <boxGeometry args={[w * 0.7 + 0.2, 0.04, 0.03]} />
      </mesh>
      {/* a lit doorway and glowing shop windows either side of it */}
      <Lit p={[0, 0.2 + h * 0.17, front + 0.011]} s={[w * 0.14, h * 0.34, 0.02]} />
      {[-1, 1].map((k) => (
        <Lit key={k} p={[k * w * 0.28, 0.2 + h * 0.17, front + 0.011]} s={[w * 0.3, h * 0.34, 0.02]} m={shopGlow} />
      ))}
      {/* LED strips round the roof edge */}
      <mesh position={[0, top + 0.05, front + 0.06]} material={trim}>
        <boxGeometry args={[w + 0.1, 0.035, 0.02]} />
      </mesh>
      <mesh position={[0, top + 0.05, -front - 0.06]} material={trim}>
        <boxGeometry args={[w + 0.1, 0.035, 0.02]} />
      </mesh>
      {[-1, 1].map((k) => (
        <mesh key={k} position={[k * (w / 2 + 0.06), top + 0.05, 0]} material={trim}>
          <boxGeometry args={[0.02, 0.035, d + 0.1]} />
        </mesh>
      ))}
    </>
  );
}

/** Sign board with the restaurant's name, drawn once into a texture. */
function useSign(name: string, bg: string, fg: string) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 128;
    const g = c.getContext("2d")!;
    g.fillStyle = bg;
    g.fillRect(0, 0, 512, 128);
    g.fillStyle = "rgba(255,255,255,0.18)";
    g.fillRect(0, 0, 512, 10);
    g.fillStyle = fg;
    g.textAlign = "center";
    g.textBaseline = "middle";
    let size = 78;
    g.font = `800 ${size}px system-ui, sans-serif`;
    while (g.measureText(name).width > 470 && size > 28) {
      size -= 4;
      g.font = `800 ${size}px system-ui, sans-serif`;
    }
    g.fillText(name, 256, 68);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [name, bg, fg]);
}

/** The same sign as a lit board: full bright, dimmed when NEPA takes the light. Registers with the night controller while mounted. */
function useBoard(name: string, bg: string, fg: string) {
  const tex = useSign(name, bg, fg);
  const m = useMemo(() => boardMat(tex), [tex]);
  useEffect(() => {
    boardMats.add(m);
    return () => {
      boardMats.delete(m);
    };
  }, [m]);
  return m;
}

/** Restaurant brand colours: sign background, sign text, awning stripe. */
const BRANDS: Record<string, { bg: string; fg: string; stripe: string }> = {
  item7: { bg: "#e8532a", fg: "#ffffff", stripe: "#ffffff" },
  mrbiggs: { bg: "#d62f39", fg: "#ffe14d", stripe: "#ffe14d" },
  chickenrepublic: { bg: "#c8202f", fg: "#ffffff", stripe: "#ffd23f" },
  sweetsensation: { bg: "#ee7b22", fg: "#ffffff", stripe: "#3a2a1c" },
  kilimanjaro: { bg: "#e7a915", fg: "#2a1f08", stripe: "#d62f39" },
};

/** A modern fast-food restaurant: glass front, brand colours, a lit sign, an awning, a paved forecourt and parking. */
function Restaurant({ size: [w, h, d], color, name = "Restaurant", id = "" }: SP) {
  const brand = BRANDS[id] ?? { bg: color, fg: "#ffffff", stripe: "#ffffff" };
  const sign = useBoard(name, brand.bg, brand.fg);
  const front = d / 2;
  const lit = neonMat(brand.bg, false, 0); // the brand colour as light: fascia band and menu board
  return (
    <>
      {/* forecourt and parking */}
      <Box s={[w + 1.4, 0.06, d + 2.2]} c="#cfd3d8" p={[0, 0, 0.5]} />
      {[-0.45, -0.15, 0.15, 0.45].map((k) => (
        <Box key={k} p={[k * (w + 0.8), 0.06, front + 1.15]} s={[0.04, 0.005, 0.5]} c="#ffffff" />
      ))}
      {/* the building */}
      <Facade p={[0, 0.06, 0]} w={w} h={h} d={d} tint="#f7f4ee" />
      <Box p={[0, 0.06 + h, 0]} s={[w + 0.16, 0.1, d + 0.16]} c="#3a3f48" />
      {/* brand band under the roof: a lit fascia at night */}
      <mesh position={[0, 0.06 + h - 0.17, front + 0.01]} material={lit}>
        <boxGeometry args={[w + 0.02, 0.34, 0.03]} />
      </mesh>
      {/* big glass front, lit at night */}
      <Box p={[-w * 0.12, 0.06 + 0.12, front + 0.02]} s={[w * 0.62, h * 0.55, 0.04]} c="#8fc3de" rough={0.15} />
      <mesh position={[-w * 0.12, 0.06 + 0.12 + h * 0.28, front + 0.05]} material={lampMat}>
        <boxGeometry args={[w * 0.56, h * 0.42, 0.01]} />
      </mesh>
      {/* door, with its glass glowing */}
      <Box p={[w * 0.3, 0.06, front + 0.02]} s={[0.4, h * 0.52, 0.05]} c="#2b3038" />
      <Lit p={[w * 0.3, 0.06 + h * 0.25, front + 0.055]} s={[0.28, h * 0.44, 0.01]} />
      {/* the sign: a lit board on the roof edge, facing the street */}
      <mesh position={[0, 0.06 + h + 0.5, front - 0.1]} material={sign} castShadow>
        <boxGeometry args={[Math.min(w * 0.9, 2.6), 0.62, 0.08]} />
      </mesh>
      <Box p={[-0.5, 0.06 + h + 0.1, front - 0.1]} s={[0.05, 0.4, 0.05]} c="#3a3f48" />
      <Box p={[0.5, 0.06 + h + 0.1, front - 0.1]} s={[0.05, 0.4, 0.05]} c="#3a3f48" />
      <Awning p={[w * 0.3, 0.06 + h * 0.62, front + 0.28]} w={0.9} colors={[brand.bg, brand.stripe]} />
      <Lit p={[w * 0.3, 0.06 + h * 0.62 - 0.06, front + 0.2]} s={[0.8, 0.015, 0.2]} />
      {/* a lit menu stand and a small car in the car park */}
      <mesh position={[w * 0.46, 0.06 + 0.275, front + 0.7]} material={lit}>
        <boxGeometry args={[0.3, 0.55, 0.06]} />
      </mesh>
      <Box p={[-w * 0.2, 0.06, front + 1.2]} s={[0.55, 0.2, 0.95]} c="#4a90e2" />
      <Box p={[-w * 0.2, 0.26, front + 1.2]} s={[0.5, 0.14, 0.5]} c="#dfe9f2" />
    </>
  );
}

function Hotel({ size: [w, h, d], color, name = "Hotel" }: SP) {
  const sign = useBoard(name, "#2f3e4f", "#ffd27a");
  const crown = neonMat("#7cc4e8", false, 0);
  return (
    <>
      <Box s={[w + 0.4, 0.1, d + 0.4]} c="#d6dde4" />
      <Facade p={[0, 0.1, 0]} w={w} h={h} d={d} tint={color} />
      <Box p={[0, 0.1 + h, 0]} s={[w * 0.6, 0.35, d * 0.6]} c="#2f3e4f" />
      <Box p={[0, 0.1 + h, d * 0.2]} s={[w * 0.7, 0.08, d * 0.3]} c="#7cc4e8" />
      <Awning p={[0, 0.85, d / 2 + 0.28]} w={1.6} colors={["#2f3e4f", "#f1e7cf"]} />
      <Glow p={[0, h * 0.8, d / 2 + 0.03]} s={[1.3, 0.2, 0.04]} c="#ffd27a" />
      {/* the hotel's name under the gold band */}
      <mesh position={[0, h * 0.8 - 0.28, d / 2 + 0.03]} material={sign}>
        <boxGeometry args={[1.3, 0.3, 0.03]} />
      </mesh>
      {/* lit lobby: a glowing doorway under the awning and a window either side */}
      <Lit p={[0, 0.1 + 0.35, d / 2 + 0.012]} s={[0.6, 0.7, 0.02]} />
      {[-1, 1].map((k) => (
        <Lit key={k} p={[k * 0.85, 0.1 + 0.45, d / 2 + 0.012]} s={[0.55, 0.6, 0.02]} m={shopGlow} />
      ))}
      <Lit p={[0, 0.83, d / 2 + 0.2]} s={[1.4, 0.015, 0.3]} />
      {/* a blue light line under the roof edge */}
      <mesh position={[0, 0.1 + h - 0.04, d / 2 + 0.012]} material={crown}>
        <boxGeometry args={[w + 0.02, 0.04, 0.02]} />
      </mesh>
      {[-1, 1].map((k) => (
        <mesh key={k} position={[k * (w / 2 + 0.012), 0.1 + h - 0.04, 0]} material={crown}>
          <boxGeometry args={[0.02, 0.04, d]} />
        </mesh>
      ))}
    </>
  );
}

function Lookout({ size: [w, h], color }: SP) {
  return (
    <>
      <Cyl r={w * 0.95} h={0.16} c="#d9d1c0" seg={20} />
      <Cyl p={[0, 0.16, 0]} r={w * 0.5} r2={w * 0.34} h={h * 0.8} c={color} seg={20} />
      {/* viewing deck: a wide balcony ring with a railing, where visitors stand */}
      <Cyl p={[0, 0.16 + h * 0.8 - 0.06, 0]} r={1.5} h={0.1} c="#cdb48f" seg={32} />
      <Cyl p={[0, 0.16 + h * 0.8 - 0.3, 0]} r={1.05} r2={1.45} h={0.24} c="#b9855a" seg={32} />
      <mesh position={[0, 0.16 + h * 0.8 + 0.52, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.46, 0.025, 8, 48]} />
        <meshStandardMaterial color="#7a5a40" roughness={0.6} />
      </mesh>
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return <Cyl key={i} p={[Math.cos(a) * 1.46, 0.16 + h * 0.8 + 0.04, Math.sin(a) * 1.46]} r={0.018} h={0.48} c="#7a5a40" seg={6} />;
      })}
      <Cyl p={[0, 0.16 + h * 0.8, 0]} r={w * 0.62} h={0.34} c="#cdb48f" seg={20} />
      <Cyl p={[0, 0.16 + h * 0.8 + 0.34, 0]} r={w * 0.7} r2={0} h={0.5} c="#a85a3c" seg={20} />
      <Cyl p={[0, 0.16 + h * 0.8 + 0.84, 0]} r={0.015} h={0.4} c="#5a5a5a" seg={6} />
      <Box p={[0.1, 0.16 + h * 0.8 + 1.05, 0]} s={[0.22, 0.14, 0.02]} c="#2f9d77" />
    </>
  );
}

function Eatery({ size: [w, h, d], color, name = "Eatery" }: SP) {
  const sign = useBoard(name, color, "#ffffff");
  const front = -0.2 + d * 0.35; // front face of the building
  // a string of bulbs along the awning's edge
  const strings = useMemo(() => {
    const half = (w - 0.2) / 2 - 0.05;
    const y = h * 0.8 - 0.12;
    return [{ a: [-half, y, d / 2 + 0.04], b: [half, y, d / 2 + 0.04], sag: 0.07, n: Math.round((w - 0.2) / 0.25) }] as Str[];
  }, [w, h, d]);
  return (
    <>
      <Box s={[w + 0.6, 0.08, d + 0.9]} c="#e8dcc4" />
      <Box p={[0, 0.08, -0.2]} s={[w, h, d * 0.7]} c="#f4ead3" />
      <Box p={[0, 0.08 + h, -0.2]} s={[w + 0.15, 0.1, d * 0.7 + 0.15]} c={color} />
      <Awning p={[0, h * 0.8, d / 2 - 0.2]} w={w - 0.2} colors={[color, "#f8f3e8"]} />
      <Glow p={[0, h * 0.5, d / 2 - 0.25]} s={[w * 0.5, 0.2, 0.04]} c="#ffb347" />
      {/* the name on a lit board standing on the roof, a glowing door and warm windows either side of it */}
      <mesh position={[0, 0.08 + h + 0.1 + 0.2, front - 0.02]} material={sign} castShadow>
        <boxGeometry args={[1.6, 0.4, 0.05]} />
      </mesh>
      <Lit p={[0, 0.08 + h * 0.21, front + 0.011]} s={[0.3, h * 0.42, 0.02]} />
      {[-1, 1].map((k) => (
        <Lit key={k} p={[k * w * 0.3, 0.08 + h * 0.36, front + 0.011]} s={[w * 0.28, h * 0.36, 0.02]} m={shopGlow} />
      ))}
      {[-0.9, 0.9].map((x) => (
        <group key={x} position={[x, 0.08, d / 2 + 0.55]}>
          <Cyl r={0.02} h={0.85} c="#8a7a64" seg={6} />
          <Cyl p={[0, 0.85, 0]} r={0.42} r2={0.02} h={0.22} c={x < 0 ? "#e0663a" : color} seg={12} />
          <Cyl p={[0, 0, 0]} r={0.22} h={0.03} c="#f2ebd9" seg={14} />
        </group>
      ))}
      <StringLights strings={strings} />
    </>
  );
}

function Amusement({ size: [w, h], color }: SP) {
  const wheel = useRef<THREE.Group>(null);
  const pods = useRef<(THREE.Group | null)[]>([]);
  const R = h * 0.4;
  useFrame((_, dt) => {
    if (!wheel.current) return;
    wheel.current.rotation.z -= dt * 0.35;
    for (const p of pods.current) if (p) p.rotation.z = -wheel.current.rotation.z;
  });
  const podColors = ["#e85d9a", "#f0b429", "#4cc2b0", "#6c7ae0", "#e0663a", "#8bd45a"];
  return (
    <>
      <Box s={[w, 0.08, w * 0.9]} c="#e8d9ea" />
      <group position={[0, R + 0.45, -0.1]}>
        <group ref={wheel}>
          <mesh material={mat(color, 0.5)} castShadow>
            <torusGeometry args={[R, 0.045, 10, 48]} />
          </mesh>
          <mesh material={mat("#f4ecf1", 0.5)}>
            <torusGeometry args={[R * 0.55, 0.03, 8, 40]} />
          </mesh>
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <group key={i}>
                <mesh rotation={[0, 0, a]} material={mat("#f4ecf1")}>
                  <boxGeometry args={[R * 2, 0.025, 0.025]} />
                </mesh>
                <group ref={(el) => { pods.current[i] = el; }} position={[Math.cos(a) * R, Math.sin(a) * R, 0]}>
                  <mesh position={[0, -0.14, 0]} material={mat(podColors[i])} castShadow>
                    <boxGeometry args={[0.26, 0.22, 0.26]} />
                  </mesh>
                </group>
              </group>
            );
          })}
          <mesh material={mat("#f4ecf1")}>
            <cylinderGeometry args={[0.08, 0.08, 0.3, 12]} />
          </mesh>
        </group>
      </group>
      <Box p={[-R * 0.55, 0, -0.1]} s={[0.07, R + 0.45, 0.07]} c="#f4ecf1" rot={[0, 0, -0.35]} />
      <Box p={[R * 0.55, 0, -0.1]} s={[0.07, R + 0.45, 0.07]} c="#f4ecf1" rot={[0, 0, 0.35]} />
      <Box p={[w * 0.28, 0.08, w * 0.3]} s={[0.55, 0.5, 0.45]} c={color} />
      <Awning p={[w * 0.28, 0.5, w * 0.3 + 0.28]} w={0.55} colors={["#f4ecf1", color]} />
    </>
  );
}

function Zoo({ size: [w, , d], color }: SP) {
  return (
    <>
      <mesh position={[0, 0.05, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color={color} roughness={1} />
      </mesh>
      {[-1, 1].map((k) => (
        <group key={k}>
          <Box p={[0, 0.05, (k * d) / 2]} s={[w, 0.35, 0.05]} c="#8a6a48" />
          <Box p={[(k * w) / 2, 0.05, 0]} s={[0.05, 0.35, d]} c="#8a6a48" />
        </group>
      ))}
      <Ball p={[-0.8, 0.45, 0]} r={0.36} c="#9aa0a6" scale={[1.2, 1, 1]} />
      <Cyl p={[-0.35, 0.3, 0.1]} r={0.06} r2={0.04} h={0.3} c="#9aa0a6" seg={8} />
      <Ball p={[0.7, 0.3, 0.4]} r={0.22} c="#d9a23a" />
      <Ball p={[0.95, 0.24, -0.35]} r={0.16} c="#6b4a2f" />
      <Cyl p={[0.2, 0.05, -0.6]} r={0.3} h={0.03} c="#6fb7de" seg={20} />
    </>
  );
}

function Terminal({ size: [w, , d], color }: SP) {
  const bus = (x: number, z: number, c: string, i: number) => (
    <group key={i} position={[x, 0, z]}>
      <Box p={[0, 0.1, 0]} s={[1.5, 0.5, 0.6]} c={c} />
      <Box p={[0, 0.6, 0]} s={[1.4, 0.04, 0.55]} c="#2a2f3a" />
      <Box p={[0, 0.3, 0.301]} s={[1.5, 0.08, 0.01]} c="#1e222b" />
      {[-0.5, 0.5].map((wx) => (
        <mesh key={wx} position={[wx, 0.1, 0.3]} rotation-x={Math.PI / 2} material={mat("#1e222b")}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 14]} />
        </mesh>
      ))}
    </group>
  );
  return (
    <>
      <Box s={[w, 0.06, d]} c="#59606b" />
      {[-w / 2 + 0.2, w / 2 - 0.2].map((x) => (
        <Box key={x} p={[x, 0.06, -d / 2 + 0.2]} s={[0.07, 1.1, 0.07]} c="#8c8f95" />
      ))}
      <Box p={[0, 1.16, -d / 2 + 0.2]} s={[w - 0.2, 0.08, 0.8]} c={color} />
      {bus(-0.8, 0.5, "#f2b632", 0)}
      {bus(0.9, -0.3, "#f2b632", 1)}
      <group position={[w / 2 - 0.5, 0, d / 2 - 0.35]}>
        <Box p={[0, 0.08, 0]} s={[0.45, 0.28, 0.3]} c="#2f9d77" />
        <Box p={[0, 0.34, 0]} s={[0.5, 0.05, 0.34]} c="#f4f4f2" />
      </group>
      <Glow p={[0, 1.4, -d / 2 + 0.2]} s={[w * 0.6, 0.18, 0.05]} c="#ffd27a" />
    </>
  );
}

function Golf({ size: [w, , d] }: SP) {
  return (
    <>
      <mesh position={[0, 0.06, 0]} rotation-x={-Math.PI / 2} scale={[w / 2, d / 2, 1]} receiveShadow>
        <circleGeometry args={[1, 40]} />
        <meshStandardMaterial color="#7cc46a" roughness={1} />
      </mesh>
      <mesh position={[0.5, 0.075, 0.3]} rotation-x={-Math.PI / 2} scale={[0.7, 0.55, 1]}>
        <circleGeometry args={[1, 28]} />
        <meshStandardMaterial color="#9bde86" roughness={1} />
      </mesh>
      <mesh position={[-0.9, 0.08, 0.6]} rotation-x={-Math.PI / 2} scale={[0.4, 0.3, 1]}>
        <circleGeometry args={[1, 20]} />
        <meshStandardMaterial color="#efe2b4" roughness={1} />
      </mesh>
      <Cyl p={[0.5, 0.07, 0.3]} r={0.012} h={0.8} c="#f4f4f2" seg={6} />
      <Box p={[0.55, 0.7, 0.3]} s={[0.22, 0.14, 0.01]} c="#e04848" />
      <Box p={[-w / 2 + 0.7, 0.06, -d / 2 + 0.6]} s={[0.9, 0.45, 0.6]} c="#f4efe3" />
      <Box p={[-w / 2 + 0.7, 0.51, -d / 2 + 0.6]} s={[1, 0.08, 0.7]} c="#a85a3c" />
    </>
  );
}

function Govt({ size: [w, h, d], color }: SP) {
  return (
    <>
      <Box s={[w + 0.5, 0.12, d + 0.5]} c="#dedbd2" />
      <Box p={[0, 0.12, 0]} s={[w, h * 0.7, d * 0.8]} c={color} rough={0.6} />
      <Box p={[0, 0.12 + h * 0.7, 0]} s={[w + 0.1, 0.1, d * 0.85]} c="#e4ded0" />
      {[-0.4, -0.2, 0, 0.2, 0.4].map((k) => (
        <Column key={k} p={[k * w, 0.12, d / 2 - 0.15]} h={h * 0.7} r={0.08} />
      ))}
      <mesh position={[0, 0.12 + h * 0.7 + 0.3, d / 2 - 0.2]} rotation={[Math.PI / 2, Math.PI / 2, 0]} material={mat("#e4ded0")} castShadow>
        <cylinderGeometry args={[0.32, 0.32, w * 0.6, 3]} />
      </mesh>
      <Ball p={[0, 0.12 + h * 0.8, -0.2]} r={0.5} c="#e4ded0" half />
      <Cyl p={[w / 2 + 0.1, 0.12, d / 2]} r={0.02} h={1.6} c="#bfc3c7" seg={6} />
      <Box p={[w / 2 + 0.2, 1.45, d / 2]} s={[0.18, 0.28, 0.02]} c="#1f9d55" />
      <Box p={[w / 2 + 0.38, 1.45, d / 2]} s={[0.18, 0.28, 0.02]} c="#f4f4f2" />
      <Box p={[w / 2 + 0.56, 1.45, d / 2]} s={[0.18, 0.28, 0.02]} c="#1f9d55" />
    </>
  );
}

function Cultural({ size: [w, h, d], color }: SP) {
  const r = Math.min(w, d) * 0.46;
  return (
    <>
      <Cyl r={r + 0.3} h={0.08} c="#e8d8bd" seg={36} />
      <Cyl p={[0, 0.08, 0]} r={r} h={h * 0.65} c="#f1e2c6" seg={36} />
      <Cyl p={[0, 0.08 + h * 0.3, 0]} r={r + 0.02} h={0.12} c={color} seg={36} />
      <Cyl p={[0, 0.08 + h * 0.55, 0]} r={r + 0.02} h={0.1} c="#2f9d77" seg={36} />
      <Cyl p={[0, 0.08 + h * 0.65, 0]} r={r + 0.25} r2={0.05} h={h * 0.7} c="#d9a23a" seg={36} />
      {[-0.9, 0.9].map((x, i) => (
        <group key={x} position={[x * 0.8, 0.08, d / 2 + 0.2]}>
          <Cyl r={0.17} r2={0.12} h={0.4} c={i ? "#e0663a" : "#8a5a3c"} seg={14} />
          <Cyl p={[0, 0.4, 0]} r={0.17} h={0.03} c="#f1e2c6" seg={14} />
        </group>
      ))}
    </>
  );
}

function Airport({ size: [w, h, d], color }: SP) {
  return (
    <>
      {/* apron and runway in front of the terminal */}
      <Box s={[w + 1.2, 0.06, d + 4.2]} c="#a3abb5" />
      <Box p={[0, 0.06, d / 2 + 2.9]} s={[w + 1, 0.03, 1.3]} c="#3a3f47" />
      {Array.from({ length: 7 }, (_, i) => (
        <Box key={i} p={[-w / 2 + 0.4 + i * (w / 6.4), 0.09, d / 2 + 2.9]} s={[0.35, 0.01, 0.05]} c="#f4f1e6" />
      ))}
      {/* terminal */}
      <Box p={[0, 0.06, 0]} s={[w, h, d]} c={color} />
      <Box p={[0, 0.06 + h, 0]} s={[w + 0.3, 0.08, d + 0.3]} c="#e8edf3" />
      <Box p={[0, 0.06 + h * 0.3, d / 2 + 0.02]} s={[w * 0.9, h * 0.5, 0.04]} c="#7cc4e8" />
      <Awning p={[0, h * 0.75, d / 2 + 0.3]} w={w * 0.5} colors={["#0ea5e9", "#f8f3e8"]} />
      {/* control tower */}
      <Cyl p={[w / 2 - 0.7, 0.06, -d / 2 + 0.5]} r={0.26} h={h * 1.9} c="#dfe5ec" seg={12} />
      <Cyl p={[w / 2 - 0.7, 0.06 + h * 1.9, -d / 2 + 0.5]} r={0.5} r2={0.38} h={0.38} c="#7cc4e8" seg={12} />
      <Cyl p={[w / 2 - 0.7, 0.06 + h * 1.9 + 0.38, -d / 2 + 0.5]} r={0.55} h={0.07} c="#e8edf3" seg={12} />
      <Glow p={[w / 2 - 0.7, 0.06 + h * 1.9 + 0.5, -d / 2 + 0.5]} s={[0.08, 0.08, 0.08]} c="#ff4d4d" />
      {/* a parked plane */}
      <group position={[-w * 0.18, 0.2, d / 2 + 2.9]}>
        <mesh rotation-z={Math.PI / 2} material={mat("#f5f7fa")} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 2.3, 14]} />
        </mesh>
        <mesh position={[1.2, 0, 0]} material={mat("#f5f7fa")}>
          <sphereGeometry args={[0.2, 14, 10]} />
        </mesh>
        <Box p={[-0.1, -0.05, -0.02]} s={[0.55, 0.04, 2.3]} c="#d7dde4" />
        <Box p={[-1.0, 0.1, 0]} s={[0.1, 0.5, 0.05]} c="#0ea5e9" />
        <Box p={[-1.0, 0.1, 0]} s={[0.34, 0.04, 0.9]} c="#d7dde4" />
        <Box p={[0, 0.02, 0.2]} s={[2.0, 0.05, 0.01]} c="#0ea5e9" />
      </group>
    </>
  );
}

function Club({ size: [w, h, d], color, name = "Club" }: SP) {
  const sign = useBoard(name, "#12091c", "#ffffff");
  const cyan = "#22d3ee";
  const glowPools = useMemo<Spot[]>(() => [[0, d / 2 + 1.0, w * 0.5, 1.0]], [w, d]);
  const doorH = Math.min(0.62, h * 0.4);
  const boardW = Math.min(w * 0.5 - 0.2, 1.2);
  const th = 0.07;
  return (
    <>
      <Box s={[w + 0.5, 0.08, d + 0.8]} c="#2a2330" />
      <Box p={[0, 0.08, 0]} s={[w, h, d]} c="#241c2e" />
      <Box p={[0, 0.08 + h, 0]} s={[w + 0.15, 0.1, d + 0.15]} c="#15101c" />
      {/* neon bands and a sign, breathing slowly once it is dark */}
      <Glow p={[0, 0.08 + h * 0.82, d / 2 + 0.03]} s={[w * 0.9, 0.12, 0.04]} c={color} pulse />
      <Glow p={[0, 0.08 + h * 0.18, d / 2 + 0.03]} s={[w * 0.9, 0.08, 0.04]} c={cyan} pulse />
      <Glow p={[0, 0.08 + h * 0.5, d / 2 + 0.03]} s={[w * 0.5, 0.3, 0.04]} c={color} pulse />
      <mesh position={[0, 0.08 + h * 0.5, d / 2 + 0.06]} material={sign}>
        <boxGeometry args={[boardW, boardW / 4, 0.02]} />
      </mesh>
      <Awning p={[0, h * 0.62, d / 2 + 0.3]} w={1.4} colors={[color, "#15101c"]} />
      {/* the doorway: a coloured light inside a cyan frame */}
      <Glow p={[0, 0.08 + doorH / 2, d / 2 + 0.065]} s={[0.5, doorH, 0.02]} c={color} pulse />
      {[-0.27, 0.27].map((x) => (
        <Glow key={x} p={[x, 0.08 + doorH / 2 + 0.02, d / 2 + 0.065]} s={[0.04, doorH + 0.04, 0.03]} c={cyan} pulse />
      ))}
      <Glow p={[0, 0.08 + doorH + 0.02, d / 2 + 0.065]} s={[0.58, 0.04, 0.03]} c={cyan} pulse />
      {/* light bands wrap round the sides and the back too, so the club glows from every angle */}
      {[-1, 1].map((k) => (
        <group key={k}>
          <Glow p={[k * (w / 2 + 0.012), 0.08 + h * 0.82, 0]} s={[0.024, th, d * 0.92]} c={color} pulse />
          <Glow p={[k * (w / 2 + 0.012), 0.08 + h * 0.18, 0]} s={[0.024, th, d * 0.92]} c={cyan} pulse />
        </group>
      ))}
      <Glow p={[0, 0.08 + h * 0.82, -d / 2 - 0.012]} s={[w * 0.92, th, 0.024]} c={color} pulse />
      <Glow p={[0, 0.08 + h * 0.18, -d / 2 - 0.012]} s={[w * 0.92, th, 0.024]} c={cyan} pulse />
      {/* rooftop mirror ball (it sparkles on the beat) and speakers */}
      <mesh position={[0, 0.08 + h + 0.34, 0]} material={discoMat} castShadow>
        <icosahedronGeometry args={[0.24, 1]} />
      </mesh>
      <Cyl p={[0, 0.08 + h, 0]} r={0.02} h={0.12} c="#6b6b7a" seg={6} />
      <Box p={[-w / 2 - 0.12, 0.08, d / 2 - 0.2]} s={[0.22, 0.5, 0.22]} c="#0f0b14" />
      <Box p={[w / 2 + 0.12, 0.08, d / 2 - 0.2]} s={[0.22, 0.5, 0.22]} c="#0f0b14" />
      <Glow p={[-w / 2 - 0.12, 0.38, d / 2 - 0.08]} s={[0.12, 0.12, 0.02]} c={cyan} pulse />
      <Glow p={[w / 2 + 0.12, 0.38, d / 2 - 0.08]} s={[0.12, 0.12, 0.02]} c={cyan} pulse />
      <Beams p={[0, 0.08 + h + 0.1, -d * 0.1]} colors={[lighten(color, 0.4), cyan]} />
      <Pools spots={glowPools} color={lighten(color, 0.35)} pulse />
    </>
  );
}

const STYLES: Record<Place["style"], (p: SP) => React.ReactNode> = {
  ...CIVIC_STYLES,
  airport: Airport,
  club: Club,
  tower: Tower,
  hall: Hall,
  market: Market,
  campus: Campus,
  hospital: Hospital,
  mosque: Mosque,
  church: Church,
  stadium: Stadium,
  park: Park,
  mall: Mall,
  hotel: Hotel,
  lookout: Lookout,
  eatery: Eatery,
  restaurant: Restaurant,
  amusement: Amusement,
  zoo: Zoo,
  terminal: Terminal,
  golf: Golf,
  govt: Govt,
  cultural: Cultural,
};

/* ------------------------------- wrapper -------------------------------- */

/** Street furniture that makes every public place feel lived in: lamps at the front, a bench, and for food places, umbrella tables. */
function Extras({ place }: { place: Place }) {
  const [w, , d] = place.size;
  const front = d / 2 + 0.55;
  const food = place.style === "eatery" || place.style === "market" || place.style === "restaurant";
  // light on the pavement at the places people go to shop, eat and party: under the lamp posts, and in front of the door or yard
  const lively = place.kind === "shop" || place.kind === "food" || place.kind === "night";
  const pools = useMemo(() => {
    const out: Spot[] = lively ? [-1, 1].map((k): Spot => [k * (w / 2 + 0.2), d / 2 + 0.55, 0.9, 0.9]) : [];
    switch (place.style) {
      case "market":
        out.push([0, d / 2 + 0.8, w * 0.52, 1.1], [0, 0.1, w * 0.45, Math.max(0.6, (d - 1.8) / 2)]);
        break;
      case "mall":
        out.push([0, d / 2 + 0.95, w * 0.45, 1.0]);
        break;
      case "restaurant":
        out.push([0, d / 2 + 1.0, w * 0.55, 1.1]);
        break;
      case "eatery":
        out.push([0, d / 2 + 0.75, w * 0.55, 0.85]);
        break;
      case "hotel":
        out.push([0, d / 2 + 0.9, 1.4, 0.9]);
        break;
    }
    return out;
  }, [lively, place.style, w, d]);
  return (
    <>
      {pools.length > 0 && <Pools spots={pools} />}
      {[-1, 1].map((k) => (
        <group key={k} position={[k * (w / 2 + 0.2), 0, front]}>
          <mesh position={[0, 0.45, 0]} material={mat("#444b55")}>
            <cylinderGeometry args={[0.025, 0.035, 0.9, 6]} />
          </mesh>
          <mesh position={[0, 0.93, 0]} material={lampMat}>
            <sphereGeometry args={[0.08, 8, 6]} />
          </mesh>
        </group>
      ))}
      <group position={[-w * 0.28, 0, front + 0.05]}>
        <mesh position={[0, 0.17, 0]} material={mat("#8a5a34")}>
          <boxGeometry args={[0.7, 0.05, 0.22]} />
        </mesh>
        <mesh position={[0, 0.07, 0]} material={mat("#444b55")}>
          <boxGeometry args={[0.6, 0.14, 0.16]} />
        </mesh>
      </group>
      {food &&
        [-0.3, 0.3].map((k) => (
          <group key={k} position={[w * k, 0, front + 0.55]}>
            <mesh position={[0, 0.2, 0]} material={mat("#f4f1e6")}>
              <cylinderGeometry args={[0.2, 0.2, 0.04, 12]} />
            </mesh>
            <mesh position={[0, 0.1, 0]} material={mat("#6b7380")}>
              <cylinderGeometry args={[0.025, 0.025, 0.2, 6]} />
            </mesh>
            <mesh position={[0, 0.62, 0]} material={mat(k < 0 ? "#d63a3a" : "#f2b632")}>
              <coneGeometry args={[0.42, 0.18, 10]} />
            </mesh>
            <mesh position={[0, 0.38, 0]} material={mat("#6b7380")}>
              <cylinderGeometry args={[0.015, 0.015, 0.5, 6]} />
            </mesh>
          </group>
        ))}
    </>
  );
}

function PlaceBuilding({ place }: { place: Place }) {
  const selected = useGame((s) => s.selected);
  const atPlace = useGame((s) => s.atPlace);
  const group = useRef<THREE.Group>(null);
  const hovered = useRef(false);
  const isSel = selected?.type === "place" && selected.id === place.id;
  const Style = STYLES[place.style];
  const [w, , d] = place.size;
  const ring = Math.max(w, d) * 0.62 + 0.5;

  useFrame((_, dt) => {
    if (!group.current) return;
    const target = hovered.current ? 0.12 : 0;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, target, 10, dt);
  });

  return (
    <group position={[place.pos[0], 0, place.pos[1]]}>
      <group
        ref={group}
        onPointerOver={(e) => {
          e.stopPropagation();
          hovered.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hovered.current = false;
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          if (e.delta > 6) return;
          e.stopPropagation();
          useGame.getState().select({ type: "place", id: place.id });
        }}
      >
        <Style size={place.size} color={place.color} name={place.name} id={place.id} />
        {/* the civic styles bring their own lamps and flags */}
        {!(place.style in CIVIC_STYLES) && <Extras place={place} />}
      </group>
      {(isSel || atPlace === place.id) && (
        <mesh position={[0, 0.05, 0]} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[ring, ring + 0.09, 56]} />
          <meshBasicMaterial color={atPlace === place.id ? "#10b981" : "#f59e0b"} transparent opacity={0.9} />
        </mesh>
      )}
    </group>
  );
}

export default function Buildings() {
  // the campus buildings only appear once you have come in through a gate
  const campus = useGame((s) => s.campus);
  return (
    <>
      {PLACES.filter((p) => campus || !CAMPUS_PLACES.includes(p.id)).map((p) => (
        <PlaceBuilding key={p.id} place={p} />
      ))}
    </>
  );
}
