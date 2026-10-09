import type { PokeKind, PokeMode, S2C } from "./protocol";
import type { PokeAlert } from "./socialState";
import type { ActionResult } from "./socialApi";

/* Poke owner replaces every body. */
/** Is this player (a connection id from `remotes`) close enough to poke, and in the same room? */
export const nearEnough = (peerId: string): boolean => { void peerId; return false; };
/** Local checks, then the websocket message. The answer comes back as onPokeAck. */
export function sendPoke(peerId: string, kind: PokeKind): ActionResult { void peerId; void kind; return { ok: false, message: "Not ready." }; }
export function setPokeMode(mode: PokeMode): void { void mode; }
export function onPoked(m: Extract<S2C, { t: "poked" }>): void { void m; }
export function onPokeAck(m: Extract<S2C, { t: "pokeAck" }>): void { void m; }
export function onPokeFx(m: Extract<S2C, { t: "pokeFx" }>): void { void m; }
export function onPokeMode(mode: PokeMode): void { void mode; }
export function dismissPokeAlert(id: number): void { void id; }
/** One tap: report the one who poked or hit me to the police ("assault" after a hit, "harassment" after repeated pokes). */
export async function reportPoke(alert: PokeAlert): Promise<ActionResult> { void alert; return { ok: false, message: "Not ready." }; }
