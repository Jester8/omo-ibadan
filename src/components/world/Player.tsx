"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DECK_Y } from "@/lib/interiorRuntime";
import { audio } from "@/lib/audio";
import { carById, rideById } from "@/lib/cars";
import CarModel from "./CarModel";
import Avatar from "@/components/avatar/Avatar";
import { useGame } from "@/lib/store";
import { PLACES, doorOf } from "@/lib/places";
import { boost, cam, emotes, me } from "@/lib/playerState";
import { isBlockedAt } from "@/lib/pathing";
import { net } from "@/lib/net";
import { S } from "@/lib/furniture";
import { endUse, exitInterior, startUse } from "@/lib/interiorRuntime";

/** Avatars are ~1.7 units tall; scaled to sit well with the buildings. */
export const AVATAR_SCALE = 0.56;
/** Height above the ground for name tags and speech bubbles. */
export const TAG_Y = 1.2;

const KEY_MAP: Record<string, string> = {
  w: "f",
  arrowup: "f",
  s: "b",
  arrowdown: "b",
  a: "l",
  arrowleft: "l",
  d: "r",
  arrowright: "r",
};

const angleDiff = (a: number, b: number) => {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
};

export default function Player() {
  const profile = useGame((s) => s.profile);
  const driving = useGame((s) => s.driving && !s.interior);
  const car = useGame((s) => carById(s.activeCar));
  const ride = useGame((s) => (s.ride && !s.interior ? s.ride : null));
  const carColor = useGame((s) => (s.activeCar ? s.carColors[s.activeCar] : undefined));
  const group = useRef<THREE.Group>(null);
  const marker = useRef<THREE.Mesh>(null);
  const motion = useRef<{ speed: number; pose: "sit" | "lie" | null; emote: "wave" | "dance" | null; eat: "bowl" | "cup" | "snack" | null }>({ speed: 0, pose: null, emote: null, eat: null });
  const keys = useRef(new Set<string>());
  const sent = useRef({ t: 0, x: 0, z: 0, s: 0 });

  useEffect(() => {
    const typing = () => {
      const el = document.activeElement;
      return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
    };
    const down = (e: KeyboardEvent) => {
      if (!typing() && (e.key === "h" || e.key === "H")) {
        const st = useGame.getState();
        if (st.driving || st.ride) audio.horn(st.ride === "okada");
      }
      if (!typing() && (e.key === "z" || e.key === "Z")) net.emote("wave");
      if (!typing() && (e.key === "x" || e.key === "X")) net.emote("dance");
      const k = KEY_MAP[e.key.toLowerCase()];
      if (k && !typing()) keys.current.add(k);
    };
    const up = (e: KeyboardEvent) => {
      const k = KEY_MAP[e.key.toLowerCase()];
      if (k) keys.current.delete(k);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((state, rawDt) => {
    const s = useGame.getState();
    if (!s.profile || !group.current) return;
    const dt = Math.min(rawDt, 0.05);
    motion.current.eat = s.busy?.food ?? null;

    // up on Bower's Tower: stand on the deck and look around
    if (s.deck) {
      me.path = [];
      me.speed = 0;
      motion.current.speed = 0;
      motion.current.pose = null;
      group.current.position.set(me.x, DECK_Y, me.z);
      group.current.rotation.set(0, me.ry, 0);
      return;
    }

    // seated or sleeping on furniture: hold the pose until the action finishes
    if (me.use) {
      if (!s.busy) {
        endUse();
      } else {
        me.speed = 0;
        motion.current.speed = 0;
        motion.current.pose = me.use.pose;
        const u = me.use;
        if (u.pose === "sit") {
          group.current.position.set(u.x, (u.seatH + 0.04 - 0.865) * S, u.z);
          group.current.rotation.set(0, u.ry, 0);
        } else {
          group.current.position.set(u.x + Math.sin(u.ry) * 0.85 * S, (u.seatH + 0.12) * S, u.z + Math.cos(u.ry) * 0.85 * S);
          group.current.rotation.set(-Math.PI / 2, u.ry, 0, "YXZ");
        }
        return;
      }
    }
    motion.current.pose = s.ride === "okada" && !s.interior ? "sit" : null;
    const em = emotes.get("me");
    motion.current.emote = s.busy?.emote ?? (em && em.until > Date.now() && !me.path.length ? em.e : null);

    const energy = s.needs.energy;
    const tired = energy < 3 ? 0.4 : energy < 15 ? 0.65 : 1;
    const ownCar = s.driving && !s.interior ? carById(s.activeCar) : undefined;
    const base = s.interior ? 2.2 * tired : ownCar ? ownCar.speed : me.ride ? rideById(s.ride)?.speed ?? 8.5 : Date.now() < boost.until ? 6.5 : 3.1 * tired;
    let moving = false;
    let tx = me.ry;

    const k = keys.current;
    const kf = (k.has("f") ? 1 : 0) - (k.has("b") ? 1 : 0);
    const kr = (k.has("r") ? 1 : 0) - (k.has("l") ? 1 : 0);
    if (s.busy) {
      me.path = [];
    } else if (kf || kr) {
      me.path = [];
      me.goalPlace = null;
      const fx = -Math.sin(cam.az);
      const fz = -Math.cos(cam.az);
      let dx = fx * kf + -fz * kr;
      let dz = fz * kf + fx * kr;
      const len = Math.hypot(dx, dz) || 1;
      dx /= len;
      dz /= len;
      const step = base * dt;
      const nx = me.x + dx * step;
      const nz = me.z + dz * step;
      if (!isBlockedAt(nx, me.z)) me.x = nx;
      if (!isBlockedAt(me.x, nz)) me.z = nz;
      tx = Math.atan2(dx, dz);
      moving = true;
    } else if (me.path.length) {
      const t = me.path[0];
      const dx = t.x - me.x;
      const dz = t.z - me.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 0.12) {
        me.path.shift();
      } else {
        const step = Math.min(dist, base * dt);
        me.x += (dx / dist) * step;
        me.z += (dz / dist) * step;
        tx = Math.atan2(dx, dz);
        moving = true;
      }
    }

    me.ry += angleDiff(me.ry, tx) * Math.min(1, dt * 12);
    me.speed += ((moving ? base : 0) - me.speed) * Math.min(1, dt * 10);
    if (me.speed < 0.02) me.speed = 0;
    motion.current.speed = me.speed;
    group.current.position.set(me.x, 0, me.z);
    group.current.rotation.set(0, me.ry, 0);

    // which place are we standing at? (not while inside a building)
    if (!s.interior) {
      let near: string | null = null;
      let best = 1.7;
      for (const p of PLACES) {
        const d = doorOf(p);
        const dist = Math.hypot(d.x - me.x, d.z - me.z);
        if (dist < best) {
          best = dist;
          near = p.id;
        }
      }
      if (near !== s.atPlace) s.setAtPlace(near);
    }
    if (!me.path.length) {
      me.goalPlace = null;
      me.ride = false;
      if (s.ride) useGame.setState({ ride: null });
      // arrived at a piece of furniture or the exit mat
      if (!s.busy && !moving) {
        if (me.pendingUse !== null) {
          const idx = me.pendingUse;
          me.pendingUse = null;
          startUse(idx);
        } else if (me.pendingExit) {
          me.pendingExit = false;
          exitInterior();
        }
      }
    }

    // destination marker
    if (marker.current) {
      const last = me.path[me.path.length - 1];
      marker.current.visible = !!last;
      if (last) {
        marker.current.position.set(last.x, 0.09, last.z);
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.12;
        marker.current.scale.set(pulse, pulse, 1);
      }
    }

    // network
    const now = performance.now();
    const o = sent.current;
    const changed = Math.abs(o.x - me.x) > 0.01 || Math.abs(o.z - me.z) > 0.01 || Math.abs(o.s - me.speed) > 0.3;
    if (s.net === "online" && now - o.t > 100 && changed) {
      net.move(Math.round(me.x * 100) / 100, Math.round(me.z * 100) / 100, Math.round(me.ry * 100) / 100, Math.round(me.speed * 10) / 10);
      o.t = now;
      o.x = me.x;
      o.z = me.z;
      o.s = me.speed;
    }
  });

  if (!profile) return null;
  return (
    <>
      <group ref={group}>
        <group visible={!driving && (!ride || ride === "okada")} position-y={ride === "okada" ? -0.18 : 0}>
          <Avatar look={profile.look} motion={motion} scale={AVATAR_SCALE} />
        </group>
        {driving && car && <CarModel kind={car.kind} color={carColor ?? car.colors[0]} />}
        {!driving && ride && <CarModel kind={ride} color={rideById(ride)!.color} />}
      </group>
      <mesh ref={marker} rotation-x={-Math.PI / 2} visible={false}>
        <ringGeometry args={[0.22, 0.3, 28]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.9} />
      </mesh>
    </>
  );
}
