"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { completeOnboarding, decide, HOBBIES, hobbyById, JOBS, jobById, PATHS, type Path } from "@/lib/background";
import { naira } from "@/lib/plots";

type Step = "path" | "job" | "hobby" | "verdict";
const ORDER: Step[] = ["path", "job", "hobby", "verdict"];

const slide = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -18 }, transition: { duration: 0.35, ease: "easeOut" as const } };

/** The few questions right after sign up: nepo or lapo, the work you want, what you do for fun. Then the city decides where you come from. */
export default function Onboarding() {
  const [step, setStep] = useState<Step>("path");
  const [path, setPath] = useState<Path | null>(null);
  const [job, setJob] = useState<string | null>(null);
  const [hobby, setHobby] = useState<string | null>(null);
  const at = ORDER.indexOf(step);
  const back = () => setStep(ORDER[Math.max(0, at - 1)]);

  const verdict = path && job && hobby ? decide(path, job, hobby) : null;
  const card = "flex flex-col items-start gap-1 rounded-2xl bg-white/12 p-3.5 text-left ring-1 ring-white/15 backdrop-blur transition active:scale-[0.97] hover:bg-white/20";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-[60] overflow-y-auto bg-gradient-to-b from-[#1b1a2e] via-[#3a2a3a] to-[#7a3b22] text-white"
    >
      <div className="mx-auto flex min-h-full max-w-md flex-col px-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-[max(env(safe-area-inset-top),1.25rem)]">
        <div className="flex h-10 items-center justify-between">
          {at > 0 && step !== "verdict" ? (
            <button onClick={back} className="inline-flex items-center gap-1 rounded-full bg-white/15 py-1.5 pl-2 pr-4 text-sm font-semibold backdrop-blur transition hover:bg-white/25 active:scale-95">
              <ChevronLeft className="size-5" strokeWidth={2.4} /> Back
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-1.5" aria-label={`Step ${at + 1} of ${ORDER.length}`}>
            {ORDER.map((s, i) => (
              <span key={s} className={`h-1.5 rounded-full transition-all ${i === at ? "w-6 bg-amber-400" : i < at ? "w-1.5 bg-amber-400/70" : "w-1.5 bg-white/25"}`} />
            ))}
          </div>
        </div>

        <div className="my-auto py-6">
          <AnimatePresence mode="wait">
            {step === "path" && (
              <motion.div key="path" {...slide}>
                <h2 className="text-3xl font-extrabold tracking-tight">Who are you in Ibadan?</h2>
                <p className="mt-1 text-white/70">Pick your lane. The city will work out the rest.</p>
                <div className="mt-6 space-y-3">
                  {PATHS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPath(p.id);
                        setStep("job");
                      }}
                      className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left shadow-xl transition active:scale-[0.98] ${path === p.id ? "bg-amber-500 text-stone-900" : "bg-white/15 backdrop-blur hover:bg-white/25"}`}
                    >
                      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-black/15 text-3xl">{p.emoji}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xl font-extrabold">{p.label}</span>
                        <span className={`block text-sm font-semibold ${path === p.id ? "text-stone-800" : "text-amber-300"}`}>{p.tagline}</span>
                        <span className={`mt-0.5 block text-[13px] leading-snug ${path === p.id ? "text-stone-800/80" : "text-white/65"}`}>{p.detail}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "job" && (
              <motion.div key="job" {...slide}>
                <h2 className="text-3xl font-extrabold tracking-tight">What work do you want?</h2>
                <p className="mt-1 text-white/70">Your preferred line of work. You can still take any job in the city.</p>
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {JOBS.map((j) => (
                    <button
                      key={j.id}
                      onClick={() => {
                        setJob(j.id);
                        setStep("hobby");
                      }}
                      className={`${card} ${job === j.id ? "!bg-amber-500 !text-stone-900" : ""}`}
                    >
                      <span className="text-2xl">{j.emoji}</span>
                      <span className="text-sm font-extrabold">{j.label}</span>
                      <span className={`text-[11.5px] leading-snug ${job === j.id ? "text-stone-800/80" : "text-white/60"}`}>{j.blurb}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "hobby" && (
              <motion.div key="hobby" {...slide}>
                <h2 className="text-3xl font-extrabold tracking-tight">What do you do for fun?</h2>
                <p className="mt-1 text-white/70">Pick the hobby that is most you.</p>
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {HOBBIES.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => {
                        setHobby(h.id);
                        setStep("verdict");
                      }}
                      className={`${card} ${hobby === h.id ? "!bg-amber-500 !text-stone-900" : ""}`}
                    >
                      <span className="text-2xl">{h.emoji}</span>
                      <span className="text-sm font-extrabold">{h.label}</span>
                      <span className={`text-[11.5px] leading-snug ${hobby === h.id ? "text-stone-800/80" : "text-white/60"}`}>{h.blurb}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "verdict" && verdict && path && (
              <motion.div key="verdict" {...slide}>
                <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">The city has decided</p>
                <h2 className="mt-1 text-4xl font-black tracking-tight">{path === "nepo" ? "Nepo baby" : "Lapo"}</h2>
                <p className="mt-1 text-lg font-bold text-white/90">{verdict.wealthLabel}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">{verdict.origin}</p>

                <dl className="mt-5 divide-y divide-white/10 rounded-2xl bg-white/12 px-4 ring-1 ring-white/15 backdrop-blur">
                  {(
                    [
                      ["Starting cash", naira(verdict.cash)],
                      ["Head start", verdict.rep ? `+${verdict.rep} rep` : "None, you earn it"],
                      ["Work", `${jobById(job ?? "")?.emoji} ${jobById(job ?? "")?.label}`],
                      ["Hobby", `${hobbyById(hobby ?? "")?.emoji} ${hobbyById(hobby ?? "")?.label}`],
                      ["Family", "None yet"],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between py-3 text-sm">
                      <dt className="text-white/60">{k}</dt>
                      <dd className="font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-[12.5px] leading-snug text-white/55">Your family starts empty. Add friends as your dad, mum or siblings from Phone → Family. They have to accept.</p>

                <button
                  onClick={() => path && job && hobby && completeOnboarding(path, job, hobby)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 py-4 text-base font-extrabold text-stone-900 shadow-xl transition active:scale-[0.98]"
                >
                  Enter Ibadan <ArrowRight className="size-5" />
                </button>
                <button onClick={back} className="mx-auto mt-3 block rounded-full px-4 py-1.5 text-sm font-semibold text-white/60 transition hover:bg-white/10 hover:text-white">
                  Change my answers
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
