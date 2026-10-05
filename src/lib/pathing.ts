import { PLACES, isSolid } from "./places";
import { PLOTS } from "./plots";

const MIN = -27;
const N = 54; // 1-unit cells covering -27..27
const MARGIN = 0.45;

let blocked = new Uint8Array(N * N);

const cell = (v: number) => Math.floor(v - MIN);
const center = (i: number) => MIN + i + 0.5;
const inside = (i: number, j: number) => i >= 0 && j >= 0 && i < N && j < N;

function baseRects() {
  return PLACES.filter(isSolid).map((p) => ({ x: p.pos[0], z: p.pos[1], w: p.size[0], d: p.size[2] }));
}

/** Rebuild the walkability grid. `builtPlots` are plot ids that have a house on them. */
export function rebuildGrid(builtPlots: Iterable<string>) {
  const grid = new Uint8Array(N * N);
  const rects = baseRects();
  const built = new Set(builtPlots);
  for (const p of PLOTS) if (built.has(p.id)) rects.push({ x: p.pos[0], z: p.pos[1], w: 1.9, d: 1.9 });
  for (const r of rects) {
    const x0 = cell(r.x - r.w / 2 - MARGIN);
    const x1 = cell(r.x + r.w / 2 + MARGIN);
    const z0 = cell(r.z - r.d / 2 - MARGIN);
    const z1 = cell(r.z + r.d / 2 + MARGIN);
    for (let i = x0; i <= x1; i++) for (let j = z0; j <= z1; j++) if (inside(i, j)) grid[j * N + i] = 1;
  }
  blocked = grid;
}

rebuildGrid([]);

export const isBlockedAt = (x: number, z: number) => {
  const i = cell(x);
  const j = cell(z);
  return !inside(i, j) || blocked[j * N + i] === 1;
};

function nearestFree(i: number, j: number): [number, number] | null {
  if (inside(i, j) && !blocked[j * N + i]) return [i, j];
  for (let r = 1; r < 12; r++) {
    for (let di = -r; di <= r; di++) {
      for (let dj = -r; dj <= r; dj++) {
        if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue;
        const a = i + di;
        const b = j + dj;
        if (inside(a, b) && !blocked[b * N + a]) return [a, b];
      }
    }
  }
  return null;
}

export type Pt = { x: number; z: number };

/** A* over the 8-connected grid. Returns world waypoints (excluding the start). */
export function findPath(sx: number, sz: number, tx: number, tz: number): Pt[] | null {
  const s = nearestFree(cell(sx), cell(sz));
  const t = nearestFree(cell(tx), cell(tz));
  if (!s || !t) return null;
  const start = s[1] * N + s[0];
  const goal = t[1] * N + t[0];
  const g = new Float32Array(N * N).fill(Infinity);
  const from = new Int32Array(N * N).fill(-1);
  const closed = new Uint8Array(N * N);
  const open: [number, number][] = []; // [f, idx] kept sorted (small grid)
  g[start] = 0;
  open.push([0, start]);
  const h = (idx: number) => {
    const dx = Math.abs((idx % N) - (goal % N));
    const dz = Math.abs(Math.floor(idx / N) - Math.floor(goal / N));
    return Math.max(dx, dz) + 0.414 * Math.min(dx, dz);
  };
  while (open.length) {
    let best = 0;
    for (let k = 1; k < open.length; k++) if (open[k][0] < open[best][0]) best = k;
    const [, cur] = open.splice(best, 1)[0];
    if (cur === goal) break;
    if (closed[cur]) continue;
    closed[cur] = 1;
    const ci = cur % N;
    const cj = Math.floor(cur / N);
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (!di && !dj) continue;
        const ni = ci + di;
        const nj = cj + dj;
        if (!inside(ni, nj) || blocked[nj * N + ni]) continue;
        if (di && dj && (blocked[cj * N + ni] || blocked[nj * N + ci])) continue;
        const n = nj * N + ni;
        const cost = g[cur] + (di && dj ? 1.414 : 1);
        if (cost < g[n]) {
          g[n] = cost;
          from[n] = cur;
          open.push([cost + h(n), n]);
        }
      }
    }
  }
  if (from[goal] === -1 && goal !== start) return null;
  const pts: Pt[] = [];
  for (let c = goal; c !== start && c !== -1; c = from[c]) pts.push({ x: center(c % N), z: center(Math.floor(c / N)) });
  pts.reverse();
  // string-pull: drop waypoints that sit on a straight clear line
  const out: Pt[] = [];
  let anchor: Pt = { x: sx, z: sz };
  for (let k = 0; k < pts.length; k++) {
    const next = pts[k + 1];
    if (next && lineClear(anchor, next)) continue;
    out.push(pts[k]);
    anchor = pts[k];
  }
  return out;
}

function lineClear(a: Pt, b: Pt): boolean {
  const dist = Math.hypot(b.x - a.x, b.z - a.z);
  const steps = Math.ceil(dist / 0.3);
  for (let k = 1; k < steps; k++) {
    const f = k / steps;
    if (isBlockedAt(a.x + (b.x - a.x) * f, a.z + (b.z - a.z) * f)) return false;
  }
  return true;
}
