"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useMounted } from "@/lib/hooks";

/**
 * The landing screen's moving picture: a 30-second loop of Mapo Hall at dusk.
 * Portrait or landscape file by orientation; the still poster for reduced motion or
 * Data Saver; the animated WebP if the browser refuses to play the video (iOS Low Power Mode).
 * Purely decorative and silent: the game's own sound is untouched.
 */
const FILES = {
  landscape: {
    video: "/bg/mapo-hall-bg-v1.mp4",
    webp: "/bg/mapo-hall-bg-v1.webp",
    poster: "/bg/mapo-hall-bg-poster-v1.jpg",
    // keeps the hall in frame when cover crops a very wide or very short screen
    position: "center 55%",
  },
  portrait: {
    video: "/bg/mapo-hall-bg-mobile-v1.mp4",
    webp: "/bg/mapo-hall-bg-mobile-v1.webp",
    poster: "/bg/mapo-hall-bg-mobile-poster-v1.jpg",
    position: "center center",
  },
} as const;

/** Darker in the sky behind the title and tagline, light over the hall, a little darker at the foot. */
const SCRIM =
  "radial-gradient(ellipse 70% 32% at 50% 24%, rgba(26,24,40,0.38), rgba(26,24,40,0) 70%)," +
  "linear-gradient(to bottom, rgba(26,24,40,0.55) 0%, rgba(26,24,40,0.4) 32%, rgba(26,24,40,0.1) 52%, rgba(26,24,40,0.04) 75%, rgba(26,24,40,0.35) 100%)";

function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

type NetworkInfo = { saveData?: boolean; addEventListener?: (t: "change", cb: () => void) => void; removeEventListener?: (t: "change", cb: () => void) => void };
const connection = () => (typeof navigator === "undefined" ? undefined : (navigator as Navigator & { connection?: NetworkInfo }).connection);

function useSaveData(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const c = connection();
      c?.addEventListener?.("change", cb);
      return () => c?.removeEventListener?.("change", cb);
    },
    () => connection()?.saveData === true,
    () => false,
  );
}

export default function LandingBackdrop() {
  const mounted = useMounted();
  const portrait = useMedia("(orientation: portrait)");
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)");
  const saveData = useSaveData();
  const still = reduceMotion || saveData;
  const orient = portrait ? "portrait" : "landscape";
  const f = FILES[orient];
  const ref = useRef<HTMLVideoElement>(null);
  // which orientation's video the browser refused; the animated WebP stands in for it
  const [refused, setRefused] = useState<string | null>(null);
  const fallback = refused === orient;

  useEffect(() => {
    const v = ref.current;
    if (!v || still) return;
    let live = true;
    // React does not reliably write the muted attribute, and autoplay needs it
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    const tryPlay = () =>
      v.play().then(
        () => live && setRefused((r) => (r === orient ? null : r)),
        (e: DOMException) => live && e.name !== "AbortError" && setRefused(orient),
      );
    void tryPlay();
    // autoplay may have been blocked: the first tap anywhere (usually "Tap to enter") tries again
    const onTap = () => void tryPlay();
    document.addEventListener("pointerdown", onTap, { capture: true, once: true });
    const onError = () => live && setRefused(orient);
    v.addEventListener("error", onError);
    return () => {
      live = false;
      document.removeEventListener("pointerdown", onTap, { capture: true });
      v.removeEventListener("error", onError);
      v.pause(); // stop decoding as soon as the landing screen is left
    };
  }, [orient, still]);

  const layer = "absolute inset-0 size-full";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#1a1828]">
      {mounted &&
        (still ? (
          <div className={`${layer} bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${f.poster})`, backgroundPosition: f.position }} />
        ) : (
          <>
            {fallback && <div className={`${layer} bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${f.webp})`, backgroundPosition: f.position }} />}
            <video
              key={orient}
              ref={ref}
              src={f.video}
              poster={f.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              tabIndex={-1}
              disablePictureInPicture
              disableRemotePlayback
              className={`${layer} object-cover ${fallback ? "hidden" : ""}`}
              style={{ objectPosition: f.position }}
            />
          </>
        ))}
      <div className="absolute inset-0" style={{ backgroundImage: SCRIM }} />
    </div>
  );
}
