import { PLACES } from "./places";
import { naira } from "./plots";
import { SIGNUP_MONEY, useGame } from "./store";

/** Who you say you are when you sign up: nepo or lapo, the work you want and what you do for fun. Saved with your progress. */
export type Path = "nepo" | "lapo";
export type Background = { path: Path; job: string; hobby: string };

export type Job = { id: string; label: string; emoji: string; blurb: string; /** where this kind of work is done in the city */ place: string; /** the paid action there to start with */ shift: string };
export type Hobby = { id: string; label: string; emoji: string; blurb: string; place?: string };

export const PATHS: { id: Path; label: string; emoji: string; tagline: string; detail: string }[] = [
  { id: "nepo", label: "Nepo", emoji: "👑", tagline: "Born into big money", detail: "The surname opens doors, and everyone expects a lot from you." },
  { id: "lapo", label: "Lapo", emoji: "🎒", tagline: "Middle-class roots", detail: "A decent home, but every naira you spend is one you earned." },
];

export const JOBS: Job[] = [
  { id: "banker", label: "Banker", emoji: "🏦", blurb: "Tellers, audits and the thirtieth floor.", place: "central-bank", shift: "Teller shift" },
  { id: "nurse", label: "Nurse", emoji: "🩺", blurb: "Wards, clinics and long night shifts.", place: "adeoyo", shift: "Nurse's aide shift" },
  { id: "lecturer", label: "Lecturer", emoji: "🎓", blurb: "Labs, lectures and late marking.", place: "ui-science", shift: "Teach a lab class" },
  { id: "trader", label: "Trader", emoji: "🧺", blurb: "Yams, cloth and sharp bargaining.", place: "sango-market", shift: "Run a stall" },
  { id: "hotelier", label: "Hotelier", emoji: "🏨", blurb: "Chandeliers and a polite doorman.", place: "oluyole-hotel", shift: "Concierge shift" },
  { id: "chef", label: "Chef", emoji: "🍲", blurb: "Iyan, efo riro and a busy buka.", place: "challenge-eatery", shift: "Serve at the buka" },
  { id: "transporter", label: "Transporter", emoji: "🚌", blurb: "Garages, buses and loud horns.", place: "iwo-road", shift: "Park attendant hustle" },
  { id: "aviation", label: "Airport crew", emoji: "✈️", blurb: "Bags, boarding and open sky.", place: "airport", shift: "Baggage handler shift" },
  { id: "retail", label: "Retail & fashion", emoji: "🛍️", blurb: "Boutiques, a cinema and a food court.", place: "mokola-mall", shift: "Shop assistant shift" },
];

export const HOBBIES: Hobby[] = [
  { id: "football", label: "Football", emoji: "⚽", blurb: "Five-a-side and loud match days." },
  { id: "music", label: "Music", emoji: "🎧", blurb: "Afrobeat, fuji and late sets.", place: "club-afrobeat" },
  { id: "reading", label: "Reading", emoji: "📚", blurb: "Quiet corners and long novels.", place: "ui-library" },
  { id: "cooking", label: "Cooking", emoji: "🍳", blurb: "Pots, pepper and good smells.", place: "sango-market" },
  { id: "dancing", label: "Dancing", emoji: "💃", blurb: "Owambe floors and aso ebi.", place: "club-owambe" },
  { id: "gaming", label: "Gaming", emoji: "🎮", blurb: "Arcades and late nights.", place: "mokola-mall" },
  { id: "boating", label: "Boating", emoji: "🛶", blurb: "Still water and a cool breeze.", place: "eleyele" },
  { id: "fashion", label: "Fashion", emoji: "👗", blurb: "Fabric, fit and fresh looks.", place: "mokola-mall" },
  { id: "photography", label: "Photography", emoji: "📸", blurb: "Chasing the city's best light.", place: "palace" },
];

export const jobById = (id: string | undefined) => JOBS.find((j) => j.id === id);
export const hobbyById = (id: string | undefined) => HOBBIES.find((h) => h.id === id);
export const pathById = (id: string | undefined) => PATHS.find((p) => p.id === id);

/** What a nepo starts with (a lapo starts with the normal sign-up cash) and the head start their name gives them. */
export const NEPO_MONEY = 10_000_000;
export const NEPO_REP = 5;

export type Verdict = {
  /** the family's wealth: this is only the background, your actual family starts empty */
  wealth: "super-rich" | "middle-class";
  wealthLabel: string;
  cash: number;
  rep: number;
  origin: string;
};

/** The city's decision: what kind of home you came from, how much you start with, and where your story begins. */
export function decide(path: Path, jobId: string, hobbyId: string): Verdict {
  const job = jobById(jobId);
  const hobby = hobbyById(hobbyId);
  const place = PLACES.find((p) => p.id === job?.place)?.name ?? "the city";
  const fun = hobby ? hobby.label.toLowerCase() : "good company";
  if (path === "nepo") {
    return {
      wealth: "super-rich",
      wealthLabel: "From a super-rich family",
      cash: NEPO_MONEY,
      rep: NEPO_REP,
      origin: `Old money. Doors open for you at ${place} before you knock, and weekends are for ${fun}.`,
    };
  }
  return {
    wealth: "middle-class",
    wealthLabel: "From a middle-class family",
    cash: SIGNUP_MONEY,
    rep: 0,
    origin: `A comfortable home that taught you what a naira is worth. You earn your place at ${place}, and ${fun} is how you unwind.`,
  };
}

/** Save the player's answers, give them the starting cash and rep the city decided on, and point them at their first job. */
export function completeOnboarding(path: Path, jobId: string, hobbyId: string) {
  const v = decide(path, jobId, hobbyId);
  const job = jobById(jobId);
  useGame.setState((s) => ({ background: { path, job: jobId, hobby: hobbyId }, onboard: false, money: s.money + (v.cash - SIGNUP_MONEY), rep: s.rep + v.rep }));
  const s = useGame.getState();
  s.toast(`${v.wealthLabel}. You start with ${naira(v.cash)}.`, "good");
  const place = PLACES.find((p) => p.id === job?.place);
  if (job && place) setTimeout(() => useGame.getState().toast(`First move: "${job.shift}" at ${place.name}.`, "info"), 1800);
}
