import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import TrackRail from "@/components/TrackRail";
import Icon from "@/components/Icon";
import SafeImage from "@/components/SafeImage";
import { getTrending } from "@/lib/audius";
import type { Track } from "@/lib/types";

export const revalidate = 60;

const genres = [
  ["Pop","Pop","sparkles"],["Hip-Hop","Hip-Hop/Rap","radio"],["Electronic","Electronic","waveform"],["R&B","R&B","music"],
  ["House","House","disc"],["Rock","Rock","radio"],["Jazz","Jazz","waveform"],["Lo-fi","Lo-Fi","headphones"]
] as const;

function uniqueArtists(tracks: Track[]) {
  const seen = new Set<string>();
  return tracks.filter(t => { const k=t.artistId||t.artist; if(seen.has(k)) return false; seen.add(k); return true; }).slice(0,6);
}
function uniqueAlbums(tracks: Track[]) {
  const seen = new Set<string>();
  return tracks.filter(t => { const k=t.album||t.id; if(seen.has(k)) return false; seen.add(k); return true; }).slice(0,8);
}
function duration(sec:number){ const m=Math.floor((sec||0)/60); const s=Math.floor((sec||0)%60).toString().padStart(2,"0"); return `${m}:${s}`; }

export default async function HomePage() {
  const [trending,electronic,hiphop,pop,rnb,house] = await Promise.all([
    getTrending().catch(()=>[]), getTrending("Electronic").catch(()=>[]), getTrending("Hip-Hop/Rap").catch(()=>[]),
    getTrending("Pop").catch(()=>[]), getTrending("R&B").catch(()=>[]), getTrending("House").catch(()=>[])
  ]);
  const artists=uniqueArtists(trending); const albums=uniqueAlbums(trending); const topSongs=trending.slice(0,8);
  return <div className="home">
    <section className="replay-hero">
      <div className="replay-glow"/><div className="replay-orb replay-orb-one"/><div className="replay-orb replay-orb-two"/>
      <div className="replay-inner">
        <div className="replay-topline"><span>GARA MUSIC</span><span>LIVE CATALOGUE · AUDIOUS</span></div>
        <div className="replay-heading"><div><p className="eyebrow bright">Your listening space</p><h1>Music that<br/><em>feels like yours.</em></h1><p className="hero-description">Discover independent sounds, keep your favourites close, and let every next track feel effortless.</p></div><div className="hero-search"><SearchBar large/><div className="hero-tags"><Link href="/search?genre=Pop">Pop</Link><Link href="/search?genre=Hip-Hop%2FRap">Hip-Hop</Link><Link href="/search?genre=Electronic">Electronic</Link><Link href="/search?genre=R%26B">R&amp;B</Link></div></div></div>
        <div className="replay-proof"><span><i/> Real-time discovery</span><span><i/> Persistent player</span><span><i/> Private browser library</span></div>
      </div>
    </section>

    <main className="content-wrap">
      <section className="replay-section">
        <div className="section-heading"><div><p className="eyebrow">Explore the people</p><h2>Your Top Artists</h2></div><Link href="/search" className="section-link">See all <Icon name="arrow" size={14}/></Link></div>
        <div className="artist-rail">{artists.map((a,i)=><Link href={`/search?q=${encodeURIComponent(a.artist)}`} className="artist-card" key={a.artistId||a.artist}><div className="artist-number">{i+1}</div><SafeImage src={a.artwork} alt={a.artist} fill sizes="260px" className="object-cover"/><div className="artist-shade"/><div className="artist-meta"><strong>{a.artist}</strong><span>{a.genre||"Independent"}</span></div></Link>)}</div>
      </section>

      <section className="replay-section">
        <div className="section-heading"><div><p className="eyebrow">A real-time snapshot</p><h2>Your Top Songs</h2></div><span className="section-caption">Trending this week</span></div>
        <div className="song-columns">{[topSongs.slice(0,4),topSongs.slice(4,8)].map((col,c)=><div className="song-list" key={c}>{col.map((t,i)=><Link href={`/track/${t.id}`} className="song-row" key={t.id}><span className="song-index">{c*4+i+1}</span><span className="song-art"><SafeImage src={t.artwork} alt="" fill sizes="46px" className="object-cover"/></span><span className="song-copy"><strong>{t.title}</strong><small>{t.artist} · {duration(t.duration)}</small></span><span className="song-more"><Icon name="chevron" size={15}/></span></Link>)}</div>)}</div>
      </section>

      <section className="replay-section">
        <div className="section-heading"><div><p className="eyebrow">The artwork wall</p><h2>Your Top Albums</h2></div><Link href="/search" className="section-link">Browse catalogue <Icon name="arrow" size={14}/></Link></div>
        <div className="album-rail">{albums.map((t,i)=><Link href={`/track/${t.id}`} className="album-card" key={t.id}><div className="album-art"><SafeImage src={t.artwork} alt={t.album||t.title} fill sizes="180px" className="object-cover"/><span>{i+1}</span></div><strong>{t.album||t.title}</strong><small>{t.artist}</small></Link>)}</div>
      </section>

      <section className="genre-section"><div className="section-heading"><div><p className="eyebrow">Choose a direction</p><h2>Browse by mood.</h2></div></div><div className="genre-grid">{genres.map(([name,q,icon])=><Link key={name} href={`/search?genre=${encodeURIComponent(q)}`} className="genre-tile"><span><Icon name={icon} size={18}/></span><strong>{name}</strong><small>Explore {name.toLowerCase()}</small><Icon name="arrow" size={14}/></Link>)}</div></section>

      <TrackRail title="Trending now" tracks={trending} eyebrow="What listeners are finding"/>
      <TrackRail title="Electronic after dark" tracks={electronic} eyebrow="Pulse · texture · movement"/>
      <TrackRail title="Hip-hop signals" tracks={hiphop} eyebrow="Bars · bass · momentum"/>
      <TrackRail title="Pop rotation" tracks={pop} eyebrow="Hooks · colour · replay"/>
      <TrackRail title="R&B slow burn" tracks={rnb} eyebrow="Soul · space · late hours"/>
      <TrackRail title="House frequency" tracks={house} eyebrow="Groove · motion · night"/>

      {!trending.length&&<div className="empty-state"><Icon name="radio" size={25}/><h3>The catalogue is waking up.</h3><p>Add your Audius credentials in <code>.env.local</code> and refresh.</p></div>}
    </main>
  </div>;
}
