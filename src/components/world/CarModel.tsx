"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { me, remoteMotion } from "@/lib/playerState";
import type { CarKind } from "@/lib/cars";

const dark = new THREE.MeshStandardMaterial({ color: "#1b1e24", roughness: 0.8 });
const glass = new THREE.MeshStandardMaterial({ color: "#a9c4d8", roughness: 0.15, metalness: 0.3 });
const head = new THREE.MeshStandardMaterial({ color: "#fff6cf", emissive: "#fff2b0", emissiveIntensity: 1.4 });
const tail = new THREE.MeshStandardMaterial({ color: "#d63a3a", emissive: "#ff2b2b", emissiveIntensity: 0.9 });
const chrome = new THREE.MeshStandardMaterial({ color: "#cfd6dc", roughness: 0.25, metalness: 0.7 });

function Wheel({ x, y, z, r, remoteId }: { x: number; y: number; z: number; r: number; remoteId?: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const sp = remoteId ? remoteMotion.get(remoteId)?.speed ?? 0 : me.speed;
    if (g.current) g.current.rotation.x += (sp / r) * Math.min(dt, 0.05);
  });
  return (
    <group position={[x, y, z]}>
      <group ref={g}>
        <mesh rotation-z={Math.PI / 2} material={dark} castShadow>
          <cylinderGeometry args={[r, r, 0.07, 14]} />
        </mesh>
        <mesh rotation-z={Math.PI / 2} material={chrome}>
          <cylinderGeometry args={[r * 0.55, r * 0.55, 0.075, 8]} />
        </mesh>
      </group>
    </group>
  );
}

/** Procedural cars in the same toy style as the traffic. +z is forward. */
export default function CarModel({ kind, color, remoteId }: { kind: CarKind; color: string; remoteId?: string }) {
  const paintEl = <meshStandardMaterial color={color} roughness={0.35} metalness={0.25} />;

  if (kind === "keke") {
    return (
      <group>
        <mesh position={[0, 0.2, -0.05]} castShadow>
          <boxGeometry args={[0.4, 0.22, 0.62]} />
          {paintEl}
        </mesh>
        <mesh position={[0, 0.33, 0.2]} material={glass}>
          <boxGeometry args={[0.36, 0.2, 0.04]} />
        </mesh>
        <mesh position={[0, 0.5, -0.1]} material={dark} castShadow>
          <boxGeometry args={[0.42, 0.04, 0.66]} />
        </mesh>
        {[-0.18, 0.18].flatMap((x) => [-0.3, 0.2].map((z) => <mesh key={`${x}${z}`} position={[x, 0.36, z]} material={dark}><boxGeometry args={[0.025, 0.28, 0.025]} /></mesh>))}
        <mesh position={[0, 0.2, 0.34]} castShadow>
          <boxGeometry args={[0.24, 0.16, 0.12]} />
          {paintEl}
        </mesh>
        <mesh position={[0, 0.23, 0.41]} material={head}>
          <boxGeometry args={[0.1, 0.06, 0.02]} />
        </mesh>
        <Wheel remoteId={remoteId} x={0} y={0.08} z={0.36} r={0.08} />
        <Wheel remoteId={remoteId} x={-0.21} y={0.08} z={-0.28} r={0.08} />
        <Wheel remoteId={remoteId} x={0.21} y={0.08} z={-0.28} r={0.08} />
      </group>
    );
  }

  const suv = kind === "suv";
  const L = suv ? 1.15 : 1.05;
  const W = suv ? 0.58 : 0.52;
  const H = suv ? 0.26 : 0.2;
  const r = suv ? 0.1 : 0.085;
  return (
    <group>
      <mesh position={[0, 0.1 + H / 2 + 0.04, 0]} castShadow>
        <boxGeometry args={[W, H, L]} />
        {paintEl}
        </mesh>
      <mesh position={[0, 0.1 + H + 0.04 + (suv ? 0.12 : 0.085), suv ? -0.04 : -0.06]} castShadow>
        <boxGeometry args={[W - 0.06, suv ? 0.24 : 0.17, suv ? L * 0.68 : L * 0.5]} />
        {paintEl}
        </mesh>
      <mesh position={[0, 0.1 + H + 0.04 + (suv ? 0.13 : 0.09), suv ? -0.04 : -0.06]} material={glass}>
        <boxGeometry args={[W - 0.02, suv ? 0.15 : 0.1, suv ? L * 0.69 : L * 0.46]} />
      </mesh>
      <mesh position={[0, 0.1 + H * 0.6, L / 2]} material={head}>
        <boxGeometry args={[W - 0.08, 0.04, 0.02]} />
      </mesh>
      <mesh position={[0, 0.1 + H * 0.6, -L / 2]} material={tail}>
        <boxGeometry args={[W - 0.08, 0.04, 0.02]} />
      </mesh>
      <mesh position={[0, 0.1 + H * 0.2, L / 2 + 0.005]} material={chrome}>
        <boxGeometry args={[W - 0.2, 0.025, 0.02]} />
      </mesh>
      {[-1, 1].flatMap((sx) => [-1, 1].map((sz) => <Wheel remoteId={remoteId} key={`${sx}${sz}`} x={sx * (W / 2 + 0.005)} y={r} z={sz * L * 0.32} r={r} />))}
    </group>
  );
}
