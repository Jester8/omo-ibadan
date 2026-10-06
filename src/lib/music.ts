import { create } from "zustand";
import { audio } from "./audio";
import { trackUrl, type Track } from "./tracks";
import { useSound } from "./soundStore";

type MusicState = { current: Track | null; playing: boolean; error: string };

export const useMusic = create<MusicState>(() => ({ current: null, playing: false, error: "" }));

let el: HTMLAudioElement | null = null;

const level = () => {
  const s = useSound.getState();
  return s.muted ? 0 : Math.min(1, s.music * 1.4);
};

function ensure() {
  if (el) return el;
  el = new Audio();
  el.preload = "none";
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

/** Play an artist's track in the city. Their recording only, streamed from the server, credited in the UI. */
export async function play(track: Track) {
  const a = ensure();
  if (useMusic.getState().current?.id === track.id && !a.paused) return pause();
  a.src = trackUrl(track.id);
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
