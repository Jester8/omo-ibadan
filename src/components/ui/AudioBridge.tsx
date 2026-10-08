"use client";

import { useEffect } from "react";
import { audio } from "@/lib/audio";
import { startThemeSong } from "@/lib/themeSong";
import { startClubMusic } from "@/lib/clubMusic";
import { useGame } from "@/lib/store";
import { useSound } from "@/lib/soundStore";

let buzz: ReturnType<typeof setInterval> | null = null;
const startBuzz = () => {
  stopBuzz();
  const go = () => navigator.vibrate?.([450, 200, 450]);
  go();
  buzz = setInterval(go, 1800);
};
const stopBuzz = () => {
  if (buzz) clearInterval(buzz);
  buzz = null;
  navigator.vibrate?.(0);
};

/** Starts audio on the first tap and starts the intro song and the music in clubs. Incoming calls buzz the phone and notify, but make no sound. */
export default function AudioBridge() {
  useEffect(() => {
    useSound.getState().sync();
    // the theme song starts from the landing page (or as soon as the browser allows sound)
    startThemeSong();
    // songs play inside clubs (artists' tracks first, the house band otherwise); the theme keeps out of them
    const stopClub = startClubMusic();
    const start = () => audio.start();
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);

    let prev = useGame.getState();
    const unsub = useGame.subscribe((s) => {
      // being called: buzz the phone, and if the app is in the background, show a system notification
      if (s.incoming && !prev.incoming) {
        startBuzz();
        if (document.hidden && "Notification" in window && Notification.permission === "granted") {
          try {
            new Notification("Incoming call", { body: `${s.incoming.name} is calling you on Omo'badan`, tag: "omo-call", requireInteraction: true, silent: true });
          } catch {
            /* some browsers only allow notifications from the service worker */
          }
        }
      }
      if (!s.incoming && prev.incoming) stopBuzz();
      prev = s;
    });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      unsub();
      stopClub();
      stopBuzz();
    };
  }, []);
  return null;
}
