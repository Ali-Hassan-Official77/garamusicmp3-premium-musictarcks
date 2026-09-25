"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

type Track = {
  id: string;
  title: string;
  artist: string;
  artwork: string | null;
  genre: string | null;
  playCount: number;
};

function formatPlays(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export default function Hero3D() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty">("loading");
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/audius/trending")
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        const list: Track[] = json?.tracks ?? [];
        setTracks(list);
        setStatus(list.length ? "ready" : "empty");
      })
      .catch(() => !cancelled && setStatus("empty"));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (tracks.length < 2) return;
    const id = window.setInterval(() => {
      setSpotlightIndex((i) => (i + 1) % Math.min(tracks.length, 5));
    }, 6000);
    return () => window.clearInterval(id);
  }, [tracks]);

  function togglePreview(track: Track) {
    const audio = audioRef.current;
    if (!audio) return;
    if (playingId === track.id) {
      audio.pause();
      setPlayingId(null);
      return;
    }
    audio.src = `/api/audius/stream/${track.id}`;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setPlayingId(track.id);
  }

  const spotlight = tracks[spotlightIndex];
  const rail = tracks.filter((_, i) => i !== spotlightIndex).slice(0, 5);

  return (
    <div className="hero-trending">
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} className="hidden" />

      <div className="hero-ambient hero-ambient-cyan" />
      <div className="hero-ambient hero-ambient-purple" />
      <div className="hero-ambient hero-ambient-pink" />

      {status === "loading" && <HeroSkeleton />}

      {status === "empty" && (
        <div className="hero-trending-empty">
          <Icon name="waveform" size={22} />
          <p>Trending tracks abhi load nahi ho rahe. Thodi der mein refresh karo.</p>
        </div>
      )}

      {status === "ready" && spotlight && (
        <div className="hero-trending-layout">
          <div className="hero-spotlight" key={spotlight.id}>
            <div className="hero-spotlight-art">
              {spotlight.artwork ? (
                <img src={spotlight.artwork} alt={spotlight.title} />
              ) : (
                <div className="hero-spotlight-art-fallback">
                  <Icon name="disc" size={40} />
                </div>
              )}
              <button
                type="button"
                className="hero-spotlight-play"
                onClick={() => togglePreview(spotlight)}
                aria-label={playingId === spotlight.id ? `Pause ${spotlight.title}` : `Preview ${spotlight.title}`}
              >
                <Icon name={playingId === spotlight.id ? "pause" : "play"} size={20} />
              </button>
            </div>
            <div className="hero-spotlight-meta">
              <span className="hero-spotlight-kicker">
                <i className="hero-live-dot" /> Trending now on Audius
              </span>
              <h2>{spotlight.title}</h2>
              <p>
                {spotlight.artist}
                {spotlight.genre ? ` · ${spotlight.genre}` : ""}
              </p>
              <span className="hero-spotlight-plays">{formatPlays(spotlight.playCount)} plays</span>
            </div>
          </div>

          <div className="hero-rail" role="list" aria-label="More trending tracks">
            {rail.map((track, i) => (
              <button key={track.id} type="button" role="listitem" className="hero-rail-item" onClick={() => togglePreview(track)}>
                <span className="hero-rail-rank">{String(i + 2).padStart(2, "0")}</span>
                <span className="hero-rail-art">
                  {track.artwork ? <img src={track.artwork} alt="" /> : <Icon name="disc" size={16} />}
                </span>
                <span className="hero-rail-meta">
                  <b>{track.title}</b>
                  <small>{track.artist}</small>
                </span>
                <span className="hero-rail-toggle">
                  <Icon name={playingId === track.id ? "pause" : "play"} size={13} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="hero-trending-skeleton" aria-hidden="true">
      <div className="hero-skeleton-spotlight" />
      <div className="hero-skeleton-rail">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="hero-skeleton-row" />
        ))}
      </div>
    </div>
  );
}