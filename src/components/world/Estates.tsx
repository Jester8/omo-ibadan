"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Gate } from "./Gates";
import { hasAccess } from "@/lib/estates";
import { useGame } from "@/lib/store";
import { CAMPUS, ESTATES, wallsFor, type Estate, type Zone } from "@/lib/world";

const H = 0.7;

function Walls({ zone, color, cap }: { zone: Zone; color: string; cap: string }) {
  const walls = wallsFor(zone);
  return (
    <>
      {walls.map((w, i) => (
        <group key={i} position={[w.x, 0, w.z]}>
          <mesh position={[0, H / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w.w, H, w.d]} />
            <meshStandardMaterial color={color} roughness={0.9} />
          </mesh>
          <mesh position={[0, H + 0.04, 0]}>
            <boxGeometry args={[w.w + 0.06, 0.08, w.d + 0.06]} />
            <meshStandardMaterial color={cap} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </>
  );
}

/** A red and white boom that lifts when you may enter. Tap it to see the estate's rules. */
function Boom({ estate, x, z, across }: { estate: Estate; x: number; z: number; across: "x" | "z" }) {
  const arm = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const s = useGame.getState();
    const open = hasAccess(estate, { plots: s.plots, profileId: s.profile?.id, passes: s.passes }, Date.now());
    if (arm.current) arm.current.rotation.z = THREE.MathUtils.damp(arm.current.rotation.z, open ? Math.PI / 2.2 : 0, 6, dt);
  });
  const rot = across === "z" ? Math.PI / 2 : 0;
  return (
    <group
      position={[x, 0, z]}
      rotation-y={rot}
      onClick={(e) => {
        if (e.delta > 6) return;
        e.stopPropagation();
        useGame.getState().select({ type: "gate", id: estate.id });
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* guard hut + post */}
      <mesh position={[1.35, 0.4, 0]} castShadow>
        <boxGeometry args={[0.5, 0.8, 0.5]} />
        <meshStandardMaterial color="#f1e9d2" />
      </mesh>
      <mesh position={[1.35, 0.84, 0]}>
        <boxGeometry args={[0.62, 0.08, 0.62]} />
        <meshStandardMaterial color="#8a3a2a" />
      </mesh>
      <mesh position={[-1.2, 0.3, 0]}>
        <boxGeometry args={[0.14, 0.6, 0.14]} />
        <meshStandardMaterial color="#444b55" />
      </mesh>
      {/* the arm pivots at the post, along the road */}
      <group ref={arm} position={[-1.2, 0.55, 0]}>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} position={[0.2 + i * 0.4, 0, 0]}>
            <boxGeometry args={[0.4, 0.07, 0.07]} />
            <meshStandardMaterial color={i % 2 ? "#ffffff" : "#d63a3a"} />
          </mesh>
        ))}
      </group>
      {/* a fat invisible target so a tap always finds the gate */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.8, 1.1, 0.9]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function Estates() {
  return (
    <>
      <Walls zone={CAMPUS} color="#8a4a3a" cap="#c9b79a" />
      {CAMPUS.gates.map((g, i) => (
        <Gate key={i} g={{ x: g.x, z: g.z, across: g.across, title: "University of Ibadan", sub: i === 0 ? "Main Gate · Welcome" : "East Gate · Students & visitors", color: "#7a1f2e" }} />
      ))}
      {ESTATES.map((e) => (
        <group key={e.id}>
          <Walls zone={e} color="#efe6d0" cap="#b9ad93" />
          {e.gates.map((g, i) => (
            <group key={i}>
              <Gate g={{ x: g.x, z: g.z, across: g.across, title: e.name, sub: "Residents & pass holders", color: "#1f5f8a" }} />
              <Boom estate={e} x={g.x} z={g.z} across={g.across} />
            </group>
          ))}
        </group>
      ))}
    </>
  );
}
