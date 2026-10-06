"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import Hud from "@/components/ui/Hud";
import SidePanel from "@/components/ui/PlacePanel";
import ChatDock from "@/components/ui/ChatDock";
import Sheets from "@/components/ui/Sheets";
import DeckPanel from "@/components/ui/DeckPanel";
import BottomBar from "@/components/ui/BottomBar";
import ComputerScreen from "@/components/ui/ComputerScreen";
import Minimap from "@/components/ui/Minimap";
import ViewControls from "@/components/ui/ViewControls";
import AudioBridge from "@/components/ui/AudioBridge";
import { Hint, IncomingCall, Toasts, VoiceBar } from "@/components/ui/Floating";
import AvatarCreator from "@/components/avatar/AvatarCreator";
import Overlay from "./Overlay";
import { NPCS } from "./People";
import { ownedBy, pendingRent, useGame } from "@/lib/store";
import { QUESTS } from "@/lib/quests";
import { naira } from "@/lib/plots";
import { useMounted } from "@/lib/hooks";
import { net, roomOf } from "@/lib/net";
import { signUp } from "@/lib/api";
import { voice } from "@/lib/voice";
import { streetRoom } from "@/lib/voiceRoom";
import TalkButton from "@/components/ui/TalkButton";
import { enterInterior, goUpDeck, homeRef, rt, startUse, walkToFurn } from "@/lib/interiorRuntime";
import { cam, me } from "@/lib/playerState";
import { setOpenEstates } from "@/lib/pathing";
import { openEstateIds } from "@/lib/estates";
import { inCampus } from "@/lib/world";

const CityScene = dynamic(() => import("./CityScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center bg-gradient-to-b from-[#eef6ee] to-[#dfeadf]">
      <div className="flex flex-col items-center gap-4">
        <div className="grid size-16 place-items-center rounded-3xl bg-emerald-600 text-2xl font-black text-white shadow-xl shadow-emerald-600/30">O</div>
        <p className="text-lg font-bold tracking-tight text-stone-900">Omo Ibadan</p>
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-emerald-900/10">
          <div className="h-full w-1/2 animate-[load_1.1s_ease-in-out_infinite] rounded-full bg-emerald-600" />
        </div>
      </div>
    </div>
  ),
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
    if (process.env.NODE_ENV !== "production") (window as unknown as { __omo: unknown }).__omo = { useGame, me, cam, startUse, walkToFurn, rt, NPCS, goUpDeck };
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
    // walking indoors or into a venue leaves the street conversation
    if (room?.startsWith("street:") && (interior || atPlace)) voice.leave();
  }, [atPlace, interior]);

  // boom gates follow who may enter; the campus buildings appear once you are through the gate
  useEffect(() => {
    const tick = () => {
      const s = useGame.getState();
      setOpenEstates(openEstateIds({ plots: s.plots, profileId: s.profile?.id, passes: s.passes }, Date.now()));
      const inside = inCampus(me.x, me.z);
      if (inside !== s.campus) useGame.setState({ campus: inside });
    };
    tick();
    const id = setInterval(tick, 400);
    return () => clearInterval(id);
  }, []);

  // a street conversation follows you from block to block
  useEffect(() => {
    const id = setInterval(() => {
      const s = useGame.getState();
      const room = s.voice.room;
      if (!room?.startsWith("street:") || s.interior || s.atPlace) return;
      const here = streetRoom();
      if (room !== here) void voice.join(here);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return null;
}

export default function WorldClient() {
  const mounted = useMounted();
  const profile = useGame((s) => s.profile);
  const editing = useGame((s) => s.editingAvatar);
  const setProfile = useGame((s) => s.setProfile);
  const patch = useGame((s) => s.patch);
  const fade = useGame((s) => s.fade);
  const hideIcons = useGame((s) => s.hideIcons);
  const [signupError, setSignupError] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#eef3ec]">
      <CityScene />
      {mounted && profile && (
        <>
          <Overlay />
          <Hud />
          <SidePanel />
          {!hideIcons && <ChatDock />}
          {!hideIcons && <TalkButton />}
          <Sheets />
          <DeckPanel />
          <ComputerScreen />
          {!hideIcons && <BottomBar />}
          <VoiceBar />
          {!hideIcons && <Minimap />}
          {!hideIcons && <ViewControls />}
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
      {mounted && <AudioBridge />}
      <AnimatePresence>
        {mounted && (!profile || editing) && (
          <AvatarCreator
            key="creator"
            initialName={profile?.name}
            initialLook={profile?.look}
            isEdit={!!profile}
            onCancel={profile ? () => patch({ editingAvatar: false }) : undefined}
            askEmail={!profile}
            error={signupError}
            busy={signingUp}
            onDone={async (name, look, email) => {
              if (profile) return setProfile({ ...profile, name, look });
              const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
              setSigningUp(true);
              setSignupError("");
              const r = await signUp(id, name, email);
              setSigningUp(false);
              if (r === "taken") return setSignupError("That email is already registered. Use a different one.");
              setProfile({ id, name, look, email });
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
