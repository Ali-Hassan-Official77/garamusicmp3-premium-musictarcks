"use client";

import { Track } from "@/lib/types";
import TrackCard from "./TrackCard";

export default function TrackGrid({ tracks }: { tracks: Track[] }) {
  if (!tracks.length) return null;
  return <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {tracks.map((track) => <TrackCard key={track.id} track={track} queue={tracks} />)}
  </div>;
}
