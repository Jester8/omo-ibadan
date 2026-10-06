"use client";

import Skyline from "./Skyline";
import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { PLACES } from "@/lib/places";
import { PLOTS, PLOT_SIZE } from "@/lib/plots";
import { lampMat, mat } from "./materials";

const noRaycast = () => null;

const ROADS = [-20, -10, 0, 10, 20];
const BLOCKS: { c: [number, number]; tint: string }[] = [
  { c: [-15, -15], tint: "#dfe6f4" },
  { c: [-5, -15], tint: "#f1e6d6" },
  { c: [5, -15], tint: "#e3eed9" },
  { c: [15, -15], tint: "#e3eed9" },
  { c: [-15, -5], tint: "#ebe9de" },
  { c: [-5, -5], tint: "#d6eed0" },
  { c: [5, -5], tint: "#f0ead8" },
  { c: [15, -5], tint: "#ece6ef" },
  { c: [-15, 5], tint: "#f0e5d3" },
  { c: [-5, 5], tint: "#e9e7e1" },
  { c: [5, 5], tint: "#ebe7dc" },
  { c: [15, 5], tint: "#e0eee4" },
  { c: [-15, 15], tint: "#f0e8d0" },
  { c: [-5, 15], tint: "#e3eed9" },
  { c: [5, 15], tint: "#d9eed2" },
  { c: [15, 15], tint: "#e3eed9" },
];

let roadTexture: THREE.CanvasTexture | null = null;
function getRoadTexture() {
  if (roadTexture) return roadTexture;
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "#454b55";
  g.fillRect(0, 0, 64, 128);
  g.fillStyle = "#f3d46b";
  g.fillRect(30, 12, 4, 50);
  g.fillStyle = "rgba(255,255,255,0.35)";
  g.fillRect(3, 0, 2, 128);
  g.fillRect(59, 0, 2, 128);
  roadTexture = new THREE.CanvasTexture(c);
  roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
  roadTexture.colorSpace = THREE.SRGBColorSpace;
  roadTexture.anisotropy = 8;
  return roadTexture;
}

function Roads() {
  const mats = useMemo(() => {
    const t = getRoadTexture().clone();
    t.repeat.set(1, 52 / 4);
    t.needsUpdate = true;
    return new THREE.MeshStandardMaterial({ map: t, roughness: 0.95 });
  }, []);
  return (
    <>
      {ROADS.map((r) => (
        <group key={r}>
          <mesh position={[r, 0.07, 0]} rotation-x={-Math.PI / 2} material={mats} receiveShadow raycast={noRaycast}>
            <planeGeometry args={[1.7, 52]} />
          </mesh>
          <mesh position={[0, 0.072, r]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} material={mats} receiveShadow raycast={noRaycast}>
            <planeGeometry args={[1.7, 52]} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Lots() {
  return (
    <>
      {BLOCKS.map((b) => (
        <RoundedBox key={b.c.join()} args={[8.8, 0.04, 8.8]} radius={0.02} position={[b.c[0], 0.02, b.c[1]]} receiveShadow raycast={noRaycast}>
          <meshStandardMaterial color={b.tint} roughness={1} />
        </RoundedBox>
      ))}
    </>
  );
}

/* ------------------------------ instanced trees ------------------------------ */

function makeTrees() {
  const rects = [
    ...PLACES.map((p) => ({ x: p.pos[0], z: p.pos[1], hw: p.size[0] / 2 + 0.9, hd: p.size[2] / 2 + 1.5 })),
    ...PLOTS.map((p) => ({ x: p.pos[0], z: p.pos[1], hw: PLOT_SIZE / 2 + 0.4, hd: PLOT_SIZE / 2 + 0.4 })),
  ];
  let seed = 42;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const out: { x: number; z: number; s: number }[] = [];
  for (const b of BLOCKS) {
    for (let k = 0; k < 40 && out.length < 150; k++) {
      const x = b.c[0] + (rnd() - 0.5) * 8.2;
      const z = b.c[1] + (rnd() - 0.5) * 8.2;
      if (rects.some((r) => Math.abs(x - r.x) < r.hw && Math.abs(z - r.z) < r.hd)) continue;
      if (out.filter((t) => Math.hypot(t.x - x, t.z - z) < 1.6).length) continue;
      out.push({ x, z, s: 0.7 + rnd() * 0.7 });
    }
  }
  return out;
}

function Trees() {
  const trees = useMemo(() => makeTrees(), []);
  const trunks = useRef<THREE.InstancedMesh>(null);
  const crowns = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const col = new THREE.Color();
    trees.forEach((t, i) => {
      m.compose(new THREE.Vector3(t.x, 0.3 * t.s, t.z), new THREE.Quaternion(), new THREE.Vector3(t.s, t.s, t.s));
      trunks.current!.setMatrixAt(i, m);
      m.compose(new THREE.Vector3(t.x, 0.95 * t.s, t.z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, t.x, 0)), new THREE.Vector3(t.s, t.s * 1.05, t.s));
      crowns.current!.setMatrixAt(i, m);
      crowns.current!.setColorAt(i, col.set(["#58a853", "#4f9a4d", "#69b45c", "#3f8f56"][i % 4]));
    });
    trunks.current!.instanceMatrix.needsUpdate = true;
    crowns.current!.instanceMatrix.needsUpdate = true;
    if (crowns.current!.instanceColor) crowns.current!.instanceColor.needsUpdate = true;
  }, [trees]);
  return (
    <>
      <instancedMesh ref={trunks} args={[undefined, undefined, trees.length]} castShadow raycast={noRaycast}>
        <cylinderGeometry args={[0.07, 0.1, 0.6, 7]} />
        <meshStandardMaterial color="#7a5a3c" roughness={1} />
      </instancedMesh>
      <instancedMesh ref={crowns} args={[undefined, undefined, trees.length]} castShadow raycast={noRaycast}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial roughness={0.9} flatShading />
      </instancedMesh>
    </>
  );
}

/* ------------------------------- street lamps ------------------------------- */

function Lamps() {
  const poles = useRef<THREE.InstancedMesh>(null);
  const bulbs = useRef<THREE.InstancedMesh>(null);
  const spots = useMemo(() => {
    const out: [number, number][] = [];
    for (const r of ROADS) {
      for (let t = -22; t <= 22; t += 5.5) {
        if (ROADS.some((q) => Math.abs(t - q) < 1.8)) continue;
        out.push([r + 1.15, t]);
        out.push([t, r - 1.15]);
      }
    }
    return out;
  }, []);
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    spots.forEach(([x, z], i) => {
      poles.current!.setMatrixAt(i, m.makeTranslation(x, 0.55, z));
      bulbs.current!.setMatrixAt(i, m.makeTranslation(x, 1.15, z));
    });
    poles.current!.instanceMatrix.needsUpdate = true;
    bulbs.current!.instanceMatrix.needsUpdate = true;
  }, [spots]);
  return (
    <>
      <instancedMesh ref={poles} args={[undefined, undefined, spots.length]} raycast={noRaycast}>
        <cylinderGeometry args={[0.025, 0.035, 1.1, 6]} />
        <meshStandardMaterial color="#6b7380" roughness={0.6} />
      </instancedMesh>
      <instancedMesh ref={bulbs} args={[undefined, undefined, spots.length]} material={lampMat} raycast={noRaycast}>
        <sphereGeometry args={[0.09, 10, 8]} />
      </instancedMesh>
    </>
  );
}

/* ------------------------------ hills and lake ------------------------------ */

function Surroundings() {
  const hills = useMemo(() => {
    const out: { x: number; z: number; r: number; h: number; c: string }[] = [];
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const rad = 38 + ((i * 7) % 5) * 2.2;
      out.push({ x: Math.cos(a) * rad, z: Math.sin(a) * rad, r: 6 + ((i * 3) % 4) * 1.4, h: 2.2 + ((i * 5) % 3) * 0.9, c: ["#b8d6a4", "#a9cd98", "#c3dcae"][i % 3] });
    }
    return out;
  }, []);
  return (
    <>
      {hills.map((h, i) => (
        <mesh key={i} position={[h.x, 0, h.z]} scale={[h.r, h.h, h.r]} material={mat(h.c, 1)} raycast={noRaycast}>
          <sphereGeometry args={[1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      ))}
      <mesh position={[-33, 0.02, -2]} rotation-x={-Math.PI / 2} scale={[7, 11, 1]} raycast={noRaycast}>
        <circleGeometry args={[1, 48]} />
        <meshStandardMaterial color="#79c3e6" roughness={0.15} metalness={0.2} />
      </mesh>
    </>
  );
}

/* --------------------------------- traffic --------------------------------- */

type Car = { hx: number; hz: number; speed: number; offset: number; color: string; danfo: boolean; ccw: boolean };

const CARS: Car[] = [
  { hx: 10, hz: 10, speed: 2.4, offset: 0, color: "#f2b632", danfo: true, ccw: false },
  { hx: 10, hz: 10, speed: 2.4, offset: 40, color: "#e85d4a", danfo: false, ccw: false },
  { hx: 10, hz: 10, speed: 2.1, offset: 20, color: "#4a90e2", danfo: false, ccw: true },
  { hx: 20, hz: 20, speed: 3.0, offset: 0, color: "#f2b632", danfo: true, ccw: false },
  { hx: 20, hz: 20, speed: 3.0, offset: 80, color: "#f4f4f2", danfo: false, ccw: false },
  { hx: 20, hz: 20, speed: 2.8, offset: 40, color: "#3aa57a", danfo: false, ccw: true },
  { hx: 0, hz: 10, speed: 2.0, offset: 5, color: "#f2b632", danfo: true, ccw: false },
  { hx: 10, hz: 0, speed: 2.2, offset: 12, color: "#8a5adf", danfo: false, ccw: false },
];

function Vehicle({ car }: { car: Car }) {
  const g = useRef<THREE.Group>(null);
  const lane = 0.42;
  useFrame((state) => {
    const { hx, hz } = car;
    const w = (hx - lane) * 2;
    const h = (hz - lane) * 2;
    const per = 2 * (w + h);
    let s = (state.clock.elapsedTime * car.speed + car.offset) % per;
    if (car.ccw) s = per - s;
    let x: number;
    let z: number;
    let ry: number;
    const x0 = -(hx - lane);
    const z0 = -(hz - lane);
    if (s < w) {
      x = x0 + s;
      z = z0;
      ry = Math.PI / 2;
    } else if (s < w + h) {
      x = x0 + w;
      z = z0 + (s - w);
      ry = 0;
    } else if (s < 2 * w + h) {
      x = x0 + w - (s - w - h);
      z = z0 + h;
      ry = -Math.PI / 2;
    } else {
      x = x0;
      z = z0 + h - (s - 2 * w - h);
      ry = Math.PI;
    }
    if (car.ccw) ry += Math.PI;
    if (g.current) {
      g.current.position.set(x, 0.08, z);
      g.current.rotation.y = ry;
    }
  });
  const len = car.danfo ? 0.95 : 0.8;
  return (
    <group ref={g}>
      <mesh position={[0, 0.17, 0]} material={mat(car.color, 0.5)} castShadow raycast={noRaycast}>
        <boxGeometry args={[0.42, 0.22, len]} />
      </mesh>
      <mesh position={[0, 0.34, car.danfo ? 0 : -0.04]} material={mat(car.danfo ? car.color : "#dfe9f2", 0.35)} castShadow raycast={noRaycast}>
        <boxGeometry args={[0.38, 0.17, car.danfo ? len - 0.05 : 0.42]} />
      </mesh>
      {car.danfo && (
        <mesh position={[0, 0.22, 0]} material={mat("#1f232b")} raycast={noRaycast}>
          <boxGeometry args={[0.435, 0.05, len + 0.01]} />
        </mesh>
      )}
      {[
        [-0.2, 0.28],
        [0.2, 0.28],
        [-0.2, -0.28],
        [0.2, -0.28],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.07, z]} rotation-z={Math.PI / 2} material={mat("#1b1e24")} raycast={noRaycast}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 10]} />
        </mesh>
      ))}
    </group>
  );
}

export default function Terrain({ placesOnly = false }: { placesOnly?: boolean }) {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} receiveShadow raycast={noRaycast}>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color="#cfe3c2" roughness={1} />
      </mesh>
      <Lots />
      <Roads />
      {!placesOnly && <Trees />}
      {!placesOnly && <Lamps />}
      <Surroundings />
      <Skyline />
      {!placesOnly && CARS.map((c, i) => <Vehicle key={i} car={c} />)}
    </>
  );
}
