"use client";

import { useEffect, useState } from "react";
import TrackGrid from "@/components/TrackGrid";
import { getLikedTracksFromStorage } from "@/components/PlayerProvider";
import { Track } from "@/lib/types";
export const runtime = 'edge';

export default function LibraryPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  useEffect(() => {
    const load = () => setTracks(getLikedTracksFromStorage());
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);
  return <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
    <section className="library-hero">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><div className="library-icon"><svg width="23" height="23" viewBox="0 0 24 24" fill="none"><path d="M20 7.5v8.8a3 3 0 0 1-3 3h-1.2a2.3 2.3 0 1 1 0-4.6H17V6.8L8 9.1v8.2a3 3 0 0 1-3 3H3.8a2.3 2.3 0 1 1 0-4.6H5V6.8L20 3v4.5Z" fill="currentColor"/></svg></div><p className="section-kicker mt-5">Your private collection</p><h1 className="mt-1 font-display text-5xl italic tracking-[-.04em] text-[#f7f1e7]">Liked songs</h1><p className="mt-2 max-w-lg text-xs leading-6 text-[#817989]">Every track you heart stays in this browser, ready to become your personal little soundtrack.</p></div><span className="text-[10px] text-[#746d7c]">{tracks.length} saved track{tracks.length === 1 ? "" : "s"}</span></div>
    </section>
    <section className="mt-10">{tracks.length ? <TrackGrid tracks={tracks}/> : <div className="empty-state"><p className="font-display text-3xl italic text-[#eee7ed]">Nothing saved yet.</p><p className="mt-2 text-xs text-[#746d7c]">Tap the heart on any track and it will appear here.</p></div>}</section>
  </main>;
}
