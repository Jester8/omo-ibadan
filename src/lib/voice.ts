import type { C2S } from "./protocol";
import { useGame } from "./store";
import { Room, RoomEvent, Track } from "livekit-client";
import { getIce, getVoiceTicket } from "./api";

/**
 * Peer-to-peer voice using WebRTC, with the game server as the signalling channel.
 * A full mesh is fine for small rooms (a venue, a house party, a 1:1 call).
 * When the server has LiveKit configured, the same API runs through LiveKit Cloud instead (bigger rooms, fewer dropped calls).
 */

const ICE: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
};

type Peer = {
  pc: RTCPeerConnection;
  audio: HTMLAudioElement;
  pending: RTCIceCandidateInit[];
  analyser?: AnalyserNode;
};

class Voice {
  private send: (m: C2S) => void = () => {};
  room: string | null = null;
  private stream: MediaStream | null = null;
  private peers = new Map<string, Peer>();
  private ctx: AudioContext | null = null;
  private local: AnalyserNode | null = null;
  private poll: ReturnType<typeof setInterval> | null = null;
  private muted = false;
  /** set while this room runs on LiveKit instead of peer-to-peer */
  private lk: Room | null = null;
  private lkPeers = new Set<string>();
  private lkAudio = new Map<string, HTMLMediaElement[]>();

  init(send: (m: C2S) => void) {
    this.send = send;
  }

  private publish() {
    const prev = useGame.getState().voice;
    useGame.setState({ voice: { ...prev, room: this.room, muted: this.muted, peers: this.lk ? [...this.lkPeers] : [...this.peers.keys()] } });
  }

  private ice: RTCConfiguration = ICE;

  async join(room: string): Promise<boolean> {
    if (this.room === room) return true;
    this.ice = await getIce();
    if (this.room) this.leave();
    const connId = useGame.getState().connId;
    const ticket = connId ? await getVoiceTicket(room, connId) : null;
    if (ticket && (await this.joinLiveKit(room, ticket))) return true;
    if (!navigator.mediaDevices?.getUserMedia) {
      useGame.getState().toast("Voice needs a secure (https) page and a microphone.", "bad");
      return false;
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
    } catch {
      useGame.getState().toast("Microphone blocked. Allow it in your browser to talk.", "bad");
      return false;
    }
    this.room = room;
    this.muted = false;
    this.ctx = new AudioContext();
    this.local = this.analyse(this.stream);
    this.poll = setInterval(() => this.checkSpeaking(), 160);
    this.send({ t: "voiceJoin", room });
    this.publish();
    useGame.getState().recordStat("voiceJoins");
    return true;
  }

  private async joinLiveKit(room: string, ticket: { url: string; token: string }): Promise<boolean> {
    const lk = new Room({ adaptiveStream: true, dynacast: true });
    lk.on(RoomEvent.TrackSubscribed, (track, _pub, p) => {
      if (track.kind !== Track.Kind.Audio) return;
      const el = track.attach();
      el.style.display = "none";
      document.body.appendChild(el);
      this.lkAudio.set(p.identity, [...(this.lkAudio.get(p.identity) ?? []), el]);
    });
    lk.on(RoomEvent.TrackUnsubscribed, (track, _pub, p) => {
      track.detach().forEach((e) => e.remove());
      this.lkAudio.delete(p.identity);
    });
    lk.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
      const next: Record<string, boolean> = {};
      for (const s of speakers) next[s.isLocal ? "me" : s.identity] = true;
      const prev = useGame.getState().voice;
      useGame.setState({ voice: { ...prev, speaking: next } });
    });
    // a struggling connection is shown to the player rather than failing silently
    lk.on(RoomEvent.Reconnecting, () => useGame.setState({ voiceWeak: true }));
    lk.on(RoomEvent.Reconnected, () => useGame.setState({ voiceWeak: false }));
    lk.on(RoomEvent.ConnectionQualityChanged, (q, p) => {
      if (p.isLocal) useGame.setState({ voiceWeak: q === "poor" || q === "lost" });
    });
    lk.on(RoomEvent.Disconnected, () => {
      if (this.lk === lk) this.leave();
    });
    try {
      await lk.connect(ticket.url, ticket.token);
      await lk.localParticipant.setMicrophoneEnabled(true, { echoCancellation: true, noiseSuppression: true, autoGainControl: true });
    } catch {
      lk.disconnect();
      useGame.getState().toast("Microphone blocked or voice unavailable. Check your browser permission.", "bad");
      return false;
    }
    this.lk = lk;
    this.lkPeers.clear();
    this.room = room;
    this.muted = false;
    this.send({ t: "voiceJoin", room });
    this.publish();
    useGame.getState().recordStat("voiceJoins");
    return true;
  }

  leave() {
    if (!this.room && !this.stream) return;
    this.send({ t: "voiceLeave" });
    if (this.lk) {
      const lk = this.lk;
      this.lk = null;
      lk.disconnect();
      for (const els of this.lkAudio.values()) els.forEach((e) => e.remove());
      this.lkAudio.clear();
      this.lkPeers.clear();
      this.room = null;
      this.muted = false;
      useGame.setState({ voice: { room: null, muted: false, peers: [], speaking: {} }, voiceWeak: false });
      return;
    }
    for (const id of [...this.peers.keys()]) this.drop(id);
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    if (this.poll) clearInterval(this.poll);
    this.poll = null;
    this.ctx?.close().catch(() => {});
    this.ctx = null;
    this.local = null;
    this.room = null;
    this.muted = false;
    useGame.setState({ voice: { room: null, muted: false, peers: [], speaking: {} } });
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.lk) void this.lk.localParticipant.setMicrophoneEnabled(!m);
    this.stream?.getAudioTracks().forEach((t) => (t.enabled = !m));
    this.publish();
  }

  /** Server told us who is already in the room: we are the newcomer, so we make the offers. */
  members(room: string, ids: string[]) {
    if (room !== this.room) return;
    if (this.lk) {
      ids.forEach((id) => this.lkPeers.add(id));
      this.publish();
      return;
    }
    for (const id of ids) void this.connect(id, true);
  }

  peerJoined(room: string, id: string) {
    if (room !== this.room) return;
    if (this.lk) {
      this.lkPeers.add(id);
      this.publish();
      return;
    }
    void this.connect(id, false);
  }

  peerLeft(id: string) {
    if (this.lk) {
      this.lkPeers.delete(id);
      this.publish();
      return;
    }
    this.drop(id);
  }

  async signal(from: string, data: unknown) {
    if (!this.room || this.lk) return;
    const d = data as { sdp?: RTCSessionDescriptionInit; candidate?: RTCIceCandidateInit };
    let peer = this.peers.get(from);
    if (!peer) peer = await this.connect(from, false);
    if (!peer) return;
    const { pc } = peer;
    try {
      if (d.sdp) {
        await pc.setRemoteDescription(d.sdp);
        for (const c of peer.pending.splice(0)) await pc.addIceCandidate(c).catch(() => {});
        if (d.sdp.type === "offer") {
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          this.send({ t: "signal", to: from, data: { sdp: pc.localDescription } });
        }
      } else if (d.candidate) {
        if (pc.remoteDescription) await pc.addIceCandidate(d.candidate).catch(() => {});
        else peer.pending.push(d.candidate);
      }
    } catch {
      /* a failed negotiation just means that peer stays silent; the next join retries */
    }
  }

  private async connect(id: string, initiator: boolean): Promise<Peer | undefined> {
    if (this.peers.has(id) || !this.stream) return this.peers.get(id);
    const pc = new RTCPeerConnection(this.ice);
    const audio = new Audio();
    audio.autoplay = true;
    const peer: Peer = { pc, audio, pending: [] };
    this.peers.set(id, peer);
    this.stream.getTracks().forEach((t) => pc.addTrack(t, this.stream!));
    pc.onicecandidate = (e) => {
      if (e.candidate) this.send({ t: "signal", to: id, data: { candidate: e.candidate.toJSON() } });
    };
    pc.ontrack = (e) => {
      audio.srcObject = e.streams[0];
      audio.play().catch(() => {});
      peer.analyser = this.analyse(e.streams[0]) ?? undefined;
    };
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "failed" || pc.connectionState === "closed") this.drop(id);
    };
    this.publish();
    if (initiator) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      this.send({ t: "signal", to: id, data: { sdp: pc.localDescription } });
    }
    return peer;
  }

  private drop(id: string) {
    const p = this.peers.get(id);
    if (!p) return;
    p.pc.close();
    p.audio.srcObject = null;
    this.peers.delete(id);
    if (this.room) this.publish();
  }

  private analyse(stream: MediaStream): AnalyserNode | null {
    if (!this.ctx) return null;
    const src = this.ctx.createMediaStreamSource(stream);
    const an = this.ctx.createAnalyser();
    an.fftSize = 256;
    src.connect(an);
    return an;
  }

  private level(an: AnalyserNode | null | undefined) {
    if (!an) return 0;
    const buf = new Uint8Array(an.fftSize);
    an.getByteTimeDomainData(buf);
    let sum = 0;
    for (const v of buf) sum += ((v - 128) / 128) ** 2;
    return Math.sqrt(sum / buf.length);
  }

  private checkSpeaking() {
    const next: Record<string, boolean> = {};
    if (!this.muted && this.level(this.local) > 0.03) next.me = true;
    for (const [id, p] of this.peers) if (this.level(p.analyser) > 0.03) next[id] = true;
    const prev = useGame.getState().voice;
    const same = Object.keys(next).length === Object.keys(prev.speaking).length && Object.keys(next).every((k) => prev.speaking[k]);
    if (!same) useGame.setState({ voice: { ...prev, speaking: next } });
  }
}

export const voice = new Voice();
