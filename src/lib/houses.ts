import { PLACES } from "./places";
import { PLOTS, PLOT_SIZE } from "./plots";
import { RANKS } from "./ranks";
import { AD_PLAZA, BLOCKS, CAMPUS, ESTATES, inLake, inRect } from "./world";

/** Ibadan's famous sea of brown corrugated roofs: small gabled houses filling the free lots. */
const BROWN = ["#6b3f26", "#7a4a2c", "#5e3720", "#84502f", "#70432a", "#654026", "#7d4b30"];
const WALLS = ["#efe3cc", "#e8d9bd", "#f4ead7", "#d9c8a8", "#e6d3b3"];

export type House = { /** the block this house stands in */ bx: number; bz: number; x: number; z: number; w: number; d: number; h: number; ry: number; roof: string; wall: string };

export function buildHouses(): House[] {
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const taken = [
    ...PLACES.map((p) => ({ x: p.pos[0], z: p.pos[1], hw: p.size[0] / 2 + 1.1, hd: p.size[2] / 2 + 1.7 })),
    ...PLOTS.map((p) => ({ x: p.pos[0], z: p.pos[1], hw: PLOT_SIZE / 2 + 0.6, hd: PLOT_SIZE / 2 + 0.6 })),
    ...RANKS.map((r) => ({ x: r.pos[0], z: r.pos[1], hw: 4.2, hd: 2 })),
    // the Ad Plaza is paved: no houses on it
    { x: AD_PLAZA.x, z: AD_PLAZA.z, hw: AD_PLAZA.half + 0.4, hd: AD_PLAZA.half + 0.4 },
  ];
  const out: House[] = [];
  for (const b of BLOCKS) {
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (rnd() < 0.3) continue;
        const x = b.c[0] + i * 1.75 + (rnd() - 0.5) * 0.35;
        const z = b.c[1] + j * 1.75 + (rnd() - 0.5) * 0.35;
        if (taken.some((t) => Math.abs(x - t.x) < t.hw && Math.abs(z - t.z) < t.hd)) continue;
        // estates and the campus keep their own, more formal look
        if (inRect(CAMPUS.rect, x, z, 0.5) || ESTATES.some((e) => inRect(e.rect, x, z, 0.5)) || inLake(x, z)) continue;
        out.push({ bx: b.c[0], bz: b.c[1], x, z, w: 0.95 + rnd() * 0.5, d: 0.8 + rnd() * 0.4, h: 0.34 + rnd() * 0.18, ry: rnd() < 0.5 ? 0 : Math.PI / 2, roof: BROWN[Math.floor(rnd() * BROWN.length)], wall: WALLS[Math.floor(rnd() * WALLS.length)] });
      }
    }
  }
  return out;
}

/** Every small house in the city, shared by the drawing (Roofscape) and the walkability grid, so what you see is what stops you. */
export const HOUSES: House[] = buildHouses();

