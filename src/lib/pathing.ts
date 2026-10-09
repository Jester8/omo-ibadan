import { CAMPUS, ESTATES, ESTATE_SOLIDS, WORLD_HALF, wallsFor } from "./world";
import { PLACES, isSolid } from "./places";
import { PLOTS } from "./plots";

export type Pt = { x: number; z: number };

/**
 * A walkability grid with A* path search. One grid covers the city; every interior builds its own
 * (small, finer) grid. `setActiveGrid` switches which one movement and click-to-walk use.
 */
export class Grid {
  blocked: Uint8Array;
  constructor(
    readonly minX: number,
    readonly minZ: number,
    readonly nx: number,
    readonly nz: number,
    readonly cell: number,
  ) {
    this.blocked = new Uint8Array(nx * nz);
  }

  private ci = (x: number) => Math.floor((x - this.minX) / this.cell);
  private cj = (z: number) => Math.floor((z - this.minZ) / this.cell);
  private cx = (i: number) => this.minX + (i + 0.5) * this.cell;
  private cz = (j: number) => this.minZ + (j + 0.5) * this.cell;
  private inside = (i: number, j: number) => i >= 0 && j >= 0 && i < this.nx && j < this.nz;

  /** Block a centred rectangle, grown by `margin` on every side. */
  blockRect(x: number, z: number, w: number, d: number, margin = 0) {
    const i0 = this.ci(x - w / 2 - margin);
    const i1 = this.ci(x + w / 2 + margin);
    const j0 = this.cj(z - d / 2 - margin);
    const j1 = this.cj(z + d / 2 + margin);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) if (this.inside(i, j)) this.blocked[j * this.nx + i] = 1;
  }

  isBlockedAt(x: number, z: number) {
    const i = this.ci(x);
    const j = this.cj(z);
    return !this.inside(i, j) || this.blocked[j * this.nx + i] === 1;
  }

  /** Nearest free cell to (i, j), searching outwards (used for the start point). */
  private nearestFree(i: number, j: number): [number, number] | null {
    if (this.inside(i, j) && !this.blocked[j * this.nx + i]) return [i, j];
    for (let r = 1; r < 14; r++) {
      for (let di = -r; di <= r; di++) {
        for (let dj = -r; dj <= r; dj++) {
          if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue;
          const a = i + di;
          const b = j + dj;
          if (this.inside(a, b) && !this.blocked[b * this.nx + a]) return [a, b];
        }
      }
    }
    return null;
  }

  /** The centre of the nearest free cell to a spot, or null when none is near (the tower's landing place). */
  nearestFreePoint(x: number, z: number): { x: number; z: number } | null {
    const c = this.nearestFree(this.ci(x), this.cj(z));
    return c ? { x: this.cx(c[0]), z: this.cz(c[1]) } : null;
  }

  /** Cells reachable from `start` (flood fill), so goals never land in a walled-off pocket. */
  private reachableFrom(start: number): Uint8Array {
    const { nx, nz, blocked } = this;
    const seen = new Uint8Array(nx * nz);
    const queue = [start];
    seen[start] = 1;
    for (let q = 0; q < queue.length; q++) {
      const cur = queue[q];
      const ci = cur % nx;
      const cj = Math.floor(cur / nx);
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          if (!di && !dj) continue;
          const ni = ci + di;
          const nj = cj + dj;
          if (!this.inside(ni, nj)) continue;
          const n = nj * nx + ni;
          if (seen[n] || blocked[n]) continue;
          if (di && dj && (blocked[cj * nx + ni] || blocked[nj * nx + ci])) continue;
          seen[n] = 1;
          queue.push(n);
        }
      }
    }
    return seen;
  }

  /** The reachable cell closest to the world point (tx, tz). */
  private nearestReachable(reach: Uint8Array, tx: number, tz: number): number {
    let best = -1;
    let bestD = Infinity;
    for (let n = 0; n < reach.length; n++) {
      if (!reach[n]) continue;
      const dx = this.cx(n % this.nx) - tx;
      const dz = this.cz(Math.floor(n / this.nx)) - tz;
      const d = dx * dx + dz * dz;
      if (d < bestD) {
        bestD = d;
        best = n;
      }
    }
    return best;
  }

  private lineClear(a: Pt, b: Pt): boolean {
    const dist = Math.hypot(b.x - a.x, b.z - a.z);
    const steps = Math.ceil(dist / (this.cell * 0.6));
    for (let k = 1; k < steps; k++) {
      const f = k / steps;
      if (this.isBlockedAt(a.x + (b.x - a.x) * f, a.z + (b.z - a.z) * f)) return false;
    }
    return true;
  }

  /** A* over the 8-connected grid. Returns world waypoints (excluding the start). */
  find(sx: number, sz: number, tx: number, tz: number): Pt[] | null {
    const { nx, nz, blocked } = this;
    const s = this.nearestFree(this.ci(sx), this.cj(sz));
    if (!s) return null;
    const start = s[1] * nx + s[0];
    const goal = this.nearestReachable(this.reachableFrom(start), tx, tz);
    if (goal < 0) return null;
    const g = new Float32Array(nx * nz).fill(Infinity);
    const from = new Int32Array(nx * nz).fill(-1);
    const closed = new Uint8Array(nx * nz);
    const open: [number, number][] = [];
    g[start] = 0;
    open.push([0, start]);
    const h = (idx: number) => {
      const dx = Math.abs((idx % nx) - (goal % nx));
      const dz = Math.abs(Math.floor(idx / nx) - Math.floor(goal / nx));
      return Math.max(dx, dz) + 0.414 * Math.min(dx, dz);
    };
    while (open.length) {
      let best = 0;
      for (let k = 1; k < open.length; k++) if (open[k][0] < open[best][0]) best = k;
      const [, cur] = open.splice(best, 1)[0];
      if (cur === goal) break;
      if (closed[cur]) continue;
      closed[cur] = 1;
      const ci = cur % nx;
      const cj = Math.floor(cur / nx);
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          if (!di && !dj) continue;
          const ni = ci + di;
          const nj = cj + dj;
          if (!this.inside(ni, nj) || blocked[nj * nx + ni]) continue;
          if (di && dj && (blocked[cj * nx + ni] || blocked[nj * nx + ci])) continue;
          const n = nj * nx + ni;
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
    for (let c = goal; c !== start && c !== -1; c = from[c]) pts.push({ x: this.cx(c % nx), z: this.cz(Math.floor(c / nx)) });
    pts.reverse();
    // string-pull: drop waypoints that sit on a straight clear line
    const out: Pt[] = [];
    let anchor: Pt = { x: sx, z: sz };
    for (let k = 0; k < pts.length; k++) {
      const next = pts[k + 1];
      if (next && this.lineClear(anchor, next)) continue;
      out.push(pts[k]);
      anchor = pts[k];
    }
    return out;
  }
}

/* ------------------------------- city grid ------------------------------- */

const MARGIN = 0.45;
let world = new Grid(-WORLD_HALF, -WORLD_HALF, WORLD_HALF * 2, WORLD_HALF * 2, 1);
let active: Grid = world;

function baseRects() {
  return [...PLACES.filter(isSolid).map((p) => ({ x: p.pos[0], z: p.pos[1], w: p.size[0], d: p.size[2] })), ...ESTATE_SOLIDS];
}

const WALLS = [CAMPUS, ...ESTATES].flatMap((z) => wallsFor(z));
let openEstates = new Set<string>();
let lastBuilt: string[] = [];

/** Estates whose boom gates are currently raised for the player. */
export function setOpenEstates(ids: Iterable<string>) {
  const next = new Set(ids);
  if (next.size === openEstates.size && [...next].every((i) => openEstates.has(i))) return;
  openEstates = next;
  rebuildGrid(lastBuilt);
}

/** Rebuild the city walkability grid. `builtPlots` are plot ids that have a house on them. */
export function rebuildGrid(builtPlots: Iterable<string>) {
  lastBuilt = [...builtPlots];
  builtPlots = lastBuilt;
  const grid = new Grid(-WORLD_HALF, -WORLD_HALF, WORLD_HALF * 2, WORLD_HALF * 2, 1);
  const built = new Set(builtPlots);
  const rects = baseRects();
  for (const p of PLOTS) if (built.has(p.id)) rects.push({ x: p.pos[0], z: p.pos[1], w: 1.9, d: 1.9 });
  for (const r of rects) grid.blockRect(r.x, r.z, r.w, r.d, MARGIN);
  for (const w of WALLS) grid.blockRect(w.x, w.z, w.w, w.d, 0.1);
  // closed boom gates are solid
  for (const e of ESTATES) {
    if (openEstates.has(e.id)) continue;
    for (const g of e.gates) grid.blockRect(g.x, g.z, g.across === "z" ? 0.5 : 2.4, g.across === "z" ? 2.4 : 0.5, 0.05);
  }
  const wasActive = active === world;
  world = grid;
  if (wasActive) active = world;
}

rebuildGrid([]);

/** Switch movement between the city (null) and an interior grid. */
export function setActiveGrid(grid: Grid | null) {
  active = grid ?? world;
}

export const getWorldGrid = () => world;
export const isBlockedAt = (x: number, z: number) => active.isBlockedAt(x, z);
export const findPath = (sx: number, sz: number, tx: number, tz: number) => active.find(sx, sz, tx, tz);
/** City pathing regardless of what is active (used by NPCs). */
export const findWorldPath = (sx: number, sz: number, tx: number, tz: number) => world.find(sx, sz, tx, tz);
