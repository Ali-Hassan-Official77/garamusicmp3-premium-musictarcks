import { NextRequest, NextResponse } from "next/server";
import { searchTracks } from "@/lib/audius";
export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  if (!q.trim()) return NextResponse.json({ tracks: [] });

  try {
    const tracks = await searchTracks(q);
    return NextResponse.json({ tracks });
  } catch (err) {
    return NextResponse.json({ tracks: [], error: "Search failed" }, { status: 502 });
  }
}
