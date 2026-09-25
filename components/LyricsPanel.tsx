"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePlayer } from "./PlayerProvider";
import { LyricLine } from "@/lib/types";

function parseLrc(lrc: string): LyricLine[] {
  const lines: LyricLine[] = [];
  for (const raw of lrc.split("\n")) {
    const tags = [...raw.matchAll(/\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/g)];
    const text = raw.replace(/(?:\[\d{2}:\d{2}(?:\.\d{2,3})?\])+/, "").trim();
    if (!text) continue;
    for (const match of tags) {
      const mm = Number(match[1]); const ss = Number(match[2]); const ms = match[3] ? Number(`0.${match[3]}`) : 0;
      lines.push({ time: mm * 60 + ss + ms, text });
    }
  }
  return lines.sort((a,b)=>a.time-b.time);
}

export default function LyricsPanel() {
  const { track, currentTime, lyricsOpen, setLyricsOpen } = usePlayer();
  const [state, setState] = useState<"idle"|"loading"|"synced"|"plain"|"none">("idle");
  const [lines, setLines] = useState<LyricLine[]>([]); const [plainText, setPlainText] = useState("");
  const activeRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!track || !lyricsOpen) return;
    let cancelled = false;
    setState("loading"); setLines([]); setPlainText("");
    const params = new URLSearchParams({ track: track.title, artist: track.artist, duration: String(Math.round(track.duration || 0)) });
    if (track.album) params.set("album", track.album);
    fetch(`/api/lyrics?${params.toString()}`).then(r=>r.json()).then(data=>{
      if (cancelled) return;
      if (data.found && data.synced) { setLines(parseLrc(data.synced)); setState("synced"); }
      else if (data.found && data.plain) { setPlainText(data.plain); setState("plain"); }
      else setState("none");
    }).catch(()=>{ if (!cancelled) setState("none"); });
    return ()=>{cancelled=true;};
  }, [track, lyricsOpen]);

  const activeIndex = useMemo(()=>{ let idx=-1; for(let i=0;i<lines.length;i++){ if(lines[i].time<=currentTime) idx=i; else break; } return idx; },[lines,currentTime]);
  useEffect(()=>{ activeRef.current?.scrollIntoView({block:"center",behavior:"smooth"}); },[activeIndex]);
  if (!lyricsOpen || !track) return null;

  return <div className="lyrics-shell fixed inset-0 z-50 flex flex-col">
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 pb-32 pt-7 sm:px-8 sm:pt-10">
      <div className="mb-8 flex items-start justify-between gap-5"><div><p className="section-kicker">Lyrics · {track.genre || "Now playing"}</p><h2 className="mt-1 font-display text-4xl italic text-[#f7f1e7]">{track.title}</h2><p className="mt-1 text-[11px] text-[#756e7d]">{track.artist}</p></div><button onClick={()=>setLyricsOpen(false)} aria-label="Close lyrics" className="icon-button">×</button></div>
      <div className="no-scrollbar flex-1 overflow-y-auto pr-2">
        {state === "loading" && <div className="space-y-4">{Array.from({length:6}).map((_,i)=><div key={i} className="h-8 w-2/3 animate-pulse rounded-lg bg-white/[0.035]" style={{width:`${45+(i%3)*15}%`}}/>)}</div>}
        {state === "none" && <div className="empty-state mt-10"><p className="font-display text-3xl italic text-[#eee7ed]">No lyrics for this one yet.</p><p className="mt-2 text-xs text-[#746d7c]">We could not find a verified lyric match for this recording yet. Try another track or search again later.</p></div>}
        {state === "plain" && <p className="whitespace-pre-line text-base leading-8 text-[#d5cdd6] sm:text-lg">{plainText}</p>}
        {state === "synced" && <div className="space-y-5 py-8">{lines.map((line,i)=><p key={`${line.time}-${i}`} ref={i===activeIndex?activeRef:null} className={`lyric-line ${i===activeIndex?"lyric-active":""}`}>{line.text}</p>)}</div>}
      </div>
    </div>
  </div>;
}
