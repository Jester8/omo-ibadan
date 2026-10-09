import type { PlotState } from "./protocol";
import { knowLevel } from "./knowledge";

/** Counters the quests read. Persisted with the save. */
export type Stats = {
  visited: string[];
  worked: number;
  ate: number;
  chats: number;
  voiceJoins: number;
  calls: number;
  entered: number;
  slept: number;
  used: number;
  dates: number;
  flights: number;
  // optional so older saves need no migration: always read with `?? 0`
  /** study points from the library and the school (knowledge.ts) */
  know?: number;
  letters?: number;
  /** naira given to the food bank in all, and the rolling hour the donation rep cap is counted in (start ms, rep credited) */
  donated?: number;
  donT?: number;
  donR?: number;
  /** when the last free meal from the food bank was taken (ms) */
  mealAt?: number;
  /** litres of petrol bought in all */
  fuelL?: number;
  /** team games played at the rec centre */
  played?: number;
  /** fires fought, and the slot of the last one (incidents.ts) */
  fires?: number;
  lastFire?: number;
  /** climbs of Bower's Tower */
  climbed?: number;
  /** hospital: registrations and finished treatments */
  checkins?: number;
  treated?: number;
};

export const EMPTY_STATS: Stats = { visited: [], worked: 0, ate: 0, chats: 0, voiceJoins: 0, calls: 0, entered: 0, slept: 0, used: 0, dates: 0, flights: 0 };

export type QuestState = { stats: Stats; plots: Record<string, PlotState>; pid: string | undefined };

export type Quest = {
  id: string;
  title: string;
  blurb: string;
  reward: { money?: number; rep?: number };
  done: (s: QuestState) => boolean;
  /** optional progress for multi-step goals */
  progress?: (s: QuestState) => { cur: number; max: number };
};

const mine = (s: QuestState) => Object.values(s.plots).filter((p) => p.ownerId === s.pid);
const has = (s: QuestState, ids: string[]) => ids.every((id) => s.stats.visited.includes(id));
const CIVIC_TRAIL = ["post-office", "public-library", "fire-station", "food-bank"];
const POLICE = ["police-dugbe", "police-mokola"];

/** Ordered: the first unfinished goal is the "next goal" shown in the HUD. */
export const QUESTS: Quest[] = [
  {
    id: "explore",
    title: "Explore Ibadan",
    blurb: "Walk to 3 different places.",
    reward: { money: 3000, rep: 3 },
    done: (s) => s.stats.visited.length >= 3,
    progress: (s) => ({ cur: Math.min(3, s.stats.visited.length), max: 3 }),
  },
  {
    id: "inside",
    title: "Step inside",
    blurb: "Walk through a door. Every building has an interior, and you have a flat of your own.",
    reward: { money: 1500, rep: 1 },
    done: (s) => (s.stats.entered ?? 0) >= 1,
  },
  {
    id: "earn",
    title: "Earn your first naira",
    blurb: "Finish a job shift anywhere (Cocoa House, a market stall, the motor park).",
    reward: { money: 2000, rep: 2 },
    done: (s) => s.stats.worked >= 1,
  },
  {
    id: "eat",
    title: "Grab a meal",
    blurb: "Eat something filling. Amala Skye is a classic.",
    reward: { money: 1000 },
    done: (s) => s.stats.ate >= 1,
  },
  {
    id: "hello",
    title: "Say hello",
    blurb: "Send a message in the chat.",
    reward: { rep: 2 },
    done: (s) => s.stats.chats >= 1,
  },
  {
    id: "rest",
    title: "A good night's sleep",
    blurb: "Sleep in a bed, at home or anywhere with one.",
    reward: { money: 2000, rep: 2 },
    done: (s) => (s.stats.slept ?? 0) >= 1,
  },
  {
    id: "fly",
    title: "Up, up and away",
    blurb: "Book a ticket at Ibadan Airport and take a flight.",
    reward: { money: 5000, rep: 4 },
    done: (s) => (s.stats.flights ?? 0) >= 1,
  },
  {
    id: "culture",
    title: "Culture trail",
    blurb: "Visit Mapo Hall, Bower's Tower and Cocoa House.",
    reward: { money: 8000, rep: 6 },
    done: (s) => has(s, ["mapo-hall", "bowers", "cocoa-house"]),
    progress: (s) => ({ cur: ["mapo-hall", "bowers", "cocoa-house"].filter((id) => s.stats.visited.includes(id)).length, max: 3 }),
  },
  {
    id: "voice",
    title: "Find your voice",
    blurb: "Join a voice room at any venue.",
    reward: { rep: 5 },
    done: (s) => s.stats.voiceJoins >= 1,
  },
  {
    id: "land",
    title: "Own a piece of Ibadan",
    blurb: "Buy your first plot of land.",
    reward: { money: 10000, rep: 5 },
    done: (s) => mine(s).length >= 1,
  },
  {
    id: "home",
    title: "Home sweet home",
    blurb: "Build a house on your land.",
    reward: { money: 15000, rep: 5 },
    done: (s) => mine(s).some((p) => p.tier >= 1),
  },
  {
    id: "call",
    title: "Ring a friend",
    blurb: "Make or take a phone call.",
    reward: { rep: 5 },
    done: (s) => s.stats.calls >= 1,
  },
  {
    id: "landlord",
    title: "Landlord",
    blurb: "Own 3 plots of land.",
    reward: { money: 50000, rep: 15 },
    done: (s) => mine(s).length >= 3,
    progress: (s) => ({ cur: Math.min(3, mine(s).length), max: 3 }),
  },
  // the civic places (appended, so the HUD's "next goal" does not change for people already playing)
  {
    id: "civic",
    title: "Know your city",
    blurb: "Visit the post office, the public library, the fire station, the food bank and a police station.",
    reward: { money: 10000, rep: 8 },
    done: (s) => has(s, CIVIC_TRAIL) && POLICE.some((id) => s.stats.visited.includes(id)),
    progress: (s) => ({ cur: CIVIC_TRAIL.filter((id) => s.stats.visited.includes(id)).length + (POLICE.some((id) => s.stats.visited.includes(id)) ? 1 : 0), max: 5 }),
  },
  { id: "stamps", title: "Write home", blurb: "Buy a book of stamps or post a letter at the NIPOST post office.", reward: { money: 3000, rep: 3 }, done: (s) => (s.stats.letters ?? 0) >= 1 },
  { id: "fuelup", title: "Keep the lights on", blurb: "Buy 10 litres of petrol at the filling station.", reward: { money: 2000, rep: 2 }, done: (s) => (s.stats.fuelL ?? 0) >= 10, progress: (s) => ({ cur: Math.min(10, s.stats.fuelL ?? 0), max: 10 }) },
  { id: "scholar", title: "Hit the books", blurb: "Reach Education level 3 (OND) at the library or the school.", reward: { money: 10000, rep: 6 }, done: (s) => knowLevel(s.stats.know) >= 3, progress: (s) => ({ cur: Math.min(3, knowLevel(s.stats.know)), max: 3 }) },
  { id: "neighbour", title: "Good neighbour", blurb: "Give ₦25,000 to the food bank in total.", reward: { money: 5000, rep: 6 }, done: (s) => (s.stats.donated ?? 0) >= 25000, progress: (s) => ({ cur: Math.min(25000, s.stats.donated ?? 0), max: 25000 }) },
  { id: "patient", title: "Register as a patient", blurb: "Check in at the reception desk of UCH or Adeoyo and get your health card.", reward: { money: 1500, rep: 2 }, done: (s) => (s.stats.checkins ?? 0) >= 1 },
  { id: "wellness", title: "Doctor's orders", blurb: "Finish a treatment or a check-up at a hospital.", reward: { money: 3000, rep: 3 }, done: (s) => (s.stats.treated ?? 0) >= 1 },
  { id: "topoftower", title: "Top of Ibadan", blurb: "Climb Bower's Tower and look at the city from the top.", reward: { money: 3000, rep: 3 }, done: (s) => (s.stats.climbed ?? 0) >= 1 },
];
