"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Avatar from "@/components/avatar/Avatar";
import { AVATAR_SCALE } from "./Player";
import { PLACES, doorOf } from "@/lib/places";
import { findWorldPath, type Pt } from "@/lib/pathing";
import { interiorKey } from "@/lib/interiors";
import { randomLook, type Look } from "@/lib/look";
import { remoteMotion } from "@/lib/playerState";
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
  const g = useRef<THREE.Group>(null);
  const motion = useRef({ speed: 0 });
  useFrame((_, dt) => {
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
      <Avatar look={look} motion={motion} scale={AVATAR_SCALE} />
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

const NAMES = ["Kunle", "Bisi", "Kemi", "Femi", "Ayo", "Sola", "Dami", "Ngozi", "Seun", "Yemi"];

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

export const NPCS: Npc[] = NAMES.slice(0, 8).map((name, i) => {
  const p = PLACES[(i * 5) % PLACES.length];
  const d = doorOf(p);
  return {
    id: `npc-${i}`,
    name,
    look: randomLook(),
    st: { x: d.x, z: d.z + 0.5, ry: 0, speed: 0, path: [], waitUntil: Math.random() * 6000, place: p.id, nextChat: Date.now() + 8000 + Math.random() * 15000 },
  };
});

function NpcActor({ index }: { index: number }) {
  const npcLook = NPCS[index].look;
  const g = useRef<THREE.Group>(null);
  const motion = useRef({ speed: 0 });
  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const npc = NPCS[index];
    const st = npc.st;
    const now = Date.now();
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
