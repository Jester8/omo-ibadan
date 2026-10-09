import { ALL_PLACE_LAYOUT_IDS, bizLayout, homeLayout, placeLayout } from "../src/lib/layouts";
import { BUSINESSES } from "../src/lib/business";
import { buildInteriorGrid, footprint, spawnOf, type Layout } from "../src/lib/interiors";
import { DECOR, withDecor } from "../src/lib/decor";
import { FURN, S } from "../src/lib/furniture";

const layouts: Layout[] = [
  ...ALL_PLACE_LAYOUT_IDS.map((id) => placeLayout(id)!),
  // players' businesses: a gym with gym kit, a salon with chairs and mirrors...
  ...BUSINESSES.map((b) => ({ ...bizLayout(b.id, "Test"), id: `biz-${b.id}` })),
  homeLayout("flat", "x"),
  homeLayout(1, "a", "Mama Bisi"),
  homeLayout(2, "b", "Alhaji"),
  homeLayout(3, "c", "Chief"),
];
// every home with the full decor set (3 of each) must stay walkable
const allDecor = DECOR.flatMap((d) => [d.id, d.id, d.id]);
for (const l of [...layouts.slice(-4)]) layouts.push({ ...withDecor(l, allDecor), id: `${l.id}+decor` });

let bad = 0;
/** where the player is sent to use an item (same rule as standPoint in interiorRuntime.ts): service desks are approached from the front */
const standOf = (it: Layout["items"][number]): [number, number] => {
  if (it.kind !== "servicedesk") return [it.x, it.z];
  const r = it.rot ?? 0;
  const off = (it.d ?? FURN.servicedesk.d) / 2 + 0.5;
  return [it.x + Math.sin(r) * off, it.z + Math.cos(r) * off];
};
for (const l of layouts) {
  const g = buildInteriorGrid(l);
  // the normal spawn, plus the cells of a custodial centre (a prisoner starts in their cell)
  const spawns: [number, number][] = [spawnOf(l), ...(l.cells?.map((c) => c.spawn) ?? [])];
  const [sx, sz] = spawns[0];
  const problems: string[] = [];
  for (const [x, z] of spawns) if (g.isBlockedAt(x * S, z * S)) problems.push(`spawn blocked at ${x},${z}`);
  /** the point nearest to (x, z) that a player starting at `from` can reach, and how far (in metres) it is from the target */
  const reach = (from: [number, number], x: number, z: number) => {
    const path = g.find(from[0] * S, from[1] * S, x * S, z * S);
    if (!path) return null;
    const end = path.length ? path[path.length - 1] : { x: from[0] * S, z: from[1] * S };
    return { end, gap: Math.hypot(end.x - x * S, end.z - z * S) / S };
  };
  for (const it of l.items) {
    const fp = footprint(it);
    if (Math.abs(it.x) + fp.w / 2 > l.w / 2 + 0.05 || Math.abs(it.z) + fp.d / 2 > l.d / 2 + 0.05) {
      if (it.kind !== "stage" && it.kind !== "pitch" && it.kind !== "rug") problems.push(`${it.kind}@${it.x},${it.z} out of bounds`);
    }
    if (FURN[it.kind].use) {
      // usable if it can be reached from ANY spawn (a prisoner's bunk is reached from the cell, the bail desk from the hall)
      const [tx, tz] = standOf(it);
      const best = spawns.map((sp) => reach(sp, tx, tz)).filter((r): r is NonNullable<typeof r> => !!r).sort((a, b) => a.gap - b.gap)[0];
      if (!best) problems.push(`unreachable: ${it.kind}@${it.x},${it.z}`);
      else {
        const gap = Math.hypot(best.end.x - it.x * S, best.end.z - it.z * S) / S;
        if (gap > Math.max(fp.w, fp.d) / 2 + 1.4) problems.push(`too far to use: ${it.kind}@${it.x},${it.z} (${gap.toFixed(1)}m)`);
        // a service desk must be reached on its customer side: the walker stops within 0.8 m of the point in front of it
        if (it.kind === "servicedesk" && best.gap > 0.8) problems.push(`service desk @${it.x},${it.z}: the customer side is not reachable (${best.gap.toFixed(1)}m short)`);
      }
    }
  }
  // a custodial centre keeps people in and visitors out of the cells
  if (l.cells?.length) {
    for (const c of l.cells) {
      const r = reach(c.spawn, l.exitX, l.d / 2 - 0.5);
      if (!r || r.gap < 3) problems.push(`cell at ${c.spawn} can get within ${r ? r.gap.toFixed(1) : "?"}m of the exit (must be 3m or more)`);
    }
    for (const it of l.items.filter((i) => i.kind === "singlebed" || i.kind === "toilet")) {
      const r = reach([sx, sz], it.x, it.z);
      if (!r || r.gap < 3) problems.push(`a visitor can get within ${r ? r.gap.toFixed(1) : "?"}m of the ${it.kind} at ${it.x},${it.z} (must be 3m or more)`);
    }
  }
  const solids = l.items.filter((it) => FURN[it.kind].solid);
  for (let a = 0; a < solids.length; a++) {
    for (let b = a + 1; b < solids.length; b++) {
      const A = solids[a];
      const B = solids[b];
      const fa = footprint(A);
      const fb = footprint(B);
      const ox = Math.min(A.x + fa.w / 2, B.x + fb.w / 2) - Math.max(A.x - fa.w / 2, B.x - fb.w / 2);
      const oz = Math.min(A.z + fa.d / 2, B.z + fb.d / 2) - Math.max(A.z - fa.d / 2, B.z - fb.d / 2);
      if (ox > 0.12 && oz > 0.12 && ox * oz > 0.1) problems.push(`overlap: ${A.kind}@${A.x.toFixed(1)},${A.z.toFixed(1)} with ${B.kind}@${B.x.toFixed(1)},${B.z.toFixed(1)}`);
    }
  }
  console.log(`${problems.length ? "✗" : "✓"} ${l.id.padEnd(14)} ${l.w}x${l.d}  items:${l.items.length} walls:${l.walls.length}${problems.length ? "\n    " + problems.join("\n    ") : ""}`);
  bad += problems.length;
}
console.log(bad ? `\n${bad} problem(s)` : "\nAll interiors look sound.");
process.exit(bad ? 1 : 0);
