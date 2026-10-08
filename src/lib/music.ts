import { create } from "zustand";
import { trackUrl, type Track } from "./tracks";
import { useSound } from "./soundStore";
import { spotifyBridge } from "./spotify";

/** An artist's track, or the club's house mix (`synth`: drawn in code by clubGroove.ts, not an audio file). */
export type PlayableTrack = Track & { url?: string; synth?: boolean };
/** Who started what is playing: the player (Music sheet) or a club's sound system. */
export type MusicSource = "user" | "club";
type MusicState = {
  current: PlayableTrack | null;
  playing: boolean;
  error: string;
  source: MusicSource | null;
  /** the browser wants a tap before it lets this play */
  blocked: boolean;
  /** how many tracks are in the running queue (0 for a single track) */
  queued: number;
};

export const useMusic = create<MusicState>(() => ({ current: null, playing: false, error: "", source: null, blocked: false, queued: 0 }));

const CLEAR = { current: null, playing: false, error: "", source: null, blocked: false, queued: 0 } as const;

let el: HTMLAudioElement | null = null;

/** How far into the track the player is, in seconds (0 for the house mix, which has no end, and when nothing is loaded). */
export function trackTime(): { pos: number; dur: number } {
  if (!el || !el.getAttribute("src")) return { pos: 0, dur: 0 };
  return { pos: el.currentTime || 0, dur: Number.isFinite(el.duration) ? el.duration : 0 };
}

/** Jump to a place in the track that is playing. */
export function seekTrack(secs: number) {
  if (el && el.getAttribute("src") && Number.isFinite(el.duration)) el.currentTime = Math.min(Math.max(0, secs), el.duration);
}

/** The Music slider (a little hotter than the theme song), nothing while muted. */
export const outputLevel = () => {
  const s = useSound.getState();
  return s.muted ? 0 : Math.min(1, s.music * 1.4);
};

/* ----------------------------------------------- volume and fades ----------------------------------------------- */

/** 0 to 1 on top of the volume: the fade in and out of a club's tracks. (iOS ignores element volume, so there it is a cut.) */
let fadeK = 1;
let fadeTimer: ReturnType<typeof setInterval> | null = null;

function volume() {
  if (!el) return;
  el.volume = Math.min(1, Math.max(0, outputLevel() * fadeK));
  el.muted = useSound.getState().muted; // iOS honours this one
}

function cancelFade() {
  if (fadeTimer) clearInterval(fadeTimer);
  fadeTimer = null;
}

function fade(to: number, secs: number, done?: () => void) {
  cancelFade();
  const from = fadeK;
  const t0 = performance.now();
  fadeTimer = setInterval(() => {
    const k = Math.min(1, (performance.now() - t0) / (secs * 1000));
    fadeK = from + (to - from) * k;
    volume();
    if (k >= 1) {
      cancelFade();
      done?.();
    }
  }, 50);
}

/* ------------------------------------------------ the one player ------------------------------------------------ */

/** Bumped by every start and stop, so a late answer from an older play() is ignored. */
let seq = 0;

type Queue = { tracks: PlayableTrack[]; i: number; loop: boolean; shuffle: boolean; source: MusicSource; fails: number; lastOk?: PlayableTrack; onDead?: () => void };
let q: Queue | null = null;

/** Told when a single track the player started has played to its end (not when they stopped it). */
const endListeners = new Set<(source: MusicSource | null) => void>();
export function onMusicEnd(fn: (source: MusicSource | null) => void) {
  endListeners.add(fn);
  return () => void endListeners.delete(fn);
}

function ensure() {
  if (el) return el;
  const a = new Audio();
  el = a;
  a.preload = "auto";
  a.onended = () => advance(false);
  // a stale error from a source that was just replaced or removed has no error or no source left on the element
  a.onerror = () => {
    if (a.error && a.getAttribute("src")) advance(true);
  };
  useSound.subscribe(volume);
  return a;
}

function shuffled(list: PlayableTrack[], notFirst?: PlayableTrack) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // never the same song twice in a row when the queue comes round
  if (notFirst && a.length > 1 && a[0].id === notFirst.id) [a[0], a[1]] = [a[1], a[0]];
  return a;
}

/** The browser said no (it wants a tap first), or this track cannot be played. */
function refused(e: unknown) {
  const name = e instanceof DOMException ? e.name : "";
  if (name === "AbortError") return; // replaced or paused while it was loading: whoever did that has the floor
  if (name === "NotAllowedError") {
    useMusic.setState({ playing: false, blocked: true, error: "Tap again to allow sound." });
    return;
  }
  useMusic.setState({ playing: false });
  advance(true);
}

async function begin(track: PlayableTrack, source: MusicSource, fadeIn = 0) {
  const a = ensure();
  const my = ++seq;
  cancelFade();
  fadeK = fadeIn ? 0 : 1;
  a.loop = false;
  a.src = track.url ?? trackUrl(track.id);
  volume();
  useMusic.setState({ current: track, source, error: "", blocked: false, queued: q ? q.tracks.length : 0 });
  try {
    await a.play();
    if (my !== seq) return;
    useMusic.setState({ playing: true });
    if (fadeIn) fade(1, fadeIn);
  } catch (e) {
    if (my === seq) refused(e);
  }
}

/** The track ended, or could not be played: on to the next one in a queue, and round again when it is a looping one. */
function advance(failed: boolean) {
  if (!q) {
    if (failed) useMusic.setState({ playing: false, error: "Could not play that track." });
    else {
      const source = useMusic.getState().source;
      stop();
      for (const fn of endListeners) fn(source);
    }
    return;
  }
  q.fails = failed ? q.fails + 1 : 0;
  if (!failed) q.lastOk = q.tracks[q.i];
  // every track in a row failed (no server, files gone): hand back to whoever asked, or give up
  if (q.fails >= q.tracks.length) {
    const dead = q.onDead;
    q = null;
    if (dead) dead();
    else stop();
    return;
  }
  const last = q.tracks[q.i];
  q.i++;
  if (q.i >= q.tracks.length) {
    if (!q.loop) return stop();
    q.i = 0;
    if (q.shuffle) q.tracks = shuffled(q.tracks, q.lastOk ?? last);
  }
  void begin(q.tracks[q.i], q.source);
}

/** Play one track in the city: the player's own pick from the Music sheet. Their recording only, credited in the UI. */
export async function play(track: PlayableTrack) {
  const s = useMusic.getState();
  if (s.current?.id === track.id) {
    if (s.playing) return pause();
    if (!s.error && el?.getAttribute("src")) return resume();
  }
  q = null;
  // one thing at a time: Spotify, if it is playing, is paused (it picks up from the same place)
  spotifyBridge.current?.pause();
  await begin(track, "user");
}

export type QueueOptions = {
  source?: MusicSource;
  /** start again from the top when the last one ends */
  loop?: boolean;
  /** shuffle now, and again each time the queue comes round */
  shuffle?: boolean;
  /** seconds to fade the first track in */
  fadeIn?: number;
  /** called once when every track in a row failed to play; without it the player just stops */
  onDead?: () => void;
};

/** Play tracks one after another: each ends into the next, a track that errors is skipped. Fire and forget; watch useMusic. */
export function playQueue(tracks: PlayableTrack[], o: QueueOptions = {}) {
  const list = tracks.filter((t) => !t.synth);
  if (!list.length) {
    if (o.onDead) o.onDead();
    else stop();
    return;
  }
  q = { tracks: o.shuffle ? shuffled(list) : list.slice(), i: 0, loop: !!o.loop, shuffle: !!o.shuffle, source: o.source ?? "user", fails: 0, onDead: o.onDead };
  void begin(q.tracks[0], q.source, o.fadeIn);
}

/** The next track in the running queue. */
export function skip() {
  if (q && q.tracks.length > 1) advance(false);
}

/**
 * Put a track made in code (the club's house mix) on the card. It draws no sound itself: whoever makes it follows
 * `playing`, so pause(), resume() and stop() from the card work on it like on any track.
 */
export function playSynth(track: PlayableTrack, source: MusicSource) {
  q = null;
  seq++;
  cancelFade();
  fadeK = 1;
  if (el) {
    el.pause();
    el.removeAttribute("src");
  }
  useMusic.setState({ current: { ...track, synth: true }, source, playing: true, error: "", blocked: false, queued: 0 });
}

export function pause() {
  el?.pause();
  useMusic.setState({ playing: false });
}

/** Carry on after a pause or a refused start. Call it straight from a tap or key so the browser lets it through. */
export function resume() {
  const s = useMusic.getState();
  if (!s.current || s.playing) return;
  if (s.current.synth) {
    useMusic.setState({ playing: true, blocked: false, error: "" });
    return;
  }
  const a = ensure();
  if (!a.getAttribute("src")) {
    void begin(s.current, s.source ?? "user");
    return;
  }
  const my = seq;
  volume();
  a.play().then(
    () => {
      if (my !== seq) return;
      useMusic.setState({ playing: true, blocked: false, error: "" });
      // a track whose start was refused (so its fade-in never began) would otherwise play on at volume 0
      if (fadeK < 1 && !fadeTimer) fade(1, 0.6);
    },
    (e) => {
      if (my === seq) refused(e);
    },
  );
}

export function stop() {
  q = null;
  seq++;
  cancelFade();
  fadeK = 1;
  if (el) {
    el.pause();
    el.removeAttribute("src");
  }
  useMusic.setState(CLEAR);
}

/** Stop with the sound running out over `secs` (leaving a club). The card goes at once; a new track can start meanwhile. */
export function stopFading(secs: number) {
  const a = el;
  if (!a || a.paused || secs <= 0) return stop();
  q = null;
  const my = ++seq;
  useMusic.setState(CLEAR);
  fade(0, secs, () => {
    if (my !== seq) return;
    a.pause();
    a.removeAttribute("src");
    fadeK = 1;
  });
}
