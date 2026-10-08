"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FURN, S } from "@/lib/furniture";
import { interiorKey, type Layout } from "@/lib/interiors";
import { cam, me } from "@/lib/playerState";
import { rt, powerOn, walkToExit, walkToFurn } from "@/lib/interiorRuntime";
import { useGame } from "@/lib/store";
import { daylight, gameMinutes } from "@/lib/time";
import { mat } from "@/components/world/materials";
import { walkTo } from "@/lib/movement";
import FurnitureItem, { glow } from "./Furniture";
import { floorMaterial, louvreTexture } from "./textures";
import { interiorState } from "./power";

const WALL_H = 2.7;
const T = 0.18;
const PART_H = 1.15;

const windowMat = new THREE.MeshStandardMaterial({ roughness: 0.4, emissive: new THREE.Color("#dff3ff"), emissiveIntensity: 0.4 });

/* ---------------------------------- lights ---------------------------------- */

function Lights({ layout }: { layout: Layout }) {
  const amb = useRef<THREE.AmbientLight>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const torch = useRef<THREE.PointLight>(null);
  const bulbs = useRef<(THREE.PointLight | null)[]>([]);
  const spots = useMemo(() => {
    const nx = Math.max(1, Math.round(layout.w / 5));
    const nz = Math.max(1, Math.round(layout.d / 5));
    const out: [number, number][] = [];
    for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) out.push([((i + 0.5) / nx - 0.5) * layout.w * S, ((j + 0.5) / nz - 0.5) * layout.d * S]);
    return out;
  }, [layout]);
  const tint = layout.light === "cool" ? "#cfd8ff" : layout.light === "bright" ? "#fff8ec" : "#ffdca8";

  useFrame(({ scene }) => {
    const now = Date.now();
    const state = useGame.getState();
    const day = daylight(gameMinutes(now, state.clockOverride) / 60);
    const power = powerOn();
    interiorState.power = power;
    interiorState.night = 1 - day;

    scene.background = scene.background instanceof THREE.Color ? scene.background.set("#1d1713") : new THREE.Color("#1d1713");
    scene.fog = null;

    if (amb.current) amb.current.intensity = 0.32 + day * 0.5 + (power ? 0.18 : 0);
    if (sun.current) sun.current.intensity = 0.25 + day * 0.9;
    const bulb = power ? 0.8 + (1 - day) * 0.9 : 0;
    for (const l of bulbs.current) if (l) l.intensity = bulb;
    if (torch.current) {
      torch.current.position.set(me.x, 1.2, me.z);
      torch.current.intensity = power ? 0 : 0.5 + (1 - day) * 1.6;
    }
    glow.screen.emissiveIntensity = power ? 1.1 : 0;
    glow.bulb.emissiveIntensity = power ? 0.7 + (1 - day) * 1.6 : 0;
    glow.neon.emissiveIntensity = power ? 1.6 : 0;
    glow.lantern.emissiveIntensity = power ? 0.25 : 1.4;
    windowMat.emissiveIntensity = 0.1 + day * 0.9;
  });

  const W = layout.w * S;
  const D = layout.d * S;
  return (
    <>
      <ambientLight ref={amb} color={tint} intensity={0.7} />
      <hemisphereLight args={["#fff2dc", "#6b4a2f", 0.35]} />
      <directionalLight
        ref={sun}
        position={[-W * 0.4, 7, -D * 0.2]}
        color="#fff1d6"
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-W / 2 - 2}
        shadow-camera-right={W / 2 + 2}
        shadow-camera-top={D / 2 + 2}
        shadow-camera-bottom={-D / 2 - 2}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-bias={-0.0006}
      />
      {spots.map(([x, z], i) => (
        <pointLight
          key={i}
          ref={(el) => {
            bulbs.current[i] = el;
          }}
          position={[x, 1.25, z]}
          color={tint}
          distance={9}
          decay={1.4}
          intensity={1}
        />
      ))}
      <pointLight ref={torch} color="#fff3d0" distance={5} decay={1.4} intensity={0} />
    </>
  );
}

/* ----------------------------------- floor ----------------------------------- */

function Floor({ layout }: { layout: Layout }) {
  const base = useMemo(() => floorMaterial(layout.floor, layout.w, layout.d), [layout]);
  const zones = useMemo(() => (layout.zones ?? []).map((z) => ({ z, m: floorMaterial(z.floor, z.w, z.d, z.color) })), [layout]);
  return (
    <>
      <mesh position={[0, -0.05, 0]} material={base} receiveShadow>
        <boxGeometry args={[layout.w + T * 2, 0.1, layout.d + T * 2]} />
      </mesh>
      {zones.map(({ z, m }, i) => (
        <mesh key={i} position={[z.x, 0.004, z.z]} rotation-x={-Math.PI / 2} material={m} receiveShadow>
          <planeGeometry args={[z.w, z.d]} />
        </mesh>
      ))}
    </>
  );
}

/* ----------------------------------- walls ----------------------------------- */

/** An outer wall that drops to a low cutaway when it faces the camera. */
function CutawayWall({ x, z, nx, nz, children }: { x: number; z: number; nx: number; nz: number; children: ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    const facing = Math.sin(cam.az) * nx + Math.cos(cam.az) * nz > 0.2;
    const target = facing ? 0.1 : 1;
    g.current.scale.y += (target - g.current.scale.y) * Math.min(1, dt * 9);
  });
  return (
    <group ref={g} position={[x, 0, z]}>
      {children}
    </group>
  );
}

function WallBlock({ len, axis, color, trim, withCap = true }: { len: number; axis: "x" | "z"; color: string; trim: string; withCap?: boolean }) {
  const s: [number, number, number] = axis === "x" ? [len, WALL_H, T] : [T, WALL_H, len];
  const base: [number, number, number] = axis === "x" ? [len, 0.14, T + 0.04] : [T + 0.04, 0.14, len];
  const cap: [number, number, number] = axis === "x" ? [len + 0.02, 0.06, T + 0.06] : [T + 0.06, 0.06, len + 0.02];
  return (
    <>
      <mesh position={[0, WALL_H / 2, 0]} material={mat(color, 0.9)} castShadow receiveShadow>
        <boxGeometry args={s} />
      </mesh>
      <mesh position={[0, 0.07, 0]} material={mat(trim, 0.7)}>
        <boxGeometry args={base} />
      </mesh>
      {withCap && (
        <mesh position={[0, WALL_H + 0.03, 0]} material={mat(trim, 0.7)}>
          <boxGeometry args={cap} />
        </mesh>
      )}
    </>
  );
}

/** One shared pane material for every window; Lights dims its glow with the time of day. */
function paneMaterial() {
  if (!windowMat.map) {
    const tex = louvreTexture();
    windowMat.map = tex;
    windowMat.emissiveMap = tex;
    windowMat.needsUpdate = true;
  }
  return windowMat;
}

function Window({ along, axis, trim }: { along: number; axis: "x" | "z"; trim: string }) {
  const pane = paneMaterial();
  // windows sit on the inner face of back (axis x) and left (axis z) walls
  const rot: [number, number, number] = axis === "x" ? [0, 0, 0] : [0, Math.PI / 2, 0];
  const inner = T / 2 + 0.012;
  const pos: [number, number, number] = axis === "x" ? [along, 1.5, inner] : [inner, 1.5, along];
  return (
    <group position={pos} rotation={rot}>
      <mesh material={pane}>
        <planeGeometry args={[1.1, 0.95]} />
      </mesh>
      {[
        [0, 0.5, 1.18, 0.07],
        [0, -0.5, 1.18, 0.07],
        [-0.57, 0, 0.07, 1.0],
        [0.57, 0, 0.07, 1.0],
      ].map(([x, y, w, h], i) => (
        <mesh key={i} position={[x, y, 0.01]} material={mat(trim, 0.7)}>
          <boxGeometry args={[w, h, 0.05]} />
        </mesh>
      ))}
    </group>
  );
}

function windowSpots(layout: Layout, side: "back" | "left"): number[] {
  const len = side === "back" ? layout.w : layout.d;
  const n = Math.max(1, Math.floor(len / 3.4));
  const spots: number[] = [];
  for (let i = 0; i < n; i++) {
    const pos = ((i + 0.5) / n - 0.5) * len;
    const blocked = layout.items.some((it) => {
      const def = FURN[it.kind];
      const tall = def.h > 0.8 || it.kind === "wallart" || it.kind === "clock" || it.kind === "blackboard";
      if (!tall) return false;
      const near = side === "back" ? it.z < -layout.d / 2 + 1.1 && Math.abs(it.x - pos) < 1.2 : it.x < -layout.w / 2 + 1.1 && Math.abs(it.z - pos) < 1.2;
      return near;
    });
    if (!blocked) spots.push(pos);
  }
  return spots;
}

function Walls({ layout }: { layout: Layout }) {
  const { w, d, wall, trim } = layout;
  const gap = 1.3;
  const left = layout.exitX - gap / 2 + w / 2;
  const right = w / 2 - (layout.exitX + gap / 2);
  const backWin = useMemo(() => windowSpots(layout, "back"), [layout]);
  const leftWin = useMemo(() => windowSpots(layout, "left"), [layout]);
  return (
    <>
      {/* back */}
      <CutawayWall x={0} z={-d / 2 - T / 2} nx={0} nz={-1}>
        <WallBlock len={w + T * 2} axis="x" color={wall} trim={trim} />
        {backWin.map((a) => (
          <Window key={a} along={a} axis="x" trim={trim} />
        ))}
      </CutawayWall>
      {/* left */}
      <CutawayWall x={-w / 2 - T / 2} z={0} nx={-1} nz={0}>
        <WallBlock len={d} axis="z" color={wall} trim={trim} />
        {leftWin.map((a) => (
          <Window key={a} along={a} axis="z" trim={trim} />
        ))}
      </CutawayWall>
      {/* right */}
      <CutawayWall x={w / 2 + T / 2} z={0} nx={1} nz={0}>
        <WallBlock len={d} axis="z" color={wall} trim={trim} />
      </CutawayWall>
      {/* front, with the exit doorway */}
      <CutawayWall x={(-w / 2 + layout.exitX - gap / 2) / 2} z={d / 2 + T / 2} nx={0} nz={1}>
        <WallBlock len={Math.max(0.2, left)} axis="x" color={wall} trim={trim} />
      </CutawayWall>
      <CutawayWall x={(layout.exitX + gap / 2 + w / 2) / 2} z={d / 2 + T / 2} nx={0} nz={1}>
        <WallBlock len={Math.max(0.2, right)} axis="x" color={wall} trim={trim} />
      </CutawayWall>
      {/* partitions: waist-high so you can see across the rooms */}
      {layout.walls.map((pw, i) => {
        const dx = pw.x2 - pw.x1;
        const dz = pw.z2 - pw.z1;
        const len = Math.hypot(dx, dz);
        const horizontal = Math.abs(dx) >= Math.abs(dz);
        const gapLen = pw.door !== undefined ? pw.doorW ?? 1.4 : 0;
        const at = (f: number) => ({ x: pw.x1 + dx * f, z: pw.z1 + dz * f });
        const segs: [number, number][] = pw.door === undefined ? [[0, 1]] : [[0, Math.max(0, pw.door - gapLen / 2 / len)], [Math.min(1, pw.door + gapLen / 2 / len), 1]];
        return (
          <group key={i}>
            {segs.map(([f0, f1], k) => {
              if (f1 - f0 < 0.001) return null;
              const a = at(f0);
              const b = at(f1);
              const L = Math.hypot(b.x - a.x, b.z - a.z);
              return (
                <group key={k} position={[(a.x + b.x) / 2, 0, (a.z + b.z) / 2]}>
                  <mesh position={[0, PART_H / 2, 0]} material={mat(wall, 0.9)} castShadow receiveShadow>
                    <boxGeometry args={horizontal ? [L, PART_H, 0.14] : [0.14, PART_H, L]} />
                  </mesh>
                  <mesh position={[0, PART_H + 0.025, 0]} material={mat(trim, 0.7)}>
                    <boxGeometry args={horizontal ? [L + 0.02, 0.05, 0.18] : [0.18, 0.05, L + 0.02]} />
                  </mesh>
                </group>
              );
            })}
          </group>
        );
      })}
    </>
  );
}

/* ------------------------------ exit mat and door ------------------------------ */

function ExitMat({ layout }: { layout: Layout }) {
  return (
    <group position={[layout.exitX, 0, layout.d / 2 - 0.45]}>
      <mesh
        position={[0, 0.012, 0]}
        rotation-x={-Math.PI / 2}
        material={mat(layout.accent, 0.9)}
        onClick={(e) => {
          if (e.delta > 6) return;
          e.stopPropagation();
          walkToExit();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <planeGeometry args={[1.2, 0.7]} />
      </mesh>
      <mesh position={[0, 0.016, 0]} rotation-x={-Math.PI / 2} material={mat("#f3e9d0", 0.9)}>
        <planeGeometry args={[1.05, 0.55]} />
      </mesh>
      {[-0.65, 0.65].map((x) => (
        <mesh key={x} position={[x, 1.05, 0.45]} material={mat(layout.trim, 0.6)}>
          <boxGeometry args={[0.1, 2.1, 0.12]} />
        </mesh>
      ))}
      <mesh position={[0, 2.1, 0.45]} material={mat(layout.trim, 0.6)}>
        <boxGeometry args={[1.4, 0.1, 0.12]} />
      </mesh>
    </group>
  );
}

/* ----------------------------------- scene ----------------------------------- */

function Room({ layout }: { layout: Layout }) {
  useEffect(() => {
    const prev = document.body.style.cursor;
    return () => {
      document.body.style.cursor = prev || "auto";
    };
  }, []);
  return (
    <>
      <Lights layout={layout} />
      <group scale={S}>
        <Floor layout={layout} />
        <Walls layout={layout} />
        {layout.items.map((it, i) => (
          <FurnitureItem key={i} item={it} accent={layout.accent} trim={layout.trim} onUse={() => walkToFurn(i)} />
        ))}
        <ExitMat layout={layout} />
      </group>
      {/* click the floor to walk */}
      <mesh
        position={[0, 0.006, 0]}
        rotation-x={-Math.PI / 2}
        onClick={(e) => {
          if (e.delta > 6) return;
          useGame.getState().select(null);
          walkTo(e.point.x, e.point.z);
        }}
      >
        <planeGeometry args={[layout.w * S, layout.d * S]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function InteriorScene() {
  const interior = useGame((s) => s.interior);
  useGame((s) => s.decorRev);
  if (!interior || !rt.layout) return null;
  return <Room key={interiorKey(interior)} layout={rt.layout} />;
}
