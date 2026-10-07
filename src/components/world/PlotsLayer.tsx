"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { PLOTS, PLOT_SIZE, type Plot } from "@/lib/plots";
import type { PlotState } from "@/lib/protocol";
import { useGame } from "@/lib/store";
import { colorFor } from "@/lib/look";
import { facadeMaterials, lampMat, mat, windowMats } from "./materials";

type V3 = [number, number, number];

export function Wall({ tint, w, h, d, p }: { tint: string; w: number; h: number; d: number; p: V3 }) {
  const mats = useMemo(() => facadeMaterials(w, h, d, tint), [w, h, d, tint]);
  useEffect(() => {
    const glow = mats.filter((m): m is THREE.MeshStandardMaterial => !!(m as THREE.MeshStandardMaterial).emissiveMap);
    glow.forEach((m) => windowMats.add(m));
    return () => glow.forEach((m) => windowMats.delete(m));
  }, [mats]);
  return (
    <mesh position={[p[0], p[1] + h / 2, p[2]]} material={mats} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
    </mesh>
  );
}

function Fence({ s = 2.9, c = "#f3efe6" }: { s?: number; c?: string }) {
  const h = 0.18;
  return (
    <>
      {[
        [0, -s / 2, s, 0.05],
        [0, s / 2, s, 0.05],
        [-s / 2, 0, 0.05, s],
        [s / 2, 0, 0.05, s],
      ].map(([x, z, w, d], i) => (
        <mesh key={i} position={[x, h / 2 + 0.06, z]} material={mat(c)} castShadow>
          <boxGeometry args={[w, h, d]} />
        </mesh>
      ))}
    </>
  );
}

const RUST_ROOF = "#a0512f";

function House({ tier, accent }: { tier: number; accent: string }) {
  if (tier === 1)
    return (
      <>
        <Fence />
        <mesh position={[0, 0.06 + 0.3, 0]} material={mat("#f4ead7")} castShadow>
          <boxGeometry args={[1.5, 0.6, 1.2]} />
        </mesh>
        <mesh position={[0, 0.06 + 0.6 + 0.28, 0]} rotation-y={Math.PI / 4} scale={[1.25, 1, 1]} material={mat(RUST_ROOF, 0.7)} castShadow>
          <coneGeometry args={[1.0, 0.56, 4]} />
        </mesh>
        <mesh position={[0, 0.06 + 0.24, 0.61]} material={mat("#7a5a40")}>
          <boxGeometry args={[0.3, 0.42, 0.03]} />
        </mesh>
        <mesh position={[0.45, 0.06 + 0.34, 0.61]} material={mat("#8fb6d6")}>
          <boxGeometry args={[0.26, 0.22, 0.03]} />
        </mesh>
      </>
    );
  if (tier === 2)
    return (
      <>
        <Fence />
        <Wall tint="#f2ecdf" w={1.7} h={1.25} d={1.3} p={[0, 0.06, -0.1]} />
        <mesh position={[0, 0.06 + 1.25 + 0.04, -0.1]} material={mat(accent)} castShadow>
          <boxGeometry args={[1.8, 0.09, 1.4]} />
        </mesh>
        <mesh position={[0, 0.06 + 1.25 + 0.3, -0.1]} rotation-y={Math.PI / 4} scale={[1.3, 1, 1]} material={mat(RUST_ROOF, 0.7)} castShadow>
          <coneGeometry args={[0.95, 0.5, 4]} />
        </mesh>
        <mesh position={[0, 0.06 + 0.7, 0.62]} material={mat("#e9e3d4")} castShadow>
          <boxGeometry args={[1.2, 0.05, 0.4]} />
        </mesh>
        <mesh position={[0.95, 0.06 + 0.25, 0.4]} material={mat("#d8d2c4")} castShadow>
          <boxGeometry args={[0.55, 0.5, 0.9]} />
        </mesh>
        <mesh position={[1.1, 0.06 + 0.3, 0.8]} material={mat("#2a2f3a")}>
          <boxGeometry args={[0.4, 0.4, 0.02]} />
        </mesh>
      </>
    );
  if (tier >= 3)
    return (
      <>
        <Fence c="#e8e3d6" />
        <Wall tint="#eef0f3" w={2.0} h={1.5} d={1.35} p={[-0.2, 0.06, -0.35]} />
        <Wall tint="#eef0f3" w={1.1} h={0.85} d={1.0} p={[0.8, 0.06, 0.15]} />
        <mesh position={[-0.2, 0.06 + 1.5 + 0.04, -0.35]} material={mat(accent)} castShadow>
          <boxGeometry args={[2.1, 0.09, 1.45]} />
        </mesh>
        <mesh position={[-0.2, 0.06 + 1.5 + 0.34, -0.35]} rotation-y={Math.PI / 4} scale={[1.5, 1, 1.05]} material={mat(RUST_ROOF, 0.7)} castShadow>
          <coneGeometry args={[1.0, 0.58, 4]} />
        </mesh>
        {[-0.45, -0.15, 0.15].map((x) => (
          <mesh key={x} position={[x, 0.06 + 0.4, 0.4]} material={mat("#fbf9f4")} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.8, 10]} />
          </mesh>
        ))}
        <mesh position={[-0.3, 0.06 + 0.83, 0.4]} material={mat("#fbf9f4")} castShadow>
          <boxGeometry args={[0.95, 0.06, 0.4]} />
        </mesh>
        <mesh position={[-0.75, 0.075, 1.0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[0.9, 0.5]} />
          <meshStandardMaterial color="#59c2e6" roughness={0.15} />
        </mesh>
        <mesh position={[1.05, 0.06 + 0.55, 1.0]} material={mat("#4f9a4d")} castShadow>
          <icosahedronGeometry args={[0.28, 0]} />
        </mesh>
      </>
    );
  return null;
}

function PlotMesh({ plot }: { plot: Plot }) {
  const state: PlotState | undefined = useGame((s) => s.plots[plot.id]);
  const selected = useGame((s) => s.selected);
  const me = useGame((s) => s.profile?.id);
  const hovered = useRef(false);
  const lift = useRef<THREE.Group>(null);
  const isSel = selected?.type === "plot" && selected.id === plot.id;
  const mine = state && state.ownerId === me;
  const accent = state ? colorFor(state.ownerId) : "#10b981";

  useFrame((_, dt) => {
    if (!lift.current) return;
    lift.current.position.y = THREE.MathUtils.damp(lift.current.position.y, hovered.current ? 0.1 : 0, 10, dt);
  });

  return (
    <group position={[plot.pos[0], 0, plot.pos[1]]}>
      <group
        ref={lift}
        onPointerOver={(e) => {
          e.stopPropagation();
          hovered.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hovered.current = false;
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          if (e.delta > 6) return;
          e.stopPropagation();
          useGame.getState().select({ type: "plot", id: plot.id });
        }}
      >
        <RoundedBox args={[PLOT_SIZE - 0.2, 0.06, PLOT_SIZE - 0.2]} radius={0.04} smoothness={3} position={[0, 0.03, 0]} receiveShadow>
          <meshStandardMaterial color={state ? new THREE.Color(accent).lerp(new THREE.Color("#ffffff"), 0.75) : "#f5f2e6"} roughness={0.95} />
        </RoundedBox>
        {state && state.tier >= 1 && <House tier={state.tier} accent={accent} />}
        {state && state.tier === 0 && (
          <>
            {[
              [-1.35, -1.35],
              [1.35, -1.35],
              [-1.35, 1.35],
              [1.35, 1.35],
            ].map(([x, z], i) => (
              <mesh key={i} position={[x, 0.2, z]} material={mat(accent)} castShadow>
                <boxGeometry args={[0.07, 0.28, 0.07]} />
              </mesh>
            ))}
            <mesh position={[0, 0.5, 0]} material={mat("#7a6a54")} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.9, 6]} />
            </mesh>
            <mesh position={[0.2, 0.82, 0]} material={mat(accent)} castShadow>
              <boxGeometry args={[0.38, 0.22, 0.02]} />
            </mesh>
          </>
        )}
        {!state && (
          <group position={[0.9, 0, 1.0]}>
            <mesh position={[0, 0.3, 0]} material={mat("#7a6a54")}>
              <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
            </mesh>
            <mesh position={[0, 0.62, 0]} material={mat("#10b981")} castShadow>
              <boxGeometry args={[0.5, 0.26, 0.03]} />
            </mesh>
            <mesh position={[0, 0.62, 0.02]} material={lampMat}>
              <boxGeometry args={[0.38, 0.1, 0.01]} />
            </mesh>
          </group>
        )}
      </group>
      {(isSel || mine) && (
        <mesh position={[0, 0.07, 0]} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[PLOT_SIZE * 0.6, PLOT_SIZE * 0.6 + 0.07, 4, 1, Math.PI / 4]} />
          <meshBasicMaterial color={isSel ? "#f59e0b" : "#10b981"} transparent opacity={0.9} />
        </mesh>
      )}
    </group>
  );
}

export default function PlotsLayer() {
  return (
    <>
      {PLOTS.map((p) => (
        <PlotMesh key={p.id} plot={p} />
      ))}
    </>
  );
}
