"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vehicleKind } from "@/lib/cars";
import CarModel from "./CarModel";
import Avatar from "@/components/avatar/Avatar";
import { AVATAR_SCALE } from "./Player";
import { PLACES, doorOf } from "@/lib/places";
import { findWorldPath, type Pt } from "@/lib/pathing";
import { interiorKey } from "@/lib/interiors";
import { seededLook, topsFor, type Look } from "@/lib/look";
import { walkTo } from "@/lib/movement";
import { emotes, me, remoteMotion } from "@/lib/playerState";
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
  const motion = useRef<{ speed: number; emote: "wave" | "dance" | null; pose: "sit" | null }>({ speed: 0, emote: null, pose: null });
  useFrame((_, dt) => {
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
    g.current.rotation.y = r.ry;
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

/* ----------------------------------- NPCs ----------------------------------- */

type Npc = {
  id: string;
  name: string;
  look: Look;
  st: { x: number; z: number; ry: number; speed: number; path: Pt[]; waitUntil: number; place: string | null; nextChat: number };
};

/** Six women (ids npc-0..5, see romance.ts) and four men. */
const NAMES = ["Bisi", "Kemi", "Ngozi", "Funke", "Yetunde", "Tolani", "Kunle", "Femi", "Ayo", "Seun"];

function npcLook(name: string, female: boolean): Look {
  const frame = female ? ("f" as const) : ("m" as const);
  const look = { ...seededLook(`npc-${name}`), frame };
  const tops = topsFor(frame);
  return tops.some((t) => t.id === look.top) ? look : { ...look, top: tops[0].id };
}

const LINES: Record<string, string[]> = {
  default: ["How far? Una dey alright?", "Ibadan is peace o.", "Abeg make NEPA no take light again.", "E kaaro o!", "Who wan chop?"],
  "amala-skye": ["Ewedu soft die!", "Abeg add one more ponmo.", "Gbegiri don finish for the first pot."],
  "bodija-market": ["Madam, last price?", "Tomatoes fresh o, come see!", "Oya buy, no dull yourself."],
  dugbe: ["Customer, what you dey find?", "Cloth dey here, original."],
  stadium: ["Shooting Stars go win today!", "Who dey call that offside?!"],
  "cocoa-house": ["Meeting by 2pm, don't be late.", "This deal is big, trust me."],
  ui: ["Exam don dey near o.", "Who get the lecture notes?"],
  "agodi": ["This lake is so calm.", "Fresh air, finally."],
};

export const NPCS: Npc[] = NAMES.map((name, i) => {
  const p = PLACES[(i * 5) % PLACES.length];
  const d = doorOf(p);
  return {
    id: `npc-${i}`,
    name,
    look: npcLook(name, i < 6),
    st: { x: d.x, z: d.z + 0.5, ry: 0, speed: 0, path: [], waitUntil: Math.random() * 6000, place: p.id, nextChat: Date.now() + 8000 + Math.random() * 15000 },
  };
});

function NpcActor({ index }: { index: number }) {
  const npcLook = NPCS[index].look;
  const g = useRef<THREE.Group>(null);
  const motion = useRef<{ speed: number; eat: "bowl" | null }>({ speed: 0, eat: null });
  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const npc = NPCS[index];
    const st = npc.st;
    const now = Date.now();
    const gs = useGame.getState();
    motion.current.eat = gs.dateWith && gs.selected?.id === npc.id ? "bowl" : null;
    if (gs.selected?.type === "npc" && gs.selected.id === npc.id && Math.hypot(me.x - st.x, me.z - st.z) < 3.2) {
      // she stops to talk and turns towards you
      st.path = [];
      st.waitUntil = now + 4000;
      st.ry += angleDiff(st.ry, Math.atan2(me.x - st.x, me.z - st.z)) * Math.min(1, dt * 8);
    }
    if (!st.path.length && now > st.waitUntil) {
      const dest = PLACES[Math.floor(Math.random() * PLACES.length)];
      if (dest.id !== st.place) {
        const d = doorOf(dest);
        const path = findWorldPath(st.x, st.z, d.x + (Math.random() - 0.5), d.z + 0.2);
        if (path) {
          st.path = path;
          st.place = null;
          (st as typeof st & { dest?: string }).dest = dest.id;
        }
      }
      st.waitUntil = now + 2000;
    }
    let moving = false;
    if (st.path.length) {
      const t = st.path[0];
      const dx = t.x - st.x;
      const dz = t.z - st.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 0.15) {
        st.path.shift();
        if (!st.path.length) {
          st.place = (st as typeof st & { dest?: string }).dest ?? null;
          st.waitUntil = now + 9000 + Math.random() * 14000;
        }
      } else {
        const step = Math.min(dist, 2.0 * dt);
        st.x += (dx / dist) * step;
        st.z += (dz / dist) * step;
        st.ry += angleDiff(st.ry, Math.atan2(dx, dz)) * Math.min(1, dt * 10);
        moving = true;
      }
    }
    st.speed += ((moving ? 2.0 : 0) - st.speed) * Math.min(1, dt * 8);
    motion.current.speed = st.speed;
    if (g.current) {
      g.current.position.set(st.x, 0, st.z);
      g.current.rotation.y = st.ry;
    }
    // ambient chatter, only when the player is in this NPC's room
    if (now > st.nextChat) {
      st.nextChat = now + 20000 + Math.random() * 25000;
      const s = useGame.getState();
      if (st.place && s.atPlace === st.place) {
        const pool = LINES[st.place] ?? LINES.default;
        s.addChat({ room: st.place, from: npc.name, text: pool[Math.floor(Math.random() * pool.length)], at: now, npc: true }, npc.id);
      }
    }
  });
  return (
    <group ref={g}>
      <Avatar look={npcLook} motion={motion} scale={AVATAR_SCALE} />
      {/* generous invisible hit area so a tap finds her */}
      <mesh
        position-y={0.5}
        onClick={(e) => {
          if (e.delta > 6) return;
          e.stopPropagation();
          useGame.getState().select({ type: "npc", id: NPCS[index].id });
          const st = NPCS[index].st;
          walkTo(st.x, st.z + 0.9);
        }}
      >
        <cylinderGeometry args={[0.32, 0.32, 1.1, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function Npcs() {
  return (
    <>
      {NPCS.map((n, i) => (
        <NpcActor key={n.id} index={i} />
      ))}
    </>
  );
}
