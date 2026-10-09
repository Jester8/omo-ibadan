"use client";

import { useEffect } from "react";
import { socialMount } from "@/lib/socialNet";
import { ArrestOverlay, BailAsks, CustodyBanner } from "./CustodyUI";
import { PokeAlerts, PokeFlash } from "./PokeUI";
import { LoanNotice } from "./LoansUI";

/** Everything the social features draw over the game, mounted once from WorldClient: the custody banner, the arrest overlay, and the alert cards. */
export default function SocialOverlays() {
  useEffect(() => socialMount(), []);
  return (
    <>
      <CustodyBanner />
      <ArrestOverlay />
      <PokeFlash />
      {/* our own column of cards, below the ones in Floating.tsx (calls, knocks, family and friend requests) */}
      <div className="pointer-events-none absolute left-1/2 top-[calc(env(safe-area-inset-top)+16.6rem)] z-50 flex w-[min(24rem,calc(100vw-1.5rem))] -translate-x-1/2 flex-col gap-2 sm:top-72">
        <PokeAlerts />
        <BailAsks />
        <LoanNotice />
      </div>
    </>
  );
}
