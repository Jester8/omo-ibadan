"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronUp, ExternalLink, Music2 } from "lucide-react";
import { spotifyEmbedUrl, spotifyHeight, spotifyPage, spotifyUri, useSpotify } from "@/lib/spotify";
import { useGame } from "@/lib/store";

/* Spotify's iFrame API: it turns an element into their own player and tells us when a song plays or pauses. */
type Controller = { destroy?: () => void; addListener: (event: string, cb: (e: { data: { isPaused: boolean } }) => void) => void };
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

/**
 * Your Spotify playlist as a small player. It lives here (not in the Music sheet) so the music carries on when the sheet is
 * closed, indoors and out. Hiding the card only slides it out of sight: the player stays loaded.
 */
export default function SpotifyDock() {
  const link = useSpotify((s) => s.link);
  const open = useSpotify((s) => s.open);
  const playing = useSpotify((s) => s.playing);
  const hideIcons = useGame((s) => s.hideIcons);
  const host = useRef<HTMLDivElement>(null);
  // phones get the compact player so the card does not cover the city
  const [compact] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);
  const uri = link ? spotifyUri(link) : null;
  const height = link ? spotifyHeight(link, compact) : 152;

  useEffect(() => {
    useSpotify.getState().load();
  }, []);

  useEffect(() => {
    const box = host.current;
    const current = useSpotify.getState().link;
    if (!box || !uri || !current) return;
    let dead = false;
    let controller: Controller | null = null;
    const slot = document.createElement("div");
    box.replaceChildren(slot);

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
      box.replaceChildren(f);
    };
    loadApi().then(
      (api) => {
        if (dead) return;
        try {
          api.createController(slot, { uri, width: "100%", height }, (c) => {
            if (dead) {
              c.destroy?.();
              return;
            }
            controller = c;
            c.addListener("playback_update", (e) => useSpotify.getState().setPlaying(!e.data.isPaused));
          });
        } catch {
          plain();
        }
      },
      plain,
    );
    return () => {
      dead = true;
      controller?.destroy?.();
      useSpotify.getState().setPlaying(false);
      box.replaceChildren();
    };
  }, [uri, height]);

  if (!link) return null;
  const visible = open && !hideIcons;
  return (
    <>
      {!hideIcons && !open && (
        <button
          onClick={() => useSpotify.getState().setOpen(true)}
          aria-label="Open your Spotify player"
          title="Your Spotify playlist"
          className="absolute left-3 top-[calc(env(safe-area-inset-top)+0.9rem)] z-10 grid size-9 place-items-center rounded-full bg-[#1db954] text-black shadow-lg ring-1 ring-black/10 transition active:scale-90 sm:left-5 sm:top-5"
        >
          <Music2 className={`size-4 ${playing ? "animate-pulse" : ""}`} />
        </button>
      )}
      <div
        className={
          visible
            ? "absolute left-3 top-[calc(env(safe-area-inset-top)+3.7rem)] z-30 w-[min(22rem,calc(100vw-1.5rem))] rounded-3xl bg-white/90 p-2.5 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-white/60 backdrop-blur-xl sm:left-5 sm:top-16"
            : "pointer-events-none absolute -left-[60rem] top-0 z-30 w-[22rem] opacity-0"
        }
        inert={!visible}
      >
        <div className="mb-1.5 flex items-center justify-between gap-2 px-1.5">
          <p className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
            <Music2 className="size-3.5 text-[#1db954]" /> Your Spotify
          </p>
          <div className="flex items-center gap-1">
            <a href={spotifyPage(link)} target="_blank" rel="noreferrer noopener" className="flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-700 transition hover:bg-stone-200">
              Open in Spotify <ExternalLink className="size-3" />
            </a>
            <button onClick={() => useSpotify.getState().setOpen(false)} aria-label="Hide the player (the music keeps playing)" title="Hide (keeps playing)" className="grid size-7 place-items-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200 active:scale-90">
              <ChevronUp className="size-4" />
            </button>
          </div>
        </div>
        <div ref={host} style={{ minHeight: height }} className="overflow-hidden rounded-xl" />
        <p className="px-1.5 pt-1.5 text-[10.5px] leading-snug text-stone-500">Only you hear this. Log in to Spotify in this browser for full songs; otherwise Spotify plays 30-second previews.</p>
      </div>
    </>
  );
}
