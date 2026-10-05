import { me } from "./playerState";
import { useGame } from "./store";

const CELL = 12;

/** The street voice room for wherever the player is standing outside. */
export const streetRoom = () => `street:${Math.floor((me.x + 30) / CELL)},${Math.floor((me.z + 30) / CELL)}`;

/** The voice room that matches where the player is right now. */
export function roomHere(): { room: string; label: string } {
  const s = useGame.getState();
  if (s.interior) return { room: s.interior.kind === "place" ? `place:${s.interior.id}` : `home:${s.interior.id}`, label: "this room" };
  if (s.atPlace) return { room: `place:${s.atPlace}`, label: "this place" };
  return { room: streetRoom(), label: "this street" };
}
