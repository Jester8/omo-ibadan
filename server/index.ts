/**
 * Omo Ibadan realtime server.
 * Presence + chat + shared land ownership + WebRTC voice signalling.
 * Run: npm run server   (defaults to ws://localhost:8787)
 *
 * NOTE: money/needs are still client-side (trusted). Move them server-side before a public launch.
 */
import { WebSocketServer, WebSocket } from "ws";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import { appendFileSync } from "node:fs";
import { cleanChat } from "../src/lib/moderation";
import type { C2S, Election, PeerInfo, PlotState, Policy, S2C } from "../src/lib/protocol";

const PORT = Number(process.env.PORT ?? 8787);
const PLOTS_FILE = join(__dirname, "plots.json");
const REPORTS_FILE = join(__dirname, "reports.log");

type Client = { ws: WebSocket; info: PeerInfo; moved: boolean; speed: number; voiceRoom: string | null; lastChat: number };

const clients = new Map<string, Client>();
const voiceRooms = new Map<string, Set<string>>();
const plots: Record<string, PlotState> = existsSync(PLOTS_FILE) ? JSON.parse(readFileSync(PLOTS_FILE, "utf8")) : {};
let saveTimer: ReturnType<typeof setTimeout> | null = null;

const savePlots = () => {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    writeFileSync(PLOTS_FILE, JSON.stringify(plots));
  }, 800);
};

const tx = (ws: WebSocket, m: S2C) => ws.readyState === WebSocket.OPEN && ws.send(JSON.stringify(m));
const broadcast = (m: S2C, except?: string) => {
  const data = JSON.stringify(m);
  for (const [id, c] of clients) if (id !== except && c.ws.readyState === WebSocket.OPEN) c.ws.send(data);
};

const clean = (s: unknown, max: number) => String(s ?? "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, max);
const num = (n: unknown, fallback = 0) => (typeof n === "number" && Number.isFinite(n) ? n : fallback);

function leaveVoice(c: Client) {
  if (!c.voiceRoom) return;
  const room = voiceRooms.get(c.voiceRoom);
  room?.delete(c.info.id);
  if (room) {
    for (const id of room) {
      const peer = clients.get(id);
      if (peer) tx(peer.ws, { t: "voicePeerLeft", id: c.info.id });
    }
    if (room.size === 0) voiceRooms.delete(c.voiceRoom);
  }
  c.voiceRoom = null;
}

/* ------------------------------- governor election ------------------------------- */
const TERM_MS = 20 * 60 * 1000;
const POLICIES: Policy[] = ["none", "transport", "food", "wages"];
let term = 1;
let endsAt = Date.now() + TERM_MS;
let governor: Election["governor"] = null;
const candidates = new Map<string, { name: string; slogan: string }>();
const votes = new Map<string, string>(); // voter pid -> candidate pid

const snapshot = (): Election => ({
  term,
  endsAt,
  governor,
  candidates: [...candidates.entries()].map(([pid, c]) => ({ pid, ...c, votes: [...votes.values()].filter((v) => v === pid).length })),
});
function pushElection() {
  const e = snapshot();
  for (const c of clients.values()) tx(c.ws, { t: "election", e, myVote: votes.get(c.info.pid) ?? null });
}
setInterval(() => {
  if (Date.now() < endsAt) return;
  const e = snapshot();
  const win = [...e.candidates].sort((a, b) => b.votes - a.votes)[0];
  if (win && win.votes > 0) governor = { pid: win.pid, name: win.name, slogan: win.slogan, policy: "none" };
  term++;
  endsAt = Date.now() + TERM_MS;
  candidates.clear();
  votes.clear();
  pushElection();
}, 3000);

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  const id = randomUUID().slice(0, 8);
  let client: Client | null = null;

  ws.on("message", (raw) => {
    let m: C2S;
    try {
      m = JSON.parse(String(raw));
    } catch {
      return;
    }

    if (m.t === "hello") {
      const info: PeerInfo = {
        id,
        pid: clean(m.pid, 40),
        name: clean(m.name, 16) || "Guest",
        look: m.look,
        room: client?.info.room ?? "streets",
        x: client?.info.x ?? 0.5,
        z: client?.info.z ?? 8.2,
        ry: 0,
      };
      if (!client) {
        client = { ws, info, moved: false, speed: 0, voiceRoom: null, lastChat: 0 };
        clients.set(id, client);
        tx(ws, { t: "welcome", id, peers: [...clients.values()].filter((c) => c.info.id !== id).map((c) => c.info), plots });
        tx(ws, { t: "election", e: snapshot(), myVote: votes.get(info.pid) ?? null });
      } else {
        client.info = { ...client.info, name: info.name, look: info.look };
      }
      broadcast({ t: "join", peer: client.info }, id);
      broadcast({ t: "online", n: clients.size });
      tx(ws, { t: "online", n: clients.size });
      return;
    }
    if (!client) return;
    const c = client;

    switch (m.t) {
      case "move":
        c.info.x = num(m.x);
        c.info.z = num(m.z);
        c.info.ry = num(m.ry);
        c.speed = num(m.s);
        c.moved = true;
        break;
      case "room":
        c.info.room = clean(m.room, 40) || "streets";
        broadcast({ t: "join", peer: c.info }, id);
        break;
      case "chat": {
        const now = Date.now();
        const text = cleanChat(clean(m.text, 200));
        if (!text || now - c.lastChat < 400) return;
        c.lastChat = now;
        const msg: S2C = { t: "chat", id, name: c.info.name, room: c.info.room, text, at: now };
        for (const other of clients.values()) if (other.info.room === c.info.room) tx(other.ws, msg);
        break;
      }
      case "plotSet": {
        const existing = plots[m.plotId];
        if (existing && existing.ownerId !== c.info.pid) {
          tx(ws, { t: "reject", plotId: m.plotId });
          tx(ws, { t: "plots", plots });
          return;
        }
        if (!m.plot || m.plot.ownerId !== c.info.pid) return;
        const plot: PlotState = {
          ownerId: c.info.pid,
          ownerName: clean(m.plot.ownerName, 16),
          tier: Math.max(0, Math.min(3, Math.floor(num(m.plot.tier)))),
          collectedAt: num(m.plot.collectedAt, Date.now()),
        };
        plots[m.plotId] = plot;
        savePlots();
        broadcast({ t: "plot", plotId: m.plotId, plot });
        break;
      }
      case "voiceJoin": {
        leaveVoice(c);
        const room = clean(m.room, 80);
        if (!room) return;
        const set = voiceRooms.get(room) ?? new Set<string>();
        if (set.size >= 8) return;
        tx(ws, { t: "voiceMembers", room, ids: [...set] });
        for (const peerId of set) {
          const peer = clients.get(peerId);
          if (peer) tx(peer.ws, { t: "voicePeerJoined", room, id });
        }
        set.add(id);
        voiceRooms.set(room, set);
        c.voiceRoom = room;
        break;
      }
      case "voiceLeave":
        leaveVoice(c);
        break;
      case "signal": {
        const target = clients.get(m.to);
        // only relay between people in the same voice room
        if (target && c.voiceRoom && target.voiceRoom === c.voiceRoom) tx(target.ws, { t: "signal", from: id, data: m.data });
        break;
      }
      case "call": {
        const target = clients.get(m.to);
        if (target) tx(target.ws, { t: "incomingCall", from: id, name: c.info.name });
        else tx(ws, { t: "callReply", from: m.to, accept: false });
        break;
      }
      case "callReply": {
        const target = clients.get(m.to);
        if (target) tx(target.ws, { t: "callReply", from: id, accept: !!m.accept });
        break;
      }
      case "report": {
        const target = clients.get(m.id);
        const line = `${new Date().toISOString()} reporter=${c.info.pid}(${c.info.name}) target=${target ? `${target.info.pid}(${target.info.name})` : m.id} reason=${clean(m.reason, 120)}\n`;
        appendFileSync(REPORTS_FILE, line);
        break;
      }
      case "run": {
        if (!c.info.pid || candidates.size >= 8) break;
        candidates.set(c.info.pid, { name: c.info.name, slogan: clean(m.slogan, 60) || "Good Ibadan ahead" });
        pushElection();
        break;
      }
      case "vote": {
        if (!candidates.has(m.pid)) break;
        votes.set(c.info.pid, m.pid);
        pushElection();
        break;
      }
      case "policy": {
        if (governor?.pid === c.info.pid && POLICIES.includes(m.policy)) {
          governor = { ...governor, policy: m.policy };
          pushElection();
        }
        break;
      }
      case "emote": {
        if (m.e !== "wave" && m.e !== "dance") break;
        const msg: S2C = { t: "emote", id, e: m.e };
        for (const other of clients.values()) if (other.info.room === c.info.room && other.info.id !== id) tx(other.ws, msg);
        break;
      }
      case "hangup": {
        const target = clients.get(m.to);
        if (target) tx(target.ws, { t: "hangup", from: id });
        break;
      }
    }
  });

  ws.on("close", () => {
    const c = clients.get(id);
    if (!c) return;
    leaveVoice(c);
    clients.delete(id);
    broadcast({ t: "leave", id });
    broadcast({ t: "online", n: clients.size });
  });
});

// 10 Hz movement snapshots
setInterval(() => {
  const m: [string, number, number, number, number][] = [];
  for (const c of clients.values()) {
    if (!c.moved) continue;
    c.moved = false;
    m.push([c.info.id, c.info.x, c.info.z, c.info.ry, c.speed]);
  }
  if (m.length) broadcast({ t: "moves", m });
}, 100);

console.log(`Omo Ibadan server listening on ws://localhost:${PORT}`);
