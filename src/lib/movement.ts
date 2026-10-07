import { doorOf, PLACES } from "./places";
import { findPath } from "./pathing";
import { me } from "./playerState";
import { useGame } from "./store";
import { rideById, rideFare, type RideId } from "./cars";
import { audio } from "./audio";

/** Click-to-move: A* path from where the player stands to (x, z). */
export function walkTo(x: number, z: number): boolean {
  const s = useGame.getState();
  if (!s.profile) return false;
  if (s.deck) return false;
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

/** Length of a path in metres (1 world unit = 25 m). */
export const pathMetres = (from: { x: number; z: number }, path: { x: number; z: number }[]) => {
  let d = 0;
  let px = from.x;
  let pz = from.z;
  for (const p of path) {
    d += Math.hypot(p.x - px, p.z - pz);
    px = p.x;
    pz = p.z;
  }
  return d * 25;
};

/** What a hired ride to this place would cost right now, or null if there is no route. */
export function quoteRide(id: string, ride: RideId): { fare: number; metres: number } | null {
  const place = PLACES.find((p) => p.id === id);
  if (!place) return null;
  const door = doorOf(place);
  const path = findPath(me.x, me.z, door.x, door.z);
  if (!path) return null;
  const metres = pathMetres(me, path);
  const free = ride === "keke" && useGame.getState().election?.governor?.policy === "transport";
  return { fare: free ? 0 : rideFare(ride, metres), metres };
}

/** Pay the driver; the vehicle carries you along the same route, at its own speed. */
export function rideToPlace(id: string, ride: RideId): boolean {
  const s = useGame.getState();
  const q = quoteRide(id, ride);
  if (!q) return false;
  if (s.atPlace === id) return true;
  if (s.money < q.fare) {
    s.toast(`A ${rideById(ride)!.name} there costs ₦${q.fare}.`, "bad");
    return false;
  }
  if (!walkToPlace(id)) return false;
  me.ride = true;
  useGame.setState({ money: s.money - q.fare, ride, driving: false });
  s.toast(q.fare ? `${rideById(ride)!.name} on the way! −₦${q.fare}` : "Free keke, courtesy of the Governor!", "info");
  audio.coin();
  return true;
}

/** Drive one of your own cars there: you take the wheel and follow the route at the car's speed. */
export function driveToPlace(id: string, carId: string): boolean {
  const s = useGame.getState();
  if (s.atPlace === id) return true;
  if (!(s.driving && s.activeCar === carId)) {
    const err = s.toggleDrive(carId);
    if (err) {
      s.toast(err, "bad");
      return false;
    }
  }
  return walkToPlace(id);
}

export function stopWalking() {
  me.path = [];
  me.goalPlace = null;
  me.ride = false;
}
