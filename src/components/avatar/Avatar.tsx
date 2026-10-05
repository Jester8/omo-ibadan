"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { Look } from "@/lib/look";
import { ANIM_URL, BASE_URL, baseFor, dressAvatar } from "./rig";

export type Motion = { current: { speed: number } };

/** Avatar height in avatar units (metres) at scale 1. */
export const AVATAR_HEIGHT = 1.81;

Object.values(BASE_URL).forEach((u) => useGLTF.preload(u));

function Inner({ look: lookIn, motion, scale }: { look: Look; motion?: Motion; scale: number }) {
  const key = JSON.stringify(lookIn);
  const base = baseFor(lookIn);
  const gltf = useGLTF(BASE_URL[base]);
  const anim = useGLTF(lookIn.frame === "f" ? ANIM_URL.f : ANIM_URL.m);
  const current = useRef("");

  const built = useMemo(() => {
    const look = JSON.parse(key) as Look;
    const root = cloneSkinned(gltf.scene) as THREE.Group;
    const dressed = dressAvatar(root, look, base);
    const mixer = new THREE.AnimationMixer(root);
    const actions: Record<string, THREE.AnimationAction> = {};
    for (const clip of anim.animations) actions[clip.name] = mixer.clipAction(clip);
    return { root, dressed, mixer, actions };
  }, [gltf, anim, key, base]);

  useEffect(
    () => () => {
      built.mixer.stopAllAction();
      built.dressed.dispose();
    },
    [built],
  );

  useFrame((_, dt) => {
    const speed = motion?.current.speed ?? 0;
    const ms = speed / scale; // speed in the model's own metres per second
    let want = "Idle_Neutral";
    let timeScale = 1;
    if (ms > 0.15) {
      if (ms < 3) {
        want = "Walk";
        timeScale = Math.max(0.6, ms / 1.4);
      } else {
        want = "Run";
        timeScale = Math.min(2.2, Math.max(0.8, ms / 4.2));
      }
    }
    const next = built.actions[want];
    if (next) {
      if (current.current !== want) {
        const prev = built.actions[current.current];
        next.reset().fadeIn(0.2).play();
        // stagger the very first pose so a crowd doesn't move in lockstep
        if (!prev) built.mixer.update(Math.random() * next.getClip().duration);
        prev?.fadeOut(0.2);
        current.current = want;
      }
      next.setEffectiveTimeScale(timeScale);
    }
    built.mixer.update(dt);
  });

  const bw = lookIn.build === "slim" ? 0.94 : lookIn.build === "broad" ? 1.07 : 1;
  return (
    <group scale={[scale * bw, scale, scale * bw]}>
      <primitive object={built.root} />
    </group>
  );
}

export default function Avatar({ look, motion, scale = 1 }: { look: Look; motion?: Motion; scale?: number }) {
  return (
    <group>
      {/* soft contact shadow */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.012}>
        <circleGeometry args={[0.34 * scale * 1.6, 28]} />
        <meshBasicMaterial color="#000" transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <Suspense fallback={null}>
        <Inner look={look} motion={motion} scale={scale} />
      </Suspense>
    </group>
  );
}
