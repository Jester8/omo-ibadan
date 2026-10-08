import { audio } from "./audio";
import { useMusic } from "./music";
import { useClub, useSound } from "./soundStore";
import { useSpotify } from "./spotify";

/**
 * The city's theme song, played (with permission) from the landing page onwards, looping.
 * It tries to start as soon as the page has loaded; browsers usually refuse sound before the visitor
 * has touched the page, so it then starts on the first tap, click or key press anywhere.
 * It follows the one Sound switch (remembered in localStorage by the audio engine), fades in and out
 * (through a Web Audio gain once the engine is running, as iOS ignores element volume), pauses while the
 * tab is hidden or an artist's track is playing. It also keeps out of a club for the whole visit (the club has its own
 * music, see clubMusic.ts) and comes back, fading in, when the player walks out.
 */
export const THEME_SONG = { title: "Ise Oluwa Ko Si Eni To Ye", artist: "Haruna Ishola", src: "/bg/ise-oluwa-v1.mp3" };

const FADE_IN = 2;
const FADE_OUT = 0.8;
/** about 60% at the default Music level, following the Music slider */
const level = () => Math.min(1, audio.settings.music * 1.2);

let el: HTMLAudioElement | null = null;
let gain: GainNode | null = null;
let started = false;
/** the browser refused to play before the visitor touched the page */
let blocked = false;
let fadeTimer: ReturnType<typeof setTimeout> | null = null;
let rampTimer: ReturnType<typeof setInterval> | null = null;

// it also steps aside while the player is playing their own Spotify playlist, and inside a club
const wanted = () =>
  started && !audio.settings.muted && audio.settings.theme && !document.hidden && !useMusic.getState().playing && !useSpotify.getState().playing && !useClub.getState().inClub;

let routed = false;

/** Send the song through a Web Audio gain once the engine is running; until then element volume does the fades. */
function route() {
  const ctx = audio.ctx;
  if (routed || !el || !ctx || ctx.state !== "running") return;
  routed = true;
  try {
    if (rampTimer) clearInterval(rampTimer);
    rampTimer = null;
    const g = ctx.createGain();
    g.gain.value = el.volume;
    ctx.createMediaElementSource(el).connect(g).connect(ctx.destination);
    el.volume = 1;
    gain = g;
  } catch {
    gain = null; // stays on element volume (no fades on iOS, but it still plays)
  }
}

/** Built on the first wanted play: after the page has loaded, and never for someone who left the sound off. */
function ensure(): HTMLAudioElement {
  if (el) return el;
  el = new Audio();
  el.src = THEME_SONG.src;
  el.loop = true;
  el.preload = "auto";
  el.volume = 0;

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: THEME_SONG.title,
      artist: THEME_SONG.artist,
      album: "Omo'badan",
      artwork: [{ src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }],
    });
    // the lock-screen buttons are the same Sound switch as in the game
    navigator.mediaSession.setActionHandler("play", () => useSound.getState().set({ muted: false }));
    navigator.mediaSession.setActionHandler("pause", () => useSound.getState().set({ muted: true }));
  }
  return el;
}

function fadeTo(to: number, secs: number, then?: () => void) {
  if (!el) return;
  if (fadeTimer) clearTimeout(fadeTimer);
  if (rampTimer) clearInterval(rampTimer);
  fadeTimer = rampTimer = null;
  const ctx = audio.ctx;
  if (gain && ctx) {
    const t = ctx.currentTime;
    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(gain.gain.value, t);
    gain.gain.linearRampToValueAtTime(to, t + secs);
  } else {
    const a = el;
    const from = a.volume;
    const t0 = performance.now();
    rampTimer = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / (secs * 1000));
      a.volume = from + (to - from) * k;
      if (k >= 1 && rampTimer) clearInterval(rampTimer);
    }, 50);
  }
  if (then) fadeTimer = setTimeout(then, secs * 1000);
}

/** Bring the song in line with the Sound switch, the tab and any artist's track. */
function sync() {
  if (!started) return;
  if (wanted()) {
    const a = ensure();
    route();
    if (a.paused) {
      // called straight from the tap or the unmute click when there is one (iOS needs that)
      a.play().then(
        () => {
          blocked = false;
          disarm();
        },
        () => {
          blocked = true; // no sound allowed yet: wait for the first touch, silent until then
          fadeTo(0, 0);
        },
      );
    }
    fadeTo(level(), FADE_IN);
    if (!a.paused) disarm();
    return;
  }
  if (!el || el.paused) return;
  const a = el;
  if (document.hidden) {
    fadeTo(0, 0);
    a.pause(); // timers are throttled in hidden tabs, so no fade
    return;
  }
  fadeTo(0, FADE_OUT, () => !wanted() && a.pause());
}

const GESTURES = ["pointerdown", "pointerup", "touchend", "click", "keydown"] as const;

/** The first touch of the page: start the sound engine and, if autoplay was refused, the song. */
function onGesture() {
  audio.start();
  const ctx = audio.ctx;
  if (ctx && ctx.state !== "running") void ctx.resume().then(sync, () => {});
  if (blocked || (el && !routed)) sync();
}
function arm() {
  for (const g of GESTURES) window.addEventListener(g, onGesture, { capture: true, passive: true });
}
function disarm() {
  // once the song plays and is routed through the engine, the listeners have done their job
  if (!routed) return;
  for (const g of GESTURES) window.removeEventListener(g, onGesture, { capture: true });
}

/** Start the theme song from the landing page: right away if the browser allows it, otherwise on the first touch. */
export function startThemeSong() {
  if (started || typeof window === "undefined") return;
  started = true;
  arm();
  // after the page (and the landing video) has loaded, so the song does not compete for bandwidth
  if (document.readyState === "complete") sync();
  else window.addEventListener("load", () => sync(), { once: true });
}

if (typeof window !== "undefined") {
  let muted = useSound.getState().muted;
  let music = useSound.getState().music;
  let theme = useSound.getState().theme;
  useSound.subscribe((s) => {
    if (s.theme !== theme) {
      theme = s.theme;
      sync();
    }
    if (s.muted !== muted) {
      muted = s.muted;
      sync();
    } else if (s.music !== music && wanted() && el && !el.paused) fadeTo(level(), 0.2);
    music = s.music;
  });
  let artist = useMusic.getState().playing;
  useMusic.subscribe((s) => {
    if (s.playing !== artist) {
      artist = s.playing;
      sync();
    }
  });
  let club = useClub.getState().inClub;
  useClub.subscribe((s) => {
    if (s.inClub !== club) {
      club = s.inClub;
      sync();
    }
  });
  let spotify = useSpotify.getState().playing;
  useSpotify.subscribe((s) => {
    if (s.playing !== spotify) {
      spotify = s.playing;
      sync();
    }
  });
  document.addEventListener("visibilitychange", sync);
}
