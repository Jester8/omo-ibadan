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

let tiles: { base: THREE.CanvasTexture; lit: THREE.CanvasTexture } | null = null;

function makeTiles() {
  const CELL = 64;
  const N = 4;
  const mk = () => {
    const c = document.createElement("canvas");
    c.width = c.height = CELL * N;
    return c;
  };
  const base = mk();
  const lit = mk();
  const b = base.getContext("2d")!;
  const l = lit.getContext("2d")!;
  b.fillStyle = "#f3f4f6";
  b.fillRect(0, 0, base.width, base.height);
  l.fillStyle = "#000";
  l.fillRect(0, 0, lit.width, lit.height);
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x = i * CELL + 10;
      const y = j * CELL + 12;
      const w = CELL - 20;
      const h = CELL - 24;
      const g = b.createLinearGradient(x, y, x, y + h);
      g.addColorStop(0, "#9db3c9");
      g.addColorStop(1, "#5f7a93");
      b.fillStyle = g;
      b.beginPath();
      b.roundRect(x, y, w, h, 5);
      b.fill();
      if (rnd() < 0.58) {
        l.fillStyle = rnd() < 0.8 ? "#ffcf75" : "#bfe2ff";
        l.beginPath();
        l.roundRect(x, y, w, h, 5);
        l.fill();
      }
    }
  }
  const tb = new THREE.CanvasTexture(base);
  const tl = new THREE.CanvasTexture(lit);
  tb.colorSpace = THREE.SRGBColorSpace;
  tl.colorSpace = THREE.SRGBColorSpace;
  return { base: tb, lit: tl };
}

function faceMat(tint: string, cols: number, rows: number) {
  tiles ??= makeTiles();
  const b = tiles.base.clone();
  const l = tiles.lit.clone();
  for (const t of [b, l]) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(Math.max(1, cols) / 4, Math.max(1, rows) / 4);
    t.anisotropy = 4;
    t.needsUpdate = true;
  }
  return new THREE.MeshStandardMaterial({
    color: tint,
    map: b,
    roughness: 0.45,
    metalness: 0.1,
    emissive: new THREE.Color("#ffffff"),
    emissiveMap: l,
    emissiveIntensity: 0,
  });
}

/** BoxGeometry material array: [+x, -x, +y, -y, +z, -z] with window grids on the sides. */
export function facadeMaterials(w: number, h: number, d: number, tint: string): THREE.Material[] {
  const rows = Math.round(h / 0.62);
  const sideW = faceMat(tint, Math.round(w / 0.62), rows);
  const sideD = faceMat(tint, Math.round(d / 0.62), rows);
  const roof = new THREE.MeshStandardMaterial({ color: new THREE.Color(tint).multiplyScalar(0.8), roughness: 0.8 });
  return [sideD, sideD, roof, roof, sideW, sideW];
}
