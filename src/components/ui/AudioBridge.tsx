"use client";

import { useEffect } from "react";
import { audio } from "@/lib/audio";
import { useGame } from "@/lib/store";
import { useSound } from "@/lib/soundStore";
import { daylight, gameMinutes, nepaOut } from "@/lib/time";

/** Starts audio on the first tap and plays sounds for what happens in the game. */
export default function AudioBridge() {
  useEffect(() => {
    useSound.getState().sync();
    const start = () => audio.start();
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);

    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest("button, a")) audio.click();
    };
    window.addEventListener("click", onClick);

    let lastNepa: boolean | null = null;
    const tick = () => {
      const s = useGame.getState();
      const now = Date.now();
      const nepa = nepaOut(now);
      const place = s.interior?.kind === "place" ? s.interior.id : s.atPlace;
      audio.setContext({
        indoors: !!s.interior,
        night: 1 - daylight(gameMinutes(now, s.clockOverride) / 60),
        nepa,
        place,
      });
      if (lastNepa !== null && nepa !== lastNepa && s.profile) {
        if (nepa) audio.nepaOff();
        else audio.nepaOn();
      }
      lastNepa = nepa;
    };
    tick();
    const id = setInterval(tick, 1000);

    let prev = useGame.getState();
    const unsub = useGame.subscribe((s) => {
      if (s.toasts.length > prev.toasts.length) {
        const t = s.toasts[s.toasts.length - 1];
        if (t.tone === "good") audio.good();
        else if (t.tone === "bad") audio.bad();
      }
      if (s.money > prev.money && s.profile) audio.coin();
      if (!!s.interior !== !!prev.interior) audio.door();
      if (s.chat.length > prev.chat.length && !s.chat[s.chat.length - 1].self) audio.pop();
      if (s.busy && !prev.busy && s.busy.label.toLowerCase().includes("sit")) audio.sit();
      const ringing = !!s.incoming || s.call.phase === "calling";
      if (ringing && !(prev.incoming || prev.call.phase === "calling")) audio.startRing();
      if (!ringing && (prev.incoming || prev.call.phase === "calling")) audio.stopRing();
      prev = s;
    });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("click", onClick);
      clearInterval(id);
      unsub();
      audio.stopRing();
    };
  }, []);
  return null;
}
