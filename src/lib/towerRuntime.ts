import { cam, me } from "./playerState";
import { PLACES, doorOf } from "./places";
import { rt, fadeThen } from "./interiorRuntime";
import { getWorldGrid, setActiveGrid } from "./pathing";
import { blockedReason } from "./services";
import { useGame } from "./store";

/**
 * Bower's Tower: climbing, the viewing deck, coming down.
 * interiorRuntime.ts re-exports DECK_Y, climbTower, goUpDeck and leaveDeck, so existing imports keep working.
 */
/** Bower's Tower: the viewing deck sits at the top of the shaft. */
export const DECK_Y = 3.72;
const DECK_R = 1.05;
const tower = () => PLACES.find((p) => p.id === "bowers")!;

/** The camera before the climb, so coming down puts it back where it was. */
let before: { dist: number; el: number } | null = null;
/** The one pending climb: cancelled by cancelDeck so a logout mid-ascent leaves no deck behind. */
let ascent: ReturnType<typeof setTimeout> | null = null;
let retry: ReturnType<typeof setTimeout> | null = null;

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
  before = { dist: cam.dist, el: cam.el };
  cam.dist = 30;
  cam.el = 0.45;
  cam.focus = null;
  cam.spin = false;
  useGame.setState({ interior: null, atPlace: null, deck: true, selected: null, driving: false });
}

/** Go up to the deck. While a fade is running (a door was just used) it tries again a moment later instead of silently doing nothing. */
export function goUpDeck(tries = 0) {
  const s = useGame.getState();
  if (s.deck) return;
  if (s.fade) {
    if (tries < 10) retry = setTimeout(() => goUpDeck(tries + 1), 120);
    return;
  }
  fadeThen(arriveOnDeck);
}

/** Pay the tower fee, spend a moment on the stairs, and arrive at the top. */
export function climbTower() {
  const s = useGame.getState();
  if (!s.profile || s.fade || s.deck || ascent) return;
  const why = blockedReason();
  if (why) return void s.toast(why, "bad");
  const a = tower().actions[0];
  const err = s.runAction(a);
  if (err) {
    s.toast(err, "bad");
    return;
  }
  s.recordStat("climbed");
  ascent = setTimeout(() => {
    ascent = null;
    goUpDeck();
  }, a.secs * 1000 + 100);
}

/** The ground beside the tower's door: the nearest free spot, never inside the tower or a parked keke. */
function landing(): { x: number; z: number } {
  const t = tower();
  const d = doorOf(t);
  return getWorldGrid().nearestFreePoint(d.x, d.z) ?? d;
}

export function leaveDeck() {
  const s = useGame.getState();
  if (s.fade || !s.deck) return;
  fadeThen(() => {
    const p = landing();
    me.x = p.x;
    me.z = p.z;
    me.ry = 0;
    me.path = [];
    cam.dist = before?.dist ?? 18;
    cam.el = before?.el ?? 0.85;
    before = null;
    cam.focus = null;
    cam.spin = false;
    useGame.setState({ deck: false });
  });
}

/** Drops any climb in progress and puts the player back on the ground (logout, forceExit). */
export function cancelDeck() {
  if (ascent) clearTimeout(ascent);
  if (retry) clearTimeout(retry);
  ascent = null;
  retry = null;
  if (!useGame.getState().deck) return;
  const p = landing();
  me.x = p.x;
  me.z = p.z;
  me.path = [];
  cam.dist = before?.dist ?? 18;
  cam.el = before?.el ?? 0.85;
  before = null;
  cam.focus = null;
  cam.spin = false;
  useGame.setState({ deck: false });
}
