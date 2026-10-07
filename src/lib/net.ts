import type { C2S, PeerInfo, S2C } from "./protocol";
import { hooks, useGame } from "./store";
import { emotes, remoteMotion, remoteSits } from "./playerState";
import { audio } from "./audio";
import { rideById } from "./cars";
import { loadSocial, openThread } from "./social";
import { currentToken, ensureToken, pullState, pushState, signOut } from "./api";
import type { Policy } from "./protocol";
import { voice } from "./voice";
import { cleanChat } from "./moderation";
import { interiorKey, type InteriorRef } from "./interiors";
import { usePhotos } from "./photos";

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
      remoteSits.delete(m.id);
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
    case "history": {
      // recent chat from before you arrived, shown once per room
      if (s.chat.some((c) => c.room === m.room)) break;
      for (const h of m.messages) s.addChat({ room: m.room, from: h.name, text: h.text, at: h.at, self: h.pid === s.profile?.id, fromPid: h.pid });
      break;
    }
    case "dm": {
      const me = s.profile?.id;
      const other = m.from === me ? m.to : m.from;
      const msg = { id: m.id, from: m.from, to: m.to, text: m.text, at: m.at };
      const reading = s.openChat === other && s.sheet === "friends";
      useGame.setState((st) => {
        // my own message coming back from the server replaces the copy I showed instantly
        const list = st.dms[other] ?? [];
        const pending = m.from === me ? list.findIndex((x) => x.id < 0 && x.text === m.text) : -1;
        const nextList = pending >= 0 ? list.map((x, i) => (i === pending ? msg : x)) : [...list, msg];
        return { dms: { ...st.dms, [other]: nextList } };
      });
      useGame.setState((st) => ({
        threads: st.threads.some((t) => t.pid === other)
          ? st.threads.map((t) => (t.pid === other ? { ...t, last: { text: m.text, at: m.at, mine: m.from === me }, unread: m.from === me || reading ? t.unread : t.unread + 1 } : t))
          : st.threads,
      }));
      if (m.from !== me) {
        if (reading) void openThread(other);
        else {
          if (!s.threads.some((t) => t.pid === other)) void loadSocial();
          s.toast(`${m.fromName}: ${m.text.slice(0, 60)}`, "info");
          audio.pop();
        }
      }
      break;
    }
    case "dmError":
      // take back the messages that were shown but never delivered
      useGame.setState((st) => ({ dms: Object.fromEntries(Object.entries(st.dms).map(([k, v]) => [k, v.filter((x) => x.id >= 0)])) }));
      s.toast(m.error, "bad");
      break;
    case "friendEvent":
      void loadSocial();
      if (m.kind === "request") s.toast(`${m.name} sent you a friend request`, "info");
      if (m.kind === "accepted") s.toast(`${m.name} is now your friend`, "good");
      break;
    case "presence":
      useGame.setState((st) => ({ friends: st.friends.map((f) => (f.pid === m.pid ? { ...f, online: m.online } : f)), threads: st.threads.map((t) => (t.pid === m.pid ? { ...t, online: m.online } : t)) }));
      break;
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
    case "photo": {
      const pid = Object.values(s.remotes).find((r) => r.name === m.name)?.pid;
      if (pid && s.muted.includes(pid)) break;
      usePhotos.getState().add({ id: m.photoId, name: m.name, data: m.data, at: Date.now() });
      audio.pop();
      break;
    }
    case "sit":
      if (m.u) remoteSits.set(m.id, m.u);
      else remoteSits.delete(m.id);
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
      else {
        // rings the moment it arrives, and stops by itself if nobody picks up
        useGame.setState({ incoming: { from: m.from, name: m.name } });
        if (missedTimer) clearTimeout(missedTimer);
        missedTimer = setTimeout(() => {
          if (useGame.getState().incoming?.from === m.from) {
            useGame.setState({ incoming: null });
            useGame.getState().toast(`Missed call from ${m.name}`, "info");
          }
        }, 32_000);
      }
      break;
    case "callReply":
      clearCallTimer();
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

let callTimer: ReturnType<typeof setTimeout> | null = null;
let missedTimer: ReturnType<typeof setTimeout> | null = null;
const clearCallTimer = () => {
  if (callTimer) clearTimeout(callTimer);
  callTimer = null;
};

function endCallLocal() {
  clearCallTimer();
  voice.leave();
  useGame.setState({ call: { phase: "idle", peerId: null, peerName: "", room: null } });
}

let connecting = false;

function connect() {
  const { profile } = useGame.getState();
  if (!profile || ws || connecting) return;
  want = true;
  connecting = true;
  useGame.setState({ net: "connecting" });
  // fetch the guest token first so the server can verify who we are
  void ensureToken().finally(() => {
    connecting = false;
    if (want && !ws) openSocket();
  });
}

let autosave: ReturnType<typeof setInterval> | null = null;

function openSocket() {
  const { profile } = useGame.getState();
  if (!profile) return;
  try {
    ws = new WebSocket(wsUrl());
  } catch {
    ws = null;
    return;
  }
  ws.onopen = () => {
    retry = 0;
    send({ t: "hello", pid: profile.id, name: profile.name, look: profile.look, token: currentToken() ?? undefined });
    sendCar();
    void pullState().then(() => pushState());
    void loadSocial();
    if (autosave) clearInterval(autosave);
    autosave = setInterval(() => void pushState(), 30_000);
  };
  ws.onmessage = (e) => {
    try {
      handle(JSON.parse(String(e.data)) as S2C);
    } catch {
      /* ignore malformed frames */
    }
  };
  ws.onerror = () => ws?.close();
  ws.onclose = (ev) => {
    ws = null;
    if (ev.code === 4401) {
      want = false;
      useGame.getState().toast("Your session has ended. Please log in again.", "bad");
      setTimeout(() => void signOut(), 1500);
    }
    if (autosave) clearInterval(autosave);
    remoteMotion.clear();
    if (useGame.getState().call.phase !== "idle") endCallLocal();
    else voice.leave();
    useGame.setState({ net: "offline", connId: null, remotes: {}, online: 0, incoming: null });
    if (want) {
      timer = setTimeout(connect, Math.min(10000, 1000 * 2 ** retry++));
    }
  };
}

/** Tell everyone which car (if any) we are driving. */
function sendCar() {
  const s = useGame.getState();
  const hired = s.ride ? rideById(s.ride) : undefined;
  send({ t: "car", car: s.driving && s.activeCar ? { id: s.activeCar, color: s.carColors[s.activeCar] ?? "#cccccc" } : hired ? { id: hired.id, color: hired.color } : null });
}
let lastCar = "";
useGame.subscribe((s) => {
  const key = `${s.ride}|${s.driving}|${s.activeCar}|${s.activeCar ? s.carColors[s.activeCar] : ""}`;
  if (key === lastCar) return;
  lastCar = key;
  if (ws?.readyState === WebSocket.OPEN) sendCar();
});

export const net = {
  connect,
  disconnect() {
    want = false;
    if (timer) clearTimeout(timer);
    ws?.close();
    ws = null;
  },
  /** Send a message: it shows in the chat at once, and the server's copy replaces it a moment later. */
  dm(to: string, text: string) {
    const s = useGame.getState();
    const me = s.profile?.id;
    const clean = text.trim().slice(0, 400);
    if (!me || !clean) return;
    if (s.net !== "online") {
      s.toast("You are offline. Your message was not sent.", "bad");
      return;
    }
    const at = Date.now();
    useGame.setState((st) => ({
      dms: { ...st.dms, [to]: [...(st.dms[to] ?? []), { id: -at, from: me, to, text: clean, at }] },
      threads: st.threads.map((t) => (t.pid === to ? { ...t, last: { text: clean, at, mine: true } } : t)),
    }));
    send({ t: "dm", to, text: clean });
  },
  /** Tell the room you sat down (or stood up, with null). */
  sit(u: { pose: "sit" | "lie"; x: number; z: number; ry: number; seatH: number } | null) {
    send({ t: "sit", u: u ? { pose: u.pose, x: u.x, z: u.z, ry: u.ry, seatH: u.seatH } : null });
  },
  /** Send a view-once photo to everyone on the call or in the voice room with you. */
  photo(data: string) {
    send({ t: "photo", data });
  },
  /** Re-announce name/look after the avatar is edited. */
  hello() {
    const { profile } = useGame.getState();
    if (profile) send({ t: "hello", pid: profile.id, name: profile.name, look: profile.look, token: currentToken() ?? undefined });
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
    // nobody answered: stop ringing them and say so
    clearCallTimer();
    callTimer = setTimeout(() => {
      const c = useGame.getState().call;
      if (c.phase === "calling" && c.peerId === to) {
        send({ t: "hangup", to });
        useGame.getState().toast(`${name} did not pick up.`, "info");
        endCallLocal();
      }
    }, 30_000);
  },
  answer(accept: boolean) {
    const s = useGame.getState();
    const inc = s.incoming;
    if (!inc) return;
    send({ t: "callReply", to: inc.from, accept });
    if (missedTimer) clearTimeout(missedTimer);
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
