import { audio } from "./audio";
import { grooveRewind, grooveRunning, grooveSetLevel, grooveStart, grooveStop } from "./clubGroove";
import { rt } from "./interiorRuntime";
import { onMusicEnd, outputLevel, pause, playQueue, playSynth, resume, stopFading, useMusic, type PlayableTrack } from "./music";
import { useClub, useSound } from "./soundStore";
import { useSpotify } from "./spotify";
import { useGame } from "./store";
import { listApproved, type Track } from "./tracks";

/**
 * Music in the clubs. While the player is inside a room whose layout has vibe "club":
 *  1. the artists' approved tracks play first, shuffled, one after another and round again (music.ts keeps the queue,
 *     skips a track that errors, and credits each one on the NowPlaying card);
 *  2. if there are none, or the server cannot be reached, the house band plays instead: an original afrobeat / amapiano
 *     groove made in code (clubGroove.ts), shown on the same card as "Omo'badan Club Mix".
 * The player's own choice always wins: a track picked from the Music sheet, or their Spotify playlist, takes the floor and
 * the club stays out of the way (until their track ends, or they ask for the club music back). Leaving the club (the door,
 * a forced exit, the tower deck) fades the club music out; a track the player started themselves is never touched.
 * The groove follows useMusic ("playing" on a synth track), so pause, play and stop on the card work on it like on a file.
 */

/** The house band's mix, credited like any track. */
export const HOUSE_MIX: PlayableTrack = { id: "house-mix", title: "Omo'badan Club Mix", artist: "The house band", rightsHolder: "Omo'badan", createdAt: 0, synth: true };

const FADE_IN = 1.5;
const FADE_OUT = 1.2;
/** how long a club waits for the track list before the house band starts (the list is remembered once it arrives) */
const ASK_MS = 1000;
/** a track that has not started after this long is given up on for the house band (a slow or hanging server) */
const STALL_MS = 6000;
/** how long a fetched track list is trusted; an empty one (or no server) is not asked for again any sooner */
const LIST_TTL = 5 * 60_000;

/* ------------------------------------------------ the artists' list ------------------------------------------------ */

let approved: { at: number; tracks: Track[] } | null = null;
let inflight: Promise<Track[]> | null = null;

const cachedList = () => (approved && Date.now() - approved.at < LIST_TTL ? approved.tracks : null);

function fetchList(): Promise<Track[]> {
  inflight ??= listApproved()
    .then((tracks) => {
      approved = { at: Date.now(), tracks };
      return tracks;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/* ------------------------------------------------- what the club is doing ------------------------------------------------- */

let on = false;
let inClub = false;
let yielded = false;
/** why the club stepped aside: the player picked a track (it may come back when that ends), pressed stop, or opened Spotify */
let why: "track" | "stop" | "spotify" | null = null;
/** bumped whenever the plan changes, so an answer to an older plan is dropped */
let token = 0;
let stall: ReturnType<typeof setTimeout> | null = null;
/** the club paused itself because the tab was hidden */
let hiddenPause = false;
/** the club is stopping its own music: that is not the player pressing stop */
let selfStop = false;
/** seconds the groove fades out over when its card goes */
let outSecs = FADE_OUT;
let waitingCtx: AudioContext | null = null;

const alive = () => on && inClub && !yielded;
const clubOwns = () => useMusic.getState().source === "club";
/** the player is already listening to something of their own */
const userHasFloor = () => {
  const m = useMusic.getState();
  return (m.source === "user" && m.playing) || useSpotify.getState().playing;
};

function clearStall() {
  if (stall) clearTimeout(stall);
  stall = null;
}

/** Take the club's music off the card, fading it out; a no-op when it is the player's own music. */
function silence(secs: number) {
  if (!clubOwns() || !useMusic.getState().current) return;
  outSecs = secs;
  selfStop = true;
  stopFading(secs);
  selfStop = false;
  outSecs = FADE_OUT;
}

function giveWay(reason: "track" | "stop" | "spotify") {
  if (yielded) return;
  yielded = true;
  why = reason;
  token++;
  clearStall();
  useClub.setState({ yielded: true });
  silence(reason === "spotify" ? 0.6 : FADE_OUT);
}

/** The house band: the mix goes on the card and the groove follows it. */
function playHouse() {
  if (!alive() || userHasFloor()) return;
  clearStall();
  grooveRewind();
  playSynth(HOUSE_MIX, "club");
}

function launch(list: Track[] | null, my: number) {
  if (my !== token || !alive() || userHasFloor()) return;
  if (!list || !list.length) return playHouse();
  playQueue(list, { source: "club", loop: true, shuffle: true, fadeIn: FADE_IN, onDead: playHouse });
  clearStall();
  stall = setTimeout(() => {
    const m = useMusic.getState();
    if (my === token && alive() && m.source === "club" && !m.current?.synth && !m.playing && !m.blocked) playHouse();
  }, STALL_MS);
}

/** Start the club's music: from the remembered list right away when there is one (a tap's permission is still fresh then). */
function begin() {
  const my = ++token;
  const hit = cachedList();
  if (hit) return launch(hit, my);
  const late = new Promise<null>((done) => setTimeout(() => done(null), ASK_MS));
  void Promise.race([fetchList(), late]).then((list) => launch(list, my));
}

function enter() {
  inClub = true;
  yielded = false;
  why = null;
  hiddenPause = false;
  useClub.setState({ inClub: true, yielded: false });
  arm(true);
  if (useSpotify.getState().playing) return giveWay("spotify");
  if (userHasFloor()) return giveWay("track");
  begin();
}

function leave(quick = false) {
  inClub = false;
  yielded = false;
  why = null;
  hiddenPause = false;
  token++;
  clearStall();
  arm(false);
  useClub.setState({ inClub: false, yielded: false });
  silence(quick ? 0.05 : FADE_OUT);
}

/** Is the player inside a club right now? rt.layout is set before the store's `interior` changes, and cleared before it goes. */
const isClub = () => !!useGame.getState().interior && rt.layout?.vibe === "club";

function sync() {
  const now = isClub();
  if (now && !inClub) enter();
  else if (!now && inClub) leave();
}

/** From the Interior panel: bring the club music back after it was stopped or stepped aside. Call it from the tap. */
export function playClubMusic() {
  if (!on || !inClub) return;
  audio.start();
  yielded = false;
  why = null;
  useClub.setState({ yielded: false });
  begin();
}

/* ------------------------------------------------------ the groove ------------------------------------------------------ */

/** Start the groove if the audio engine is up and allowed to run; otherwise wait for it (a tap, or the context waking). */
function startGroove(): boolean {
  const ctx = audio.ctx;
  if (!ctx) return false;
  if (ctx.state !== "running") {
    // once the user has touched the page the browser lets the context run; before that, asking only logs a warning
    if (typeof navigator === "undefined" || !navigator.userActivation || navigator.userActivation.hasBeenActive) ctx.resume().catch(() => {});
    if (waitingCtx !== ctx) {
      waitingCtx = ctx;
      ctx.addEventListener("statechange", onCtxState);
    }
    return false;
  }
  return grooveStart(ctx, outputLevel(), FADE_IN);
}

function onCtxState() {
  const ctx = audio.ctx;
  if (!ctx || ctx.state !== "running") return;
  ctx.removeEventListener("statechange", onCtxState);
  waitingCtx = null;
  const m = useMusic.getState();
  if (alive() && m.source === "club" && m.blocked) resume();
}

/** The groove follows the card: it plays while a synth track is the current one and is playing. */
function mirror() {
  const m = useMusic.getState();
  const want = !!m.current?.synth && m.playing;
  if (want && !grooveRunning()) {
    if (!startGroove()) useMusic.setState({ playing: false, blocked: true });
  } else if (!want && grooveRunning()) grooveStop(outSecs);
}

function onMusic(s: ReturnType<typeof useMusic.getState>, prev: typeof s) {
  mirror();
  if (!inClub) return;
  // the player picked a track from the Music sheet: it wins
  if (!yielded && s.source === "user" && s.current && (prev.source !== "user" || prev.current?.id !== s.current.id)) giveWay("track");
  // the player pressed stop on the club's music
  else if (!yielded && prev.source === "club" && !s.current && !selfStop) giveWay("stop");
}

/* -------------------------------------------- taps, the tab, the player's music -------------------------------------------- */

const GESTURES = ["pointerdown", "pointerup", "touchend", "click", "keydown"] as const;
let armed = false;

/** A tap or key in the club: wake the audio engine from inside the gesture and retry anything the browser refused. */
function onGesture() {
  audio.start();
  const m = useMusic.getState();
  if (alive() && m.source === "club" && m.blocked) resume();
}

function arm(want: boolean) {
  if (want === armed || typeof window === "undefined") return;
  armed = want;
  for (const g of GESTURES) {
    if (want) window.addEventListener(g, onGesture, { capture: true, passive: true });
    else window.removeEventListener(g, onGesture, { capture: true });
  }
}

/** A hidden tab does not play the club's music; it carries on when the tab is back. */
function onVisibility() {
  if (document.hidden) {
    const m = useMusic.getState();
    if (inClub && m.source === "club" && m.playing) {
      hiddenPause = true;
      pause();
    }
  } else if (hiddenPause) {
    hiddenPause = false;
    if (alive() && clubOwns() && !useMusic.getState().playing) resume();
  }
}

/**
 * Hook the club music up. Called once from AudioBridge; returns the cleanup, which stops the music at once.
 * Idempotent, so React's double-mounted effects in development are harmless.
 */
export function startClubMusic(): () => void {
  if (on || typeof window === "undefined") return () => {};
  on = true;
  const unsubs = [
    useGame.subscribe((s, prev) => {
      if (s.interior !== prev.interior) sync();
    }),
    useMusic.subscribe(onMusic),
    useSpotify.subscribe((s, prev) => {
      if (s.playing && !prev.playing && alive()) giveWay("spotify");
    }),
    useSound.subscribe(() => {
      if (grooveRunning()) grooveSetLevel(outputLevel());
    }),
    // a track the player started has played out while they are still in the club: the house sound comes back
    onMusicEnd((source) => {
      if (inClub && yielded && why === "track" && source === "user") {
        yielded = false;
        why = null;
        useClub.setState({ yielded: false });
        begin();
      }
    }),
  ];
  document.addEventListener("visibilitychange", onVisibility);
  sync(); // already inside a club when this starts (a hot reload)
  return () => {
    document.removeEventListener("visibilitychange", onVisibility);
    leave(true);
    grooveStop(0.05);
    for (const u of unsubs) u();
    if (waitingCtx) waitingCtx.removeEventListener("statechange", onCtxState);
    waitingCtx = null;
    on = false;
  };
}
