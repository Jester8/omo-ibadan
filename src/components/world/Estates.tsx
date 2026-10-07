"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Gate } from "./Gates";
import { Wall } from "./PlotsLayer";
import { lampMat, mat } from "./materials";
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

const noRaycast = () => null;

function Tree({ x, z, s = 1 }: { x: number; z: number; s?: number }) {
  return (
    <group position={[x, 0, z]} scale={s}>
      <mesh position={[0, 0.3, 0]} material={mat("#7a5a3c")} castShadow raycast={noRaycast}>
        <cylinderGeometry args={[0.07, 0.1, 0.6, 7]} />
      </mesh>
      <mesh position={[0, 0.95, 0]} material={mat("#4f9a4d")} castShadow raycast={noRaycast}>
        <icosahedronGeometry args={[0.5, 1]} />
      </mesh>
    </group>
  );
}

/** The estate park: lawn, fountain, benches, a playground and a jogging loop. */
function Park({ cx, cz }: { cx: number; cz: number }) {
  return (
    <group position={[cx, 0, cz]}>
      <mesh position={[0, 0.045, 0]} rotation-x={-Math.PI / 2} receiveShadow raycast={noRaycast}>
        <planeGeometry args={[8.2, 8.2]} />
        <meshStandardMaterial color="#8cc57a" roughness={1} />
      </mesh>
      <mesh position={[0, 0.06, 0]} rotation-x={-Math.PI / 2} raycast={noRaycast}>
        <ringGeometry args={[3.0, 3.45, 40]} />
        <meshStandardMaterial color="#d9b88f" roughness={1} />
      </mesh>
      {/* fountain */}
      <mesh position={[0, 0.2, 0]} material={mat("#e9e3d4")} castShadow>
        <cylinderGeometry args={[0.9, 1, 0.34, 20]} />
      </mesh>
      <mesh position={[0, 0.38, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.78, 20]} />
        <meshStandardMaterial color="#59c2e6" roughness={0.1} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.7, 0]} material={mat("#e9e3d4")} castShadow>
        <cylinderGeometry args={[0.1, 0.16, 0.7, 10]} />
      </mesh>
      {/* benches */}
      {[
        [0, -2.35, 0],
        [0, 2.35, Math.PI],
        [-2.35, 0, Math.PI / 2],
        [2.35, 0, -Math.PI / 2],
      ].map(([x, z, r], i) => (
        <group key={i} position={[x, 0, z]} rotation-y={r}>
          <mesh position={[0, 0.22, 0]} material={mat("#8a5a34")} castShadow>
            <boxGeometry args={[0.9, 0.06, 0.28]} />
          </mesh>
          <mesh position={[0, 0.42, -0.12]} material={mat("#8a5a34")} castShadow>
            <boxGeometry args={[0.9, 0.22, 0.04]} />
          </mesh>
        </group>
      ))}
      {/* playground: swing frame and a slide */}
      <group position={[-3.0, 0, 3.0]}>
        {[-0.6, 0.6].map((x) => (
          <mesh key={x} position={[x, 0.45, 0]} material={mat("#d63a3a")} castShadow>
            <boxGeometry args={[0.06, 0.9, 0.06]} />
          </mesh>
        ))}
        <mesh position={[0, 0.9, 0]} material={mat("#d63a3a")} castShadow>
          <boxGeometry args={[1.3, 0.06, 0.06]} />
        </mesh>
        {[-0.25, 0.25].map((x) => (
          <mesh key={x} position={[x, 0.4, 0]} material={mat("#2a2f3a")}>
            <boxGeometry args={[0.28, 0.04, 0.16]} />
          </mesh>
        ))}
      </group>
      <group position={[3.0, 0, 3.0]}>
        <mesh position={[0, 0.3, 0]} material={mat("#f2b632")} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.5]} />
        </mesh>
        <mesh position={[0.6, 0.28, 0]} rotation-z={-0.65} material={mat("#4a90e2")} castShadow>
          <boxGeometry args={[0.9, 0.05, 0.4]} />
        </mesh>
      </group>
      {[[-3.2, -3.2], [3.2, -3.2], [-3.2, 0.1], [3.3, 0.2], [0.2, 3.5], [-0.2, -3.5]].map(([x, z], i) => (
        <Tree key={i} x={x} z={z} s={0.9 + (i % 3) * 0.2} />
      ))}
    </group>
  );
}

/** The estate clubhouse, with a pool, and a small court. */
function Club({ cx, cz }: { cx: number; cz: number }) {
  return (
    <group position={[cx, 0, cz]}>
      <mesh position={[0, 0.045, 0]} rotation-x={-Math.PI / 2} receiveShadow raycast={noRaycast}>
        <planeGeometry args={[8.2, 8.2]} />
        <meshStandardMaterial color="#d8d2c4" roughness={1} />
      </mesh>
      {/* the building, in the north-west of the block */}
      <Wall tint="#f4ead7" w={4.6} h={1.5} d={3.2} p={[-1.4, 0.06, -1.8]} />
      <mesh position={[-1.4, 0.06 + 1.5 + 0.05, -1.8]} material={mat("#c9473a")} castShadow>
        <boxGeometry args={[4.9, 0.12, 3.5]} />
      </mesh>
      <mesh position={[-1.4, 0.06 + 1.5 + 0.42, -1.8]} rotation-y={Math.PI / 4} scale={[1.9, 1, 1.3]} material={mat("#a0512f", 0.7)} castShadow>
        <coneGeometry args={[1.5, 0.7, 4]} />
      </mesh>
      <mesh position={[-1.4, 0.55, -0.15]} material={mat("#8fb6d6")}>
        <boxGeometry args={[2.0, 0.55, 0.04]} />
      </mesh>
      <mesh position={[-1.4, 1.8, -0.1]} material={lampMat}>
        <boxGeometry args={[1.5, 0.2, 0.03]} />
      </mesh>
      {/* pool */}
      <mesh position={[1.5, 0.07, 1.6]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[3.4, 1.9]} />
        <meshStandardMaterial color="#59c2e6" roughness={0.12} metalness={0.15} />
      </mesh>
      <mesh position={[1.5, 0.05, 1.6]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[3.7, 2.2]} />
        <meshStandardMaterial color="#f3efe6" />
      </mesh>
      {/* court */}
      <mesh position={[-2.3, 0.07, 2.7]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[3.0, 2.4]} />
        <meshStandardMaterial color="#3f8f56" roughness={0.9} />
      </mesh>
      <mesh position={[-2.3, 0.075, 2.7]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.45, 0.5, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {[[-3.4, 2.7], [-1.2, 2.7]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.7, 0]} material={mat("#444b55")} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 1.4, 6]} />
          </mesh>
          <mesh position={[i ? -0.15 : 0.15, 1.35, 0]} material={mat("#ffffff")}>
            <boxGeometry args={[0.04, 0.4, 0.55]} />
          </mesh>
        </group>
      ))}
      {[[3.2, -3.0], [3.4, 0.2], [-3.6, 0.4]].map(([x, z], i) => (
        <Tree key={i} x={x} z={z} s={1} />
      ))}
    </group>
  );
}

/** Street lamps along the streets inside an estate. */
function Lamps({ estate }: { estate: Estate }) {
  const [x1, z1] = estate.origin;
  const pts: [number, number][] = [];
  for (const dx of [10, 20, 30]) for (let k = 0; k < 4; k++) pts.push([x1 + dx + 1.1, z1 + 3.5 + k * 7.6]);
  for (const dz of [10, 20]) for (let k = 0; k < 5; k++) pts.push([x1 + 3.5 + k * 8, z1 + dz + 1.1]);
  return (
    <>
      {pts.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.55, 0]} material={mat("#444b55")} castShadow raycast={noRaycast}>
            <cylinderGeometry args={[0.025, 0.035, 1.1, 6]} />
          </mesh>
          <mesh position={[0, 1.13, 0]} material={lampMat} raycast={noRaycast}>
            <sphereGeometry args={[0.09, 8, 6]} />
          </mesh>
        </group>
      ))}
    </>
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
          <Park cx={e.park[0]} cz={e.park[1]} />
          <Club cx={e.club[0]} cz={e.club[1]} />
          <Lamps estate={e} />
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
