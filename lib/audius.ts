import { Track } from "./types";

const APP_NAME = process.env.AUDIUS_APP_NAME || "Gara Music";
const API_KEY = process.env.AUDIUS_API_KEY || "";
const API_BASE_URL = (process.env.AUDIUS_API_BASE_URL || "").replace(/\/$/, "");
const BEARER = process.env.AUDIUS_BEARER_TOKEN || process.env.AUDIUS_Bearer_TOKEN || "";
const FALLBACK_HOSTS = ["https://discoveryprovider.audius.co", "https://audius-discovery-1.cultur3stake.com", "https://discovery-us-01.audius.openplayer.org"];
let cachedHost: { url: string; expires: number } | null = null;

async function resolveHost(): Promise<string> {
  if (API_BASE_URL) return API_BASE_URL;
  if (cachedHost && cachedHost.expires > Date.now()) return cachedHost.url;
  try {
    const res = await fetch("https://api.audius.co", { signal: AbortSignal.timeout(2500), cache: "no-store" });
    if (res.ok) {
      const hosts: string[] = (await res.json())?.data || [];
      const host = hosts.find(Boolean);
      if (host) { cachedHost = { url: host.replace(/\/$/, ""), expires: Date.now() + 15 * 60 * 1000 }; return cachedHost.url; }
    }
  } catch {}
  const fallback = FALLBACK_HOSTS[0];
  cachedHost = { url: fallback, expires: Date.now() + 2 * 60 * 1000 };
  return fallback;
}

function authHeaders(): HeadersInit {
  const headers: Record<string,string> = {};
  if (API_KEY) headers["X-API-KEY"] = API_KEY;
  if (BEARER) headers.Authorization = `Bearer ${BEARER}`;
  return headers;
}

async function audiusGet(path: string, params: Record<string,string|number> = {}) {
  const host = await resolveHost(); const normalizedPath = host.endsWith("/v1") ? path.replace(/^\/v1/, "") : path; const url = new URL(host + normalizedPath); url.searchParams.set("app_name", APP_NAME);
  Object.entries(params).forEach(([k,v])=>url.searchParams.set(k,String(v)));
  const res = await fetch(url.toString(), { headers: authHeaders(), signal: AbortSignal.timeout(7000), next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Audius request failed: ${res.status}`);
  return res.json();
}

function artworkOf(raw:any):string { const art=raw?.artwork||{}; return art["480x480"]||art["1000x1000"]||art["150x150"]||"/artwork-fallback.svg"; }
function mapTrack(raw:any):Track { return { id:raw.id, title:raw.title||"Untitled", artist:raw.user?.name||raw.user?.handle||"Unknown Artist", artistId:raw.user?.id, artwork:artworkOf(raw), duration:Number(raw.duration)||0, genre:raw.genre, playCount:raw.play_count, mood:raw.mood, releaseDate:raw.release_date, album: raw.album || raw.album_title || undefined, description: raw.description || undefined, tags: Array.isArray(raw.tags) ? raw.tags : undefined }; }

export async function getTrending(genre?:string):Promise<Track[]> { const params:Record<string,string>={limit:"24", time:"week"}; if(genre)params.genre=genre; const json=await audiusGet("/v1/tracks/trending",params); return (json.data||[]).map(mapTrack); }
export async function searchTracks(query:string,limit=30):Promise<Track[]> { if(!query.trim())return []; const json=await audiusGet("/v1/tracks/search",{query:query.trim(),limit,sort_method:"relevant"}); return (json.data||[]).slice(0,limit).map(mapTrack); }
export async function getTrack(id:string):Promise<Track|null>{ try{const json=await audiusGet(`/v1/tracks/${encodeURIComponent(id)}`);return json.data?mapTrack(json.data):null;}catch{return null;} }
export async function getStreamResponse(id:string, range?:string):Promise<Response>{
  const host=await resolveHost();
  const prefix=host.endsWith("/v1")?host:`${host}/v1`;
  const url=new URL(`${prefix}/tracks/${encodeURIComponent(id)}/stream`);
  url.searchParams.set("app_name",APP_NAME);
  if(API_KEY) url.searchParams.set("api_key",API_KEY);
  const headers=authHeaders() as Record<string,string>;
  if(range) headers.Range=range;
  const res=await fetch(url.toString(),{headers,signal:AbortSignal.timeout(15000),cache:"no-store",redirect:"follow"});
  if(!res.ok) throw new Error(`Audius stream failed: ${res.status}`);
  return res;
}
