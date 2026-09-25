import { NextRequest, NextResponse } from "next/server";
import { getTrending } from "@/lib/audius";

export async function GET(req: NextRequest) {
  const genre = req.nextUrl.searchParams.get("genre") || undefined;
  try {
    const tracks = await getTrending(genre);
    return NextResponse.json({ tracks });
  } catch (err) {
    return NextResponse.json({ tracks: [], error: "Could not load trending tracks" }, { status: 502 });
  }
}
