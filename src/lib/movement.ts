import { doorOf, PLACES } from "./places";
import { findPath } from "./pathing";
import { me } from "./playerState";
import { useGame } from "./store";

/** Click-to-move: A* path from where the player stands to (x, z). */
export function walkTo(x: number, z: number): boolean {
  const s = useGame.getState();
  if (!s.profile) return false;
  if (s.busy) {
    s.toast("Finish what you're doing first.", "info");
    return false;
  }
  const path = findPath(me.x, me.z, x, z);
  if (!path) return false;
  me.path = path;
  me.goalPlace = null;
  me.ride = false;
  return true;
}

export function walkToPlace(id: string): boolean {
  const place = PLACES.find((p) => p.id === id);
  const s = useGame.getState();
  if (!place || !s.profile) return false;
  if (s.atPlace === id) return true;
  if (s.busy) return false;
  const door = doorOf(place);
  const path = findPath(me.x, me.z, door.x, door.z);
  if (!path) return false;
  me.path = path;
  me.goalPlace = id;
  me.ride = false;
  return true;
}

export const KEKE_FARE = 300;

/** Hop in a keke: same route as walking, at speed, for a fare. */
export function rideToPlace(id: string): boolean {
  const s = useGame.getState();
  if (s.money < KEKE_FARE) {
    s.toast(`A keke costs ₦${KEKE_FARE}.`, "bad");
    return false;
  }
  if (s.atPlace === id) return true;
  if (!walkToPlace(id)) return false;
  me.ride = true;
  useGame.setState({ money: s.money - KEKE_FARE });
  s.toast(`Keke! −₦${KEKE_FARE}`, "info");
  return true;
}

export function stopWalking() {
  me.path = [];
  me.goalPlace = null;
  me.ride = false;
}
