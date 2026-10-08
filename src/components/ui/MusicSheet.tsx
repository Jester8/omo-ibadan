"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ExternalLink, Headphones, Music2, Pause, Play, RotateCcw, RotateCw, SkipForward, Square, Trash2, Upload } from "lucide-react";
import { pause, play, resume, seekTrack, skip, stop, trackTime, useMusic, type PlayableTrack } from "@/lib/music";
import { listApproved, listMine, removeTrack, submitTrack, type MyTrack } from "@/lib/tracks";
import { clock, parseSpotifyLink, playerHeight, spotifyBridge, spotifyInfo, spotifyPage, spotifyUri, spotifyWord, useSpotify, type SpotifyInfo } from "@/lib/spotify";
import { cancelInvite, end as endListening, invite, useListen } from "@/lib/listenTogether";
import { useGame } from "@/lib/store";

const STATUS: Record<MyTrack["status"], string> = { pending: "Waiting for review", approved: "Live in the city", rejected: "Not approved" };

/** The Music app: what is playing now, then artists' tracks, your own Spotify, and a place to share your music. */
export default function MusicSheet() {
  const [tab, setTab] = useState<"listen" | "spotify" | "share">("listen");
  const seg = (on: boolean) => `flex-1 rounded-lg py-1.5 text-xs font-semibold transition active:scale-95 ${on ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`;
  return (
    <>
      <NowPlayingCard />
      <div className="mb-3 mt-3 flex gap-0.5 rounded-xl bg-stone-200/70 p-0.5">
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

/* ----------------------------------------------------- now playing ----------------------------------------------------- */

/** A clock that ticks twice a second while something plays, so the bar moves smoothly between the player's reports. */
function useNow(active: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [active]);
  return now;
}

function Bars({ on }: { on: boolean }) {
  return (
    <span aria-hidden className="flex h-4 items-end gap-[3px]">
      {[0, 1, 2, 3].map((i) => (
        <i key={i} style={{ animationDelay: `${i * 0.17}s`, animationPlayState: on ? "running" : "paused" }} className="block h-1 w-[3px] origin-bottom rounded-full bg-emerald-300 animate-[eq_0.9s_ease-in-out_infinite]" />
      ))}
    </span>
  );
}

/** Small round controls. */
const ctl = "grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-90 disabled:opacity-30";

/** The song that is playing, whichever it is: an artist's track, the club mix, or your Spotify. */
function NowPlayingCard() {
  const track = useMusic((s) => s.current);
  const trackOn = useMusic((s) => s.playing);
  const queued = useMusic((s) => s.queued);
  const blocked = useMusic((s) => s.blocked);
  const link = useSpotify((s) => s.override ?? s.link);
  const spPlaying = useSpotify((s) => s.playing);
  const spPos = useSpotify((s) => s.position);
  const spDur = useSpotify((s) => s.duration);
  const spAt = useSpotify((s) => s.positionAt);
  const item = useSpotify((s) => s.item);
  const ready = useSpotify((s) => s.ready);
  const session = useListen((s) => s.session);
  const sync = useListen((s) => s.sync);

  const guest = session?.role === "guest";
  const shows = spPlaying ? "spotify" : track ? "track" : link && spAt > 0 ? "spotify" : "idle";
  const playing = shows === "spotify" ? spPlaying : trackOn;
  const now = useNow(playing);

  // the name and cover of what Spotify is on: the song when Spotify says which, otherwise the playlist itself
  const shown = (item ? parseSpotifyLink(item) : null) ?? link;
  const key = shown ? spotifyUri(shown) : "";
  const [fetched, setFetched] = useState<{ key: string; info: SpotifyInfo | null } | null>(null);
  useEffect(() => {
    if (!shown || shows !== "spotify") return;
    let dead = false;
    void spotifyInfo(shown).then((info) => {
      if (!dead) setFetched({ key: spotifyUri(shown), info });
    });
    return () => {
      dead = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` stands for `shown`
  }, [key, shows]);
  const info = fetched?.key === key ? fetched.info : null;

  let pos = 0;
  let dur = 0;
  if (shows === "spotify") {
    dur = spDur;
    pos = Math.min(dur || Infinity, spPlaying ? spPos + (now - spAt) / 1000 : spPos);
  } else if (shows === "track" && track && !track.synth) {
    const t = trackTime();
    pos = t.pos;
    dur = t.dur;
  }
  const bar = dur > 0 ? Math.min(100, (pos / dur) * 100) : 0;

  const title = shows === "spotify" ? (info?.title ?? (link ? `Your Spotify ${spotifyWord(link)}` : "Spotify")) : shows === "track" ? track!.title : "Nothing playing";
  const sub =
    shows === "spotify"
      ? guest
        ? `Listening with ${session.name}${sync === "in" ? " · in sync" : sync === "catching" ? " · catching up…" : " · joining…"}`
        : session
          ? `Listening with ${session.name}`
          : "From Spotify"
      : shows === "track"
        ? blocked
          ? "Tap play to start the music"
          : `${track!.artist} · © ${track!.rightsHolder}`
        : "Pick a song below, or play your Spotify.";

  const toggle = () => {
    const b = spotifyBridge.current;
    if (shows === "spotify") {
      if (!b) return;
      if (spPlaying) b.pause();
      else if (spPos > 1) b.resume();
      else b.play();
    } else if (trackOn) pause();
    else resume();
  };
  const scrub = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dur || guest) return;
    const r = e.currentTarget.getBoundingClientRect();
    const to = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * dur;
    if (shows === "spotify") spotifyBridge.current?.seek(to);
    else seekTrack(to);
  };
  const jump = (by: number) => spotifyBridge.current?.seek(Math.max(0, Math.min(spDur || Infinity, pos + by)));

  return (
    <section data-music-card aria-label="Now playing" className="rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 p-3 text-white shadow-md ring-1 ring-black/10">
      <div className="flex items-center gap-3">
        <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">
          {shows === "spotify" && info?.thumb ? (
            // eslint-disable-next-line @next/next/no-img-element -- Spotify's own cover, from their image servers
            <img src={info.thumb} alt="" referrerPolicy="no-referrer" className="size-full object-cover" />
          ) : shows === "idle" ? (
            <Music2 className="size-6 text-white/40" />
          ) : (
            <Headphones className="size-6 text-emerald-300" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            {shows === "idle" ? "Music" : <Bars on={playing} />}
            {shows === "spotify" ? "Spotify" : shows === "track" ? (track!.synth ? "Club mix" : "Artist track") : ""}
          </p>
          <p className="truncate text-sm font-bold leading-tight">{title}</p>
          <p className="truncate text-[11px] text-white/60">{sub}</p>
        </div>
      </div>

      {shows !== "idle" && (
        <>
          <div className="mt-2.5 flex items-center gap-2 text-[10px] tabular-nums text-white/60">
            <span className="w-8 text-right">{dur > 0 ? clock(pos) : ""}</span>
            <div onPointerDown={scrub} role="slider" aria-label="Song position" aria-valuemin={0} aria-valuemax={Math.round(dur)} aria-valuenow={Math.round(pos)} className={`relative h-3 flex-1 ${dur > 0 && !guest ? "cursor-pointer" : ""}`}>
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/15">
                <div className="h-full rounded-full bg-emerald-400" style={{ width: `${bar}%` }} />
              </div>
            </div>
            <span className="w-8">{dur > 0 ? clock(dur) : shows === "track" && track?.synth ? "live" : ""}</span>
          </div>
          <div className="mt-1.5 flex items-center justify-center gap-2">
            {shows === "spotify" ? (
              <>
                <button onClick={() => jump(-10)} disabled={guest || !ready} aria-label="Back 10 seconds" className={ctl}>
                  <RotateCcw className="size-3.5" />
                </button>
                <button onClick={toggle} disabled={guest || !ready} aria-label={playing ? "Pause" : "Play"} className="grid size-9 place-items-center rounded-full bg-emerald-500 text-black transition hover:bg-emerald-400 active:scale-90 disabled:opacity-30">
                  {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                </button>
                <button onClick={() => jump(10)} disabled={guest || !ready} aria-label="Forward 10 seconds" className={ctl}>
                  <RotateCw className="size-3.5" />
                </button>
              </>
            ) : (
              <>
                <button onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="grid size-9 place-items-center rounded-full bg-emerald-500 text-black transition hover:bg-emerald-400 active:scale-90">
                  {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                </button>
                {queued > 1 && (
                  <button onClick={skip} aria-label="Next track" className={ctl}>
                    <SkipForward className="size-3.5" />
                  </button>
                )}
                <button onClick={stop} aria-label="Stop" className={ctl}>
                  <Square className="size-3 fill-current" />
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}

/* ----------------------------------------------------- artists' tracks ----------------------------------------------------- */

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
      <p className="mb-2 text-[11px] leading-snug text-stone-500">Music played here belongs to the artists who shared it. Every track is credited, and artists can remove theirs at any time.</p>
      {error && <p className="mb-2 text-xs font-semibold text-rose-600">{error}</p>}
      {tracks === null && <p className="text-sm text-stone-500">Loading…</p>}
      {tracks?.length === 0 && (
        <div className="rounded-xl bg-stone-50 p-3 text-xs text-stone-600 ring-1 ring-black/5">
          <p className="font-semibold text-stone-800">No artist tracks yet.</p>
          <p className="mt-0.5">Are you an artist? Share your own music from the last tab. It goes live once it has been reviewed.</p>
        </div>
      )}
      <ul className="space-y-1.5">
        {tracks?.map((t) => {
          const on = current?.id === t.id && playing;
          return (
            <li key={t.id} className={`flex items-center gap-2.5 rounded-xl px-3 py-2 ring-1 ${current?.id === t.id ? "bg-emerald-50 ring-emerald-200" : "bg-stone-50 ring-black/5"}`}>
              <button onClick={() => void play(t)} aria-label={on ? "Pause" : "Play"} className={`grid size-8 shrink-0 place-items-center rounded-full text-white transition active:scale-90 ${on ? "bg-amber-500" : "bg-emerald-600"}`}>
                {on ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              </button>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold leading-tight text-stone-900">{t.title}</p>
                <p className="truncate text-[11px] text-stone-600">{t.artist}</p>
                <p className="truncate text-[10px] text-stone-400">© {t.rightsHolder}. Played with the artist&apos;s permission.</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/* --------------------------------------------------------- Spotify --------------------------------------------------------- */

/** The empty box the Spotify player is laid over (see SpotifyEngine). */
function PlayerSlot({ height }: { height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    useSpotify.getState().setSlot(ref.current);
    return () => useSpotify.getState().setSlot(null);
  }, []);
  return <div ref={ref} style={{ height }} className="rounded-xl bg-stone-200/70" />;
}

/** Play your own Spotify playlist in the game: paste its link, add songs in Spotify whenever you like. */
function SpotifyTab() {
  const own = useSpotify((s) => s.link);
  const override = useSpotify((s) => s.override);
  const session = useListen((s) => s.session);
  const link = override ?? own;
  const [text, setText] = useState("");
  const parsed = parseSpotifyLink(text);
  const input = "w-full rounded-xl bg-stone-100 px-3 py-2 text-[13px] outline-none ring-2 ring-transparent transition placeholder:text-stone-400 focus:bg-white focus:ring-emerald-500";
  const guest = session?.role === "guest";

  const form = (
    <div className="space-y-2">
      {!own && (
        <div className="rounded-xl bg-emerald-50 p-2.5 text-[11px] leading-snug text-emerald-950 ring-1 ring-emerald-100">
          <p className="font-bold">Your own music, from your Spotify account.</p>
          <p>Paste a playlist, album or song link and it plays here with Spotify&apos;s own player. Add songs in Spotify any time and they show up here the next time it loads.</p>
        </div>
      )}
      {!own && <p className="text-[11px] font-semibold text-stone-700">Add your playlist</p>}
      <input value={text} onChange={(e) => setText(e.target.value.slice(0, 300))} placeholder="https://open.spotify.com/playlist/…" autoCapitalize="none" autoCorrect="off" spellCheck={false} className={input} />
      {text.trim() && !parsed && <p className="text-[11px] font-medium text-rose-600">That is not a Spotify link. In Spotify choose ⋯, then Share, then Copy link. Short spotify.link links do not work: use the one that starts with open.spotify.com.</p>}
      <button
        disabled={!parsed}
        onClick={() => {
          if (!parsed) return;
          useSpotify.getState().save(parsed);
          setText("");
        }}
        className="w-full rounded-xl bg-emerald-600 py-2 text-[13px] font-semibold text-white transition active:scale-[0.98] disabled:opacity-40"
      >
        {own ? "Switch to this link" : "Play my playlist"}
      </button>
    </div>
  );

  return (
    <>
      {guest && (
        <div className="mb-2.5 rounded-xl bg-emerald-50 p-2.5 text-[11px] leading-snug text-emerald-900 ring-1 ring-emerald-100">
          You are hearing <b>{session.name}</b>&apos;s {link ? spotifyWord(link) : "music"}, in step with theirs. Your own playlist comes back when you stop.
        </div>
      )}

      {link ? (
        <div className="rounded-2xl bg-stone-50 p-2 ring-1 ring-black/5">
          <div className="mb-1.5 flex items-center justify-between gap-2 px-1">
            <p className="truncate text-[11px] font-semibold text-stone-500">{guest ? `${session.name}'s ${spotifyWord(link)}` : "Your Spotify"}</p>
            <a href={spotifyPage(link)} target="_blank" rel="noreferrer noopener" className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-stone-600 ring-1 ring-black/10 transition hover:bg-stone-100">
              Open in Spotify <ExternalLink className="size-2.5" />
            </a>
          </div>
          <PlayerSlot height={playerHeight(link)} />
          {!guest && own && (
            <div className="mt-1.5 flex justify-end">
              <button onClick={() => useSpotify.getState().clear()} className="flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold text-rose-600 transition hover:bg-rose-50 active:scale-95">
                <Trash2 className="size-3" /> Remove playlist
              </button>
            </div>
          )}
        </div>
      ) : null}

      {!guest && (own ? <details className="mt-3 rounded-xl bg-stone-50 px-3 py-2 ring-1 ring-black/5 [&[open]>summary]:mb-2"><summary className="cursor-pointer text-[11px] font-semibold text-stone-700">Use a different link</summary>{form}</details> : <div className="mt-3">{form}</div>)}

      <Together />

      <p className="mt-3 text-[10px] leading-relaxed text-stone-500">
        Log in to Spotify in this browser to hear full songs; without it Spotify plays 30-second previews. Songs come from Spotify and stay Spotify&apos;s: the game does not copy them or send the sound anywhere. Only the place in the song is shared with a friend you listen with.
      </p>
    </>
  );
}

/** Listen with a friend, in step. */
function Together() {
  const own = useSpotify((s) => s.link);
  const friends = useGame((s) => s.friends);
  const online = useGame((s) => s.net === "online");
  const { pending, session, sync } = useListen();
  const [msg, setMsg] = useState("");
  const sorted = [...friends].sort((a, b) => Number(!!b.online) - Number(!!a.online) || a.name.localeCompare(b.name));

  const card = "mt-3 rounded-2xl bg-stone-50 p-3 ring-1 ring-black/5";
  const small = "rounded-full px-3 py-1 text-[11px] font-semibold transition active:scale-95";

  if (session) {
    return (
      <div className={card}>
        <p className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
          <Headphones className="size-3.5 text-emerald-600" /> Listening with {session.name}
        </p>
        <p className="mt-0.5 text-[11px] text-stone-500">
          {session.role === "host" ? "They hear what you hear, in step: play, pause or skip and they follow." : sync === "in" ? "In step with their song." : sync === "catching" ? "Catching up to their song…" : "Joining their song…"}
        </p>
        <button onClick={() => endListening(true)} className={`${small} mt-2 bg-rose-600 text-white`}>
          Stop listening together
        </button>
      </div>
    );
  }
  if (pending) {
    return (
      <div className={card}>
        <p className="text-xs font-bold text-stone-800">Waiting for {pending.name}…</p>
        <p className="mt-0.5 text-[11px] text-stone-500">They see your invitation on their screen.</p>
        <button onClick={cancelInvite} className={`${small} mt-2 bg-stone-200 text-stone-700`}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className={card}>
      <p className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
        <Headphones className="size-3.5 text-emerald-600" /> Listen together
      </p>
      <p className="mt-0.5 text-[11px] leading-snug text-stone-500">Ask a friend to hear your Spotify with you, at the same moment. They both play it on their own device, so you each need to be logged in to Spotify. For the closest match, share a single song.</p>
      {!online ? (
        <p className="mt-2 text-[11px] font-medium text-amber-700">You need to be online in the city to listen together.</p>
      ) : !own ? (
        <p className="mt-2 text-[11px] font-medium text-amber-700">Add a Spotify link above first.</p>
      ) : sorted.length === 0 ? (
        <p className="mt-2 text-[11px] font-medium text-stone-500">Make a friend first, then you can listen together.</p>
      ) : (
        <ul className="mt-2 max-h-44 space-y-1 overflow-y-auto">
          {sorted.map((f) => (
            <li key={f.pid} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-1.5 ring-1 ring-black/5">
              <span className={`size-2 shrink-0 rounded-full ${f.online ? "bg-emerald-500" : "bg-stone-300"}`} />
              <span className="min-w-0 flex-1 truncate text-xs font-semibold text-stone-800">{f.name}</span>
              <button
                disabled={!f.online}
                onClick={() => setMsg(invite(f) ?? "")}
                className={`${small} ${f.online ? "bg-emerald-600 text-white" : "bg-stone-100 text-stone-400"}`}
              >
                {f.online ? "Invite" : "Offline"}
              </button>
            </li>
          ))}
        </ul>
      )}
      {msg && <p className="mt-1.5 text-[11px] font-medium text-rose-600">{msg}</p>}
    </div>
  );
}

/* ---------------------------------------------------- share your own ---------------------------------------------------- */

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
  const input = "w-full rounded-xl bg-stone-100 px-3 py-2 text-[13px] outline-none ring-2 ring-transparent transition placeholder:text-stone-400 focus:bg-white focus:ring-emerald-500";

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
      <div className="rounded-xl bg-amber-50 p-2.5 text-[11px] leading-snug text-amber-900 ring-1 ring-amber-100">
        <p className="font-bold">Your music stays yours.</p>
        <p>Only upload a recording you own, or one you have the owner&apos;s written permission to share. Please don&apos;t upload other artists&apos; songs without that permission; they will be removed.</p>
      </div>

      <div className="mt-3 space-y-2">
        <input value={artist} onChange={(e) => setArtist(e.target.value.slice(0, 60))} placeholder="Artist name" className={input} />
        <input value={title} onChange={(e) => setTitle(e.target.value.slice(0, 80))} placeholder="Track title" className={input} />
        <input value={holder} onChange={(e) => setHolder(e.target.value.slice(0, 80))} placeholder="Copyright owner (e.g. the artist or their label)" className={input} />
        <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-stone-100 px-3 py-2 text-[13px] text-stone-600 transition hover:bg-stone-200">
          <Upload className="size-3.5 shrink-0" />
          <span className="truncate">{file ? file.name : "Choose audio (mp3, m4a, ogg, wav · up to 12 MB)"}</span>
          <input type="file" accept="audio/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <label className="flex items-start gap-2 text-[11px] leading-relaxed text-stone-700">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 size-3.5 shrink-0 accent-emerald-600" />
          <span>
            I own the copyright in this recording and composition (or have the owner&apos;s written permission), and I allow Omo&apos;badan to stream it in the game. I keep all my rights and can remove it at any time.
          </span>
        </label>
        <button disabled={!ready} onClick={() => void submit()} className="w-full rounded-xl bg-emerald-600 py-2 text-[13px] font-semibold text-white transition active:scale-[0.98] disabled:opacity-40">
          {busy ? "Uploading…" : "Submit for review"}
        </button>
        {msg && <p className="text-xs font-medium text-stone-700">{msg}</p>}
      </div>

      {mine.length > 0 && (
        <>
          <p className="mb-1.5 mt-5 text-[10px] font-semibold uppercase tracking-wider text-stone-400">Your tracks</p>
          <ul className="space-y-1.5">
            {mine.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 rounded-xl bg-stone-50 px-3 py-2 ring-1 ring-black/5">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 truncate text-[13px] font-semibold text-stone-900">
                    <Music2 className="size-3 shrink-0 text-stone-400" /> {t.title}
                  </p>
                  <p className={`text-[11px] font-semibold ${t.status === "approved" ? "text-emerald-700" : t.status === "rejected" ? "text-rose-600" : "text-amber-700"}`}>
                    {STATUS[t.status]}
                    {t.note ? ` · ${t.note}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Remove “${t.title}” from Omo'badan?`)) void removeTrack(t.id).then(refresh);
                  }}
                  aria-label="Remove track"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-stone-500 ring-1 ring-black/10 transition hover:text-rose-600 active:scale-90"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
