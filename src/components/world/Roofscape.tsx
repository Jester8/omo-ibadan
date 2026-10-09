"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { HOUSES } from "@/lib/houses";
import { windowMats } from "./materials";

/** Corrugated iron: fine ridges across the slope. */
function corrugated() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d")!;
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, 64, 64);
  for (let x = 0; x < 64; x += 8) {
    g.fillStyle = "rgba(60,25,10,0.28)";
    g.fillRect(x, 0, 3, 64);
    g.fillStyle = "rgba(255,230,200,0.35)";
    g.fillRect(x + 4, 0, 2, 64);
  }
  // rust streaks
  for (let i = 0; i < 18; i++) {
    g.fillStyle = `rgba(90,40,15,${0.05 + (i % 3) * 0.04})`;
    g.fillRect((i * 29) % 64, (i * 13) % 64, 6, 14);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 1);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function gable() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.58, 0);
  shape.lineTo(0.58, 0);
  shape.lineTo(0, 0.34);
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: 1.12, bevelEnabled: false });
  g.translate(0, 0, -0.56);
  return g;
}

const Y = new THREE.Vector3(0, 1, 0);
const DOOR = { w: 0.15, h: 0.27 };
const PANE = { w: 0.15, h: 0.12 };

export default function Roofscape() {
  const walls = useRef<THREE.InstancedMesh>(null);
  const roofs = useRef<THREE.InstancedMesh>(null);
  const doors = useRef<THREE.InstancedMesh>(null);
  const frames = useRef<THREE.InstancedMesh>(null);
  const panes = useRef<THREE.InstancedMesh>(null);
  const tex = useMemo(() => corrugated(), []);
  const geo = useMemo(() => gable(), []);
  const glass = useMemo(() => new THREE.MeshStandardMaterial({ color: "#6f8fa8", roughness: 0.2, metalness: 0.3, emissive: new THREE.Color("#ffd27a"), emissiveIntensity: 0 }), []);

  // the windows light up at night with the rest of the city
  useEffect(() => {
    windowMats.add(glass);
    return () => {
      windowMats.delete(glass);
    };
  }, [glass]);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const qf = new THREE.Quaternion();
    const col = new THREE.Color();
    const v = new THREE.Vector3();
    let nd = 0;
    let np = 0;
    /** Put a flat plate on a face of house `h`: local x along the face, y up from the ground, `out` away from the wall. */
    const plate = (im: THREE.InstancedMesh, i: number, h: (typeof HOUSES)[number], face: 0 | 1 | 2, lx: number, y: number, w: number, ht: number, lift: number) => {
      // face 0 = front (+z), 1 = east (+x), 2 = west (-x), all in the house's own frame
      const yaw = h.ry + (face === 0 ? 0 : face === 1 ? Math.PI / 2 : -Math.PI / 2);
      const out = face === 0 ? h.d / 2 : h.w / 2;
      const lp = face === 0 ? v.set(lx, y, out + lift) : face === 1 ? v.set(out + lift, y, lx) : v.set(-out - lift, y, lx);
      lp.applyAxisAngle(Y, h.ry);
      qf.setFromAxisAngle(Y, yaw);
      m.compose(new THREE.Vector3(h.x + lp.x, lp.y, h.z + lp.z), qf, new THREE.Vector3(w, ht, 1));
      im.setMatrixAt(i, m);
    };
    HOUSES.forEach((h, i) => {
      q.setFromAxisAngle(Y, h.ry);
      m.compose(new THREE.Vector3(h.x, 0.04 + h.h / 2, h.z), q, new THREE.Vector3(h.w, h.h, h.d));
      walls.current!.setMatrixAt(i, m);
      walls.current!.setColorAt(i, col.set(h.wall));
      // the roof prism: its slope runs across the house's depth and its ridge along the long side, with a little overhang
      q.setFromAxisAngle(Y, h.ry + Math.PI / 2);
      m.compose(new THREE.Vector3(h.x, 0.04 + h.h, h.z), q, new THREE.Vector3(h.d * 1.12, 1.15, h.w * 1.08));
      roofs.current!.setMatrixAt(i, m);
      roofs.current!.setColorAt(i, col.set(h.roof));
      // a door on the front, two windows either side of it, and a window in each end wall
      plate(doors.current!, nd++, h, 0, 0, 0.04 + DOOR.h / 2, DOOR.w, DOOR.h, 0.004);
      const wy = 0.04 + h.h * 0.6;
      const fx = h.w * 0.3;
      for (const [face, lx] of [[0, -fx], [0, fx], [1, 0], [2, 0]] as const) {
        plate(frames.current!, np, h, face, lx, wy, PANE.w + 0.03, PANE.h + 0.03, 0.002);
        plate(panes.current!, np, h, face, lx, wy, PANE.w, PANE.h, 0.004);
        np++;
      }
    });
    for (const im of [walls.current!, roofs.current!, doors.current!, frames.current!, panes.current!]) {
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
  }, []);

  const n = HOUSES.length;
  return (
    <>
      <instancedMesh ref={walls} args={[undefined, undefined, n]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.95} />
      </instancedMesh>
      <instancedMesh ref={roofs} args={[geo, undefined, n]} frustumCulled={false} castShadow>
        <meshStandardMaterial map={tex} roughness={0.75} metalness={0.15} />
      </instancedMesh>
      <instancedMesh ref={doors} args={[undefined, undefined, n]} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#4a2f1c" roughness={0.8} />
      </instancedMesh>
      <instancedMesh ref={frames} args={[undefined, undefined, n * 4]} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#f4f0e6" roughness={0.8} />
      </instancedMesh>
      <instancedMesh ref={panes} args={[undefined, undefined, n * 4]} frustumCulled={false} material={glass}>
        <planeGeometry args={[1, 1]} />
      </instancedMesh>
    </>
  );
}
