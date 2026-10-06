import type { IncomingMessage, ServerResponse } from "node:http";
import { cleanChat } from "../../src/lib/moderation";
import { addBlock, addDm, acceptFriend, blockedEither, blocksOf, countFriends, dmThread, dmThreads, friendshipsOf, getDm, getFriendship, getPlayer, markRead, removeBlock, removeFriendship, requestFriend } from "../db/repo";
import { isOnline, sendToPid } from "../presence";
import { verifyToken } from "./auth";

const clean = (s: unknown, max: number) => String(s ?? "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, max);
const PID = /^[a-zA-Z0-9]{8,40}$/;
const lastDm = new Map<string, number>();

async function readJson(req: IncomingMessage): Promise<Record<string, unknown> | null> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const c of req) {
    size += (c as Buffer).length;
    if (size > 8 * 1024) return null;
    chunks.push(c as Buffer);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    return null;
  }
}

const look = (pid: string) => {
  const p = getPlayer(pid);
  return p ? { pid: p.pid, name: p.name, look: p.profile_json ? JSON.parse(p.profile_json) : null } : null;
};

export type DmOut = { id: number; from: string; to: string; text: string; at: number };

/** Used by both the REST route and the websocket. Only friends can message each other, and blocks are respected. */
export function sendDm(from: string, to: string, rawText: unknown): { ok: true; msg: DmOut } | { ok: false; error: string } {
  const text = cleanChat(clean(rawText, 400));
  if (!text) return { ok: false, error: "Write something first." };
  if (!PID.test(to) || !getPlayer(to)) return { ok: false, error: "That player does not exist." };
  const now = Date.now();
  if (now - (lastDm.get(from) ?? 0) < 400) return { ok: false, error: "Slow down a little." };
  lastDm.set(from, now);
  if (blockedEither(from, to)) return { ok: false, error: "You can't message this player." };
  const f = getFriendship(from, to);
  if (f?.status !== "accepted") return { ok: false, error: "You can only message your friends." };
  const id = addDm(from, to, text, now);
  const msg: DmOut = { id, from, to, text, at: now };
  const data = { t: "dm" as const, ...msg, fromName: getPlayer(from)?.name ?? "" };
  sendToPid(to, data);
  sendToPid(from, data);
  return { ok: true, msg };
}

export async function handleSocial(req: IncomingMessage, res: ServerResponse, url: URL): Promise<boolean> {
  const path = url.pathname;
  if (!/^\/api\/(friends|blocks|dm|players)/.test(path)) return false;
  const send = (status: number, json: unknown) => void res.writeHead(status, { "content-type": "application/json" }).end(JSON.stringify(json));
  const me = verifyToken(req.headers.authorization?.replace(/^Bearer /i, ""));
  if (!me) return send(401, { error: "unauthorised" }), true;
  const parts = path.split("/").filter(Boolean);
  const body = req.method === "POST" || req.method === "PUT" ? await readJson(req) : null;
  if ((req.method === "POST" || req.method === "PUT") && !body) return send(400, { error: "bad json" }), true;

  // ---------------- friends
  if (req.method === "GET" && path === "/api/friends") {
    const friends: unknown[] = [];
    const incoming: unknown[] = [];
    const outgoing: unknown[] = [];
    for (const f of friendshipsOf(me)) {
      const other = f.a === me ? f.b : f.a;
      const info = look(other);
      if (!info) continue;
      if (f.status === "accepted") friends.push({ ...info, online: isOnline(other) });
      else if (f.requester === me) outgoing.push(info);
      else incoming.push(info);
    }
    return send(200, { friends, incoming, outgoing, blocked: blocksOf(me) }), true;
  }
  if (req.method === "POST" && path === "/api/friends/request") {
    const to = String(body!.to ?? "");
    if (!PID.test(to) || to === me || !getPlayer(to)) return send(404, { error: "Player not found." }), true;
    if (blockedEither(me, to)) return send(403, { error: "You can't send this request." }), true;
    if (countFriends(me) >= 200) return send(400, { error: "Your friends list is full." }), true;
    const f = getFriendship(me, to);
    if (f?.status === "accepted") return send(200, { status: "friends" }), true;
    if (f && f.requester !== me) {
      // they already asked you: that makes you friends
      acceptFriend(me, to);
      sendToPid(to, { t: "friendEvent", kind: "accepted", pid: me, name: getPlayer(me)?.name ?? "" });
      return send(200, { status: "friends" }), true;
    }
    if (!f) requestFriend(me, to);
    sendToPid(to, { t: "friendEvent", kind: "request", pid: me, name: getPlayer(me)?.name ?? "" });
    return send(200, { status: "pending" }), true;
  }
  if (req.method === "POST" && path === "/api/friends/respond") {
    const other = String(body!.pid ?? "");
    const f = PID.test(other) ? getFriendship(me, other) : undefined;
    if (!f || f.status !== "pending" || f.requester === me) return send(404, { error: "No such request." }), true;
    if (body!.accept === true) {
      acceptFriend(me, other);
      sendToPid(other, { t: "friendEvent", kind: "accepted", pid: me, name: getPlayer(me)?.name ?? "" });
    } else removeFriendship(me, other);
    return send(200, { ok: true }), true;
  }
  if (req.method === "DELETE" && parts[1] === "friends" && parts.length === 3) {
    removeFriendship(me, parts[2]);
    sendToPid(parts[2], { t: "friendEvent", kind: "removed", pid: me, name: "" });
    return send(200, { ok: true }), true;
  }

  // ---------------- blocks
  if (path === "/api/blocks") {
    if (req.method === "GET") return send(200, { blocked: blocksOf(me) }), true;
    if (req.method === "POST") {
      const other = String(body!.pid ?? "");
      if (!PID.test(other) || other === me || !getPlayer(other)) return send(404, { error: "Player not found." }), true;
      addBlock(me, other);
      removeFriendship(me, other);
      return send(200, { ok: true }), true;
    }
  }
  if (req.method === "DELETE" && parts[1] === "blocks" && parts.length === 3) {
    removeBlock(me, parts[2]);
    return send(200, { ok: true }), true;
  }

  // ---------------- direct messages
  if (req.method === "GET" && path === "/api/dm/threads") {
    const threads = dmThreads(me).flatMap((t) => {
      const info = look(t.other);
      const last = getDm(t.last_id);
      return info && last ? [{ ...info, unread: t.unread, last: { text: last.text, at: last.at, mine: last.from_pid === me }, online: isOnline(t.other) }] : [];
    });
    return send(200, { threads }), true;
  }
  if (parts[1] === "dm" && parts.length === 3 && PID.test(parts[2])) {
    const other = parts[2];
    if (req.method === "GET") {
      const f = getFriendship(me, other);
      if (f?.status !== "accepted") return send(403, { error: "You can only see chats with friends." }), true;
      const before = Number(url.searchParams.get("before")) || Number.MAX_SAFE_INTEGER;
      const messages = dmThread(me, other, before).map((m) => ({ id: m.id, from: m.from_pid, to: m.to_pid, text: m.text, at: m.at }));
      markRead(me, other);
      return send(200, { messages }), true;
    }
    if (req.method === "POST") {
      const r = sendDm(me, other, body!.text);
      return send(r.ok ? 200 : 400, r.ok ? r.msg : { error: r.error }), true;
    }
  }

  // ---------------- public profile card
  if (req.method === "GET" && parts[1] === "players" && parts.length === 3 && PID.test(parts[2])) {
    const info = look(parts[2]);
    if (!info) return send(404, { error: "not found" }), true;
    const f = getFriendship(me, parts[2]);
    return send(200, { ...info, online: isOnline(parts[2]), friendship: f ? (f.status === "accepted" ? "friends" : f.requester === me ? "sent" : "received") : "none", blocked: blocksOf(me).includes(parts[2]) }), true;
  }
  return send(404, { error: "not found" }), true;
}
