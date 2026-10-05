"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Hud from "@/components/ui/Hud";
import SidePanel from "@/components/ui/PlacePanel";
import ChatDock from "@/components/ui/ChatDock";
import Sheets from "@/components/ui/Sheets";
import Minimap from "@/components/ui/Minimap";
import { Hint, IncomingCall, Toasts, VoiceBar } from "@/components/ui/Floating";
import AvatarCreator from "@/components/avatar/AvatarCreator";
import Overlay from "./Overlay";
import { ownedBy, pendingRent, useGame } from "@/lib/store";
import { QUESTS } from "@/lib/quests";
import { naira } from "@/lib/plots";
import { useMounted } from "@/lib/hooks";
import { net, roomOf } from "@/lib/net";
import { voice } from "@/lib/voice";
import { enterInterior, homeRef } from "@/lib/interiorRuntime";

const CityScene = dynamic(() => import("./CityScene"), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-sm text-stone-500">Loading Ibadan…</div>,
});

/** Non-visual glue: needs decay, networking, room sync and test hooks. */
function Runtime() {
  const hasProfile = useGame((s) => !!s.profile);
  const lookKey = useGame((s) => (s.profile ? JSON.stringify([s.profile.name, s.profile.look]) : ""));
  const atPlace = useGame((s) => s.atPlace);
  const interior = useGame((s) => s.interior);
  const net_ = useGame((s) => s.net);

  useEffect(() => {
    const id = setInterval(() => useGame.getState().tick(1), 1000);
    const hour = new URLSearchParams(location.search).get("hour");
    if (hour !== null && !Number.isNaN(Number(hour))) useGame.getState().patch({ clockOverride: Number(hour) });
    return () => clearInterval(id);
  }, []);

  // goals: award anything newly completed whenever game state changes
  useEffect(() => {
    const check = () => {
      const s = useGame.getState();
      if (!s.profile) return;
      const qs = { stats: s.stats, plots: s.plots, pid: s.profile.id };
      for (const q of QUESTS) if (!s.questsDone.includes(q.id) && q.done(qs)) s.awardQuest(q.id);
    };
    check();
    return useGame.subscribe(check);
  }, []);

  // welcome back: summarise time away and rent waiting
  useEffect(() => {
    const s = useGame.getState();
    if (s.awaySecs > 60 && s.profile) {
      const mins = Math.round(s.awaySecs / 60);
      const pid = s.profile.id;
      const rent = ownedBy(s.plots, pid).reduce((sum, p) => sum + pendingRent(s.plots[p.id], Date.now()), 0);
      setTimeout(() => {
        useGame.getState().toast(`Welcome back! Away ${mins} min${rent > 0 ? ` · ${naira(rent)} rent waiting` : ""}.`, "info");
      }, 1200);
    }
    useGame.getState().patch({ awaySecs: 0 });
  }, []);

  // deep link: /play?enter=home or /play?enter=<place id> walks straight inside
  useEffect(() => {
    if (!hasProfile) return;
    const target = new URLSearchParams(location.search).get("enter");
    if (!target) return;
    const t = setTimeout(() => enterInterior(target === "home" ? homeRef() : target === "flat" ? { kind: "home", id: "flat" } : { kind: "place", id: target }), 1800);
    return () => clearTimeout(t);
  }, [hasProfile]);

  useEffect(() => {
    if (!hasProfile) return;
    net.connect();
    return () => net.disconnect();
  }, [hasProfile]);

  useEffect(() => {
    if (lookKey && net_ === "online") net.hello();
  }, [lookKey, net_]);

  useEffect(() => {
    if (net_ !== "online") return;
    net.room(roomOf(atPlace, interior));
  }, [atPlace, interior, net_]);

  // walking out of a venue drops you from its voice room (call rooms are unaffected)
  useEffect(() => {
    const room = useGame.getState().voice.room;
    if (room?.startsWith("place:") && room !== `place:${atPlace}`) voice.leave();
    if (room?.startsWith("home:") && !interior) voice.leave();
  }, [atPlace, interior]);

  return null;
}

export default function WorldClient() {
  const mounted = useMounted();
  const profile = useGame((s) => s.profile);
  const editing = useGame((s) => s.editingAvatar);
  const setProfile = useGame((s) => s.setProfile);
  const patch = useGame((s) => s.patch);
  const fade = useGame((s) => s.fade);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#eef3ec]">
      <CityScene />
      {mounted && profile && (
        <>
          <Overlay />
          <Hud />
          <SidePanel />
          <ChatDock />
          <Sheets />
          <VoiceBar />
          <Minimap />
          <Hint />
        </>
      )}
      <AnimatePresence>
        {mounted && fade && (
          <motion.div key="fade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="pointer-events-none absolute inset-0 z-[70] bg-stone-950" />
        )}
      </AnimatePresence>
      {mounted && <Toasts />}
      {mounted && <IncomingCall />}
      {mounted && <Runtime />}
      <AnimatePresence>
        {mounted && (!profile || editing) && (
          <AvatarCreator
            key="creator"
            initialName={profile?.name}
            initialLook={profile?.look}
            isEdit={!!profile}
            onCancel={profile ? () => patch({ editingAvatar: false }) : undefined}
            onDone={(name, look) => {
              const id = profile?.id ?? crypto.randomUUID().replace(/-/g, "").slice(0, 20);
              setProfile({ id, name, look });
            }}
          />
        )}
      </AnimatePresence>
      <Link
        href="/"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-stone-600 shadow-lg ring-1 ring-black/5 backdrop-blur-xl transition hover:bg-white xl:inline-flex"
      >
        <ArrowLeft className="size-4" /> Home
      </Link>
    </div>
  );
}
