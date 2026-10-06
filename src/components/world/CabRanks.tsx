"use client";

import { RIDES } from "@/lib/cars";
import { useGame } from "@/lib/store";
import { walkTo } from "@/lib/movement";
import CarModel from "./CarModel";

export const RANKS: { id: string; name: string; pos: [number, number] }[] = [
  { id: "ui", name: "UI Cab Park", pos: [-25, -14] },
  { id: "iwo", name: "Iwo Road Cab Park", pos: [25, -6] },
  { id: "dugbe", name: "Dugbe Cab Park", pos: [-2, 5.8] },
];

// two bays of each kind, parked nose-to-the-road
const BAYS = RIDES.flatMap((r, i) => [0, 1].map((k) => ({ ride: r, x: (i * 2 + k - 2.5) * 1.05, z: 0 })));

/** A cab park: tap a parked cab to climb in and say where you are going. */
export default function CabRanks() {
  return (
    <>
      {RANKS.map((rank) => (
        <group key={rank.id} position={[rank.pos[0], 0, rank.pos[1]]}>
          <mesh position={[0, 0.045, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[7.2, 2.4]} />
            <meshStandardMaterial color="#5c6370" roughness={1} />
          </mesh>
          {BAYS.map((b, i) => (
            <mesh key={i} position={[b.x, 0.05, 0]} rotation-x={-Math.PI / 2}>
              <planeGeometry args={[0.04, 1.9]} />
              <meshBasicMaterial color="#f4f1e6" />
            </mesh>
          ))}
          {/* sign */}
          <group position={[-3.4, 0, 1.4]}>
            <mesh position={[0, 0.7, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 1.4, 6]} />
              <meshStandardMaterial color="#6b7380" />
            </mesh>
            <mesh position={[0, 1.4, 0]}>
              <boxGeometry args={[1.3, 0.32, 0.06]} />
              <meshStandardMaterial color="#f2b632" emissive="#f2b632" emissiveIntensity={0.25} />
            </mesh>
          </group>
          {BAYS.map((b, i) => (
            <group
              key={i}
              position={[b.x, 0.05, 0]}
              onClick={(e) => {
                if (e.delta > 6) return;
                e.stopPropagation();
                useGame.getState().select({ type: "cab", id: `${rank.id}:${b.ride.id}` });
                walkTo(rank.pos[0] + b.x, rank.pos[1] + 2.2);
              }}
              onPointerOver={() => (document.body.style.cursor = "pointer")}
              onPointerOut={() => (document.body.style.cursor = "auto")}
            >
              <CarModel kind={b.ride.id} color={b.ride.color} fixed={0} />
              <mesh position={[0, 0.3, 0]}>
                <boxGeometry args={[0.7, 0.7, 1.2]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </>
  );
}
