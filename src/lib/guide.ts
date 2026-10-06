export type Topic = { id: string; emoji: string; title: string; lines: string[] };

/** The how-to-play reference, shown in the Guide sheet and (the first few) in the welcome tour. */
export const TOPICS: Topic[] = [
  { id: "move", emoji: "🚶", title: "Moving around", lines: [
    "Tap or click the ground and your character walks there. On a keyboard use W A S D or the arrow keys.",
    "Drag the screen to turn the camera and tilt it. On a keyboard use Q and E to turn. Pinch or scroll to zoom.",
    "Tap the small map in the corner to walk to any spot in the city.",
  ] },
  { id: "places", emoji: "🏢", title: "Places and buildings", lines: [
    "Tap a building to see its name, address and what you can do there. On phones the names stay hidden until you tap.",
    "In the panel choose Walk here (free) or pay for an Okada, Keke or Micra and the vehicle takes you there.",
    "When you arrive, tap Go inside to enter, then tap the things you want to do. A closed place shows when it opens.",
  ] },
  { id: "inside", emoji: "🛋️", title: "Inside buildings", lines: [
    "Tap furniture to use it: sit on sofas and chairs, sleep in a bed, cook at the stove, eat at the dining table, watch TV.",
    "Tap a computer to open it: browse, check mail, do freelance gigs or order food.",
    "Tap the Exit door, or the Leave button, to go back outside.",
  ] },
  { id: "bar", emoji: "📱", title: "The bottom bar", lines: [
    "Home takes you straight to your own room (and becomes Leave when you are inside).",
    "Buy opens land for sale and cars. Phone lets you call other players and search jobs.",
    "Friends shows people you have met, and lets you call them. Goals lists what to do next. Me is your profile and settings.",
  ] },
  { id: "needs", emoji: "❤️", title: "Hunger, energy, fun, social", lines: [
    "The four bars at the top slowly go down. Keep them up: eat for hunger, sleep for energy, go out for fun, talk to people for social.",
    "When a bar turns red, fix it soon. Very low energy slows you down.",
    "NEPA takes light now and then. Fans, TV and the fridge stop until power returns or you fuel the generator.",
  ] },
  { id: "money", emoji: "💼", title: "Money and jobs", lines: [
    "Work at places to earn naira and reputation. Open Phone, then Jobs, to search every job in the city with the pay.",
    "Reputation raises your title and unlocks better jobs. Events like market rush and match day pay extra at certain places.",
  ] },
  { id: "home", emoji: "🏠", title: "Houses and land", lines: [
    "Buy land from the Buy tab, build it up from a bungalow to a mansion, collect rent and decorate the rooms.",
    "Gated estates need a pass: tap the gate, and the guard sells a 30-minute visitor pass. If you own a house inside, the gate opens for you.",
    "At home: buy foodstuff (market or Groceries), cook at the stove, then eat at the dining table.",
  ] },
  { id: "wheels", emoji: "🛺", title: "Rides and cars", lines: [
    "Cab parks have parked cabs: tap one, search where you are going, pay the fare and ride.",
    "Buy your own car in Buy, then Cars. Tap Me, then Drive your car, to hop in. Press H to honk.",
    "Traffic is polite: cars and okadas stop for people on foot and wait at red lights, and they may honk as they slow down.",
  ] },
  { id: "people", emoji: "💬", title: "People", lines: [
    "Tap Chat to talk to everyone nearby, and Talk to speak by voice with the people around you.",
    "Tap someone to say hello, chat, and get to know them. Press Z to wave and X to dance.",
    "Phone lets you call other players. Friends lets you call people you have met in the city.",
  ] },
  { id: "view", emoji: "👁️", title: "Clean view and settings", lines: [
    "The eye button at the top right hides the whole menu. Tap it again to bring it back.",
    "In Me you can switch between Auto, Day and Night, show only locations, turn sound on or off and open Music & sounds.",
    "Tap the profile card's small arrow to fold it away.",
  ] },
  { id: "lost", emoji: "🧭", title: "Feeling lost?", lines: [
    "Tap Home in the bottom bar to go to your room. Tap Goals to see what to do next.",
    "Tap a place on the minimap, or open Phone then Jobs to find somewhere to go.",
    "You can open this guide again at any time with the ? button at the top right, or in Me.",
  ] },
];

export const SHORTCUTS: [string, string][] = [
  ["W A S D / arrows", "Walk"],
  ["Q / E", "Turn the camera"],
  ["Mouse wheel / pinch", "Zoom"],
  ["Z", "Wave"],
  ["X", "Dance"],
  ["H", "Honk (in a car or on a ride)"],
];

/** The short tour shown the first time you enter the city. */
export const TOUR = ["move", "places", "bar", "needs", "lost"];
