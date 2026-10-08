"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mat } from "@/components/world/materials";
import type { FurnKind } from "@/lib/furniture";
import type { Item } from "@/lib/interiors";
import type { BodyRenderer } from "./extras";
import { Bx, Cy, METAL, WHITE, glass, glow, litMat, litMats, type BodyProps, type V3 } from "./prims";
import { beat, beatPulse, interiorState } from "./power";
import { flickerLetter, signTexture } from "./textures";

export { BPM, beat, beatPulse } from "./power";

/* ---------------------------------------------------------------------------------------------
 * Lights, signs and nightlife gear. Everything glows through litMat() or the sheets below, so
 * NEPA takes it all dark at once. Ceiling fixtures hang from about y 2.6 (the walls are 2.7 high);
 * wall fixtures take item.y. Anything that moves reads the shared beat clock from ./power.
 * ------------------------------------------------------------------------------------------- */

const TAU = Math.PI * 2;
const WARM = "#ffd596";

const dim = (hex: string, k: number) => new THREE.Color(hex).multiplyScalar(k).getStyle();
const hashOf = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

/* ---- fixtures do not throw shadows (no ceiling above them, and the sun is high): Bx / Cy / Sp without the shadow pass ---- */

function Lb({ p = [0, 0, 0], s, c, m, r = 0.6, rot }: { p?: V3; s: V3; c?: string; m?: THREE.Material; r?: number; rot?: V3 }) {
  return (
    <mesh position={[p[0], p[1] + s[1] / 2, p[2]]} rotation={rot} material={m ?? mat(c ?? WHITE, r)}>
      <boxGeometry args={s} />
    </mesh>
  );
}

function Lc({ p = [0, 0, 0], r, r2, h, c, m, seg = 12, rot, rough = 0.6 }: { p?: V3; r: number; r2?: number; h: number; c?: string; m?: THREE.Material; seg?: number; rot?: V3; rough?: number }) {
  return (
    <mesh position={[p[0], p[1] + h / 2, p[2]]} rotation={rot} material={m ?? mat(c ?? WHITE, rough)}>
      <cylinderGeometry args={[r2 ?? r, r, h, seg]} />
    </mesh>
  );
}

function Ls({ p, r, c, m, sc }: { p: V3; r: number; c?: string; m?: THREE.Material; sc?: V3 }) {
  return (
    <mesh position={p} scale={sc} material={m ?? mat(c ?? WHITE, 0.5)}>
      <sphereGeometry args={[r, 12, 9]} />
    </mesh>
  );
}

/* ---- soft light sheets: the pool under a lamp, the halo round a sign, the cone of a spot ---- */

let radialMap: THREE.DataTexture | null = null;
/** white disc that fades smoothly to nothing at its edge (alpha only) */
function radialTex() {
  if (radialMap) return radialMap;
  const n = 64;
  const d = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const r = Math.hypot(((x + 0.5) / n) * 2 - 1, ((y + 0.5) / n) * 2 - 1);
      const t = Math.max(0, 1 - r);
      const i = (y * n + x) * 4;
      d[i] = d[i + 1] = d[i + 2] = 255;
      d[i + 3] = Math.round(t * t * (3 - 2 * t) * 255);
    }
  }
  radialMap = new THREE.DataTexture(d, n, n, THREE.RGBAFormat);
  radialMap.magFilter = radialMap.minFilter = THREE.LinearFilter;
  radialMap.needsUpdate = true;
  return radialMap;
}

let coneMap: THREE.DataTexture | null = null;
/** alpha ramp along a cone: bright at the lamp (uv.y = 1), gone by the far end */
function coneTex() {
  if (coneMap) return coneMap;
  const n = 32;
  const d = new Uint8Array(n * 4);
  for (let y = 0; y < n; y++) {
    const v = (y + 0.5) / n;
    d[y * 4] = d[y * 4 + 2] = d[y * 4 + 3] = 255;
    d[y * 4 + 1] = Math.round(Math.pow(v, 1.5) * 255);
  }
  coneMap = new THREE.DataTexture(d, 1, n, THREE.RGBAFormat);
  coneMap.magFilter = coneMap.minFilter = THREE.LinearFilter;
  coneMap.needsUpdate = true;
  return coneMap;
}

const sheets = new Map<string, THREE.MeshBasicMaterial>();
const glowSheets = new Set<THREE.MeshBasicMaterial>();

/** A shared additive sheet of light in `color`; `on` is its opacity when the power is on. */
function sheet(color: string, on: number, kind: "pool" | "cone"): THREE.MeshBasicMaterial {
  const key = `${kind}|${color}|${on}`;
  let m = sheets.get(key);
  if (!m) {
    m = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: on,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      ...(kind === "pool" ? { map: radialTex() } : { alphaMap: coneTex(), side: THREE.DoubleSide }),
    });
    m.userData.on = on;
    sheets.set(key, m);
    glowSheets.add(m);
  }
  return m;
}

/** Called every frame by the interior's Lights: sheets go dark with NEPA and glow a little stronger at night. */
export function updateGlowSheets(power: boolean, night: number) {
  const k = power ? 0.65 + 0.55 * night : 0;
  for (const m of glowSheets) m.opacity = (m.userData.on as number) * k;
}

const UNIT = new THREE.PlaneGeometry(1, 1);

/** A pool of light on the floor under a fixture (x / z are the pool's centre, size its width and depth). */
function Pool({ at = [0, 0], size, color = WARM, on = 0.2 }: { at?: [number, number]; size: [number, number]; color?: string; on?: number }) {
  return <mesh position={[at[0], 0.03, at[1]]} rotation-x={-Math.PI / 2} scale={[size[0], size[1], 1]} geometry={UNIT} material={sheet(color, on, "pool")} renderOrder={2} />;
}

/** Pools under the ceiling fixtures drawn elsewhere (chandeliers, fans), so the floor beneath them reads as lit too. */
export function FixtureGlow({ items }: { items: Item[] }) {
  return (
    <>
      {items.map((it, i) =>
        it.kind === "chandelier" ? (
          <group key={i} position={[it.x, 0, it.z]}>
            <Pool size={[3.2, 3.2]} on={0.26} />
          </group>
        ) : it.kind === "ceilingfan" ? (
          <group key={i} position={[it.x, 0, it.z]}>
            <Pool size={[2.8, 2.8]} color="#fff0d2" on={0.13} />
          </group>
        ) : null,
      )}
    </>
  );
}

/** Double-sided lamp shade that glows from inside (dark when NEPA takes the light). */
const shades = new Map<string, THREE.MeshStandardMaterial>();
function shadeMat(c: string, on = 0.55): THREE.MeshStandardMaterial {
  const key = `${c}|${on}`;
  let m = shades.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color: c, emissive: new THREE.Color(c), emissiveIntensity: on, roughness: 0.7, side: THREE.DoubleSide });
    m.userData.on = on;
    litMats.add(m);
    shades.set(key, m);
  }
  return m;
}

/* ---------------------------------- ceiling fixtures ---------------------------------- */

/** Batten light: a white housing with a bright tube under it, on two short hanger rods. */
function Tubelight({ W, D }: BodyProps) {
  const dep = Math.max(0.12, D);
  return (
    <>
      <Lb p={[0, 2.54, 0]} s={[W, 0.05, dep]} c="#e4e7e9" r={0.5} />
      <Lb p={[0, 2.5, 0]} s={[W - 0.06, 0.04, dep - 0.04]} m={litMat("#f4faff", 2.2, "#c9d1d6")} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Lb p={[s * (W / 2 - 0.02), 2.49, 0]} s={[0.04, 0.06, dep]} c="#9aa0a6" />
          <Lc p={[s * (W / 2 - 0.14), 2.59, 0]} r={0.006} h={0.11} c="#555a60" seg={5} />
        </group>
      ))}
      <Pool size={[W + 1.7, dep + 1.9]} color="#fff3dc" on={0.19} />
    </>
  );
}

/** A bulb under a shade on a cord. item.c is the shade colour. */
function Pendant({ item }: BodyProps) {
  const shade = item.c ?? "#d89b3c";
  return (
    <>
      <Lc p={[0, 2.18, 0]} r={0.005} h={0.52} c="#1b1b1f" seg={4} />
      <Lc p={[0, 2.09, 0]} r={0.03} h={0.1} c="#2a2a30" seg={10} />
      <mesh position={[0, 1.99, 0]} material={shadeMat(shade)}>
        <cylinderGeometry args={[0.05, 0.19, 0.2, 20, 1, true]} />
      </mesh>
      <Ls p={[0, 1.95, 0]} r={0.065} m={litMat("#ffe9b0", 2.6, "#f3e2b8")} />
      <Pool size={[2.6, 2.6]} color={WARM} on={0.24} />
    </>
  );
}

/** A swag of fairy lights: bulbs hung along a slack wire, twinkling in three phases. */
const WARM_BULBS = ["#ffcf70", "#ff9d4d", "#fff0c0", "#ff7a59"];
const BULB = new THREE.SphereGeometry(1, 8, 6);
const SOCKET = new THREE.CylinderGeometry(0.011, 0.015, 0.032, 6);
const twinkle = new Map<string, THREE.MeshStandardMaterial>();
function twinkleMat(col: string, ph: number) {
  const key = `${col}|${ph}`;
  let m = twinkle.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color: dim(col, 0.5), emissive: new THREE.Color(col), emissiveIntensity: 1, roughness: 0.4 });
    m.userData.ph = ph;
    twinkle.set(key, m);
  }
  return m;
}
let twinkleAt = -1;
/** Rewrites every bulb material once per frame, whichever string asks first: they are shared, so this stays in step. */
function tickTwinkle(t: number, on: boolean) {
  if (t === twinkleAt) return;
  twinkleAt = t;
  for (const m of twinkle.values()) {
    const ph = m.userData.ph as number;
    m.emissiveIntensity = on ? 0.6 + 0.8 * (0.5 + 0.5 * Math.sin(t * (1.4 + ph * 0.55) + ph * 2.1)) : 0;
  }
}

function Lightstring({ item, W }: BodyProps) {
  const half = W / 2;
  const { curve, bulbs } = useMemo(() => {
    const sag = Math.min(0.3, 0.06 * W + 0.04);
    const top = 2.62;
    // a slack catenary: ends at the ceiling, lowest in the middle
    const yAt = (x: number) => top - sag * (1 - (Math.cosh((1.8 * x) / half) - 1) / (Math.cosh(1.8) - 1));
    const pts = Array.from({ length: 17 }, (_, i) => {
      const x = -half + (i / 16) * W;
      return new THREE.Vector3(x, yAt(x), 0);
    });
    const n = Math.max(6, Math.min(24, Math.round(W * 4)));
    const palette = item.c ? [item.c] : WARM_BULBS;
    const list = Array.from({ length: n }, (_, i) => {
      const x = -half + ((i + 0.5) / n) * W;
      const ph = i % 3;
      return { x, y: yAt(x), m: twinkleMat(palette[i % palette.length], ph) };
    });
    return { curve: new THREE.CatmullRomCurve3(pts), bulbs: list };
  }, [W, half, item.c]);

  useFrame(({ clock }) => tickTwinkle(clock.elapsedTime, interiorState.power));

  return (
    <>
      <mesh material={mat("#1b1b1f", 0.8)}>
        <tubeGeometry args={[curve, 24, 0.006, 4, false]} />
      </mesh>
      {[-1, 1].map((s) => (
        <Lc key={s} p={[s * half, 2.6, 0]} r={0.01} h={0.1} c="#3a3a40" seg={6} />
      ))}
      {bulbs.map((b, i) => (
        <group key={i}>
          <mesh position={[b.x, b.y - 0.02, 0]} geometry={SOCKET} material={mat("#2a2a30", 0.6)} />
          <mesh position={[b.x, b.y - 0.062, 0]} scale={0.032} geometry={BULB} material={b.m} />
        </group>
      ))}
      <Pool size={[W * 0.9, 1.7]} color="#ffcf8a" on={0.13} />
    </>
  );
}

/**
 * A ceiling track spot with a short cone of light, pointing down and a little towards +z. item.c is the colour.
 * A coloured spot also sways slowly, like a club light; a plain warm one stays put.
 */
const SPOT_TILT = 0.17;
const SPOT_REACH = 2.45;
function Spotlight({ item }: BodyProps) {
  const col = item.c ?? "#ffe9bd";
  const sway = item.c !== undefined;
  const can = useRef<THREE.Group>(null);
  const pool = useRef<THREE.Mesh>(null);
  const phase = item.x * 1.7 + item.z * 2.3;
  useFrame(({ clock }) => {
    if (!sway || !can.current || !pool.current) return;
    const a = interiorState.power ? Math.sin(clock.elapsedTime * 0.7 + phase) * 0.22 : 0;
    can.current.rotation.z = a;
    // keep the pool where the beam lands
    pool.current.position.x = (SPOT_REACH * Math.tan(a)) / Math.cos(SPOT_TILT);
  });
  return (
    <>
      <Lc p={[0, 2.66, 0]} r={0.08} h={0.04} c="#2b2b31" seg={12} />
      <Lc p={[0, 2.5, 0]} r={0.012} h={0.16} c="#3a3a40" seg={6} />
      <group ref={can} position={[0, 2.5, 0]} rotation={[-SPOT_TILT, 0, 0]}>
        <Lc p={[0, -0.2, 0]} r={0.07} r2={0.052} h={0.2} c="#1d1d22" seg={14} />
        <Lc p={[0, -0.208, 0]} r={0.056} h={0.012} m={litMat(col, 2.2, "#cfcfcf")} seg={14} />
        <mesh position={[0, -0.21 - 0.75, 0]} material={sheet(col, 0.13, "cone")}>
          <cylinderGeometry args={[0.055, 0.5, 1.5, 20, 1, true]} />
        </mesh>
      </group>
      <mesh ref={pool} position={[0, 0.03, SPOT_REACH * Math.tan(SPOT_TILT)]} rotation-x={-Math.PI / 2} scale={[1.7, 1.7, 1]} geometry={UNIT} material={sheet(col, sway ? 0.38 : 0.26, "pool")} renderOrder={2} />
    </>
  );
}

/* ----------------------------------- wall lights and signs ----------------------------------- */

/** A wall lamp: brass plate, a short arm and a warm lit shade, with a glow on the wall behind. */
function Wallsconce({ item }: BodyProps) {
  const y = item.y ?? 1.8;
  return (
    <group position={[0, y, 0]}>
      <Lb p={[0, -0.12, -0.07]} s={[0.12, 0.24, 0.012]} c="#b98f3f" r={0.4} />
      <mesh position={[0, 0, -0.035]} rotation={[Math.PI / 2, 0, 0]} material={mat("#b98f3f", 0.4)}>
        <cylinderGeometry args={[0.009, 0.009, 0.07, 6]} />
      </mesh>
      <mesh position={[0, 0.02, 0.0]} material={shadeMat("#ffe0a8", 0.9)}>
        <cylinderGeometry args={[0.075, 0.048, 0.18, 14, 1, true]} />
      </mesh>
      <Ls p={[0, 0.0, 0]} r={0.038} m={litMat("#fff0c8", 2.4, "#f3e2b8")} />
      <mesh position={[0, 0.02, -0.05]} scale={[0.95, 1.2, 1]} geometry={UNIT} material={sheet("#ffcf86", 0.34, "pool")} renderOrder={2} />
    </group>
  );
}

const NEON = ["#ff4fa3", "#22d3ee", "#facc15", "#a3e635", "#fb7185", "#c084fc"];
const NEON_ON = 1.7;

/** A sign material: the picture lights itself (emissive map) and goes dark with NEPA. Flicker layers manage their own glow. */
function litSign(tex: THREE.Texture, on: number, tone: string, clear: boolean, register: boolean) {
  const m = new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: new THREE.Color("#ffffff"), emissiveIntensity: on, color: tone, roughness: 0.55, transparent: clear, depthWrite: !clear });
  m.userData.on = on;
  if (register) litMats.add(m);
  return m;
}

type NeonSet = { steady: THREE.MeshStandardMaterial; flick: THREE.MeshStandardMaterial | null };
const neonSets = new Map<string, NeonSet>();
function neonSet(label: string, color: string, aspect: number): NeonSet | null {
  const key = `${label}|${color}|${aspect}`;
  const hit = neonSets.get(key);
  if (hit) return hit;
  const t0 = signTexture("neon", label, color, aspect, 0);
  if (!t0) return null;
  const t1 = flickerLetter(label) >= 0 ? signTexture("neon", label, color, aspect, 1) : null;
  const set = { steady: litSign(t0, NEON_ON, "#707070", true, true), flick: t1 ? litSign(t1, NEON_ON, "#707070", true, false) : null };
  if (set.flick) set.flick.userData.seed = hashOf(label) % 97;
  neonSets.set(key, set);
  return set;
}
let neonAt = -1;
/** The stuttering letters manage their own glow (they are not in litMats); once per frame covers every sign. */
function tickNeon(t: number, on: boolean) {
  if (t === neonAt) return;
  neonAt = t;
  for (const { flick } of neonSets.values()) {
    if (!flick) continue;
    const seed = flick.userData.seed as number;
    const s = Math.sin(t * 21 + seed) * Math.sin(t * 6.7 + seed * 1.7);
    flick.emissiveIntensity = on ? NEON_ON * (s > 0.72 ? 0.12 : s > 0.55 ? 0.55 : 1) : 0;
  }
}

/** Glowing outline lettering from item.label in item.c, on a dark plate. One letter stutters now and then. */
function Neonsign({ item, W, H }: BodyProps) {
  const label = (item.label ?? "OPEN").toUpperCase();
  const color = item.c ?? NEON[hashOf(label) % NEON.length];
  const set = useMemo(() => neonSet(label, color, W / H), [label, color, W, H]);
  useFrame(({ clock }) => tickNeon(clock.elapsedTime, interiorState.power));
  return (
    <group position={[0, item.y ?? 1.8, 0]}>
      <Lb p={[0, -(H + 0.08) / 2, -0.03]} s={[W + 0.08, H + 0.08, 0.04]} c="#16131c" r={0.5} />
      {[-1, 1].map((s) => (
        <Lc key={s} p={[s * (W / 2 - 0.12), 0, -0.06]} r={0.012} h={0.03} c={METAL} seg={6} rot={[Math.PI / 2, 0, 0]} />
      ))}
      <mesh position={[0, 0, -0.008]} scale={[W + 1.0, H + 0.9, 1]} geometry={UNIT} material={sheet(color, 0.3, "pool")} renderOrder={2} />
      {set && (
        <mesh position={[0, 0, 0.002]} material={set.steady}>
          <planeGeometry args={[W, H]} />
        </mesh>
      )}
      {set?.flick && (
        <mesh position={[0, 0, 0.004]} material={set.flick}>
          <planeGeometry args={[W, H]} />
        </mesh>
      )}
    </group>
  );
}

const boards = new Map<string, THREE.MeshStandardMaterial | null>();
function boardMat(label: string, color: string, aspect: number) {
  const key = `${label}|${color}|${aspect}`;
  if (boards.has(key)) return boards.get(key) ?? null;
  const t = signTexture("board", label, color, aspect);
  const m = t ? litSign(t, 0.6, "#ffffff", false, true) : null;
  if (m) boards.set(key, m);
  return m;
}

/**
 * A lit shop-name board: item.label in white on item.c. item.y at 1.5 or more is the board's centre on the wall;
 * lower, the board stands on that surface (a counter top) with item.y as its bottom edge.
 */
function Signboard({ item, W, H, c, c2 }: BodyProps) {
  const label = (item.label ?? "WELCOME").toUpperCase();
  const y0 = item.y ?? 2.0;
  const stands = y0 < 1.5;
  const m = useMemo(() => boardMat(label, c, W / H), [label, c, W, H]);
  return (
    <group position={[0, stands ? y0 + 0.05 + H / 2 : y0, 0]}>
      {stands && <Lb p={[0, -H / 2 - 0.05, -0.02]} s={[W * 0.85, 0.05, 0.18]} c={c2} r={0.6} />}
      <Lb p={[0, -(H + 0.06) / 2, -0.01]} s={[W + 0.06, H + 0.06, 0.07]} c={c2} r={0.6} />
      {m && (
        <mesh position={[0, 0, 0.0262]} material={m}>
          <planeGeometry args={[W, H]} />
        </mesh>
      )}
      <mesh position={[0, 0, -0.03]} scale={[W + 0.9, H + 0.7, 1]} geometry={UNIT} material={sheet("#fff0d0", 0.12, "pool")} renderOrder={2} />
    </group>
  );
}

/* ---------------------------------- the club ---------------------------------- */

const BEAM_COLS = ["#ff3df2", "#22d3ee", "#ffd23f", "#3dff8a", "#8b5cf6"];
const SPARK_COLS = ["#ffffff", "#7ee8ff", "#ff8cf0", "#ffe27a"];
const BEAM = new THREE.CylinderGeometry(0.03, 0.42, 3.8, 14, 1, true);

type DiscoMats = { beams: THREE.MeshBasicMaterial[]; sparks: THREE.MeshBasicMaterial[]; ball: THREE.MeshStandardMaterial };
let disco: DiscoMats | null = null;
/** shared by every mirror ball; their opacity and glow are rewritten each frame from the beat, so they never drift apart */
function discoMats(): DiscoMats {
  if (!disco) {
    disco = {
      beams: BEAM_COLS.map((color) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, alphaMap: coneTex(), side: THREE.DoubleSide })),
      sparks: SPARK_COLS.map((color) => new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, toneMapped: false })),
      ball: new THREE.MeshStandardMaterial({ color: "#d3d9e3", emissive: new THREE.Color("#a9b8ff"), emissiveIntensity: 0, metalness: 0.35, roughness: 0.25, flatShading: true }),
    };
  }
  return disco;
}

/** A mirror ball turning on the motor, throwing sparkles and sweeping coloured beams. It speeds up on the beat. */
function Discoball({ item, W }: BodyProps) {
  const r = W / 2;
  const y = item.y ?? 2.3;
  const ball = useRef<THREE.Group>(null);
  const beams = useRef<THREE.Group>(null);
  const sparks = useRef<(THREE.Mesh | null)[]>([]);
  const turn = useRef({ speed: 0, ang: 0 });
  const facets = useMemo(
    () =>
      Array.from({ length: 14 }, (_, k) => {
        const el = Math.asin(-1 + (2 * k + 1) / 14);
        const az = k * 2.39996;
        return { pos: [r * 1.01 * Math.cos(el) * Math.sin(az), r * 1.01 * Math.sin(el), r * 1.01 * Math.cos(el) * Math.cos(az)] as V3, rot: new THREE.Euler(-el, az, 0, "YXZ") };
      }),
    [r],
  );
  useFrame(({ clock }, dt) => {
    const on = interiorState.power;
    const k = on ? beatPulse() : 0;
    const t = turn.current;
    t.speed += ((on ? 0.7 + 1.2 * k : 0) - t.speed) * Math.min(1, dt * 6);
    t.ang += t.speed * dt;
    if (ball.current) ball.current.rotation.y = t.ang;
    if (beams.current) beams.current.rotation.y = -t.ang * 0.7;
    const shared = discoMats();
    shared.ball.emissiveIntensity = on ? 0.3 + 0.6 * k : 0;
    for (const m of shared.beams) m.opacity = on ? 0.1 + 0.13 * k : 0;
    const time = clock.elapsedTime;
    for (let i = 0; i < facets.length; i++) {
      const s = sparks.current[i];
      if (!s) continue;
      s.visible = on;
      s.scale.setScalar(0.45 + 0.9 * Math.max(0, Math.sin(time * 4 + i * 2.3)));
    }
  });
  return (
    <>
      <Lc p={[0, 2.6, 0]} r={0.004} h={0.1} c="#222" seg={4} />
      <Lc p={[0, 2.58, 0]} r={0.07} h={0.1} c="#2a2a30" seg={12} />
      <group position={[0, y, 0]}>
        <group ref={ball}>
          <mesh material={discoMats().ball}>
            <sphereGeometry args={[r, 16, 12]} />
          </mesh>
          {facets.map((f, i) => (
            <mesh
              key={i}
              ref={(el) => {
                sparks.current[i] = el;
              }}
              position={f.pos}
              rotation={f.rot}
              material={discoMats().sparks[i % SPARK_COLS.length]}
            >
              <planeGeometry args={[0.07, 0.07]} />
            </mesh>
          ))}
        </group>
        <group ref={beams}>
          {BEAM_COLS.map((_, i) => (
            <group key={i} rotation={[0, (i / BEAM_COLS.length) * TAU, 0]}>
              <group rotation={[0, 0, 0.55 + (i % 3) * 0.17]}>
                <mesh position={[0, -1.9, 0]} geometry={BEAM} material={discoMats().beams[i]} />
              </group>
            </group>
          ))}
        </group>
      </group>
    </>
  );
}

const GRID = 8;
const TILE_OFF = new THREE.Color("#14131c");
const _tile = new THREE.Color();

/** Every tile dark: the floor with no power. */
function clearTiles(ic: THREE.BufferAttribute) {
  const a = ic.array as Float32Array;
  for (let i = 0; i < GRID * GRID; i++) {
    a[i * 3] = TILE_OFF.r;
    a[i * 3 + 1] = TILE_OFF.g;
    a[i * 3 + 2] = TILE_OFF.b;
  }
  ic.needsUpdate = true;
}

/** Tile colours for beat `b`: checker flash, ripple from the middle and diagonal sweep, eight beats each, hue stepping on every beat. */
function paintTiles(ic: THREE.BufferAttribute, b: number) {
  const a = ic.array as Float32Array;
  const nb = Math.floor(b);
  const p = Math.exp(-(b % 1) * 4);
  const mode = Math.floor(b / 8) % 3;
  for (let j = 0; j < GRID; j++) {
    for (let i = 0; i < GRID; i++) {
      const v = mode === 0 ? ((i + j + nb) % 2 === 0 ? 1 : 0.15) : mode === 1 ? 0.5 + 0.5 * Math.cos(Math.hypot(i - 3.5, j - 3.5) * 1.3 - b * 3) : (i + j + nb) % GRID < 3 ? 1 : 0.15;
      _tile.setHSL((nb * 0.12 + (i + j) * 0.04) % 1, 1, 0.1 + 0.38 * v * (0.4 + 0.6 * p));
      const k = (j * GRID + i) * 3;
      a[k] = _tile.r;
      a[k + 1] = _tile.g;
      a[k + 2] = _tile.b;
    }
  }
  ic.needsUpdate = true;
}

/** An 8 x 8 dance floor: one instanced mesh whose tile colours are rewritten about 14 times a second to the beat. */
function Ledfloor({ W, D }: BodyProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const wait = useRef(0);
  const lit = useRef<boolean | null>(null);
  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const o = new THREE.Object3D();
    const tw = W / GRID;
    const td = D / GRID;
    for (let j = 0; j < GRID; j++) {
      for (let i = 0; i < GRID; i++) {
        o.position.set(-W / 2 + (i + 0.5) * tw, 0.03, -D / 2 + (j + 0.5) * td);
        o.rotation.set(-Math.PI / 2, 0, 0);
        o.scale.set(tw * 0.9, td * 0.9, 1);
        o.updateMatrix();
        m.setMatrixAt(j * GRID + i, o.matrix);
        m.setColorAt(j * GRID + i, TILE_OFF);
      }
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    lit.current = null;
  }, [W, D]);
  useFrame((_, dt) => {
    const ic = mesh.current?.instanceColor;
    if (!ic) return;
    if (!interiorState.power) {
      if (lit.current !== false) {
        lit.current = false;
        clearTiles(ic);
      }
      return;
    }
    wait.current += dt;
    if (wait.current < 0.07 && lit.current === true) return;
    wait.current = 0;
    lit.current = true;
    paintTiles(ic, beat());
  });
  return (
    <>
      <Bx s={[W, 0.024, D]} c="#0c0a14" r={0.5} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Bx p={[s * (W / 2 - 0.02), 0, 0]} s={[0.04, 0.034, D]} c={METAL} r={0.35} />
          <Bx p={[0, 0, s * (D / 2 - 0.02)]} s={[W, 0.034, 0.04]} c={METAL} r={0.35} />
        </group>
      ))}
      <instancedMesh ref={mesh} args={[undefined, undefined, GRID * GRID]} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </>
  );
}

const CONE_DARK = new THREE.MeshStandardMaterial({ color: "#2b2b31", roughness: 0.7, side: THREE.DoubleSide });

/** One woofer: a fixed frame and a shallow cone with a dust cap that pumps out towards the room. */
function Woofer({ y, r, z, cone }: { y: number; r: number; z: number; cone: (g: THREE.Group | null) => void }) {
  const depth = r * 0.24;
  return (
    <group position={[0, y, z]}>
      <mesh position={[0, 0, 0.0005]} material={mat("#0a0a0d", 0.9)}>
        <circleGeometry args={[r * 0.95, 24]} />
      </mesh>
      <mesh position={[0, 0, 0.004]} material={mat("#3a3a43", 0.5)}>
        <torusGeometry args={[r * 0.95, r * 0.09, 8, 28]} />
      </mesh>
      <group ref={cone}>
        <mesh position={[0, 0, depth / 2]} rotation={[Math.PI / 2, 0, 0]} material={CONE_DARK}>
          <cylinderGeometry args={[r * 0.3, r * 0.86, depth, 22, 1, true]} />
        </mesh>
        <mesh position={[0, 0, depth]} scale={[1, 1, 0.55]} material={mat("#4a4a54", 0.6)}>
          <sphereGeometry args={[r * 0.3, 14, 8]} />
        </mesh>
      </group>
    </group>
  );
}

/** A PA tower: two woofers that pump on the beat (the low one on it, the upper on the off-beat) while the power is on. */
function Speaker({ W, D, H }: BodyProps) {
  const lo = useRef<THREE.Group | null>(null);
  const hi = useRef<THREE.Group | null>(null);
  useFrame(() => {
    const on = interiorState.power;
    const b = beat();
    const pl = on ? Math.exp(-(b % 1) * 5) : 0;
    const ph = on ? Math.exp(-((b + 0.5) % 1) * 6) : 0;
    if (lo.current) {
      lo.current.position.z = pl * 0.04;
      lo.current.scale.set(1 + pl * 0.05, 1 + pl * 0.05, 1);
    }
    if (hi.current) {
      hi.current.position.z = ph * 0.03;
      hi.current.scale.set(1 + ph * 0.05, 1 + ph * 0.05, 1);
    }
  });
  const f = D / 2 + 0.002;
  return (
    <>
      <Bx s={[W, H, D]} c="#17171c" r={0.85} />
      <Bx p={[0, 0.0, 0]} s={[W + 0.03, 0.06, D + 0.03]} c="#0d0d10" r={0.7} />
      <Bx p={[0, H - 0.06, 0]} s={[W + 0.03, 0.06, D + 0.03]} c="#0d0d10" r={0.7} />
      {[-1, 1].map((s) => (
        <Bx key={s} p={[s * (W / 2 + 0.012), 0.5, 0]} s={[0.03, 0.12, 0.26]} c={METAL} r={0.4} />
      ))}
      <Woofer
        y={0.62}
        r={0.21}
        z={f}
        cone={(g) => {
          lo.current = g;
        }}
      />
      <Woofer
        y={1.08}
        r={0.17}
        z={f}
        cone={(g) => {
          hi.current = g;
        }}
      />
      <mesh position={[0, 1.4, f + 0.02]} rotation-x={-Math.PI / 2} material={CONE_DARK}>
        <cylinderGeometry args={[0.04, 0.12, 0.09, 14, 1, true]} />
      </mesh>
      <Bx p={[0, 0.2, f - 0.001]} s={[0.16, 0.05, 0.01]} c="#26262c" r={0.5} />
      <Lb p={[W / 2 - 0.1, 0.22, f + 0.005]} s={[0.025, 0.025, 0.01]} m={litMat("#3dff8a", 2.4, "#1f4a30")} />
    </>
  );
}

const EQ_N = 16;
const PLATTER_SPEED = 3.46; // 33 rpm

/** The DJ's table: an equaliser strip that dances, two turntables, a mixer with blinking pads, a laptop and a light bar. */
function Djbooth({ W, D }: BodyProps) {
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const decks = useRef<(THREE.Group | null)[]>([]);
  const pads = useRef<(THREE.Mesh | null)[]>([]);
  const lenses = useRef<(THREE.Mesh | null)[]>([]);
  const spin = useRef(0);
  const step = useRef(-2);
  const lit = useMemo(
    () => ({
      eq: Array.from({ length: EQ_N }, (_, i) => {
        const col = new THREE.Color().setHSL(0.5 + (i / (EQ_N - 1)) * 0.32, 1, 0.55).getStyle();
        return litMat(col, 2.1, dim(col, 0.25));
      }),
      padOn: ["#ff3df2", "#22d3ee", "#ffd23f", "#3dff8a"].map((c) => litMat(c, 2.2, dim(c, 0.3))),
      lens: ["#ff3df2", "#22d3ee", "#ffd23f", "#3dff8a"].map((c) => litMat(c, 2.4, dim(c, 0.3))),
      padOff: mat("#2a2a35", 0.5),
      lensOff: mat("#2a2a30", 0.5),
    }),
    [],
  );
  useFrame(({ clock }, dt) => {
    const on = interiorState.power;
    const t = clock.elapsedTime;
    const b = beat();
    const p = on ? Math.exp(-(b % 1) * 4.5) : 0;
    for (let i = 0; i < EQ_N; i++) {
      const m = bars.current[i];
      if (!m) continue;
      const v = on ? Math.min(1, (0.2 + 0.8 * p) * (0.45 + 0.55 * Math.abs(Math.sin(t * (2.2 + (i % 5) * 0.55) + i * 1.7)))) : 0;
      const h = 0.03 + 0.58 * v;
      m.scale.y = h;
      m.position.y = 0.2 + h / 2;
    }
    spin.current += ((on ? PLATTER_SPEED : 0) - spin.current) * Math.min(1, dt * 2.5);
    for (const g of decks.current) if (g) g.rotation.y += spin.current * dt;
    // pads and the light bar change on every half beat
    const s = on ? Math.floor(b * 2) : -1;
    if (s !== step.current) {
      step.current = s;
      for (let i = 0; i < pads.current.length; i++) {
        const m = pads.current[i];
        if (m) m.material = s >= 0 && (i * 3 + s) % 5 < 2 ? lit.padOn[i % 4] : lit.padOff;
      }
      for (let i = 0; i < lenses.current.length; i++) {
        const m = lenses.current[i];
        if (m) m.material = s >= 0 ? lit.lens[(i + (s >> 1)) % 4] : lit.lensOff;
      }
    }
  });
  const fz = D / 2;
  const top = 0.95;
  return (
    <>
      {/* carcass, front panel and top */}
      <Bx p={[0, 0, -0.06]} s={[W - 0.04, 0.9, D - 0.12]} c="#1b1b22" r={0.7} />
      <Bx p={[0, 0, fz - 0.06]} s={[W - 0.04, 0.9, 0.12]} c="#101015" r={0.5} />
      <Bx p={[0, 0.9, 0]} s={[W, 0.05, D]} c="#2a2a33" r={0.4} />
      <Lb p={[0, 0.03, fz + 0.004]} s={[W - 0.2, 0.025, 0.012]} m={litMat("#ff3df2", 2.3, "#4a2548")} />
      <Lb p={[0, 0.87, fz + 0.004]} s={[W - 0.2, 0.02, 0.012]} m={litMat("#22d3ee", 2.3, "#1d4650")} />
      {/* equaliser strip */}
      <Lb p={[0, 0.17, fz + 0.002]} s={[W - 0.5, 0.66, 0.006]} c="#050508" r={0.8} />
      {Array.from({ length: EQ_N }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            bars.current[i] = el;
          }}
          position={[-(W - 0.7) / 2 + (i / (EQ_N - 1)) * (W - 0.7), 0.2, fz + 0.007]}
          scale={[0.08, 0.03, 0.012]}
          material={lit.eq[i]}
        >
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}
      {/* turntables */}
      {[-1, 1].map((s, k) => (
        <group key={s} position={[s * 0.62, top, 0]}>
          <Bx s={[0.54, 0.05, 0.62]} c="#d5d8de" r={0.35} />
          <group
            position={[0, 0.05, 0.02]}
            ref={(el) => {
              decks.current[k] = el;
            }}
          >
            <Cy r={0.22} h={0.02} c="#101012" seg={24} rough={0.3} />
            <Cy p={[0, 0.02, 0]} r={0.07} h={0.004} c={k ? "#2f6fd0" : "#d03a3a"} seg={16} />
            <Bx p={[0.17, 0.02, 0]} s={[0.05, 0.006, 0.012]} c="#f4f4f2" />
            <Bx p={[0, 0.02, -0.17]} s={[0.012, 0.006, 0.05]} c="#f4f4f2" />
          </group>
          <Cy p={[s * 0.19, 0.05, -0.23]} r={0.025} h={0.04} c={METAL} seg={10} />
          <Bx p={[s * 0.1, 0.07, -0.18]} s={[0.012, 0.012, 0.3]} c={METAL} r={0.3} rot={[0, s * 0.5, 0]} />
        </group>
      ))}
      {/* mixer */}
      <Bx p={[0, top, 0]} s={[0.5, 0.06, 0.56]} c="#15151a" r={0.5} />
      {[0, 1, 2, 3].map((i) => (
        <Lb key={`f${i}`} p={[-0.15 + i * 0.1, top + 0.06, 0.12]} s={[0.03, 0.025, 0.05]} c="#f2f2f0" />
      ))}
      <Lb p={[0, top + 0.06, 0.24]} s={[0.1, 0.025, 0.04]} c="#f2f2f0" />
      {[0, 1, 2, 3].map((i) => (
        <Lc key={`k${i}`} p={[-0.15 + i * 0.1, top + 0.06, -0.02]} r={0.02} h={0.025} c="#b9bcc2" seg={10} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={`p${i}`}
          ref={(el) => {
            pads.current[i] = el;
          }}
          position={[-0.15 + (i % 4) * 0.1, top + 0.06 + 0.008, -0.14 - Math.floor(i / 4) * 0.08]}
          material={lit.padOff}
        >
          <boxGeometry args={[0.07, 0.016, 0.06]} />
        </mesh>
      ))}
      {/* laptop, facing the floor so the crowd sees its glow */}
      <Lb p={[-1.07, top, 0.0]} s={[0.34, 0.015, 0.24]} c="#9aa0a6" r={0.4} />
      <group position={[-1.07, top + 0.015, -0.12]} rotation={[-0.3, 0, 0]}>
        <Lb s={[0.34, 0.22, 0.01]} c="#9aa0a6" r={0.4} />
        <mesh position={[0, 0.11, 0.0065]} material={glow.screen}>
          <boxGeometry args={[0.31, 0.19, 0.003]} />
        </mesh>
      </group>
      {/* headphones */}
      <group position={[1.07, top, 0.05]}>
        <mesh position={[0, 0.02, 0]} material={mat("#222228", 0.5)}>
          <torusGeometry args={[0.09, 0.011, 6, 16, Math.PI]} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.09, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} material={mat("#c0392b", 0.6)}>
            <cylinderGeometry args={[0.042, 0.042, 0.04, 12]} />
          </mesh>
        ))}
      </group>
      {/* light bar on short posts */}
      {[-1, 1].map((s) => (
        <Lc key={s} p={[s * (W / 2 - 0.12), top, -D / 2 + 0.1]} r={0.015} h={0.3} c="#333338" seg={8} />
      ))}
      <Lb p={[0, top + 0.3, -D / 2 + 0.1]} s={[W - 0.2, 0.06, 0.08]} c="#18181d" r={0.5} />
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={`l${i}`}
          ref={(el) => {
            lenses.current[i] = el;
          }}
          position={[-(W - 0.7) / 2 + (i / 7) * (W - 0.7), top + 0.33, -D / 2 + 0.145]}
          material={lit.lensOff}
        >
          <boxGeometry args={[0.12, 0.04, 0.012]} />
        </mesh>
      ))}
    </>
  );
}

const MIRROR = new THREE.MeshStandardMaterial({ color: "#a9bccb", emissive: new THREE.Color("#3a4a58"), emissiveIntensity: 0.4, roughness: 0.12, metalness: 0.5 });
/** bottle silhouettes (radius, height) turned into one mesh each: a tall whisky shape and a squat liqueur one */
const bottleGeo = (profile: [number, number][]) => new THREE.LatheGeometry(profile.map(([x, y]) => new THREE.Vector2(x, y)), 12);
const BOTTLE_TALL = bottleGeo([[0, 0], [0.036, 0], [0.04, 0.01], [0.04, 0.15], [0.034, 0.18], [0.022, 0.2], [0.016, 0.22], [0.016, 0.27], [0, 0.27]]);
const BOTTLE_SQUAT = bottleGeo([[0, 0], [0.04, 0], [0.045, 0.01], [0.045, 0.1], [0.036, 0.13], [0.02, 0.15], [0.016, 0.17], [0.016, 0.2], [0, 0.2]]);
const BOTTLES = ["#e0932a", "#2e9e5b", "#cfe9f2", "#d03a3a", "#2f6fd0", "#8a1f3c", "#e6c35c", "#7a3fc0", "#17a3a3", "#f08a30"];

/** A back-bar wall: a mirror behind four backlit glass shelves of bottles, over a cabinet, with a neon edge. */
function Bottleshelf({ item, W, D, H, c }: BodyProps) {
  const neon = item.c ?? "#ff4fd8";
  const n = Math.max(4, Math.min(9, Math.floor((W - 0.3) / 0.38)));
  const seed = Math.round(item.x * 7 + item.z * 13);
  const shelves = [0.66, 0.98, 1.3, 1.62];
  const gap = (W - 0.3) / n;
  return (
    <>
      <Bx s={[W, 0.6, D]} c="#2a1c13" r={0.7} />
      {[-1, 0, 1].map((k) => (
        <Bx key={k} p={[k * (W / 3), 0.08, D / 2 + 0.004]} s={[W / 3 - 0.1, 0.44, 0.01]} c={c} r={0.8} />
      ))}
      <Bx p={[0, 0.6, 0.02]} s={[W + 0.04, 0.04, D + 0.06]} c="#3b2a1d" r={0.5} />
      <Lb p={[0, 0.64, -D / 2 + 0.015]} s={[W - 0.08, H - 0.76, 0.02]} m={MIRROR} />
      {[-1, 1].map((s) => (
        <Bx key={s} p={[s * (W / 2 - 0.03), 0.64, 0]} s={[0.06, H - 0.64, D]} c="#2a1c13" r={0.7} />
      ))}
      <Bx p={[0, H - 0.06, 0]} s={[W, 0.06, D + 0.04]} c="#2a1c13" r={0.7} />
      {shelves.map((y, row) => (
        <group key={y}>
          <mesh position={[0, y, 0.0]} material={glass}>
            <boxGeometry args={[W - 0.1, 0.014, D - 0.06]} />
          </mesh>
          <Lb p={[0, y - 0.014, D / 2 - 0.05]} s={[W - 0.14, 0.01, 0.02]} m={litMat("#fff0cf", 1.8, "#d8cfb8")} />
          {Array.from({ length: n }, (_, i) => {
            const col = BOTTLES[(seed + row * 3 + i * 7 + ((i * i) % 4)) % BOTTLES.length];
            const m = litMat(col, 1.0, dim(col, 0.55));
            const x = -W / 2 + 0.15 + gap * (i + 0.5);
            return <mesh key={i} position={[x, y + 0.007, -0.02]} geometry={(i + row) % 3 === 0 ? BOTTLE_TALL : BOTTLE_SQUAT} material={m} />;
          })}
        </group>
      ))}
      {/* neon edge */}
      <Lb p={[0, H - 0.07, D / 2 + 0.027]} s={[W - 0.1, 0.018, 0.012]} m={litMat(neon, 2.4, dim(neon, 0.4))} />
      {[-1, 1].map((s) => (
        <Lb key={s} p={[s * (W / 2 - 0.07), 0.66, D / 2 + 0.003]} s={[0.014, H - 0.8, 0.012]} m={litMat(neon, 2.4, dim(neon, 0.4))} />
      ))}
      <Pool at={[0, D / 2 + 0.55]} size={[W + 0.8, 1.5]} color={neon} on={0.1} />
    </>
  );
}

/** A velvet U-booth that seats like a sofa, with a low table in front holding an ice bucket, a bottle and glasses. */
function Vipbooth({ W, D, c }: BodyProps) {
  const tz = D / 2 + 0.2;
  return (
    <>
      <Bx s={[W, 0.18, D]} c="#1a1020" r={0.6} />
      <Bx p={[0, 0.18, 0.04]} s={[W - 0.24, 0.26, D - 0.2]} c={c} r={0.95} />
      {/* back and two angled wings make the curve */}
      <Bx p={[0, 0.18, -D / 2 + 0.1]} s={[W - 0.7, 0.77, 0.2]} c={c} r={0.95} />
      {[-1, 1].map((s) => (
        <Bx key={s} p={[s * (W / 2 - 0.4), 0.18, -D / 2 + 0.2]} s={[0.62, 0.77, 0.2]} c={c} r={0.95} rot={[0, -s * 0.5, 0]} />
      ))}
      {[-1, 1].map((s) => (
        <Bx key={`a${s}`} p={[s * (W / 2 - 0.1), 0.18, 0.04]} s={[0.2, 0.5, D - 0.3]} c={c} r={0.95} />
      ))}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((x) => (
        <group key={x}>
          <Bx p={[x, 0.3, -D / 2 + 0.205]} s={[0.012, 0.58, 0.012]} c={dim(c, 0.55)} r={0.9} />
          <Stud p={[x, 0.62, -D / 2 + 0.215]} />
        </group>
      ))}
      <Bx p={[0, 0.95, -D / 2 + 0.1]} s={[W - 0.68, 0.035, 0.22]} c="#c9a24a" r={0.35} />
      {/* the table */}
      <Cy p={[0, 0, tz]} r={0.05} h={0.4} c="#c9a24a" seg={10} rough={0.35} />
      <Cy p={[0, 0.4, tz]} r={0.3} h={0.03} c="#14101a" seg={22} rough={0.25} />
      <Cy p={[0, 0.36, tz]} r={0.28} h={0.012} m={litMat("#ff3df2", 2.2, "#4a2548")} seg={22} />
      {/* ice bucket, bottle, glasses */}
      <Cy p={[-0.06, 0.43, tz]} r={0.075} r2={0.1} h={0.2} c="#d6dae0" seg={14} rough={0.25} />
      <Cy p={[-0.06, 0.63, tz]} r={0.085} h={0.006} c="#eaf6ff" seg={14} />
      <Cy p={[-0.06, 0.5, tz]} r={0.03} h={0.33} c="#1f5f3a" seg={10} rough={0.2} />
      <Cy p={[-0.06, 0.83, tz]} r={0.012} h={0.08} c="#c9a24a" seg={8} />
      {[0.14, 0.2].map((x, i) => (
        <Cy key={x} p={[x, 0.43, tz + (i ? 0.08 : -0.02)]} r={0.02} r2={0.028} h={0.12} m={glass} seg={10} />
      ))}
    </>
  );
}

/** a gold stud for the tufting */
function Stud({ p }: { p: V3 }) {
  return (
    <mesh position={p} material={mat("#c9a24a", 0.35)}>
      <sphereGeometry args={[0.017, 8, 6]} />
    </mesh>
  );
}

export const LIGHT_BODIES: Partial<Record<FurnKind, BodyRenderer>> = {
  tubelight: Tubelight,
  pendant: Pendant,
  neonsign: Neonsign,
  signboard: Signboard,
  lightstring: Lightstring,
  spotlight: Spotlight,
  discoball: Discoball,
  ledfloor: Ledfloor,
  speaker: Speaker,
  djbooth: Djbooth,
  bottleshelf: Bottleshelf,
  vipbooth: Vipbooth,
  wallsconce: Wallsconce,
};
