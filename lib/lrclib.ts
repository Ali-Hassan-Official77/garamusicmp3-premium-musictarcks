import { LyricsResult } from "./types";

const BASE_URL = "https://lrclib.net/api";
const USER_AGENT = process.env.LRCLIB_USER_AGENT || "Gara Music/1.0 (music discovery app)";
const cache = new Map<string, { value: LyricsResult; expires: number }>();

function headers(): HeadersInit { return { "User-Agent": USER_AGENT, "Lrclib-Client": USER_AGENT, Accept: "application/json" }; }
function normalize(v = "") {
  return v.toLowerCase()
    .replace(/\([^)]*\)|\[[^\]]*\]/g, " ")
    .replace(/\b(feat\.?|ft\.?|featuring)\b.*$/i, " ")
    .replace(/[^a-z0-9]+/g, " ").trim();
}
function variants(value: string) {
  const clean = value.trim();
  const noDecor = clean.replace(/\s*[\(\[].*?[\)\]]/g, "").trim();
  const beforeFeat = noDecor.replace(/\s+(feat\.?|ft\.?|featuring)\s+.*/i, "").trim();
  return [...new Set([clean, noDecor, beforeFeat].filter(Boolean))];
}
function score(rec: any, title: string, artist: string, duration?: number) {
  const rt = normalize(rec.trackName || rec.name);
  const ra = normalize(rec.artistName || rec.artist);
  const tt = normalize(title), ta = normalize(artist);
  let n = 0;
  if (rt === tt) n += 12; else if (rt.includes(tt) || tt.includes(rt)) n += 7;
  if (ra === ta) n += 12; else if (ra.includes(ta) || ta.includes(ra)) n += 7;
  if (duration && rec.duration) {
    const diff = Math.abs(Number(rec.duration) - duration);
    if (diff <= 2) n += 6; else if (diff <= 8) n += 4; else if (diff <= 20) n += 2;
  }
  if (rec.syncedLyrics) n += 1;
  if (rec.plainLyrics) n += 1;
  return n;
}
function result(rec: any, title: string, artist: string, duration?: number): LyricsResult {
  return {
    found: Boolean(rec),
    synced: rec?.syncedLyrics || null,
    plain: rec?.plainLyrics || null,
    instrumental: !!rec?.instrumental,
    source: "LRCLIB",
    match: { title: rec?.trackName || rec?.name, artist: rec?.artistName, score: score(rec, title, artist, duration) }
  };
}
async function request(url: URL) {
  const res = await fetch(url, { headers: headers(), signal: AbortSignal.timeout(8000), cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
export async function getLyrics(trackName: string, artistName: string, albumName?: string, duration?: number): Promise<LyricsResult> {
  const key = `${normalize(trackName)}|${normalize(artistName)}|${Math.round(duration || 0)}`;
  const hit = cache.get(key); if (hit && hit.expires > Date.now()) return hit.value;

  const titles = variants(trackName);
  const artists = variants(artistName);
  let candidates: any[] = [];

  // Exact-ish requests first, but try title/artist variants and nearby durations.
  for (const title of titles.slice(0, 3)) {
    for (const artist of artists.slice(0, 2)) {
      const url = new URL(`${BASE_URL}/get`);
      url.searchParams.set("track_name", title);
      url.searchParams.set("artist_name", artist);
      if (albumName) url.searchParams.set("album_name", albumName);
      if (duration && duration > 0) url.searchParams.set("duration", String(Math.round(duration)));
      try { const data = await request(url); if (data) candidates.push(data); } catch {}
    }
  }

  // Search with structured fields AND free-text fallback. Search results are intentionally
  // scored locally because Audius metadata and LRCLIB metadata often differ slightly.
  const searches: Array<[string, string]> = [];
  for (const title of titles.slice(0, 3)) {
    searches.push(["track_name", title]);
    searches.push(["q", `${title} ${artists[0] || artistName}`]);
  }
  for (const [field, value] of searches) {
    const url = new URL(`${BASE_URL}/search`);
    url.searchParams.set(field, value);
    if (field === "track_name" && artists[0]) url.searchParams.set("artist_name", artists[0]);
    try { const data = await request(url); if (Array.isArray(data)) candidates.push(...data); } catch {}
  }

  const unique = new Map<string, any>();
  for (const rec of candidates) if (rec?.id) unique.set(String(rec.id), rec);
  const ranked = [...unique.values()].sort((x, y) => score(y, trackName, artistName, duration) - score(x, trackName, artistName, duration));
  const best = ranked[0];
  const bestScore = best ? score(best, trackName, artistName, duration) : 0;

  // A title match can still be useful even when the Audius artist field is noisy.
  const titleMatched = best && normalize(best.trackName || best.name) === normalize(trackName);
  const out = best && (bestScore >= 10 || titleMatched) ? result(best, trackName, artistName, duration) : { found: false, source: "LRCLIB" };
  cache.set(key, { value: out, expires: Date.now() + (out.found ? 6 * 60 * 60 * 1000 : 10 * 60 * 1000) });
  return out;
}