"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SLOGAN_ADS } from "@/lib/ads";
import { HILLS } from "@/lib/world";
import { drawAd } from "./adArt";
import { lampMat } from "./materials";

/**
 * A few giant "PUT YOUR ADS HERE" billboards well outside the city, facing in at it: two on each side of the ring road
 * round the edge, one at each corner, and the biggest on some of the hilltops (readable from the top of Bower's Tower).
 * The city itself has no street ads: they all live in the Ad Plaza. Instanced, so the cost is a handful of draw calls.
 */

const BW = 6;
const BH = 3;

type Slot = { x: number; z: number; ry: number; v: number; y?: number; s?: number };
type Part = { x: number; y: number; z: number; ry: number; sx: number; sy: number; sz: number };

/** A point in a billboard's own space (x along the board, y up, z out of its face) in world space. */
function at(s: Slot, lx: number, ly: number, lz: number): Part {
  const sc = s.s ?? 1;
  const c = Math.cos(s.ry);
  const n = Math.sin(s.ry);
  return { x: s.x + (lx * c + lz * n) * sc, y: (s.y ?? 0) + ly * sc, z: s.z + (-lx * n + lz * c) * sc, ry: s.ry, sx: sc, sy: sc, sz: sc };
}

/** Faces the middle of the map. */
const inward = (x: number, z: number) => Math.atan2(-x, -z);

export function buildBillboards(): Slot[] {
  const out: Slot[] = [];
  let n = 0;
  const v = () => n++ % SLOGAN_ADS.length;
  const R = 80;
  for (const t of [-24, 24]) for (const [x, z] of [[t, -R], [t, R], [-R, t], [R, t]] as const) out.push({ x, z, ry: inward(x, z), v: v() });
  for (const [x, z] of [[-86, -86], [86, -86], [-86, 86], [86, 86]] as const) out.push({ x, z, ry: inward(x, z), v: v(), s: 1.5 });
  HILLS.forEach((h, i) => {
    if (i % 8 === 0) out.push({ x: h.x, z: h.z, y: h.h - 0.15, ry: inward(h.x, h.z), v: v(), s: 1.8 });
  });
  return out;
}

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);

/** One instanced mesh; `parts` are world transforms. */
function Instanced({ geometry, material, parts }: { geometry: THREE.BufferGeometry; material: THREE.Material | THREE.Material[]; parts: Part[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    parts.forEach((p, i) => m.setMatrixAt(i, _m.compose(_p.set(p.x, p.y, p.z), _q.setFromAxisAngle(_up, p.ry), _s.set(p.sx, p.sy, p.sz))));
    m.count = parts.length;
    m.instanceMatrix.needsUpdate = true;
  }, [parts]);
  if (!parts.length) return null;
  return <instancedMesh ref={ref} args={[geometry, material, parts.length]} frustumCulled={false} raycast={() => null} />;
}

export default function Billboards() {
  const slots = useMemo(() => buildBillboards(), []);

  const kit = useMemo(() => {
    const dark = new THREE.MeshStandardMaterial({ color: "#2a2f3a", roughness: 0.7 });
    const steel = new THREE.MeshStandardMaterial({ color: "#5a626e", roughness: 0.55, metalness: 0.3 });
    const faces = SLOGAN_ADS.map((ad) => {
      const m = new THREE.MeshBasicMaterial({ map: drawAd(ad, 768, 384), toneMapped: false });
      return [dark, dark, dark, dark, m, m];
    });
    return {
      dark,
      steel,
      faces,
      panel: new THREE.BoxGeometry(BW, BH, 0.16),
      frame: new THREE.BoxGeometry(BW + 0.4, BH + 0.4, 0.12),
      beam: new THREE.BoxGeometry(BW + 0.5, 0.14, 0.22),
      leg: new THREE.CylinderGeometry(0.13, 0.16, 5.1, 8),
      arm: new THREE.BoxGeometry(0.07, 0.07, 0.55),
      lamp: new THREE.BoxGeometry(0.42, 0.16, 0.28),
    };
  }, []);

  const parts = useMemo(
    () => ({
      panel: SLOGAN_ADS.map((_, v) => slots.filter((s) => s.v === v).map((s) => at(s, 0, 3.9, 0))),
      frame: slots.map((s) => at(s, 0, 3.9, -0.1)),
      beam: slots.map((s) => at(s, 0, 5.6, -0.12)),
      legL: slots.map((s) => at(s, -2.1, 2.55, -0.28)),
      legR: slots.map((s) => at(s, 2.1, 2.55, -0.28)),
      arms: slots.flatMap((s) => [-2, 0, 2].map((lx) => at(s, lx, 5.78, 0.18))),
      lamps: slots.flatMap((s) => [-2, 0, 2].map((lx) => at(s, lx, 5.78, 0.5))),
    }),
    [slots],
  );

  return (
    <>
      {parts.panel.map((p, v) => (
        <Instanced key={v} geometry={kit.panel} material={kit.faces[v]} parts={p} />
      ))}
      <Instanced geometry={kit.frame} material={kit.dark} parts={parts.frame} />
      <Instanced geometry={kit.beam} material={kit.steel} parts={parts.beam} />
      <Instanced geometry={kit.leg} material={kit.steel} parts={parts.legL} />
      <Instanced geometry={kit.leg} material={kit.steel} parts={parts.legR} />
      <Instanced geometry={kit.arm} material={kit.steel} parts={parts.arms} />
      {/* floodlights, on with the street lamps */}
      <Instanced geometry={kit.lamp} material={lampMat} parts={parts.lamps} />
    </>
  );
}
