"use client";

import SafeImage from "./SafeImage";
import Link from "next/link";
import { Track } from "@/lib/types";
import TrackCard from "./TrackCard";
import { usePlayer } from "./PlayerProvider";
import Icon from "./Icon";

function FeaturedCard({ track, queue }: { track: Track; queue: Track[] }) {
  const { play, track: current, isPlaying } = usePlayer();
  const active = current?.id === track.id;
  return <article className="featured-card group">
    <SafeImage src={track.artwork} alt={track.title} fill sizes="310px" className="object-cover" priority />
    <div className="featured-overlay" />
    <div className="featured-content">
      <span className="featured-pill">Spotlight · {track.genre || "Independent"}</span>
      <Link href={`/track/${track.id}`} className="featured-title">{track.title}</Link>
      <p className="featured-meta">{track.artist}</p>
      <button onClick={() => play(track, queue)} className="featured-button">{active && isPlaying ? <><Icon name="pause" size={13}/> Playing</> : <><Icon name="play" size={13}/> Play now</>}</button>
    </div>
  </article>;
}

export default function TrackRail({ title, tracks, eyebrow = "Curated for you" }: { title: string; tracks: Track[]; eyebrow?: string }) {
  if (!tracks.length) return null;
  const [first, ...rest] = tracks;
  return <section className="section-shell animate-rise">
    <div className="mx-auto mb-4 flex max-w-7xl items-end justify-between px-5 sm:px-8"><div><p className="section-kicker">{eyebrow}</p><h2 className="section-title mt-1">{title}</h2></div><span className="hidden text-[9px] text-[#625b69] sm:block">{tracks.length} tracks · swipe to explore</span></div>
    <div className="rail-wrap mx-auto max-w-[1400px] px-5 sm:px-8">
      <FeaturedCard track={first} queue={tracks} />
      {rest.map((track) => <div key={track.id} className="w-[155px] shrink-0 sm:w-[172px]"><TrackCard track={track} queue={tracks} /></div>)}
    </div>
  </section>;
}
