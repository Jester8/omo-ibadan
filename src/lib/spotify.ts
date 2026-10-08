import { create } from "zustand";

/**
 * Your own Spotify playlist, played through Spotify's official embedded player.
 * Nothing is streamed or rebroadcast by the game: the player is Spotify's own, it plays on your device only, and it plays
 * full songs when you are logged in to Spotify in this browser (otherwise Spotify gives 30-second previews).
 */
export type SpotifyKind = "playlist" | "album" | "track" | "artist" | "show" | "episode";
export type SpotifyLink = { kind: SpotifyKind; id: string };

const KINDS: SpotifyKind[] = ["playlist", "album", "track", "artist", "show", "episode"];
/** Spotify ids are 22 letters and digits. Anything else is refused, so only a real id ever reaches the embed address. */
const ID = /^[A-Za-z0-9]{22}$/;

/** Understands a pasted link (open.spotify.com/playlist/..., with or without a language prefix, /embed/ or ?si=) or a spotify: URI. */
export function parseSpotifyLink(input: string): SpotifyLink | null {
  const text = input.trim();
  if (!text || text.length > 300) return null;
  const uri = /^spotify:(\w+):([A-Za-z0-9]+)$/.exec(text);
  if (uri) return make(uri[1], uri[2]);
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
  } catch {
    return null;
  }
  if (url.hostname !== "open.spotify.com") return null;
  // /playlist/ID, /intl-fr/playlist/ID, /embed/playlist/ID
  const parts = url.pathname.split("/").filter(Boolean).filter((p) => p !== "embed" && !/^intl-[a-z-]+$/i.test(p));
  return parts.length >= 2 ? make(parts[0], parts[1]) : null;
}

function make(kind: string, id: string): SpotifyLink | null {
  return (KINDS as string[]).includes(kind) && ID.test(id) ? { kind: kind as SpotifyKind, id } : null;
}

export const spotifyUri = (l: SpotifyLink) => `spotify:${l.kind}:${l.id}`;
export const spotifyPage = (l: SpotifyLink) => `https://open.spotify.com/${l.kind}/${l.id}`;
export const spotifyEmbedUrl = (l: SpotifyLink) => `https://open.spotify.com/embed/${l.kind}/${l.id}?utm_source=generator`;
/** Lists need the tall player; a single track or episode only needs the compact one. */
export const spotifyHeight = (l: SpotifyLink, compact: boolean) => (compact || l.kind === "track" || l.kind === "episode" ? 152 : 352);

/* ----------------------------------------------- what the player remembers ----------------------------------------------- */

const KEY = "omo-ibadan-spotify";

type State = {
  link: SpotifyLink | null;
  /** the player card is showing (it keeps playing when hidden) */
  open: boolean;
  /** Spotify says a song is playing right now (so the game's own music can step aside) */
  playing: boolean;
  /** read the saved playlist once the page is up */
  load: () => void;
  save: (l: SpotifyLink) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  setPlaying: (playing: boolean) => void;
};

export const useSpotify = create<State>((set) => ({
  link: null,
  open: false,
  playing: false,
  load: () => {
    try {
      const saved = localStorage.getItem(KEY);
      const link = saved ? parseSpotifyLink(saved) : null;
      if (link) set({ link });
    } catch {
      /* private mode: nothing to read */
    }
  },
  save: (link) => {
    try {
      localStorage.setItem(KEY, spotifyPage(link));
    } catch {
      /* private mode: it lasts until the tab closes */
    }
    set({ link, open: true });
  },
  clear: () => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* nothing to remove */
    }
    set({ link: null, open: false, playing: false });
  },
  setOpen: (open) => set({ open }),
  setPlaying: (playing) => set({ playing }),
}));
