import { isOpen, opensAt } from "./events";
import { useGame } from "./store";
import { gameMinutes } from "./time";

/**
 * Service desks: ONE mechanism for every counter that does business (police, EFCC, bail, hospital reception, post, donations, fire emergency desk).
 * A desk is a `servicedesk` furniture item. Tapping it walks the player there and opens the ServicePanel modal for the desk's service:
 *   Item.service (on the layout item) ?? Place.service (on the place) -> openService(id, placeId, Item.variant).
 * To add a service: add its id here, add its SERVICES row, add its body to components/ui/services/index.tsx. Nothing else is shared.
 */
export type ServiceId = "police" | "efcc" | "bail" | "hospital" | "post" | "donate" | "incident";

export type ServiceCtx = {
  id: ServiceId;
  /** the place whose desk was used (its id is also the interior's id) */
  placeId: string;
  /** free text from the desk item's `variant` or from the caller, e.g. "emergency" for the hospital */
  arg?: string;
};

export type ServiceDef = {
  id: ServiceId;
  /** modal heading */
  title: string;
  emoji: string;
  /** accent colour: the lit strip on the desk, the modal header, the side-card button */
  tint: string;
  /** side-card button text (walks to the desk) */
  verb: string;
  /** the panel body needs a full account on a live server; the shell explains this in demo mode */
  online: boolean;
};

export const SERVICES: Record<ServiceId, ServiceDef> = {
  police: { id: "police", title: "Police counter", emoji: "\u{1F693}", tint: "#1d3a8a", verb: "Go to the police counter", online: true },
  efcc: { id: "efcc", title: "EFCC counter", emoji: "\u{1F50E}", tint: "#1f9d55", verb: "Go to the EFCC counter", online: true },
  bail: { id: "bail", title: "Bail desk", emoji: "\u{26D3}\u{FE0F}", tint: "#475569", verb: "Go to the bail desk", online: true },
  hospital: { id: "hospital", title: "Reception", emoji: "\u{1FA7A}", tint: "#dc2626", verb: "Go to reception", online: false },
  post: { id: "post", title: "Post counter", emoji: "\u{1F4EE}", tint: "#1f7a46", verb: "Go to the post counter", online: true },
  donate: { id: "donate", title: "Donations desk", emoji: "\u{1F96B}", tint: "#d9822b", verb: "Go to the donations desk", online: false },
  incident: { id: "incident", title: "Emergency desk", emoji: "\u{1F692}", tint: "#c0392b", verb: "Go to the emergency desk", online: false },
};

/** Things that stop the player using a desk or a place action (custody today). Features push a function; null means "no objection". */
export const blockers: (() => string | null)[] = [];
export const blockedReason = (): string | null => {
  for (const b of blockers) {
    const r = b();
    if (r) return r;
  }
  return null;
};

/**
 * Open the modal for a service. Returns an error message to toast, or null when it opened.
 * A held player may only use the bail desk (their own custody summary); everything else says why not.
 */
export function openService(id: ServiceId, placeId: string, arg?: string): string | null {
  const s = useGame.getState();
  if (!s.profile) return "Sign in first.";
  const why = blockedReason();
  if (why && id !== "bail") return why;
  if (s.deck) return "Come down from the tower first.";
  if (!isOpen(placeId, gameMinutes(Date.now(), s.clockOverride) / 60)) return `Closed for now. Opens at ${opensAt(placeId)}.`;
  useGame.setState({ service: { id, placeId, arg } });
  return null;
}

export const closeService = () => useGame.setState({ service: null });
