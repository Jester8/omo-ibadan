import type { S2C } from "./protocol";
import { DEMO_AUTH } from "./api";
import { custodyTick, handleCustodyMessage, onCustodySocketOpen } from "./custody";
import { applyLoanView, loadLoan, loadOffer, loanTick } from "./loans";
import { onPokeAck, onPokeFx, onPokeMode, onPoked, pokeTick } from "./pokes";
import { applyPlotFree } from "./property";
import { api } from "./socialApi";
import { useSocial } from "./socialState";
import type { SocialFlags } from "./socialRules";
import { useGame } from "./store";

/** Everything the server says about police, pokes, loans and land sales comes through here (net.ts passes on what it has no case for). */
export function socialHandle(m: S2C): void {
  switch (m.t) {
    case "custody":
    case "caseUpdate":
    case "bailAsk":
    case "bailAskEnd":
    case "arrestNote":
      handleCustodyMessage(m);
      break;
    case "poked":
      onPoked(m);
      break;
    case "pokeAck":
      onPokeAck(m);
      break;
    case "pokeFx":
      onPokeFx(m);
      break;
    case "pokeMode":
      onPokeMode(m.mode);
      break;
    case "loan":
      applyLoanView(m.loan, m.why, m.now);
      break;
    case "plotFree":
      applyPlotFree(m.plotId);
      break;
  }
}

/** A server that does not know the question (an older one) has none of the features. */
const NONE: SocialFlags = { custody: false, efcc: false, pokes: false, loans: false, sales: false, now: 0 };

/** Called whenever the websocket opens: ask which features are on, then load whatever they need. */
export function socialOnOpen(): void {
  if (DEMO_AUTH) return; // the browser-only build: the demo flags are fixed and nothing is asked
  void (async () => {
    const r = await api<SocialFlags>("GET", "/api/social/flags");
    const flags = r.ok && r.data && typeof r.data.custody === "boolean" ? r.data : NONE;
    useSocial.setState({ flags });
    useGame.setState({ policeOpen: flags.custody, efccOpen: flags.custody && flags.efcc });
    // a saved custody the server no longer holds is let go (the server was switched off or the case was cleared)
    if (!flags.custody && useGame.getState().custody) (await import("./custody")).applyCustody(null);
    if (flags.custody) void onCustodySocketOpen();
    if (flags.loans) {
      void loadLoan();
      void loadOffer();
    }
  })();
}

/**
 * Called once by SocialOverlays when it mounts. Puts a saved custody back in force, starts the one-second tick (the local release
 * rule, the loan tick, poke cooldowns) and returns the function that stops it.
 */
export function socialMount(): () => void {
  const id = setInterval(() => {
    custodyTick();
    loanTick();
    pokeTick();
  }, 1000);
  custodyTick();
  return () => clearInterval(id);
}
