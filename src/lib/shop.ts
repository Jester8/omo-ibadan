import { useGame } from "./store";
import type { Frame, Look } from "./look";
import { net } from "./net";

/** What a market or mall sells: everyday food for your pantry, and clothes from around the world. */
export type Good = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  blurb: string;
  /** food: portions added to the pantry */
  pantry?: number;
  /** clothes: what changes on your character */
  wear?: Partial<Look>;
  /** only for these body types (default both) */
  frames?: Frame[];
  /** a swatch to show for clothes */
  swatch?: string;
};

export const FOOD: Good[] = [
  { id: "rice", name: "Rice, 5 kg", emoji: "🍚", price: 1900, pantry: 3, blurb: "Long grain. Three meals." },
  { id: "beans", name: "Beans, 3 kg", emoji: "🫘", price: 1300, pantry: 2, blurb: "Honey beans for moin-moin or porridge." },
  { id: "yam", name: "Yam tubers", emoji: "🍠", price: 1400, pantry: 2, blurb: "Boil it, pound it or fry it." },
  { id: "pasta", name: "Pasta & noodles carton", emoji: "🍜", price: 2200, pantry: 3, blurb: "Ready in five minutes." },
  { id: "bread", name: "Bread & eggs", emoji: "🥚", price: 700, pantry: 1, blurb: "Breakfast, sorted." },
  { id: "veg", name: "Tomatoes, pepper & greens", emoji: "🥬", price: 600, pantry: 1, blurb: "Fresh from the stalls." },
  { id: "fish", name: "Fish & chicken pack", emoji: "🍗", price: 2500, pantry: 2, blurb: "Frozen, ready for the pot." },
  { id: "plantain", name: "Plantain bunch", emoji: "🍌", price: 1300, pantry: 2, blurb: "Fry it, boil it, roast it." },
];

export const CLOTHES: Good[] = [
  { id: "tee", name: "Plain T-shirt", emoji: "👕", price: 3500, blurb: "A clean everyday tee.", wear: { top: "tee", topColor: "#f4f4f2" }, swatch: "#f4f4f2" },
  { id: "tee-black", name: "Black T-shirt", emoji: "👕", price: 3500, blurb: "Goes with everything.", wear: { top: "tee", topColor: "#1d2433" }, swatch: "#1d2433" },
  { id: "hoodie", name: "Grey hoodie", emoji: "🧥", price: 9000, blurb: "Soft and warm.", wear: { top: "hoodie", topColor: "#6b7280" }, frames: ["m"], swatch: "#6b7280" },
  { id: "dress", name: "Summer dress", emoji: "👗", price: 8500, blurb: "Light and bright.", wear: { top: "dress", topColor: "#f59e0b" }, frames: ["f"], swatch: "#f59e0b" },
  { id: "suit", name: "Office suit", emoji: "🤵", price: 25000, blurb: "For interviews and big meetings.", wear: { top: "suit", topColor: "#1d2433" }, swatch: "#1d2433" },
  { id: "jersey", name: "Football jersey", emoji: "⚽", price: 6500, blurb: "Rep your team.", wear: { top: "jersey", topColor: "#16a34a" }, swatch: "#16a34a" },
  { id: "jeans", name: "Blue jeans", emoji: "👖", price: 7500, blurb: "Classic denim.", wear: { bottomColor: "#3b5b8a" }, swatch: "#3b5b8a" },
  { id: "chinos", name: "Khaki chinos", emoji: "👖", price: 6500, blurb: "Smart casual.", wear: { bottomColor: "#a58a5a" }, swatch: "#a58a5a" },
  { id: "trackies", name: "Black joggers", emoji: "🩳", price: 5500, blurb: "Comfort first.", wear: { bottomColor: "#111827" }, swatch: "#111827" },
  { id: "sneakers", name: "White sneakers", emoji: "👟", price: 12000, blurb: "Fresh out the box.", wear: { shoeColor: "#f4f4f2" }, swatch: "#f4f4f2" },
  { id: "kicks", name: "Red trainers", emoji: "👟", price: 11000, blurb: "Hard to miss.", wear: { shoeColor: "#dc2626" }, swatch: "#dc2626" },
  { id: "boots", name: "Black boots", emoji: "🥾", price: 14000, blurb: "Built to last.", wear: { shoeColor: "#1d2433" }, swatch: "#1d2433" },
  { id: "cap", name: "Baseball cap", emoji: "🧢", price: 2500, blurb: "Keeps the sun off.", wear: { accessory: "cap" } },
  { id: "shades", name: "Sunglasses", emoji: "🕶️", price: 3000, blurb: "Cool, calm, collected.", wear: { accessory: "sunglasses" } },
  { id: "glasses", name: "Reading glasses", emoji: "👓", price: 2800, blurb: "Look like you read.", wear: { accessory: "glasses" } },
];

/** Buy something: food goes into your pantry, clothes go straight on your character. Returns an error message, or null. */
export function buyGood(g: Good): string | null {
  const s = useGame.getState();
  if (s.money < g.price) return `That costs ₦${g.price.toLocaleString("en-NG")}.`;
  if (g.wear) {
    const p = s.profile;
    if (!p) return "Sign in first.";
    if (g.frames && !g.frames.includes(p.look.frame ?? "m")) return "That one is cut for a different body type.";
    useGame.setState({ money: s.money - g.price, profile: { ...p, look: { ...p.look, ...g.wear } } });
    net.hello(); // other players see the new outfit
    s.toast(`${g.name}: bought and put on`, "good");
    return null;
  }
  useGame.setState({ money: s.money - g.price, pantry: s.pantry + (g.pantry ?? 0) });
  s.toast(`${g.name}: +${g.pantry} in your provisions`, "good");
  return null;
}
