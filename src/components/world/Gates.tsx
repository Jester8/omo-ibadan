"use client";

import { useMemo } from "react";
import * as THREE from "three";

/** Archways across the main roads: city entrances and district gates. `across` is the road direction the arch spans. */
const GATES: { x: number; z: number; across: "x" | "z"; title: string; sub: string; color: string }[] = [
  { x: 0, z: -43, across: "x", title: "IBADAN", sub: "North Gate · Welcome", color: "#2f6f4f" },
  { x: 0, z: 43, across: "x", title: "IBADAN", sub: "South Gate · Come again", color: "#2f6f4f" },
  { x: -43, z: 0, across: "z", title: "IBADAN", sub: "West Gate · Eleyele Road", color: "#2f6f4f" },
  { x: 43, z: 0, across: "z", title: "IBADAN", sub: "East Gate · Iwo Road", color: "#2f6f4f" },
  { x: 30, z: 0, across: "z", title: "Iwo Road", sub: "Garage · interstate buses", color: "#4a4f58" },
];

function signTexture(title: string, sub: string, color: string) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 160;
  const g = c.getContext("2d")!;
  g.fillStyle = color;
  g.fillRect(0, 0, 512, 160);
  g.strokeStyle = "rgba(255,255,255,0.55)";
  g.lineWidth = 6;
  g.strokeRect(10, 10, 492, 140);
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.font = "bold 62px system-ui, sans-serif";
  g.fillText(title, 256, 88, 470);
  g.font = "500 28px system-ui, sans-serif";
  g.fillStyle = "rgba(255,255,255,0.85)";
  g.fillText(sub, 256, 130, 470);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export type GateSpec = { x: number; z: number; across: "x" | "z"; title: string; sub: string; color: string };

export function Gate({ g }: { g: GateSpec }) {
  const tex = useMemo(() => signTexture(g.title, g.sub, g.color), [g]);
  const W = 3.3;
  const H = 2.3;
  return (
    <group position={[g.x, 0, g.z]} rotation-y={g.across === "x" ? 0 : Math.PI / 2}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * (W / 2), 0, 0]}>
          <mesh position={[0, H / 2, 0]} castShadow>
            <boxGeometry args={[0.38, H, 0.38]} />
            <meshStandardMaterial color="#e8dfcb" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.52, 0.24, 0.52]} />
            <meshStandardMaterial color="#b9ad93" roughness={0.9} />
          </mesh>
          <mesh position={[0, H + 0.14, 0]} castShadow>
            <boxGeometry args={[0.52, 0.28, 0.52]} />
            <meshStandardMaterial color={g.color} roughness={0.6} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, H + 0.18, 0]} castShadow>
        <boxGeometry args={[W + 0.5, 0.2, 0.46]} />
        <meshStandardMaterial color="#e8dfcb" roughness={0.8} />
      </mesh>
      {/* sign board, readable from both sides */}
      {[0.245, -0.245].map((z) => (
        <mesh key={z} position={[0, H - 0.55, z]} rotation-y={z < 0 ? Math.PI : 0}>
          <planeGeometry args={[W - 0.4, 1.0]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, H - 0.55, 0]}>
        <boxGeometry args={[W - 0.4, 1.0, 0.46]} />
        <meshStandardMaterial color={g.color} />
      </mesh>
    </group>
  );
}

export default function Gates() {
  return (
    <>
      {GATES.map((g) => (
        <Gate key={`${g.x},${g.z}`} g={g} />
      ))}
    </>
  );
}
