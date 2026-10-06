"use client";

import { useEffect, useState } from "react";
import { Flag, Hand, MessageCircle, PhoneCall, ShieldOff, UserCheck, UserPlus, X } from "lucide-react";
import { net } from "@/lib/net";
import { blockPlayer, friendRequest, loadSocial, openThread, playerProfile, type Profile } from "@/lib/social";
import { useGame } from "@/lib/store";
import { Avatar } from "./FriendsTabs";

/** The card for another player you tapped in the city: say hi, add them as a friend, message, call, block or report. */
export default function PlayerPanel({ id }: { id: string }) {
  const peer = useGame((s) => s.remotes[id]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [busy, setBusy] = useState(false);
  const pid = peer?.pid;
  const close = () => useGame.getState().select(null);

  useEffect(() => {
    if (!pid) return;
    let live = true;
    void playerProfile(pid).then((p) => live && setProfile(p));
    return () => {
      live = false;
    };
  }, [pid]);

  if (!peer || !pid) {
    return (
      <>
        <p className="text-sm text-stone-600">That player has left the city.</p>
        <button onClick={close} className="mt-3 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white">
          Close
        </button>
      </>
    );
  }

  const friendship = profile?.friendship ?? "none";
  const act = "flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition active:scale-95 disabled:opacity-40";

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={peer.name} online />
          <div>
            <h2 className="text-lg font-semibold leading-tight text-stone-900">{peer.name}</h2>
            <p className="text-xs font-semibold text-emerald-600">Online · {peer.room === "streets" ? "out and about" : peer.room.replace(/-/g, " ")}</p>
          </div>
        </div>
        <button onClick={close} aria-label="Close" className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">
          <X className="size-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button onClick={() => net.emote("wave")} className={`${act} bg-stone-100 text-stone-800`}>
          <Hand className="size-4" /> Wave
        </button>
        <button onClick={() => net.call(id, peer.name)} className={`${act} bg-emerald-600 text-white`}>
          <PhoneCall className="size-4" /> Call
        </button>
        {friendship === "friends" ? (
          <button
            onClick={() => {
              useGame.getState().patch({ selected: null, sheet: "friends" });
              void openThread(pid);
            }}
            className={`${act} col-span-2 bg-stone-900 text-white`}
          >
            <MessageCircle className="size-4" /> Message
          </button>
        ) : friendship === "received" ? (
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              await friendRequest(pid);
              setProfile(await playerProfile(pid));
              setBusy(false);
            }}
            className={`${act} col-span-2 bg-amber-500 text-stone-900`}
          >
            <UserCheck className="size-4" /> Accept friend request
          </button>
        ) : (
          <button
            disabled={busy || friendship === "sent"}
            onClick={async () => {
              setBusy(true);
              const msg = await friendRequest(pid);
              useGame.getState().toast(msg, "info");
              setProfile(await playerProfile(pid));
              setBusy(false);
            }}
            className={`${act} col-span-2 bg-stone-900 text-white`}
          >
            <UserPlus className="size-4" /> {friendship === "sent" ? "Friend request sent" : "Add friend"}
          </button>
        )}
      </div>
      {friendship !== "friends" && <p className="mt-2 text-xs text-stone-500">You can message each other once you are friends.</p>}

      <div className="mt-4 flex gap-2 border-t border-stone-100 pt-3">
        <button
          onClick={() => {
            const why = prompt(`Why are you reporting ${peer.name}? (rude, spam, other)`);
            if (why) {
              net.report(id, why);
              useGame.getState().toast("Thanks, we'll take a look.", "good");
            }
          }}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-stone-500 transition hover:bg-stone-100"
        >
          <Flag className="size-3.5" /> Report
        </button>
        <button
          onClick={async () => {
            if (!confirm(`Block ${peer.name}? You won't see their chat and they can't message or call you.`)) return;
            useGame.getState().mute(pid);
            await blockPlayer(pid);
            await loadSocial();
            useGame.getState().select(null);
          }}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
        >
          <ShieldOff className="size-3.5" /> Block
        </button>
      </div>
    </>
  );
}
