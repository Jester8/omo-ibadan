import { ROAD_LINES } from "./world";

export type Light = "green" | "amber" | "red";

const CYCLE = 18;

/** Traffic light at a junction for cars moving along `axis`. East-west and north-south take turns, with a short all-red gap. */
export function lightAt(ix: number, iz: number, axis: "x" | "z", nowSec: number): Light {
  const phase = (((nowSec + (ix + iz) * 0.13) % CYCLE) + CYCLE) % CYCLE;
  const u = axis === "x" ? phase : (phase + CYCLE / 2) % CYCLE;
  if (u < 6.5) return "green";
  if (u < 8) return "amber";
  return "red";
}

/** The junction (road crossing) nearest to a point, if the point is within `reach` of it. */
export function junctionNear(x: number, z: number, reach: number): { ix: number; iz: number } | null {
  const ix = Math.round(x / 10) * 10;
  const iz = Math.round(z / 10) * 10;
  if (!ROAD_LINES.includes(ix) || !ROAD_LINES.includes(iz)) return null;
  return Math.abs(x - ix) < reach && Math.abs(z - iz) < reach ? { ix, iz } : null;
}
