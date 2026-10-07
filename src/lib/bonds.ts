/** How close two friends are, lowest to highest. Going up needs the other person to say yes; coming down does not. */
export type Level = "friend" | "bestie" | "fwb" | "babe" | "wife";

export const LEVELS: { id: Level; label: string; emoji: string; blurb: string }[] = [
  { id: "friend", label: "Friend", emoji: "🤝", blurb: "Just friends." },
  { id: "bestie", label: "Best friend", emoji: "💛", blurb: "Your ride or die." },
  { id: "fwb", label: "Friends with benefits", emoji: "😏", blurb: "Close, casual, no strings." },
  { id: "babe", label: "Babe", emoji: "💖", blurb: "Your person." },
  { id: "wife", label: "Wife", emoji: "💍", blurb: "Married." },
];

export const levelOf = (id: string | undefined) => LEVELS.find((l) => l.id === id) ?? LEVELS[0];
export const levelRank = (id: string | undefined) => LEVELS.findIndex((l) => l.id === (id ?? "friend"));
