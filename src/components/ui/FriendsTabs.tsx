"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, Copy, House, MessageCircle, PhoneCall, Send, UserMinus, UserPlus } from "lucide-react";
import { homeOf, visitHome } from "@/lib/visit";
import { LEVELS, levelOf, levelRank } from "@/lib/bonds";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { net } from "@/lib/net";
import { blockPlayer, closeThread, friendRequest, friendRespond, loadSocial, openThread, removeFriend, setBond, unblockPlayer, type Person, type Thread } from "@/lib/social";
import { useGame } from "@/lib/store";
import { useSecond } from "@/lib/hooks";
import { motion } from "motion/react";

const initial = (n: string) => n.slice(0, 1).toUpperCase();
const ago = (t: number) => {
  const m = Math.round((Date.now() - t) / 60000);
  return m < 1 ? "now" : m < 60 ? `${m}m` : m < 1440 ? `${Math.round(m / 60)}h` : `${Math.round(m / 1440)}d`;
};

export function Avatar({ name, online }: { name: string; online?: boolean }) {
  return (
    <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
      {initial(name)}
      {online !== undefined && <span className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-white ${online ? "bg-emerald-500" : "bg-stone-300"}`} />}
    </span>
  );
}

/** Call a player who is online right now (voice call over the realtime connection). */
export function callPlayer(pid: string, name: string) {
  const s = useGame.getState();
  const peer = Object.values(s.remotes).find((r) => r.pid === pid);
  if (!peer) return s.toast(`${name} is not online right now.`, "info");
  net.call(peer.id, peer.name);
  s.setSheet("phone");
}

function Thread_({ pid }: { pid: string }) {
  const friend = useGame((s) => s.friends.find((f) => f.pid === pid) ?? s.threads.find((t) => t.pid === pid));
  const loaded = useGame((s) => s.dms[pid]);
  const msgs = loaded ?? [];
  const [showProfile, setShowProfile] = useState(false);
  const home = homeOf(pid);
  const typingNow = useGame((s) => s.typing[`dm:${pid}`]);
  const sec = useSecond();
  const isTyping = !!typingNow && sec * 1000 - typingNow.at < 4000;
  const peerOnline = useGame((s) => Object.values(s.remotes).find((r) => r.pid === pid));
  const me = useGame((s) => s.profile?.id);
  const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [msgs.length, loaded, isTyping]);
  const name = friend?.name ?? "Friend";
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    net.dm(pid, t);
    setText("");
  };
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2">
        <button onClick={closeThread} aria-label="Back" className="grid size-9 place-items-center rounded-full bg-stone-100 text-stone-700 transition active:scale-90">
          <ChevronLeft className="size-5" strokeWidth={2.4} />
        </button>
        <button onClick={() => setShowProfile((v) => !v)} aria-label={`${name}'s profile`} className="flex min-w-0 flex-1 items-center gap-2 text-left">
          <Avatar name={name} online={friend?.online} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-stone-900">{name}</span>
            <span className="block text-[11px] text-stone-500">{levelOf(friend?.level).emoji} {levelOf(friend?.level).label} · {friend?.online ? "Online" : "Offline"}</span>
          </span>
        </button>
        <button onClick={() => callPlayer(pid, name)} aria-label={`Call ${name}`} className="grid size-9 place-items-center rounded-full bg-emerald-600 text-white transition active:scale-90">
          <PhoneCall className="size-4" />
        </button>
      </div>
      {showProfile && (
        <div className="mb-3 rounded-2xl bg-white p-3 ring-1 ring-black/10">
          {friend?.look && (
            <div className="relative mb-3 h-40 overflow-hidden rounded-xl bg-gradient-to-b from-emerald-50 via-stone-50 to-amber-50">
              <AvatarPreview look={friend.look} className="absolute inset-0" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <Avatar name={name} online={friend?.online} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-black">{name}</p>
              <p className="text-xs text-stone-500">{friend?.online ? (peerOnline ? `Online · ${peerOnline.room === "streets" ? "out and about" : peerOnline.room.replace(/-/g, " ")}` : "Online") : "Offline right now"}</p>
              <p className="text-xs text-stone-500">{home ? "Has a home you can visit" : "No home built yet"}</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-stone-400">Your bond</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {LEVELS.map((l) => {
              const here = (friend?.level ?? "friend") === l.id;
              return (
                <button
                  key={l.id}
                  disabled={here}
                  onClick={async () => {
                    const up = levelRank(l.id) > levelRank(friend?.level);
                    if (!up && !confirm(`Move ${name} back to ${l.label.toLowerCase()}?`)) return;
                    const r = await setBond(pid, l.id);
                    useGame.getState().toast(r.message, r.ok ? "info" : "bad");
                  }}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-bold transition active:scale-95 ${here ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-800"}`}
                  title={l.blurb}
                >
                  <span>{l.emoji}</span> {l.label}
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-[11px] text-stone-500">Going closer asks {name} first. Moving back down happens right away.</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button disabled={!home} onClick={() => visitHome(pid, name)} className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-40">
              <House className="size-4" /> Visit home
            </button>
            <button onClick={() => callPlayer(pid, name)} className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white transition active:scale-95">
              <PhoneCall className="size-4" /> Call
            </button>
          </div>
        </div>
      )}
      <div className="min-h-40 flex-1 space-y-1.5 overflow-y-auto rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5">
        {loaded === undefined && <p className="pt-6 text-center text-xs text-stone-400">Loading…</p>}
        {loaded !== undefined && msgs.length === 0 && <p className="pt-6 text-center text-xs text-stone-400">No messages yet. Say hello 👋</p>}
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.from === me ? "justify-end" : "justify-start"}`}>
            <p className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${m.from === me ? "rounded-br-sm bg-emerald-600 text-white" : "rounded-bl-sm bg-white text-black ring-1 ring-black/5"}`}>{m.text}</p>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <p className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white px-3.5 py-2 text-[12px] font-semibold text-stone-500 ring-1 ring-black/5">
              {name} is typing
              <span className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="size-1 rounded-full bg-stone-400" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </span>
            </p>
          </div>
        )}
        <div ref={end} />
      </div>
      <form onSubmit={send} className="mt-2 flex gap-2">
        <input value={text} onChange={(e) => {
            setText(e.target.value.slice(0, 400));
            net.typing(pid);
          }} placeholder="Message" className="min-w-0 flex-1 rounded-full bg-stone-100 px-4 py-2.5 text-sm outline-none ring-2 ring-transparent focus:bg-white focus:ring-emerald-500" />
        <button disabled={!text.trim()} aria-label="Send" className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-600 text-white transition active:scale-90 disabled:opacity-40">
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}

/** Conversations with friends. Used on the Friends tab and in the phone's Messages app. */
export function ChatsPanel() {
  const open = useGame((s) => s.openChat);
  const threads = useGame((s) => s.threads);
  const friends = useGame((s) => s.friends);
  useEffect(() => {
    void loadSocial();
  }, []);
  if (open) return <Thread_ pid={open} />;
  const startable = friends.filter((f) => !threads.some((t) => t.pid === f.pid));
  return (
    <>
      {threads.length === 0 && startable.length === 0 && <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5">No chats yet. Add friends from the Friends or Nearby tab, then message them here.</p>}
      <ul className="space-y-2">
        {threads.map((t: Thread) => (
          <li key={t.pid}>
            <button onClick={() => void openThread(t.pid)} className="flex w-full items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-left ring-1 ring-black/5 transition active:scale-[0.99]">
              <Avatar name={t.name} online={t.online} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-stone-900">{t.name}</span>
                  <span className="shrink-0 text-[11px] text-stone-400">{ago(t.last.at)}</span>
                </span>
                <span className={`block truncate text-xs ${t.unread ? "font-semibold text-stone-800" : "text-stone-500"}`}>
                  {t.last.mine ? "You: " : ""}
                  {t.last.text}
                </span>
              </span>
              {t.unread > 0 && <span className="grid min-w-5 place-items-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold leading-5 text-white">{t.unread}</span>}
            </button>
          </li>
        ))}
      </ul>
      {startable.length > 0 && (
        <>
          <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400">Start a chat</p>
          <ul className="space-y-2">
            {startable.map((f) => (
              <li key={f.pid}>
                <button onClick={() => void openThread(f.pid)} className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-left ring-1 ring-black/10 transition active:scale-[0.99]">
                  <Avatar name={f.name} online={f.online} />
                  <span className="flex-1 truncate text-sm font-semibold text-stone-900">{f.name}</span>
                  <MessageCircle className="size-4 text-stone-400" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

function PersonRow({ p, children }: { p: Person; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
      <Avatar name={p.name} online={p.online} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-stone-900">{p.name}</span>
        {p.level && p.level !== "friend" && (
          <span className="block truncate text-[11px] font-semibold text-rose-600">
            {levelOf(p.level).emoji} {levelOf(p.level).label}
          </span>
        )}
      </span>
      <span className="flex shrink-0 items-center gap-1.5">{children}</span>
    </li>
  );
}

const round = "grid size-9 place-items-center rounded-full transition active:scale-90";

function FriendsPanel() {
  const friends = useGame((s) => s.friends);
  const reqIn = useGame((s) => s.requestsIn);
  const reqOut = useGame((s) => s.requestsOut);
  const blocked = useGame((s) => s.blocked);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    void loadSocial();
  }, []);
  const sorted = [...friends].sort((a, b) => Number(!!b.online) - Number(!!a.online) || a.name.localeCompare(b.name));
  return (
    <>
      {reqIn.length > 0 && (
        <>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-600">Friend requests</p>
          <ul className="mb-5 space-y-2">
            {reqIn.map((p) => (
              <PersonRow key={p.pid} p={p}>
                <button onClick={() => void friendRespond(p.pid, true)} className="rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white transition active:scale-95">
                  Accept
                </button>
                <button onClick={() => void friendRespond(p.pid, false)} className="rounded-full bg-stone-200 px-3.5 py-1.5 text-xs font-bold text-stone-700 transition active:scale-95">
                  Decline
                </button>
              </PersonRow>
            ))}
          </ul>
        </>
      )}
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Your friends ({friends.length})</p>
      {friends.length === 0 ? (
        <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5">No friends yet. Open the Nearby tab, or tap a player in the city, and send a friend request.</p>
      ) : (
        <ul className="space-y-2">
          {sorted.map((p) => (
            <PersonRow key={p.pid} p={p}>
              <button onClick={() => void openThread(p.pid)} aria-label={`Message ${p.name}`} className={`${round} bg-stone-900 text-white`}>
                <MessageCircle className="size-4" />
              </button>
              <button onClick={() => callPlayer(p.pid, p.name)} aria-label={`Call ${p.name}`} className={`${round} bg-emerald-600 text-white`}>
                <PhoneCall className="size-4" />
              </button>
              {homeOf(p.pid) && (
                <button onClick={() => visitHome(p.pid, p.name)} aria-label={`Visit ${p.name}'s home`} title="Visit their home" className={`${round} bg-amber-500 text-white`}>
                  <House className="size-4" />
                </button>
              )}
              <button
                onClick={() => {
                  if (confirm(`Remove ${p.name} from your friends?`)) void removeFriend(p.pid);
                }}
                aria-label={`Remove ${p.name}`}
                className={`${round} bg-white text-stone-500 ring-1 ring-black/10 hover:text-rose-600`}
              >
                <UserMinus className="size-4" />
              </button>
            </PersonRow>
          ))}
        </ul>
      )}
      {reqOut.length > 0 && (
        <>
          <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-stone-400">Waiting for a reply</p>
          <ul className="space-y-2">
            {reqOut.map((p) => (
              <PersonRow key={p.pid} p={p}>
                <span className="text-xs font-semibold text-stone-400">Pending</span>
              </PersonRow>
            ))}
          </ul>
        </>
      )}
      {blocked.length > 0 && (
        <button onClick={() => blocked.forEach((b) => void unblockPlayer(b))} className="mt-5 w-full rounded-2xl bg-stone-50 px-4 py-3 text-left text-sm text-stone-600 ring-1 ring-black/5">
          {blocked.length} blocked player{blocked.length > 1 ? "s" : ""}. <b className="text-stone-800">Unblock all</b>
        </button>
      )}
      <button
        onClick={() => {
          navigator.clipboard?.writeText(location.origin + "/play").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          });
        }}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition active:scale-95"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} {copied ? "Link copied" : "Invite friends to Omo'badan"}
      </button>
    </>
  );
}

function NearbyPanel() {
  const remotes = useGame((s) => s.remotes);
  const friends = useGame((s) => s.friends);
  const out = useGame((s) => s.requestsOut);
  const online = Object.values(remotes);
  return (
    <>
      <p className="mb-3 text-xs text-stone-500">Everyone online in the city right now. Tap a player in the world to see their profile card.</p>
      {online.length === 0 && <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5">No one else is online right now.</p>}
      <ul className="space-y-2">
        {online.map((r) => {
          const isFriend = friends.some((f) => f.pid === r.pid);
          const sent = out.some((o) => o.pid === r.pid);
          return (
            <PersonRow key={r.id} p={{ pid: r.pid, name: r.name, look: null, online: true }}>
              <span className="mr-1 hidden text-[11px] text-stone-400 sm:inline">{r.room === "streets" ? "Out and about" : r.room.replace(/-/g, " ")}</span>
              {isFriend ? (
                <button onClick={() => void openThread(r.pid)} aria-label={`Message ${r.name}`} className={`${round} bg-stone-900 text-white`}>
                  <MessageCircle className="size-4" />
                </button>
              ) : (
                <button
                  disabled={sent}
                  onClick={() => void friendRequest(r.pid).then((m) => useGame.getState().toast(m, "info"))}
                  className="flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition active:scale-95 disabled:bg-stone-300"
                >
                  <UserPlus className="size-3.5" /> {sent ? "Sent" : "Add"}
                </button>
              )}
              <button onClick={() => net.call(r.id, r.name)} aria-label={`Call ${r.name}`} className={`${round} bg-emerald-600 text-white`}>
                <PhoneCall className="size-4" />
              </button>
            </PersonRow>
          );
        })}
      </ul>
    </>
  );
}

type Tab = "chats" | "friends" | "nearby";

/** The Friends tab: chats, friends and requests, people nearby, and the people of Ibadan you've met. */
export default function FriendsTabs() {
  const [tab, setTab] = useState<Tab>("chats");
  const unread = useGame((s) => s.threads.reduce((n, t) => n + t.unread, 0));
  const reqs = useGame((s) => s.requestsIn.length);
  const open = useGame((s) => s.openChat);
  // a message to open from anywhere (a friend row, a profile card) always lands on the chat itself
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setTab("chats");
  }, [open]);
  const tabs: [Tab, string, number][] = [
    ["chats", "Chats", unread],
    ["friends", "Friends", reqs],
    ["nearby", "Nearby", 0],
  ];
  return (
    <>
      {!(tab === "chats" && open) && (
        <div className="mb-4 grid grid-cols-4 gap-1.5 rounded-2xl bg-stone-100 p-1">
          {tabs.map(([id, label, n]) => (
            <button key={id} onClick={() => setTab(id)} className={`relative rounded-xl py-2 text-xs font-bold transition active:scale-95 ${tab === id ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`}>
              {label}
              {n > 0 && <span className="absolute -right-0.5 -top-1 grid min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[9px] font-bold leading-4 text-white">{n}</span>}
            </button>
          ))}
        </div>
      )}
      {tab === "chats" && <ChatsPanel />}
      {tab === "friends" && <FriendsPanel />}
      {tab === "nearby" && <NearbyPanel />}
    </>
  );
}

export { blockPlayer };
