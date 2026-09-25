import Link from "next/link";
import Icon from "./Icon";
import Logo from "./Logo";

const columns=[
  {title:"Explore",links:[["Discover","/search"],["Library","/library"],["About","/about"],["Plans","/pricing"]]},
  {title:"Gara",links:[["Contact","/contact"],["FAQ","/about#faq"],["Privacy","/contact#privacy"],["Terms","/contact#terms"]]},
];
export default function SiteFooter(){return <footer className="site-footer"><div className="footer-glow"/><div className="footer-inner">
  <div className="footer-cta"><div><p className="eyebrow">GARA MUSIC · DISCOVERY PLATFORM</p><h2>Keep the next song<br/><em>worth pressing play for.</em></h2></div><Link href="/search" className="footer-cta-button">Explore music <Icon name="arrow" size={14}/></Link></div>
  <div className="footer-main"><div className="footer-brand"><Link href="/"><Logo/></Link><p>Premium music discovery with a persistent player, real catalogue data and a focused listening experience.</p><div className="footer-status"><i/> Audius catalogue connected</div></div>
  <div className="footer-columns">{columns.map(c=><div key={c.title}><p className="footer-heading">{c.title}</p><div className="footer-links">{c.links.map(([l,h])=><Link key={h} href={h}>{l}</Link>)}</div></div>)}</div>
  <aside className="footer-contact"><span className="footer-contact-icon"><Icon name="mail" size={19}/></span><p>Traditional tracks</p><a href="mailto:garatraditionaltracks@garamuisc.com">garatraditionaltracks@garamuisc.com</a><small>For business, catalogue and general enquiries.</small></aside></div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} Gara Music. All rights reserved.</span><span>Powered by <a href="https://silverloft.me/" target="_blank" rel="noreferrer">@silverloft</a></span><span>Audius · LRCLIB</span></div>
</div></footer>}
