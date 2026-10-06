"use client";

import { DoorOpen, House, ListChecks, Phone, ShoppingBag, UserRound, Users } from "lucide-react";
import { enterInterior, exitInterior, homeRef, leaveDeck } from "@/lib/interiorRuntime";
import { useGame, type Sheet } from "@/lib/store";

/** The one navigation bar: Home, Buy, Phone, Friends, Goals, Me. */
export default function BottomBar() {
  const sheet = useGame((s) => s.sheet);
  const inside = useGame((s) => !!s.interior);
  const deck = useGame((s) => s.deck);
  const call = useGame((s) => s.call.phase);
  const setSheet = useGame((s) => s.setSheet);

  const toggle = (id: Exclude<Sheet, null>) => setSheet(sheet === id ? null : id);

  const items: { id: string; label: string; icon: typeof House; active: boolean; badge?: boolean; onClick: () => void }[] = [
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
    { id: "buy", label: "Buy", icon: ShoppingBag, active: sheet === "buy", onClick: () => toggle("buy") },
    { id: "phone", label: "Phone", icon: Phone, active: sheet === "phone", badge: call !== "idle", onClick: () => toggle("phone") },
    { id: "friends", label: "Friends", icon: Users, active: sheet === "friends", onClick: () => toggle("friends") },
    { id: "quests", label: "Goals", icon: ListChecks, active: sheet === "quests", onClick: () => toggle("quests") },
    { id: "profile", label: "Me", icon: UserRound, active: sheet === "profile", onClick: () => toggle("profile") },
  ];

  return (
    <nav
      aria-label="Main menu"
      className="absolute inset-x-3 bottom-3 z-[15] mx-auto flex max-w-md items-center justify-around rounded-[1.6rem] bg-white/80 px-1.5 py-1.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] ring-1 ring-white/60 backdrop-blur-2xl sm:bottom-5"
    >
      {items.map((it) => (
        <button
          key={it.id}
          onClick={it.onClick}
          aria-label={it.label}
          className={`relative flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 transition active:scale-90 ${it.active ? "bg-emerald-600 text-white" : "text-stone-600 hover:bg-stone-900/5"}`}
        >
          <it.icon className="size-5" />
          <span className="text-[10px] font-semibold leading-none">{it.label}</span>
          {it.badge && <span className="absolute right-3 top-1 size-2 animate-pulse rounded-full bg-emerald-400 ring-2 ring-white" />}
        </button>
      ))}
    </nav>
  );
}
