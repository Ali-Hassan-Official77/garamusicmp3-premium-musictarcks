"use client";

import Link from "next/link";
import { Track } from "@/lib/types";
import { usePlayer } from "./PlayerProvider";
import Icon from "./Icon";
import SafeImage from "./SafeImage";

function formatDuration(seconds: number) { const m=Math.floor((seconds||0)/60); const s=Math.floor((seconds||0)%60); return `${m}:${s.toString().padStart(2,"0")}`; }

export default function TrackCard({ track, queue }: { track: Track; queue?: Track[] }) {
 const {play,track:current,isPlaying,toggleLike,isLiked}=usePlayer(); const active=current?.id===track.id; const liked=isLiked(track.id);
 return <article className="track-card w-full">
  <div className="cover-shell group">
   <Link href={`/track/${track.id}`} aria-label={`Open ${track.title}`} className="absolute inset-0 z-[1]"/>
   <SafeImage src={track.artwork} alt={track.title} fill sizes="(max-width:640px) 44vw, 220px" className="object-cover"/>
   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
   <button type="button" aria-label={liked?`Unlike ${track.title}`:`Like ${track.title}`} onClick={()=>toggleLike(track)} className={`like-fab z-[3] ${liked?"liked text-pink-200":""}`}><Icon name="heart" size={16} strokeWidth={1.7}/></button>
   <button type="button" onClick={()=>play(track,queue)} aria-label={active&&isPlaying?`Pause ${track.title}`:`Play ${track.title}`} className="play-fab z-[3]"><Icon name={active&&isPlaying?"pause":"play"} size={17} strokeWidth={1.8}/></button>
   {active&&isPlaying&&<div className="absolute left-2.5 top-2.5 z-[2] flex items-end gap-[3px] rounded-full border border-white/10 bg-black/55 px-2 py-1.5 backdrop-blur"><i className="eq-dot"/><i className="eq-dot delay-1"/><i className="eq-dot delay-2"/></div>}
  </div>
  <Link href={`/track/${track.id}`} className="track-title">{track.title}</Link>
  <p className="track-artist">{track.artist}</p>
  <div className="mt-2 flex items-center justify-between text-[9px] text-[#625b69]"><span>{track.genre||"Independent"}</span><span>{formatDuration(track.duration)}</span></div>
 </article>;
}

export function TrackRow({track,index,queue}:{track:Track;index:number;queue?:Track[]}) {
 const {play,track:current,isPlaying,toggleLike,isLiked}=usePlayer(); const active=current?.id===track.id; const liked=isLiked(track.id);
 return <div className={`group flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 text-left transition hover:border-white/[0.06] hover:bg-white/[0.035] ${active?"bg-white/[0.03]":""}`}>
  <button onClick={()=>play(track,queue)} aria-label={`Play ${track.title}`} className="grid w-6 shrink-0 place-items-center text-[10px] text-[#6e6775]">{active&&isPlaying?<Icon name="pause" size={13}/>:<span className="group-hover:hidden">{index}</span>}{!active&&<span className="hidden group-hover:block text-[#e7a1c4]"><Icon name="play" size={13}/></span>}</button>
  <Link href={`/track/${track.id}`} className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/[0.06]"><SafeImage src={track.artwork} alt="" fill sizes="48px" className="object-cover"/></Link>
  <Link href={`/track/${track.id}`} className="min-w-0 flex-1"><p className={`truncate text-xs font-semibold ${active?"text-[#efbdcd]":"text-[#eee7ed]"}`}>{track.title}</p><p className="mt-1 truncate text-[10px] text-[#756e7d]">{track.artist}</p></Link>
  <span className="hidden text-[9px] text-[#625b69] sm:block">{track.genre}</span>
  <button onClick={()=>toggleLike(track)} aria-label={liked?"Unlike":"Like"} className={`grid h-8 w-8 place-items-center rounded-full ${liked?"text-[#e7a1c4]":"text-[#625b69] hover:text-[#ddd4dc]"}`}><Icon name="heart" size={14} strokeWidth={1.7}/></button>
  <span className="w-8 shrink-0 text-right text-[9px] text-[#625b69]">{formatDuration(track.duration)}</span>
 </div>;
}
