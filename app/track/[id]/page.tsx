import SafeImage from "@/components/SafeImage";
import { notFound } from "next/navigation";
import { getTrack, getTrending } from "@/lib/audius";
import TrackGrid from "@/components/TrackGrid";
import TrackPageControls from "@/components/TrackPageControls";

export const revalidate = 120;
export const runtime = 'edge';

export default async function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const track = await getTrack(id);
  if (!track) notFound();

  const related = await getTrending(track.genre).catch(() => []);

  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
        <div className="relative aspect-square w-full max-w-xs shrink-0 overflow-hidden rounded-3xl bg-surface shadow-card">
          <SafeImage src={track.artwork} alt={track.title} fill sizes="320px" className="object-cover" priority />
        </div>
        <div className="min-w-0">
          {track.genre && <p className="font-body text-xs uppercase tracking-widest text-gold/80">{track.genre}</p>}
          <h1 className="mt-2 text-balance font-display italic text-4xl leading-tight text-cream sm:text-5xl">
            {track.title}
          </h1>
          <p className="mt-3 font-body text-lg text-muted">{track.artist}</p>
          <TrackPageControls track={track} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-display italic text-2xl text-cream">More like this</h2>
          <TrackGrid tracks={related.filter((t) => t.id !== track.id).slice(0, 10)} />
        </section>
      )}
    </div>
  );
}
