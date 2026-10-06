export type CarKind = "keke" | "sedan" | "suv" | "okada" | "micra";
export type CarDef = { id: string; name: string; kind: CarKind; price: number; speed: number; blurb: string; colors: string[] };

export const CARS: CarDef[] = [
  { id: "keke", name: "Bajaj Keke", kind: "keke", price: 40000, speed: 7, blurb: "Your own keke. Zips through any traffic.", colors: ["#f2b632", "#2f9e6b", "#e85d4a", "#4a90e2"] },
  { id: "corolla", name: "Toyota Corolla", kind: "sedan", price: 90000, speed: 9, blurb: "Tokunbo, clean, the Nigerian family car.", colors: ["#f4f4f2", "#2b3a55", "#9aa3ad", "#b53a3a"] },
  { id: "rx350", name: "Lexus RX 350", kind: "suv", price: 200000, speed: 11, blurb: "Smooth ride for the Bodija big man.", colors: ["#111827", "#f4f4f2", "#7a5a40", "#2b3a55"] },
  { id: "gwagon", name: "Mercedes G-Wagon", kind: "suv", price: 450000, speed: 13, blurb: "Everyone turns to look. That is the point.", colors: ["#111827", "#d9dde2", "#14532d", "#7f1d1d"] },
];

/** Hired rides: pay, hop on, and it carries you to the destination. */
export type RideId = "okada" | "keke" | "micra";
export const RIDES: { id: RideId; name: string; emoji: string; speed: number; base: number; perMetre: number; color: string; blurb: string }[] = [
  { id: "okada", name: "Okada", emoji: "🏍️", speed: 7.5, base: 80, perMetre: 0.35, color: "#2f9e6b", blurb: "Cheapest. Weaves through traffic." },
  { id: "keke", name: "Keke", emoji: "🛺", speed: 8.5, base: 120, perMetre: 0.5, color: "#f2b632", blurb: "The everyday ride." },
  { id: "micra", name: "Micra", emoji: "🚕", speed: 11, base: 250, perMetre: 0.9, color: "#722f37", blurb: "Wine-red and private. Air-conditioned (nearly)." },
];
export const rideById = (id: string | null | undefined) => RIDES.find((r) => r.id === id);
export const rideFare = (id: RideId, metres: number) => {
  const r = rideById(id)!;
  return Math.max(100, Math.round((r.base + r.perMetre * metres) / 50) * 50);
};

/** Any vehicle id (owned or hired) to the model that draws it. */
export const vehicleKind = (id: string | null | undefined): CarKind | undefined => carById(id)?.kind ?? rideById(id)?.id;

export const carById = (id: string | null | undefined) => CARS.find((c) => c.id === id);
