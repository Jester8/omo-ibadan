"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { boardMat, boardMats, facadeMaterials, neonMat, windowMats } from "./materials";

/**
 * The kit every civic building style (civicStylesLaw.tsx, civicStylesPublic.tsx) is written with.
 * A civic building is a few MERGED, vertex-coloured meshes instead of dozens of loose ones: about 4 to 6 draw calls each.
 * Local frame: origin = bottom-centre of the footprint, +z = front (the door and the sign), y up. Positions of boxes and cylinders are BOTTOM-centre.
 */

export type V3 = [number, number, number];
export type StyleProps = { size: V3; color: string; name?: string; id?: string };
type Opts = { rx?: number; ry?: number; rz?: number; s?: V3 };

/** A shape moved into place with its colour baked in (same recipe as PlotsLayer.part). */
export function part(g: THREE.BufferGeometry, hex: string, p: V3, o: Opts = {}): THREE.BufferGeometry {
  const m = new THREE.Matrix4().compose(new THREE.Vector3(...p), new THREE.Quaternion().setFromEuler(new THREE.Euler(o.rx ?? 0, o.ry ?? 0, o.rz ?? 0)), new THREE.Vector3(...(o.s ?? [1, 1, 1])));
  const geo = (g.index ? g.toNonIndexed() : g.clone()).applyMatrix4(m);
  const c = new THREE.Color(hex);
  const n = geo.attributes.position.count;
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) col.set([c.r, c.g, c.b], i * 3);
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return geo;
}

/** BOTTOM-centre box and cylinder, like Box and Cyl in Buildings.tsx. */
export const B = (w: number, h: number, d: number, hex: string, p: V3 = [0, 0, 0], o?: Opts) => part(new THREE.BoxGeometry(w, h, d), hex, [p[0], p[1] + h / 2, p[2]], o);
export const C = (r: number, h: number, hex: string, p: V3 = [0, 0, 0], r2 = r, seg = 10, o?: Opts) => part(new THREE.CylinderGeometry(r2, r, h, seg), hex, [p[0], p[1] + h / 2, p[2]], o);
export const Dome = (r: number, hex: string, p: V3) => part(new THREE.SphereGeometry(r, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), hex, p);
/** A triangular prism lying along x (pediments and gables); `len` runs along x, `r` is the circumradius of the triangle. */
export const Prism = (r: number, len: number, hex: string, p: V3) => part(new THREE.CylinderGeometry(r, r, len, 3), hex, p, { rx: Math.PI / 2, ry: Math.PI / 2 });
export const merge = (parts: THREE.BufferGeometry[]) => mergeGeometries(parts, false)!;

export const bodyMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, metalness: 0.02 });

/** One merged `body` and one merged `glow` geometry per style and size, built once and never disposed (pass dispose={null} on the meshes that use them). */
type Built = { body: THREE.BufferGeometry[]; glow: THREE.BufferGeometry[] };
const geoCache = new Map<string, { body: THREE.BufferGeometry; glow: THREE.BufferGeometry }>();
export function memoGeo(key: string, build: () => Built) {
  let g = geoCache.get(key);
  if (!g) {
    const b = build();
    g = { body: merge(b.body), glow: merge(b.glow.length ? b.glow : [B(0.01, 0.01, 0.01, "#000000", [0, -5, 0])]) };
    geoCache.set(key, g);
  }
  return g;
}

/**
 * A self-lit material in any colour on the city's night curve: off by day, bright at night, mostly out in a NEPA outage.
 * It is the shared `neonMat` of materials.ts (Lighting.tsx drives it), so this adds no per-frame work. `pulse` makes it breathe.
 */
export const civicGlow = (hex: string, pulse = false): THREE.MeshStandardMaterial => neonMat(hex, pulse, 0);

/** Same as Facade in Buildings.tsx: a box whose side walls carry the window grid that lights up at night (windowMats). */
export function CivicFacade({ p = [0, 0, 0], w, h, d, tint }: { p?: V3; w: number; h: number; d: number; tint: string }) {
  const mats = useMemo(() => facadeMaterials(w, h, d, tint), [w, h, d, tint]);
  useEffect(() => {
    mats.filter((m): m is THREE.MeshStandardMaterial => !!(m as THREE.MeshStandardMaterial).emissiveMap).forEach((m) => windowMats.add(m));
  }, [mats]);
  return (
    <mesh position={[p[0], p[1] + h / 2, p[2]]} material={mats} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
    </mesh>
  );
}

function signTexture(text: string, bg: string, fg: string) {
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
  while (g.measureText(text).width > 470 && size > 28) {
    size -= 4;
    g.font = `800 ${size}px system-ui, sans-serif`;
  }
  g.fillText(text, 256, 68);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** A lit name board: a plane facing +z, full bright by day and night, dimmed by NEPA (it registers with boardMats while mounted, like the restaurant signs). */
export function Sign({ text, bg, fg, w, h, p }: { text: string; bg: string; fg: string; w: number; h: number; p: V3 }) {
  const tex = useMemo(() => signTexture(text, bg, fg), [text, bg, fg]);
  const m = useMemo(() => boardMat(tex), [tex]);
  useEffect(() => {
    boardMats.add(m);
    return () => {
      boardMats.delete(m);
    };
  }, [m]);
  return (
    <mesh position={p} material={m}>
      <planeGeometry args={[w, h]} />
    </mesh>
  );
}

/** The fallback every civic style starts as (Phase 0 stubs): a plain block with a sign, so the app never crashes on a missing style. */
export function GenericCivic({ size: [w, h, d], color, name = "" }: StyleProps) {
  const g = memoGeo(`generic|${w}|${h}|${d}|${color}`, () => ({ body: [B(w, 0.04, d, "#cfd3d9"), B(w - 0.4, h, d - 0.4, color, [0, 0.04, 0])], glow: [] }));
  return (
    <>
      <mesh geometry={g.body} material={bodyMat} castShadow receiveShadow dispose={null} />
      <Sign text={name.toUpperCase().slice(0, 28)} bg="#1f2937" fg="#ffffff" w={Math.min(w - 0.3, 1.8)} h={0.3} p={[0, h * 0.7, (d - 0.4) / 2 + 0.05]} />
    </>
  );
}
