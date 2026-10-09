import { cam, me } from "./playerState";
import { PLACES } from "./places";
import { rt, fadeThen } from "./interiorRuntime";
import { setActiveGrid } from "./pathing";
import { useGame } from "./store";

/**
 * Bower's Tower: climbing, the viewing deck, coming down. Moved out of interiorRuntime.ts verbatim in Phase 0; owned by the TW (tower) agent from Phase 1.
 * interiorRuntime.ts re-exports DECK_Y, climbTower, goUpDeck and leaveDeck, so existing imports keep working.
 */
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
  setTimeout(goUpDeck, a.secs * 1000 + 100);
}

export function leaveDeck() {
  const s = useGame.getState();
  if (s.fade || !s.deck) return;
  fadeThen(() => {
    const t = tower();
    me.x = t.pos[0];
    me.z = t.pos[1] + t.size[2] / 2 + 0.9;
    me.ry = 0;
    cam.dist = 18;
    cam.el = 0.85;
    cam.focus = null;
    cam.spin = false;
    useGame.setState({ deck: false });
  });
}


/** Drops any climb in progress and puts the player back on the ground (logout, forceExit). Phase 0 stub: the TW agent makes it cancel timers and animations. */
export function cancelDeck() {
  useGame.setState({ deck: false });
}
