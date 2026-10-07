import { PLOTS, PLOT_SIZE } from "./plots";
import { useGame } from "./store";
import { walkTo } from "./movement";

/** The house a player lives in: their best built home (businesses don't count). */
export function homeOf(pid: string | undefined) {
  if (!pid) return null;
  const plots = useGame.getState().plots;
  let best: { id: string; x: number; z: number; tier: number } | null = null;
  for (const p of PLOTS) {
    const st = plots[p.id];
    if (st && st.ownerId === pid && !st.biz && st.tier >= 1 && (!best || st.tier > best.tier)) best = { id: p.id, x: p.pos[0], z: p.pos[1], tier: st.tier };
  }
  return best;
}

/** Go and see a friend's home: close the menus, walk to their door and open the house card, where "Knock and go in" waits. */
export function visitHome(pid: string, name: string) {
  const s = useGame.getState();
  const h = homeOf(pid);
  if (!h) {
    s.toast(`${name} has not built a home yet.`, "info");
    return;
  }
  if (s.interior) {
    s.toast("Step outside first, then you can visit.", "info");
    return;
  }
  s.patch({ sheet: null, selected: { type: "plot", id: h.id } });
  walkTo(h.x, h.z + PLOT_SIZE / 2 + 0.6);
  s.toast(`Walking to ${name}'s home…`, "info");
}

/** Walk to any home or business and open its card (a house card offers "Knock", a business card offers "Step inside"). */
export function goToPlot(plotId: string) {
  const s = useGame.getState();
  const p = PLOTS.find((x) => x.id === plotId);
  if (!p) return;
  if (s.interior) {
    s.toast("Step outside first.", "info");
    return;
  }
  s.patch({ sheet: null, selected: { type: "plot", id: plotId } });
  walkTo(p.pos[0], p.pos[1] + PLOT_SIZE / 2 + 0.6);
}
