import { create } from "zustand";
import { trackUrl, type Track } from "./tracks";
import { useSound } from "./soundStore";

/** A track from an artist. */
export type PlayableTrack = Track & { url?: string };
type MusicState = { current: PlayableTrack | null; playing: boolean; error: string };

export const useMusic = create<MusicState>(() => ({ current: null, playing: false, error: "" }));

let el: HTMLAudioElement | null = null;

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
  } catch {
    useMusic.setState({ playing: false, error: "Tap again to allow sound." });
  }
}

export function pause() {
  el?.pause();
  useMusic.setState({ playing: false });
}

export function stop() {
  if (el) {
    el.pause();
    el.removeAttribute("src");
  }
  useMusic.setState({ current: null, playing: false });
}
