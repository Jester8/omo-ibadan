import { FURN, S } from "./furniture";
import { buildInteriorGrid, spawnOf, type InteriorRef, type Layout } from "./interiors";
import { FLAT, layoutFor } from "./layouts";
import { Grid, findPath, setActiveGrid } from "./pathing";
import { cam, me } from "./playerState";
import { naira } from "./plots";
import { useGame } from "./store";
import { nepaOut } from "./time";
import { audio } from "./audio";
import { withDecor } from "./decor";

/** Everything about the interior the player is standing in (kept outside React). */
export const rt = {
  layout: null as Layout | null,
  grid: null as Grid | null,
  ref: null as InteriorRef | null,
  savedDist: 24,
};

const plotInfo = (id: string) => {
  const p = useGame.getState().plots[id];
  return p ? { tier: p.tier, ownerId: p.ownerId, ownerName: p.ownerName } : undefined;
};

/** The player's own home: their best built house, or the rented flat everyone starts with. */
export function homeRef(): InteriorRef {
  const s = useGame.getState();
  const mine = Object.entries(s.plots)
    .filter(([, p]) => p.ownerId === s.profile?.id && p.tier >= 1)
    .sort((a, b) => b[1].tier - a[1].tier);
  return mine.length ? { kind: "home", id: mine[0][0] } : { kind: "home", id: FLAT.id };
}

/** The layout for a room, with the viewer's own decor added to homes they own. */
export function loadLayout(ref: InteriorRef): Layout | null {
  const base = layoutFor(ref, plotInfo);
  if (!base || ref.kind !== "home") return base;
  const s = useGame.getState();
  const mine = ref.id === FLAT.id || s.plots[ref.id]?.ownerId === s.profile?.id;
  return mine ? withDecor(base, s.decor[ref.id] ?? []) : base;
}

/** Rebuild the current room after its decor changed. */
export function refreshInterior() {
  const ref = rt.ref;
  if (!ref) return;
  const layout = loadLayout(ref);
  if (!layout) return;
  rt.layout = layout;
  rt.grid = buildInteriorGrid(layout);
  setActiveGrid(rt.grid);
}

const sameRef = (a: InteriorRef | null, b: InteriorRef) => !!a && a.kind === b.kind && a.id === b.id;

function fadeThen(fn: () => void) {
  useGame.setState({ fade: true });
  setTimeout(() => {
    fn();
    setTimeout(() => useGame.setState({ fade: false }), 140);
  }, 260);
}

export const powerOn = () => !nepaOut(Date.now()) || useGame.getState().generatorUntil > Date.now();

export function enterInterior(ref: InteriorRef): boolean {
  const s = useGame.getState();
  if (!s.profile || s.fade) return false;
  if (s.busy) {
    s.toast("Finish what you're doing first.", "info");
    return false;
  }
  if (sameRef(s.interior, ref)) return true;
  const layout = loadLayout(ref);
  if (!layout) {
    s.toast("That door is locked.", "bad");
    return false;
  }
  fadeThen(() => {
    const was = useGame.getState().interior;
    if (!was) me.worldReturn = { x: me.x, z: me.z };
    rt.layout = layout;
    rt.grid = buildInteriorGrid(layout);
    rt.ref = ref;
    if (!was) rt.savedDist = cam.dist;
    setActiveGrid(rt.grid);
    const [sx, sz] = spawnOf(layout);
    me.x = sx * S;
    me.z = sz * S;
    me.ry = Math.PI;
    me.path = [];
    me.goalPlace = null;
    me.ride = false;
    me.use = null;
    me.pendingUse = null;
    me.pendingExit = false;
    // phones are tall and narrow: pull back so the whole room fits above the bottom panel
    const aspect = typeof window !== "undefined" ? Math.min(1.7, window.innerWidth / Math.max(1, window.innerHeight)) : 1.6;
    const fit = (Math.max(layout.w, layout.d) * S) / (0.536 * aspect) * 0.8;
    cam.dist = Math.min(28, Math.max(8, fit));
    useGame.setState({ driving: false, interior: ref, selected: null, atPlace: ref.kind === "place" ? ref.id : null });
    useGame.getState().recordStat("entered");
  });
  return true;
}

export function exitInterior() {
  const s = useGame.getState();
  if (!s.interior || s.fade) return;
  if (s.busy) {
    s.toast("Finish what you're doing first.", "info");
    return;
  }
  fadeThen(() => {
    const back = me.worldReturn ?? { x: 0.5, z: 8.2 };
    me.x = back.x;
    me.z = back.z;
    me.ry = 0;
    me.path = [];
    me.use = null;
    me.pendingUse = null;
    me.pendingExit = false;
    setActiveGrid(null);
    rt.layout = null;
    rt.grid = null;
    rt.ref = null;
    cam.dist = rt.savedDist;
    useGame.setState({ interior: null, atPlace: null });
  });
}

/** Walk to the exit mat; the player leaves on arrival. */
export function walkToExit() {
  const l = rt.layout;
  if (!l) return;
  const s = useGame.getState();
  if (s.busy) {
    s.toast("Finish what you're doing first.", "info");
    return;
  }
  const path = findPath(me.x, me.z, l.exitX * S, (l.d / 2 - 0.5) * S);
  if (!path) return;
  me.path = path;
  me.pendingExit = true;
  me.pendingUse = null;
}

export function walkToFurn(index: number): boolean {
  const l = rt.layout;
  const it = l?.items[index];
  if (!l || !it || !FURN[it.kind].use) return false;
  const s = useGame.getState();
  if (s.busy) {
    s.toast("Finish what you're doing first.", "info");
    return false;
  }
  const path = findPath(me.x, me.z, it.x * S, it.z * S);
  if (!path) return false;
  me.path = path;
  me.pendingUse = index;
  me.pendingExit = false;
  return true;
}

export const GENERATOR_FUEL = 800;

/** Called when the player reaches the furniture they clicked. */
export function startUse(index: number) {
  const it = rt.layout?.items[index];
  if (!it) return;
  const def = FURN[it.kind].use;
  if (!def) return;
  const s = useGame.getState();
  if (def.needsPower && !powerOn()) {
    s.toast("No light. Fuel the generator or wait for NEPA.", "bad");
    return;
  }
  if (def.special === "generator") {
    if (s.money < GENERATOR_FUEL) {
      s.toast(`Fuel costs ${naira(GENERATOR_FUEL)}.`, "bad");
      return;
    }
    useGame.setState({ money: s.money - GENERATOR_FUEL, generatorUntil: Math.max(Date.now(), s.generatorUntil) + 5 * 60 * 1000 });
    s.toast(`Generator running for 5 minutes · −${naira(GENERATOR_FUEL)}`, "good");
    return;
  }
  const action = it.action ?? def.action;
  if (!action) return;
  const sleeping = def.pose === "lie";
  const half = sleeping && nepaOut(Date.now()) && s.generatorUntil <= Date.now();
  const err = s.runAction(action, { gainScale: half ? 0.5 : 1 });
  if (err) {
    s.toast(err, "bad");
    return;
  }
  if (def.pose) {
    me.use = { pose: def.pose, x: it.x * S, z: it.z * S, ry: it.rot ?? 0, seatH: def.seatH ?? 0.45, standX: me.x, standZ: me.z };
  }
  if (action.id === "drum") audio.drum();
  s.recordStat("used");
  if (sleeping && action.id === "sleep") s.recordStat("slept");
}

/** Stand back up after a seated or sleeping action finishes. */
export function endUse() {
  if (!me.use) return;
  me.x = me.use.standX;
  me.z = me.use.standZ;
  me.use = null;
}
