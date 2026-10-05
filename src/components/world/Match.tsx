"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Avatar from "@/components/avatar/Avatar";
import { AVATAR_SCALE } from "./Player";
import { cam, me } from "@/lib/playerState";
import { seededLook, type Look } from "@/lib/look";

/** A permanent five-a-side game on the stadium pitch, in stadium-local coordinates. */
const HX = 1.95;
const HZ = 1.3;
const FIELD_Y = 0.13;
const TEAMS = [
  { top: "#1d4ed8", bottom: "#ffffff" },
  { top: "#eab308", bottom: "#111827" },
];
// formation as fractions of the half-pitch, written for the team attacking +x
const FORM: [number, number][] = [
  [-0.92, 0],
  [-0.45, -0.55],
  [-0.45, 0.55],
  [0.1, -0.35],
  [0.25, 0.4],
];

type P = { x: number; z: number; ry: number; speed: number; team: number; hx: number; hz: number; gk: boolean };
type Ball = { x: number; z: number; vx: number; vz: number; owner: number; timer: number; target: number };

const angleDiff = (a: number, b: number) => {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
};

function makeSim() {
  const ps: P[] = [];
  for (let t = 0; t < 2; t++) {
    FORM.forEach(([fx, fz], i) => {
      const dir = t === 0 ? 1 : -1;
      const hx = fx * HX * dir;
      const hz = fz * HZ * dir;
      ps.push({ x: hx, z: hz, ry: dir > 0 ? Math.PI / 2 : -Math.PI / 2, speed: 0, team: t, hx, hz, gk: i === 0 });
    });
  }
  return { ps, ball: { x: 0, z: 0, vx: 0, vz: 0, owner: 3, timer: 1.2, target: -1 } as Ball, goals: [0, 0] as [number, number], pause: 0 };
}

type Sim = ReturnType<typeof makeSim>;
/** There is one stadium, so one match, shared by every render. */
const SIM = makeSim();

function step(sim: Sim, dt: number) {
  const { ps, ball } = sim;
  if (sim.pause > 0) {
    sim.pause -= dt;
    if (sim.pause <= 0) {
      ps.forEach((p) => {
        p.x = p.hx;
        p.z = p.hz;
      });
      ball.x = 0;
      ball.z = 0;
      ball.vx = ball.vz = 0;
      ball.owner = 3 + 5 * Math.floor(Math.random() * 2);
      ball.timer = 1;
      ball.target = -1;
    }
    ps.forEach((p) => (p.speed = 0));
    return;
  }
  const owner = ball.owner >= 0 ? ps[ball.owner] : null;
  const goalX = (team: number) => (team === 0 ? HX + 0.1 : -HX - 0.1);

  if (owner) {
    ball.x = owner.x + Math.sin(owner.ry) * 0.16;
    ball.z = owner.z + Math.cos(owner.ry) * 0.16;
    ball.timer -= dt;
    if (ball.timer <= 0) {
      const gx = goalX(owner.team);
      const near = Math.abs(owner.x - gx) < 1.5;
      if (near || Math.random() < 0.1) {
        const sp = 5.5;
        const dx = gx - ball.x;
        const dz = (Math.random() - 0.5) * 0.5 - ball.z;
        const l = Math.hypot(dx, dz) || 1;
        ball.vx = (dx / l) * sp;
        ball.vz = (dz / l) * sp;
        ball.owner = -1;
        ball.target = -1;
      } else {
        const mates = ps.map((p, i) => ({ p, i })).filter(({ p, i }) => p.team === owner.team && i !== ball.owner && !p.gk);
        const m = mates[Math.floor(Math.random() * mates.length)];
        const dx = m.p.x - ball.x;
        const dz = m.p.z - ball.z;
        const l = Math.hypot(dx, dz) || 1;
        ball.vx = (dx / l) * 4;
        ball.vz = (dz / l) * 4;
        ball.owner = -1;
        ball.target = m.i;
      }
    }
  } else {
    ball.x += ball.vx * dt;
    ball.z += ball.vz * dt;
    ball.vx *= 1 - 0.35 * dt;
    ball.vz *= 1 - 0.35 * dt;
    if (Math.abs(ball.z) > HZ) {
      ball.z = Math.sign(ball.z) * HZ;
      ball.vz *= -0.6;
    }
    if (Math.abs(ball.x) > HX + 0.12 && Math.abs(ball.z) < 0.45) {
      // goal: the side the ball went into concedes
      sim.goals[ball.x > 0 ? 0 : 1]++;
      sim.pause = 1.8;
      ball.vx = ball.vz = 0;
      return;
    }
    if (Math.abs(ball.x) > HX + 0.12) {
      ball.x = Math.sign(ball.x) * (HX + 0.1);
      ball.vx *= -0.5;
    }
    // someone gets to it
    let best = -1;
    let bd = 0.3;
    ps.forEach((p, i) => {
      const d = Math.hypot(p.x - ball.x, p.z - ball.z);
      if (d < bd && (ball.target < 0 || i === ball.target || p.team !== ps[ball.target].team)) {
        bd = d;
        best = i;
      }
    });
    if (best >= 0 || Math.hypot(ball.vx, ball.vz) < 0.25) {
      if (best < 0) {
        let md = 9;
        ps.forEach((p, i) => {
          const d = Math.hypot(p.x - ball.x, p.z - ball.z);
          if (d < md) {
            md = d;
            best = i;
          }
        });
      }
      ball.owner = best;
      ball.timer = 0.7 + Math.random() * 1.2;
      ball.target = -1;
    }
  }

  // movement
  const holder = ball.owner >= 0 ? ps[ball.owner] : null;
  let chaser = -1;
  let cd = 9;
  ps.forEach((p, i) => {
    if (p.gk || (holder && p.team === holder.team)) return;
    const d = Math.hypot(p.x - ball.x, p.z - ball.z);
    if (d < cd) {
      cd = d;
      chaser = i;
    }
  });
  ps.forEach((p, i) => {
    let tx = p.hx + (ball.x - p.hx) * 0.4;
    let tz = p.hz + (ball.z - p.hz) * 0.4;
    let sp = 1.3;
    if (p.gk) {
      tx = p.hx;
      tz = Math.max(-0.4, Math.min(0.4, ball.z));
      sp = 1.0;
    } else if (i === ball.owner) {
      tx = goalX(p.team);
      tz = Math.sin(performance.now() / 700 + i) * 0.7;
      sp = 1.9;
    } else if (i === ball.target || i === chaser) {
      tx = ball.x;
      tz = ball.z;
      sp = 1.8;
    } else if (holder && p.team === holder.team) {
      // support runs: ahead of the ball
      tx = Math.max(-HX, Math.min(HX, holder.x + (p.team === 0 ? 0.7 : -0.7)));
    }
    const dx = tx - p.x;
    const dz = tz - p.z;
    const d = Math.hypot(dx, dz);
    let moving = 0;
    if (d > 0.08) {
      const s = Math.min(d, sp * dt);
      p.x += (dx / d) * s;
      p.z += (dz / d) * s;
      p.ry += angleDiff(p.ry, Math.atan2(dx, dz)) * Math.min(1, dt * 9);
      moving = sp;
    }
    p.x = Math.max(-HX, Math.min(HX, p.x));
    p.z = Math.max(-HZ, Math.min(HZ, p.z));
    p.speed += (moving - p.speed) * Math.min(1, dt * 6);
  });
  // tackles
  if (holder && chaser >= 0) {
    const c = ps[chaser];
    if (Math.hypot(c.x - holder.x, c.z - holder.z) < 0.22 && Math.random() < dt * 0.9) {
      ball.owner = chaser;
      ball.timer = 0.8 + Math.random();
    }
  }
}

function Player({ index, sim, look }: { index: number; sim: Sim; look: Look }) {
  const g = useRef<THREE.Group>(null);
  const motion = useRef({ speed: 0 });
  useFrame(() => {
    const p = sim.ps[index];
    motion.current.speed = p.speed;
    g.current?.position.set(p.x, FIELD_Y, p.z);
    if (g.current) g.current.rotation.y = p.ry;
  });
  return (
    <group ref={g}>
      <Avatar look={look} motion={motion} scale={AVATAR_SCALE} />
    </group>
  );
}

const line = new THREE.MeshBasicMaterial({ color: "#f4fbf4" });

export default function Match() {
  const sim = SIM;
  const ball = useRef<THREE.Mesh>(null);
  const root = useRef<THREE.Group>(null);
  const looks = useMemo(
    () =>
      sim.ps.map((p, i) => ({
        ...seededLook(`match-${i}`),
        frame: "m" as const,
        top: "jersey" as const,
        topColor: TEAMS[p.team].top,
        bottomColor: TEAMS[p.team].bottom,
        hairStyle: "lowcut" as const,
        accessory: "none" as const,
      })),
    [sim],
  );

  useFrame((_, rawDt) => {
    const near = root.current ? Math.hypot(root.current.parent!.position.x - me.x, root.current.parent!.position.z - me.z) : 99;
    if (root.current) root.current.visible = near < 20 && cam.dist < 40;
    step(sim, Math.min(rawDt, 0.05));
    if (ball.current) ball.current.position.set(sim.ball.x, FIELD_Y + 0.045, sim.ball.z);
  });

  return (
    <group ref={root}>
      {/* markings */}
      {[
        [0, -HZ - 0.2, 2 * HX + 0.4, 0.025],
        [0, HZ + 0.2, 2 * HX + 0.4, 0.025],
      ].map(([x, z, w, d], i) => (
        <mesh key={i} position={[x, FIELD_Y + 0.004, z]} rotation-x={-Math.PI / 2} material={line}>
          <planeGeometry args={[w, d]} />
        </mesh>
      ))}
      {[-HX - 0.2, HX + 0.2, 0].map((x, i) => (
        <mesh key={i} position={[x, FIELD_Y + 0.004, 0]} rotation-x={-Math.PI / 2} material={line}>
          <planeGeometry args={[0.025, 2 * HZ + 0.4]} />
        </mesh>
      ))}
      <mesh position={[0, FIELD_Y + 0.005, 0]} rotation-x={-Math.PI / 2} material={line}>
        <ringGeometry args={[0.42, 0.45, 32]} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * (HX + 0.2), FIELD_Y, 0]}>
          {[-0.45, 0.45].map((z) => (
            <mesh key={z} position={[0, 0.16, z]}>
              <boxGeometry args={[0.04, 0.32, 0.04]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          ))}
          <mesh position={[0, 0.32, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.94]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
      {sim.ps.map((p, i) => (
        <Player key={i} index={i} sim={sim} look={looks[i]} />
      ))}
      <mesh ref={ball} castShadow>
        <sphereGeometry args={[0.045, 14, 10]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
    </group>
  );
}
