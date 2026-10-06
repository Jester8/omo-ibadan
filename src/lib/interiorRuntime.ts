import { FURN, S } from "./furniture";
import { buildInteriorGrid, spawnOf, type InteriorRef, type Layout } from "./interiors";
import { FLAT, layoutFor } from "./layouts";
import { Grid, findPath, setActiveGrid } from "./pathing";
import { cam, me } from "./playerState";
import { naira } from "./plots";
import { useGame } from "./store";
import { nepaOut } from "./time";
import { audio } from "./audio";
import { PLACES } from "./places";
import { isOpen, opensAt } from "./events";
import { gameMinutes } from "./time";
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
  // houses show whatever the owner placed, to every visitor; the flat is yours alone
  const ids = ref.id === FLAT.id ? s.decor[ref.id] : s.plots[ref.id]?.decor ?? (s.plots[ref.id]?.ownerId === s.profile?.id ? s.decor[ref.id] : undefined);
  return withDecor(base, ids ?? []);
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
  if (s.deck) {
    s.toast("Climb down from the tower first.", "info");
    return false;
  }
  if (ref.kind === "place" && !isOpen(ref.id, gameMinutes(Date.now(), s.clockOverride) / 60)) {
    s.toast(`Closed for now. Opens at ${opensAt(ref.id)}.`, "info");
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

/** Bower's Tower: the viewing deck sits at the top of the shaft. */
export const DECK_Y = 3.72;
const DECK_R = 1.05;
const tower = () => PLACES.find((p) => p.id === "bowers")!;

function arriveOnDeck() {
  const t = tower();
  me.x = t.pos[0];
  me.z = t.pos[1] + DECK_R;
  me.ry = 0;
  me.path = [];
  me.use = null;
  me.pendingUse = null;
  me.pendingExit = false;
  me.goalPlace = null;
  setActiveGrid(null);
  rt.layout = null;
  rt.grid = null;
  rt.ref = null;
  cam.dist = 30;
  cam.el = 0.45;
  cam.focus = null;
  cam.spin = false;
  useGame.setState({ interior: null, atPlace: null, deck: true, selected: null, driving: false });
}

export function goUpDeck() {
  const s = useGame.getState();
  if (s.fade || s.deck) return;
  fadeThen(arriveOnDeck);
}

/** Pay the tower fee, spend a moment on the stairs, and arrive at the top. */
export function climbTower() {
  const s = useGame.getState();
  const a = PLACES.find((p) => p.id === "bowers")!.actions[0];
  const err = s.runAction(a);
  if (err) {
    s.toast(err, "bad");
    return;
  }
  setTimeout(goUpDeck, a.secs * 1000 + 200);
}

export function leaveDeck() {
  const s = useGame.getState();
  if (s.fade || !s.deck) return;
  fadeThen(() => {
    const t = tower();
    me.x = t.pos[0];
    me.z = t.pos[1] + t.size[2] / 2 + 0.9;
    me.ry = 0;
    cam.dist = 14;
    cam.el = 0.85;
    cam.focus = null;
    cam.spin = false;
    useGame.setState({ deck: false });
  });
}

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
  if (def.special === "eat") {
    if (rt.ref?.kind !== "home") {
      s.toast("Order at the counter to eat here.", "info");
      return;
    }
    const err = s.runAction({ id: "eatmeal", label: "Eat a meal", secs: 5, plates: -1, gain: { hunger: 55, fun: 4 } });
    if (err) s.toast(err, "bad");
    else s.recordStat("used");
    return;
  }
  if (def.special === "computer") {
    useGame.setState({ computer: true });
    return;
  }
  if (def.special === "deck") {
    climbTower();
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
