"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, Mail, Music2, Volume2, VolumeX } from "lucide-react";
import { DEMO_AUTH, demoLogIn, introInfo, requestCode, verifyCode, type IntroInfo, type Verified } from "@/lib/api";
import AuthCode from "./AuthCode";
import { setIntroMuted, startIntro } from "@/lib/music";

type Step = "intro" | "choose" | "login" | "code";

/** First screen: the intro song, then Sign up (name, email, avatar) or Log in (email and name). */
export default function AuthScreen({ onSignup, onLoggedIn }: { onSignup: () => void; onLoggedIn: (p: Verified) => void }) {
  const [step, setStep] = useState<Step>("intro");
  const [info, setInfo] = useState<IntroInfo>({ available: false });
  const [muted, setMuted] = useState(false);
  const [email, setEmail] = useState("");
  const [devCode, setDevCode] = useState<string | undefined>();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void introInfo().then(setInfo);
  }, []);

  const enter = () => {
    if (info.available) startIntro(info);
    setStep("choose");
  };

  const toggleMute = () => {
    setMuted(!muted);
    setIntroMuted(!muted);
  };

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    if (DEMO_AUTH) {
      const d = demoLogIn(email);
      setBusy(false);
      if (d.ok) onLoggedIn(d.profile);
      else setErr(d.error);
      return;
    }
    const r = await requestCode(email.trim().toLowerCase(), "login");
    if (r.ok && r.skip) {
      // the server is not asking for emailed codes right now: the email alone logs in
      const v = await verifyCode(email.trim().toLowerCase(), "");
      setBusy(false);
      if (v.ok) onLoggedIn(v.profile);
      else setErr(v.error);
      return;
    }
    setBusy(false);
    if (r.ok) {
      setDevCode(r.devCode);
      setStep("code");
    } else setErr(r.error);
  };

  const field = "w-full rounded-2xl border-0 bg-white/90 px-4 py-3.5 text-base font-medium text-stone-900 outline-none ring-2 ring-transparent transition placeholder:text-stone-400 focus:ring-amber-400";

  if (step === "code") return <AuthCode email={email.trim().toLowerCase()} purpose="login" devCode={devCode} onVerified={onLoggedIn} onBack={() => setStep("login")} />;

  return (
    <div className="absolute inset-0 z-50 overflow-hidden bg-gradient-to-b from-[#1b1a2e] via-[#3a2a3a] to-[#7a3b22] text-white">
      {/* the rust-roofed skyline of Ibadan */}
      <svg aria-hidden className="absolute inset-x-0 bottom-0 h-[46%] w-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice">
        {Array.from({ length: 22 }, (_, i) => {
          const x = i * 19 - 6;
          const h = 34 + ((i * 37) % 46);
          const c = ["#a85a3c", "#9c4f2f", "#b56a45", "#8f4a2b"][i % 4];
          return (
            <g key={i}>
              <rect x={x} y={200 - h} width="17" height={h} fill="#2b2230" />
              <polygon points={`${x - 2},${200 - h} ${x + 8.5},${200 - h - 14} ${x + 19},${200 - h}`} fill={c} />
            </g>
          );
        })}
        <rect x="0" y="186" width="400" height="14" fill="#1a141c" />
      </svg>
      <div className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-amber-400/25 blur-3xl" />

      {info.available && step !== "intro" && (
        <button onClick={toggleMute} aria-label={muted ? "Unmute intro" : "Mute intro"} className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25">
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      )}

      <div className="relative z-10 mx-auto flex h-full max-w-md flex-col justify-center px-6">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
              <Image src="/logo.png" alt="Omo Ibadan" width={112} height={112} priority className="mx-auto size-28 drop-shadow-[0_10px_30px_rgba(224,162,31,0.35)]" />
              <h1 className="mt-6 text-5xl font-black tracking-tight">Omo Ibadan</h1>
              <p className="mt-3 text-lg text-white/80">Live the life. Rust roofs, amala and good vibes.</p>
              <button onClick={enter} className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-stone-900 shadow-xl transition active:scale-95">
                Tap to enter <ArrowRight className="size-5" />
              </button>
              {info.available && (
                <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-white/60">
                  <Music2 className="size-3.5" /> Intro sound on
                </p>
              )}
            </motion.div>
          )}

          {step === "choose" && (
            <motion.div key="choose" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-3xl font-extrabold tracking-tight">Welcome</h2>
              <p className="mt-1 text-white/70">Create your Ibadan life, or pick up where you left off.</p>
              <button onClick={onSignup} className="mt-8 flex w-full items-center justify-between rounded-2xl bg-amber-500 px-5 py-4 text-left text-stone-900 shadow-xl transition active:scale-[0.98]">
                <span>
                  <span className="block text-base font-extrabold">Sign up</span>
                  <span className="text-sm text-stone-800/80">Name, email, then design your avatar</span>
                </span>
                <ArrowRight className="size-5" />
              </button>
              <button onClick={() => setStep("login")} className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white/15 px-5 py-4 text-left shadow-xl backdrop-blur transition active:scale-[0.98]">
                <span>
                  <span className="block text-base font-extrabold">Log in</span>
                  <span className="text-sm text-white/70">I already have an account</span>
                </span>
                <ArrowRight className="size-5" />
              </button>
              {info.available && info.title && (
                <p className="mt-8 text-center text-[11px] leading-relaxed text-white/50">
                  Intro: “{info.title}”, {info.artist}. © {info.rightsHolder}.
                </p>
              )}
            </motion.div>
          )}

          {step === "login" && (
            <motion.form key="login" onSubmit={(e) => void submitLogin(e)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <button type="button" onClick={() => setStep("choose")} className="mb-5 inline-flex items-center gap-1 rounded-full bg-white/15 py-1.5 pl-2 pr-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25 active:scale-95">
                <ChevronLeft className="size-5" strokeWidth={2.4} /> Back
              </button>
              <h2 className="text-3xl font-extrabold tracking-tight">Log in</h2>
              <p className="mt-1 text-white/70">{DEMO_AUTH ? "Demo mode: use the email you signed up with on this device. Nothing is sent." : "We will email you a 6-digit code. No password to remember."}</p>
              <div className="mt-6">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                  <input type="email" autoComplete="email" inputMode="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={`${field} pl-11`} />
                </div>
              </div>
              {err && <p className="mt-3 rounded-xl bg-rose-500/25 px-3.5 py-2.5 text-sm font-medium text-rose-100">{err}</p>}
              <button disabled={busy || !email} className="mt-5 w-full rounded-2xl bg-amber-500 py-4 text-base font-extrabold text-stone-900 shadow-xl transition active:scale-[0.98] disabled:opacity-50">
                {busy ? "Please wait…" : DEMO_AUTH ? "Log in" : "Email me a code"}
              </button>
              <p className="mt-4 text-center text-xs text-white/50">New here?{" "}
                <button type="button" onClick={onSignup} className="font-semibold text-amber-300 underline">
                  Sign up
                </button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
