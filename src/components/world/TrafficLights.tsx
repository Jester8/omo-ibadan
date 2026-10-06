"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lightAt, type Light } from "@/lib/traffic";
import { ROAD_LINES } from "@/lib/world";

const RED = new THREE.Color("#ff3b30");
const AMBER = new THREE.Color("#ffb020");
const GREEN = new THREE.Color("#2fe06b");
const COLOR: Record<Light, THREE.Color> = { red: RED, amber: AMBER, green: GREEN };

type Post = { x: number; z: number; ix: number; iz: number; axis: "x" | "z" };

/** A signal post at each corner of every junction: two corners show the east-west light, two the north-south. */
function posts(): Post[] {
  const out: Post[] = [];
  for (const ix of ROAD_LINES) {
    for (const iz of ROAD_LINES) {
      out.push({ x: ix + 1.2, z: iz + 1.2, ix, iz, axis: "x" });
      out.push({ x: ix - 1.2, z: iz - 1.2, ix, iz, axis: "x" });
      out.push({ x: ix + 1.2, z: iz - 1.2, ix, iz, axis: "z" });
      out.push({ x: ix - 1.2, z: iz + 1.2, ix, iz, axis: "z" });
    }
  }
  return out;
}

export default function TrafficLights() {
  const list = useMemo(() => posts(), []);
  const poles = useRef<THREE.InstancedMesh>(null);
  const boxes = useRef<THREE.InstancedMesh>(null);
  const lamps = useRef<THREE.InstancedMesh>(null);
  const clock = useRef(0);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    list.forEach((p, i) => {
      poles.current!.setMatrixAt(i, m.makeTranslation(p.x, 0.48, p.z));
      boxes.current!.setMatrixAt(i, m.makeTranslation(p.x, 1.02, p.z));
      lamps.current!.setMatrixAt(i, m.makeTranslation(p.x, 1.04, p.z));
    });
    poles.current!.instanceMatrix.needsUpdate = true;
    boxes.current!.instanceMatrix.needsUpdate = true;
    lamps.current!.instanceMatrix.needsUpdate = true;
  }, [list]);

  // recolour the lamps four times a second
  useFrame((_, dt) => {
    clock.current += dt;
    if (clock.current < 0.25 || !lamps.current) return;
    clock.current = 0;
    const now = Date.now() / 1000;
    list.forEach((p, i) => lamps.current!.setColorAt(i, COLOR[lightAt(p.ix, p.iz, p.axis, now)]));
    if (lamps.current.instanceColor) lamps.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={poles} args={[undefined, undefined, list.length]} frustumCulled={false}>
        <cylinderGeometry args={[0.025, 0.03, 0.96, 6]} />
        <meshStandardMaterial color="#4b5361" roughness={0.6} />
      </instancedMesh>
      <instancedMesh ref={boxes} args={[undefined, undefined, list.length]} frustumCulled={false}>
        <boxGeometry args={[0.15, 0.22, 0.13]} />
        <meshStandardMaterial color="#1b1f27" roughness={0.7} />
      </instancedMesh>
      <instancedMesh ref={lamps} args={[undefined, undefined, list.length]} frustumCulled={false}>
        <sphereGeometry args={[0.055, 8, 6]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </>
  );
}
