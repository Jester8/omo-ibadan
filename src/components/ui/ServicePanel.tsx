"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { SERVICES, closeService } from "@/lib/services";
import { serverMode } from "@/lib/socialApi";
import { useGame } from "@/lib/store";
import { SERVICE_BODIES } from "./services";

/**
 * The modal for a service desk: the frame, the heading and the close button, with the desk's own body inside. Mounted once by
 * WorldClient. It closes by itself when the player leaves the place, and a player in custody can only keep the bail desk open.
 */
export default function ServicePanel() {
  const svc = useGame((s) => s.service);
  const interiorId = useGame((s) => (s.interior?.kind === "place" ? s.interior.id : null));
  const held = useGame((s) => !!s.custody);

  useEffect(() => {
    if (!svc) return;
    if (interiorId !== svc.placeId || (held && svc.id !== "bail")) closeService();
  }, [svc, interiorId, held]);

  const def = svc ? SERVICES[svc.id] : null;
  const Body = svc ? SERVICE_BODIES[svc.id] : null;
  return (
    <AnimatePresence>
      {svc && def && Body && (
        <motion.div key="service" className="absolute inset-0 z-[48] flex items-end justify-center bg-stone-950/40 p-0 sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeService}>
          <motion.div
            role="dialog"
            aria-label={def.title}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[1.6rem] bg-stone-50 text-stone-900 shadow-2xl ring-1 ring-black/10 sm:rounded-[1.6rem]"
          >
            <div className="flex shrink-0 items-center gap-3 px-4 py-3 text-white" style={{ background: def.tint }}>
              <span className="text-xl">{def.emoji}</span>
              <h2 className="flex-1 text-base font-bold">{def.title}</h2>
              <button onClick={closeService} aria-label="Close" className="grid size-8 place-items-center rounded-full bg-white/20 transition active:scale-90">
                <X className="size-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
              {def.online && !serverMode() ? <p className="rounded-2xl bg-white p-4 text-sm text-stone-600 ring-1 ring-black/5">This desk works when you play online with other people.</p> : <Body ctx={svc} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
