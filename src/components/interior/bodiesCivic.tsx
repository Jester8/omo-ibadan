"use client";

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import type { FurnKind } from "@/lib/furniture";
import { SERVICES } from "@/lib/services";
import type { BodyRenderer } from "./extras";
import { Bx, Cy, DARK, METAL, WHITE, WOOD, glass, litMat, type BodyProps } from "./prims";

/**
 * Renderers for the civic furniture: servicedesk, cellbars, fireengine, pigeonholes, waterpoint, fuelpump, jerrycans.
 * Owned by the INT-BODIES agent. Local frame like every body: origin = floor centre, +z = front, W/D the footprint, H the height. No figures, ever.
 * DRAFT written by the planner: it type-checks and lints, but nobody has looked at it in a browser. Look at every kind (day and NEPA night), fix proportions,
 * keep each kind to the mesh budget in the comments (phones).
 */

const NO_RAY = () => null;

/** The counter where business is done: a trim-coloured front with a strip lit in the service colour, a wooden top, a glass screen, a bell and a ticket tray. ~9 meshes. */
function ServiceDesk({ item, W, D, H, c, c2 }: BodyProps) {
  const def = item.service ? SERVICES[item.service] : undefined;
  const tint = def?.tint ?? c;
  return (
    <>
      <Bx s={[W, H - 0.06, D]} c={c2} r={0.6} />
      <Bx p={[0, H - 0.06, 0]} s={[W + 0.06, 0.06, D + 0.08]} c={WOOD} />
      {/* the lit strip across the customer side */}
      <mesh position={[0, H * 0.6, D / 2 + 0.012]} material={litMat(tint, 1.0, tint)}>
        <boxGeometry args={[W - 0.3, 0.1, 0.012]} />
      </mesh>
      {/* glass screen on the staff side, a monitor with its back to the customer, a bell and a ticket tray */}
      <mesh position={[0, H + 0.25, -D / 2 + 0.05]} material={glass}>
        <boxGeometry args={[W - 0.2, 0.5, 0.02]} />
      </mesh>
      <Bx p={[W / 2 - 0.5, H, -0.05]} s={[0.3, 0.18, 0.12]} c={DARK} />
      <mesh position={[W / 2 - 0.5, H + 0.12, -0.115]} material={litMat("#8fc8ff", 1.0, "#1b2a3a")}>
        <boxGeometry args={[0.26, 0.15, 0.01]} />
      </mesh>
      <Cy p={[-W / 2 + 0.35, H, 0.12]} r={0.05} h={0.04} c={METAL} seg={12} />
      <Bx p={[-W / 2 + 0.75, H, 0.1]} s={[0.3, 0.02, 0.2]} c={WHITE} />
      {/* the hospital's white cross on the front */}
      {item.service === "hospital" && (
        <>
          <Bx p={[-W / 2 + 0.45, 0.45, D / 2 + 0.011]} s={[0.24, 0.07, 0.01]} c="#ffffff" />
          <Bx p={[-W / 2 + 0.45, 0.45 - 0.085, D / 2 + 0.011]} s={[0.07, 0.24, 0.01]} c="#ffffff" />
        </>
      )}
    </>
  );
}

/** Iron bars above a 1.15 m cell wall: a bottom rail, a mid rail, a top rail and ONE instanced mesh of bars (4 draw calls for the whole prison). */
function CellBars({ W, H, c2 }: BodyProps) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const n = Math.max(2, Math.floor(W / 0.16));
  const y0 = 1.15;
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    const o = new THREE.Object3D();
    for (let i = 0; i < n; i++) {
      o.position.set(-W / 2 + 0.08 + (i * (W - 0.16)) / (n - 1), (y0 + H) / 2, 0);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  }, [n, W, H]);
  return (
    <>
      <Bx p={[0, y0, 0]} s={[W, 0.07, 0.1]} c={c2} />
      <Bx p={[0, (y0 + H) / 2, 0]} s={[W, 0.05, 0.08]} c={c2} />
      <Bx p={[0, H - 0.07, 0]} s={[W, 0.07, 0.1]} c={c2} />
      <instancedMesh ref={ref} args={[undefined, undefined, n]} raycast={NO_RAY} castShadow>
        <cylinderGeometry args={[0.022, 0.022, H - y0, 6]} />
        <meshStandardMaterial color="#2b3138" roughness={0.6} metalness={0.3} />
      </instancedMesh>
    </>
  );
}

/** A red fire appliance, nose to the front: rear body, cab, ladder on the roof, wheels, a white stripe and a lit light bar. ~20 meshes. */
function FireEngine({ W, D }: BodyProps) {
  return (
    <>
      <Bx p={[0, 0.3, -D * 0.15]} s={[W, 1.4, D * 0.7]} c="#d62828" r={0.5} />
      <Bx p={[0, 0.3, D * 0.35]} s={[W, 1.1, D * 0.3]} c="#d62828" r={0.5} />
      <Bx p={[0, 1.0, D * 0.495]} s={[W - 0.2, 0.35, 0.03]} c="#cfe6f2" r={0.1} />
      <Bx p={[0, 0.85, 0]} s={[W + 0.02, 0.08, D * 0.97]} c="#fafafa" />
      {[-1, 1].map((s) => <Bx key={s} p={[s * 0.5, 1.7, -D * 0.15]} s={[0.05, 0.07, D * 0.62]} c="#cfd3d8" />)}
      {[-0.7, 0, 0.7].map((z) => <Bx key={z} p={[0, 1.7, -D * 0.15 + z]} s={[1.0, 0.04, 0.04]} c="#cfd3d8" />)}
      {[-1, 1].flatMap((s) => [-D * 0.3, D * 0.34].map((z) => <Cy key={`${s}${z}`} p={[s * (W / 2), 0.24, z]} r={0.38} h={0.28} c="#1b1e24" seg={14} rot={[0, 0, Math.PI / 2]} />))}
      <mesh position={[0, 1.45, D * 0.36]} material={litMat("#ff3b30", 1.4, "#7f1d1d")}>
        <boxGeometry args={[W - 0.5, 0.1, 0.16]} />
      </mesh>
    </>
  );
}

/** A wall of post-office boxes: a dark carcass, white dividers and rows, yellow key tags. ~14 meshes. */
function Pigeonholes({ W, D, H }: BodyProps) {
  return (
    <>
      <Bx s={[W, H, D]} c="#3b4a5c" r={0.7} />
      {[0, 1, 2, 3].map((r) => <Bx key={r} p={[0, 0.3 + r * 0.42, D / 2]} s={[W - 0.1, 0.03, 0.02]} c={WHITE} />)}
      {[1, 2, 3, 4, 5].map((k) => <Bx key={k} p={[-W / 2 + (k * W) / 6, 0.15, D / 2]} s={[0.025, H - 0.3, 0.02]} c={WHITE} />)}
      {[0, 1, 2].map((r) => <Bx key={r} p={[-W / 2 + 0.3, 0.45 + r * 0.42, D / 2 + 0.01]} s={[0.12, 0.06, 0.01]} c="#facc15" />)}
    </>
  );
}

/** A hand-pump standpipe over a small basin. ~7 meshes. */
function WaterPoint({ W, D, H }: BodyProps) {
  return (
    <>
      <Bx s={[W, 0.3, D]} c="#8c9096" r={0.8} />
      <Cy p={[0, 0.3, -D * 0.15]} r={0.05} h={H - 0.45} c="#3b82a6" seg={10} />
      <Bx p={[0, H - 0.2, -D * 0.15]} s={[0.1, 0.12, 0.3]} c="#3b82a6" />
      <Bx p={[0, H - 0.04, -D * 0.15 - 0.18]} s={[0.04, 0.04, 0.34]} c={METAL} rot={[0.5, 0, 0]} />
      <mesh position={[0, 0.31, D * 0.12]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[Math.min(W, D) * 0.34, 14]} />
        <meshStandardMaterial color="#5fb8e6" roughness={0.15} />
      </mesh>
    </>
  );
}

/** A petrol pump: red body, a lit price screen, a hose looped on the side and a nozzle holster. ~9 meshes. */
function FuelPump({ item, W, D, H }: BodyProps) {
  const litres = item.action?.fuel ?? 5;
  return (
    <>
      <Bx s={[W, 0.12, D]} c="#2a2f3a" />
      <Bx p={[0, 0.12, 0]} s={[W - 0.12, H - 0.5, D - 0.1]} c="#d4202a" r={0.5} />
      <Bx p={[0, H - 0.38, 0]} s={[W - 0.04, 0.38, D - 0.02]} c="#f2f5fa" r={0.5} />
      <mesh position={[0, H - 0.64, D / 2 - 0.045]} material={litMat("#7fffa0", 1.0, "#0f2a18")}>
        <boxGeometry args={[W - 0.3, 0.2, 0.012]} />
      </mesh>
      <Bx p={[W / 2 - 0.02, H * 0.35, 0]} s={[0.05, 0.3, 0.12]} c={DARK} />
      <Cy p={[W / 2 + 0.02, 0.4, 0]} r={0.025} h={0.75} c="#1b1e24" seg={8} />
      <Bx p={[0, H - 0.04, 0]} s={[W, 0.04, D]} c="#d4202a" />
      {litres >= 25 && <Bx p={[0, 0.12, D / 2 - 0.02]} s={[W - 0.2, 0.06, 0.02]} c="#facc15" />}
    </>
  );
}

/** Four yellow jerrycans in a row. ~8 meshes. */
function Jerrycans({ W, D, H }: BodyProps) {
  return (
    <>
      {[0, 1, 2, 3].map((k) => (
        <group key={k} position={[-W / 2 + 0.12 + k * ((W - 0.24) / 3), 0, 0]}>
          <Bx s={[0.16, H * 0.9, D * 0.8]} c="#e0a800" r={0.6} />
          <Bx p={[0, H * 0.9, -D * 0.15]} s={[0.06, 0.08, 0.1]} c="#2a2f3a" />
        </group>
      ))}
    </>
  );
}

export const CIVIC_BODIES: Partial<Record<FurnKind, BodyRenderer>> = {
  servicedesk: ServiceDesk,
  cellbars: CellBars,
  fireengine: FireEngine,
  pigeonholes: Pigeonholes,
  waterpoint: WaterPoint,
  fuelpump: FuelPump,
  jerrycans: Jerrycans,
};
