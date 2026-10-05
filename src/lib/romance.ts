import type { ActionDef } from "./places";
import { useGame } from "./store";

export type Status = "stranger" | "friend" | "dating" | "girlfriend";
export type Rel = { affection: number; status: Status; dates: number; lastTalk: number; coolUntil: number };

export const NEW_REL: Rel = { affection: 0, status: "stranger", dates: 0, lastTalk: 0, coolUntil: 0 };

export type Girl = { id: string; name: string; bio: string; likes: string };

/** The women of Ibadan you can get to know. Looks are built from the name in People.tsx. */
export const GIRLS: Girl[] = [
  { id: "npc-0", name: "Bisi", bio: "Fashion designer in Dugbe. Sews day and night.", likes: "Gentlemen who dress well" },
  { id: "npc-1", name: "Kemi", bio: "Final-year student at UI. Always hungry.", likes: "Suya and good conversation" },
  { id: "npc-2", name: "Ngozi", bio: "Nurse at UCH, laughs loudly.", likes: "People who show up on time" },
  { id: "npc-3", name: "Funke", bio: "Runs a hair salon in Bodija.", likes: "Generous, funny men" },
  { id: "npc-4", name: "Yetunde", bio: "Banker at Cocoa House. Dry sense of humour.", likes: "Ambition and good manners" },
  { id: "npc-5", name: "Tolani", bio: "Food blogger. Knows every amala spot.", likes: "A man who can eat" },
];

export const girlById = (id: string) => GIRLS.find((g) => g.id === id);

export const STATUS_LABEL: Record<Status, string> = { stranger: "Just met", friend: "Friends", dating: "Dating", girlfriend: "Girlfriend" };

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

const LINES = {
  stranger: ["Hello. Do I know you?", "Hmm, you look familiar. From where?", "Oh, hi. Nice weather, abi?", "Yes? Can I help you?"],
  friend: ["Ah, my friend! How far?", "You again? I'm not complaining.", "Ibadan is better when you pass by.", "You dey try, I must say."],
  dating: ["There you are! I missed you.", "You're making me smile in public o.", "So, when is our next date?", "My friends keep asking about you."],
  girlfriend: ["My love! 😊", "I was just thinking about you.", "You're the best part of my day.", "Don't leave me o, stay a little longer."],
};
const COMPLIMENT_OK = ["She smiles shyly. “Thank you!”", "“Stop it, you're making me blush.”", "She laughs. “You're smooth, I'll give you that.”"];
const COMPLIMENT_BAD = ["She raises an eyebrow. “Too much, too soon.”", "“Hmm. Say that again with sense.”"];

export type Date_ = { id: string; label: string; blurb: string; cost: number; gain: number; hunger: number; fun: number };
export const DATES: Date_[] = [
  { id: "suya", label: "Suya & zobo at Agodi", blurb: "Simple, spicy, sincere.", cost: 3000, gain: 16, hunger: 14, fun: 20 },
  { id: "movie", label: "Movie at the mall", blurb: "Popcorn and back-row whispers.", cost: 6000, gain: 22, hunger: 8, fun: 32 },
  { id: "amala", label: "Dinner at Amala Skye", blurb: "Gbegiri, ewedu and ponmo for two.", cost: 8000, gain: 26, hunger: 30, fun: 18 },
  { id: "rooftop", label: "Rooftop dinner, Cocoa House", blurb: "The whole city glittering below.", cost: 25000, gain: 40, hunger: 30, fun: 40 },
];

const S = () => useGame.getState();
const rel = (id: string): Rel => S().romance[id] ?? NEW_REL;
const setRel = (id: string, patch: Partial<Rel>) => {
  const cur = rel(id);
  const next = { ...cur, ...patch, affection: Math.max(0, Math.min(100, patch.affection ?? cur.affection)) };
  if (next.status === "stranger" && next.affection >= 15) next.status = "friend";
  useGame.setState((s) => ({ romance: { ...s.romance, [id]: next } }));
};

export type Outcome = { say: string; err?: string };

export function talk(id: string): Outcome {
  const r = rel(id);
  if (Date.now() < r.coolUntil) return { say: "", err: "She needs a moment. Try again shortly." };
  const gain = 3 + Math.floor(Math.random() * 4) + (r.status === "girlfriend" ? 2 : 0);
  setRel(id, { affection: r.affection + gain, lastTalk: Date.now() });
  S().recordStat("chats");
  S().adjustNeeds({ social: 10 });
  return { say: pick(LINES[rel(id).status]) };
}

export function compliment(id: string): Outcome {
  const r = rel(id);
  if (Date.now() < r.coolUntil) return { say: "", err: "She needs a moment. Try again shortly." };
  const ok = Math.random() < 0.7 - (r.status === "stranger" ? 0.15 : 0);
  setRel(id, { affection: r.affection + (ok ? 6 : -3), coolUntil: Date.now() + 3000 });
  return { say: ok ? pick(COMPLIMENT_OK) : pick(COMPLIMENT_BAD) };
}

const run = (a: ActionDef, after: () => void): string | null => {
  const err = S().runAction(a);
  if (err) return err;
  useGame.setState({ dateWith: a.id.startsWith("date-") ? a.id : null });
  setTimeout(() => {
    useGame.setState({ dateWith: null });
    after();
  }, a.secs * 1000 + 250);
  return null;
};

export function buyDrink(id: string): Outcome {
  const g = girlById(id);
  const err = run({ id: "drink", label: `Buy ${g?.name ?? "her"} a drink`, secs: 3, cost: 1500, gain: { hunger: 4, fun: 4 } }, () => {
    setRel(id, { affection: rel(id).affection + 10 });
    S().toast(`${g?.name} enjoyed the drink. +10 ♥`, "good");
  });
  return err ? { say: "", err } : { say: "“Ah, thank you! How did you know I was thirsty?”" };
}

export function askOut(id: string): Outcome {
  const r = rel(id);
  if (r.affection < 30) return { say: "", err: "She doesn't know you well enough yet. Chat, compliment, buy her a drink." };
  if (Date.now() < r.coolUntil) return { say: "", err: "Give her some time." };
  const chance = Math.min(0.95, Math.max(0.15, 0.3 + r.affection / 150 + S().rep / 600));
  if (Math.random() < chance) {
    setRel(id, { status: "dating", affection: r.affection + 8 });
    S().toast(`${girlById(id)?.name} said yes! Choose where to take her.`, "good");
    return { say: "She smiles. “Okay. Take me somewhere nice.”" };
  }
  setRel(id, { affection: r.affection - 8, coolUntil: Date.now() + 15000 });
  return { say: "“Hmm… not yet. Let's just be friends for now.”" };
}

export function takeOnDate(id: string, dateId: string): Outcome {
  const d = DATES.find((x) => x.id === dateId);
  const g = girlById(id);
  if (!d || !g) return { say: "", err: "Not available." };
  const err = run({ id: `date-${d.id}`, label: `${d.label} with ${g.name}`, secs: 8, cost: d.cost, gain: { hunger: d.hunger, fun: d.fun, social: 20 }, rep: 1 }, () => {
    const cur = rel(id);
    setRel(id, { affection: cur.affection + d.gain, dates: cur.dates + 1 });
    S().recordStat("dates");
    S().toast(`${g.name} had a lovely time. +${d.gain} ♥`, "good");
  });
  return err ? { say: "", err } : { say: `You and ${g.name} head out: ${d.label}.` };
}

export function askGirlfriend(id: string): Outcome {
  const r = rel(id);
  const g = girlById(id);
  if (r.status !== "dating") return { say: "", err: "Not yet." };
  if (r.dates < 2 || r.affection < 80) return { say: "", err: "Go on more dates and win her heart first (80 ♥, 2 dates)." };
  if (Math.random() < 0.85) {
    setRel(id, { status: "girlfriend", affection: 100 });
    useGame.setState((s) => ({ rep: s.rep + 3 }));
    S().toast(`${g?.name} is now your girlfriend! +3 rep`, "good");
    return { say: "She hugs you tight. “Yes! A thousand times yes.”" };
  }
  setRel(id, { affection: r.affection - 10, coolUntil: Date.now() + 15000 });
  return { say: "“Let's take it slow, abeg. I still like you.”" };
}

export function gift(id: string): Outcome {
  const g = girlById(id);
  const err = run({ id: "gift", label: `Give ${g?.name} a gift`, secs: 2, cost: 5000, gain: {} }, () => {
    setRel(id, { affection: rel(id).affection + 12 });
    S().toast(`${g?.name} loves the gift. +12 ♥`, "good");
  });
  return err ? { say: "", err } : { say: "“For me? You shouldn't have! … Thank you.”" };
}
