"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, ChevronLeft, Footprints } from "lucide-react";
import AvatarPreview from "./AvatarPreview";
import {
  ACCESSORIES,
  BUILDS,
  CLOTH_COLORS,
  DEFAULT_LOOK,
  FRAMES,
  HAIR_COLORS,
  HAIR_STYLES,
  SKIN_TONES,
  topsFor,
  type Look,
} from "@/lib/look";

function Swatches({ label, value, options, onPick }: { label: string; value: string; options: string[]; onPick: (c: string) => void }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((c) => (
          <button
            key={c}
            onClick={() => onPick(c)}
            aria-label={`${label} ${c}`}
            className={`grid size-8 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-white transition active:scale-90 ${
              value === c ? "ring-stone-900" : "ring-transparent hover:ring-stone-300"
            }`}
            style={{ background: c }}
          >
            {value === c && <Check className="size-3.5 text-white mix-blend-difference" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function Chips<T extends string>({ label, value, options, onPick }: { label: string; value: T; options: { id: T; label: string }[]; onPick: (v: T) => void }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => onPick(o.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition active:scale-95 ${
              value === o.id ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AvatarCreator({
  initialName = "",
  initialLook = DEFAULT_LOOK,
  isEdit = false,
  onDone,
  onCancel,
  askEmail = false,
  error,
  busy = false,
}: {
  initialName?: string;
  initialLook?: Look;
  isEdit?: boolean;
  onDone: (name: string, look: Look, email: string, username: string, password: string) => void;
  onCancel?: () => void;
  /** first-time sign-up: also ask for an email address */
  askEmail?: boolean;
  error?: string;
  busy?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [name, setName] = useState(initialName);
  const [look, setLook] = useState<Look>(initialLook);
  const [walk, setWalk] = useState(false);
  const set = <K extends keyof Look>(k: K, v: Look[K]) => setLook((l) => ({ ...l, [k]: v }));
  const emailOk = !askEmail || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const userOk = !askEmail || /^[a-z0-9_]{3,16}$/i.test(username);
  const pwOk = !askEmail || (password.length >= 6 && password.length <= 72);
  const valid = name.trim().length >= 2 && emailOk && userOk && pwOk && !busy;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-40 grid place-items-center bg-stone-900/30 p-3 backdrop-blur-md sm:p-6"
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="grid max-h-full w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5 sm:grid-cols-[1fr_1.15fr]"
      >
        <div className="relative h-72 bg-gradient-to-b from-emerald-50 via-stone-50 to-amber-50 sm:h-auto sm:min-h-[34rem]">
          <AvatarPreview look={look} walk={walk} className="absolute inset-0" />
          {onCancel && (
            <button onClick={onCancel} aria-label="Back" className="absolute left-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-stone-800 shadow-md ring-1 ring-black/5 backdrop-blur transition hover:bg-white active:scale-90">
              <ChevronLeft className="size-6" strokeWidth={2.4} />
            </button>
          )}
          <div className={`absolute top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-black/5 backdrop-blur ${onCancel ? "left-16" : "left-4"}`}>
            Omo&apos;badan
          </div>
          <div className="absolute right-3 top-3 flex flex-col items-end gap-2 sm:bottom-4 sm:left-1/2 sm:right-auto sm:top-auto sm:-translate-x-1/2 sm:flex-row">
            <button
              onClick={() => setWalk((w) => !w)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium shadow ring-1 ring-black/5 transition active:scale-95 ${
                walk ? "bg-emerald-600 text-white" : "bg-white/90 text-stone-700 hover:bg-white"
              }`}
            >
              <Footprints className="size-4" /> Walk
            </button>
          </div>
        </div>

        <div className="flex max-h-[60dvh] flex-col sm:max-h-[40rem]">
          <div className="space-y-5 overflow-y-auto p-5 sm:p-7">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                {isEdit ? "Change your look" : "Make your Omo'badan"}
              </h2>
              <p className="mt-1 text-sm text-stone-500">This is how people will see you around the city.</p>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-400">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 16))}
                placeholder="e.g. Tunde"
                className="w-full rounded-2xl border-0 bg-stone-100 px-4 py-3 text-base font-medium text-stone-900 outline-none ring-2 ring-transparent transition placeholder:text-stone-400 focus:bg-white focus:ring-emerald-500"
              />
            </label>

            {askEmail && (
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-400">Username</span>
                <div className="flex items-center rounded-2xl bg-stone-100 pl-4 ring-2 ring-transparent transition focus-within:bg-white focus-within:ring-emerald-500">
                  <span className="text-base font-medium text-stone-400">@</span>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 16))}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="tunde_ibadan"
                    className="min-w-0 flex-1 bg-transparent px-1.5 py-3 text-base font-medium text-stone-900 outline-none placeholder:text-stone-400"
                  />
                </div>
                <span className="mt-1.5 block text-xs text-stone-400">3 to 16 letters, numbers or underscores. Friends find you by it, and you can log in with it.</span>
              </label>
            )}

            {askEmail && (
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-400">Email</span>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.slice(0, 80))}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border-0 bg-stone-100 px-4 py-3 text-base font-medium text-stone-900 outline-none ring-2 ring-transparent transition placeholder:text-stone-400 focus:bg-white focus:ring-emerald-500"
                />
                {error && <span className="mt-1.5 block text-sm font-medium text-rose-600">{error}</span>}
              </label>
            )}

            {askEmail && (
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-400">Password</span>
                <div className="flex items-center rounded-2xl bg-stone-100 pr-2 ring-2 ring-transparent transition focus-within:bg-white focus-within:ring-emerald-500">
                  <input
                    type={showPw ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.slice(0, 72))}
                    placeholder="At least 6 characters"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base font-medium text-stone-900 outline-none placeholder:text-stone-400"
                  />
                  <button type="button" onClick={() => setShowPw((v) => !v)} className="rounded-full px-3 py-1.5 text-xs font-semibold text-stone-500 hover:bg-stone-200">
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
                <span className="mt-1.5 block text-xs text-stone-400">You stay logged in on this device until you log out.</span>
              </label>
            )}

            <Swatches label="Skin" value={look.skin} options={SKIN_TONES} onPick={(c) => set("skin", c)} />
            <Chips
              label="Body type"
              value={look.frame ?? "m"}
              options={FRAMES}
              onPick={(v) =>
                setLook((l) => {
                  const ok = topsFor(v).some((t) => t.id === l.top);
                  return { ...l, frame: v, top: ok ? l.top : "tee" };
                })
              }
            />
            <Chips label="Build" value={look.build} options={BUILDS} onPick={(v) => set("build", v)} />
            <Chips label="Hair" value={look.hairStyle} options={HAIR_STYLES} onPick={(v) => set("hairStyle", v)} />
            {look.hairStyle !== "bald" && look.hairStyle !== "gele" && (
              <Swatches label="Hair colour" value={look.hairColor} options={HAIR_COLORS} onPick={(c) => set("hairColor", c)} />
            )}
            <Chips label="Outfit · Everyday" value={look.top} options={topsFor(look.frame).filter((t) => t.group === "Everyday")} onPick={(v) => set("top", v)} />
            <Chips label="Outfit · Nigerian" value={look.top} options={topsFor(look.frame).filter((t) => t.group === "Nigerian")} onPick={(v) => set("top", v)} />
            <Swatches label="Outfit colour" value={look.topColor} options={CLOTH_COLORS} onPick={(c) => set("topColor", c)} />
            <Swatches
              label={look.top === "ankara" ? "Skirt colour" : "Trousers"}
              value={look.bottomColor}
              options={[...CLOTH_COLORS.slice(0, 4), "#3a3f4b", "#7c5a3a"]}
              onPick={(c) => set("bottomColor", c)}
            />
            <Swatches label="Shoes" value={look.shoeColor} options={["#f4f4f2", "#1d2433", "#dc2626", "#f59e0b", "#0ea5e9"]} onPick={(c) => set("shoeColor", c)} />
            <Chips label="Accessory" value={look.accessory} options={ACCESSORIES} onPick={(v) => set("accessory", v)} />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-stone-100 bg-white/80 p-4 sm:px-7">
            {onCancel && isEdit && (
              <button onClick={onCancel} className="rounded-full px-5 py-3 text-sm font-semibold text-stone-500 transition hover:bg-stone-100">
                Cancel
              </button>
            )}
            <button
              disabled={!valid}
              onClick={() => onDone(name.trim(), look, email.trim().toLowerCase(), username, password)}
              className="rounded-full bg-emerald-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/25 transition hover:bg-emerald-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isEdit ? "Save look" : busy ? "Creating…" : "Sign up & enter Ibadan"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
