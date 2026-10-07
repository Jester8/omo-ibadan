"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, MailCheck } from "lucide-react";
import { requestCode, verifyCode, type Verified } from "@/lib/api";
import type { Look } from "@/lib/look";

/** The "check your email" screen: enter the six-digit code to log in or finish signing up. */
export default function AuthCode({
  email,
  purpose,
  signup,
  devCode,
  cooldown = 30,
  onVerified,
  onBack,
}: {
  email: string;
  purpose: "login" | "signup";
  signup?: { name: string; look: Look; username?: string; password?: string };
  devCode?: string;
  cooldown?: number;
  onVerified: (p: Verified) => void;
  onBack: () => void;
}) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(cooldown);
  const [dev, setDev] = useState(devCode);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);
  useEffect(() => {
    if (wait <= 0) return;
    const t = setTimeout(() => setWait(wait - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  const submit = async (c = code) => {
    if (c.length !== 6 || busy) return;
    setBusy(true);
    setErr("");
    const r = await verifyCode(email, c, signup);
    setBusy(false);
    if (r.ok) onVerified(r.profile);
    else {
      setErr(r.error);
      setCode("");
      input.current?.focus();
    }
  };

  const resend = async () => {
    setErr("");
    const r = await requestCode(email, purpose);
    if (r.ok) {
      setWait(r.cooldown);
      setDev(r.devCode);
    } else setErr(r.error);
  };

  return (
    <div className="absolute inset-0 z-50 overflow-y-auto bg-gradient-to-b from-[#1b1a2e] via-[#3a2a3a] to-[#7a3b22] text-white">
      <div className="mx-auto flex min-h-full max-w-md flex-col justify-center px-6 py-10">
        <button onClick={onBack} className="mb-6 inline-flex w-fit items-center gap-1 rounded-full bg-white/15 py-1.5 pl-2 pr-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25 active:scale-95">
          <ChevronLeft className="size-5" strokeWidth={2.4} /> Back
        </button>
        <div className="grid size-14 place-items-center rounded-2xl bg-amber-500 text-stone-900 shadow-xl">
          <MailCheck className="size-7" />
        </div>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight">Check your email</h2>
        <p className="mt-2 text-white/75">
          We sent a 6-digit code to <b className="text-white">{email}</b>. It lasts 10 minutes.
        </p>

        <input
          ref={input}
          value={code}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(0, 6);
            setCode(v);
            if (v.length === 6) void submit(v);
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="••••••"
          aria-label="Six-digit code"
          className="mt-7 w-full rounded-2xl border-0 bg-white px-4 py-4 text-center text-3xl font-extrabold tracking-[0.5em] text-stone-900 outline-none ring-2 ring-transparent placeholder:text-stone-300 focus:ring-amber-400"
        />
        {err && <p className="mt-3 rounded-xl bg-rose-500/25 px-3.5 py-2.5 text-sm font-medium text-rose-100">{err}</p>}
        {dev && (
          <button onClick={() => { setCode(dev); void submit(dev); }} className="mt-3 rounded-xl bg-white/10 px-3.5 py-2.5 text-left text-xs text-white/80 hover:bg-white/15">
            Local testing: no mail server is set up, so your code is <b className="text-amber-300">{dev}</b>. Tap to use it.
          </button>
        )}

        <button disabled={code.length !== 6 || busy} onClick={() => void submit()} className="mt-6 w-full rounded-2xl bg-amber-500 py-4 text-base font-extrabold text-stone-900 shadow-xl transition active:scale-[0.98] disabled:opacity-50">
          {busy ? "Checking…" : purpose === "signup" ? "Verify and enter Ibadan" : "Verify and log in"}
        </button>
        <button disabled={wait > 0} onClick={() => void resend()} className="mt-4 text-center text-sm font-semibold text-white/70 transition hover:text-white disabled:opacity-50">
          {wait > 0 ? `Send a new code in ${wait}s` : "Send a new code"}
        </button>
      </div>
    </div>
  );
}
