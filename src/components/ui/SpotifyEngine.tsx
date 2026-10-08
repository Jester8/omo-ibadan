"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { pause } from "@/lib/music";
import { ITEM_URI, playerHeight, spotifyBridge, spotifyEmbedUrl, spotifyUri, useSpotify } from "@/lib/spotify";

/* Spotify's iFrame API: it turns an element into their own player, tells us when a song plays or pauses, and takes a few orders. */
type PlaybackData = { isPaused?: boolean; isBuffering?: boolean; position?: number; duration?: number; playingURI?: string };
type Controller = {
  destroy?: () => void;
  addListener: (event: string, cb: (e: { data?: PlaybackData }) => void) => void;
  loadUri?: (uri: string) => void;
  play?: () => void;
  pause?: () => void;
  resume?: () => void;
  seek?: (seconds: number) => void;
};
type IFrameApi = { createController: (el: HTMLElement, opts: { uri: string; width: string; height: number }, cb: (c: Controller) => void) => void };
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameApi) => void;
  }
}

let apiPromise: Promise<IFrameApi> | null = null;
function loadApi(): Promise<IFrameApi> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<IFrameApi>((resolve, reject) => {
    window.onSpotifyIframeApiReady = resolve;
    const s = document.createElement("script");
    s.src = "https://open.spotify.com/embed/iframe-api/v1";
    s.async = true;
    s.onerror = () => {
      apiPromise = null; // blocked (an ad blocker, no network): the plain embed still works
      reject(new Error("Spotify script blocked"));
    };
    document.body.appendChild(s);
  });
  return apiPromise;
}

const ALLOW = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
const RESET = { ready: false, playing: false, position: 0, duration: 0, positionAt: 0, item: null } as const;

/** The scrolling or clipping boxes a thing sits inside: the player must not show outside them. */
function clippers(el: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
    const o = getComputedStyle(p);
    if (/(auto|scroll|hidden|clip)/.test(`${o.overflow} ${o.overflowX} ${o.overflowY}`)) out.push(p);
  }
  return out;
}

/**
 * Spotify's player for the Music app. It is always mounted (so the music carries on when the phone is put away) but it is
 * only ever shown in the Music app's Spotify tab: that tab leaves an empty box (the "slot"), and this lays the player over it,
 * following it as the app slides or scrolls. With no slot the player waits out of sight, still playing.
 */
export default function SpotifyEngine() {
  const link = useSpotify((s) => s.override ?? s.link);
  const slot = useSpotify((s) => s.slot);
  const host = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const uri = link ? spotifyUri(link) : null;
  const height = link ? playerHeight(link) : 152;

  useEffect(() => {
    useSpotify.getState().load();
  }, []);

  // the player itself: made again when the link changes
  useEffect(() => {
    const el = box.current;
    const current = useSpotify.getState().override ?? useSpotify.getState().link;
    if (!el || !uri || !current) return;
    let dead = false;
    let controller: Controller | null = null;
    const slotEl = document.createElement("div");
    el.replaceChildren(slotEl);

    const update = (e: { data?: PlaybackData }) => {
      const d = e?.data;
      if (!d || dead) return;
      const dur = Number(d.duration) || 0;
      const pos = Number(d.position) || 0;
      // milliseconds, as far as the docs say; a "duration" under 1000 can only be a length in seconds
      const unit = dur > 0 && dur < 1000 ? 1 : 1000;
      const playing = !d.isPaused;
      const prev = useSpotify.getState();
      const patch: Partial<ReturnType<typeof useSpotify.getState>> = { playing, position: pos / unit, duration: dur / unit, positionAt: Date.now() };
      if (typeof d.playingURI === "string" && ITEM_URI.test(d.playingURI)) patch.item = d.playingURI;
      useSpotify.setState(patch);
      // one thing at a time: an artist's track the player started steps aside when Spotify starts
      if (playing && !prev.playing) pause();
    };

    // if the API cannot be used, fall back to Spotify's plain embed: it plays, we just cannot see when it does
    const plain = () => {
      if (dead) return;
      const f = document.createElement("iframe");
      f.src = spotifyEmbedUrl(current);
      f.width = "100%";
      f.height = String(height);
      f.allow = ALLOW;
      f.loading = "lazy";
      f.title = "Spotify";
      f.style.border = "0";
      f.style.borderRadius = "12px";
      el.replaceChildren(f);
    };
    loadApi().then(
      (api) => {
        if (dead) return;
        try {
          api.createController(slotEl, { uri, width: "100%", height }, (c) => {
            if (dead) {
              c.destroy?.();
              return;
            }
            controller = c;
            c.addListener("playback_update", update);
            c.addListener("playback_started", update);
            const call = (f: () => void) => {
              try {
                f();
              } catch {
                /* the player is gone or not ready: the next look puts it right */
              }
            };
            spotifyBridge.current = {
              load: (u) => call(() => c.loadUri?.(u)),
              play: () => call(() => c.play?.()),
              pause: () => call(() => c.pause?.()),
              resume: () => call(() => (c.resume ? c.resume() : c.play?.())),
              seek: (s) => call(() => c.seek?.(s)),
            };
            useSpotify.setState({ ready: true });
          });
        } catch {
          plain();
        }
      },
      plain,
    );
    return () => {
      dead = true;
      spotifyBridge.current = null;
      try {
        controller?.destroy?.();
      } catch {
        /* already gone */
      }
      useSpotify.setState(RESET);
      el.replaceChildren();
    };
  }, [uri, height]);

  // where the player is shown: over the Music app's slot, following it; otherwise parked out of sight
  useLayoutEffect(() => {
    const el = host.current;
    if (!el) return;
    const park = () => {
      el.removeAttribute("style");
      el.inert = true;
    };
    if (!slot || !slot.isConnected) {
      park();
      return;
    }
    const around = clippers(slot);
    let raf = 0;
    let shown = "";
    const place = () => {
      const r = slot.getBoundingClientRect();
      let top = r.top;
      let bottom = r.bottom;
      let left = r.left;
      let right = r.right;
      for (const c of around) {
        const q = c.getBoundingClientRect();
        top = Math.max(top, q.top);
        bottom = Math.min(bottom, q.bottom);
        left = Math.max(left, q.left);
        right = Math.min(right, q.right);
      }
      const hidden = r.width < 2 || r.height < 2 || bottom - top < 1 || right - left < 1;
      const css =
        `position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;z-index:46;overflow:hidden;opacity:1;pointer-events:auto;` +
        (hidden ? "visibility:hidden;pointer-events:none;" : `clip-path:inset(${top - r.top}px ${r.right - right}px ${r.bottom - bottom}px ${left - r.left}px round 12px);`);
      if (css !== shown) {
        el.style.cssText = css;
        shown = css;
      }
      el.inert = hidden;
      raf = requestAnimationFrame(place);
    };
    place();
    return () => {
      cancelAnimationFrame(raf);
      park();
    };
  }, [slot, uri]);

  if (!uri) return null;
  return (
    <div ref={host} className="pointer-events-none fixed -left-[9999px] top-0 z-[46] w-[22rem] max-w-[100vw] opacity-0" aria-label="Spotify player">
      <div ref={box} style={{ minHeight: height }} />
    </div>
  );
}
