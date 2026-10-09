"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { PLOTS, PLOT_SIZE } from "@/lib/plots";
import type { PlotState } from "@/lib/protocol";
import { useGame } from "@/lib/store";
import { colorFor } from "@/lib/look";
import { bizById } from "@/lib/business";
import { facadeMaterials, lampMat, windowMats } from "./materials";

type V3 = [number, number, number];

export function Wall({ tint, w, h, d, p }: { tint: string; w: number; h: number; d: number; p: V3 }) {
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

/* ------------------------------------------------------------------------------------------------
 * Houses are drawn as a handful of instanced meshes (one draw call per kind of part) instead of a few
 * dozen separate meshes each, so 200+ plots cost almost nothing to render.
 * ------------------------------------------------------------------------------------------------ */

const RUST_ROOF = "#6e4126"; // brown corrugated iron

type Opts = { rx?: number; ry?: number; rz?: number; s?: V3 };

/** A shape moved into place with its colour baked in, ready to be merged with the rest of the house. */
function part(g: THREE.BufferGeometry, hex: string, p: V3, o: Opts = {}) {
  const m = new THREE.Matrix4().compose(new THREE.Vector3(...p), new THREE.Quaternion().setFromEuler(new THREE.Euler(o.rx ?? 0, o.ry ?? 0, o.rz ?? 0)), new THREE.Vector3(...(o.s ?? [1, 1, 1])));
  // every part non-indexed, so shapes of different kinds merge cleanly
  const geo = (g.index ? g.toNonIndexed() : g.clone()).applyMatrix4(m);
  const c = new THREE.Color(hex);
  const n = geo.attributes.position.count;
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) col.set([c.r, c.g, c.b], i * 3);
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return geo;
}
const box = (w: number, h: number, d: number, hex: string, p: V3, o?: Opts) => part(new THREE.BoxGeometry(w, h, d), hex, p, o);
const roof = (r: number, h: number, p: V3, s: V3) => part(new THREE.ConeGeometry(r, h, 4), RUST_ROOF, p, { ry: Math.PI / 4, s });
const post = (r: number, h: number, hex: string, p: V3) => part(new THREE.CylinderGeometry(r, r, h, 8), hex, p);
const merge = (parts: THREE.BufferGeometry[]) => mergeGeometries(parts, false)!;

const B = 0.06; // top of the plot pad

/** A roofed veranda across the front door: floor, two pillars and a roof. */
const veranda = (x: number, z: number, w = 1.3): THREE.BufferGeometry[] => [
  box(w, 0.03, 0.5, "#e6dfd0", [x, B + 0.015, z]),
  box(0.06, 0.55, 0.06, "#fbf9f4", [x - w / 2 + 0.05, B + 0.3, z + 0.2]),
  box(0.06, 0.55, 0.06, "#fbf9f4", [x + w / 2 - 0.05, B + 0.3, z + 0.2]),
  box(w + 0.1, 0.05, 0.58, RUST_ROOF, [x, B + 0.6, z]),
];

/** A paved car park with bay lines and a parked car. */
const carPark = (x: number, z: number, body: string, rot = 0): THREE.BufferGeometry[] => [
  box(0.95, 0.025, 0.75, "#7a808a", [x, B + 0.012, z]),
  box(0.03, 0.004, 0.6, "#f4f1e6", [x - 0.42, B + 0.027, z]),
  box(0.03, 0.004, 0.6, "#f4f1e6", [x + 0.42, B + 0.027, z]),
  box(0.34, 0.12, 0.6, body, [x, B + 0.1, z], { ry: rot }),
  box(0.3, 0.1, 0.32, "#dfe9f2", [x, B + 0.2, z - 0.03], { ry: rot }),
  box(0.04, 0.04, 0.04, "#1b1e24", [x - 0.16, B + 0.05, z + 0.2]),
  box(0.04, 0.04, 0.04, "#1b1e24", [x + 0.16, B + 0.05, z + 0.2]),
];
const fence = (c = "#f3efe6", s = 2.9): THREE.BufferGeometry[] => [
  box(s, 0.18, 0.05, c, [0, B + 0.09, -s / 2]),
  box(s, 0.18, 0.05, c, [0, B + 0.09, s / 2]),
  box(0.05, 0.18, s, c, [-s / 2, B + 0.09, 0]),
  box(0.05, 0.18, s, c, [s / 2, B + 0.09, 0]),
];

let GEOS: Record<string, THREE.BufferGeometry> | null = null;
function geos() {
  if (GEOS) return GEOS;
  GEOS = {
    // bungalow
    t1: merge([
      ...fence(),
      box(1.5, 0.6, 1.2, "#f4ead7", [0, B + 0.3, 0]),
      roof(1.0, 0.56, [0, B + 0.6 + 0.28, 0], [1.25, 1, 1]),
      box(0.3, 0.42, 0.03, "#7a5a40", [0, B + 0.24, 0.61]),
      ...veranda(-0.15, 0.88, 1.2),
      ...carPark(1.0, 1.1, "#e8e3d6"),
    ]),
    t1glow: merge([box(0.26, 0.22, 0.03, "#fff4d6", [0.45, B + 0.34, 0.61])]),
    // duplex
    t2: merge([
      ...fence(),
      box(1.7, 1.25, 1.3, "#f2ecdf", [0, B + 0.625, -0.1]),
      roof(0.95, 0.5, [0, B + 1.25 + 0.3, -0.1], [1.3, 1, 1]),
      box(1.2, 0.05, 0.4, "#e9e3d4", [0, B + 0.7, 0.62]),
      box(0.55, 0.5, 0.9, "#d8d2c4", [0.95, B + 0.25, 0.4]),
      box(0.4, 0.4, 0.02, "#2a2f3a", [1.1, B + 0.3, 0.8]),
      ...veranda(0.05, 0.95, 1.1),
      ...carPark(-1.0, 1.15, "#4a90e2"),
    ]),
    t2accent: merge([box(1.8, 0.09, 1.4, "#ffffff", [0, B + 1.25 + 0.04, -0.1])]),
    t2glow: merge([box(0.3, 0.3, 0.03, "#fff4d6", [-0.4, B + 0.8, 0.56]), box(0.3, 0.3, 0.03, "#fff4d6", [0.3, B + 0.8, 0.56])]),
    // mansion
    t3: merge([
      ...fence("#e8e3d6"),
      box(2.0, 1.5, 1.35, "#eef0f3", [-0.2, B + 0.75, -0.35]),
      box(1.1, 0.85, 1.0, "#eef0f3", [0.8, B + 0.425, 0.15]),
      roof(1.0, 0.58, [-0.2, B + 1.5 + 0.34, -0.35], [1.5, 1, 1.05]),
      ...[-0.45, -0.15, 0.15].map((x) => post(0.04, 0.8, "#fbf9f4", [x, B + 0.4, 0.4])),
      box(0.95, 0.06, 0.4, "#fbf9f4", [-0.3, B + 0.83, 0.4]),
      box(0.9, 0.012, 0.5, "#59c2e6", [-0.75, B + 0.01, 1.0]),
      ...carPark(1.1, 1.15, "#1f2937"),
    ]),
    t3accent: merge([box(2.1, 0.09, 1.45, "#ffffff", [-0.2, B + 1.5 + 0.04, -0.35])]),
    t3glow: merge([box(0.32, 0.34, 0.03, "#fff4d6", [-0.9, B + 1.0, 0.33]), box(0.32, 0.34, 0.03, "#fff4d6", [-0.2, B + 1.0, 0.33]), box(0.32, 0.34, 0.03, "#fff4d6", [0.5, B + 1.0, 0.33])]),
    // a shop front: flat roof, a big window, and a coloured awning (the colour belongs to the kind of business)
    biz: merge([
      ...fence("#d9d6d0"),
      box(1.8, 0.9, 1.3, "#f6f3ec", [0, B + 0.45, -0.1]),
      box(1.9, 0.07, 1.4, "#3a3f48", [0, B + 0.93, -0.1]),
      box(0.5, 0.5, 0.03, "#2a2f3a", [-0.55, B + 0.25, 0.56]),
      post(0.025, 0.7, "#6b7380", [1.15, B + 0.35, 0.95]),
    ]),
    bizaccent: merge([box(1.9, 0.22, 1.42, "#ffffff", [0, B + 1.03, -0.1]), box(1.5, 0.06, 0.5, "#ffffff", [0.1, B + 0.74, 0.7], { rx: -0.35 }), box(0.46, 0.2, 0.04, "#ffffff", [1.15, B + 0.72, 0.95])]),
    bizglow: merge([box(0.75, 0.4, 0.03, "#fff4d6", [0.35, B + 0.38, 0.56])]),
    // what each kind of business adds outside, so you can tell what it is from the street
    bz_gym: merge([
      part(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 8), "#9ca3af", [0, B + 1.3, 0.42], { rz: Math.PI / 2 }),
      ...[-1, 1].flatMap((s) => [
        part(new THREE.CylinderGeometry(0.17, 0.17, 0.06, 14), "#1f2937", [s * 0.5, B + 1.3, 0.42], { rz: Math.PI / 2 }),
        part(new THREE.CylinderGeometry(0.12, 0.12, 0.06, 14), "#374151", [s * 0.58, B + 1.3, 0.42], { rz: Math.PI / 2 }),
        post(0.02, 0.32, "#6b7280", [s * 0.3, B + 1.1, 0.42]),
      ]),
      box(0.5, 0.05, 0.22, "#dc2626", [1.05, B + 0.02, 0.95]),
    ]),
    bz_salon: merge([
      ...Array.from({ length: 6 }, (_, i) => part(new THREE.CylinderGeometry(0.06, 0.06, 0.1, 10), i % 2 ? "#dc2626" : "#ffffff", [1.15, B + 0.07 + i * 0.1, 0.92])),
      part(new THREE.IcosahedronGeometry(0.075, 0), "#2563eb", [1.15, B + 0.72, 0.92]),
      part(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 10), "#2a2f3a", [1.15, B + 0.02, 0.92]),
      part(new THREE.CylinderGeometry(0.07, 0.07, 0.34, 10), "#f9a8d4", [-1.05, B + 0.2, 0.95]),
    ]),
    bz_cafe: merge([
      part(new THREE.CylinderGeometry(0.2, 0.14, 0.24, 14), "#92400e", [0, B + 1.3, 0.45]),
      part(new THREE.CylinderGeometry(0.27, 0.27, 0.03, 14), "#f4f1e6", [0, B + 1.17, 0.45]),
      part(new THREE.TorusGeometry(0.09, 0.025, 6, 10), "#92400e", [0.24, B + 1.3, 0.45]),
      ...[-0.06, 0.02, 0.1].map((x, i) => part(new THREE.IcosahedronGeometry(0.04, 0), "#e5e7eb", [x, B + 1.5 + i * 0.07, 0.45])),
      part(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 12), "#f4f1e6", [1.0, B + 0.3, 0.95]),
      post(0.025, 0.3, "#6b7380", [1.0, B + 0.15, 0.95]),
      part(new THREE.CylinderGeometry(0.1, 0.1, 0.22, 8), "#b45309", [0.78, B + 0.11, 1.1]),
      part(new THREE.CylinderGeometry(0.1, 0.1, 0.22, 8), "#b45309", [1.22, B + 0.11, 1.1]),
    ]),
    bz_pharmacy: merge([
      box(0.46, 0.15, 0.07, "#16a34a", [0, B + 1.3, 0.45]),
      box(0.15, 0.46, 0.07, "#16a34a", [0, B + 1.15, 0.45]),
      box(0.7, 0.05, 0.22, "#d1d5db", [1.0, B + 0.2, 0.98]),
      box(0.04, 0.2, 0.04, "#6b7280", [0.72, B, 0.98]),
      box(0.04, 0.2, 0.04, "#6b7280", [1.28, B, 0.98]),
    ]),
    bz_mart: merge([
      box(1.6, 0.18, 0.05, "#f59e0b", [0, B + 1.18, 0.62]),
      ...[-0.9, -0.55].flatMap((x) => [
        box(0.28, 0.18, 0.2, "#cbd5e1", [x, B + 0.26, 0.98]),
        box(0.28, 0.04, 0.04, "#ef4444", [x, B + 0.46, 1.08]),
        post(0.03, 0.12, "#111827", [x - 0.1, B + 0.06, 0.98]),
        post(0.03, 0.12, "#111827", [x + 0.1, B + 0.06, 0.98]),
      ]),
    ]),
    bz_shop: merge([
      ...[-1.0, -0.6].flatMap((x) => [
        box(0.34, 0.15, 0.26, "#a16207", [x, B, 0.98]),
        ...[0, 1, 2].map((k) => part(new THREE.IcosahedronGeometry(0.06, 0), k % 2 ? "#ef4444" : "#f97316", [x - 0.09 + k * 0.09, B + 0.2, 0.98])),
      ]),
    ]),
    // land that is bought but not built on: corner stakes and a flag
    claimed: merge([
      ...([[-1.35, -1.35], [1.35, -1.35], [-1.35, 1.35], [1.35, 1.35]] as [number, number][]).map(([x, z]) => box(0.07, 0.28, 0.07, "#ffffff", [x, 0.2, z])),
      post(0.015, 0.9, "#ffffff", [0, 0.5, 0]),
      box(0.38, 0.22, 0.02, "#ffffff", [0.2, 0.82, 0]),
    ]),
    // for sale
    sale: merge([post(0.02, 0.6, "#7a6a54", [0.9, 0.3, 1.0]), box(0.5, 0.26, 0.03, "#10b981", [0.9, 0.62, 1.0])]),
    pad: new THREE.BoxGeometry(PLOT_SIZE - 0.2, 0.06, PLOT_SIZE - 0.2).translate(0, 0.03, 0),
    hit: new THREE.BoxGeometry(PLOT_SIZE - 0.3, 1.8, PLOT_SIZE - 0.3).translate(0, 0.9, 0),
  };
  return GEOS;
}

const bodyMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0.02 });
const tintMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7, metalness: 0.02 });
const padMat = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.95 });
const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
const _m = new THREE.Matrix4();

type Item = { x: number; z: number; color?: THREE.Color };

/** One draw call for every plot of a kind. */
function Inst({ geometry, material, items, shadow = false, tint = false }: { geometry: THREE.BufferGeometry; material: THREE.Material; items: Item[]; shadow?: boolean; tint?: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    items.forEach((it, i) => {
      m.setMatrixAt(i, _m.makeTranslation(it.x, 0, it.z));
      if (tint && it.color) m.setColorAt(i, it.color);
    });
    m.count = items.length;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [items, tint]);
  return <instancedMesh ref={ref} args={[geometry, material, PLOTS.length]} frustumCulled={false} castShadow={shadow} receiveShadow />;
}

const kindOf = (st?: PlotState) => (!st ? "sale" : st.biz ? "biz" : st.tier >= 3 ? "t3" : st.tier === 2 ? "t2" : st.tier === 1 ? "t1" : "claimed");

export default function PlotsLayer() {
  const plots = useGame((s) => s.plots);
  const selected = useGame((s) => s.selected);
  const me = useGame((s) => s.profile?.id);
  const g = geos();

  const lists = useMemo(() => {
    const by: Record<string, Item[]> = { t1: [], t2: [], t3: [], claimed: [], sale: [], biz: [] };
    const pads: Item[] = [];
    const byBiz: Record<string, Item[]> = {};
    const white = new THREE.Color("#ffffff");
    const sand = new THREE.Color("#f5f2e6");
    for (const p of PLOTS) {
      const st = plots[p.id];
      const accent = st ? new THREE.Color(colorFor(st.ownerId)) : undefined;
      const kind = kindOf(st);
      by[kind].push({ x: p.pos[0], z: p.pos[1], color: kind === "biz" ? new THREE.Color(bizById(st?.biz)?.color ?? "#16a34a") : accent });
      if (kind === "biz" && st?.biz) (byBiz[st.biz] ??= []).push({ x: p.pos[0], z: p.pos[1] });
      pads.push({ x: p.pos[0], z: p.pos[1], color: accent ? accent.clone().lerp(white, 0.75) : sand });
    }
    return { by, pads, byBiz };
  }, [plots]);

  const rings = PLOTS.filter((p) => (selected?.type === "plot" && selected.id === p.id) || plots[p.id]?.ownerId === me);

  return (
    <>
      <Inst geometry={g.pad} material={padMat} tint items={lists.pads} />
      <Inst geometry={g.t1} material={bodyMat} items={lists.by.t1} shadow />
      <Inst geometry={g.t1glow} material={lampMat} items={lists.by.t1} />
      <Inst geometry={g.t2} material={bodyMat} items={lists.by.t2} shadow />
      <Inst geometry={g.t2accent} material={tintMat} tint items={lists.by.t2} />
      <Inst geometry={g.t2glow} material={lampMat} items={lists.by.t2} />
      <Inst geometry={g.t3} material={bodyMat} items={lists.by.t3} shadow />
      <Inst geometry={g.t3accent} material={tintMat} tint items={lists.by.t3} />
      <Inst geometry={g.t3glow} material={lampMat} items={lists.by.t3} />
      <Inst geometry={g.biz} material={bodyMat} items={lists.by.biz} shadow />
      <Inst geometry={g.bizaccent} material={tintMat} items={lists.by.biz} tint />
      <Inst geometry={g.bizglow} material={lampMat} items={lists.by.biz} />
      {["gym", "salon", "cafe", "pharmacy", "mart", "shop"].map((id) => (
        <Inst key={id} geometry={g[`bz_${id}`]} material={bodyMat} items={lists.byBiz[id] ?? []} shadow />
      ))}
      <Inst geometry={g.claimed} material={tintMat} tint items={lists.by.claimed} />
      <Inst geometry={g.sale} material={bodyMat} items={lists.by.sale} />
      <PlotHits />
      {rings.map((p) => {
        const isSel = selected?.type === "plot" && selected.id === p.id;
        return (
          <mesh key={p.id} position={[p.pos[0], 0.07, p.pos[1]]} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[PLOT_SIZE * 0.6, PLOT_SIZE * 0.6 + 0.07, 4, 1, Math.PI / 4]} />
            <meshBasicMaterial color={isSel ? "#f59e0b" : "#10b981"} transparent opacity={0.9} />
          </mesh>
        );
      })}
    </>
  );
}

/** Invisible tap targets, all in one mesh: tap any plot to open it. */
function PlotHits() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const g = geos();
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    PLOTS.forEach((p, i) => m.setMatrixAt(i, _m.makeTranslation(p.pos[0], 0, p.pos[1])));
    m.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh
      ref={ref}
      args={[g.hit, hitMat, PLOTS.length]}
      frustumCulled={false}
      onClick={(e) => {
        if (e.delta > 6 || e.instanceId === undefined) return;
        e.stopPropagation();
        useGame.getState().select({ type: "plot", id: PLOTS[e.instanceId].id });
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    />
  );
}
