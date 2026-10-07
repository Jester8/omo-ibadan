"use client";

import { useEffect, useState } from "react";
import { Download, Share } from "lucide-react";

type Prompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

/** Add to home screen: the browser's own install prompt where there is one, and the Share-sheet steps on iPhone. */
export default function InstallApp({ className = "" }: { className?: string }) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [ios, setIos] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [help, setHelp] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInstalled(standalone);
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as Prompt);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || (!prompt && !ios)) return null;
  return (
    <div className={className}>
      <button
        onClick={() => {
          if (prompt) void prompt.prompt().then(() => setPrompt(null));
          else setHelp((h) => !h);
        }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
      >
        <Download className="size-4" /> Add Omo&apos;badan to your home screen
      </button>
      {help && (
        <p className="mt-2 flex items-start gap-2 rounded-2xl bg-stone-50 p-3 text-xs text-stone-600 ring-1 ring-black/5">
          <Share className="mt-0.5 size-4 shrink-0" />
          <span>
            In Safari, tap the <b>Share</b> button, then <b>Add to Home Screen</b>.
          </span>
        </p>
      )}
    </div>
  );
}
