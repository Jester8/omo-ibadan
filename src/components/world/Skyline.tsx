"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { facadeMaterials, windowMats } from "./materials";

const TINTS = ["#9fb4c8", "#c9b8a0", "#8fa6a0", "#b8b3c9", "#d4c19a", "#a9bfd1", "#c7a99a"];

type Tower = { x: number; z: number; w: number; d: number; h: number; tint: string; rot: number };

/** Deterministic ring of high-rises around the edge of the city, so Ibadan has a real skyline. */
function makeSkyline(): Tower[] {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const out: Tower[] = [];
  for (let i = 0; i < 70; i++) {
    const a = (i / 70) * Math.PI * 2 + rnd() * 0.12;
    const r = 56 + rnd() * 16;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    if (x < -46 && Math.abs(z) < 24) continue; // Eleyele lake
    const tall = rnd() > 0.7;
    out.push({ x, z, w: 1.6 + rnd() * 1.4, d: 1.6 + rnd() * 1.4, h: tall ? 8 + rnd() * 7 : 4 + rnd() * 4, tint: TINTS[Math.floor(rnd() * TINTS.length)], rot: rnd() * 0.5 });
  }
  return out;
}

const TOWERS = makeSkyline();

function SkyTower({ t }: { t: Tower }) {
  const mats = useMemo(() => facadeMaterials(t.w, t.h, t.d, t.tint), [t]);
  useEffect(() => {
    const glow = mats.filter((m): m is THREE.MeshStandardMaterial => !!(m as THREE.MeshStandardMaterial).emissiveMap);
    glow.forEach((m) => windowMats.add(m));
    return () => glow.forEach((m) => windowMats.delete(m));
  }, [mats]);
  return (
    <group position={[t.x, 0, t.z]} rotation-y={t.rot}>
      <mesh position={[0, t.h / 2, 0]} material={mats} castShadow>
        <boxGeometry args={[t.w, t.h, t.d]} />
      </mesh>
      <mesh position={[0, t.h + 0.08, 0]}>
        <boxGeometry args={[t.w * 0.7, 0.16, t.d * 0.7]} />
        <meshStandardMaterial color="#e9e5da" />
      </mesh>
      {t.h > 8 && (
        <mesh position={[0, t.h + 0.7, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
          <meshStandardMaterial color="#b9b3a3" />
        </mesh>
      )}
    </group>
  );
}

export default function Skyline() {
  const towers = TOWERS;
  return (
    <>
      {towers.map((t, i) => (
        <SkyTower key={i} t={t} />
      ))}
    </>
  );
}
