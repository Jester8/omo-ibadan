"use client";

import { useEffect } from "react";
import { audio } from "@/lib/audio";
import { startThemeSong } from "@/lib/themeSong";
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

/** Starts audio on the first tap, starts the intro song, and rings (and buzzes) for incoming calls. No other game sounds. */
export default function AudioBridge() {
  useEffect(() => {
    useSound.getState().sync();
    // the theme song starts from the landing page (or as soon as the browser allows sound)
    startThemeSong();
    const start = () => audio.start();
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);

    let prev = useGame.getState();
    const unsub = useGame.subscribe((s) => {
      const ringing = !!s.incoming || s.call.phase === "calling";
      if (ringing && !(prev.incoming || prev.call.phase === "calling")) audio.startRing();
      if (!ringing && (prev.incoming || prev.call.phase === "calling")) audio.stopRing();
      // being called: buzz the phone, and if the app is in the background, show a system notification
      if (s.incoming && !prev.incoming) {
        startBuzz();
        if (document.hidden && "Notification" in window && Notification.permission === "granted") {
          try {
            new Notification("Incoming call", { body: `${s.incoming.name} is calling you on Omo'badan`, tag: "omo-call", requireInteraction: true });
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
      audio.stopRing();
      stopBuzz();
    };
  }, []);
  return null;
}
