import { audio } from "./audio";
import { useMusic } from "./music";
import { useSound } from "./soundStore";

/**
 * The city's theme song, played (with permission) from "Tap to enter" onwards, looping.
 * It follows the one Sound switch (remembered in localStorage by the audio engine), fades in and out
 * through a Web Audio gain (iOS ignores element volume), pauses while the tab is hidden or an artist's
 * track is playing, and tucks the built-in groove down while it plays.
 */
export const THEME_SONG = { title: "Ise Oluwa Ko Si Eni To Ye", artist: "Haruna Ishola", src: "/bg/ise-oluwa-v1.mp3" };

const FADE_IN = 2;
const FADE_OUT = 0.8;
/** about 60% at the default Music level, following the Music slider */
const level = () => Math.min(1, audio.settings.music * 1.2);

let el: HTMLAudioElement | null = null;
let gain: GainNode | null = null;
let started = false;
let fadeTimer: ReturnType<typeof setTimeout> | null = null;
let rampTimer: ReturnType<typeof setInterval> | null = null;

const wanted = () => started && !audio.settings.muted && !document.hidden && !useMusic.getState().playing;

/** Built on the first wanted play, inside a tap, so nothing is fetched on page load. */
function ensure(): HTMLAudioElement {
  if (el) return el;
  el = new Audio();
  el.src = THEME_SONG.src;
  el.loop = true;
  el.preload = "auto";
  const ctx = audio.ctx;
  if (ctx) {
    try {
      gain = ctx.createGain();
      gain.gain.value = 0;
      ctx.createMediaElementSource(el).connect(gain).connect(ctx.destination);
    } catch {
      gain = null; // no Web Audio routing: element volume instead (no fades on iOS, but it still plays)
    }
  }
  if (!gain) el.volume = 0;

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
    if (audio.ctx?.state === "suspended") void audio.ctx.resume();
    if (a.paused) a.play().catch(() => {}); // stays called straight from the tap or the unmute click (iOS needs that)
    fadeTo(level(), FADE_IN);
    audio.setDuck(true);
    return;
  }
  if (!el || el.paused) return;
  const a = el;
  if (!useMusic.getState().playing) audio.setDuck(false); // an artist's track keeps the groove ducked itself
  if (document.hidden) {
    fadeTo(0, 0);
    a.pause(); // timers are throttled in hidden tabs, so no fade
    return;
  }
  fadeTo(0, FADE_OUT, () => !wanted() && a.pause());
}

/** Call from the "Tap to enter" tap (or a returning player's first tap). Nothing plays or downloads before it. */
export function startThemeSong() {
  if (started || typeof window === "undefined") return;
  started = true;
  sync();
}

if (typeof window !== "undefined") {
  let muted = useSound.getState().muted;
  let music = useSound.getState().music;
  useSound.subscribe((s) => {
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
  document.addEventListener("visibilitychange", sync);
}
