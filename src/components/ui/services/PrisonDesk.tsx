"use client";

import { useGame } from "@/lib/store";
import { CustodyDetails, HeldFriends } from "../CustodyUI";
import type { ServiceBodyProps } from "./types";

/** The bail desk at the prison: your own custody if you are held, otherwise the friends you can bail out. */
export default function PrisonDesk({ ctx }: ServiceBodyProps) {
  void ctx;
  const held = useGame((s) => !!s.custody);
  const open = useGame((s) => s.policeOpen);
  if (held) return <CustodyDetails />;
  if (!open) return <p className="rounded-2xl bg-white p-4 text-sm text-stone-600 ring-1 ring-black/5">Nobody is held here right now.</p>;
  return (
    <div className="space-y-3">
      <p className="text-sm text-stone-600">Friends who are in custody can be bailed out here. You pay their bail and they go free at once.</p>
      <HeldFriends />
    </div>
  );
}
