import { NextRequest, NextResponse } from "next/server";
import { getLyrics } from "@/lib/lrclib";

export async function GET(req: NextRequest) {
  const track = req.nextUrl.searchParams.get("track")?.trim() || "";
  const artist = req.nextUrl.searchParams.get("artist")?.trim() || "";
  const album = req.nextUrl.searchParams.get("album")?.trim() || undefined;
  const durationRaw = req.nextUrl.searchParams.get("duration");
  const duration = durationRaw && Number.isFinite(Number(durationRaw)) ? Number(durationRaw) : undefined;
  if (!track || !artist) return NextResponse.json({ found: false, error: "track and artist are required" }, { status: 400, headers: { "Cache-Control": "public, max-age=60" } });
  const result = await getLyrics(track, artist, album, duration);
  return NextResponse.json(result, { headers: { "Cache-Control": "public, max-age=900, stale-while-revalidate=3600" } });
}
