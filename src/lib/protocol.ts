import type { Look } from "./look";

export type PlotState = {
  ownerId: string;
  ownerName: string;
  /** 0 = empty land, 1 = bungalow, 2 = duplex, 3 = mansion */
  tier: number;
  collectedAt: number;
};

export type PeerInfo = {
  id: string; // connection id (changes every connection)
  pid: string; // persistent player id
  name: string;
  look: Look;
  room: string;
  x: number;
  z: number;
  ry: number;
};

export type C2S =
  | { t: "hello"; pid: string; name: string; look: Look }
  | { t: "move"; x: number; z: number; ry: number; s: number }
  | { t: "room"; room: string }
  | { t: "chat"; text: string }
  | { t: "plotSet"; plotId: string; plot: PlotState }
  | { t: "voiceJoin"; room: string }
  | { t: "voiceLeave" }
  | { t: "signal"; to: string; data: unknown }
  | { t: "call"; to: string }
  | { t: "callReply"; to: string; accept: boolean }
  | { t: "hangup"; to: string }
  | { t: "report"; id: string; reason: string }
  | { t: "emote"; e: "wave" | "dance" };

export type S2C =
  | { t: "welcome"; id: string; peers: PeerInfo[]; plots: Record<string, PlotState> }
  | { t: "join"; peer: PeerInfo }
  | { t: "leave"; id: string }
  | { t: "moves"; m: [string, number, number, number, number][] }
  | { t: "chat"; id: string; name: string; room: string; text: string; at: number }
  | { t: "plots"; plots: Record<string, PlotState> }
  | { t: "plot"; plotId: string; plot: PlotState }
  | { t: "reject"; plotId: string }
  | { t: "voiceMembers"; room: string; ids: string[] }
  | { t: "voicePeerJoined"; room: string; id: string }
  | { t: "voicePeerLeft"; id: string }
  | { t: "signal"; from: string; data: unknown }
  | { t: "incomingCall"; from: string; name: string }
  | { t: "callReply"; from: string; accept: boolean }
  | { t: "hangup"; from: string }
  | { t: "online"; n: number }
  | { t: "emote"; id: string; e: "wave" | "dance" };
