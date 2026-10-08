"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ADS, SLOGAN_ADS, type Ad } from "@/lib/ads";
import { PLACES } from "@/lib/places";
import { PLOTS } from "@/lib/plots";
import { CAMPUS, ESTATES, HILLS, ROAD_LINES, inLake, inRect } from "@/lib/world";
import { RANKS } from "./CabRanks";
import { lampMat } from "./materials";

/**
 * Advertising that fills the edges of the map and the streets: giant "PUT YOUR ADS HERE" billboards on a ring outside the
 * city and on the hilltops, big boards at the street corners, light-box ad boxes along the pavements, pole banners and
 * banners hung across the roads. Everything is instanced (a handful of draw calls) and the floodlights use the shared
 * lamp material, so they come on at night with the street lamps.
 */

const BW = 6;
const BH = 3;

type Slot = { x: number; z: number; ry: number; v: number; y?: number; s?: number };
type Part = { x: number; y: number; z: number; ry: number; sx: number; sy: number; sz: number };

/** A point in a slot's own space (x along the board, y up, z out of its face) in world space. */
function at(s: Slot, lx: number, ly: number, lz: number): [number, number, number] {
  const sc = s.s ?? 1;
  const c = Math.cos(s.ry);
  const n = Math.sin(s.ry);
  return [s.x + (lx * c + lz * n) * sc, (s.y ?? 0) + ly * sc, s.z + (-lx * n + lz * c) * sc];
}
const part = (s: Slot, lx: number, ly: number, lz: number): Part => {
  const [x, y, z] = at(s, lx, ly, lz);
  const sc = s.s ?? 1;
  return { x, y, z, ry: s.ry, sx: sc, sy: sc, sz: sc };
};

/** Faces the middle of the map. */
const inward = (x: number, z: number) => Math.atan2(-x, -z);

/* ---------------------------------- where everything goes ---------------------------------- */

type Layout = {
  boards: Slot[];
  boxes: Slot[];
  poles: Slot[];
  spans: Slot[];
};

export function buildLayout(): Layout {
  const taken = [
    ...PLACES.map((p) => ({ x: p.pos[0], z: p.pos[1], hw: p.size[0] / 2 + 1.2, hd: p.size[2] / 2 + 1.8 })),
    ...PLOTS.map((p) => ({ x: p.pos[0], z: p.pos[1], hw: 2.6, hd: 2.6 })),
    ...RANKS.map((r) => ({ x: r.pos[0], z: r.pos[1], hw: 4.8, hd: 3.2 })),
  ];
  /** Is there room for something about `half` metres across at this spot, inside the city? */
  const free = (x: number, z: number, half: number) =>
    Math.abs(x) < 72 &&
    Math.abs(z) < 72 &&
    !inLake(x, z) &&
    !inRect(CAMPUS.rect, x, z, 1.5 + half) &&
    !ESTATES.some((e) => inRect(e.rect, x, z, 1.2 + half)) &&
    !taken.some((t) => Math.abs(x - t.x) < t.hw + half && Math.abs(z - t.z) < t.hd + half);

  const boards: Slot[] = [];
  const boxes: Slot[] = [];
  const poles: Slot[] = [];
  const spans: Slot[] = [];
  let n = 0;

  /* --- outside the city: a ring of big boards, every one facing in at the streets --- */
  const R = 80;
  for (let k = -4; k <= 4; k++) {
    const t = k * 16;
    for (const [x, z] of [[t, -R], [t, R], [-R, t], [R, t]] as const) boards.push({ x, z, ry: inward(x, z), v: n++ % SLOGAN_ADS.length });
  }
  // the four corners get the largest ones
  for (const [x, z] of [[-86, -86], [86, -86], [-86, 86], [86, 86]] as const) boards.push({ x, z, ry: inward(x, z), v: n++ % SLOGAN_ADS.length, s: 1.5 });
  // and some stand on the hilltops beyond, huge, so they can be read from the tower
  HILLS.forEach((h, i) => {
    if (i % 4 === 0) boards.push({ x: h.x, z: h.z, y: h.h - 0.15, ry: inward(h.x, h.z), v: n++ % SLOGAN_ADS.length, s: 1.8 });
  });

  /* --- across the city: big boards at street corners, never on top of a place, plot, estate or the lake --- */
  ROAD_LINES.forEach((rx, i) =>
    ROAD_LINES.forEach((rz, j) => {
      if ((i * 3 + j * 5) % 4 !== 0) return;
      // try the four corners of the crossing, starting with a different one each time, and take the first with room
      const start = (i + 2 * j) % 4;
      for (let k = 0; k < 4; k++) {
        const c = (start + k) % 4;
        const x = rx + (c & 1 ? 4.4 : -4.4);
        const z = rz + (c & 2 ? 4.4 : -4.4);
        if (!free(x, z, 3.4)) continue;
        boards.push({ x, z, ry: (i + j) % 2 ? 0 : Math.PI / 2, v: n++ % SLOGAN_ADS.length, s: 0.85 });
        break;
      }
    }),
  );

  /* --- ad boxes: lit boxes on the pavement, facing the road --- */
  ROAD_LINES.forEach((r, i) => {
    for (let k = -6; k <= 6; k++) {
      if ((i + k * 2 + 20) % 6 !== 0) continue;
      const a = k * 10 + 5; // mid-block
      const side = (i + k) % 2 ? 1 : -1;
      // a street running north-south (x = r), then one running east-west (z = r)
      const sx = r + side * 1.6;
      if (free(sx, a, 1.2)) boxes.push({ x: sx, z: a, ry: -side * (Math.PI / 2), v: n++ % 8 });
      const sz = r + side * 1.6;
      if (free(a, sz, 1.2)) boxes.push({ x: a, z: sz, ry: side > 0 ? Math.PI : 0, v: n++ % 8 });
    }
  });
  // outside, a row of boxes between the big boards
  for (let k = -4; k <= 4; k++) {
    const t = k * 16 + 8;
    for (const [x, z] of [[t, -77.6], [t, 77.6], [-77.6, t], [77.6, t]] as const) if (Math.abs(t) < 72) boxes.push({ x, z, ry: inward(x, z), v: n++ % 8 });
  }

  /* --- pole banners: at the corners of some crossings, and in a long line just outside the city --- */
  ROAD_LINES.forEach((rx, i) =>
    ROAD_LINES.forEach((rz, j) => {
      if ((i + j * 2) % 4 !== 0) return;
      const x = rx + 1.5;
      const z = rz + 1.5;
      if (free(x, z, 0.8)) poles.push({ x, z, ry: (i + j) % 2 ? 0 : Math.PI / 2, v: n++ % 8 });
    }),
  );
  for (let t = -72; t <= 72; t += 8) {
    for (const [x, z] of [[t, -75.9], [t, 75.9], [-75.9, t], [75.9, t]] as const) poles.push({ x, z, ry: inward(x, z), v: n++ % 8 });
  }

  /* --- banners hung across a road between two poles --- */
  ROAD_LINES.forEach((r, i) => {
    if (i === 0 || i === ROAD_LINES.length - 1 || i % 2) return;
    for (let k = -6; k <= 6; k++) {
      if ((i + k * 3 + 30) % 5 !== 0) continue;
      const a = k * 10 + 5;
      // across a road running north-south: the banner runs east-west and faces along the road
      if (free(r - 2.1, a, 0.6) && free(r + 2.1, a, 0.6)) spans.push({ x: r, z: a, ry: 0, v: n++ % 4 });
      // across a road running east-west
      if (free(a, r - 2.1, 0.6) && free(a, r + 2.1, 0.6)) spans.push({ x: a, z: r, ry: Math.PI / 2, v: n++ % 4 });
    }
  });

  return { boards, boxes, poles, spans };
}

/* -------------------------------------- the pictures -------------------------------------- */

/** A tidy canvas for one ad. "wide" is a billboard or a banner, "tall" stacks the words for boxes and pole banners. */
function drawAd(ad: Ad, w: number, h: number, mode: "wide" | "tall"): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, ad.bg);
  grad.addColorStop(1, ad.bg2);
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);
  // diagonal stripes so a far-off board still reads as a poster, not a flat colour
  g.fillStyle = "rgba(255,255,255,0.07)";
  for (let x = -h; x < w + h; x += Math.max(36, w / 14)) {
    g.beginPath();
    g.moveTo(x, h);
    g.lineTo(x + h * 0.5, 0);
    g.lineTo(x + h * 0.5 + Math.max(14, w / 40), 0);
    g.lineTo(x + Math.max(14, w / 40), h);
    g.closePath();
    g.fill();
  }
  g.lineWidth = Math.max(4, Math.min(w, h) * 0.025);
  g.strokeStyle = ad.fg;
  g.globalAlpha = 0.85;
  g.strokeRect(g.lineWidth * 1.5, g.lineWidth * 1.5, w - g.lineWidth * 3, h - g.lineWidth * 3);
  g.globalAlpha = 1;

  g.textAlign = "center";
  g.textBaseline = "middle";
  const font = (px: number, weight = 900) => `${weight} ${px}px "Arial Black", system-ui, sans-serif`;
  const fit = (text: string, start: number, max: number, min: number, weight = 900) => {
    let px = start;
    g.font = font(px, weight);
    while (g.measureText(text).width > max && px > min) {
      px -= 2;
      g.font = font(px, weight);
    }
    return px;
  };
  const stamp = (text: string, x: number, y: number, px: number) => {
    g.lineJoin = "round";
    g.lineWidth = Math.max(3, px * 0.09);
    g.strokeStyle = "rgba(0,0,0,0.32)";
    g.strokeText(text, x, y);
    g.fillStyle = ad.fg;
    g.fillText(text, x, y);
  };

  if (mode === "wide") {
    const thin = w / h > 3; // a banner hung across a road
    const title = ad.title.toUpperCase();
    const px = fit(title, h * (thin ? 0.62 : 0.34), w * 0.9, 18);
    stamp(title, w / 2, h * (thin ? 0.44 : 0.4), px);
    fit(ad.line, h * (thin ? 0.2 : 0.085), w * 0.88, 10, 700);
    g.globalAlpha = 0.95;
    g.fillStyle = ad.fg;
    g.fillText(ad.line, w / 2, h * (thin ? 0.82 : 0.74));
    g.globalAlpha = 1;
    if (!thin) {
      g.font = font(h * 0.06, 800);
      g.textAlign = "left";
      g.fillStyle = "rgba(255,255,255,0.7)";
      g.fillText("AD SPACE", w * 0.045, h * 0.12);
      g.textAlign = "right";
      g.fillText("AVAILABLE NOW", w * 0.955, h * 0.12);
    }
  } else {
    const words = ad.title.toUpperCase().split(" ");
    const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
    const px = Math.min(fit(longest, w * 0.5, w * 0.82, 16), (h * 0.62) / words.length);
    g.font = font(px);
    const top = h * 0.07 + (h * 0.62 - px * 1.1 * words.length) / 2;
    words.forEach((word, i) => stamp(word, w / 2, top + px * 0.55 + i * px * 1.1, px));
    // the small print, wrapped to the width
    const spx = Math.max(12, w * 0.075);
    g.font = font(spx, 700);
    g.fillStyle = ad.fg;
    g.globalAlpha = 0.95;
    const lines: string[] = [];
    let cur = "";
    for (const word of ad.line.split(" ")) {
      const next = cur ? `${cur} ${word}` : word;
      if (g.measureText(next).width > w * 0.84 && cur) {
        lines.push(cur);
        cur = word;
      } else cur = next;
    }
    if (cur) lines.push(cur);
    lines.slice(0, 4).forEach((l, i) => g.fillText(l, w / 2, h * 0.76 + i * spx * 1.25));
    g.globalAlpha = 1;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** The mix for boxes and pole banners: the invitation, with a few sample ads between so the streets do not look empty. */
const MIX: Ad[] = [SLOGAN_ADS[0], ADS[1], SLOGAN_ADS[1], ADS[3], SLOGAN_ADS[2], ADS[4], SLOGAN_ADS[3], ADS[6]];

/* ------------------------------------------ drawing ------------------------------------------ */

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
  const layout = useMemo(() => buildLayout(), []);

  const kit = useMemo(() => {
    const dark = new THREE.MeshStandardMaterial({ color: "#2a2f3a", roughness: 0.7 });
    const steel = new THREE.MeshStandardMaterial({ color: "#5a626e", roughness: 0.55, metalness: 0.3 });
    const face = (ad: Ad, w: number, h: number, mode: "wide" | "tall") => {
      const m = new THREE.MeshBasicMaterial({ map: drawAd(ad, w, h, mode), toneMapped: false });
      return [dark, dark, dark, dark, m, m];
    };
    return {
      dark,
      steel,
      boardFaces: SLOGAN_ADS.map((a) => face(a, 768, 384, "wide")),
      spanFaces: SLOGAN_ADS.slice(0, 4).map((a) => face(a, 1024, 236, "wide")),
      tallFaces: MIX.map((a) => face(a, 256, 512, "tall")),
      boardPanel: new THREE.BoxGeometry(BW, BH, 0.16),
      boardFrame: new THREE.BoxGeometry(BW + 0.4, BH + 0.4, 0.12),
      boardBeam: new THREE.BoxGeometry(BW + 0.5, 0.14, 0.22),
      boardLeg: new THREE.CylinderGeometry(0.13, 0.16, 5.1, 8),
      boardArm: new THREE.BoxGeometry(0.07, 0.07, 0.55),
      boardLamp: new THREE.BoxGeometry(0.42, 0.16, 0.28),
      boxBody: new THREE.BoxGeometry(1.1, 1.7, 0.22),
      boxBase: new THREE.BoxGeometry(0.8, 0.4, 0.3),
      boxCap: new THREE.BoxGeometry(1.24, 0.1, 0.34),
      boxStrip: new THREE.BoxGeometry(1.0, 0.04, 0.22),
      pole: new THREE.CylinderGeometry(0.035, 0.045, 2.4, 6),
      poleArm: new THREE.BoxGeometry(0.55, 0.04, 0.04),
      poleBanner: new THREE.BoxGeometry(0.5, 1.15, 0.025),
      spanPole: new THREE.CylinderGeometry(0.05, 0.065, 2.9, 8),
      spanCable: new THREE.BoxGeometry(4.1, 0.03, 0.03),
      spanBanner: new THREE.BoxGeometry(3.8, 0.88, 0.03),
    };
  }, []);

  const parts = useMemo(() => {
    const { boards, boxes, poles, spans } = layout;
    const byVariant = <T,>(slots: Slot[], n: number, f: (s: Slot) => T) => Array.from({ length: n }, (_, v) => slots.filter((s) => s.v === v).map(f));
    return {
      panel: byVariant(boards, SLOGAN_ADS.length, (s) => part(s, 0, 3.9, 0)),
      frame: boards.map((s) => part(s, 0, 3.9, -0.1)),
      beam: boards.map((s) => part(s, 0, 5.6, -0.12)),
      legL: boards.map((s) => part(s, -2.1, 2.55, -0.28)),
      legR: boards.map((s) => part(s, 2.1, 2.55, -0.28)),
      arms: boards.flatMap((s) => [-2, 0, 2].map((lx) => part(s, lx, 5.78, 0.18))),
      lamps: boards.flatMap((s) => [-2, 0, 2].map((lx) => part(s, lx, 5.78, 0.5))),
      boxBody: byVariant(boxes, MIX.length, (s) => part(s, 0, 1.25, 0)),
      boxBase: boxes.map((s) => part(s, 0, 0.2, 0)),
      boxCap: boxes.map((s) => part(s, 0, 2.15, 0)),
      boxStrip: boxes.map((s) => part(s, 0, 2.22, 0.02)),
      pole: poles.map((s) => part(s, 0, 1.2, 0)),
      poleArm: poles.map((s) => part(s, 0.27, 2.34, 0)),
      poleBanner: byVariant(poles, MIX.length, (s) => part(s, 0.3, 1.7, 0)),
      spanPoleL: spans.map((s) => part(s, -2.05, 1.45, 0)),
      spanPoleR: spans.map((s) => part(s, 2.05, 1.45, 0)),
      spanCable: spans.map((s) => part(s, 0, 2.85, 0)),
      spanBanner: byVariant(spans, 4, (s) => part(s, 0, 2.38, 0)),
    };
  }, [layout]);

  return (
    <>
      {/* big boards */}
      {parts.panel.map((p, v) => (
        <Instanced key={`bp${v}`} geometry={kit.boardPanel} material={kit.boardFaces[v]} parts={p} />
      ))}
      <Instanced geometry={kit.boardFrame} material={kit.dark} parts={parts.frame} />
      <Instanced geometry={kit.boardBeam} material={kit.steel} parts={parts.beam} />
      <Instanced geometry={kit.boardLeg} material={kit.steel} parts={parts.legL} />
      <Instanced geometry={kit.boardLeg} material={kit.steel} parts={parts.legR} />
      <Instanced geometry={kit.boardArm} material={kit.steel} parts={parts.arms} />
      <Instanced geometry={kit.boardLamp} material={lampMat} parts={parts.lamps} />
      {/* ad boxes */}
      {parts.boxBody.map((p, v) => (
        <Instanced key={`xb${v}`} geometry={kit.boxBody} material={kit.tallFaces[v]} parts={p} />
      ))}
      <Instanced geometry={kit.boxBase} material={kit.dark} parts={parts.boxBase} />
      <Instanced geometry={kit.boxCap} material={kit.dark} parts={parts.boxCap} />
      <Instanced geometry={kit.boxStrip} material={lampMat} parts={parts.boxStrip} />
      {/* pole banners */}
      <Instanced geometry={kit.pole} material={kit.steel} parts={parts.pole} />
      <Instanced geometry={kit.poleArm} material={kit.steel} parts={parts.poleArm} />
      {parts.poleBanner.map((p, v) => (
        <Instanced key={`pb${v}`} geometry={kit.poleBanner} material={kit.tallFaces[v]} parts={p} />
      ))}
      {/* banners across the roads */}
      <Instanced geometry={kit.spanPole} material={kit.steel} parts={parts.spanPoleL} />
      <Instanced geometry={kit.spanPole} material={kit.steel} parts={parts.spanPoleR} />
      <Instanced geometry={kit.spanCable} material={kit.dark} parts={parts.spanCable} />
      {parts.spanBanner.map((p, v) => (
        <Instanced key={`sb${v}`} geometry={kit.spanBanner} material={kit.spanFaces[v]} parts={p} />
      ))}
    </>
  );
}
