import { naira } from "./plots";
import { sendDmRest } from "./social";
import { useGame } from "./store";

/** Letters at the post office: a short note to a friend, delivered to their chat with an envelope on it. */
export const POSTAGE = 200;
export const LETTER_MAX = 180;
export const LETTER_PREFIX = "\u{2709}\u{FE0F} ";

/**
 * The note as the server will keep it: it deletes line breaks and angle brackets, which would glue words together, so they become
 * spaces here and the preview shows what the friend will really read.
 */
export const cleanNote = (text: string) => text.replace(/[\u0000-\u001f<>]+/g, " ").replace(/\s+/g, " ").trim();
/** The text as a letter arrives: the envelope prefix and then the note. */
export const letterText = (text: string) => LETTER_PREFIX + cleanNote(text);
/** A message that came from the post office. */
export const isLetter = (text: string) => text.startsWith(LETTER_PREFIX);

let posting = false;

/** Post a letter. Postage is charged only after the server took it, so a failed send costs nothing. */
export async function postLetter(pid: string, text: string): Promise<{ ok: boolean; message: string }> {
  const s = useGame.getState();
  const note = cleanNote(text);
  if (!s.profile) return { ok: false, message: "Sign in first." };
  if (s.net !== "online") return { ok: false, message: "Posting needs the online game." };
  if (!note) return { ok: false, message: "Write something first." };
  if (note.length > LETTER_MAX) return { ok: false, message: `Keep it to ${LETTER_MAX} characters.` };
  if (s.money < POSTAGE) return { ok: false, message: `Postage is ${naira(POSTAGE)} and you have ${naira(s.money)}.` };
  if (posting) return { ok: false, message: "One letter at a time." };
  posting = true;
  // the postage is taken first, so spending the same money while the letter is on its way cannot make it free; a letter that did not go is refunded
  useGame.setState((st) => ({ money: st.money - POSTAGE }));
  try {
    const r = await sendDmRest(pid, letterText(note));
    if (!r.ok) {
      useGame.setState((st) => ({ money: st.money + POSTAGE }));
      return { ok: false, message: r.error ?? "Could not send that." };
    }
    useGame.getState().recordStat("letters");
    return { ok: true, message: `Letter posted for ${naira(POSTAGE)}.` };
  } finally {
    posting = false;
  }
}
