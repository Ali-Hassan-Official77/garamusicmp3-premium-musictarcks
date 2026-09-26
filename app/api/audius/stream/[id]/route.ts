import { getStreamResponse } from "@/lib/audius";
export const runtime = 'edge';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const upstream = await getStreamResponse(id, _req.headers.get("range") || undefined);
    const headers = new Headers();
    const contentType = upstream.headers.get("content-type");
    const contentLength = upstream.headers.get("content-length");
    const contentRange = upstream.headers.get("content-range");
    if (contentType) headers.set("content-type", contentType);
    if (contentLength) headers.set("content-length", contentLength);
    if (contentRange) headers.set("content-range", contentRange);
    headers.set("cache-control", "no-store");
    headers.set("accept-ranges", "bytes");
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch {
    return Response.json({ error: "Stream unavailable" }, { status: 502 });
  }
}
