"use client";

import * as THREE from "three";

/** Touchlines, halfway line, centre circle and goals on the stadium pitch, in stadium-local coordinates. No one plays on it; real players can walk on. */
const HX = 1.95;
const HZ = 1.3;
const FIELD_Y = 0.13;

const line = new THREE.MeshBasicMaterial({ color: "#f4fbf4" });

export default function Pitch() {
  return (
    <group>
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
    </group>
  );
}
