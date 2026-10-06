"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { Look } from "@/lib/look";
import { ANIM_URL, BASE_URL, baseFor, dressAvatar } from "./rig";

export type Motion = { current: { speed: number; pose?: "sit" | "lie" | null; emote?: "wave" | "dance" | null; eat?: "bowl" | "cup" | "snack" | null } };

const SIT_THIGH = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -1.45);
const SIT_KNEE = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 1.5);

const _ax = new THREE.Vector3(1, 0, 0);
const _eatUp = new THREE.Quaternion();
const _eatFore = new THREE.Quaternion();
const _eatIn = new THREE.Quaternion();
const _az = new THREE.Vector3(0, 0, 1);
const _wp = new THREE.Vector3();
const _up = new THREE.Vector3();

/** Little props held in the hand while eating: a bowl of food, a cup, a snack. */
function makeFood() {
  const g = new THREE.Group();
  const mat = (c: string, r = 0.6) => new THREE.MeshStandardMaterial({ color: c, roughness: r });
  const bowl = new THREE.Group();
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.045, 0.05, 20), mat("#f5f3ee"));
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.058, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat("#d9a441", 0.9));
  m.position.y = 0.02;
  const soup = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.006, 16), mat("#2f7d32", 0.8));
  soup.position.set(0, 0.026, 0);
  bowl.add(b, m);
  const cup = new THREE.Group();
  cup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.032, 0.1, 14), mat("#2f6fd6", 0.4)));
  const snack = new THREE.Group();
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.035, 0.05), mat("#c98b3a", 0.9));
  bar.rotation.z = 0.35;
  snack.add(bar);
  void soup;
  g.add(bowl, cup, snack);
  return g;
}

const _pw = new THREE.Quaternion();
const _rw = new THREE.Quaternion();
const _pr = new THREE.Quaternion();

/**
 * Rotate a bone by `r`, expressed in the avatar's own frame (x = sideways, z = forward), whatever the
 * bone's local axes are. Bone-local axes in this rig differ left to right, so a plain local rotation
 * swings the legs out sideways.
 */
function rotateInRootFrame(bone: THREE.Object3D | null | undefined, root: THREE.Object3D, r: THREE.Quaternion) {
  if (!bone?.parent) return;
  bone.parent.updateWorldMatrix(true, false);
  root.getWorldQuaternion(_rw);
  bone.parent.getWorldQuaternion(_pw);
  _pr.copy(_rw).invert().multiply(_pw); // bone parent's rotation relative to the avatar root
  // local' = parent^-1 * r * parent * local
  bone.quaternion.premultiply(_pr).premultiply(r).premultiply(_pr.invert());
}


type Rig = { root: THREE.Object3D; legs: { ar?: THREE.Object3D | null; lar?: THREE.Object3D | null }; wrist?: THREE.Object3D | null; food: THREE.Group };

/** The arm bones as the animation last posed them, so eating never stacks offsets frame after frame. */
const armSnap = new WeakMap<THREE.Object3D, THREE.Quaternion>();

/** Raise the right arm to the mouth and show the food in hand. */
function applyEat(built: Rig, eat: "bowl" | "cup" | "snack" | null, pose: string | null, t: number) {
  const food = built.food;
  const arm = [built.legs.ar, built.legs.lar];
  const eating = !!eat && pose !== "lie";
  food.visible = eating;
  if (!eating) {
    // not eating: remember the current (animated) arm pose
    for (const b of arm) if (b) armSnap.set(b, (armSnap.get(b) ?? new THREE.Quaternion()).copy(b.quaternion));
    return;
  }
  // start every frame from the remembered pose, then add the offset once: nothing accumulates, nothing shakes
  for (const b of arm) {
    const q = b && armSnap.get(b);
    if (b && q) b.quaternion.copy(q);
  }
  const bite = 0.5 - 0.5 * Math.cos(t * 2.1); // 0 = plate out, 1 = at the mouth, slow and smooth
  // upper arm forward and a little inward, forearm folding up towards the mouth
  _eatUp.setFromAxisAngle(_ax, -0.5 - 0.1 * bite).premultiply(_eatIn.setFromAxisAngle(_az, 0.38));
  rotateInRootFrame(built.legs.ar, built.root, _eatUp);
  rotateInRootFrame(built.legs.lar, built.root, _eatFore.setFromAxisAngle(_ax, -0.95 - 0.65 * bite));
  if (!built.wrist) return;
  built.root.updateWorldMatrix(true, true);
  built.wrist.getWorldPosition(_wp);
  built.root.worldToLocal(_wp);
  food.position.copy(_wp).add(_up.set(0, 0.07, 0.07));
  food.children.forEach((c, i) => (c.visible = (eat === "bowl" && i === 0) || (eat === "cup" && i === 1) || (eat === "snack" && i === 2)));
}

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
    const bone = (n: string) => root.getObjectByName(n) ?? null;
    const legs = { ul: bone("UpperLegL"), ur: bone("UpperLegR"), ll: bone("LowerLegL"), lr: bone("LowerLegR"), hips: bone("Hips"), chest: bone("Chest"), head: bone("Head"), al: bone("UpperArmL"), ar: bone("UpperArmR"), lar: bone("LowerArmR") };
    const wrist = bone("WristR");
    const food = makeFood();
    food.visible = false;
    root.add(food);
    return { root, dressed, mixer, actions, legs, wrist, food };
  }, [gltf, anim, key, base]);

  useEffect(
    () => () => {
      built.mixer.stopAllAction();
      built.dressed.dispose();
    },
    [built],
  );

  useFrame((state, dt) => {
    const speed = motion?.current.speed ?? 0;
    const ms = speed / scale; // speed in the model's own metres per second
    const pose = motion?.current.pose;
    let want = "Idle_Neutral";
    let timeScale = 1;
    const emote = motion?.current.emote;
    if (emote === "wave" && !pose && ms <= 0.15) want = "Wave";
    if (ms > 0.15 && !pose) {
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
    if (emote === "dance" && !pose && ms <= 0.15) {
      const t = state.clock.elapsedTime * 6.5;
      const q = (x: number, y: number, z: number, a: number) => new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(x, y, z), a);
      built.legs.hips?.quaternion.multiply(q(0, 0, 1, Math.sin(t) * 0.22)).multiply(q(0, 1, 0, Math.sin(t * 0.5) * 0.3));
      built.legs.chest?.quaternion.multiply(q(0, 1, 0, -Math.sin(t * 0.5) * 0.35));
      built.legs.head?.quaternion.multiply(q(1, 0, 0, Math.abs(Math.sin(t)) * 0.2));
      built.legs.al?.quaternion.multiply(q(0, 0, 1, -1.3 + Math.sin(t) * 0.5));
      built.legs.ar?.quaternion.multiply(q(0, 0, 1, 1.3 - Math.sin(t + 1.6) * 0.5));
      built.legs.ul?.quaternion.multiply(q(1, 0, 0, Math.sin(t) * 0.3));
      built.legs.ur?.quaternion.multiply(q(1, 0, 0, -Math.sin(t) * 0.3));
    }
    applyEat(built, motion?.current.eat ?? null, pose ?? null, state.clock.elapsedTime);
    const seated = pose === "sit";
    built.dressed.skirts.forEach((o) => (o.visible = !seated));
    built.dressed.legs.forEach((o) => (o.visible = seated));
    if (pose === "sit") {
      rotateInRootFrame(built.legs.ul, built.root, SIT_THIGH);
      rotateInRootFrame(built.legs.ur, built.root, SIT_THIGH);
      rotateInRootFrame(built.legs.ll, built.root, SIT_KNEE);
      rotateInRootFrame(built.legs.lr, built.root, SIT_KNEE);
    }
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
