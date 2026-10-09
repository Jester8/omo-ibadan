import { DISTRICTS, type Needs } from "./places";

/**
 * Illness, tickets and prices: pure data and functions, no store import (scripts/check-health.ts runs this file on its own).
 * The TYPES and EMPTY_MEDICAL are what store.ts persists as `medical`. The store glue (onset, tickets, treatment) is in hospital.ts.
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

export type IllnessDef = {
  id: IllnessId;
  name: string;
  emoji: string;
  blurb: string;
  /** the three things you feel, in the order the chips list them */
  symptoms: [SymptomId, SymptomId, SymptomId];
  /** the severity you start with */
  onset: Severity;
  /** minutes of play after which it clears by itself; null = never (exhaustion also clears when energy is back up) */
  selfClearMin: number | null;
  /** the treatment price at severity 1, before the hospital's price multiplier */
  treat: number;
  /** seconds on a bed */
  secs: number;
  /** what the cure gives back */
  gain: Partial<Needs>;
  /** extra decay while ill, as a fraction of the normal rate, times the severity */
  drain: Partial<Needs>;
};

export const ILLNESSES: Record<IllnessId, IllnessDef> = {
  cold: { id: "cold", name: "Cold & cough", emoji: "\u{1F927}", blurb: "A cold that will pass, but it wears you down meanwhile.", symptoms: ["cough", "sneezing", "headache"], onset: 1, selfClearMin: 10, treat: 1500, secs: 6, gain: { energy: 10, fun: 2 }, drain: { energy: 0.25, fun: 0.25 } },
  foodpoison: { id: "foodpoison", name: "Food poisoning", emoji: "\u{1F922}", blurb: "Something you ate did not agree with you.", symptoms: ["stomach", "vomiting", "diarrhoea"], onset: 1, selfClearMin: 12, treat: 3000, secs: 8, gain: { energy: 15, hunger: 10, bladder: 30 }, drain: { energy: 0.3, bladder: 0.8, hunger: 0.4 } },
  exhaustion: { id: "exhaustion", name: "Exhaustion", emoji: "\u{1F635}", blurb: "You have run yourself down. Sleep fixes it too.", symptoms: ["dizzy", "weak", "headache"], onset: 2, selfClearMin: null, treat: 2500, secs: 8, gain: { energy: 45 }, drain: { energy: 0.3, fun: 0.3 } },
  malaria: { id: "malaria", name: "Malaria", emoji: "\u{1F99F}", blurb: "A mosquito bite and a fever that does not go away alone.", symptoms: ["fever", "chills", "headache"], onset: 2, selfClearMin: null, treat: 4500, secs: 9, gain: { energy: 25, hygiene: 10 }, drain: { energy: 0.25, fun: 0.25, hygiene: 0.4 } },
  typhoid: { id: "typhoid", name: "Typhoid fever", emoji: "\u{1F912}", blurb: "Dirty water or food, and a fever with a bad stomach.", symptoms: ["fever", "stomach", "weak"], onset: 2, selfClearMin: null, treat: 6000, secs: 10, gain: { energy: 30, hunger: 10, hygiene: 10 }, drain: { energy: 0.25, hunger: 0.5, fun: 0.2 } },
  injury: { id: "injury", name: "Injury", emoji: "\u{1FA79}", blurb: "A wound or a sprain that needs a doctor.", symptoms: ["wound", "sprain", "dizzy"], onset: 2, selfClearMin: null, treat: 5000, secs: 9, gain: { energy: 20 }, drain: { energy: 0.2, fun: 0.3 } },
};
export const ILLNESS_IDS = Object.keys(ILLNESSES) as IllnessId[];

export const SYMPTOMS: Record<SymptomId, { label: string }> = {
  fever: { label: "Fever" }, chills: { label: "Chills" }, headache: { label: "Headache" }, stomach: { label: "Stomach pain" },
  vomiting: { label: "Vomiting" }, diarrhoea: { label: "Running stomach" }, cough: { label: "Cough" }, sneezing: { label: "Sneezing" },
  wound: { label: "A wound" }, sprain: { label: "Sprain or swelling" }, dizzy: { label: "Dizzy" }, weak: { label: "Very weak" },
};
export const SYMPTOM_IDS = Object.keys(SYMPTOMS) as SymptomId[];

export const HOSPITALS: Record<string, { code: string; priceMul: number; waitExtra: number; name: string }> = {
  uch: { code: "UCH", priceMul: 1, waitExtra: 0, name: "University College Hospital" },
  adeoyo: { code: "ATH", priceMul: 0.9, waitExtra: 10, name: "Adeoyo Teaching Hospital" },
};

/** All in naira. */
export const FEES = { register: 1000, consult: 1500, night: 1000, lab: 2500, checkup: 3000, emergency: 12000, falseAlarm: 3000 } as const;
export const SEV_PRICE: Record<Severity, number> = { 1: 1, 2: 1.25, 3: 1.5 };
/** seconds in the queue at UCH, by severity (Adeoyo adds its own, a doctor on duty halves it) */
export const WAIT_SECS: Record<Severity, number> = { 1: 20, 2: 30, 3: 40 };
export const EMERGENCY = { secs: 7, gain: { energy: 50, hunger: 10, hygiene: 20, fun: 5, bladder: 20 } as Partial<Needs> };
export const IMMUNE_SECS = { case: 600, emergency: 1200, selfClear: 300, session: 600 } as const;
/** play-seconds before an illness that does not clear by itself gets one step worse (to 3 at most) */
export const ESCALATE_SECS = 480;
export const FALSE_ALARM_COOLDOWN_MS = 3 * 60_000;
export const NURSE_DISCOUNT = 0.25;

export const isNight = (hour: number) => hour < 6 || hour >= 22;
const round100 = (n: number) => Math.round(n / 100) * 100;

/**
 * What the desk makes of the symptoms you picked: "match" (at least two right, at most one wrong), "inconclusive" (ill, but it does
 * not fit: tests needed) or "healthy" (not ill, or you picked nothing).
 */
export function triage(picked: readonly SymptomId[], illness: Illness | null): "match" | "inconclusive" | "healthy" {
  if (!illness || !picked.length) return "healthy";
  const def = ILLNESSES[illness.id];
  const hit = picked.filter((p) => def.symptoms.includes(p)).length;
  return hit >= 2 && picked.length - hit <= 1 ? "match" : "inconclusive";
}

/** The bill for treating `i` here and now, with how long the queue is. */
export function quoteCase(i: Illness, c: { hour: number; place: string; staff: boolean; nurse: boolean }): { lines: Line[]; total: number; waitSecs: number } {
  const h = HOSPITALS[c.place] ?? HOSPITALS.uch;
  const def = ILLNESSES[i.id];
  const treat = round100(def.treat * SEV_PRICE[i.severity] * h.priceMul);
  const lines: Line[] = [{ label: "Consultation", amount: FEES.consult }];
  if (isNight(c.hour)) lines.push({ label: "Night call fee", amount: FEES.night });
  lines.push({ label: `Treatment: ${def.name}`, amount: c.nurse ? round100(treat * (1 - NURSE_DISCOUNT)) : treat });
  return { lines, total: lines.reduce((a, l) => a + l.amount, 0), waitSecs: (WAIT_SECS[i.severity] + h.waitExtra) * (c.staff ? 0.5 : 1) };
}

/** The health card number: "HC-26-04217" (the year, then five digits from the player's id). Stable for a player. */
export function cardNumber(pid: string, at: number): string {
  let h = 2166136261;
  for (let k = 0; k < pid.length; k++) h = Math.imul(h ^ pid.charCodeAt(k), 16777619) >>> 0;
  return `HC-${String(new Date(at).getFullYear() % 100).padStart(2, "0")}-${String(h % 100000).padStart(5, "0")}`;
}

/** The ambulance fare for a drive of `metres`. */
export const ambulanceFare = (metres: number) => Math.max(1500, Math.round((1500 + 0.6 * metres) / 50) * 50);

/** The closest district label to a spot, for "needs help near Dugbe". */
export function nearestDistrict(x: number, z: number): string {
  let best = DISTRICTS[0], bd = Infinity;
  for (const d of DISTRICTS) {
    const dd = (d.pos[0] - x) ** 2 + (d.pos[1] - z) ** 2;
    if (dd < bd) { bd = dd; best = d; }
  }
  return best.name;
}

/** Walking speed multiplier while ill (Player.tsx). */
export const slowdown = (i: Illness | null): number => (i ? 1 - 0.07 * i.severity : 1);

export type { Needs };
