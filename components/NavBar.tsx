"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Discover" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f=()=>setScrolled(window.scrollY>10); f(); window.addEventListener("scroll",f,{passive:true}); return()=>window.removeEventListener("scroll",f); }, []);
  useEffect(() => setOpen(false), [pathname]);
  const active=(href:string)=>href==="/"?pathname==="/":pathname.startsWith(href);
  return <header className={`site-nav ${scrolled?"scrolled":""}`}>
    <div className="site-nav-inner">
      <Link href="/" className="site-nav-logo"><Logo/></Link>
      <nav className="site-nav-links">{links.map(l=><Link key={l.href} href={l.href} className={`site-nav-link ${active(l.href)?"active":""}`}>{l.label}</Link>)}</nav>
      <div className="site-nav-actions">
        <Link href="/search" className="site-nav-search"><Icon name="search" size={15}/><span>Search</span><kbd>⌘K</kbd></Link>
        <ThemeToggle/>
        <Link href="/pricing" className="nav-cta">For business <Icon name="arrow" size={13}/></Link>
        <button className="site-nav-menu" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu"><Icon name={open?"close":"menu"} size={18}/></button>
      </div>
    </div>
    {open&&<div className="mobile-nav-panel"><div className="mobile-nav-grid">{links.map(l=><Link key={l.href} href={l.href} className={active(l.href)?"active":""}>{l.label}<Icon name="arrow" size={14}/></Link>)}<Link href="/pricing" className="mobile-business">Business services <Icon name="arrow" size={14}/></Link><div className="mobile-theme"><ThemeToggle/></div></div></div>}
  </header>;
}
