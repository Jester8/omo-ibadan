"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PLACES } from "@/lib/places";
import { PLOTS, PLOT_SIZE } from "@/lib/plots";
import { BLOCKS, CAMPUS, ESTATES, inLake, inRect } from "@/lib/world";
import { RANKS } from "./CabRanks";

/** Ibadan's famous sea of brown corrugated roofs: small gabled houses filling the free lots. */
const RUST = ["#9c4f2f", "#a85a3c", "#8f4a2b", "#b0623f", "#7f4128", "#a24f2e", "#b56a45"];
const WALLS = ["#efe3cc", "#e8d9bd", "#f4ead7", "#d9c8a8", "#e6d3b3"];

type House = { x: number; z: number; w: number; d: number; h: number; ry: number; roof: string; wall: string };

function build(): House[] {
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const taken = [
    ...PLACES.map((p) => ({ x: p.pos[0], z: p.pos[1], hw: p.size[0] / 2 + 1.1, hd: p.size[2] / 2 + 1.7 })),
    ...PLOTS.map((p) => ({ x: p.pos[0], z: p.pos[1], hw: PLOT_SIZE / 2 + 0.6, hd: PLOT_SIZE / 2 + 0.6 })),
    ...RANKS.map((r) => ({ x: r.pos[0], z: r.pos[1], hw: 4.2, hd: 2 })),
  ];
  const out: House[] = [];
  for (const b of BLOCKS) {
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (rnd() < 0.3) continue;
        const x = b.c[0] + i * 1.75 + (rnd() - 0.5) * 0.35;
        const z = b.c[1] + j * 1.75 + (rnd() - 0.5) * 0.35;
        if (taken.some((t) => Math.abs(x - t.x) < t.hw && Math.abs(z - t.z) < t.hd)) continue;
        // estates and the campus keep their own, more formal look
        if (inRect(CAMPUS.rect, x, z, 0.5) || ESTATES.some((e) => inRect(e.rect, x, z, 0.5)) || inLake(x, z)) continue;
        out.push({ x, z, w: 0.95 + rnd() * 0.5, d: 0.8 + rnd() * 0.4, h: 0.34 + rnd() * 0.18, ry: rnd() < 0.5 ? 0 : Math.PI / 2, roof: RUST[Math.floor(rnd() * RUST.length)], wall: WALLS[Math.floor(rnd() * WALLS.length)] });
      }
    }
  }
  return out;
}

const HOUSES = build();

/** Corrugated iron: fine ridges across the slope. */
function corrugated() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d")!;
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, 64, 64);
  for (let x = 0; x < 64; x += 8) {
    g.fillStyle = "rgba(60,25,10,0.28)";
    g.fillRect(x, 0, 3, 64);
    g.fillStyle = "rgba(255,230,200,0.35)";
    g.fillRect(x + 4, 0, 2, 64);
  }
  // rust streaks
  for (let i = 0; i < 18; i++) {
    g.fillStyle = `rgba(90,40,15,${0.05 + (i % 3) * 0.04})`;
    g.fillRect((i * 29) % 64, (i * 13) % 64, 6, 14);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 1);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function gable() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.58, 0);
  shape.lineTo(0.58, 0);
  shape.lineTo(0, 0.34);
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: 1.12, bevelEnabled: false });
  g.translate(0, 0, -0.56);
  return g;
}

export default function Roofscape() {
  const walls = useRef<THREE.InstancedMesh>(null);
  const roofs = useRef<THREE.InstancedMesh>(null);
  const tex = useMemo(() => corrugated(), []);
  const geo = useMemo(() => gable(), []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const col = new THREE.Color();
    HOUSES.forEach((h, i) => {
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), h.ry);
      m.compose(new THREE.Vector3(h.x, 0.04 + h.h / 2, h.z), q, new THREE.Vector3(h.w, h.h, h.d));
      walls.current!.setMatrixAt(i, m);
      walls.current!.setColorAt(i, col.set(h.wall));
      // the roof prism: width along the house's depth, ridge along its length
      m.compose(new THREE.Vector3(h.x, 0.04 + h.h, h.z), q, new THREE.Vector3(h.d * 1.0, 1.15, h.w * 0.9));
      roofs.current!.setMatrixAt(i, m);
      roofs.current!.setColorAt(i, col.set(h.roof));
    });
    for (const im of [walls.current!, roofs.current!]) {
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
  }, []);

  return (
    <>
      <instancedMesh ref={walls} args={[undefined, undefined, HOUSES.length]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.95} />
      </instancedMesh>
      <instancedMesh ref={roofs} args={[geo, undefined, HOUSES.length]} frustumCulled={false} castShadow>
        <meshStandardMaterial map={tex} roughness={0.75} metalness={0.15} />
      </instancedMesh>
    </>
  );
}
