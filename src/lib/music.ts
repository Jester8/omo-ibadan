import { create } from "zustand";
import { audio } from "./audio";
import { trackUrl, type Track } from "./tracks";
import { useSound } from "./soundStore";

/** A track from an artist, or the built-in intro clip (which carries its own url). */
export type PlayableTrack = Track & { url?: string };
type MusicState = { current: PlayableTrack | null; playing: boolean; error: string };

export const useMusic = create<MusicState>(() => ({ current: null, playing: false, error: "" }));

let el: HTMLAudioElement | null = null;
let introPlayed = false;

const level = () => {
  const s = useSound.getState();
  return s.muted ? 0 : Math.min(1, s.music * 1.4);
};

function ensure() {
  if (el) return el;
  el = new Audio();
  el.preload = "auto";
  el.onended = () => stop();
  el.onerror = () => {
    useMusic.setState({ playing: false, error: "Could not play that track." });
    audio.setDuck(false);
  };
  useSound.subscribe(() => {
    if (el) el.volume = level();
  });
  return el;
}

/** Play an artist's track in the city. Their recording only, credited in the UI. */
export async function play(track: PlayableTrack) {
  const a = ensure();
  if (useMusic.getState().current?.id === track.id && !a.paused) return pause();
  a.loop = false;
  a.src = track.url ?? trackUrl(track.id);
  a.volume = level();
  useMusic.setState({ current: track, error: "" });
  try {
    await a.play();
    useMusic.setState({ playing: true });
    audio.setDuck(true);
  } catch {
    useMusic.setState({ playing: false, error: "Tap again to allow sound." });
  }
}

export function pause() {
  el?.pause();
  useMusic.setState({ playing: false });
  audio.setDuck(false);
}

export function stop() {
  if (el) {
    el.pause();
    el.removeAttribute("src");
  }
  useMusic.setState({ current: null, playing: false });
  audio.setDuck(false);
}

/* ------------------------------------ the intro chorus ------------------------------------ */

const introTrack = (info: { title?: string; artist?: string; rightsHolder?: string; url?: string }): PlayableTrack => ({
  id: "intro",
  title: info.title ?? "Ibadan",
  artist: info.artist ?? "",
  rightsHolder: info.rightsHolder ?? info.artist ?? "",
  createdAt: 0,
  url: info.url,
});

/** The sign-in screen: the chorus loops until the player is in the city. */
export async function startIntro(info: { title?: string; artist?: string; rightsHolder?: string; url?: string }) {
  if (!info.url) return;
  const a = ensure();
  introPlayed = true;
  a.loop = true;
  a.src = info.url;
  a.volume = level();
  useMusic.setState({ current: introTrack(info), error: "" });
  try {
    await a.play();
    useMusic.setState({ playing: true });
    audio.setDuck(true);
  } catch {
    /* the browser refused: the next tap will try again */
  }
}

export function setIntroMuted(muted: boolean) {
  if (el) el.muted = muted;
}

/** The player is in the city: let the chorus finish its current pass (it fades out) and keep the credit showing. */
export function introToGame() {
  if (el && !el.paused) el.loop = false;
}

/** For players who come straight back into the city: play the chorus once, on their first tap. */
export async function playIntroOnce(info: { title?: string; artist?: string; rightsHolder?: string; url?: string }) {
  if (introPlayed || !info.url) return;
  introPlayed = true;
  const a = ensure();
  a.loop = false;
  a.muted = false;
  a.src = info.url;
  a.volume = level();
  useMusic.setState({ current: introTrack(info), error: "" });
  try {
    await a.play();
    useMusic.setState({ playing: true });
    audio.setDuck(true);
  } catch {
    introPlayed = false;
  }
}

export const introTrackFrom = introTrack;
