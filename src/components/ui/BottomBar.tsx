"use client";

import { motion } from "motion/react";
import { DoorOpen, House, Smartphone, UserRound, Users } from "lucide-react";
import { enterInterior, exitInterior, homeRef, leaveDeck } from "@/lib/interiorRuntime";
import { useGame, type Sheet } from "@/lib/store";

/** The main navigation: Home, Phone, Friends, Me. The active tab gets a sliding highlight and bar. */
export default function BottomBar() {
  const sheet = useGame((s) => s.sheet);
  const inside = useGame((s) => !!s.interior);
  const deck = useGame((s) => s.deck);
  const call = useGame((s) => s.call.phase);
  const unread = useGame((s) => s.threads.reduce((n, t) => n + t.unread, 0) + s.requestsIn.length);
  const setSheet = useGame((s) => s.setSheet);

  const toggle = (id: Exclude<Sheet, null>) => setSheet(sheet === id ? null : id);
  const phoneSheets: Sheet[] = ["phone", "quests", "buy", "garage", "flights", "music", "guide"];

  const items: { id: string; label: string; icon: typeof House; active: boolean; badge?: number | boolean; onClick: () => void }[] = [
    {
      id: "home",
      label: inside || deck ? "Leave" : "Home",
      icon: inside || deck ? DoorOpen : House,
      active: false,
      onClick: () => {
        setSheet(null);
        if (deck) leaveDeck();
        else if (inside) exitInterior();
        else enterInterior(homeRef());
      },
    },
    { id: "phone", label: "Phone", icon: Smartphone, active: phoneSheets.includes(sheet), badge: call !== "idle", onClick: () => toggle("phone") },
    { id: "friends", label: "Friends", icon: Users, active: sheet === "friends", badge: unread > 0 ? unread : false, onClick: () => toggle("friends") },
    { id: "me", label: "Me", icon: UserRound, active: sheet === "profile", onClick: () => toggle("profile") },
  ];

  return (
    <nav aria-label="Main menu" className="absolute inset-x-3 bottom-3 z-[15] mx-auto flex max-w-sm items-stretch rounded-[1.7rem] bg-white/85 px-1.5 py-1.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] ring-1 ring-white/60 backdrop-blur-2xl sm:bottom-5">
      {items.map((it) => (
        <button key={it.id} onClick={it.onClick} aria-label={it.label} aria-current={it.active ? "page" : undefined} className="relative flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-2 transition active:scale-90">
          {it.active && <motion.span layoutId="nav-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} className="absolute inset-0 rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-600/30" />}
          {it.active && <motion.span layoutId="nav-bar" transition={{ type: "spring", stiffness: 420, damping: 34 }} className="absolute -top-1.5 h-1 w-8 rounded-full bg-emerald-500" />}
          <it.icon className={`relative size-[1.35rem] transition-colors ${it.active ? "text-white" : "text-stone-600"}`} />
          <span className={`relative text-[10.5px] font-semibold leading-none transition-colors ${it.active ? "text-white" : "text-stone-600"}`}>{it.label}</span>
          {it.badge ? (
            typeof it.badge === "number" ? (
              <span className="absolute right-[22%] top-0.5 grid min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[9px] font-bold leading-4 text-white ring-2 ring-white">{it.badge > 9 ? "9+" : it.badge}</span>
            ) : (
              <span className="absolute right-[30%] top-1 size-2 animate-pulse rounded-full bg-emerald-400 ring-2 ring-white" />
            )
          ) : null}
        </button>
      ))}
    </nav>
  );
}
