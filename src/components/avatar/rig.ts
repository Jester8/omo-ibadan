import * as THREE from "three";
import type { Look } from "@/lib/look";

/**
 * Avatar rig: takes a cloned Quaternius character (CC0) and dresses it from a Look.
 *  - recolours skin, hair and clothes by material name
 *  - hides the baked-in hair/hats when a different style is chosen
 *  - builds Nigerian outfits (senator kaftan, buba, babariga, isi agu, agbada, Ankara iro & buba,
 *    Ankara gown, aso-oke with ipele, Super Eagles jersey), headwear (gele, turban, hijab, fila,
 *    Hausa cap, Igbo red cap) and hairstyles, and attaches them to the skeleton
 * Coordinates are metres in the model's rest pose (a person is ~1.8 m tall, facing +z).
 */

export type BaseId =
  | "m-casual"
  | "m-hoodie"
  | "m-business"
  | "m-worker"
  | "m-farmer"
  | "m-beach"
  | "f-casual-b"
  | "f-casual-a"
  | "f-suit"
  | "f-worker";

export const BASE_URL: Record<BaseId, string> = {
  "m-casual": "/models/avatars/m-casual.glb",
  "m-hoodie": "/models/avatars/m-hoodie.glb",
  "m-business": "/models/avatars/m-business.glb",
  "m-worker": "/models/avatars/m-worker.glb",
  "m-farmer": "/models/avatars/m-farmer.glb",
  "m-beach": "/models/avatars/m-beach.glb",
  "f-casual-b": "/models/avatars/f-casual-b.glb",
  "f-casual-a": "/models/avatars/f-casual-a.glb",
  "f-suit": "/models/avatars/f-suit.glb",
  "f-worker": "/models/avatars/f-worker.glb",
};

/** Animation clips live in one model per body type (their skeletons differ slightly). */
export const ANIM_URL = { m: BASE_URL["m-casual"], f: BASE_URL["f-casual-b"] };

export function baseFor(look: Look): BaseId {
  const f = look.frame === "f";
  switch (look.top) {
    case "hoodie":
      return f ? "f-casual-b" : "m-hoodie";
    case "suit":
      return f ? "f-suit" : "m-business";
    case "dress":
      return f ? "f-casual-a" : "m-casual";
    case "worker":
      return f ? "f-worker" : "m-worker";
    case "overalls":
      return f ? "f-casual-b" : "m-farmer";
    case "singlet":
      return f ? "f-casual-b" : "m-beach";
    default:
      return f ? "f-casual-b" : "m-casual";
  }
}

/** Which named materials on each part are clothing / hair we may recolour or hide. */
type Roles = {
  /** body materials that take the top colour */
  body: string[];
  /** body materials that take the bottom colour (e.g. dungaree bib) */
  bodyBottom?: string[];
  legs: string[];
  feet: string[];
  hair: string[];
  brows: string[];
  /** head primitives to always hide (hard hats etc.) */
  hide?: string[];
  /** does the model have usable baked-in hair? */
  baked: boolean;
};

const ROLES: Record<BaseId, Roles> = {
  "m-casual": { body: ["LightBrown"], legs: ["LightBlue"], feet: ["Red_Dark"], hair: ["Hair"], brows: ["Eyebrows"], baked: true },
  "m-hoodie": { body: ["Purple"], legs: ["LightBlue"], feet: ["Purple"], hair: ["Hair"], brows: ["Eyebrows"], baked: true },
  "m-business": { body: ["Suit"], legs: ["Suit"], feet: ["Black"], hair: ["Hair"], brows: ["Eyebrows"], baked: true },
  "m-worker": { body: ["Worker_Vest"], legs: ["Brown", "Brown2"], feet: ["Black", "Grey"], hair: [], brows: ["Eyebrows", "Moustache"], hide: ["Worker_Yellow"], baked: false },
  "m-farmer": { body: ["Brown"], bodyBottom: ["LightBlue"], legs: ["LightBlue"], feet: ["Brown", "Brown2"], hair: [], brows: ["Eyebrows"], hide: ["Beige"], baked: false },
  "m-beach": { body: ["LightBrown"], legs: ["Red_Dark"], feet: ["Red_Dark"], hair: ["Hair"], brows: ["Eyebrows"], baked: true },
  "f-casual-b": { body: ["White"], legs: ["Orange"], feet: ["Grey"], hair: ["Hair_Blond"], brows: ["Hair_Brown"], baked: true },
  "f-casual-a": { body: ["LimeGreen"], legs: ["LimeGreen"], feet: ["Red"], hair: ["Red"], brows: [], baked: true },
  "f-suit": { body: ["Black"], legs: ["Black"], feet: ["Black"], hair: ["Hair_Blond"], brows: ["Hair_Brown"], baked: true },
  "f-worker": { body: ["Worker_Vest"], legs: ["Brown_02", "Brown2"], feet: ["Black"], hair: ["DarkBrown"], brows: [], hide: ["Worker_Yellow"], baked: true },
};

const V = THREE.Vector3;

/* ------------------------------ small helpers ------------------------------ */

function smoothProfile(pts: [number, number][], samples = 32): THREE.Vector2[] {
  return new THREE.SplineCurve(pts.map(([r, y]) => new THREE.Vector2(r, y)))
    .getPoints(samples)
    .map((p) => new THREE.Vector2(Math.max(0.001, p.x), p.y));
}

const textureCache = new Map<string, THREE.CanvasTexture>();

function canvasTexture(key: string, draw: (g: CanvasRenderingContext2D, size: number) => void, size = 256): THREE.CanvasTexture {
  const hit = textureCache.get(key);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  draw(c.getContext("2d")!, size);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  textureCache.set(key, tex);
  return tex;
}

/** A bold wax-print style pattern in the wearer's colours. */
function ankaraTexture(c1: string, c2: string) {
  return canvasTexture(`ankara|${c1}|${c2}`, (g, size) => {
    g.fillStyle = c1;
    g.fillRect(0, 0, size, size);
    const cell = 64;
    for (let i = -1; i < 5; i++) {
      for (let j = -1; j < 5; j++) {
        const x = i * cell + (j % 2 ? cell / 2 : 0) + cell / 2;
        const y = j * cell + cell / 2;
        const ring = (r: number, col: string) => {
          g.fillStyle = col;
          g.beginPath();
          g.arc(x, y, r, 0, Math.PI * 2);
          g.fill();
        };
        ring(25, c2);
        ring(19, "#fdf6e3");
        ring(13, c1);
        ring(6, "#f5b301");
        g.fillStyle = "#fdf6e3";
        for (let k = 0; k < 8; k++) {
          const a = (k / 8) * Math.PI * 2;
          g.beginPath();
          g.arc(x + Math.cos(a) * 31, y + Math.sin(a) * 31, 2.6, 0, Math.PI * 2);
          g.fill();
        }
        g.strokeStyle = c2;
        g.lineWidth = 3;
        g.beginPath();
        g.moveTo(x - 10, y + 36);
        g.quadraticCurveTo(x, y + 28, x + 10, y + 36);
        g.stroke();
      }
    }
  });
}

/** Isi agu: gold lion-face style medallions on a dark ground. */
function isiaguTexture(ground: string) {
  return canvasTexture(`isiagu|${ground}`, (g, size) => {
    g.fillStyle = ground;
    g.fillRect(0, 0, size, size);
    const gold = "#d4a017";
    const cell = 64;
    for (let i = -1; i < 5; i++) {
      for (let j = -1; j < 5; j++) {
        const x = i * cell + (j % 2 ? cell / 2 : 0) + cell / 2;
        const y = j * cell + cell / 2;
        g.fillStyle = gold;
        for (let k = 0; k < 8; k++) {
          const a = (k / 8) * Math.PI * 2;
          g.beginPath();
          g.ellipse(x + Math.cos(a) * 21, y + Math.sin(a) * 21, 8, 4.5, a, 0, Math.PI * 2);
          g.fill();
        }
        g.beginPath();
        g.arc(x, y, 14, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = ground;
        g.beginPath();
        g.arc(x, y, 9, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = gold;
        g.beginPath();
        g.arc(x, y, 4, 0, Math.PI * 2);
        g.fill();
      }
    }
  });
}

/** Super Eagles style: green with white wing chevrons and collar band. */
function jerseyTexture(c1: string, c2: string) {
  return canvasTexture(`jersey|${c1}|${c2}`, (g, size) => {
    g.fillStyle = c1;
    g.fillRect(0, 0, size, size);
    g.strokeStyle = c2;
    g.lineWidth = 9;
    for (const y of [150, 172, 194]) {
      g.beginPath();
      for (let x = 0; x <= size; x += 32) {
        g.lineTo(x, y + ((x / 32) % 2 ? 14 : -14));
      }
      g.stroke();
    }
    g.fillStyle = c2;
    g.fillRect(0, 0, size, 26); // collar band (top of the shell)
  });
}

/** Woven aso-oke: stripes with gold threads. */
function asookeTexture(c1: string, c2: string) {
  return canvasTexture(`asooke|${c1}|${c2}`, (g, size) => {
    g.fillStyle = c1;
    g.fillRect(0, 0, size, size);
    for (let x = 0; x < size; x += 32) {
      g.fillStyle = c2;
      g.fillRect(x, 0, 12, size);
      g.fillStyle = "#e8c15a";
      g.fillRect(x + 16, 0, 2, size);
      g.fillRect(x + 22, 0, 1.5, size);
    }
    g.fillStyle = "rgba(255,255,255,0.18)";
    for (let y = 0; y < size; y += 8) g.fillRect(0, y, size, 1.5);
  });
}

/** Cylinder between two world points; `a` end has radius r0, `b` end has radius r1. */
function tube(a: THREE.Vector3, b: THREE.Vector3, r0: number, r1: number, mat: THREE.Material): THREE.Mesh {
  const dir = a.clone().sub(b);
  const len = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, len, 18, 1, true), mat);
  mesh.quaternion.setFromUnitVectors(new V(0, 1, 0), dir.normalize());
  mesh.position.copy(a.clone().add(b).multiplyScalar(0.5));
  return mesh;
}

/* ---------------------------------- dress ---------------------------------- */

/** Long skirts and gowns do not fold when seated, so they swap for the legs underneath while sitting. */
export type Dressed = { dispose: () => void; skirts: THREE.Object3D[]; legs: THREE.Object3D[] };

export function dressAvatar(root: THREE.Object3D, look: Look, base: BaseId): Dressed {
  const roles = ROLES[base];
  const toDispose: { dispose: () => void }[] = [];
  const std = (color: string, rough = 0.7, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.02, ...extra });
    toDispose.push(m);
    return m;
  };
  const keep = <T extends { dispose: () => void }>(o: T) => {
    toDispose.push(o);
    return o;
  };
  const lighten = (hex: string, amt: number) => new THREE.Color(hex).lerp(new THREE.Color("#ffffff"), amt).getStyle();

  const fem = look.frame === "f";
  const skin = new THREE.Color(look.skin);
  const skinDark = skin.clone().multiplyScalar(0.82);
  const style = look.hairStyle;
  const headwear = style === "gele" || style === "turban" || style === "hijab";
  const hats = !headwear && ["cap", "fila", "hula", "igbocap"].includes(look.accessory);
  const hatOk = !headwear && !["afro", "puffs", "locs"].includes(style);
  const wearsHat = hats && hatOk;
  // the model's own hair stays only for "Natural" with no hat; otherwise we draw hair ourselves
  const hairBaked = style === "lowcut" && roles.baked && !wearsHat;
  const dressBase = base === "f-casual-a";
  const skirts: THREE.Object3D[] = [];
  const skirtLegs: THREE.Object3D[] = [];
  const hideLegs = look.top === "ankara" || look.top === "gown" || look.top === "asooke";

  /* 1. recolour the model's own materials */
  root.traverse((o) => {
    const m = o as THREE.SkinnedMesh;
    if (!m.isSkinnedMesh) return;
    m.frustumCulled = false;
    m.castShadow = true;
    const orig = m.material as THREE.MeshStandardMaterial;
    // physical paint: skin gets a soft sheen, cloth a fuzzy edge light, so people read as flesh and fabric rather than plastic
    const mat = keep(new THREE.MeshPhysicalMaterial()) as THREE.MeshPhysicalMaterial;
    THREE.MeshStandardMaterial.prototype.copy.call(mat, orig);
    mat.name = orig.name;
    mat.flatShading = false;
    mat.envMapIntensity = 0.8;
    m.material = mat;
    const found = /_(Head|Body|Legs|Feet|Pants)/.exec(m.name)?.[1];
    const part = found === "Pants" ? "Legs" : found;
    const n = orig.name;
    if (n === "Skin") {
      mat.color.copy(skin);
      mat.roughness = 0.5;
      mat.sheen = 0.5;
      mat.sheenColor.set("#ffb89a");
      mat.sheenRoughness = 0.55;
      mat.clearcoat = 0.12;
      mat.clearcoatRoughness = 0.6;
    } else if (n === "Skin_Darker") {
      mat.color.copy(skinDark);
      mat.roughness = 0.5;
      mat.sheen = 0.5;
      mat.sheenColor.set("#ffb89a");
      mat.sheenRoughness = 0.55;
    } else if (part === "Head" && roles.hide?.includes(n)) {
      m.visible = false;
    } else if (part === "Head" && roles.hair.includes(n)) {
      if (hairBaked) mat.color.set(look.hairColor);
      else m.visible = false;
    } else if (part === "Head" && roles.brows.includes(n)) {
      mat.color.set(style === "bald" ? skinDark.getStyle() : look.hairColor);
    } else if (part === "Body" && roles.body.includes(n)) {
      mat.color.set(look.topColor);
    } else if (part === "Body" && roles.bodyBottom?.includes(n)) {
      mat.color.set(look.bottomColor);
    } else if (part === "Legs" && roles.legs.includes(n)) {
      mat.color.set(dressBase ? look.topColor : look.bottomColor);
      if (hideLegs) {
        m.visible = false; // hidden under the long wrapper or gown
        skirtLegs.push(m);
      }
    } else if (part === "Feet" && roles.feet.includes(n)) {
      mat.color.set(look.shoeColor);
      mat.roughness = 0.42; // polished leather and canvas rather than flat plastic
      mat.metalness = 0.06;
    }
    // a finer finish: cloth is matte, hair is soft, skin keeps a little life
    if (part === "Body" || part === "Legs") {
      if (mat.name !== "Skin" && mat.name !== "Skin_Darker") {
        mat.roughness = 0.86;
        mat.metalness = 0;
        mat.sheen = 0.6;
        mat.sheenColor.set("#ffffff");
        mat.sheenRoughness = 0.45;
      }
    }
  });

  /* 2. overlays attached to bones */
  root.updateMatrixWorld(true);
  const bone = (name: string) => root.getObjectByName(name) ?? undefined;
  const wpos = (name: string) => bone(name)?.getWorldPosition(new V()) ?? new V();
  const mount = (obj: THREE.Object3D, boneName: string) => {
    root.add(obj);
    obj.updateMatrixWorld(true);
    obj.traverse((c) => {
      const mesh = c as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        keep(mesh.geometry);
      }
    });
    bone(boneName)?.attach(obj);
  };

  const head = wpos("Head");
  const abd = wpos("Abdomen");
  const hips = wpos("Hips");
  // Measured from the models' skulls: the women's heads sit a little lower than the men's.
  const hc = new V(head.x, fem ? 1.629 : 1.681, 0.101);
  const eyeY = fem ? 0.015 : -0.026;
  const w = fem ? 0.86 : 1;

  /* ---- hair & headwear ---- */
  const hairMat = std(look.hairColor, 0.88);
  const cap = (r: number, theta: number, tilt: number, mat: THREE.Material = hairMat) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 36, 22, 0, Math.PI * 2, 0, theta), mat);
    mesh.rotation.x = tilt;
    return mesh;
  };
  const headGroup = new THREE.Group();
  headGroup.position.copy(hc);
  let headHasStuff = false;
  const add = (o: THREE.Object3D, x = 0, y = 0, z = 0, parent: THREE.Object3D = headGroup) => {
    o.position.set(x, y, z);
    parent.add(o);
    headHasStuff = true;
  };
  const crop = () => add(cap(0.115, Math.PI * 0.46, -0.32), 0, 0.005, -0.012);

  // models without usable baked hair get a neat crop for "Natural"
  if (style === "lowcut" && !roles.baked && !wearsHat) crop();

  switch (style) {
    case "afro": {
      // a full, round mass that wraps the crown and sides; the face pokes out in front of it
      const fro = new THREE.Mesh(new THREE.SphereGeometry(0.165, 40, 28, 0, Math.PI * 2, 0, Math.PI * 0.74), hairMat);
      fro.scale.set(1.02, 0.96, 0.98);
      add(fro, 0, 0.048, -0.06);
      break;
    }
    case "puffs": {
      crop();
      for (const s of [-1, 1]) {
        add(new THREE.Mesh(new THREE.SphereGeometry(0.082, 28, 20), hairMat), s * 0.088, 0.125, -0.03);
        add(new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.008, 8, 20), std("#f4f4f2", 0.5)), s * 0.07, 0.085, -0.03);
      }
      break;
    }
    case "braids": {
      crop();
      for (let i = 0; i < 11; i++) {
        const a = -1.35 + (i / 10) * 2.7;
        const braid = new THREE.Mesh(new THREE.CapsuleGeometry(0.0125, 0.3, 4, 8), hairMat);
        add(braid, Math.sin(a) * 0.1, -0.18, -Math.cos(a) * 0.09 - 0.045);
      }
      break;
    }
    case "cornrows": {
      const g = new THREE.Group();
      g.rotation.x = -0.3;
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.115, 36, 22, 0, Math.PI * 2, 0, Math.PI * 0.46), hairMat));
      const ridge = std(lighten(look.hairColor, 0.16), 0.7);
      for (let k = -3; k <= 3; k++) {
        const x = k * 0.028;
        const r = Math.sqrt(0.118 * 0.118 - x * x);
        const pts: THREE.Vector3[] = [];
        for (let a = 0.25; a <= Math.PI - 0.45; a += 0.12) pts.push(new V(x, r * Math.sin(a), r * Math.cos(a)));
        const row = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 28, 0.0048, 6, false), ridge);
        g.add(row);
      }
      add(g, 0, 0.005, -0.012);
      break;
    }
    case "locs": {
      crop();
      for (let i = 0; i < 28; i++) {
        const a = (i / 28) * Math.PI * 2;
        if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) < 0.75) continue; // keep the face clear (front = +z at a = 0)
        const len = 0.2 + ((i * 37) % 11) * 0.012;
        const loc = new THREE.Mesh(new THREE.CapsuleGeometry(0.019, len, 4, 8), hairMat);
        add(loc, Math.sin(a) * 0.106, -len / 2 + 0.02, Math.cos(a) * 0.098 - 0.025);
      }
      break;
    }
    case "twists": {
      crop();
      for (let i = 0; i < 24; i++) {
        const t = 0.1 + (i / 24) * 0.95;
        const phi = i * 2.399;
        const r = 0.12;
        const coil = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 10), hairMat);
        add(coil, Math.sin(t) * Math.cos(phi) * r, Math.cos(t) * r, Math.sin(t) * Math.sin(phi) * r - 0.02);
      }
      break;
    }
    case "bun": {
      crop();
      add(new THREE.Mesh(new THREE.SphereGeometry(0.058, 20, 16), hairMat), 0, 0.135, -0.07);
      break;
    }
    case "gele": {
      const wrap = std(look.topColor, 0.45, { metalness: 0.15 });
      const wrapLight = std(lighten(look.topColor, 0.12), 0.4, { metalness: 0.2 });
      const baseWrap = new THREE.Mesh(new THREE.SphereGeometry(0.125, 32, 20), wrap);
      baseWrap.scale.set(1.25, 0.66, 1.1);
      add(baseWrap, 0, 0.1, -0.015);
      const fan = new THREE.Mesh(new THREE.SphereGeometry(0.12, 28, 18), wrapLight);
      fan.scale.set(1.15, 1.0, 0.26);
      fan.rotation.set(0.15, 0.35, -0.25);
      add(fan, 0.05, 0.19, 0.04);
      const fan2 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 16), wrap);
      fan2.scale.set(1.1, 0.95, 0.3);
      fan2.rotation.set(0.2, 0.2, 0.35);
      add(fan2, -0.07, 0.17, 0.05);
      const fold = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.022, 10, 28), wrapLight);
      fold.rotation.set(Math.PI / 2 - 0.35, 0, 0);
      fold.scale.set(0.95, 1, 1);
      add(fold, 0, 0.045, 0.0);
      break;
    }
    case "turban": {
      const wrap = std(look.topColor, 0.55, { metalness: 0.05 });
      const wrapLight = std(lighten(look.topColor, 0.18), 0.5);
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.125, 32, 20), wrap);
      dome.scale.set(1.08, 0.8, 1.12);
      add(dome, 0, 0.075, -0.012);
      for (let j = 0; j < 3; j++) {
        const band = new THREE.Mesh(new THREE.TorusGeometry(0.112 - j * 0.004, 0.03, 12, 32), j % 2 ? wrapLight : wrap);
        band.rotation.set(Math.PI / 2 - 0.18 - j * 0.1, 0, j % 2 ? 0.12 : -0.12);
        band.scale.set(1.04, 1.06, 1);
        add(band, 0, 0.03 + j * 0.036, -0.01);
      }
      const knot = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 12), wrapLight);
      add(knot, 0.07, 0.15, 0.03);
      break;
    }
    case "hijab": {
      const veil = std(look.topColor, 0.62, { side: THREE.DoubleSide });
      const crown = new THREE.Mesh(new THREE.SphereGeometry(0.128, 40, 28, 0, Math.PI * 2, 0, Math.PI * 0.86), veil);
      crown.scale.set(1.02, 1.1, 1.06);
      add(crown, 0, 0.0, -0.036);
      const drape = new THREE.Mesh(
        new THREE.LatheGeometry(
          smoothProfile(
            [
              [0.235, -0.4],
              [0.2, -0.3],
              [0.15, -0.21],
              [0.118, -0.16],
            ],
            20,
          ),
          36,
        ),
        veil,
      );
      drape.scale.set(1, 1, 0.9);
      add(drape, 0, 0, -0.02);
      break;
    }
    default:
      break;
  }

  if (!headwear) {
    switch (look.accessory) {
      case "glasses":
      case "sunglasses": {
        const frame = std("#1c1917", 0.35);
        for (const s of [-1, 1]) {
          const lens = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.0026, 8, 28), frame);
          add(lens, s * 0.04, eyeY, 0.121);
          if (look.accessory === "sunglasses") {
            const shade = new THREE.Mesh(new THREE.CircleGeometry(0.03, 24), std("#0b0b0c", 0.15, { metalness: 0.4 }));
            add(shade, s * 0.04, eyeY, 0.122);
          }
          const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.0026, 0.12, 3, 6), frame);
          arm.rotation.x = Math.PI / 2;
          add(arm, s * 0.098, eyeY, 0.06);
        }
        const bridge = new THREE.Mesh(new THREE.CapsuleGeometry(0.0026, 0.026, 3, 6), frame);
        bridge.rotation.z = Math.PI / 2;
        add(bridge, 0, eyeY + 0.006, 0.122);
        break;
      }
      case "cap":
        if (hatOk) {
          const capMat = std(look.topColor, 0.7);
          add(cap(0.125, Math.PI * 0.5, -0.18, capMat), 0, 0.012, -0.012);
          const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.012, 24, 1, false, -Math.PI * 0.45, Math.PI * 0.9), capMat);
          brim.scale.set(1, 1, 1.15);
          brim.rotation.set(0.1, 0, 0);
          add(brim, 0, 0.065, 0.1);
        }
        break;
      case "fila":
        if (hatOk) {
          const filaMat = std(look.topColor, 0.8);
          const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.098, 0.15, 32), filaMat);
          hat.rotation.x = -0.28;
          add(hat, 0, 0.115, -0.03);
          const band = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.008, 8, 28), std("#f5d98a", 0.5, { metalness: 0.4 }));
          band.rotation.x = Math.PI / 2 - 0.28;
          add(band, 0, 0.065, 0.0);
        }
        break;
      case "hula":
        if (hatOk) {
          const kube = std(look.topColor, 0.75);
          const goldM = std("#e8c15a", 0.4, { metalness: 0.4 });
          const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.104, 0.13, 32), kube);
          hat.rotation.x = -0.12;
          add(hat, 0, 0.1, -0.012);
          const bandLow = new THREE.Mesh(new THREE.TorusGeometry(0.103, 0.008, 8, 32), goldM);
          bandLow.rotation.x = Math.PI / 2 - 0.12;
          add(bandLow, 0, 0.045, -0.01);
          const bandTop = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.006, 8, 32), goldM);
          bandTop.rotation.x = Math.PI / 2 - 0.12;
          add(bandTop, 0, 0.158, -0.02);
        }
        break;
      case "igbocap":
        if (hatOk) {
          const red = std("#b91c1c", 0.7);
          const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.108, 0.1, 32), red);
          hat.rotation.set(-0.1, 0, 0.1);
          add(hat, 0, 0.085, -0.012);
          const bandLow = new THREE.Mesh(new THREE.TorusGeometry(0.107, 0.012, 8, 32), std("#111111", 0.6));
          bandLow.rotation.set(Math.PI / 2 - 0.1, 0, 0.1);
          add(bandLow, 0, 0.04, -0.01);
          const feather = new THREE.Mesh(new THREE.CapsuleGeometry(0.007, 0.17, 4, 8), std("#fafafa", 0.6));
          feather.rotation.z = -0.9;
          add(feather, 0.115, 0.16, -0.01);
          const tip = new THREE.Mesh(new THREE.SphereGeometry(0.01, 8, 6), std("#b91c1c", 0.6));
          add(tip, 0.17, 0.215, -0.01);
        }
        break;
      default:
        break;
    }
  }
  if (headHasStuff) mount(headGroup, "Head");

  /* ---- outfits ---- */
  const trim = lighten(look.topColor, 0.55);
  const gold = std("#e8c15a", 0.4, { metalness: 0.45 });
  const sleeve = (side: string, r0: number, r1: number, r2: number, mat: THREE.Material) => {
    const a = wpos("UpperArm" + side);
    const b = wpos("LowerArm" + side);
    const c = wpos("Wrist" + side);
    mount(tube(a.clone().add(new V(side === "L" ? -0.01 : 0.01, 0.03, 0)), b, r0, r1, mat), "UpperArm" + side);
    mount(tube(b, c, r1, r2, mat), "LowerArm" + side);
  };
  const capSleeve = (side: string, r0: number, r1: number, frac: number, mat: THREE.Material) => {
    const a = wpos("UpperArm" + side);
    const b = wpos("LowerArm" + side);
    const mid = a.clone().lerp(b, frac);
    mount(tube(a.clone().add(new V(side === "L" ? -0.005 : 0.005, 0.03, 0)), mid, r0, r1, mat), "UpperArm" + side);
  };
  const shell = (pts: [number, number][], mat: THREE.Material, scaleZ: number, seg = 44) => {
    const m = new THREE.Mesh(new THREE.LatheGeometry(smoothProfile(pts, 40), seg), mat);
    m.scale.set(1, 1, scaleZ);
    return m;
  };
  const neckTop: [number, number][] = [
    [0.085, 1.465],
    [0.062, 1.49],
  ];
  const place = (g: THREE.Object3D, boneName: string, at: THREE.Vector3, dz = 0.02) => {
    g.position.set(at.x, 0, at.z + dz);
    mount(g, boneName);
  };

  if (look.top === "senator") {
    const cloth = std(look.topColor, 0.62);
    const trimMat = std(trim, 0.5, { metalness: 0.1 });
    const g = new THREE.Group();
    g.add(
      shell(
        [
          [0.215 * w, 0.62],
          [0.2 * w, 0.78],
          [0.178 * w, 0.95],
          [0.172 * w, 1.08],
          [0.19 * w, 1.24],
          [0.205 * w, 1.34],
          [0.17 * w, 1.42],
          ...neckTop,
        ],
        cloth,
        0.78,
        40,
      ),
    );
    const placket = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.5, 0.01), trimMat);
    placket.position.set(0, 1.18, 0.158 * 0.78);
    g.add(placket);
    for (const y of [1.36, 1.28, 1.2]) {
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.01, 10, 8), trimMat);
      btn.position.set(0, y, 0.161 * 0.78);
      g.add(btn);
    }
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.066, 0.075, 0.04, 22, 1, true), cloth);
    collar.position.set(0, 1.5, 0);
    g.add(collar);
    place(g, "Abdomen", abd);
    sleeve("L", 0.068, 0.06, 0.05, cloth);
    sleeve("R", 0.068, 0.06, 0.05, cloth);
  }

  if (look.top === "buba") {
    const cloth = std(look.topColor, 0.62);
    const g = new THREE.Group();
    g.add(
      shell(
        [
          [0.24 * w, 0.72],
          [0.215 * w, 0.88],
          [0.19 * w, 1.06],
          [0.2 * w, 1.24],
          [0.21 * w, 1.34],
          [0.17 * w, 1.42],
          ...neckTop,
        ],
        cloth,
        0.8,
        40,
      ),
    );
    const hem = new THREE.Mesh(new THREE.TorusGeometry(0.24 * w, 0.011, 8, 40), gold);
    hem.rotation.x = Math.PI / 2;
    hem.scale.set(1, 0.8, 1);
    hem.position.y = 0.73;
    g.add(hem);
    const vneck = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.011, 8, 20, Math.PI), gold);
    vneck.rotation.set(Math.PI / 2 - 0.5, 0, 0);
    vneck.position.set(0, 1.455, 0.06);
    g.add(vneck);
    place(g, "Abdomen", abd);
    sleeve("L", 0.085, 0.115, 0.13, cloth);
    sleeve("R", 0.085, 0.115, 0.13, cloth);
  }

  if (look.top === "babariga") {
    const cloth = std(look.topColor, 0.6, { side: THREE.DoubleSide });
    const g = new THREE.Group();
    g.add(
      shell(
        [
          [0.36 * w, 0.12],
          [0.33 * w, 0.4],
          [0.29 * w, 0.7],
          [0.255 * w, 1.0],
          [0.235 * w, 1.2],
          [0.22 * w, 1.33],
          [0.175 * w, 1.42],
          ...neckTop,
        ],
        cloth,
        0.82,
        44,
      ),
    );
    const hem = new THREE.Mesh(new THREE.TorusGeometry(0.36 * w, 0.012, 8, 44), gold);
    hem.rotation.x = Math.PI / 2;
    hem.scale.set(1, 0.82, 1);
    hem.position.y = 0.13;
    g.add(hem);
    const neck = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.014, 8, 22, Math.PI), gold);
    neck.rotation.set(Math.PI / 2 - 0.5, 0, 0);
    neck.position.set(0, 1.455, 0.06);
    g.add(neck);
    const pocket = new THREE.Group();
    for (const [px, py, sx, sy] of [
      [0, 0.06, 0.12, 0.012],
      [0, -0.06, 0.12, 0.012],
      [-0.06, 0, 0.012, 0.12],
      [0.06, 0, 0.012, 0.12],
    ]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, 0.008), gold);
      bar.position.set(px, py, 0);
      pocket.add(bar);
    }
    pocket.position.set(0.09 * w, 1.22, 0.205 * 0.82 * w + 0.015);
    g.add(pocket);
    const placket = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.62, 0.008), gold);
    placket.position.set(0, 1.08, 0.24 * 0.82 * w);
    g.add(placket);
    place(g, "Abdomen", abd);
    sleeve("L", 0.095, 0.13, 0.14, cloth);
    sleeve("R", 0.095, 0.13, 0.14, cloth);
  }

  if (look.top === "isiagu") {
    const print = isiaguTexture(look.topColor);
    print.repeat.set(4, 2);
    const cloth = std("#ffffff", 0.62, { map: print, side: THREE.DoubleSide });
    const g = new THREE.Group();
    g.add(
      shell(
        [
          [0.2 * w, 0.8],
          [0.19 * w, 0.92],
          [0.172 * w, 1.06],
          [0.185 * w, 1.22],
          [0.2 * w, 1.33],
          [0.17 * w, 1.42],
          ...neckTop,
        ],
        cloth,
        0.76,
        40,
      ),
    );
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.014, 8, 22), gold);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, 1.49, 0);
    g.add(collar);
    place(g, "Abdomen", abd);
    capSleeve("L", 0.085, 0.1, 1.0, cloth);
    capSleeve("R", 0.085, 0.1, 1.0, cloth);
  }

  if (look.top === "jersey") {
    const print = jerseyTexture(look.topColor, "#fafafa");
    const cloth = std("#ffffff", 0.7, { map: print, side: THREE.DoubleSide });
    const g = new THREE.Group();
    g.add(
      shell(
        [
          [0.172 * w, 0.84],
          [0.168 * w, 0.95],
          [0.174 * w, 1.08],
          [0.19 * w, 1.22],
          [0.205 * w, 1.33],
          [0.172 * w, 1.42],
          ...neckTop,
        ],
        cloth,
        0.74,
        40,
      ),
    );
    place(g, "Abdomen", abd);
    const white = std("#fafafa", 0.6);
    capSleeve("L", 0.066, 0.072, 0.6, white);
    capSleeve("R", 0.066, 0.072, 0.6, white);
  }

  if (look.top === "agbada") {
    const cloth = std(look.topColor, 0.6, { side: THREE.DoubleSide });
    const inner = std(lighten(look.topColor, 0.65), 0.6);
    const g = new THREE.Group();
    g.add(
      shell(
        [
          [0.43 * w, 0.3],
          [0.39 * w, 0.5],
          [0.33 * w, 0.75],
          [0.28 * w, 1.0],
          [0.25 * w, 1.2],
          [0.235 * w, 1.34],
          [0.18 * w, 1.42],
          ...neckTop,
        ],
        cloth,
        0.86,
        44,
      ),
    );
    const hem = new THREE.Mesh(new THREE.TorusGeometry(0.43 * w, 0.012, 8, 44), gold);
    hem.rotation.x = Math.PI / 2;
    hem.scale.set(1, 0.86, 1);
    hem.position.y = 0.3;
    g.add(hem);
    const front = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.55, 0.01), inner);
    front.position.set(0, 1.12, 0.29 * 0.86 * w);
    g.add(front);
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.018, 8, 22, Math.PI), gold);
    collar.rotation.set(Math.PI / 2 - 0.5, 0, 0);
    collar.position.set(0, 1.455, 0.05);
    g.add(collar);
    place(g, "Abdomen", abd);
    sleeve("L", 0.09, 0.14, 0.16, cloth);
    sleeve("R", 0.09, 0.14, 0.16, cloth);
  }

  /** Long wrapper skirt for iro & buba / aso-oke. */
  const iro = (print: THREE.Texture) => {
    print.repeat.set(5, 2);
    const wrap = std("#ffffff", 0.65, { map: print, side: THREE.DoubleSide });
    const g = new THREE.Group();
    const skirt = shell(
      [
        [0.31, 0.16],
        [0.255, 0.4],
        [0.195, 0.66],
        [0.15, 0.88],
        [0.128, 1.0],
      ],
      wrap,
      0.86,
      40,
    );
    g.add(skirt);
    const sash = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.016, 8, 30), std(look.topColor, 0.5));
    sash.rotation.x = Math.PI / 2;
    sash.scale.set(1.0, 0.86, 1);
    sash.position.y = 0.99;
    g.add(sash);
    g.position.set(hips.x, 0, hips.z + 0.01);
    mount(g, "Hips");
    skirts.push(g);
    capSleeve("L", 0.06, 0.07, 0.62, wrap);
    capSleeve("R", 0.06, 0.07, 0.62, wrap);
  };

  if (look.top === "ankara") iro(ankaraTexture(look.topColor, look.bottomColor));

  if (look.top === "asooke") {
    iro(asookeTexture(look.topColor, look.bottomColor));
    // ipele: a shawl worn diagonally from one shoulder to the opposite hip
    const sash = std(look.bottomColor, 0.5, { metalness: 0.1 });
    const a = wpos("UpperArmL").add(new V(-0.02, 0.05, 0.11));
    const b = hips.clone().add(new V(-0.14, 0.12, 0.1));
    const dir = a.clone().sub(b);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.115, dir.length(), 0.014), sash);
    strip.quaternion.setFromUnitVectors(new V(0, 1, 0), dir.clone().normalize());
    strip.position.copy(a.clone().add(b).multiplyScalar(0.5));
    mount(strip, "Chest");
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.012, dir.length(), 0.016), gold);
    edge.quaternion.copy(strip.quaternion);
    edge.position.copy(strip.position);
    mount(edge, "Chest");
  }

  if (look.top === "gown") {
    const print = ankaraTexture(look.topColor, look.bottomColor);
    print.repeat.set(4, 3);
    const cloth = std("#ffffff", 0.62, { map: print, side: THREE.DoubleSide });
    const g = new THREE.Group();
    g.add(
      shell(
        [
          [0.3, 0.08],
          [0.235, 0.3],
          [0.17, 0.55],
          [0.155, 0.75],
          [0.148, 0.9],
          [0.138, 1.05],
          [0.152, 1.2],
          [0.158, 1.32],
          [0.14, 1.4],
          [0.085, 1.46],
          [0.06, 1.49],
        ],
        cloth,
        0.82,
        40,
      ),
    );
    place(g, "Abdomen", abd);
    skirts.push(g);
    capSleeve("L", 0.06, 0.07, 0.55, cloth);
    capSleeve("R", 0.06, 0.07, 0.55, cloth);
  }

  return {
    dispose: () => toDispose.forEach((d) => d.dispose()),
    skirts,
    legs: skirtLegs,
  };
}
