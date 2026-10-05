import type { C2S, PeerInfo, S2C } from "./protocol";
import { hooks, useGame } from "./store";
import { emotes, remoteMotion } from "./playerState";
import { audio } from "./audio";
import type { Policy } from "./protocol";
import { voice } from "./voice";
import { cleanChat } from "./moderation";
import { interiorKey, type InteriorRef } from "./interiors";

let ws: WebSocket | null = null;
let want = false;
let retry = 0;
let timer: ReturnType<typeof setTimeout> | null = null;

const wsUrl = () =>
  process.env.NEXT_PUBLIC_WS_URL || `${location.protocol === "https:" ? "wss" : "ws"}://${location.hostname}:8787`;

function send(m: C2S) {
  if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify(m));
}

voice.init(send);
hooks.plotSet = (plotId, plot) => send({ t: "plotSet", plotId, plot });

export const roomOf = (atPlace: string | null, interior?: InteriorRef | null) => (interior ? interiorKey(interior) : (atPlace ?? "streets"));
export const callRoom = (a: string, b: string) => `call:${[a, b].sort().join(":")}`;

function upsert(p: PeerInfo) {
  const s = useGame.getState();
  if (p.id === s.connId) return;
  useGame.setState({ remotes: { ...s.remotes, [p.id]: p } });
  if (!remoteMotion.has(p.id)) remoteMotion.set(p.id, { x: p.x, z: p.z, ry: p.ry, speed: 0, tx: p.x, tz: p.z, tr: p.ry });
}

function handle(m: S2C) {
  const s = useGame.getState();
  switch (m.t) {
    case "welcome": {
      useGame.setState({ connId: m.id, net: "online" });
      const mine = Object.entries(s.plots).filter(([id, p]) => p.ownerId === s.profile?.id && !m.plots[id]);
      useGame.getState().setPlots(m.plots);
      for (const [id, p] of mine) {
        useGame.getState().setPlot(id, p);
        send({ t: "plotSet", plotId: id, plot: p });
      }
      remoteMotion.clear();
      useGame.setState({ remotes: {} });
      m.peers.forEach(upsert);
      send({ t: "room", room: roomOf(useGame.getState().atPlace, useGame.getState().interior) });
      break;
    }
    case "join":
      upsert(m.peer);
      break;
    case "leave": {
      const next = { ...s.remotes };
      delete next[m.id];
      remoteMotion.delete(m.id);
      useGame.setState({ remotes: next });
      voice.peerLeft(m.id);
      if (s.call.peerId === m.id) endCallLocal();
      break;
    }
    case "moves":
      for (const [id, x, z, ry, sp] of m.m) {
        const r = remoteMotion.get(id);
        if (r) {
          r.tx = x;
          r.tz = z;
          r.tr = ry;
          r.speed = sp;
        }
      }
      break;
    case "chat": {
      const self = m.id === s.connId;
      const pid = s.remotes[m.id]?.pid;
      if (!self && pid && s.muted.includes(pid)) break;
      s.addChat({ room: m.room, from: m.name, text: m.text, at: m.at, self, fromId: m.id, fromPid: pid }, self ? "me" : m.id);
      break;
    }
    case "plots":
      s.setPlots(m.plots);
      break;
    case "plot":
      s.setPlot(m.plotId, m.plot);
      break;
    case "reject":
      break; // the server follows up with the authoritative `plots` snapshot
    case "online":
      useGame.setState({ online: m.n });
      break;
    case "election":
      useGame.setState({ election: m.e, myVote: m.myVote });
      break;
    case "emote":
      emotes.set(m.id, { e: m.e, until: Date.now() + (m.e === "wave" ? 2200 : 6000) });
      break;
    case "voiceMembers":
      voice.members(m.room, m.ids);
      break;
    case "voicePeerJoined":
      voice.peerJoined(m.room, m.id);
      break;
    case "voicePeerLeft":
      voice.peerLeft(m.id);
      break;
    case "signal":
      void voice.signal(m.from, m.data);
      break;
    case "incomingCall":
      if (s.call.phase !== "idle" || s.incoming) send({ t: "callReply", to: m.from, accept: false });
      else useGame.setState({ incoming: { from: m.from, name: m.name } });
      break;
    case "callReply":
      if (m.accept && s.call.phase === "calling" && s.call.peerId === m.from) {
        const room = callRoom(s.connId ?? "", m.from);
        useGame.setState({ call: { ...s.call, phase: "live", room } });
        s.recordStat("calls");
        void joinCallVoice(room);
      } else {
        s.toast(`${s.call.peerName || "They"} can't talk right now.`, "info");
        endCallLocal();
      }
      break;
    case "hangup":
      if (s.call.peerId === m.from) {
        s.toast(`${s.call.peerName} ended the call.`, "info");
        endCallLocal();
      }
      if (s.incoming?.from === m.from) useGame.setState({ incoming: null });
      break;
  }
}

/** A call without a working microphone is pointless, so hang up if we can't start voice. */
async function joinCallVoice(room: string) {
  const ok = await voice.join(room);
  if (!ok && useGame.getState().call.room === room) net.hangup();
}

function endCallLocal() {
  voice.leave();
  useGame.setState({ call: { phase: "idle", peerId: null, peerName: "", room: null } });
}

function connect() {
  const { profile } = useGame.getState();
  if (!profile || ws) return;
  want = true;
  useGame.setState({ net: "connecting" });
  try {
    ws = new WebSocket(wsUrl());
  } catch {
    ws = null;
    return;
  }
  ws.onopen = () => {
    retry = 0;
    send({ t: "hello", pid: profile.id, name: profile.name, look: profile.look });
  };
  ws.onmessage = (e) => {
    try {
      handle(JSON.parse(String(e.data)) as S2C);
    } catch {
      /* ignore malformed frames */
    }
  };
  ws.onerror = () => ws?.close();
  ws.onclose = () => {
    ws = null;
    remoteMotion.clear();
    if (useGame.getState().call.phase !== "idle") endCallLocal();
    else voice.leave();
    useGame.setState({ net: "offline", connId: null, remotes: {}, online: 0, incoming: null });
    if (want) {
      timer = setTimeout(connect, Math.min(10000, 1000 * 2 ** retry++));
    }
  };
}

export const net = {
  connect,
  disconnect() {
    want = false;
    if (timer) clearTimeout(timer);
    ws?.close();
    ws = null;
  },
  /** Re-announce name/look after the avatar is edited. */
  hello() {
    const { profile } = useGame.getState();
    if (profile) send({ t: "hello", pid: profile.id, name: profile.name, look: profile.look });
  },
  move(x: number, z: number, ry: number, s: number) {
    send({ t: "move", x, z, ry, s });
  },
  room(room: string) {
    send({ t: "room", room });
  },
  chat(text: string) {
    const s = useGame.getState();
    const clean = cleanChat(text);
    if (!clean) return;
    s.recordStat("chats");
    const room = roomOf(s.atPlace, s.interior);
    if (s.net === "online") send({ t: "chat", text: clean });
    else s.addChat({ room, from: s.profile?.name ?? "me", text: clean, at: Date.now(), self: true }, "me");
  },
  call(to: string, name: string) {
    const s = useGame.getState();
    if (s.call.phase !== "idle") return;
    useGame.setState({ call: { phase: "calling", peerId: to, peerName: name, room: null } });
    send({ t: "call", to });
  },
  answer(accept: boolean) {
    const s = useGame.getState();
    const inc = s.incoming;
    if (!inc) return;
    send({ t: "callReply", to: inc.from, accept });
    useGame.setState({ incoming: null });
    if (accept) {
      const room = callRoom(s.connId ?? "", inc.from);
      useGame.setState({ call: { phase: "live", peerId: inc.from, peerName: inc.name, room } });
      s.recordStat("calls");
      void joinCallVoice(room);
    }
  },
  run(slogan: string) {
    send({ t: "run", slogan });
  },
  vote(pid: string) {
    send({ t: "vote", pid });
  },
  policy(policy: Policy) {
    send({ t: "policy", policy });
  },
  /** Wave or dance. Shown locally and to everyone in the same room. */
  emote(e: "wave" | "dance") {
    emotes.set("me", { e, until: Date.now() + (e === "wave" ? 2200 : 6000) });
    if (e === "wave") audio.wave();
    send({ t: "emote", e });
  },
  /** Flag a player to the moderators (logged server-side). */
  report(id: string, reason: string) {
    send({ t: "report", id, reason: reason.slice(0, 120) });
  },
  hangup() {
    const s = useGame.getState();
    if (s.call.peerId) send({ t: "hangup", to: s.call.peerId });
    endCallLocal();
  },
};
