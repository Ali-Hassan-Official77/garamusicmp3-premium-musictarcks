import Link from "next/link";
import Icon from "./Icon";

const features = [
 {icon:"compass" as const,eyebrow:"DISCOVERY",title:"A catalogue built for curiosity",text:"Move beyond the obvious with genre-led browsing, search, related tracks and focused collections."},
 {icon:"headphones" as const,eyebrow:"LISTENING",title:"A player that stays with you",text:"Keep playback, lyrics and your collection available while you move through the platform."},
 {icon:"waveform" as const,eyebrow:"CONTEXT",title:"More than a cover and a title",text:"Track pages bring together artwork, artist context, metadata and related listening in one place."},
];
const audiences = [
 {icon:"music" as const,title:"Listeners",text:"Find independent releases, save the tracks that matter and build a personal listening trail."},
 {icon:"radio" as const,title:"Creators",text:"Give releases a richer presentation with discoverability, context and a dedicated listening experience."},
 {icon:"sparkles" as const,title:"Music teams",text:"Use a polished platform layer for catalog discovery, editorial collections and audience journeys."},
];

export default function BusinessSections(){
 return <>
  <section className="business-section mx-auto max-w-7xl px-5 sm:px-8" id="platform">
   <div className="section-intro"><div><p className="section-kicker">The Gara Music platform</p><h2 className="section-title-lg">Designed like a product,<br/><em>not a demo.</em></h2></div><p className="section-intro-copy">Every part of the experience has a job: help people discover, understand, save and return to music without getting lost in the interface.</p></div>
   <div className="feature-grid">{features.map(item=><article className="feature-card" key={item.title}><div className="feature-icon"><Icon name={item.icon} size={21}/></div><p className="feature-eyebrow">{item.eyebrow}</p><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
  </section>
  <section className="business-band" id="creators"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="business-band-grid"><div><p className="section-kicker">Built for the ecosystem</p><h2 className="section-title-lg">One music layer.<br/><em>Different journeys.</em></h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#8b8392]">Gara Music can serve a listener-facing experience while leaving room for creator, editorial and business-facing workflows to grow around the same catalogue.</p><Link href="/contact" className="button-secondary mt-7">Talk about your use case <Icon name="arrow" size={15}/></Link></div><div className="audience-grid">{audiences.map(item=><div className="audience-card" key={item.title}><Icon name={item.icon} size={20}/><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></div></div></section>
  <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="proof-panel"><div><span className="proof-number">01</span><h2>Clear product architecture</h2><p>Discovery, search, library, playback and lyrics are treated as connected product surfaces instead of isolated pages.</p></div><div><span className="proof-number">02</span><h2>Resilient media experience</h2><p>Artwork failures get a deliberate fallback, loading states are visible, and remote catalogue data is handled defensively.</p></div><div><span className="proof-number">03</span><h2>Ready for real business details</h2><p>Verified contact channels, pricing, company information and operating evidence can be added without rebuilding the visual system.</p></div></div></section>
 </>;
}
