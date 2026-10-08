/**
 * Keeping a friend's Spotify player in step with the host's. Pure, so it can be tested without a browser.
 * The guest's device looks at where the host's song is (told by the host every few seconds and whenever they pause, play,
 * jump or change song) and where its own player is, and decides what to do. It is a loop, not a one-off: it runs again at
 * every player update, so a play that was ignored or a jump that landed short is simply put right on the next look.
 */

/** How far apart (seconds) the two players may drift before the guest jumps. Smaller would mean stutter. */
export const DRIFT = 2.5;
/** Wait this long (ms) after a play or pause before judging it again, so it is not asked twice. */
export const SETTLE_MS = 1500;
/** Wait this long (ms) after a jump before jumping again. If a jump does not help, it is not repeated in a rush. */
export const SEEK_GAP_MS = 3000;
/** A jump aims a little ahead, since the player takes a moment to land. */
export const LEAD = 0.4;

export type Where = { playing: boolean; pos: number };
export type Step = { do: "play" } | { do: "pause" } | { do: "seek"; to: number };

/** What to do next, given the host's song now and the guest's player now. `since` is how long ago (ms) the last move of each kind was. */
export function nextSteps(host: Where, mine: Where, since: { move: number; seek: number }): Step[] {
  const steps: Step[] = [];
  if (host.playing !== mine.playing) {
    if (since.move < SETTLE_MS) return steps;
    steps.push({ do: host.playing ? "play" : "pause" });
    // started or stopped somewhere else in the song: go to the same place
    if (Math.abs(host.pos - mine.pos) > 1.5 && since.seek >= 1000) steps.push({ do: "seek", to: host.pos + (host.playing ? LEAD : 0) });
    return steps;
  }
  if (Math.abs(host.pos - mine.pos) > (host.playing ? DRIFT : 1.5) && since.seek >= SEEK_GAP_MS) steps.push({ do: "seek", to: host.pos + (host.playing ? LEAD : 0) });
  return steps;
}

/** Is the guest close enough to call it in sync? */
export const inStep = (host: Where, mine: Where) => host.playing === mine.playing && Math.abs(host.pos - mine.pos) <= DRIFT;
