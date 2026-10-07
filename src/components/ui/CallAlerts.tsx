"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing } from "lucide-react";

/** Lets the phone show an alert for an incoming call while the app is in the background. */
export default function CallAlerts({ className = "" }: { className?: string }) {
  const [perm, setPerm] = useState<NotificationPermission | "none">("none");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if ("Notification" in window) setPerm(Notification.permission);
  }, []);
  if (perm === "none") return null;
  return (
    <div className={className}>
      <button
        disabled={perm !== "default"}
        onClick={() => void Notification.requestPermission().then(setPerm)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-100 py-3 text-sm font-semibold text-stone-900 ring-1 ring-black/5 transition active:scale-[0.98] disabled:opacity-70"
      >
        {perm === "granted" ? <BellRing className="size-4 text-emerald-600" /> : <Bell className="size-4" />}
        {perm === "granted" ? "Call alerts are on" : perm === "denied" ? "Call alerts are blocked in your browser" : "Turn on call alerts"}
      </button>
    </div>
  );
}
