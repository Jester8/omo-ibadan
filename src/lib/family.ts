import type { Person } from "./social";

/**
 * Family is real players. Everyone starts with none: you ask a friend to be your dad, mum or sibling,
 * and they have to accept. What someone is to you is a "relation"; what you ask them to be is a "role".
 */
export type FamilyRole = "dad" | "mum" | "sibling";
export type Relation = FamilyRole | "child";

export type FamilyMember = Person & { relation: Relation; since: number };
export type FamilyAsk = Person & { role: FamilyRole };
export type Family = { members: FamilyMember[]; incoming: FamilyAsk[]; outgoing: FamilyAsk[] };

export const NO_FAMILY: Family = { members: [], incoming: [], outgoing: [] };

export const ROLES: { id: FamilyRole; label: string; emoji: string }[] = [
  { id: "dad", label: "Dad", emoji: "👨🏾" },
  { id: "mum", label: "Mum", emoji: "👩🏾" },
  { id: "sibling", label: "Sibling", emoji: "🧑🏾" },
];

const RELATION: Record<Relation, { label: string; emoji: string }> = {
  dad: { label: "Dad", emoji: "👨🏾" },
  mum: { label: "Mum", emoji: "👩🏾" },
  sibling: { label: "Sibling", emoji: "🧑🏾" },
  child: { label: "Child", emoji: "🧒🏾" },
};

export const relationOf = (r: Relation) => RELATION[r] ?? RELATION.sibling;
export const roleOf = (r: string) => ROLES.find((x) => x.id === r) ?? ROLES[2];
