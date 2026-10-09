import * as THREE from "three";

const cache = new Map<string, THREE.MeshStandardMaterial>();

/** Shared matte material per colour. */
export function mat(color: string, rough = 0.75): THREE.MeshStandardMaterial {
  const key = `${color}|${rough}`;
  let m = cache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.02 });
    cache.set(key, m);
  }
  return m;
}

/** Facade materials whose emissive glow follows the day/night cycle. */
export const windowMats = new Set<THREE.MeshStandardMaterial>();

/** Street-lamp bulbs (shared). */
export const lampMat = new THREE.MeshStandardMaterial({
  color: "#fff4d6",
  emissive: new THREE.Color("#ffd27a"),
  emissiveIntensity: 0,
  roughness: 0.4,
});

/** Neon-ish signs that glow at night. */
export const signMat = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  emissive: new THREE.Color("#ffb347"),
  emissiveIntensity: 0,
  roughness: 0.5,
});

/* ---- night lights for the shopping, eating and nightlife places: shared materials that Lighting.tsx drives once per frame ---- */

/** A stable 0..2π offset from a name, so neighbouring neon signs do not breathe in step. */
function phaseOf(key: string) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return (Math.abs(h) % 628) / 100;
}

export type Neon = { m: THREE.MeshStandardMaterial; day: number; pulse: boolean; phase: number };
/** Every coloured sign / neon material in use (never removed: there is one per colour). */
export const neons: Neon[] = [];
const neonCache = new Map<string, THREE.MeshStandardMaterial>();

/**
 * Shared glowing paint per colour. `day` is the glow it keeps in daylight (0.4 is what the old sign bands had, 0 is plain paint);
 * at night it brightens, NEPA takes most of it away, and `pulse` makes it breathe slowly (clubs).
 */
export function neonMat(color: string, pulse = false, day = 0.4): THREE.MeshStandardMaterial {
  const key = `${color}|${pulse ? 1 : 0}|${day}`;
  let m = neonCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color), emissiveIntensity: day });
    neonCache.set(key, m);
    neons.push({ m, day, pulse, phase: phaseOf(key) });
  }
  return m;
}

/** Warm lit shop-front glass: pale glass by day, a glowing window at night (NEPA turns it off). */
export const shopGlow = new THREE.MeshStandardMaterial({
  color: "#9cc0d2",
  emissive: new THREE.Color("#ffd08a"),
  emissiveIntensity: 0,
  roughness: 0.25,
});

/** The rooftop mirror ball of the clubs: faceted, and it sparkles on the beat once it is dark. */
export const discoMat = new THREE.MeshStandardMaterial({
  color: "#d9d9e6",
  emissive: new THREE.Color("#b58cff"),
  emissiveIntensity: 0,
  roughness: 0.15,
  metalness: 0.02,
  flatShading: true, // the facets are what sparkle
});

export type Spill = { m: THREE.MeshBasicMaterial; max: number; pulse: boolean; phase: number };
/** Light pools on the pavement and club searchlight beams: additive, fade in at dusk (the world has no real point lights). */
export const spills: Spill[] = [];
const spillCache = new Map<string, THREE.MeshBasicMaterial>();

let poolTex: THREE.DataTexture | null = null;
/** A soft round falloff (built from numbers, no canvas, so it also works before the page exists). */
function poolTexture() {
  if (poolTex) return poolTex;
  const N = 64;
  const data = new Uint8Array(N * N * 4);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const r = Math.min(1, Math.hypot((x + 0.5) / N - 0.5, (y + 0.5) / N - 0.5) * 2);
      const a = (1 - r) * (1 - r) * (1 - r * 0.4);
      const i = (y * N + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = 255;
      data[i + 3] = Math.round(a * 255);
    }
  }
  poolTex = new THREE.DataTexture(data, N, N, THREE.RGBAFormat);
  poolTex.magFilter = poolTex.minFilter = THREE.LinearFilter;
  poolTex.needsUpdate = true;
  return poolTex;
}

/** A pool of coloured light on the ground (flat, additive). `max` is its opacity at full dark. */
export function poolMat(color: string, pulse = false, max = 0.5): THREE.MeshBasicMaterial {
  const key = `pool|${color}|${pulse ? 1 : 0}|${max}`;
  let m = spillCache.get(key);
  if (!m) {
    m = new THREE.MeshBasicMaterial({
      color,
      map: poolTexture(),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    m.visible = false;
    spillCache.set(key, m);
    spills.push({ m, max, pulse, phase: phaseOf(key) });
  }
  return m;
}

/** A searchlight beam: the vertex colours fade it out towards the far end. Opacity is driven like the pools. */
export function beamMat(color: string, max = 0.4): THREE.MeshBasicMaterial {
  const key = `beam|${color}|${max}`;
  let m = spillCache.get(key);
  if (!m) {
    m = new THREE.MeshBasicMaterial({
      color,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    m.visible = false;
    spillCache.set(key, m);
    spills.push({ m, max, pulse: true, phase: phaseOf(key) });
  }
  return m;
}

/** Painted sign boards (a name on a coloured ground): full bright when lit, dimmed by NEPA. Boards register themselves while mounted. */
export const boardMats = new Set<THREE.MeshBasicMaterial>();
export function boardMat(map: THREE.Texture): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ map, toneMapped: false });
}

let tiles: { base: THREE.CanvasTexture; lit: THREE.CanvasTexture; rough: THREE.CanvasTexture; bump: THREE.CanvasTexture } | null = null;

/**
 * One tile of facade, four maps drawn together so they line up: the colour (rendered plaster with stains, deep-set windows with
 * frames, sills and a sky reflection), the night glow, a roughness/metal map (dull wall, glossy glass) and a bump map (the grain
 * of the plaster, the window set back into the wall).
 */
function makeTiles() {
  const CELL = 128;
  const N = 4;
  const mk = () => {
    const c = document.createElement("canvas");
    c.width = c.height = CELL * N;
    return c;
  };
  const base = mk();
  const lit = mk();
  const rough = mk();
  const bump = mk();
  const b = base.getContext("2d")!;
  const l = lit.getContext("2d")!;
  const r = rough.getContext("2d")!;
  const u = bump.getContext("2d")!;
  const W = base.width;
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  // plaster: a light ground with fine grain and faint streaks of damp and dust running down from the sills
  b.fillStyle = "#f1f1ee";
  b.fillRect(0, 0, W, W);
  for (let i = 0; i < 5200; i++) {
    const v = 214 + Math.floor(rnd() * 38);
    b.fillStyle = `rgba(${v},${v},${v - 4},${0.10 + rnd() * 0.16})`;
    b.fillRect(rnd() * W, rnd() * W, 1 + rnd() * 2.5, 1 + rnd() * 2.5);
  }
  l.fillStyle = "#000";
  l.fillRect(0, 0, W, W);
  r.fillStyle = "rgb(255,222,0)"; // G = roughness (wall: very rough), B = metalness (none)
  r.fillRect(0, 0, W, W);
  u.fillStyle = "#808080";
  u.fillRect(0, 0, W, W);
  for (let i = 0; i < 4200; i++) {
    const v = 90 + Math.floor(rnd() * 90);
    u.fillStyle = `rgba(${v},${v},${v},0.5)`;
    u.fillRect(rnd() * W, rnd() * W, 1 + rnd() * 2, 1 + rnd() * 2);
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const cx = i * CELL;
      const cy = j * CELL;
      const x = cx + 20;
      const y = cy + 22;
      const w = CELL - 40;
      const h = CELL - 46;
      // damp streak under the sill
      const streak = b.createLinearGradient(0, y + h, 0, cy + CELL);
      streak.addColorStop(0, "rgba(70,62,52,0.22)");
      streak.addColorStop(1, "rgba(70,62,52,0)");
      b.fillStyle = streak;
      b.fillRect(x + 4, y + h + 4, w - 8, CELL - h - 26);
      // the recess: a darker reveal around the glass
      b.fillStyle = "rgba(40,40,44,0.55)";
      b.fillRect(x - 3, y - 3, w + 6, h + 6);
      // glass: sky at the top, darker room at the bottom, with a diagonal glint
      const g = b.createLinearGradient(x, y, x, y + h);
      g.addColorStop(0, "#a9c4da");
      g.addColorStop(0.55, "#6f8ba3");
      g.addColorStop(1, "#3f5568");
      b.fillStyle = g;
      b.fillRect(x, y, w, h);
      b.fillStyle = "rgba(255,255,255,0.18)";
      b.beginPath();
      b.moveTo(x, y + h * 0.55);
      b.lineTo(x + w * 0.55, y);
      b.lineTo(x + w * 0.85, y);
      b.lineTo(x, y + h * 0.95);
      b.closePath();
      b.fill();
      // curtains behind some panes
      if (rnd() < 0.5) {
        b.fillStyle = `hsla(${Math.floor(rnd() * 360)},25%,72%,0.5)`;
        b.fillRect(x, y, w * (0.25 + rnd() * 0.2), h);
      }
      // frame and mullion
      b.strokeStyle = "#e9e7e1";
      b.lineWidth = 5;
      b.strokeRect(x + 2.5, y + 2.5, w - 5, h - 5);
      b.beginPath();
      b.moveTo(x + w / 2, y);
      b.lineTo(x + w / 2, y + h);
      b.moveTo(x, y + h * 0.42);
      b.lineTo(x + w, y + h * 0.42);
      b.lineWidth = 3;
      b.stroke();
      // sill and lintel
      b.fillStyle = "#d9d6cf";
      b.fillRect(x - 6, y + h + 3, w + 12, 7);
      b.fillStyle = "rgba(0,0,0,0.18)";
      b.fillRect(x - 6, y + h + 10, w + 12, 3);
      b.fillStyle = "#e4e1da";
      b.fillRect(x - 5, y - 8, w + 10, 5);

      if (rnd() < 0.58) {
        l.fillStyle = rnd() < 0.8 ? "#ffcf75" : "#bfe2ff";
        l.fillRect(x, y, w, h);
      }
      // glass is glossy and a little metallic; the frame is not
      r.fillStyle = "rgb(0,38,70)";
      r.fillRect(x, y, w, h);
      r.fillStyle = "rgb(0,170,0)";
      r.fillRect(x, y, w, 3);
      // bump: window set back, sill proud
      u.fillStyle = "#303030";
      u.fillRect(x - 3, y - 3, w + 6, h + 6);
      u.fillStyle = "#b8b8b8";
      u.fillRect(x - 6, y + h + 3, w + 12, 8);
    }
  }
  const tex = (c: HTMLCanvasElement, srgb: boolean) => {
    const t = new THREE.CanvasTexture(c);
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  return { base: tex(base, true), lit: tex(lit, true), rough: tex(rough, false), bump: tex(bump, false) };
}

const faceCache = new Map<string, THREE.MeshStandardMaterial>();

/** Shared by every building with the same colour and window grid: far fewer textures to build and upload. */
function faceMat(tint: string, cols: number, rows: number) {
  const key = `${tint}|${Math.max(1, cols)}|${Math.max(1, rows)}`;
  const hit = faceCache.get(key);
  if (hit) return hit;
  const made = buildFaceMat(tint, cols, rows);
  faceCache.set(key, made);
  windowMats.add(made); // its windows glow at night for as long as it exists
  return made;
}

function buildFaceMat(tint: string, cols: number, rows: number) {
  tiles ??= makeTiles();
  const b = tiles.base.clone();
  const l = tiles.lit.clone();
  const rm = tiles.rough.clone();
  const bm = tiles.bump.clone();
  for (const t of [b, l, rm, bm]) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(Math.max(1, cols) / 4, Math.max(1, rows) / 4);
    t.anisotropy = 8;
    t.needsUpdate = true;
  }
  return new THREE.MeshStandardMaterial({
    color: tint,
    map: b,
    roughnessMap: rm,
    metalnessMap: rm,
    roughness: 1,
    metalness: 1,
    bumpMap: bm,
    bumpScale: 2.2,
    envMapIntensity: 0.9,
    emissive: new THREE.Color("#ffffff"),
    emissiveMap: l,
    emissiveIntensity: 0,
  });
}

/** BoxGeometry material array: [+x, -x, +y, -y, +z, -z] with window grids on the sides. */
const roofCache = new Map<string, THREE.MeshStandardMaterial>();

export function facadeMaterials(w: number, h: number, d: number, tint: string): THREE.Material[] {
  const rows = Math.round(h / 0.62);
  const sideW = faceMat(tint, Math.round(w / 0.62), rows);
  const sideD = faceMat(tint, Math.round(d / 0.62), rows);
  let roof = roofCache.get(tint);
  if (!roof) {
    roof = new THREE.MeshStandardMaterial({ color: new THREE.Color(tint).multiplyScalar(0.7), roughness: 0.92 });
    roofCache.set(tint, roof);
  }
  return [sideD, sideD, roof, roof, sideW, sideW];
}
