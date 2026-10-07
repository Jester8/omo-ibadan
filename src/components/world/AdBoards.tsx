"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ADS, type Ad } from "@/lib/ads";
import { PLACES } from "@/lib/places";
import { PLOTS } from "@/lib/plots";
import { CAMPUS, ESTATES, ROAD_LINES, inLake, inRect } from "@/lib/world";
import { RANKS } from "./CabRanks";

const BOARD_W = 1.5;
const BOARD_H = 0.78;
const POST_H = 1.25;

type Spot = { x: number; z: number; ry: number; ad: number };

/** Roadside banner posts, a few steps off the kerb along the streets, each showing one of the ads. */
function makeSpots(): Spot[] {
  const taken = [
    ...PLACES.map((p) => ({ x: p.pos[0], z: p.pos[1], hw: p.size[0] / 2 + 1.6, hd: p.size[2] / 2 + 2.2 })),
    ...PLOTS.map((p) => ({ x: p.pos[0], z: p.pos[1], hw: 2.4, hd: 2.4 })),
    ...RANKS.map((r) => ({ x: r.pos[0], z: r.pos[1], hw: 4.6, hd: 3 })),
  ];
  const out: Spot[] = [];
  let n = 0;
  const add = (x: number, z: number, ry: number) => {
    if (Math.abs(x) > 72 || Math.abs(z) > 72) return;
    if (inLake(x, z) || inRect(CAMPUS.rect, x, z, 1.5) || ESTATES.some((e) => inRect(e.rect, x, z, 1.2))) return;
    if (taken.some((t) => Math.abs(x - t.x) < t.hw && Math.abs(z - t.z) < t.hd)) return;
    out.push({ x, z, ry, ad: n++ % ADS.length });
  };
  // streets running north-south: boards face along the street so drivers coming either way can read them
  ROAD_LINES.forEach((r, ri) => {
    if (ri % 2) return;
    for (let k = 0, z = -63; z <= 63; z += 14, k++) add(r + (k % 2 ? 1.5 : -1.5), z + (ri % 4 ? 0 : 7), 0);
  });
  // streets running east-west
  ROAD_LINES.forEach((r, ri) => {
    if (!(ri % 2)) return;
    for (let k = 0, x = -63; x <= 63; x += 16, k++) add(x + (ri % 4 ? 7 : 0), r + (k % 2 ? 1.5 : -1.5), Math.PI / 2);
  });
  return out;
}

function adTexture(ad: Ad) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 266;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 512, 266);
  grad.addColorStop(0, ad.bg);
  grad.addColorStop(1, ad.bg2);
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 266);
  g.fillStyle = "rgba(255,255,255,0.1)";
  g.beginPath();
  g.arc(470, 40, 120, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = ad.fg;
  g.textAlign = "center";
  g.textBaseline = "middle";
  let size = 62;
  g.font = `900 ${size}px system-ui, sans-serif`;
  while (g.measureText(ad.title).width > 460 && size > 26) {
    size -= 4;
    g.font = `900 ${size}px system-ui, sans-serif`;
  }
  g.fillText(ad.title, 256, 110);
  g.globalAlpha = 0.92;
  let s2 = 24;
  g.font = `600 ${s2}px system-ui, sans-serif`;
  while (g.measureText(ad.line).width > 470 && s2 > 13) {
    s2 -= 1;
    g.font = `600 ${s2}px system-ui, sans-serif`;
  }
  g.fillText(ad.line, 256, 182);
  g.globalAlpha = 1;
  g.font = "700 16px system-ui, sans-serif";
  g.textAlign = "left";
  g.fillStyle = "rgba(255,255,255,0.65)";
  g.fillText("AD", 16, 24);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _up = new THREE.Vector3(0, 1, 0);

/** Instanced: one mesh per ad for the boards, one for all the posts. Cheap on phones. */
export default function AdBoards() {
  const spots = useMemo(() => makeSpots(), []);
  const posts = useRef<THREE.InstancedMesh>(null);
  const edge = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2a2f3a", roughness: 0.7 }), []);
  const mats = useMemo(() => ADS.map((ad) => new THREE.MeshBasicMaterial({ map: adTexture(ad), toneMapped: false })), []);
  const boxes = useMemo(() => new THREE.BoxGeometry(BOARD_W, BOARD_H, 0.07), []);
  const refs = useRef<(THREE.InstancedMesh | null)[]>([]);

  useLayoutEffect(() => {
    const counts = new Array(ADS.length).fill(0);
    spots.forEach((s, i) => {
      _q.setFromAxisAngle(_up, s.ry);
      posts.current?.setMatrixAt(i, _m.compose(new THREE.Vector3(s.x, POST_H / 2, s.z), _q, new THREE.Vector3(1, 1, 1)));
      const m = refs.current[s.ad];
      if (m) m.setMatrixAt(counts[s.ad]++, _m.compose(new THREE.Vector3(s.x, POST_H + BOARD_H / 2 - 0.1, s.z), _q, new THREE.Vector3(1, 1, 1)));
    });
    if (posts.current) {
      posts.current.count = spots.length;
      posts.current.instanceMatrix.needsUpdate = true;
    }
    refs.current.forEach((m, a) => {
      if (!m) return;
      m.count = counts[a];
      m.instanceMatrix.needsUpdate = true;
    });
  }, [spots]);

  return (
    <>
      <instancedMesh ref={posts} args={[undefined, undefined, spots.length]} frustumCulled={false} castShadow raycast={() => null}>
        <cylinderGeometry args={[0.045, 0.06, POST_H, 8]} />
        <meshStandardMaterial color="#444b55" roughness={0.6} />
      </instancedMesh>
      {ADS.map((ad, a) => (
        <instancedMesh
          key={ad.id}
          ref={(m) => void (refs.current[a] = m)}
          args={[boxes, [edge, edge, edge, edge, mats[a], mats[a]], spots.filter((s) => s.ad === a).length]}
          frustumCulled={false}
          raycast={() => null}
        />
      ))}
    </>
  );
}
