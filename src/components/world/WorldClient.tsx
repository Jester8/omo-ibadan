"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Hud from "@/components/ui/Hud";
import SidePanel from "@/components/ui/PlacePanel";
import BottomBar from "@/components/ui/BottomBar";
import NowPlaying from "@/components/ui/NowPlaying";
import Minimap from "@/components/ui/Minimap";
import ViewControls from "@/components/ui/ViewControls";
import AudioBridge from "@/components/ui/AudioBridge";
import { FamilyAsks, Hint, IncomingCall, Knocks, NetBanner, RelAsks, Serves, Toasts, VoiceBar } from "@/components/ui/Floating";
import AvatarCreator from "@/components/avatar/AvatarCreator";
import AuthScreen from "@/components/ui/AuthScreen";
import Onboarding from "@/components/ui/Onboarding";
import Overlay from "./Overlay";
import { forceExit } from "@/lib/interiorRuntime";
import { interiorKey } from "@/lib/interiors";
import { ownedBy, pendingRent, SIGNUP_MONEY, useGame } from "@/lib/store";
import { QUESTS } from "@/lib/quests";
import { naira } from "@/lib/plots";
import { useMounted } from "@/lib/hooks";
import { net, roomOf } from "@/lib/net";
import { DEMO_AUTH, demoSignUp, forgetDevice, requestCode, sessionValid, verifyCode, type Verified } from "@/lib/api";
import AuthCode from "@/components/ui/AuthCode";
import type { Look } from "@/lib/look";
import { voice } from "@/lib/voice";
import { streetRoom } from "@/lib/voiceRoom";
import Comms from "@/components/ui/Comms";
import PhotoDrop from "@/components/ui/PhotoDrop";
import { enterInterior, goUpDeck, homeRef, rt, startUse, walkToFurn } from "@/lib/interiorRuntime";
import { cam, me } from "@/lib/playerState";
import { setOpenEstates } from "@/lib/pathing";
import { openEstateIds } from "@/lib/estates";
import { inCampus } from "@/lib/world";

// big panels that are rarely open load on demand, so the game itself starts sooner
const Sheets = dynamic(() => import("@/components/ui/Sheets"), { ssr: false });
const DeckPanel = dynamic(() => import("@/components/ui/DeckPanel"), { ssr: false });
const GuideTour = dynamic(() => import("@/components/ui/GuideTour"), { ssr: false });
const FlightScreen = dynamic(() => import("@/components/ui/FlightScreen"), { ssr: false });
const ComputerScreen = dynamic(() => import("@/components/ui/ComputerScreen"), { ssr: false });

const CityScene = dynamic(() => import("./CityScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center bg-gradient-to-b from-[#eef6ee] to-[#dfeadf]">
      <div className="flex flex-col items-center gap-4">
        <Image src="/logo.png" alt="" width={80} height={80} priority className="size-20 drop-shadow-xl" />
        <p className="text-lg font-bold tracking-tight text-stone-900">Omo&apos;badan</p>
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
    if (process.env.NODE_ENV !== "production") (window as unknown as { __omo: unknown }).__omo = { useGame, me, cam, startUse, walkToFurn, rt, goUpDeck };
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

  // a visit lasts only while the host is home: when they step out, you are shown out too
  useEffect(() => {
    if (!hasProfile) return;
    let away = 0;
    const id = setInterval(() => {
      const s = useGame.getState();
      const it = s.interior;
      if (!it || it.kind !== "home" || it.id === "flat") return void (away = 0);
      const plot = s.plots[it.id];
      if (!plot || plot.biz || plot.ownerId === s.profile?.id) return void (away = 0);
      const hostHere = Object.values(s.remotes).some((r) => r.pid === plot.ownerId && r.room === interiorKey(it));
      if (hostHere) return void (away = 0);
      away += 1;
      if (away >= 3) {
        away = 0;
        forceExit();
        s.toast(`${plot.ownerName} has stepped out, so you were shown out.`, "info");
      }
    }, 1000);
    return () => clearInterval(id);
  }, [hasProfile]);

  // a saved login is only good if the server still knows the account: after a wiped database, start at the sign-in screen
  useEffect(() => {
    if (!hasProfile || DEMO_AUTH) return;
    let live = true;
    void sessionValid().then((ok) => {
      if (live && !ok) forgetDevice();
    });
    return () => {
      live = false;
    };
  }, [hasProfile]);

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
  const onboard = useGame((s) => s.onboard);
  const [creating, setCreating] = useState(false);
  const [pending, setPending] = useState<{ name: string; look: Look; email: string; username: string; password: string; devCode?: string; cooldown: number } | null>(null);
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
          {!hideIcons && <Comms />}
          <PhotoDrop />
          <Sheets />
          <DeckPanel />
          <ComputerScreen />
          <FlightScreen />
          <GuideTour />
          {!hideIcons && <BottomBar />}
          {!hideIcons && <NowPlaying />}
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
      {mounted && <Knocks />}
      {mounted && <RelAsks />}
      {mounted && <FamilyAsks />}
      {mounted && <Serves />}
      {mounted && <NetBanner />}
      {mounted && <Runtime />}
      {mounted && <AudioBridge />}
      <AnimatePresence>{mounted && profile && onboard && <Onboarding key="onboarding" />}</AnimatePresence>
      <AnimatePresence>
        {mounted && !profile && !creating && (
          <AuthScreen
            key="auth"
            onSignup={() => setCreating(true)}
            onLoggedIn={(p: Verified) => {
              // an account made before looks were stored falls back to the creator
              if (!p.look) {
                setCreating(true);
                return;
              }
              setProfile({ id: p.id, name: p.name, username: p.username, look: p.look, email: p.email });
            }}
          />
        )}
        {mounted && !profile && pending && (
          <AuthCode
            key="code"
            email={pending.email}
            purpose="signup"
            signup={{ name: pending.name, look: pending.look, username: pending.username, password: pending.password }}
            devCode={pending.devCode}
            cooldown={pending.cooldown}
            onBack={() => setPending(null)}
            onVerified={(p) => {
              if (p.isNew) useGame.setState({ money: SIGNUP_MONEY, starterPending: true, onboard: true, background: null });
              setProfile({ id: p.id, name: p.name, username: p.username ?? pending.username, look: p.look ?? pending.look, email: p.email });
              setPending(null);
            }}
          />
        )}
        {mounted && ((!profile && creating) || editing) && (
          <AvatarCreator
            key="creator"
            initialName={profile?.name}
            initialLook={profile?.look}
            isEdit={!!profile}
            onCancel={profile ? () => patch({ editingAvatar: false }) : () => setCreating(false)}
            askEmail={!profile}
            error={signupError}
            busy={signingUp}
            onDone={async (name, look, email, username, password) => {
              if (profile) return setProfile({ ...profile, name, look });
              setSigningUp(true);
              setSignupError("");
              if (DEMO_AUTH) {
                // demo mode: make the account right here, no server and no email code
                const d = demoSignUp(name, email, look, username);
                setSigningUp(false);
                if (!d.ok) return setSignupError(d.error);
                useGame.setState({ money: SIGNUP_MONEY, starterPending: true, onboard: true, background: null });
                return setProfile({ id: d.profile.id, name, username, look, email: d.profile.email });
              }
              const r = await requestCode(email, "signup", username);
              if (r.ok && r.skip) {
                // no emailed codes for now: just save the details and go in
                const v = await verifyCode(email, "", { name, look, username, password });
                setSigningUp(false);
                if (!v.ok) return setSignupError(v.error);
                if (v.profile.isNew) useGame.setState({ money: SIGNUP_MONEY, starterPending: true, onboard: true, background: null });
                return setProfile({ id: v.profile.id, name: v.profile.name, username: v.profile.username ?? username, look: v.profile.look ?? look, email: v.profile.email });
              }
              setSigningUp(false);
              if (!r.ok) return setSignupError(r.error);
              setPending({ name, look, email, username, password, devCode: r.devCode, cooldown: r.cooldown });
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
