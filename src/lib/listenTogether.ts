import { create } from "zustand";
import type { C2S, S2C } from "./protocol";
import { inStep, nextSteps } from "./listenSync";
import type { Person } from "./social";
import { parseSpotifyLink, spotifyBridge, spotifyUri, useSpotify } from "./spotify";
import { useGame } from "./store";

/**
 * Listening to Spotify together with a friend, in step.
 * The host invites a friend (online, an accepted friend) with the link they are playing. When the friend accepts, the
 * friend's Music app loads the same link in Spotify's own player and follows the host: the host's device tells the server
 * where its song is (playing or paused, how far in, which song when Spotify says) and the server hands that to the friend.
 * The game never carries any sound: each of you plays the song from Spotify on your own device, so you each need to be
 * logged in to Spotify in your browser. Nothing is saved: it ends when either of you stops, goes offline or leaves.
 */

export type Session = { role: "host" | "guest"; peer: string; name: string; uri: string };
type Listen = {
  /** you asked a friend and are waiting for the answer */
  pending: { to: string; name: string } | null;
  /** a friend asked you */
  ask: { from: string; name: string; uri: string } | null;
  session: Session | null;
  /** guest only: is your player where the host's is? */
  sync: "joining" | "in" | "catching";
};

export const useListen = create<Listen>(() => ({ pending: null, ask: null, session: null, sync: "joining" }));

let sendMsg: (m: C2S) => void = () => {};
/** net.ts hands over its sender (the same way voice.ts gets it), so this file never imports the network. */
export function init(send: (m: C2S) => void) {
  sendMsg = send;
}

const ASK_MS = 45_000;
const INVITE_MS = 40_000;
/** the host sends the player's state this often even when nothing changes, so a guest knows they are still there */
const HEARTBEAT_MS = 5000;
/** a guest hears nothing from the host for this long: the listening ends */
const SILENCE_MS = 25_000;

const toast = (text: string, tone: "good" | "bad" | "info" = "info") => useGame.getState().toast(text, tone);
const out = (to: string, op: Extract<C2S, { t: "listen" }>["op"], extra: Partial<Extract<C2S, { t: "listen" }>> = {}) => sendMsg({ t: "listen", to, op, ...extra });

let askTimer: ReturnType<typeof setTimeout> | null = null;
let inviteTimer: ReturnType<typeof setTimeout> | null = null;
let beat: ReturnType<typeof setInterval> | null = null;
let unsub: (() => void) | null = null;

function stopTimers() {
  if (askTimer) clearTimeout(askTimer);
  if (inviteTimer) clearTimeout(inviteTimer);
  if (beat) clearInterval(beat);
  askTimer = inviteTimer = beat = null;
  unsub?.();
  unsub = null;
}

/* ---------------------------------------------------- the host ---------------------------------------------------- */

let last: { pos: number; playing: boolean; at: number; item: string | null; uri: string } | null = null;
let pushTimer: ReturnType<typeof setTimeout> | null = null;

/** Where the host's song is right now, from the player's last report. */
function hostNow() {
  const s = useSpotify.getState();
  const now = Date.now();
  return { playing: s.playing, pos: s.playing ? s.position + (now - s.positionAt) / 1000 : s.position, item: s.item };
}

function pushState() {
  const sess = useListen.getState().session;
  const link = useSpotify.getState().link;
  if (!sess || sess.role !== "host" || !link) return;
  const now = hostNow();
  const uri = spotifyUri(link);
  last = { pos: now.pos, playing: now.playing, at: Date.now(), item: now.item, uri };
  out(sess.peer, "state", { uri, item: now.item ?? undefined, playing: now.playing, pos: now.pos });
}

/** Tell the friend soon (a burst of changes becomes one message). */
function pushSoon() {
  if (pushTimer) return;
  pushTimer = setTimeout(() => {
    pushTimer = null;
    pushState();
  }, 150);
}

function startHosting() {
  stopTimers();
  last = null;
  pushState();
  beat = setInterval(pushState, HEARTBEAT_MS);
  unsub = useSpotify.subscribe((s, prev) => {
    // the host took their link away: there is nothing left to share
    if (!s.link && prev.link) return end(true);
    if (s.playing !== prev.playing || s.item !== prev.item || s.link !== prev.link) return pushSoon();
    // the host jumped within the song: more than a couple of seconds off from where it should be by now
    if (s.position !== prev.position && last) {
      const expected = last.pos + (last.playing ? (s.positionAt - last.at) / 1000 : 0);
      if (Math.abs(s.position - expected) > 2) pushSoon();
    }
  });
}

/* ---------------------------------------------------- the guest ---------------------------------------------------- */

let hostSays: { playing: boolean; pos: number; at: number; item: string | null } | null = null;
let heardAt = 0;
let loadedItem: string | null = null;
let lastMove = 0;
let lastSeek = 0;

/** Look at both players and set right whatever is out. Runs when the host sends news, at every player update, and once a second. */
export function tick() {
  const sess = useListen.getState().session;
  if (!sess || sess.role !== "guest") return;
  if (Date.now() - heardAt > SILENCE_MS) {
    toast(`Lost ${sess.name}, so the listening together ended.`, "info");
    return end(true);
  }
  const sp = useSpotify.getState();
  const bridge = spotifyBridge.current;
  if (!hostSays || !sp.ready || !bridge) return;
  const now = Date.now();
  // a playlist plays one song at a time: when Spotify tells the host which one, the guest opens that song
  if (hostSays.item && hostSays.item !== loadedItem && hostSays.item !== sess.uri) {
    loadedItem = hostSays.item;
    bridge.load(hostSays.item);
    lastMove = now;
    lastSeek = now;
    return;
  }
  const target = { playing: hostSays.playing, pos: hostSays.pos + (hostSays.playing ? (now - hostSays.at) / 1000 : 0) };
  const mine = { playing: sp.playing, pos: sp.playing ? sp.position + (now - sp.positionAt) / 1000 : sp.position };
  for (const step of nextSteps(target, mine, { move: now - lastMove, seek: now - lastSeek })) {
    if (step.do === "play") {
      // paused partway: carry on from there; a song that has not started: play it
      if (sp.position > 1) bridge.resume();
      else bridge.play();
      lastMove = now;
    } else if (step.do === "pause") {
      bridge.pause();
      lastMove = now;
    } else {
      bridge.seek(Math.max(0, step.to));
      lastSeek = now;
    }
  }
  const sync = inStep(target, mine) ? "in" : "catching";
  if (useListen.getState().sync !== sync) useListen.setState({ sync });
}

function startGuest() {
  stopTimers();
  hostSays = null;
  loadedItem = null;
  lastMove = lastSeek = 0;
  heardAt = Date.now();
  beat = setInterval(tick, 1000);
  unsub = useSpotify.subscribe((s, prev) => {
    // the player was rebuilt (a new link): it has to be told which song again
    if (!s.ready && prev.ready) loadedItem = null;
    // the player has just loaded, or reported a new position: set right whatever is out
    if (s.ready !== prev.ready || s.playing !== prev.playing || s.positionAt !== prev.positionAt) tick();
  });
}

/* ------------------------------------------------------ the ways in ------------------------------------------------------ */

/** Ask a friend to listen with you. Returns what is wrong in plain words, or null when the invitation went out. */
export function invite(p: Person): string | null {
  const g = useGame.getState();
  const l = useListen.getState();
  const link = useSpotify.getState().link;
  if (g.net !== "online") return "You need to be online in the city to listen together.";
  if (!link) return "Add a Spotify link first, then you can share it.";
  if (l.session || l.pending) return "You are already listening with someone. Stop that first.";
  if (!p.online) return `${p.name} is offline right now.`;
  useListen.setState({ pending: { to: p.pid, name: p.name } });
  out(p.pid, "invite", { uri: spotifyUri(link) });
  if (inviteTimer) clearTimeout(inviteTimer);
  inviteTimer = setTimeout(() => {
    const cur = useListen.getState().pending;
    if (cur?.to === p.pid) {
      useListen.setState({ pending: null });
      toast(`${p.name} did not answer.`, "info");
    }
  }, INVITE_MS);
  return null;
}

export function cancelInvite() {
  const p = useListen.getState().pending;
  if (!p) return;
  out(p.to, "end");
  if (inviteTimer) clearTimeout(inviteTimer);
  inviteTimer = null;
  useListen.setState({ pending: null });
}

/** Answer a friend's invitation. Call it from the tap, so the browser lets the song start. */
export function respond(accept: boolean) {
  const a = useListen.getState().ask;
  if (!a) return;
  if (askTimer) clearTimeout(askTimer);
  askTimer = null;
  useListen.setState({ ask: null });
  const link = accept ? parseSpotifyLink(a.uri) : null;
  if (!accept || !link) {
    out(a.from, "decline");
    return;
  }
  if (useListen.getState().session) end(true);
  useListen.setState({ session: { role: "guest", peer: a.from, name: a.name, uri: spotifyUri(link) }, sync: "joining" });
  useSpotify.setState({ override: link });
  out(a.from, "accept");
  startGuest();
  toast(`Listening with ${a.name}. Open Music to see the song.`, "good");
}

/** Stop listening together, here and (when `tell`) for the friend too. Your own playlist comes back. */
export function end(tell = true) {
  const s = useListen.getState();
  if (s.pending && tell) out(s.pending.to, "end");
  if (s.session && tell) out(s.session.peer, "end");
  stopTimers();
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = null;
  const wasGuest = s.session?.role === "guest";
  useListen.setState({ pending: null, session: null, sync: "joining" });
  hostSays = null;
  if (wasGuest) useSpotify.setState({ override: null });
}

/** Everything from the server about listening together. */
export function onMessage(m: Extract<S2C, { t: "listen" }>) {
  const l = useListen.getState();
  switch (m.op) {
    case "invite": {
      if (!m.uri || !parseSpotifyLink(m.uri)) return;
      if (l.ask || l.session || l.pending) return out(m.from, "decline");
      useListen.setState({ ask: { from: m.from, name: m.name, uri: m.uri } });
      if (askTimer) clearTimeout(askTimer);
      askTimer = setTimeout(() => {
        if (useListen.getState().ask?.from === m.from) useListen.setState({ ask: null });
      }, ASK_MS);
      break;
    }
    case "accept":
      if (l.pending?.to !== m.from || l.session) return;
      if (inviteTimer) clearTimeout(inviteTimer);
      inviteTimer = null;
      useListen.setState({ pending: null, session: { role: "host", peer: m.from, name: l.pending.name, uri: m.uri ?? "" } });
      startHosting();
      toast(`${l.pending.name} is listening with you.`, "good");
      break;
    case "decline":
      if (l.pending?.to === m.from) {
        if (inviteTimer) clearTimeout(inviteTimer);
        inviteTimer = null;
        toast(`${l.pending.name} can't listen right now.`, "info");
        useListen.setState({ pending: null });
      }
      break;
    case "end":
      if (l.ask?.from === m.from) {
        if (askTimer) clearTimeout(askTimer);
        useListen.setState({ ask: null });
      }
      if (l.pending?.to === m.from) useListen.setState({ pending: null });
      if (l.session?.peer === m.from) {
        toast(`${l.session.name} stopped listening together.`, "info");
        end(false);
      }
      break;
    case "state": {
      if (l.session?.role !== "guest" || l.session.peer !== m.from) return;
      heardAt = Date.now();
      // the host switched to something else to share
      if (m.uri && m.uri !== l.session.uri) {
        const link = parseSpotifyLink(m.uri);
        if (link) {
          useListen.setState({ session: { ...l.session, uri: m.uri } });
          useSpotify.setState({ override: link });
          loadedItem = null;
        }
      }
      hostSays = { playing: !!m.playing, pos: m.pos ?? 0, at: Date.now(), item: m.item ?? null };
      tick();
      break;
    }
  }
}

/** A friend went offline. */
export function onPeerOffline(pid: string) {
  const l = useListen.getState();
  if (l.ask?.from === pid) useListen.setState({ ask: null });
  if (l.pending?.to === pid) useListen.setState({ pending: null });
  if (l.session?.peer === pid) {
    toast(`${l.session.name} went offline, so the listening together ended.`, "info");
    end(false);
  }
}

/** The connection to the city dropped. */
export function onDisconnect() {
  const l = useListen.getState();
  if (l.session) toast("The connection dropped, so the listening together ended.", "info");
  if (askTimer) clearTimeout(askTimer);
  askTimer = null;
  useListen.setState({ ask: null });
  end(false);
}
