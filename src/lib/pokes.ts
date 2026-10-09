import type { PokeKind, PokeMode, S2C } from "./protocol";
import { fileReport } from "./custody";
import { interiorKey } from "./interiors";
import { me, remoteMotion } from "./playerState";
import { POKE, POKE_DENY_TEXT } from "./socialRules";
import type { ActionResult } from "./socialApi";
import { flagOn, useSocial, type PokeAlert } from "./socialState";
import { useGame } from "./store";

/**
 * Pokes and hits, on the player's device. The server decides everything it can (who is close, who may, how often); this side asks,
 * tells the player how it went in plain words, and applies the one thing that is honest-client: the small fun and social loss a hit
 * costs the one who was hit (at most three times in ten minutes, however many hits land).
 */

const myRoom = () => {
  const s = useGame.getState();
  return s.interior ? interiorKey(s.interior) : (s.atPlace ?? "streets");
};

/** Is this player (a connection id from `remotes`) close enough to poke, and in the same room? */
export function nearEnough(peerId: string): boolean {
  const peer = useGame.getState().remotes[peerId];
  const motion = remoteMotion.get(peerId);
  if (!peer || !motion || peer.room !== myRoom()) return false;
  return Math.hypot(motion.x - me.x, motion.z - me.z) <= POKE.nearUi;
}

/** Local checks, then the websocket message. The answer comes back as onPokeAck. */
export function sendPoke(peerId: string, kind: PokeKind): ActionResult {
  const s = useGame.getState();
  if (!flagOn("pokes")) return { ok: false, message: POKE_DENY_TEXT.off };
  if (s.net !== "online") return { ok: false, message: "You need to be online to do that." };
  if (s.custody) return { ok: false, message: POKE_DENY_TEXT.custody };
  if (!nearEnough(peerId)) return { ok: false, message: POKE_DENY_TEXT.far };
  const wait = useSocial.getState().pokeCooldown[kind] - Date.now();
  if (wait > 0) return { ok: false, message: POKE_DENY_TEXT.cooldown };
  // a short hold so a double tap is one poke; the server's answer sets the real cooldown
  useSocial.setState((st) => ({ pokeCooldown: { ...st.pokeCooldown, [kind]: Date.now() + 1000 } }));
  void import("./net").then(({ net }) => net.raw({ t: "poke", to: peerId, kind }));
  return { ok: true, message: "" };
}

export function setPokeMode(mode: PokeMode): void {
  useSocial.setState({ pokeMode: mode });
  void import("./net").then(({ net }) => net.raw({ t: "pokeMode", mode }));
}

const emoji = (kind: PokeKind) => (kind === "hit" ? "\u{1F4A5}" : "\u{1F449}");

/** A little bubble over someone's head for a moment, through the same map the chat bubbles use. */
function bubble(key: string, kind: PokeKind): void {
  const until = Date.now() + POKE.fxMs;
  useGame.setState((s) => ({ bubbles: { ...s.bubbles, [key]: { text: emoji(kind), until } } }));
  setTimeout(() => {
    useGame.setState((s) => {
      if (s.bubbles[key]?.until !== until) return s;
      const next = { ...s.bubbles };
      delete next[key];
      return { bubbles: next };
    });
  }, POKE.fxMs + 100);
}

/** Someone poked or hit me. */
export function onPoked(m: Extract<S2C, { t: "poked" }>): void {
  const social = useSocial.getState();
  if (social.pokeAlerts.some((a) => a.id === m.id)) return;
  const alert: PokeAlert = { id: m.id, from: m.from, fromPid: m.fromPid, name: m.name, kind: m.kind, at: Date.now(), recent: m.recent, canReport: m.canReport };
  useSocial.setState({ pokeAlerts: [...social.pokeAlerts, alert].slice(-5) });
  const g = useGame.getState();
  if (m.kind === "hit") {
    // the first few hits in ten minutes cost a little fun and company; more than that cost nothing
    const now = Date.now();
    const lately = social.hitsTaken.filter((t) => now - t < POKE.victimWindowMs);
    if (lately.length < POKE.victimMaxCharged) {
      g.adjustNeeds({ fun: POKE.victimFun, social: POKE.victimSocial });
      useSocial.setState({ hitsTaken: [...lately, now] });
    } else useSocial.setState({ hitsTaken: lately });
    useSocial.setState({ flash: { kind: "hit", at: now } });
  }
  g.toast(m.kind === "hit" ? `${m.name} hit you.` : m.recent >= POKE.harassCount ? `${m.name} has poked you ${m.recent} times.` : `${m.name} poked you.`, m.kind === "hit" ? "bad" : "info");
}

/** The server's answer to my own poke or hit. */
export function onPokeAck(m: Extract<S2C, { t: "pokeAck" }>): void {
  const g = useGame.getState();
  const who = g.remotes[m.to]?.name ?? "them";
  if (m.ok) {
    useSocial.setState((st) => ({ pokeCooldown: { ...st.pokeCooldown, [m.kind]: Date.now() + POKE.gapMs[m.kind] } }));
    if (m.kind === "hit") {
      g.adjustNeeds({ energy: POKE.attackerEnergy });
      g.toast(`You hit ${who}.`, "info");
    } else g.toast(`You poked ${who}.`, "info");
    return;
  }
  if (m.retryMs) useSocial.setState((st) => ({ pokeCooldown: { ...st.pokeCooldown, [m.kind]: Date.now() + m.retryMs! } }));
  // "limit" is answered with nothing the other person would feel; the player just sees that it is enough
  g.toast(POKE_DENY_TEXT[m.deny ?? "far"] ?? POKE_DENY_TEXT.far, "bad");
}

/** A poke or hit happened near me: a bubble over the one it landed on. */
export function onPokeFx(m: Extract<S2C, { t: "pokeFx" }>): void {
  const connId = useGame.getState().connId;
  bubble(m.to === connId ? "me" : m.to, m.kind);
}

export function onPokeMode(mode: PokeMode): void {
  useSocial.setState({ pokeMode: mode });
}

export function dismissPokeAlert(id: number): void {
  useSocial.setState((st) => ({ pokeAlerts: st.pokeAlerts.filter((a) => a.id !== id) }));
}

/** One tap: report the one who poked or hit me to the police ("assault" after a hit, "harassment" after repeated pokes). */
export async function reportPoke(alert: PokeAlert): Promise<ActionResult> {
  const r = await fileReport(alert.fromPid, alert.kind === "hit" ? "assault" : "harassment", "poke");
  if (r.ok) dismissPokeAlert(alert.id);
  return { ok: r.ok, message: r.message };
}

/** Called every second: drop alerts that have been up long enough, and forget old hits. */
export function pokeTick(): void {
  const s = useSocial.getState();
  const now = Date.now();
  if (s.pokeAlerts.some((a) => now - a.at > POKE.alertMs)) useSocial.setState({ pokeAlerts: s.pokeAlerts.filter((a) => now - a.at <= POKE.alertMs) });
  if (s.flash && now - s.flash.at > 500) useSocial.setState({ flash: null });
}
