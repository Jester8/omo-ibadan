"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, EyeOff, Music2, Pause, Play, Trash2, Upload } from "lucide-react";
import { play, useMusic, type PlayableTrack } from "@/lib/music";
import { listApproved, listMine, removeTrack, submitTrack, type MyTrack } from "@/lib/tracks";
import { parseSpotifyLink, spotifyPage, useSpotify } from "@/lib/spotify";

const STATUS: Record<MyTrack["status"], string> = { pending: "Waiting for review", approved: "Live in the city", rejected: "Not approved" };

/** Listen to artists' music, or share your own. The artist always keeps the copyright. */
export default function MusicSheet() {
  const [tab, setTab] = useState<"listen" | "spotify" | "share">("listen");
  const seg = (on: boolean) => `flex-1 rounded-xl py-2 text-sm font-semibold transition active:scale-95 ${on ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`;
  return (
    <>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setTab("listen")} className={seg(tab === "listen")}>
          Listen
        </button>
        <button onClick={() => setTab("spotify")} className={seg(tab === "spotify")}>
          Spotify
        </button>
        <button onClick={() => setTab("share")} className={seg(tab === "share")}>
          Share yours
        </button>
      </div>
      {tab === "listen" ? <Listen /> : tab === "spotify" ? <SpotifyTab /> : <Share />}
    </>
  );
}

function Listen() {
  const [tracks, setTracks] = useState<PlayableTrack[] | null>(null);
  const current = useMusic((s) => s.current);
  const playing = useMusic((s) => s.playing);
  const error = useMusic((s) => s.error);
  useEffect(() => {
    void listApproved().then(setTracks);
  }, []);

  return (
    <>
      <p className="mb-3 text-xs text-stone-500">Music played here belongs to the artists who shared it. Every track is credited, and artists can remove theirs at any time.</p>
      {error && <p className="mb-2 text-xs font-semibold text-rose-600">{error}</p>}
      {tracks === null && <p className="text-sm text-stone-500">Loading…</p>}
      {tracks?.length === 0 && (
        <div className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600 ring-1 ring-black/5">
          <p className="font-semibold text-stone-800">No artist tracks yet.</p>
          <p className="mt-1">Are you an artist? Share your own music from the next tab. It goes live once it has been reviewed.</p>
        </div>
      )}
      <ul className="space-y-2">
        {tracks?.map((t) => {
          const on = current?.id === t.id && playing;
          return (
            <li key={t.id} className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
              <button onClick={() => void play(t)} aria-label={on ? "Pause" : "Play"} className={`grid size-11 shrink-0 place-items-center rounded-full text-white transition active:scale-90 ${on ? "bg-amber-500" : "bg-emerald-600"}`}>
                {on ? <Pause className="size-5" /> : <Play className="size-5" />}
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-stone-900">{t.title}</p>
                <p className="truncate text-xs text-stone-600">{t.artist}</p>
                <p className="truncate text-[11px] text-stone-400">© {t.rightsHolder}. All rights reserved. Played with the artist&apos;s permission.</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/** Play your own Spotify playlist in the game: paste its link, add songs in Spotify whenever you like. */
function SpotifyTab() {
  const link = useSpotify((s) => s.link);
  const open = useSpotify((s) => s.open);
  const [text, setText] = useState("");
  const parsed = parseSpotifyLink(text);
  const input = "w-full rounded-2xl bg-stone-100 px-4 py-2.5 text-sm outline-none ring-2 ring-transparent transition placeholder:text-stone-400 focus:bg-white focus:ring-emerald-500";
  return (
    <>
      <div className="rounded-2xl bg-emerald-50 p-3.5 text-xs leading-relaxed text-emerald-950 ring-1 ring-emerald-100">
        <p className="font-bold">Your own music, from your Spotify account.</p>
        <p>
          Paste a playlist link and it plays here with Spotify&apos;s own player. Add or remove songs in Spotify any time and the game shows the change the next time it loads. Only you hear it, nobody else in the city does.
        </p>
      </div>

      {link ? (
        <div className="mt-3 rounded-2xl bg-stone-50 p-3.5 ring-1 ring-black/5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">Playing from</p>
          <a href={spotifyPage(link)} target="_blank" rel="noreferrer noopener" className="mt-0.5 block truncate text-sm font-semibold text-emerald-800 underline-offset-2 hover:underline">
            {spotifyPage(link).replace("https://", "")}
          </a>
          <div className="mt-3 flex gap-2">
            <button onClick={() => useSpotify.getState().setOpen(!open)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-stone-900 py-2.5 text-xs font-semibold text-white transition active:scale-95">
              {open ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />} {open ? "Hide the player" : "Show the player"}
            </button>
            <button onClick={() => useSpotify.getState().clear()} className="flex items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-rose-600 ring-1 ring-rose-200 transition active:scale-95">
              <Trash2 className="size-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-4 space-y-2.5">
        <p className="text-xs font-semibold text-stone-700">{link ? "Use a different playlist" : "Add your playlist"}</p>
        <input value={text} onChange={(e) => setText(e.target.value.slice(0, 300))} placeholder="https://open.spotify.com/playlist/…" autoCapitalize="none" autoCorrect="off" spellCheck={false} className={input} />
        {text.trim() && !parsed && <p className="text-xs font-medium text-rose-600">That is not a Spotify link. In Spotify choose ⋯, then Share, then Copy link to playlist. Short spotify.link links do not work: use the one that starts with open.spotify.com.</p>}
        <button
          disabled={!parsed}
          onClick={() => {
            if (!parsed) return;
            useSpotify.getState().save(parsed);
            setText("");
          }}
          className="w-full rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-40"
        >
          {link ? "Switch to this playlist" : "Play my playlist"}
        </button>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-stone-500">
        Log in to Spotify in this browser to hear full songs; without it Spotify plays 30-second previews. Songs come from Spotify and stay Spotify&apos;s: the game does not copy or share them. Tap the green note at the top left to bring the player back after hiding it.
      </p>
    </>
  );
}

function Share() {
  const [mine, setMine] = useState<MyTrack[]>([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [holder, setHolder] = useState("");
  const [agree, setAgree] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const refresh = useCallback(() => void listMine().then(setMine), []);
  useEffect(refresh, [refresh]);

  const ready = title.trim() && artist.trim() && holder.trim() && agree && file && !busy;
  const input = "w-full rounded-2xl bg-stone-100 px-4 py-2.5 text-sm outline-none ring-2 ring-transparent transition placeholder:text-stone-400 focus:bg-white focus:ring-emerald-500";

  const submit = async () => {
    if (!file) return;
    setBusy(true);
    setMsg("");
    try {
      await submitTrack({ title: title.trim(), artist: artist.trim(), rightsHolder: holder.trim() }, file);
      setMsg("Submitted. It will play in the city once it has been reviewed.");
      setTitle("");
      setFile(null);
      setAgree(false);
      refresh();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-900 ring-1 ring-amber-100">
        <p className="font-bold">Your music stays yours.</p>
        <p>Only upload a recording you own, or one you have the owner&apos;s written permission to share. Please don&apos;t upload other artists&apos; songs without that permission; they will be removed.</p>
      </div>

      <div className="mt-4 space-y-2.5">
        <input value={artist} onChange={(e) => setArtist(e.target.value.slice(0, 60))} placeholder="Artist name" className={input} />
        <input value={title} onChange={(e) => setTitle(e.target.value.slice(0, 80))} placeholder="Track title" className={input} />
        <input value={holder} onChange={(e) => setHolder(e.target.value.slice(0, 80))} placeholder="Copyright owner (e.g. the artist or their label)" className={input} />
        <label className="flex cursor-pointer items-center gap-2.5 rounded-2xl bg-stone-100 px-4 py-2.5 text-sm text-stone-600 transition hover:bg-stone-200">
          <Upload className="size-4 shrink-0" />
          <span className="truncate">{file ? file.name : "Choose audio (mp3, m4a, ogg, wav · up to 12 MB)"}</span>
          <input type="file" accept="audio/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-stone-700">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-emerald-600" />
          <span>
            I own the copyright in this recording and composition (or have the owner&apos;s written permission), and I allow Omo&apos;badan to stream it in the game. I keep all my rights and can remove it at any time.
          </span>
        </label>
        <button disabled={!ready} onClick={() => void submit()} className="w-full rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-40">
          {busy ? "Uploading…" : "Submit for review"}
        </button>
        {msg && <p className="text-sm font-medium text-stone-700">{msg}</p>}
      </div>

      {mine.length > 0 && (
        <>
          <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wider text-stone-400">Your tracks</p>
          <ul className="space-y-2">
            {mine.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-black/5">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-stone-900">
                    <Music2 className="size-3.5 shrink-0 text-stone-400" /> {t.title}
                  </p>
                  <p className={`text-xs font-semibold ${t.status === "approved" ? "text-emerald-700" : t.status === "rejected" ? "text-rose-600" : "text-amber-700"}`}>
                    {STATUS[t.status]}
                    {t.note ? ` · ${t.note}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Remove “${t.title}” from Omo'badan?`)) void removeTrack(t.id).then(refresh);
                  }}
                  aria-label="Remove track"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-stone-500 ring-1 ring-black/10 transition hover:text-rose-600 active:scale-90"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
