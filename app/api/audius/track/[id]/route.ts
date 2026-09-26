import { NextRequest, NextResponse } from "next/server";
import { getTrack } from "@/lib/audius";
export const runtime = 'edge';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const track = await getTrack(id);
  if (!track) return NextResponse.json({ error: "Track not found" }, { status: 404 });
  return NextResponse.json({ track });
}
