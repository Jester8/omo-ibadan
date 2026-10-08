import { create } from "zustand";

/**
 * Your own Spotify playlist, played through Spotify's official embedded player.
 * Nothing is streamed or rebroadcast by the game: the player is Spotify's own, it plays on your device only, and it plays
 * full songs when you are logged in to Spotify in this browser (otherwise Spotify gives 30-second previews).
 * It lives in the Music app only. SpotifyEngine.tsx keeps it loaded (so the music carries on when the phone is put away) and
 * shows it inside the Music app's Spotify tab; listenTogether.ts lets a friend hear the same song in step with you.
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
/** The player's height for this link on this screen: phones get the compact one so it does not crowd the Music app. */
export const playerHeight = (l: SpotifyLink) => spotifyHeight(l, typeof window !== "undefined" && window.innerWidth < 640);
/** A song (or episode) on its own, as the player reports it. */
export const ITEM_URI = /^spotify:(?:track|episode):[A-Za-z0-9]{22}$/;
/** "song", "playlist", ... in plain words. */
export const spotifyWord = (l: SpotifyLink) => (l.kind === "track" ? "song" : l.kind === "episode" ? "episode" : l.kind);

/* ----------------------------------------------- what the player remembers ----------------------------------------------- */

const KEY = "omo-ibadan-spotify";

type State = {
  /** your own saved playlist (or album, or song) */
  link: SpotifyLink | null;
  /** what the player shows instead of your own while you listen along to a friend */
  override: SpotifyLink | null;
  /** Spotify says a song is playing right now (so the game's own music can step aside) */
  playing: boolean;
  /** where the song is and how long it is, in seconds (0 until the player says) */
  position: number;
  duration: number;
  /** when (epoch ms) the player last reported `position`, so the song's place can be worked out between reports */
  positionAt: number;
  /** the song that is on, when Spotify tells us (a playlist plays one song at a time) */
  item: string | null;
  /** the player has loaded and answers to play, pause and seek */
  ready: boolean;
  /** the empty box in the Music app where the player is shown; without one the player waits out of sight */
  slot: HTMLElement | null;
  /** read the saved playlist once the page is up */
  load: () => void;
  save: (l: SpotifyLink) => void;
  clear: () => void;
  setPlaying: (playing: boolean) => void;
  setSlot: (el: HTMLElement | null) => void;
};

export const useSpotify = create<State>((set) => ({
  link: null,
  override: null,
  playing: false,
  position: 0,
  duration: 0,
  positionAt: 0,
  item: null,
  ready: false,
  slot: null,
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
    set({ link });
  },
  clear: () => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* nothing to remove */
    }
    set({ link: null, playing: false, position: 0, duration: 0, positionAt: 0, item: null });
  },
  setPlaying: (playing) => set({ playing }),
  setSlot: (slot) => set({ slot }),
}));

/** What the player is showing right now: a friend's pick while listening along, otherwise your own. */
export const activeLink = (s: Pick<State, "link" | "override">) => s.override ?? s.link;

/* ------------------------------------------------ driving the player ------------------------------------------------ */

/** The few things the game asks of Spotify's player. SpotifyEngine fills this in once the player is up. */
export type Bridge = {
  /** show another song (or playlist) in the player */
  load: (uri: string) => void;
  play: () => void;
  pause: () => void;
  /** carry on from where it was paused */
  resume: () => void;
  seek: (seconds: number) => void;
};
export const spotifyBridge: { current: Bridge | null } = { current: null };

/* ------------------------------------------------- what is playing ------------------------------------------------- */

export type SpotifyInfo = { title: string; thumb: string | null };
const infos = new Map<string, Promise<SpotifyInfo | null>>();

/** Spotify's cover pictures come from their own image servers, and nowhere else. */
const imageOk = (u: unknown): u is string => {
  if (typeof u !== "string" || u.length > 400) return false;
  try {
    const url = new URL(u);
    return url.protocol === "https:" && (url.hostname.endsWith(".scdn.co") || url.hostname.endsWith(".spotifycdn.com"));
  } catch {
    return false;
  }
};

/** The name and cover of a song, playlist or album, from Spotify's public oEmbed. Null when it cannot be had (offline, blocked). */
export function spotifyInfo(l: SpotifyLink): Promise<SpotifyInfo | null> {
  const key = spotifyUri(l);
  let hit = infos.get(key);
  if (!hit) {
    hit = fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyPage(l))}`, { signal: AbortSignal.timeout(6000) })
      .then((r) => (r.ok ? (r.json() as Promise<{ title?: unknown; thumbnail_url?: unknown }>) : null))
      .then((j) => (j && typeof j.title === "string" && j.title ? { title: j.title.slice(0, 120), thumb: imageOk(j.thumbnail_url) ? j.thumbnail_url : null } : null))
      .catch(() => null);
    infos.set(key, hit);
    // a failure is not remembered for long: the next look tries again
    void hit.then((v) => {
      if (!v) setTimeout(() => infos.delete(key), 30_000);
    });
    if (infos.size > 60) infos.delete(infos.keys().next().value as string);
  }
  return hit;
}

/** 3:07 for 187 seconds. */
export const clock = (secs: number) => {
  const s = Math.max(0, Math.floor(secs));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
