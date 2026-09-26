"use client";

import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TrackGrid from "@/components/TrackGrid";
import Icon from "@/components/Icon";
import { Track } from "@/lib/types";
export const runtime = 'edge';

const genres = ["All", "Electronic", "Hip-Hop/Rap", "Pop", "R&B", "Lo-Fi", "House", "Rock", "Jazz"];

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><div className="h-10 w-64 animate-pulse rounded bg-white/[0.04]" /></main>}>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const params = useSearchParams();
  const router = useRouter();
  const urlQuery = params.get("q") || "";
  const urlGenre = params.get("genre") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    const q = urlQuery.trim();
    const genre = urlGenre.trim();

    if (!q && !genre) {
      setTracks([]);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");

    async function load() {
      try {
        const endpoint = q
          ? `/api/audius/search?q=${encodeURIComponent(q)}`
          : `/api/audius/trending?genre=${encodeURIComponent(genre)}`;
        const response = await fetch(endpoint, { signal: controller.signal, cache: "no-store" });
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        if (controller.signal.aborted) return;
        setTracks(Array.isArray(data.tracks) ? data.tracks : []);
        setStatus("done");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!controller.signal.aborted) {
          setTracks([]);
          setStatus("error");
        }
      }
    }

    void load();
    return () => controller.abort();
  }, [urlQuery, urlGenre]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const q = inputRef.current?.value.trim() || "";
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  function chooseGenre(value: string) {
    router.push(value === "All" ? "/search" : `/search?genre=${encodeURIComponent(value)}`);
  }

  const heading = urlGenre
    ? `${urlGenre} sounds`
    : urlQuery
      ? `Results for “${urlQuery}”`
      : "Find your next favorite";

  const selectedGenre = urlGenre || "All";

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="search-page-head">
        <div>
          <p className="section-kicker">Catalogue search</p>
          <h1 className="mt-2 font-display text-5xl italic tracking-[-.04em] text-[#f7f1e7] sm:text-6xl">{heading}</h1>
          <p className="mt-3 max-w-xl text-xs leading-6 text-[#817989]">Search by title, artist or genre, then open any result for the full listening surface.</p>
        </div>
        <div className="search-page-note"><Icon name="compass" size={17} /><span>Independent catalogue</span></div>
      </div>

      <form onSubmit={submit} className="search-shell search-shell-large mt-8">
        <Icon name="search" size={19} className="shrink-0 text-muted" />
        <input ref={inputRef} key={urlQuery} defaultValue={urlQuery} placeholder="Search songs, artists, genres…" aria-label="Search songs, artists and genres" />
        <button type="submit" className="search-submit">Search</button>
      </form>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Browse genres">
        {genres.map((item) => (
          <button type="button" key={item} onClick={() => chooseGenre(item)} className={`search-chip whitespace-nowrap ${selectedGenre === item ? "selected" : ""}`}>
            {item}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {status === "idle" && (
          <div className="empty-state">
            <div className="empty-icon"><Icon name="search" size={22} /></div>
            <p className="font-display text-3xl italic text-[#eee7ed]">Search the catalogue.</p>
            <p className="mt-2 text-xs text-[#746d7c]">Try an artist, a song title, or choose a genre above.</p>
          </div>
        )}

        {status === "loading" && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square rounded-2xl bg-[#15111b]" />
                <div className="mt-3 h-3 w-3/4 rounded bg-[#15111b]" />
                <div className="mt-2 h-2.5 w-1/2 rounded bg-[#15111b]" />
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="empty-state">
            <div className="empty-icon"><Icon name="radio" size={22} /></div>
            <p className="font-display text-3xl italic text-[#eee7ed]">Discovery hit a small bump.</p>
            <p className="mt-2 text-xs text-[#746d7c]">The catalogue provider may be temporarily unavailable or rate-limited.</p>
          </div>
        )}

        {status === "done" && !tracks.length && (
          <div className="empty-state">
            <p className="font-display text-3xl italic text-[#eee7ed]">No tracks found.</p>
            <p className="mt-2 text-xs text-[#746d7c]">Try a broader title, artist or another genre.</p>
          </div>
        )}

        {status === "done" && tracks.length > 0 && <TrackGrid tracks={tracks} />}
      </div>

      <div className="mt-14 grid gap-3 border-t border-white/[0.05] pt-8 sm:grid-cols-3">
        <div className="mini-info"><Icon name="music" size={16} /><span>Search titles & artists</span></div>
        <div className="mini-info"><Icon name="waveform" size={16} /><span>Browse by sound</span></div>
        <div className="mini-info"><Icon name="library" size={16} /><span>Save to your library</span></div>
      </div>
    </main>
  );
}
