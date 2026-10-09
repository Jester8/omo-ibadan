import type { S2C } from "./protocol";

/** Called by net.ts for every server message it has no case for. The client-core owner routes the social ones. */
export function socialHandle(m: S2C): void {
  void m;
}
/** Called by net.ts whenever the websocket opens: ask which features are on, then load custody, cases, the loan and the poke setting. */
export function socialOnOpen(): void {}
/**
 * Called once by SocialOverlays when it mounts. Puts a saved custody back in force before the socket opens, starts the one-second tick
 * (the local release rule, the loan tick, poke cooldowns) and returns the function that stops it.
 */
export function socialMount(): () => void {
  return () => {};
}
