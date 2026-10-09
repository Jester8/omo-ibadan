import { create } from "zustand";
import { DEMO_AUTH } from "./api";
import type { PokeKind, PokeMode } from "./protocol";
import type { SocialFlags } from "./socialRules";
import { useGame } from "./store";

export type PokeAlert = { id: number; from: string; fromPid: string; name: string; kind: PokeKind; at: number; recent: number; canReport: boolean };

/** Without a server only loans and property sales work, and they work on this device alone. */
export const DEMO_FLAGS: SocialFlags = { custody: false, efcc: false, pokes: false, loans: true, sales: true, now: 0 };

/**
 * Session state of pokes, loans and sales (nothing here is saved). Custody keeps its state in the main store (custody, cases, bailAsks,
 * heldFriends, arrestFlash, policeOpen, clockSkew), and the loan itself is saved there too (`loan`).
 */
type SocialState = {
  /** which features the server has switched on; null until it has answered (everything reads as off) */
  flags: SocialFlags | null;
  pokeMode: PokeMode;
  pokeAlerts: PokeAlert[];
  /** epoch ms until which the Poke and Hit buttons cool down */
  pokeCooldown: { poke: number; hit: number };
  /** when hits that cost needs landed on me, last 10 minutes */
  hitsTaken: number[];
  /** the red edge flash after a hit */
  flash: { kind: PokeKind; at: number } | null;
};

export const useSocial = create<SocialState>()(() => ({
  flags: DEMO_AUTH ? DEMO_FLAGS : null,
  pokeMode: "all",
  pokeAlerts: [],
  pokeCooldown: { poke: 0, hit: 0 },
  hitsTaken: [],
  flash: null,
}));

type Feature = "custody" | "efcc" | "pokes" | "loans" | "sales";
/** Is this feature on? Safe to call before the server has answered (then false). */
export const useFlag = (k: Feature) => useSocial((s) => !!s.flags?.[k]);
export const flagOn = (k: Feature) => !!useSocial.getState().flags?.[k];
/** The server's clock, as far as this device can tell. */
export const serverNow = () => Date.now() + useGame.getState().clockSkew;
