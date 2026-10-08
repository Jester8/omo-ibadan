"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vehicleKind } from "@/lib/cars";
import CarModel from "./CarModel";
import Avatar from "@/components/avatar/Avatar";
import { AVATAR_SCALE } from "./Player";
import { interiorKey } from "@/lib/interiors";
import { emotes, remoteMotion, remoteSits } from "@/lib/playerState";
import { S } from "@/lib/furniture";
import { useGame } from "@/lib/store";

const angleDiff = (a: number, b: number) => {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
};

/* ------------------------------ other players ------------------------------ */

function Remote({ id }: { id: string }) {
  const look = useGame((s) => s.remotes[id]?.look);
  const car = useGame((s) => s.remotes[id]?.car);
  const kind = vehicleKind(car?.id);
  const g = useRef<THREE.Group>(null);
  const motion = useRef<{ speed: number; emote: "wave" | "dance" | null; pose: "sit" | "lie" | null }>({ speed: 0, emote: null, pose: null });
  useFrame((_, dt) => {
    // settled into a sofa, chair or bed: hold the pose where they sat, the same way you see yourself
    const seat = remoteSits.get(id);
    if (seat && g.current) {
      motion.current.pose = seat.pose;
      motion.current.speed = 0;
      if (seat.pose === "sit") {
        g.current.position.set(seat.x, (seat.seatH + 0.04 - 0.865) * S, seat.z);
        g.current.rotation.set(0, seat.ry, 0);
      } else {
        g.current.position.set(seat.x + Math.sin(seat.ry) * 0.85 * S, (seat.seatH + 0.12) * S, seat.z + Math.cos(seat.ry) * 0.85 * S);
        g.current.rotation.set(-Math.PI / 2, seat.ry, 0, "YXZ");
      }
      return;
    }
    motion.current.pose = useGame.getState().remotes[id]?.car?.id === "okada" ? "sit" : null;
    const em = emotes.get(id);
    motion.current.emote = em && em.until > Date.now() ? em.e : null;
    const r = remoteMotion.get(id);
    if (!r || !g.current) return;
    const k = Math.min(1, dt * 9);
    r.x += (r.tx - r.x) * k;
    r.z += (r.tz - r.z) * k;
    r.ry += angleDiff(r.ry, r.tr) * k;
    const gap = Math.hypot(r.tx - r.x, r.tz - r.z);
    motion.current.speed = gap > 0.04 ? Math.max(r.speed, 1.5) : 0;
    g.current.position.set(r.x, 0, r.z);
    g.current.rotation.set(0, r.ry, 0);
  });
  if (!look) return null;
  return (
    <group ref={g}>
      {/* tap another player to open their card */}
      <mesh
        position-y={0.5}
        onClick={(e) => {
          if (e.delta > 6) return;
          e.stopPropagation();
          useGame.getState().select({ type: "player", id });
        }}
      >
        <cylinderGeometry args={[0.34, 0.34, 1.1, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <group visible={!kind} position-y={car?.id === "okada" ? -0.18 : 0}>
        <Avatar look={look} motion={motion} scale={AVATAR_SCALE} />
      </group>
      {kind && car && <CarModel kind={kind} color={car.color} remoteId={id} />}
    </group>
  );
}

/** Players are visible when they are in the same place: both outside, or inside the same building. */
export const sameSpace = (peerRoom: string, mine: string | null) => (mine ? peerRoom === mine : !peerRoom.startsWith("in:"));

export function RemotePlayers() {
  const remotes = useGame((s) => s.remotes);
  const mine = useGame((s) => (s.interior ? interiorKey(s.interior) : null));
  return (
    <>
      {Object.values(remotes)
        .filter((r) => sameSpace(r.room, mine))
        .map((r) => (
          <Remote key={r.id} id={r.id} />
        ))}
    </>
  );
}
