import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Look } from "./look";
import { type ActionDef, type Needs } from "./places";
import { TIERS, plotById, RENT_CAP_MIN, naira, PLOTS, NPC_PLOTS } from "./plots";
import type { InteriorRef } from "./interiors";
import { decorById, MAX_PER_KIND, withDecor } from "./decor";
import { layoutFor } from "./layouts";
import type { Election, PeerInfo, PlotState } from "./protocol";
import { titleIndex, TITLES } from "./titles";
import { boost } from "./playerState";
import { rebuildGrid } from "./pathing";
import { EMPTY_STATS, QUESTS, type Stats } from "./quests";

export type Profile = { id: string; name: string; look: Look };
export type Toast = { id: number; text: string; tone: "good" | "bad" | "info" };
export type ChatMsg = {
  id: string;
  room: string;
  from: string;
  text: string;
  at: number;
  self?: boolean;
  npc?: boolean;
  /** sender connection id and persistent id, for mute/report */
  fromId?: string;
  fromPid?: string;
};
export type Selection = { type: "place" | "plot"; id: string } | null;
export type Busy = { label: string; start: number; secs: number } | null;
export type CallState = {
  phase: "idle" | "calling" | "ringing" | "live";
  peerId: string | null;
  peerName: string;
  room: string | null;
};
export type Sheet = "phone" | "profile" | "quests" | "election" | null;

const START_MONEY = 25000;
const START_NEEDS: Needs = { hunger: 80, energy: 90, fun: 65, social: 55 };
const clamp = (n: number) => Math.max(0, Math.min(100, n));

const decayNeeds = (n: Needs, secs: number): Needs => ({
  hunger: clamp(n.hunger - 0.12 * secs),
  energy: clamp(n.energy - 0.08 * secs),
  fun: clamp(n.fun - 0.07 * secs),
  social: clamp(n.social - 0.05 * secs),
});

const WARN: Record<keyof Needs, string> = {
  hunger: "Your stomach is growling. Find something to eat.",
  energy: "You're getting tired. Rest or sleep soon.",
  fun: "You're bored. Do something fun.",
  social: "You feel lonely. Chat or join a voice room.",
};
const warned: Record<keyof Needs, boolean> = { hunger: false, energy: false, fun: false, social: false };

/** Injected by net.ts so the store can push land changes to the server without importing it. */
export const hooks = {
  plotSet: null as null | ((plotId: string, plot: PlotState) => void),
};

type State = {
  // persisted
  profile: Profile | null;
  money: number;
  needs: Needs;
  rep: number;
  plots: Record<string, PlotState>;
  stats: Stats;
  questsDone: string[];
  muted: string[];
  savedAt: number;

  // session
  awaySecs: number;
  interior: InteriorRef | null;
  /** black fade between city and interiors */
  fade: boolean;
  /** epoch ms until which the generator keeps the lights on */
  generatorUntil: number;
  election: Election | null;
  decor: Record<string, string[]>;
  decorRev: number;
  buyDecor: (homeId: string, decorId: string, tier: number) => string | null;
  myVote: string | null;
  selected: Selection;
  atPlace: string | null;
  busy: Busy;
  toasts: Toast[];
  clockOverride: number | null;
  timeMode: "auto" | "day" | "night";
  placesOnly: boolean;
  editingAvatar: boolean;
  sheet: Sheet;
  net: "offline" | "connecting" | "online";
  connId: string | null;
  online: number;
  remotes: Record<string, PeerInfo>;
  chat: ChatMsg[];
  bubbles: Record<string, { text: string; until: number }>;
  call: CallState;
  voice: { room: string | null; muted: boolean; peers: string[]; speaking: Record<string, boolean> };
  incoming: { from: string; name: string } | null;

  setProfile: (p: Profile) => void;
  select: (s: Selection) => void;
  setAtPlace: (id: string | null) => void;
  toast: (text: string, tone?: Toast["tone"]) => void;
  tick: (dt: number) => void;
  runAction: (a: ActionDef, opts?: { gainScale?: number }) => string | null;
  buyPlot: (id: string) => string | null;
  upgradePlot: (id: string) => string | null;
  collectRent: (id: string) => void;
  setPlots: (plots: Record<string, PlotState>) => void;
  setPlot: (id: string, plot: PlotState) => void;
  addChat: (m: Omit<ChatMsg, "id">, bubbleKey?: string) => void;
  setRemotes: (r: Record<string, PeerInfo>) => void;
  setSheet: (s: Sheet) => void;
  awardQuest: (id: string) => void;
  recordStat: (k: Exclude<keyof Stats, "visited">, n?: number) => void;
  mute: (pid: string) => void;
  clearMuted: () => void;
  patch: (p: Partial<State>) => void;
};

const noopStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };

let toastId = 1;
let chatId = 1;
let busyTimer: ReturnType<typeof setTimeout> | null = null;

export const pendingRent = (plot: PlotState, now: number) => {
  const mins = Math.min(RENT_CAP_MIN, Math.max(0, (now - plot.collectedAt) / 60000));
  return Math.floor(TIERS[plot.tier].rentPerMin * mins);
};

export const useGame = create<State>()(
  persist(
    (set, get) => ({
      profile: null,
      money: START_MONEY,
      needs: START_NEEDS,
      rep: 0,
      plots: NPC_PLOTS,
      stats: EMPTY_STATS,
      questsDone: [],
      muted: [],
      savedAt: 0,
      awaySecs: 0,
      interior: null,
      fade: false,
      generatorUntil: 0,
      election: null,
      decor: {},
      decorRev: 0,
      myVote: null,

      selected: null,
      atPlace: null,
      busy: null,
      toasts: [],
      clockOverride: null,
      timeMode: "auto",
      placesOnly: false,
      editingAvatar: false,
      sheet: null,
      net: "offline",
      connId: null,
      online: 0,
      remotes: {},
      chat: [],
      bubbles: {},
      call: { phase: "idle", peerId: null, peerName: "", room: null },
      voice: { room: null, muted: false, peers: [], speaking: {} },
      incoming: null,

      setProfile: (profile) => set({ profile, editingAvatar: false }),
      select: (selected) => set({ selected }),
      setAtPlace: (atPlace) =>
        set((s) => ({
          atPlace,
          stats: atPlace && !s.stats.visited.includes(atPlace) ? { ...s.stats, visited: [...s.stats.visited, atPlace] } : s.stats,
        })),
      setSheet: (sheet) => set({ sheet }),
      patch: (p) => set(p),

      toast: (text, tone = "info") => {
        const id = toastId++;
        set((s) => ({ toasts: [...s.toasts.slice(-3), { id, text, tone }] }));
        setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3400);
      },

      tick: (dt) => {
        const s = get();
        const inVoice = s.voice.room !== null && s.voice.peers.length > 0;
        const starving = s.needs.hunger < 15;
        const next: Needs = {
          hunger: clamp(s.needs.hunger - 0.12 * dt),
          energy: clamp(s.needs.energy - (starving ? 0.16 : 0.08) * dt),
          fun: clamp(s.needs.fun - 0.07 * dt),
          social: clamp(s.needs.social - 0.05 * dt + (inVoice ? 0.5 * dt : 0)),
        };
        set({ needs: next, savedAt: Date.now() });
        for (const k of Object.keys(next) as (keyof Needs)[]) {
          if (next[k] < 20 && s.needs[k] >= 20 && !warned[k]) {
            warned[k] = true;
            get().toast(WARN[k], "bad");
          } else if (next[k] > 40) warned[k] = false;
        }
      },

      runAction: (a, opts) => {
        const s = get();
        if (s.busy) return "You're already busy.";
        if (a.minRep && s.rep < a.minRep) return `Needs ${a.minRep} reputation (${TITLES[titleIndex(a.minRep)].name}).`;
        if (a.cost && s.money < a.cost) return `You need ${naira(a.cost)}.`;
        if (a.gain?.energy && a.gain.energy < 0 && s.needs.energy + a.gain.energy < 0) return "Too tired. Eat or rest first.";
        const policy = s.election?.governor?.policy;
        const price = (a.cost ?? 0) * (policy === "food" && (a.gain?.hunger ?? 0) > 0 ? 0.8 : 1);
        if (price && s.money < price) return `You need ${naira(price)}.`;
        const scale = opts?.gainScale ?? 1;
        set({ busy: { label: a.label, start: Date.now(), secs: a.secs }, money: s.money - Math.round(price) });
        if (busyTimer) clearTimeout(busyTimer);
        busyTimer = setTimeout(() => {
          const cur = get();
          const needs = { ...cur.needs };
          const parts: string[] = [];
          for (const k of Object.keys(a.gain ?? {}) as (keyof Needs)[]) {
            const d = (a.gain![k] ?? 0) * (a.gain![k]! > 0 ? scale : 1);
            needs[k] = clamp(needs[k] + d);
          }
          let money = cur.money;
          if (a.pay) {
            const pay = Math.round(a.pay * (1 + 0.08 * titleIndex(cur.rep)) * (cur.election?.governor?.policy === "wages" ? 1.15 : 1));
            money += pay;
            parts.push(`+${naira(pay)}`);
          }
          const beforeTitle = titleIndex(cur.rep);
          const rep = cur.rep + (a.rep ?? 0);
          if (a.rep) parts.push(`+${a.rep} rep`);
          if (a.boostMs) {
            boost.until = Date.now() + a.boostMs;
            parts.push("keke boost on");
          }
          const stats: Stats = {
            ...cur.stats,
            worked: cur.stats.worked + (a.pay ? 1 : 0),
            ate: cur.stats.ate + ((a.gain?.hunger ?? 0) >= 25 ? 1 : 0),
          };
          set({ busy: null, needs, money, rep, stats });
          get().toast(`${a.label}${parts.length ? ` · ${parts.join(" · ")}` : ""}`, "good");
          const afterTitle = titleIndex(rep);
          if (afterTitle > beforeTitle) get().toast(`New title: ${TITLES[afterTitle].name}!`, "good");
        }, a.secs * 1000);
        return null;
      },

      buyDecor: (homeId, decorId, tier) => {
        const s = get();
        const def = decorById(decorId);
        if (!def) return "Not available.";
        const have = s.decor[homeId] ?? [];
        if (def.minTier && tier < def.minTier) return "Build a house first.";
        if (have.filter((d) => d === decorId).length >= MAX_PER_KIND) return `You already have ${MAX_PER_KIND} of those.`;
        if (s.money < def.price) return `You need ${naira(def.price)}.`;
        const l = layoutFor({ kind: "home", id: homeId }, (id) => s.plots[id]);
        if (!l) return "Can't decorate here.";
        if (withDecor(l, [...have, decorId]).items.length === withDecor(l, have).items.length) return "No room left for that.";
        set({ money: s.money - def.price, decor: { ...s.decor, [homeId]: [...have, decorId] }, decorRev: s.decorRev + 1 });
        return null;
      },
      buyPlot: (id) => {
        const s = get();
        const plot = plotById(id);
        if (!plot || !s.profile) return "Can't buy that.";
        if (s.plots[id]) return "Already sold.";
        if (s.money < plot.price) return `You need ${naira(plot.price)}.`;
        const state: PlotState = { ownerId: s.profile.id, ownerName: s.profile.name, tier: 0, collectedAt: Date.now() };
        set({ money: s.money - plot.price, plots: { ...s.plots, [id]: state }, rep: s.rep + 10 });
        hooks.plotSet?.(id, state);
        get().toast(`You bought land in ${plot.district}! +10 rep`, "good");
        return null;
      },

      upgradePlot: (id) => {
        const s = get();
        const cur = s.plots[id];
        if (!cur || cur.ownerId !== s.profile?.id) return "Not your land.";
        if (cur.tier >= 3) return "Already a mansion.";
        const next = TIERS[cur.tier + 1];
        const pending = pendingRent(cur, Date.now());
        if (s.money + pending < next.cost) return `You need ${naira(next.cost)}.`;
        const state: PlotState = { ...cur, tier: cur.tier + 1, collectedAt: Date.now() };
        set({ money: s.money + pending - next.cost, plots: { ...s.plots, [id]: state }, rep: s.rep + 8 * state.tier });
        hooks.plotSet?.(id, state);
        get().toast(`Built a ${next.name}! +${8 * state.tier} rep`, "good");
        return null;
      },

      collectRent: (id) => {
        const s = get();
        const cur = s.plots[id];
        if (!cur || cur.ownerId !== s.profile?.id) return;
        const amount = pendingRent(cur, Date.now());
        if (amount <= 0) return get().toast("No rent to collect yet.", "info");
        const state = { ...cur, collectedAt: Date.now() };
        set({ money: s.money + amount, plots: { ...s.plots, [id]: state } });
        hooks.plotSet?.(id, state);
        get().toast(`Collected ${naira(amount)} rent`, "good");
      },

      setPlots: (incoming) => {
        const s = get();
        let refund = 0;
        for (const [id, mine] of Object.entries(s.plots)) {
          const server = incoming[id];
          if (mine.ownerId === s.profile?.id && server && server.ownerId !== mine.ownerId) {
            const p = plotById(id);
            refund += (p?.price ?? 0) + TIERS.slice(1, mine.tier + 1).reduce((a, t) => a + t.cost, 0);
          }
        }
        const merged = { ...NPC_PLOTS, ...incoming };
        set({ plots: merged, money: s.money + refund });
        if (refund > 0) get().toast(`That land was already taken. Refunded ${naira(refund)}.`, "bad");
        rebuildGrid(Object.entries(merged).filter(([, p]) => p.tier > 0).map(([id]) => id));
      },

      setPlot: (id, plot) => {
        set((s) => ({ plots: { ...s.plots, [id]: plot } }));
        rebuildGrid(Object.entries(get().plots).filter(([, p]) => p.tier > 0).map(([pid]) => pid));
      },

      addChat: (m, bubbleKey) => {
        const id = String(chatId++);
        set((s) => ({ chat: [...s.chat.slice(-199), { ...m, id }] }));
        if (bubbleKey) {
          const until = Date.now() + 5000;
          set((s) => ({ bubbles: { ...s.bubbles, [bubbleKey]: { text: m.text, until } } }));
          setTimeout(() => {
            set((s) => {
              if (s.bubbles[bubbleKey]?.until !== until) return s;
              const next = { ...s.bubbles };
              delete next[bubbleKey];
              return { bubbles: next };
            });
          }, 5100);
        }
      },

      setRemotes: (remotes) => set({ remotes }),

      recordStat: (k, n = 1) => set((s) => ({ stats: { ...s.stats, [k]: (s.stats[k] ?? 0) + n } })),

      mute: (pid) => set((s) => (s.muted.includes(pid) ? s : { muted: [...s.muted, pid] })),
      clearMuted: () => set({ muted: [] }),

      awardQuest: (id) => {
        const q = QUESTS.find((x) => x.id === id);
        const s = get();
        if (!q || s.questsDone.includes(id)) return;
        const before = titleIndex(s.rep);
        const rep = s.rep + (q.reward.rep ?? 0);
        set({ questsDone: [...s.questsDone, id], money: s.money + (q.reward.money ?? 0), rep });
        const bits = [q.reward.money ? `+${naira(q.reward.money)}` : "", q.reward.rep ? `+${q.reward.rep} rep` : ""].filter(Boolean).join(" · ");
        get().toast(`Goal complete: ${q.title}${bits ? ` · ${bits}` : ""}`, "good");
        if (titleIndex(rep) > before) get().toast(`New title: ${TITLES[titleIndex(rep)].name}!`, "good");
      },
    }),
    {
      name: "omo-ibadan-v1",
      storage: createJSONStorage(() => (typeof window === "undefined" ? noopStorage : localStorage)),
      partialize: (s) => ({
        profile: s.profile,
        money: s.money,
        needs: s.needs,
        rep: s.rep,
        plots: s.plots,
        stats: s.stats,
        questsDone: s.questsDone,
        muted: s.muted,
        savedAt: s.savedAt,
        decor: s.decor,
      }),
      // while you were away your needs keep dropping, at a gentler rate (capped at 20 minutes)
      merge: (persisted, current) => {
        const p = persisted as Partial<State> | undefined;
        if (!p) return current;
        const merged = { ...current, ...p } as State;
        merged.plots = { ...NPC_PLOTS, ...(p.plots ?? {}) };
        const away = p.savedAt ? Math.min(1200, (Date.now() - p.savedAt) / 1000) : 0;
        if (away > 30 && p.needs) {
          merged.needs = decayNeeds(p.needs, away * 0.4);
          merged.awaySecs = away;
        }
        return merged;
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        rebuildGrid(Object.entries(state.plots).filter(([, p]) => p.tier > 0).map(([id]) => id));
      },
    },
  ),
);

export const ownedBy = (plots: Record<string, PlotState>, pid: string | undefined) =>
  PLOTS.filter((p) => plots[p.id]?.ownerId === pid);

// make sure NPC-owned houses are solid for pathfinding from the first frame
rebuildGrid(Object.entries(useGame.getState().plots).filter(([, p]) => p.tier > 0).map(([id]) => id));
