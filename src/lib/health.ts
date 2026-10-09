import type { Needs } from "./places";

/**
 * STUB written by the lead (Phase 0); owned by the HP (hospital) agent from Phase 1. Pure data and functions, no store import.
 * The TYPES and EMPTY_MEDICAL below are the contract (store.ts persists `medical: MedicalFile`): keep their names and shapes.
 * Add the rest (ILLNESSES, SYMPTOMS, HOSPITALS, FEES, triage, quoteCase, cardNumber, ...) per hospital.md section 4.1.
 */
export type IllnessId = "cold" | "foodpoison" | "exhaustion" | "malaria" | "typhoid" | "injury";
export type SymptomId = "fever" | "chills" | "headache" | "stomach" | "vomiting" | "diarrhoea" | "cough" | "sneezing" | "wound" | "sprain" | "dizzy" | "weak";
export type Severity = 1 | 2 | 3;
export type Cause = { kind: "assault" | "accident" | "arrest"; byPid?: string; byName?: string };
export type Illness = { id: IllnessId; severity: Severity; since: number; cause?: Cause };
export type Line = { label: string; amount: number };

export type Admission = {
  id: string;
  ticket: string;
  place: string;
  kind: "case" | "emergency";
  illness: IllnessId | null;
  severity: Severity;
  lines: Line[];
  total: number;
  issuedAt: number;
  calledAt: number;
  byAmbulance: boolean;
};
export type Visit = {
  id: string;
  at: number;
  place: string;
  kind: "case" | "emergency" | "checkup" | "lab" | "falsealarm" | "registration";
  illness: IllnessId | null;
  severity: Severity | null;
  lines: Line[];
  total: number;
  note: string;
};
export type MedicalFile = {
  card: { no: string; since: number; place: string } | null;
  illness: Illness | null;
  admission: Admission | null;
  /** newest first, capped at 30 */
  history: Visit[];
  /** ticket / visit counter */
  seq: number;
  lastFalseAlarmAt: number;
};
export const EMPTY_MEDICAL: MedicalFile = { card: null, illness: null, admission: null, history: [], seq: 0, lastFalseAlarmAt: 0 };

/** Walking speed multiplier while ill (Player.tsx). */
export const slowdown = (i: Illness | null): number => (i ? 1 - 0.07 * i.severity : 1);

export type { Needs };
