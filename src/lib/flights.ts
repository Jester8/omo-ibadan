export type Destination = { id: string; city: string; country: string; emoji: string; price: number; mins: number; blurb: string };

export const DESTINATIONS: Destination[] = [
  { id: "lagos", city: "Lagos", country: "Nigeria", emoji: "🌆", price: 25000, mins: 45, blurb: "Eko oni baje. Traffic, beaches and non-stop hustle." },
  { id: "abuja", city: "Abuja", country: "Nigeria", emoji: "🏛️", price: 40000, mins: 70, blurb: "Zuma Rock, wide roads and the seat of power." },
  { id: "portharcourt", city: "Port Harcourt", country: "Nigeria", emoji: "🛢️", price: 45000, mins: 65, blurb: "The Garden City: pepper soup and oil money." },
  { id: "accra", city: "Accra", country: "Ghana", emoji: "🌴", price: 90000, mins: 80, blurb: "Jollof wars, highlife and Labadi Beach." },
  { id: "dubai", city: "Dubai", country: "UAE", emoji: "🏙️", price: 380000, mins: 400, blurb: "Skyscrapers in the desert and duty-free everything." },
  { id: "london", city: "London", country: "United Kingdom", emoji: "🎡", price: 520000, mins: 380, blurb: "Rain, red buses and half of Ibadan's cousins." },
];

export const destById = (id: string) => DESTINATIONS.find((d) => d.id === id);
/** Every flight, out or home, is over in four seconds. */
export const FLIGHT_SECS = 4;
