"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { AD_CONTACT, PLAZA_MATS, type Ad } from "@/lib/ads";
import { AD_PLAZA } from "@/lib/world";
import { drawAd } from "./adArt";
import { lampMat } from "./materials";

/**
 * The Ad Plaza: one paved city block set aside for advertising. The banners are not hung up, they lie on the ground like
 * mats you walk over, each a numbered ad space. Replace a mat's ad in PLAZA_MATS (src/lib/ads.ts) to sell that space.
 * Local coordinates: +z is the front (south), so the writing reads upright from the entrance side.
 */

/** x, z (centre), width, depth of each mat, in plaza space: a long headline mat, four standard mats and four small ones. */
const LAYOUT: { x: number; z: number; w: number; d: number }[] = [
  { x: 0, z: -2.9, w: 7.6, d: 1.9 },
  { x: -1.95, z: -0.75, w: 3.7, d: 1.9 },
  { x: 1.95, z: -0.75, w: 3.7, d: 1.9 },
  { x: -1.95, z: 1.35, w: 3.7, d: 1.9 },
  { x: 1.95, z: 1.35, w: 3.7, d: 1.9 },
  ...[-2.925, -0.975, 0.975, 2.925].map((x) => ({ x, z: 3.2, w: 1.75, d: 1.0 })),
];

const SLAB_TOP = 0.07;
const noRay = () => null;

/** Large paving slabs, drawn once. */
function pavingTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#d9d2c3";
  g.fillRect(0, 0, 256, 256);
  g.strokeStyle = "rgba(90,80,65,0.28)";
  g.lineWidth = 3;
  g.strokeRect(1.5, 1.5, 253, 253);
  g.strokeStyle = "rgba(90,80,65,0.1)";
  g.lineWidth = 1;
  for (let i = 64; i < 256; i += 64) {
    g.beginPath();
    g.moveTo(i, 0);
    g.lineTo(i, 256);
    g.moveTo(0, i);
    g.lineTo(256, i);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 4);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const SIGN: Ad = { id: "plaza-sign", title: "AD PLAZA", line: `Put your ads here: ${AD_CONTACT}`, bg: "#111827", bg2: "#1f2937", fg: "#fbbf24" };

export default function AdPlaza() {
  const kit = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({ color: "#2a2f3a", roughness: 0.8 });
    const mats = LAYOUT.map((m, i) => {
      const ad = PLAZA_MATS[i % PLAZA_MATS.length];
      const px = Math.round(m.w * 168);
      const map = drawAd(ad, px, Math.round((px * m.d) / m.w), `AD SPACE ${String(i + 1).padStart(2, "0")}`);
      // lit a little from within, so a mat still reads after dark
      const top = new THREE.MeshStandardMaterial({ map, emissiveMap: map, emissive: new THREE.Color("#ffffff"), emissiveIntensity: 0.4, roughness: 0.85 });
      return { geo: new THREE.BoxGeometry(m.w, 0.03, m.d), faces: [edge, edge, top, edge, edge, edge] };
    });
    const signTex = drawAd(SIGN, 1024, 256, "WELCOME TO THE", "BODIJA");
    const sign = new THREE.MeshBasicMaterial({ map: signTex, toneMapped: false });
    return {
      edge,
      mats,
      paving: new THREE.MeshStandardMaterial({ map: pavingTexture(), roughness: 1 }),
      signFaces: [edge, edge, edge, edge, sign, sign],
      post: new THREE.MeshStandardMaterial({ color: "#444b55", roughness: 0.6 }),
    };
  }, []);

  const s = AD_PLAZA.half * 2;
  return (
    <group position={[AD_PLAZA.x, 0, AD_PLAZA.z]}>
      {/* the paved square and a darker border */}
      <mesh position={[0, SLAB_TOP - 0.015, 0]} material={kit.paving} receiveShadow raycast={noRay}>
        <boxGeometry args={[s, 0.03, s]} />
      </mesh>
      {[
        [0, -AD_PLAZA.half, s, 0.18],
        [0, AD_PLAZA.half, s, 0.18],
        [-AD_PLAZA.half, 0, 0.18, s],
        [AD_PLAZA.half, 0, 0.18, s],
      ].map(([x, z, w, d], i) => (
        <mesh key={i} position={[x, SLAB_TOP, z]} material={kit.edge} raycast={noRay}>
          <boxGeometry args={[w, 0.05, d]} />
        </mesh>
      ))}

      {/* the banners lying on the ground */}
      {LAYOUT.map((m, i) => (
        <mesh key={i} position={[m.x, SLAB_TOP + 0.015, m.z]} geometry={kit.mats[i].geo} material={kit.mats[i].faces} receiveShadow raycast={noRay} />
      ))}

      {/* floodlight posts at the four corners, on with the street lamps */}
      {[-1, 1].flatMap((sx) =>
        [-1, 1].map((sz) => (
          <group key={`${sx}${sz}`} position={[sx * (AD_PLAZA.half - 0.2), 0, sz * (AD_PLAZA.half - 0.2)]}>
            <mesh position={[0, 0.7, 0]} material={kit.post} castShadow raycast={noRay}>
              <cylinderGeometry args={[0.035, 0.05, 1.4, 8]} />
            </mesh>
            <mesh position={[0, 1.45, 0]} material={lampMat} raycast={noRay}>
              <sphereGeometry args={[0.13, 10, 8]} />
            </mesh>
          </group>
        )),
      )}

      {/* the entrance sign over the front edge */}
      <group position={[0, 0, AD_PLAZA.half + 0.05]}>
        {[-1.9, 1.9].map((x) => (
          <mesh key={x} position={[x, 0.85, 0]} material={kit.post} castShadow raycast={noRay}>
            <cylinderGeometry args={[0.06, 0.07, 1.7, 8]} />
          </mesh>
        ))}
        <mesh position={[0, 1.8, 0]} material={kit.signFaces} raycast={noRay}>
          <boxGeometry args={[4.2, 1.05, 0.1]} />
        </mesh>
      </group>
    </group>
  );
}
