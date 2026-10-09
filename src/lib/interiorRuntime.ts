import { FURN, S } from "./furniture";
import { buildInteriorGrid, footprint, interiorKey, spawnOf, type InteriorRef, type Item, type Layout } from "./interiors";
import { net } from "./net";
import { FLAT, layoutFor } from "./layouts";
import { Grid, findPath, setActiveGrid } from "./pathing";
import { cam, me } from "./playerState";
import { naira } from "./plots";
import { useGame } from "./store";
import { nepaOut } from "./time";
import { PLACES } from "./places";
import { isOpen, opensAt } from "./events";
import { gameMinutes } from "./time";
import { withDecor } from "./decor";
import { GEN_MS_PER_LITRE } from "./fuel";
import { beginWardStay } from "./hospital";
import { openService } from "./services";
import { climbTower } from "./towerRuntime";

// Bower's Tower lives in towerRuntime.ts now (the panels and Player.tsx still import these names from here)
export { DECK_Y, climbTower, goUpDeck, leaveDeck } from "./towerRuntime";

/** Everything about the interior the player is standing in (kept outside React). */
export const rt = {
  layout: null as Layout | null,
  grid: null as Grid | null,
  ref: null as InteriorRef | null,
  savedDist: 24,
};

const plotInfo = (id: string) => {
  const p = useGame.getState().plots[id];
  return p ? { tier: p.tier, ownerId: p.ownerId, ownerName: p.ownerName, biz: p.biz } : undefined;
};

/** The player's own home: their best built house (a business is not a home), or the rented flat everyone starts with. */
export function homeRef(): InteriorRef {
  const s = useGame.getState();
  const mine = Object.entries(s.plots)
    .filter(([, p]) => p.ownerId === s.profile?.id && p.tier >= 1 && !p.biz)
    .sort((a, b) => b[1].tier - a[1].tier);
  return mine.length ? { kind: "home", id: mine[0][0] } : { kind: "home", id: FLAT.id };
}

/** The layout for a room, with the viewer's own decor added to homes they own. */
export function loadLayout(ref: InteriorRef): Layout | null {
  const base = layoutFor(ref, plotInfo);
  // a shop, gym or salon keeps its fittings: home decor only goes into houses
  if (!base || ref.kind !== "home" || useGame.getState().plots[ref.id]?.biz) return base;
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

/**
 * The dark curtain between the city and a room. It drops in about 150 ms (a CSS transition, so it stays smooth even while
 * the page is busy), the swap happens under it, and it only lifts once the new room has drawn its first frame, so the
 * work of building the room never shows as stutter. About half a second end to end.
 */
export const FADE_DOWN_MS = 150;
export function fadeThen(fn: () => void) {
  useGame.setState({ fade: true });
  setTimeout(() => {
    fn();
    let lifted = false;
    const lift = () => {
      if (lifted) return;
      lifted = true;
      useGame.setState({ fade: false });
    };
    // two frames: the first renders the new scene (and compiles its shaders), the second shows it
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(() => requestAnimationFrame(lift));
    // a hidden tab never runs animation frames, so do not stay black forever
    setTimeout(lift, 500);
  }, FADE_DOWN_MS);
}

export const powerOn = () => !nepaOut(Date.now()) || useGame.getState().generatorUntil > Date.now();

/** `force`: an arrest. Go in even while busy, on the deck or at closing time, and wait out a fade in progress. `spawn` is in layout metres. */
export type EnterOpts = { force?: boolean; spawn?: [number, number]; returnTo?: { x: number; z: number } };

export function enterInterior(ref: InteriorRef, opts: EnterOpts = {}): boolean {
  const s = useGame.getState();
  if (s.profile && s.custody && !opts.force) {
    s.toast("You are in custody.", "bad");
    return false;
  }
  if (s.profile && opts.force && s.fade) {
    setTimeout(() => enterInterior(ref, opts), 200);
    return true;
  }
  if (!s.profile || s.fade) return false;
  if (s.busy && !opts.force) {
    s.toast("Finish what you're doing first.", "info");
    return false;
  }
  if (s.deck && !opts.force) {
    s.toast("Climb down from the tower first.", "info");
    return false;
  }
  if (ref.kind === "place" && !opts.force && !isOpen(ref.id, gameMinutes(Date.now(), s.clockOverride) / 60)) {
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
    if (opts.returnTo) me.worldReturn = opts.returnTo;
    rt.layout = layout;
    rt.grid = buildInteriorGrid(layout);
    rt.ref = ref;
    if (!was) rt.savedDist = cam.dist;
    setActiveGrid(rt.grid);
    const [sx, sz] = opts.spawn ?? spawnOf(layout);
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
    // the room fills the screen
    const fit = (Math.max(layout.w, layout.d) * S) / (0.536 * aspect) * 0.6;
    cam.dist = Math.min(28, Math.max(10, fit));
    useGame.setState({ driving: false, interior: ref, selected: null, atPlace: ref.kind === "place" ? ref.id : null });
    useGame.getState().recordStat("entered");
  });
  return true;
}

export function exitInterior() {
  const s = useGame.getState();
  if (s.custody) {
    s.toast("You are in custody.", "bad");
    return;
  }
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
    net.sit(null);
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
  if (s.custody) {
    s.toast("You are in custody.", "bad");
    return;
  }
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

/** Where the player is sent to use an item: the item itself, except service desks, which are approached from the front (the customer side), in room units. */
function standPoint(it: Item): { x: number; z: number } {
  if (it.kind !== "servicedesk") return { x: it.x * S, z: it.z * S };
  const r = it.rot ?? 0;
  const off = (it.d ?? FURN.servicedesk.d) / 2 + 0.5;
  return { x: (it.x + Math.sin(r) * off) * S, z: (it.z + Math.cos(r) * off) * S };
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
  const target = standPoint(it);
  const path = findPath(me.x, me.z, target.x, target.z);
  if (!path) return false;
  // the nearest reachable point can be on the far side of a wall or a row of bars: do not walk there and then "use" the item
  const end = path.length ? path[path.length - 1] : { x: me.x, z: me.z };
  const fp = footprint(it);
  if (Math.hypot(end.x - it.x * S, end.z - it.z * S) / S > Math.max(fp.w, fp.d) / 2 + 1.4) {
    s.toast("You can't reach that.", "info");
    return false;
  }
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
  if (def.special === "service") {
    const place = rt.ref?.kind === "place" ? PLACES.find((p) => p.id === rt.ref!.id) : undefined;
    const id = it.service ?? place?.service;
    if (id) {
      const err = openService(id, place?.id ?? rt.ref?.id ?? "", it.variant);
      if (err) s.toast(err, "info");
      return;
    }
    // a desk with an action and no service is a work counter (the food bank's packing desks): run its action below
    if (!(it.action ?? def.action)) {
      s.toast("This desk is not open.", "info");
      return;
    }
  }
  if (def.special === "generator") {
    // petrol from the filling station first (1 L = 5 minutes), the street price if there is none
    if (s.fuel >= 1) {
      useGame.setState({ fuel: s.fuel - 1, generatorUntil: Math.max(Date.now(), s.generatorUntil) + GEN_MS_PER_LITRE });
      s.toast(`Generator running ${GEN_MS_PER_LITRE / 60000} more minutes · 1 L used (${Math.floor(s.fuel - 1)} L left)`, "good");
      return;
    }
    if (s.money < GENERATOR_FUEL) {
      s.toast(`Fuel costs ${naira(GENERATOR_FUEL)}.`, "bad");
      return;
    }
    useGame.setState({ money: s.money - GENERATOR_FUEL, generatorUntil: Math.max(Date.now(), s.generatorUntil) + 5 * 60 * 1000 });
    s.toast(`Generator running for 5 minutes · −${naira(GENERATOR_FUEL)}`, "good");
    return;
  }
  // sitting with people: no action to pay for, just take the seat. Others in the room see you sit.
  const others = Object.values(s.remotes).some((r) => rt.ref && r.room === interiorKey(rt.ref));
  // at home you simply sit as long as you like (and slowly recover); elsewhere sitting costs the usual action
  if (def.pose === "sit" && (others || !(it.action ?? def.action) || rt.ref?.kind === "home")) {
    me.use = { pose: "sit", x: it.x * S, z: it.z * S, ry: it.rot ?? 0, seatH: def.seatH ?? 0.45, standX: me.x, standZ: me.z, free: true };
    net.sit(me.use);
    s.toast(rt.ref?.kind === "home" ? "You sat down. Stay as long as you like. Tap anywhere to stand up." : "You sat down. Tap anywhere to stand up.", "info");
    return;
  }
  // a hospital bed asks the hospital whether you hold a ticket (treatment) or not (the plain ward rest)
  const ward = def.special === "ward" ? beginWardStay(index) : null;
  if (ward === "refuse") return;
  const action = ward?.action ?? it.action ?? def.action;
  if (!action) return;
  const sleeping = def.pose === "lie";
  const half = sleeping && !ward && nepaOut(Date.now()) && s.generatorUntil <= Date.now();
  const err = s.runAction(action, { gainScale: ward?.scale ?? (half ? 0.5 : 1), onDone: ward?.onDone });
  if (err) {
    s.toast(err, "bad");
    return;
  }
  if (def.pose) {
    me.use = { pose: def.pose, x: it.x * S, z: it.z * S, ry: it.rot ?? 0, seatH: def.seatH ?? 0.45, standX: me.x, standZ: me.z };
    net.sit(me.use);
  }
  s.recordStat("used");
  if (sleeping && action.id === "sleep") s.recordStat("slept");
}

/** The host left (or the visit is over): step outside even if you are in the middle of something. */
export function forceExit() {
  const s = useGame.getState();
  if (!s.interior) return;
  if (s.busy) useGame.setState({ busy: null });
  me.use = null;
  exitInterior();
}

/** Stand back up after a seated or sleeping action finishes. */
export function endUse() {
  if (!me.use) return;
  me.x = me.use.standX;
  me.z = me.use.standZ;
  me.use = null;
  net.sit(null);
}
