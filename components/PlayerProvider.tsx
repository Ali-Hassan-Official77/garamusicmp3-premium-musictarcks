"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Track } from "@/lib/types";

interface PlayerContextValue {
  track: Track | null;
  queue: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  lyricsOpen: boolean;
  likedIds: string[];
  play: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  next: () => void;
  prev: () => void;
  toggleLike: (track?: Track) => void;
  isLiked: (id: string) => boolean;
  setLyricsOpen: (open: boolean) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);
const LIKES_KEY = "gara-liked-v1";
const TRACKS_KEY = "gara-liked-tracks-v1";

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}

export default function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.82);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LIKES_KEY) || "[]");
      if (Array.isArray(stored)) setLikedIds(stored.filter((x) => typeof x === "string"));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(LIKES_KEY, JSON.stringify(likedIds)); } catch {}
  }, [likedIds]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = volume;
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => nextRef.current();
    const onError = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onDuration);
    audio.addEventListener("durationchange", onDuration);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onDuration);
      audio.removeEventListener("durationchange", onDuration);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = useCallback((newTrack: Track, newQueue?: Track[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (newQueue?.length) setQueue(newQueue);
    setTrack(newTrack);
    setCurrentTime(0);
    setDuration(newTrack.duration || 0);
    audio.src = `/api/audius/stream/${encodeURIComponent(newTrack.id)}`;
    audio.load();
    void audio.play().catch(() => setIsPlaying(false));
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (audio.paused) void audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, [track]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || time));
    setCurrentTime(audio.currentTime);
  }, []);

  const setVolume = useCallback((v: number) => {
    const nextVolume = Math.max(0, Math.min(1, v));
    if (audioRef.current) audioRef.current.volume = nextVolume;
    setVolumeState(nextVolume);
  }, []);

  const next = useCallback(() => {
    if (!track || queue.length < 2) return;
    const idx = queue.findIndex((t) => t.id === track.id);
    play(queue[(idx + 1) % queue.length], queue);
  }, [play, queue, track]);

  const prev = useCallback(() => {
    if (!track || queue.length < 2) return;
    const idx = queue.findIndex((t) => t.id === track.id);
    if (currentTime > 5) { seek(0); return; }
    play(queue[(idx - 1 + queue.length) % queue.length], queue);
  }, [currentTime, play, queue, seek, track]);

  const nextRef = useRef(next);
  useEffect(() => { nextRef.current = next; }, [next]);

  const toggleLike = useCallback((target?: Track) => {
    const item = target || track;
    if (!item) return;
    setLikedIds((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]);
    try {
      const stored: Track[] = JSON.parse(localStorage.getItem(TRACKS_KEY) || "[]");
      const exists = stored.some((t) => t.id === item.id);
      const nextTracks = exists ? stored.filter((t) => t.id !== item.id) : [item, ...stored].slice(0, 100);
      localStorage.setItem(TRACKS_KEY, JSON.stringify(nextTracks));
    } catch {}
  }, [track]);

  const isLiked = useCallback((id: string) => likedIds.includes(id), [likedIds]);

  return (
    <PlayerContext.Provider value={{ track, queue, isPlaying, currentTime, duration, volume, lyricsOpen, likedIds, play, togglePlay, seek, setVolume, next, prev, toggleLike, isLiked, setLyricsOpen }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function getLikedTracksFromStorage(): Track[] {
  if (typeof window === "undefined") return [];
  try {
    const tracks = JSON.parse(localStorage.getItem(TRACKS_KEY) || "[]");
    return Array.isArray(tracks) ? tracks : [];
  } catch { return []; }
}
