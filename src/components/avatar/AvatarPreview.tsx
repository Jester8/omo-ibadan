"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import Avatar from "./Avatar";
import type { Look } from "@/lib/look";

function Turntable({ look, walk }: { look: Look; walk: boolean }) {
  const g = useRef<THREE.Group>(null);
  const motion = useRef({ speed: 0 });
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.6;
    motion.current.speed = walk ? 1.4 : 0;
  });
  return (
    <group ref={g} position={[0, -0.92, 0]}>
      <Avatar look={look} motion={motion} />
    </group>
  );
}

export default function AvatarPreview({ look, walk = false, className }: { look: Look; walk?: boolean; className?: string }) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.06, 4.7], fov: 30 }} gl={{ alpha: true }} shadows>
        <ambientLight intensity={1.15} />
        <directionalLight position={[2.5, 4, 3]} intensity={2.2} castShadow />
        <directionalLight position={[-3, 1.5, -2]} intensity={0.8} color="#bcd0ff" />
        <Turntable look={look} walk={walk} />
        <mesh rotation-x={-Math.PI / 2} position={[0, -0.925, 0]} receiveShadow>
          <circleGeometry args={[0.8, 48]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.65} roughness={1} />
        </mesh>
      </Canvas>
    </div>
  );
}
