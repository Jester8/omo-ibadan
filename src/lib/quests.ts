import type { PlotState } from "./protocol";

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
};

export const EMPTY_STATS: Stats = { visited: [], worked: 0, ate: 0, chats: 0, voiceJoins: 0, calls: 0, entered: 0, slept: 0, used: 0, dates: 0 };

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
    id: "romance",
    title: "Love in Ibadan",
    blurb: "Talk to a lady, ask her out, and take her on a date.",
    reward: { money: 3000, rep: 3 },
    done: (s) => (s.stats.dates ?? 0) >= 1,
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
];
