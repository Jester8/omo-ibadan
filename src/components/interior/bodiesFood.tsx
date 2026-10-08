"use client";

import { useLayoutEffect, useMemo, useRef, type ComponentType } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { FurnKind } from "@/lib/furniture";
import { mat } from "@/components/world/materials";
import type { BodyRenderer } from "./extras";
import { Bx, Cy, DARK, Legs, METAL, Sp, WOOD, artMat, glass, litMat, type BodyProps, type V3 } from "./prims";

/**
 * Food service furniture: hot cases, order counters, bakery cabinets, buka pots, the suya grill,
 * drinks coolers, kitchen lines, trays, diner booths and lit menu boards.
 * Every renderer draws in the item's local space (floor level, +z is the front).
 */

/* ---------------------------------- palette ---------------------------------- */

const STEEL = "#b9bfc5";
const STEEL_D = "#8b9197";
const STEEL_L = "#dfe3e6";
const BLACK = "#24272d";

/** food colours: saturated so they read from the game camera */
const F = {
  jollof: "#e04c17", jollofDk: "#b5320f", fried: "#e8c04e", friedDk: "#c79a30", pea: "#4fa23a", carrot: "#f08320",
  chicken: "#bf6b22", chickenLt: "#dc8f36", bone: "#f3ead2",
  dodo: "#f2b51c", dodoDk: "#c07c10", moi: "#e4b568", egg: "#f8f2de", yolk: "#f4b92a",
  lettuce: "#5fb74b", tomato: "#d93220", cucumber: "#a6d06c", rice: "#f7f3e8",
  pie: "#d19438", pieLt: "#e2ad52", bread: "#c98a43", breadLt: "#dca45c", puff: "#d9962a",
  fries: "#f2c230", bun: "#dca258", patty: "#5b3119", cheese: "#f6c82f", plate: "#f8f5ec",
};

/* ------------------------- shared geometry (built once) ------------------------- */

const lathe = (pts: [number, number][]) => new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), 10);
/** a 0.27 m soft-drink bottle standing on y = 0 */
const bottleGeo = lathe([[0, 0], [0.03, 0], [0.033, 0.012], [0.033, 0.135], [0.027, 0.17], [0.014, 0.205], [0.013, 0.245], [0, 0.245]]);
const capGeo = new THREE.CylinderGeometry(0.0165, 0.0165, 0.03, 8).translate(0, 0.255, 0);
const canGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.12, 10).translate(0, 0.06, 0);
const donutGeo = new THREE.TorusGeometry(0.05, 0.02, 8, 14).rotateX(Math.PI / 2).translate(0, 0.02, 0);
const stickGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.44, 5).rotateX(Math.PI / 2);
const chunkGeo = new THREE.BoxGeometry(0.06, 0.05, 0.055);

/* --------------------------------- small helpers --------------------------------- */

/** a glass pane (bottom-based like Bx) that does not cast a shadow onto the food behind it */
function Pane({ p, s }: { p: V3; s: V3 }) {
  return (
    <mesh position={[p[0], p[1] + s[1] / 2, p[2]]} material={glass}>
      <boxGeometry args={s} />
    </mesh>
  );
}

/** a thin cylinder running from point a to point b */
function Rod({ a, b, r = 0.01, c = METAL, seg = 6 }: { a: V3; b: V3; r?: number; c?: string; seg?: number }) {
  const dir = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
  const len = dir.length();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return (
    <mesh position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]} quaternion={[q.x, q.y, q.z, q.w]} material={mat(c, 0.5)} castShadow>
      <cylinderGeometry args={[r, r, len, seg]} />
    </mesh>
  );
}

/** a flattened ball of food; rx / ry / rz are half-extents */
function Blob({ p, rx, ry, rz, c, rough = 0.6 }: { p: V3; rx: number; ry: number; rz: number; c: string; rough?: number }) {
  return <Sp p={p} r={0.5} sc={[rx * 2, ry * 2, rz * 2]} c={c} rough={rough} />;
}

/** a fried chicken piece lying on its side, bone pointing along +x before the yaw */
function Piece({ p, ry = 0, s = 1, lt = false }: { p: V3; ry?: number; s?: number; lt?: boolean }) {
  return (
    <group position={p} rotation-y={ry} scale={s}>
      <Blob p={[0, 0, 0]} rx={0.06} ry={0.036} rz={0.042} c={lt ? F.chickenLt : F.chicken} rough={0.5} />
      <Rod a={[0.045, 0, 0]} b={[0.105, 0.006, 0]} r={0.009} c={F.bone} />
    </group>
  );
}

/** a takeaway cup with a lid and straw; origin on the table */
function Cup({ p, band = "#d93220", s = 1 }: { p: V3; band?: string; s?: number }) {
  return (
    <group position={p} scale={s}>
      <Cy r={0.03} r2={0.039} h={0.12} c="#f6f4ee" seg={14} />
      <Cy p={[0, 0.04, 0]} r={0.0335} r2={0.0365} h={0.04} c={band} seg={14} />
      <Cy p={[0, 0.12, 0]} r={0.041} h={0.012} c="#e4e2dc" seg={14} />
      <Rod a={[0.004, 0.12, 0]} b={[0.02, 0.2, 0.004]} r={0.004} c="#ffffff" seg={5} />
    </group>
  );
}

/** a soft-drink bottle */
function Bottle({ p, body, cap }: { p: V3; body: string; cap: string }) {
  return (
    <group position={p}>
      <mesh geometry={bottleGeo} material={mat(body, 0.3)} castShadow />
      <mesh geometry={capGeo} material={mat(cap, 0.4)} />
    </group>
  );
}

/* ----------------------- instanced rows (bottles, cans, skewers) ----------------------- */

type Slot = { x: number; y: number; z: number; col: string };
const slotDummy = new THREE.Object3D();
const slotColor = new THREE.Color();

/** one draw call for a whole row of identical things, each with its own colour */
function Inst({ geo, slots, rough = 0.4 }: { geo: THREE.BufferGeometry; slots: Slot[]; rough?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    slots.forEach((s, i) => {
      slotDummy.position.set(s.x, s.y, s.z);
      slotDummy.updateMatrix();
      m.setMatrixAt(i, slotDummy.matrix);
      m.setColorAt(i, slotColor.set(s.col));
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [slots]);
  return <instancedMesh ref={ref} args={[geo, mat("#ffffff", rough), slots.length]} castShadow frustumCulled={false} />;
}

/* ------------------------------- steam, smoke and embers ------------------------------- */

/** rising wisps that grow and fade as they climb; each owns its material so opacity can differ */
function Wisps({ p, n = 3, color, rise = 0.5, r = 0.05, spread = 0.1, speed = 0.3, peak = 0.3 }: { p: V3; n?: number; color: string; rise?: number; r?: number; spread?: number; speed?: number; peak?: number }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const mats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    for (let i = 0; i < n; i++) {
      const m = meshes.current[i];
      const mt = mats.current[i];
      if (!m || !mt) continue;
      const k = (t + i / n) % 1;
      m.position.set(p[0] + (i - (n - 1) / 2) * spread + Math.sin(t * 6 + i * 2) * 0.02, p[1] + k * rise, p[2]);
      m.scale.setScalar(0.6 + k * 1.2);
      mt.opacity = Math.sin(k * Math.PI) * peak;
    }
  });
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          position={p}
        >
          <sphereGeometry args={[r, 8, 6]} />
          <meshBasicMaterial
            ref={(el) => {
              mats.current[i] = el;
            }}
            color={color}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

/** charcoal glows and flickers whether or not NEPA is around (it is a fire, not a bulb); shared by every grill */
const emberMat = new THREE.MeshStandardMaterial({ color: "#3a1608", emissive: new THREE.Color("#ff5a12"), emissiveIntensity: 1.2, roughness: 0.9 });
const EMBER_LUMPS: [number, number, number][] = [[-0.3, 0.05, 0.4], [-0.15, -0.06, 1.1], [0, 0.07, 2.0], [0.14, -0.04, 0.6], [0.28, 0.06, 1.5], [0.36, -0.02, 2.4]];

function EmberBed({ p, s }: { p: V3; s: V3 }) {
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    emberMat.emissiveIntensity = 1.15 + Math.sin(t * 7.3) * 0.25 + Math.sin(t * 13.1 + 1.7) * 0.15;
  });
  return (
    <>
      <Bx p={p} s={s} m={emberMat} />
      {EMBER_LUMPS.map(([x, z, ry], i) => (
        <Bx key={i} p={[p[0] + x, p[1] + s[1], p[2] + z]} s={[0.055, 0.03, 0.05]} m={emberMat} rot={[0, ry, 0]} />
      ))}
    </>
  );
}

/* ================================== HOT CASE ================================== */

type PanProps = { p: V3; w: number; d: number };

/** a steel pan filled with `fill` to the brim; the food on top starts at p.y + 0.075 */
function Pan({ p, w, d, fill }: PanProps & { fill: string }) {
  return (
    <>
      <Bx p={p} s={[w, 0.07, d]} c={STEEL_L} r={0.3} />
      <Bx p={[p[0], p[1] + 0.005, p[2]]} s={[w - 0.05, 0.07, d - 0.05]} c={fill} r={0.6} />
    </>
  );
}

function JollofPan({ p, w, d }: PanProps) {
  const t = p[1] + 0.075;
  return (
    <>
      <Pan p={p} w={w} d={d} fill={F.jollofDk} />
      <Blob p={[p[0], t, p[2]]} rx={w / 2 - 0.05} ry={0.05} rz={d / 2 - 0.04} c={F.jollof} />
      {[[-0.12, 0.03], [0.05, -0.04], [0.14, 0.04]].map(([x, z], i) => (
        <Sp key={i} p={[p[0] + x, t + 0.036, p[2] + z]} r={0.02} c={F.jollofDk} sc={[1.4, 0.8, 1]} />
      ))}
    </>
  );
}

function FriedRicePan({ p, w, d }: PanProps) {
  const t = p[1] + 0.075;
  return (
    <>
      <Pan p={p} w={w} d={d} fill={F.friedDk} />
      <Blob p={[p[0], t, p[2]]} rx={w / 2 - 0.05} ry={0.05} rz={d / 2 - 0.04} c={F.fried} />
      {[[-0.13, 0.02, F.pea], [0.04, -0.05, F.carrot], [0.12, 0.04, F.pea], [-0.03, 0.05, F.carrot]].map(([x, z, col], i) => (
        <Sp key={i} p={[p[0] + (x as number), t + 0.04, p[2] + (z as number)]} r={0.016} c={col as string} />
      ))}
    </>
  );
}

function ChickenPan({ p, w, d }: PanProps) {
  const t = p[1] + 0.07;
  return (
    <>
      <Pan p={p} w={w} d={d} fill="#7a4318" />
      <Piece p={[p[0] - 0.12, t + 0.026, p[2] - 0.065]} ry={0.3} />
      <Piece p={[p[0] + 0.04, t + 0.026, p[2] - 0.06]} ry={Math.PI + 0.3} lt />
      <Piece p={[p[0] - 0.1, t + 0.026, p[2] + 0.07]} ry={-0.3} lt />
      <Piece p={[p[0] + 0.1, t + 0.026, p[2] + 0.06]} ry={Math.PI - 0.2} />
    </>
  );
}

function DodoPan({ p, w, d }: PanProps) {
  const t = p[1] + 0.07;
  const slice = (x: number, z: number, y: number, ry: number, dk: boolean, key: string) => (
    <group key={key} position={[p[0] + x, t + y, p[2] + z]} rotation-y={ry}>
      <Blob p={[0, 0, 0]} rx={0.055} ry={0.016} rz={0.033} c={dk ? F.dodoDk : F.dodo} rough={0.5} />
    </group>
  );
  return (
    <>
      <Bx p={p} s={[w, 0.07, d]} c={STEEL_L} r={0.3} />
      {[-0.15, 0, 0.15].flatMap((x, i) => [-0.06, 0.06].map((z, j) => slice(x, z, 0.012, (i - j) * 0.35, (i + j) % 2 === 1, `${i}${j}`)))}
      {slice(-0.07, 0, 0.03, 0.5, false, "t1")}
      {slice(0.08, 0.01, 0.03, -0.4, true, "t2")}
    </>
  );
}

function MoiPan({ p, w, d }: PanProps) {
  const t = p[1] + 0.075;
  return (
    <>
      <Pan p={p} w={w} d={d} fill="#d9a85a" />
      {[-0.17, -0.06, 0.06, 0.17].map((x, i) => (
        <Cy key={i} p={[p[0] + x, t, p[2] + (i % 2 ? 0.05 : -0.05)]} r={0.058} r2={0.042} h={0.08} c={F.moi} seg={12} />
      ))}
      {/* a boiled egg crowning one */}
      <Blob p={[p[0] - 0.06, t + 0.082, p[2] + 0.05]} rx={0.03} ry={0.016} rz={0.022} c={F.egg} />
      <Sp p={[p[0] - 0.06, t + 0.09, p[2] + 0.05]} r={0.011} c={F.yolk} />
    </>
  );
}

function SaladPan({ p, w, d }: PanProps) {
  const t = p[1] + 0.075;
  return (
    <>
      <Pan p={p} w={w} d={d} fill="#3d8a33" />
      <Blob p={[p[0], t, p[2]]} rx={w / 2 - 0.06} ry={0.05} rz={d / 2 - 0.04} c={F.lettuce} />
      {[[-0.12, 0.02], [0.0, -0.04], [0.12, 0.03]].map(([x, z], i) => (
        <Sp key={i} p={[p[0] + x, t + 0.042, p[2] + z]} r={0.028} c={F.tomato} sc={[1, 0.45, 1]} />
      ))}
      {[[-0.05, 0.05], [0.07, -0.01]].map(([x, z], i) => (
        <Cy key={i} p={[p[0] + x, t + 0.04, p[2] + z]} r={0.03} h={0.012} c={F.cucumber} seg={12} />
      ))}
      <Blob p={[p[0] - 0.03, t + 0.046, p[2] - 0.02]} rx={0.025} ry={0.012} rz={0.015} c={F.carrot} />
    </>
  );
}

function HotCase({ W, D, c, c2 }: BodyProps) {
  const pw = (W - 0.2) / 3;
  const xs = [-(pw + 0.012), 0, pw + 0.012];
  const pd = 0.29;
  const front: V3 = [0, 0.6, 0.14];
  const back: V3 = [0, 0.72, -0.18];
  return (
    <>
      {/* stainless body with an accent kick panel */}
      <Bx s={[W, 0.06, D]} c={BLACK} />
      <Bx p={[0, 0.06, 0]} s={[W - 0.04, 0.5, D - 0.04]} c={STEEL} r={0.35} />
      <Bx p={[0, 0.1, D / 2 - 0.018]} s={[W - 0.2, 0.36, 0.012]} c={c} r={0.5} />
      <Bx p={[0, 0.56, 0]} s={[W + 0.04, 0.04, D + 0.04]} c={STEEL_L} r={0.25} />
      <Bx p={[0, 0.6, -0.18]} s={[W - 0.1, 0.12, 0.3]} c={STEEL_D} r={0.35} />
      <Bx p={[0, 0.6, -D / 2 + 0.03]} s={[W - 0.06, 0.5, 0.012]} c={STEEL} r={0.3} />
      {/* glass front, sides and lid over the pans */}
      <Pane p={[0, 0.6, D / 2 - 0.02]} s={[W - 0.06, 0.5, 0.01]} />
      <Pane p={[-(W / 2 - 0.025), 0.6, 0]} s={[0.01, 0.5, D - 0.06]} />
      <Pane p={[W / 2 - 0.025, 0.6, 0]} s={[0.01, 0.5, D - 0.06]} />
      <Pane p={[0, 1.09, 0.13]} s={[W - 0.06, 0.01, 0.4]} />
      {[-1, 1].map((s) => <Cy key={s} p={[s * (W / 2 - 0.025), 0.6, D / 2 - 0.025]} r={0.013} h={0.5} c={STEEL_D} seg={8} />)}
      {/* warm canopy with the light strip and menu swatches */}
      <Bx p={[0, 1.1, -0.175 - 0.035]} s={[W + 0.02, 0.15, 0.28]} c={c2} r={0.5} />
      <Bx p={[0, 1.086, -0.06]} s={[W - 0.2, 0.014, 0.05]} m={litMat("#ffb347", 1.5, "#c98a3a")} />
      <Bx p={[-W * 0.1, 1.15, -0.065]} s={[W * 0.6, 0.08, 0.012]} m={litMat("#ffd27a", 1, "#d8b46a")} />
      {[F.jollof, F.dodo, F.pea].map((col, i) => (
        <Bx key={col} p={[-W * 0.1 + (i - 1) * 0.3, 1.17, -0.058]} s={[0.08, 0.05, 0.012]} c={col} r={0.5} />
      ))}
      {/* front row, then the raised back row */}
      <JollofPan p={[xs[0], front[1], front[2]]} w={pw} d={pd} />
      <ChickenPan p={[xs[1], front[1], front[2]]} w={pw} d={pd} />
      <FriedRicePan p={[xs[2], front[1], front[2]]} w={pw} d={pd} />
      <SaladPan p={[xs[0], back[1], back[2]]} w={pw} d={pd - 0.02} />
      <DodoPan p={[xs[1], back[1], back[2]]} w={pw} d={pd - 0.02} />
      <MoiPan p={[xs[2], back[1], back[2]]} w={pw} d={pd - 0.02} />
    </>
  );
}

/* ================================ FOOD COUNTER ================================ */

function FoodCounter({ W, D, c, c2 }: BodyProps) {
  const top = 1.04;
  const hz = -D / 2 + 0.1; // menu strip sits at the back edge
  const swatch = ["#d93220", "#f2b51c", "#4fa23a", "#2f73d6"];
  const step = (W - 0.4) / 4;
  return (
    <>
      <Bx s={[W, 0.08, D]} c={BLACK} />
      <Bx p={[0, 0.08, -0.03]} s={[W - 0.04, 0.9, D - 0.08]} c="#3a3d44" r={0.6} />
      {/* accent front with trim lines */}
      <Bx p={[0, 0.16, D / 2 - 0.04]} s={[W - 0.16, 0.7, 0.03]} c={c} r={0.45} />
      <Bx p={[0, 0.16, D / 2 - 0.022]} s={[W - 0.16, 0.025, 0.012]} c={c2} />
      <Bx p={[0, 0.83, D / 2 - 0.022]} s={[W - 0.16, 0.025, 0.012]} c={c2} />
      <Bx p={[0, 0.98, 0]} s={[W + 0.04, 0.06, D + 0.04]} c="#d9d4c6" r={0.3} />
      {/* two tills, each behind a glass shield */}
      {[-W * 0.3, W * 0.3].map((x) => (
        <group key={x} position={[x, top, 0]}>
          <Bx p={[0, 0, -0.1]} s={[0.34, 0.09, 0.28]} c="#25282e" />
          <Bx p={[0, 0.09, -0.19]} s={[0.28, 0.17, 0.025]} c="#25282e" rot={[-0.3, 0, 0]} />
          <Bx p={[0, 0.1155, -0.172]} s={[0.24, 0.13, 0.01]} m={litMat("#8fe0ff", 1.2, "#2a4a5a")} rot={[-0.3, 0, 0]} />
          <Bx p={[0, 0.09, -0.02]} s={[0.22, 0.015, 0.1]} c="#33363d" />
          <Pane p={[0, 0.02, 0.14]} s={[0.62, 0.34, 0.01]} />
          <Bx p={[0, 0, 0.13]} s={[0.62, 0.02, 0.03]} c={STEEL} r={0.3} />
        </group>
      ))}
      {/* tray stack, bell, napkins */}
      {["#d93220", "#e8b020", "#d93220"].map((col, i) => (
        <Bx key={i} p={[-0.27, top + i * 0.022, 0.02]} s={[0.4, 0.02, 0.3]} c={col} r={0.5} rot={[0, i * 0.12 - 0.1, 0]} />
      ))}
      <Cy p={[0.18, top, 0.2]} r={0.05} h={0.012} c={STEEL_D} seg={14} />
      <Cy p={[0.18, top + 0.012, 0.2]} r={0.045} r2={0.018} h={0.04} c="#d9ac2e" seg={14} rough={0.3} />
      <Sp p={[0.18, top + 0.06, 0.2]} r={0.012} c="#d93220" />
      <Bx p={[0, top, 0.2]} s={[0.13, 0.12, 0.09]} c={STEEL} r={0.3} />
      <Bx p={[0, top + 0.12, 0.2]} s={[0.1, 0.025, 0.06]} c="#fbfaf5" rot={[0, 0, 0.15]} />
      {/* takeaway bags, cups, the "now serving" light */}
      <Bx p={[0.34, top, -0.2]} s={[0.13, 0.2, 0.07]} c="#c8a06a" rot={[0, 0.2, 0]} />
      <Bx p={[0.2, top, -0.22]} s={[0.13, 0.16, 0.07]} c="#d8b47c" rot={[0, -0.15, 0]} />
      <Cy p={[0.02, top, -0.2]} r={0.04} r2={0.045} h={0.13} c="#f6f4ee" seg={12} />
      <Cy p={[0.02, top + 0.04, -0.2]} r={0.0425} r2={0.0445} h={0.03} c="#d93220" seg={12} />
      <Cy p={[-0.12, top, -0.3]} r={0.01} h={0.2} c={STEEL_D} seg={6} />
      <Bx p={[-0.12, top + 0.2, -0.3]} s={[0.18, 0.08, 0.03]} m={litMat("#ff3b2f", 1.4, "#6a1a14")} />
      {/* menu header strip */}
      {[-1, 1].map((s) => <Cy key={s} p={[s * (W / 2 - 0.22), top, hz]} r={0.02} h={0.5} c={STEEL_D} seg={8} />)}
      <Bx p={[0, top + 0.5, hz]} s={[W - 0.3, 0.34, 0.05]} c="#1c1a1b" r={0.6} />
      <Bx p={[0, top + 0.84, hz]} s={[W - 0.3, 0.05, 0.056]} c={c} r={0.5} />
      {swatch.map((col, i) => {
        const x = (i - 1.5) * step;
        return (
          <group key={col} position={[x, top + 0.54, hz + 0.027]}>
            <Bx s={[step - 0.04, 0.26, 0.012]} m={litMat("#fff0c4", 1.15, "#d9cfae")} />
            <Bx p={[-0.1, 0.06, 0.01]} s={[0.13, 0.14, 0.012]} c={col} r={0.5} />
            <Bx p={[0.07, 0.15, 0.01]} s={[0.17, 0.03, 0.012]} c="#4a3a30" r={0.6} />
            <Bx p={[0.07, 0.07, 0.01]} s={[0.12, 0.03, 0.012]} c="#4a3a30" r={0.6} />
          </group>
        );
      })}
    </>
  );
}

/* ================================ PASTRY CASE ================================ */

function PastryCase({ W, D, c, c2 }: BodyProps) {
  const k = (W - 0.2) / 1.4; // goods are laid out for the catalogue width
  const sx = (x: number) => x * k;
  const shelf = [0.46, 0.74, 1.0];
  const [yA, yB, yC] = shelf.map((y) => y + 0.015);
  const donut = ["#f08cb0", "#5a2f1a", "#f6efe0", "#f2c14e", "#f08cb0"];
  return (
    <>
      <Bx s={[W, 0.4, D]} c={c2} r={0.6} />
      <Bx p={[0, 0.1, D / 2 + 0.003]} s={[W - 0.12, 0.14, 0.01]} c={c} r={0.5} />
      <Bx p={[0, 0.4, 0]} s={[W + 0.04, 0.04, D + 0.04]} c="#efe6d2" r={0.3} />
      {/* glass cabinet: back panel, posts, panes and a roof of glass so the shelves show from above */}
      <Bx p={[0, 0.44, -D / 2 + 0.03]} s={[W - 0.06, 0.76, 0.012]} c="#f6f1e4" r={0.5} />
      {[-1, 1].flatMap((sxn) => [-1, 1].map((sz) => <Cy key={`${sxn}${sz}`} p={[sxn * (W / 2 - 0.025), 0.44, sz * (D / 2 - 0.025)]} r={0.013} h={0.76} c={STEEL_D} seg={8} />))}
      <Pane p={[0, 0.44, D / 2 - 0.02]} s={[W - 0.06, 0.76, 0.01]} />
      <Pane p={[-(W / 2 - 0.025), 0.44, 0]} s={[0.01, 0.76, D - 0.06]} />
      <Pane p={[W / 2 - 0.025, 0.44, 0]} s={[0.01, 0.76, D - 0.06]} />
      <Pane p={[0, 1.2, 0]} s={[W - 0.06, 0.01, D - 0.06]} />
      <Bx p={[0, 1.2, D / 2 - 0.025]} s={[W + 0.02, 0.03, 0.03]} c={c} r={0.5} />
      {shelf.map((y) => (
        <Bx key={y} p={[0, y, -0.01]} s={[W - 0.1, 0.015, D - 0.12]} m={litMat("#fff2cf", 0.9, "#e9dfc4")} />
      ))}
      <Bx p={[0, 1.17, 0.18]} s={[W - 0.2, 0.012, 0.05]} m={litMat("#fff6dc", 1.4, "#e8dfc6")} />

      {/* bottom shelf: bread, puff-puff, rolls */}
      {[[-0.52, 0.1, 0], [-0.2, 0.1, 1], [-0.52, -0.12, 1], [-0.2, -0.12, 0]].map(([x, z, alt], i) => (
        <Blob key={i} p={[sx(x), yA + 0.012, z]} rx={0.13} ry={0.06} rz={0.065} c={alt ? F.breadLt : F.bread} />
      ))}
      <Cy p={[sx(0.12), yA, 0]} r={0.09} r2={0.11} h={0.06} c="#f1e4c6" seg={16} />
      {[[0.09, 0.0], [0.15, 0.02], [0.12, -0.04], [0.1, 0.04]].map(([x, z], i) => (
        <Sp key={i} p={[sx(x), yA + 0.075, z]} r={0.037} c={F.puff} />
      ))}
      <Sp p={[sx(0.12), yA + 0.11, 0]} r={0.037} c={F.puff} />
      <Bx p={[sx(0.5), yA, 0]} s={[0.3, 0.012, 0.2]} c={STEEL} r={0.3} />
      {[[0.43, -0.05], [0.43, 0.05], [0.57, -0.05], [0.57, 0.05]].map(([x, z], i) => (
        <Sp key={i} p={[sx(x), yA + 0.052, z]} r={0.048} sc={[1, 0.7, 1]} c="#cf8e47" />
      ))}

      {/* middle shelf: meat pies and sausage rolls */}
      {[-0.6, -0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
        <Blob key={i} p={[sx(x), yB + 0.012, 0.1]} rx={0.065} ry={0.03} rz={0.045} c={i % 2 ? F.pieLt : F.pie} />
      ))}
      {[-0.5, -0.35, -0.2, -0.05].map((x, i) => (
        <Rod key={i} a={[sx(x) - 0.06, yB + 0.028, -0.12]} b={[sx(x) + 0.06, yB + 0.028, -0.12]} r={0.026} c={i % 2 ? "#cf8f43" : "#c07a35"} seg={8} />
      ))}
      {[0.15, 0.35, 0.55].map((x, i) => (
        <Blob key={i} p={[sx(x), yB + 0.012, -0.12]} rx={0.065} ry={0.03} rz={0.045} c={i % 2 ? F.pie : F.pieLt} />
      ))}

      {/* top shelf: doughnuts and small cakes */}
      {donut.map((col, i) => <mesh key={i} position={[sx(-0.62 + i * 0.19), yC, 0.1]} geometry={donutGeo} material={mat(col, 0.5)} castShadow />)}
      {donut.slice(0, 4).map((col, i) => <mesh key={`b${i}`} position={[sx(-0.52 + i * 0.19), yC, -0.12]} geometry={donutGeo} material={mat(donut[(i + 2) % 5] ?? col, 0.5)} castShadow />)}
      {[0.42, 0.62].map((x, i) => (
        <group key={x} position={[sx(x), yC, 0.04]}>
          <Cy r={0.06} h={0.07} c="#f3e0b0" seg={14} />
          <Cy p={[0, 0.07, 0]} r={0.062} h={0.014} c={i ? "#5a2f1a" : "#f08cb0"} seg={14} />
          <Sp p={[0, 0.095, 0]} r={0.014} c="#d93220" />
        </group>
      ))}

      {/* a few boxes on top, at the back */}
      <Bx p={[sx(-0.45), 1.23, -0.08]} s={[0.3, 0.1, 0.22]} c="#f6a8c4" r={0.7} />
      <Bx p={[sx(-0.45), 1.33, -0.08]} s={[0.22, 0.08, 0.18]} c="#c8a06a" r={0.8} rot={[0, 0.3, 0]} />
      <Bx p={[sx(0.45), 1.23, -0.08]} s={[0.28, 0.12, 0.22]} c="#f8f4ea" r={0.7} />
      <Bx p={[sx(0.45), 1.23, -0.08]} s={[0.04, 0.124, 0.224]} c="#d93220" r={0.6} />
    </>
  );
}

/* ================================ BUKA POTS ================================ */

type PotSpec = { body: string; fill: string; lid: string; extra?: "amala" | "meat" | "ponmo" | "pepper" };
const POTS: PotSpec[] = [
  { body: STEEL, fill: "#4d3322", lid: STEEL_L, extra: "amala" },
  { body: "#efece4", fill: "#d9992c", lid: "#e6e2d8" }, // gbegiri in white enamel
  { body: STEEL, fill: "#2f7d2a", lid: STEEL_L }, // ewedu
  { body: "#c8372d", fill: "#b3260f", lid: "#d8493c", extra: "meat" }, // stew
  { body: "#7a4b2c", fill: "#6a3a1d", lid: "#8c5a38", extra: "ponmo" }, // ponmo in a clay pot
  { body: "#2f6fb8", fill: "#d4561f", lid: "#4a85c8", extra: "pepper" }, // pepper soup
];

function BukaPot({ p, r, h, spec }: { p: V3; r: number; h: number; spec: PotSpec }) {
  const R = r * 1.08; // the lid is a touch wider than the pot
  const lean = 0.25;
  const z0 = -(r + 0.045);
  return (
    <group position={p}>
      <Cy r={r * 0.82} r2={r} h={h} c={spec.body} rough={0.4} seg={20} />
      <Cy p={[0, h - 0.035, 0]} r={r * 0.92} h={0.012} c={spec.fill} rough={0.3} seg={20} />
      {/* lid propped against the back of the pot */}
      <mesh position={[0, R * Math.cos(lean), z0 + R * Math.sin(lean)]} rotation-x={Math.PI / 2 + lean} material={mat(spec.lid, 0.35)} castShadow>
        <cylinderGeometry args={[R, R, 0.012, 20]} />
      </mesh>
      {spec.extra === "amala" && <Blob p={[0, h - 0.02, 0]} rx={0.085} ry={0.065} rz={0.085} c={spec.fill} rough={0.4} />}
      {spec.extra === "meat" && [[-0.04, 0.02], [0.045, -0.03]].map(([x, z], i) => <Sp key={i} p={[x, h - 0.02, z]} r={0.024} c="#7a3a1a" />)}
      {spec.extra === "ponmo" && [[-0.045, 0.0], [0.03, 0.04], [0.04, -0.04]].map(([x, z], i) => <Sp key={i} p={[x, h - 0.02, z]} r={0.022} sc={[1.4, 0.8, 1]} c="#c58a52" />)}
      {spec.extra === "pepper" && [[-0.04, 0.03, "#4fa23a"], [0.05, -0.02, "#f2c14e"]].map(([x, z, col], i) => <Sp key={i} p={[x as number, h - 0.026, z as number]} r={0.013} c={col as string} />)}
      {/* a ladle resting in every pot */}
      <group position={[0.0, h - 0.045, 0.03]} rotation={[0.5, 0, -0.35]}>
        <Cy r={0.007} h={0.27} c={METAL} seg={6} />
        <Sp p={[0, 0, 0]} r={0.03} sc={[1, 0.55, 1]} c={METAL} rough={0.35} />
      </group>
    </group>
  );
}

function BukaPots({ W, D, c, c2 }: BodyProps) {
  const T = 0.76; // underside of the table top
  const TOP = 0.812;
  const step = (W - 0.32) / 6;
  const x0 = -step * 3;
  return (
    <>
      {/* wooden table with a tiled top and a shelf of basins below */}
      <Legs w={W - 0.06} d={D - 0.06} h={T} c={DARK} r={0.04} />
      <Bx p={[0, T, 0]} s={[W, 0.05, D]} c={WOOD} />
      <Bx p={[0, T + 0.04, 0]} s={[W - 0.12, 0.012, D - 0.12]} c="#e8dfc9" r={0.25} />
      <Bx p={[0, 0.22, 0]} s={[W - 0.12, 0.025, D - 0.12]} c={DARK} />
      <Cy p={[-W * 0.28, 0.245, 0]} r={0.17} r2={0.2} h={0.12} c="#2f8f83" seg={16} />
      <Cy p={[0, 0.245, 0]} r={0.13} h={0.1} c="#c8372d" seg={14} />
      <Bx p={[W * 0.28, 0.245, 0]} s={[0.18, 0.26, 0.12]} c="#e2b21d" r={0.5} />
      {/* ankara cloth hanging off the front, a plain towel at the end */}
      <Bx p={[-W * 0.18, T - 0.5, D / 2 - 0.012]} s={[W * 0.55, 0.5, 0.018]} m={artMat(c)} />
      <Bx p={[-W * 0.18, T - 0.5, D / 2 - 0.0]} s={[W * 0.55, 0.03, 0.02]} c={c2} />
      <Bx p={[W * 0.4, T - 0.38, D / 2 - 0.012]} s={[0.32, 0.38, 0.016]} m={artMat(c2)} />

      {/* the six pots, then the steaming rice at the end */}
      {POTS.map((spec, i) => <BukaPot key={i} p={[x0 + i * step, TOP, -0.1]} r={0.115} h={0.17} spec={spec} />)}
      <group position={[x0 + 6 * step, TOP, -0.1]}>
        <Cy r={0.115} r2={0.14} h={0.2} c="#cfd4d9" rough={0.35} seg={20} />
        <Blob p={[0, 0.2, 0]} rx={0.125} ry={0.075} rz={0.125} c={F.rice} />
        <mesh position={[0, 0.15 * Math.cos(0.25), -(0.14 + 0.045) + 0.15 * Math.sin(0.25)]} rotation-x={Math.PI / 2 + 0.25} material={mat(STEEL_L, 0.35)} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.012, 20]} />
        </mesh>
        <Rod a={[0.04, 0.2, 0.0]} b={[0.1, 0.34, 0.1]} r={0.008} c={WOOD} />
        <Blob p={[0.04, 0.215, 0.0]} rx={0.04} ry={0.012} rz={0.03} c={WOOD} />
        <Wisps p={[0, 0.3, 0]} color="#ffffff" rise={0.4} r={0.06} spread={0.05} speed={0.22} peak={0.28} />
      </group>

      {/* plates, leaf wraps and a bowl of pepper on the serving side */}
      {[0, 1, 2, 3].map((i) => <Cy key={i} p={[-W * 0.37, TOP + i * 0.015, 0.2]} r={0.105} h={0.014} c={i % 2 ? "#cfe2f3" : "#f7f3e8"} seg={16} />)}
      {[0.1, -0.2, 0.45].map((ry, i) => <Bx key={i} p={[-W * 0.15 + i * 0.01, TOP + i * 0.03, 0.22]} s={[0.22, 0.03, 0.16]} c="#4f9a3a" r={0.8} rot={[0, ry, 0]} />)}
      <Cy p={[W * 0.12, TOP, 0.22]} r={0.09} r2={0.11} h={0.06} c="#efece4" seg={14} />
      <Blob p={[W * 0.12, TOP + 0.06, 0.22]} rx={0.085} ry={0.03} rz={0.085} c="#c2310f" />
    </>
  );
}

/* ================================== GRILL STAND ================================== */

const GRILL = { x: -0.14, z: -0.1, top: 0.82 };
const MEAT = ["#8d3b1c", "#a8501f", "#c46a2a", "#d98a3a"];
/* seven skewers across the coals, three chunks of suya on each */
const GRILL_STICKS: Slot[] = Array.from({ length: 7 }, (_, i) => ({ x: GRILL.x + (i - 3) * 0.12, y: GRILL.top + 0.05, z: GRILL.z, col: "#dcb878" }));
const GRILL_CHUNKS: Slot[] = GRILL_STICKS.flatMap((s, i) => [-0.09, 0, 0.09].map((dz, j) => ({ x: s.x, y: s.y, z: s.z + dz, col: MEAT[(i + j * 2) % MEAT.length] })));

function GrillStand({ W, D }: BodyProps) {
  const { x, z, top } = GRILL;
  return (
    <>
      {/* wooden stand with a shelf of charcoal and rice sacks */}
      <Legs w={W - 0.04} d={D - 0.04} h={0.64} c={DARK} r={0.03} />
      <Bx p={[0, 0.64, 0]} s={[W, 0.04, D]} c={WOOD} />
      <Bx p={[0, 0.2, 0]} s={[W - 0.1, 0.02, D - 0.1]} c={DARK} />
      <Blob p={[-0.4, 0.39, 0]} rx={0.17} ry={0.17} rz={0.12} c="#3b3733" />
      <Blob p={[0.1, 0.37, 0.02]} rx={0.2} ry={0.15} rz={0.12} c="#d8c9a0" />

      {/* the long charcoal trough with a windbreak behind it */}
      <Bx p={[x, 0.68, z]} s={[0.96, 0.14, 0.32]} c="#2b2e33" r={0.5} />
      <Bx p={[x, top, z - 0.16]} s={[0.96, 0.22, 0.02]} c="#6b7076" r={0.4} />
      <EmberBed p={[x, 0.8, z]} s={[0.88, 0.04, 0.24]} />
      <Inst geo={stickGeo} slots={GRILL_STICKS} rough={0.7} />
      <Inst geo={chunkGeo} slots={GRILL_CHUNKS} rough={0.6} />
      <Wisps p={[x, top + 0.1, z]} n={3} color="#cdcdcd" rise={0.55} r={0.07} spread={0.28} speed={0.2} peak={0.22} />

      {/* wrapped newspaper stack */}
      {[0.1, -0.15, 0.2].map((ry, i) => <Bx key={i} p={[0.52, 0.68 + i * 0.02, -0.12]} s={[0.24, 0.02, 0.17]} c="#e7e0cc" r={0.9} rot={[0, ry, 0]} />)}
      <Bx p={[0.52, 0.74, -0.12]} s={[0.1, 0.004, 0.025]} c="#2b2b2b" rot={[0, 0.2, 0]} />
      <Bx p={[0.52, 0.74, -0.08]} s={[0.16, 0.004, 0.012]} c="#7a7a74" rot={[0, 0.2, 0]} />
      <Bx p={[0.52, 0.74, -0.16]} s={[0.16, 0.004, 0.012]} c="#7a7a74" rot={[0, 0.2, 0]} />

      {/* yaji spice tray */}
      <Bx p={[0.5, 0.68, 0.18]} s={[0.3, 0.03, 0.2]} c="#7a5a3a" />
      <Blob p={[0.45, 0.71, 0.18]} rx={0.1} ry={0.035} rz={0.07} c="#dc6a1c" rough={0.9} />
      <Blob p={[0.58, 0.71, 0.2]} rx={0.055} ry={0.03} rz={0.05} c="#a62b14" rough={0.9} />

      {/* tomatoes and onions */}
      <Cy p={[-0.52, 0.68, 0.2]} r={0.12} r2={0.15} h={0.06} c={STEEL} seg={16} rough={0.3} />
      {[[-0.04, -0.02], [0.04, 0.01], [0.0, 0.05]].map(([dx, dz], i) => <Sp key={i} p={[-0.52 + dx, 0.77, 0.2 + dz]} r={0.036} c={F.tomato} />)}
      {[[0.0, -0.05], [-0.05, 0.04]].map(([dx, dz], i) => <Sp key={i} p={[-0.52 + dx, 0.77, 0.2 + dz]} r={0.034} c="#b5558c" />)}

      {/* raw meat waiting on a steel tray, and the paper fan */}
      <Bx p={[-0.14, 0.68, 0.21]} s={[0.26, 0.025, 0.18]} c={STEEL} r={0.3} />
      {[[-0.07, -0.03, "#c1432f"], [0.0, 0.03, "#a8281a"], [0.06, -0.02, "#c1432f"], [-0.01, -0.05, "#d95a3a"]].map(([dx, dz, col], i) => (
        <Blob key={i} p={[-0.14 + (dx as number), 0.717, 0.21 + (dz as number)]} rx={0.045} ry={0.02} rz={0.035} c={col as string} />
      ))}
      <group position={[0.16, 0.7, 0.14]} rotation={[0, -Math.PI / 2 + 0.3, 0.05]}>
        <Cy r={0.085} h={0.008} c="#e6c46a" seg={16} />
        <Rod a={[0.08, 0.004, 0]} b={[0.19, 0.004, 0]} r={0.008} c="#8a5a3c" />
      </group>
    </>
  );
}

/* ================================== DRINK FRIDGE ================================== */

const POP = [
  { body: "#b3261c", cap: "#e53935" }, // cola
  { body: "#ff8f1f", cap: "#ff8f1f" }, // orange soda
  { body: "#4fc25c", cap: "#2e8b3a" }, // lemon-lime
  { body: "#8dd0f4", cap: "#ffffff" }, // water
  { body: "#e63e5e", cap: "#c2183a" }, // Chapman
  { body: "#f6d23a", cap: "#e0a800" }, // pineapple
  { body: "#8b1c47", cap: "#5e0f2e" }, // zobo
  { body: "#5f3b1f", cap: "#d4a72c" }, // malt
];
const TINS = ["#d93a2f", "#c9ced4", "#2f73d6", "#43a64f", "#f28c1c", "#2b2d31", "#f4c20d"];
const SHELF_TOP = [0.2, 0.6, 1.0, 1.4];

function fridgeSlots(W: number, D: number, seed: number) {
  const bottles: Slot[] = [];
  const caps: Slot[] = [];
  const cans: Slot[] = [];
  const n = Math.max(5, Math.floor((W - 0.2) / 0.1) + 1);
  const step = (W - 0.2) / (n - 1);
  const zf = D / 2 - 0.2;
  const zb = -D / 2 + 0.22;
  SHELF_TOP.forEach((y, k) => {
    for (let i = 0; i < n; i++) {
      const x = (i - (n - 1) / 2) * step;
      const g = Math.floor(i / 2) + k * 3 + seed;
      // alternate which row is bottles and which is cans so every shelf looks different
      const frontIsBottle = k % 2 === 0;
      const bz = frontIsBottle ? zf : zb;
      const cz = frontIsBottle ? zb : zf;
      const pop = POP[g % POP.length];
      bottles.push({ x, y, z: bz, col: pop.body });
      caps.push({ x, y, z: bz, col: pop.cap });
      cans.push({ x, y, z: cz, col: TINS[(g + i) % TINS.length] });
    }
  });
  return { bottles, caps, cans };
}

function DrinkFridge({ item, W, D, H }: BodyProps) {
  const seed = Math.abs(Math.round(item.x * 3 + item.z * 5));
  const hdr = ["#e53935", "#1e88e5", "#43a047", "#fb8c00"][seed % 4];
  const { bottles, caps, cans } = useMemo(() => fridgeSlots(W, D, seed), [W, D, seed]);
  const hh = H - 0.2; // header sits on top of the cabinet
  return (
    <>
      <Bx s={[W, 0.14, D]} c={BLACK} />
      {[-1, 1].map((s) => <Bx key={s} p={[s * (W / 2 - 0.025), 0.14, 0]} s={[0.05, hh - 0.14, D]} c="#2f333a" r={0.5} />)}
      <Bx p={[0, hh - 0.04, 0]} s={[W, 0.04, D]} c="#2f333a" r={0.5} />
      <Bx p={[0, 0.14, -D / 2 + 0.04]} s={[W - 0.1, hh - 0.18, 0.02]} m={litMat("#dff3ff", 1, "#cfd8dc")} />
      {/* glass door with a steel frame, handle and lit edges */}
      <Pane p={[0, 0.14, D / 2 - 0.02]} s={[W - 0.1, hh - 0.18, 0.012]} />
      {[-1, 1].map((s) => <Bx key={s} p={[s * (W / 2 - 0.06), 0.14, D / 2 - 0.02]} s={[0.035, hh - 0.18, 0.03]} c={STEEL} r={0.3} />)}
      <Cy p={[W / 2 - 0.1, 0.55, D / 2 + 0.015]} r={0.014} h={0.7} c={STEEL_L} seg={8} rough={0.3} />
      {[-1, 1].map((s) => <Bx key={s} p={[s * (W / 2 - 0.085), 0.16, D / 2 - 0.06]} s={[0.018, hh - 0.22, 0.015]} m={litMat("#e9f7ff", 1.3, "#c8d4da")} />)}
      {SHELF_TOP.map((y) => <Bx key={y} p={[0, y - 0.012, -0.02]} s={[W - 0.1, 0.012, D - 0.14]} c={STEEL_L} r={0.3} />)}
      <Inst geo={bottleGeo} slots={bottles} rough={0.3} />
      <Inst geo={capGeo} slots={caps} rough={0.4} />
      <Inst geo={canGeo} slots={cans} rough={0.3} />
      {/* brand-less lit header */}
      <Bx p={[0, hh, 0]} s={[W, 0.2, D]} c="#2f333a" r={0.5} />
      <Bx p={[0, hh + 0.025, D / 2 + 0.004]} s={[W - 0.08, 0.15, 0.012]} m={litMat(hdr, 1.1, hdr)} />
      <Bx p={[0, hh + 0.08, D / 2 + 0.012]} s={[W - 0.2, 0.03, 0.012]} c="#ffffff" r={0.5} rot={[0, 0, 0.06]} />
    </>
  );
}

/* ================================== PREP COUNTER ================================== */

function PrepCounter({ W, D }: BodyProps) {
  const top = 0.92;
  const k = (W - 0.2) / 1.8;
  const sx = (x: number) => x * k;
  return (
    <>
      <Bx s={[W - 0.06, 0.08, D - 0.06]} c={BLACK} />
      <Bx p={[0, 0.08, 0]} s={[W, 0.8, D]} c={STEEL} r={0.35} />
      <Bx p={[0, 0.88, 0]} s={[W + 0.03, 0.04, D + 0.03]} c={STEEL_L} r={0.25} />
      {[-1, 0, 1].map((i) => (
        <group key={i} position={[i * (W / 3), 0, D / 2 + 0.005]}>
          <Bx p={[0, 0.14, 0]} s={[W / 3 - 0.08, 0.66, 0.012]} c={STEEL_D} r={0.4} />
          <Bx p={[0.0, 0.68, 0.014]} s={[0.12, 0.02, 0.02]} c={BLACK} />
        </group>
      ))}

      {/* fryer with a basket of chips */}
      <group position={[sx(-0.68), top, -0.05]}>
        <Bx s={[0.5, 0.17, 0.42]} c={STEEL_D} r={0.35} />
        <Bx p={[0, 0.17, 0]} s={[0.42, 0.012, 0.34]} c="#d9962b" r={0.3} />
        <Bx p={[0, 0.19, 0]} s={[0.32, 0.06, 0.24]} c="#2d3036" r={0.5} />
        {[0, 1, 2, 3, 4].map((i) => (
          <Bx key={i} p={[(i - 2) * 0.05, 0.24, ((i * 3) % 5 - 2) * 0.03]} s={[0.012, 0.012, 0.1]} c={F.fries} rot={[0, (i - 2) * 0.3, 0]} />
        ))}
        <Rod a={[0, 0.22, 0.12]} b={[0, 0.25, 0.4]} r={0.013} c={BLACK} />
      </group>

      {/* flat grill with patties and onions */}
      <group position={[sx(-0.05), top, -0.05]}>
        <Bx s={[0.62, 0.03, 0.46]} c="#2b2e33" r={0.3} />
        <Bx p={[0, 0.03, -0.22]} s={[0.62, 0.07, 0.02]} c={STEEL} r={0.3} />
        {[-0.18, 0, 0.18].map((x, i) => <Cy key={i} p={[x, 0.03, 0.04 + (i % 2) * 0.08]} r={0.052} h={0.016} c="#6a3a1d" seg={14} />)}
        <Blob p={[0.05, 0.045, -0.12]} rx={0.07} ry={0.025} rz={0.05} c="#e7d6a0" />
        <Rod a={[0.2, 0.04, 0.14]} b={[0.27, 0.1, 0.28]} r={0.009} c={BLACK} />
        <Bx p={[0.19, 0.03, 0.08]} s={[0.1, 0.01, 0.08]} c={STEEL_L} r={0.3} />
      </group>

      {/* stack of pans and a chopping board */}
      <group position={[sx(0.42), top, -0.02]}>
        <Bx s={[0.34, 0.045, 0.26]} c={STEEL_L} r={0.3} />
        <Bx p={[0, 0.045, 0]} s={[0.32, 0.045, 0.24]} c={STEEL} r={0.3} />
        <Bx p={[0, 0.09, 0]} s={[0.3, 0.045, 0.22]} c={STEEL_L} r={0.3} />
        <Bx p={[0, 0.13, 0]} s={[0.24, 0.012, 0.16]} c={F.tomato} r={0.5} />
      </group>
      <group position={[sx(0.8), top, -0.02]}>
        <Bx s={[0.34, 0.03, 0.24]} c="#d6b074" r={0.8} />
        {[-0.08, 0.0, 0.08].map((x, i) => <Sp key={i} p={[x, 0.04, -0.04]} r={0.03} sc={[1, 0.45, 1]} c={F.tomato} />)}
        {[-0.04, 0.06].map((x, i) => <Sp key={i} p={[x, 0.042, 0.05]} r={0.026} sc={[1, 0.6, 1]} c={F.pea} />)}
        <Bx p={[-0.02, 0.03, 0.09]} s={[0.2, 0.006, 0.035]} c={STEEL_L} r={0.2} rot={[0, 0.25, 0]} />
        <Bx p={[-0.15, 0.03, 0.115]} s={[0.09, 0.02, 0.03]} c={BLACK} rot={[0, 0.25, 0]} />
      </group>

      {/* heat lamp strip over the pass */}
      {[-1, 1].map((s) => <Cy key={s} p={[s * (W / 2 - 0.12), top, 0.16]} r={0.015} h={0.5} c={STEEL_D} seg={8} />)}
      <Bx p={[0, top + 0.5, 0.16]} s={[W - 0.3, 0.05, 0.1]} c={STEEL_D} r={0.35} />
      <Bx p={[0, top + 0.485, 0.16]} s={[W - 0.4, 0.015, 0.07]} m={litMat("#ff8a3a", 1.6, "#b8602c")} />

      {/* extractor hood with a lit underside and a duct to the roof */}
      <Bx p={[0, 1.68, -0.15]} s={[W - 0.1, 0.16, 0.5]} c={STEEL} r={0.3} />
      <Bx p={[0, 1.84, -0.15]} s={[W - 0.5, 0.2, 0.3]} c={STEEL_L} r={0.3} />
      <Bx p={[0, 2.04, -0.15]} s={[0.32, 0.66, 0.32]} c={STEEL_D} r={0.35} />
      <Bx p={[0, 1.664, -0.15]} s={[W - 0.4, 0.012, 0.36]} m={litMat("#fff2cc", 1.3, "#cfc7ad")} />
    </>
  );
}

/* ====================================== TRAY ====================================== */

/** a burger, chips and a drink */
function BurgerTray({ y0 }: { y0: number }) {
  const x = -0.13;
  return (
    <>
      <Cy p={[x, y0, 0]} r={0.062} h={0.026} c={F.bun} seg={14} />
      <Cy p={[x, y0 + 0.026, 0]} r={0.066} h={0.026} c={F.patty} seg={14} />
      <Bx p={[x, y0 + 0.052, 0]} s={[0.11, 0.006, 0.11]} c={F.cheese} rot={[0, Math.PI / 4, 0]} />
      <Cy p={[x, y0 + 0.058, 0]} r={0.07} r2={0.074} h={0.01} c={F.lettuce} seg={14} />
      <Cy p={[x, y0 + 0.068, 0]} r={0.058} h={0.01} c={F.tomato} seg={14} />
      <Blob p={[x, y0 + 0.078, 0]} rx={0.065} ry={0.045} rz={0.065} c={F.bun} />
      {[[-0.025, 0.0], [0.02, 0.02], [0.0, -0.025]].map(([dx, dz], i) => <Sp key={i} p={[x + dx, y0 + 0.117, dz]} r={0.006} c="#fbf3d2" />)}
      {/* chips in a red carton */}
      <Bx p={[0.07, y0, -0.06]} s={[0.08, 0.09, 0.045]} c="#d93220" r={0.6} />
      <Bx p={[0.07, y0 + 0.03, -0.06]} s={[0.082, 0.02, 0.047]} c={F.cheese} r={0.6} />
      {[0, 1, 2, 3, 4].map((i) => <Bx key={i} p={[0.07 + (i - 2) * 0.014, y0 + 0.08, -0.06 + (i % 2) * 0.004]} s={[0.011, 0.05, 0.011]} c={F.fries} rot={[0, 0, (i - 2) * 0.12]} />)}
      <Cup p={[0.19, y0, 0.07]} />
    </>
  );
}

/** jollof with chicken and dodo, a fork and spoon, a bottle */
function RiceTray({ y0 }: { y0: number }) {
  return (
    <>
      <Cy p={[-0.08, y0, 0]} r={0.12} r2={0.125} h={0.014} c={F.plate} seg={18} rough={0.3} />
      <Blob p={[-0.1, y0 + 0.014, 0]} rx={0.075} ry={0.03} rz={0.06} c={F.jollof} />
      <Piece p={[-0.04, y0 + 0.04, 0.045]} ry={0.4} s={0.8} />
      {[[-0.15, 0.07], [-0.12, 0.09], [-0.17, 0.045]].map(([x, z], i) => (
        <Blob key={i} p={[x, y0 + 0.024, z]} rx={0.035} ry={0.012} rz={0.022} c={i % 2 ? F.dodoDk : F.dodo} />
      ))}
      <Blob p={[-0.06, y0 + 0.024, -0.07]} rx={0.03} ry={0.018} rz={0.03} c={F.lettuce} />
      <Sp p={[-0.06, y0 + 0.04, -0.07]} r={0.014} c={F.tomato} sc={[1, 0.5, 1]} />
      <Rod a={[0.09, y0 + 0.005, -0.08]} b={[0.09, y0 + 0.005, 0.08]} r={0.005} c={STEEL} seg={5} />
      <Rod a={[0.12, y0 + 0.005, -0.06]} b={[0.12, y0 + 0.005, 0.08]} r={0.005} c={STEEL} seg={5} />
      <Blob p={[0.12, y0 + 0.007, 0.09]} rx={0.016} ry={0.006} rz={0.022} c={STEEL} rough={0.3} />
      <Bottle p={[0.2, y0, -0.06]} body="#b3261c" cap="#e53935" />
    </>
  );
}

/** fried chicken without the bucket: pieces on paper, chips, coleslaw, a drink */
function ChickenTray({ y0 }: { y0: number }) {
  return (
    <>
      <Bx p={[-0.1, y0, 0]} s={[0.28, 0.004, 0.22]} c="#fbf8ee" r={0.9} rot={[0, 0.05, 0]} />
      <Piece p={[-0.17, y0 + 0.04, -0.04]} ry={0.3} s={0.85} />
      <Piece p={[-0.08, y0 + 0.04, 0.05]} ry={Math.PI + 0.4} s={0.85} lt />
      <Piece p={[-0.15, y0 + 0.04, 0.07]} ry={-0.4} s={0.85} lt />
      <Piece p={[-0.12, y0 + 0.075, 0]} ry={0.9} s={0.85} />
      <Bx p={[0.07, y0, -0.07]} s={[0.08, 0.05, 0.045]} c="#d93220" r={0.6} />
      {[0, 1, 2, 3].map((i) => <Bx key={i} p={[0.07 + (i - 1.5) * 0.016, y0 + 0.045, -0.07]} s={[0.011, 0.06, 0.011]} c={F.fries} rot={[0, 0, (i - 1.5) * 0.14]} />)}
      <Cy p={[0.1, y0, 0.08]} r={0.03} r2={0.036} h={0.04} c="#f6f4ee" seg={12} />
      <Blob p={[0.1, y0 + 0.04, 0.08]} rx={0.032} ry={0.016} rz={0.032} c="#dce8c0" />
      <Sp p={[0.105, y0 + 0.052, 0.085]} r={0.01} c={F.carrot} />
      <Cup p={[0.2, y0, -0.02]} band="#f08a1c" />
    </>
  );
}

/** a meat pie in its paper with a Fanta */
function PieTray({ y0 }: { y0: number }) {
  return (
    <>
      <Bx p={[-0.1, y0, 0]} s={[0.17, 0.005, 0.12]} c="#f7f3e6" r={0.9} rot={[0, 0.25, 0]} />
      <group position={[-0.1, y0 + 0.012, 0]} rotation-y={0.25}>
        <Blob p={[0, 0, 0]} rx={0.085} ry={0.034} rz={0.052} c={F.pie} />
        <Blob p={[0, 0.014, 0]} rx={0.05} ry={0.015} rz={0.03} c={F.pieLt} />
        <Sp p={[0.045, 0.01, 0.04]} r={0.014} c="#6b3a1e" sc={[1.4, 0.8, 1]} />
      </group>
      <Bx p={[0.0, y0, 0.08]} s={[0.1, 0.003, 0.1]} c="#fdfdfb" r={0.9} rot={[0, 0.5, 0]} />
      <Bottle p={[0.17, y0, -0.04]} body="#ff8f1f" cap="#ff8f1f" />
    </>
  );
}

function Tray({ item, W, D }: BodyProps) {
  const v = item.variant ?? "rice";
  const col = item.c ?? (v === "pie" ? "#a8794a" : v === "rice" ? "#35424f" : "#cf3a2c");
  const y0 = 0.022;
  return (
    <group position={[0, item.y ?? 0.75, 0]}>
      <Bx s={[W, 0.018, D]} c={col} r={0.5} />
      <Bx p={[0, 0.018, 0]} s={[W - 0.05, 0.004, D - 0.05]} c="#f3ead2" r={0.9} />
      {v === "burger" ? <BurgerTray y0={y0} /> : v === "chicken" ? <ChickenTray y0={y0} /> : v === "pie" ? <PieTray y0={y0} /> : <RiceTray y0={y0} />}
    </group>
  );
}

/* ==================================== BOOTH SEAT ==================================== */

function BoothSeat({ W, D, c, c2 }: BodyProps) {
  const n = Math.max(3, Math.round(W / 0.3));
  const zb = -D / 2 + 0.1; // the padded back
  return (
    <>
      <Bx s={[W, 0.28, D]} c={DARK} />
      {/* seat cushion with piped edges */}
      <Bx p={[0, 0.28, 0.09]} s={[W - 0.08, 0.17, D - 0.22]} c={c} r={0.55} />
      <Bx p={[0, 0.28, D / 2 - 0.03]} s={[W - 0.08, 0.012, 0.012]} c={c2} r={0.4} />
      <Bx p={[0, 0.438, D / 2 - 0.03]} s={[W - 0.08, 0.012, 0.012]} c={c2} r={0.4} />
      {/* high padded back, channel-stitched, with a rolled top */}
      <Bx p={[0, 0.45, zb]} s={[W - 0.04, 0.52, 0.16]} c={c} r={0.55} />
      {Array.from({ length: n }).map((_, i) => (
        <Bx key={i} p={[-W / 2 + (i + 0.5) * (W / n), 0.5, zb + 0.082]} s={[0.012, 0.42, 0.012]} c={c2} r={0.4} />
      ))}
      <Bx p={[0, 0.62, zb + 0.082]} s={[W - 0.08, 0.012, 0.012]} c={c2} r={0.4} />
      <Bx p={[0, 0.82, zb + 0.082]} s={[W - 0.08, 0.012, 0.012]} c={c2} r={0.4} />
      <Rod a={[-W / 2 + 0.03, 0.97, zb]} b={[W / 2 - 0.03, 0.97, zb]} r={0.085} c={c} seg={12} />
      {/* wooden ends that make it a booth */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <Bx p={[s * (W / 2 - 0.035), 0.0, 0]} s={[0.07, 0.86, D]} c={DARK} />
          <Bx p={[s * (W / 2 - 0.035), 0.86, 0]} s={[0.09, 0.03, D + 0.02]} c={c2} r={0.5} />
        </group>
      ))}
    </>
  );
}

/* ==================================== MENU LIGHT ==================================== */

/* pictograms are drawn flat: the parent group squashes z, so each shape reads as a bold silhouette */
function Burger() {
  return (
    <>
      <Bx s={[0.17, 0.028, 0.22]} c={F.bun} r={0.6} />
      <Bx p={[0, 0.028, 0]} s={[0.18, 0.03, 0.22]} c={F.patty} r={0.6} />
      <Bx p={[0, 0.058, 0]} s={[0.19, 0.014, 0.22]} c={F.cheese} r={0.6} />
      <Bx p={[0, 0.072, 0]} s={[0.2, 0.022, 0.22]} c={F.lettuce} r={0.6} />
      <Bx p={[0, 0.094, 0]} s={[0.17, 0.014, 0.24]} c={F.tomato} r={0.6} />
      <Sp p={[0, 0.108, 0]} r={0.5} sc={[0.18, 0.1, 0.18]} c={F.bun} />
      {[[-0.04, 0.14], [0.02, 0.15], [0.05, 0.13]].map(([x, y], i) => <Sp key={i} p={[x, y, 0.1]} r={0.008} c="#fbf3d2" />)}
    </>
  );
}

function Drumstick() {
  return (
    <group rotation-z={-0.7}>
      <Sp p={[0, 0.1, 0]} r={0.5} sc={[0.12, 0.15, 0.18]} c="#c0702a" />
      <Bx p={[0, -0.06, 0]} s={[0.025, 0.09, 0.2]} c={F.bone} r={0.6} />
      {[-0.014, 0.014].map((x) => <Sp key={x} p={[x, -0.065, 0]} r={0.5} sc={[0.034, 0.034, 0.2]} c={F.bone} />)}
    </group>
  );
}

function RiceBowl() {
  return (
    <>
      <Cy r={0.055} r2={0.095} h={0.075} c="#2f73d6" seg={20} />
      <Sp p={[0, 0.075, 0]} r={0.5} sc={[0.17, 0.1, 0.16]} c={F.jollof} />
      {[-0.04, 0, 0.04].map((x, i) => <Sp key={x} p={[x, 0.1 + (i === 1 ? 0.015 : 0), 0.1]} r={0.5} sc={[0.05, 0.03, 0.2]} c={F.dodo} />)}
    </>
  );
}

function Drink() {
  return (
    <>
      <Cy r={0.04} r2={0.055} h={0.13} c="#d93220" seg={14} />
      <Cy p={[0, 0.05, 0]} r={0.047} r2={0.05} h={0.035} c="#ffffff" seg={14} />
      <Cy p={[0, 0.13, 0]} r={0.058} h={0.014} c="#f2f2ee" seg={14} />
      <Bx p={[0.012, 0.14, 0]} s={[0.014, 0.09, 0.2]} c="#ffffff" rot={[0, 0, -0.2]} />
    </>
  );
}

function Fries() {
  return (
    <>
      <Bx s={[0.1, 0.08, 0.22]} c="#d93220" r={0.6} />
      <Bx p={[0, 0.02, 0]} s={[0.102, 0.02, 0.222]} c={F.cheese} r={0.6} />
      {[0, 1, 2, 3, 4].map((i) => <Bx key={i} p={[(i - 2) * 0.02, 0.08, 0]} s={[0.016, 0.085, 0.2]} c={F.fries} rot={[0, 0, (i - 2) * 0.15]} />)}
    </>
  );
}

function ChapmanBottle() {
  return (
    <>
      <Cy r={0.035} h={0.12} c="#e63e5e" seg={12} />
      <Cy p={[0, 0.12, 0]} r={0.016} h={0.05} c="#e63e5e" seg={10} />
      <Sp p={[0, 0.175, 0]} r={0.5} sc={[0.036, 0.016, 0.1]} c="#f6d23a" />
    </>
  );
}

function MenuLight({ item, W, H, c }: BodyProps) {
  const pw = (W - 0.18) / 3;
  const pics: [ComponentType, ComponentType][] = [[Burger, Drumstick], [RiceBowl, ChapmanBottle], [Drink, Fries]];
  return (
    <group position={[0, item.y ?? 1.5, 0]}>
      <Bx s={[W, H, 0.07]} c="#1b1a1c" r={0.6} />
      <Bx p={[0, H - 0.17, 0.037]} s={[W - 0.12, 0.12, 0.012]} c={c} r={0.5} />
      {pics.map(([A, B], i) => (
        <group key={i} position={[(i - 1) * pw, 0, 0.037]}>
          <Bx p={[0, 0.07, 0]} s={[pw - 0.04, 0.58, 0.012]} m={litMat("#fff1c9", 1.15, "#e0d5b4")} />
          <group position={[-0.12, 0.34, 0.012]} scale={[1, 1, 0.15]}>
            <A />
          </group>
          <group position={[0.12, 0.34, 0.012]} scale={[1, 1, 0.15]}>
            <B />
          </group>
          <Bx p={[-0.08, 0.2, 0.008]} s={[0.22, 0.022, 0.012]} c="#4a3a30" r={0.6} />
          <Bx p={[0.14, 0.2, 0.008]} s={[0.1, 0.022, 0.012]} c="#d93220" r={0.6} />
          <Bx p={[-0.06, 0.12, 0.008]} s={[0.18, 0.022, 0.012]} c="#4a3a30" r={0.6} />
          <Bx p={[0.14, 0.12, 0.008]} s={[0.1, 0.022, 0.012]} c="#d93220" r={0.6} />
        </group>
      ))}
    </group>
  );
}

export const FOOD_BODIES: Partial<Record<FurnKind, BodyRenderer>> = {
  hotcase: HotCase,
  foodcounter: FoodCounter,
  pastrycase: PastryCase,
  bukapots: BukaPots,
  grillstand: GrillStand,
  drinkfridge: DrinkFridge,
  prepcounter: PrepCounter,
  tray: Tray,
  boothseat: BoothSeat,
  menulight: MenuLight,
};
