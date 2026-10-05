export type CarKind = "keke" | "sedan" | "suv";
export type CarDef = { id: string; name: string; kind: CarKind; price: number; speed: number; blurb: string; colors: string[] };

export const CARS: CarDef[] = [
  { id: "keke", name: "Bajaj Keke", kind: "keke", price: 40000, speed: 7, blurb: "Your own keke. Zips through any traffic.", colors: ["#f2b632", "#2f9e6b", "#e85d4a", "#4a90e2"] },
  { id: "corolla", name: "Toyota Corolla", kind: "sedan", price: 90000, speed: 9, blurb: "Tokunbo, clean, the Nigerian family car.", colors: ["#f4f4f2", "#2b3a55", "#9aa3ad", "#b53a3a"] },
  { id: "rx350", name: "Lexus RX 350", kind: "suv", price: 200000, speed: 11, blurb: "Smooth ride for the Bodija big man.", colors: ["#111827", "#f4f4f2", "#7a5a40", "#2b3a55"] },
  { id: "gwagon", name: "Mercedes G-Wagon", kind: "suv", price: 450000, speed: 13, blurb: "Everyone turns to look. That is the point.", colors: ["#111827", "#d9dde2", "#14532d", "#7f1d1d"] },
];

export const carById = (id: string | null | undefined) => CARS.find((c) => c.id === id);
