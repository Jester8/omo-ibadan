"use client";

import { Users } from "lucide-react";
import { useGame } from "@/lib/store";
import { colorFor } from "@/lib/look";
import { roomOf } from "@/lib/net";

/** Who is connected here, as a horizontal row: you first, then everyone else in the same place. Tap a name for their card. */
export default function HereNow() {
  const remotes = useGame((s) => s.remotes);
  const me = useGame((s) => s.profile);
  const room = useGame((s) => roomOf(s.atPlace, s.interior));
  const online = useGame((s) => s.net === "online");
  if (!me) return null;
  const others = Object.values(remotes).filter((r) => r.room === room);
  const people = [{ id: "me", pid: me.id, name: me.name, you: true }, ...others.map((r) => ({ id: r.id, pid: r.pid, name: r.name, you: false }))];

  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="flex shrink-0 items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-stone-400">
        <Users className="size-3.5" /> Here
      </span>
      <ul className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
        {people.map((p) => (
          <li key={p.id} className="shrink-0">
            <button
              disabled={p.you}
              onClick={() => useGame.getState().select({ type: "player", id: p.id })}
              className="flex items-center gap-1.5 rounded-full bg-stone-100 py-1 pl-1 pr-2.5 text-xs font-semibold text-stone-900 transition enabled:active:scale-95"
            >
              <span className="grid size-5 place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: colorFor(p.pid) }}>
                {p.name.slice(0, 1).toUpperCase()}
              </span>
              {p.you ? "You" : p.name}
            </button>
          </li>
        ))}
        {online && others.length === 0 && <li className="shrink-0 self-center text-[11px] text-stone-400">no one else yet</li>}
      </ul>
    </div>
  );
}
