import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Sora } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import PlayerBar from "@/components/PlayerBar";
import LyricsPanel from "@/components/LyricsPanel";
import PlayerProvider from "@/components/PlayerProvider";
import SiteFooter from "@/components/SiteFooter";

const display=Instrument_Serif({subsets:["latin"],weight:["400"],style:["italic","normal"],variable:"--font-display"});
const body=Sora({subsets:["latin"],weight:["300","400","500","600","700"],variable:"--font-body"});
export const metadata:Metadata={title:"Gara Music — Discover what moves you",description:"Gara Music is a premium music discovery and listening experience powered by Audius.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en" className={`${display.variable} ${body.variable}`}><body><PlayerProvider><div className="app-shell"><NavBar/><main className="page-content">{children}</main><SiteFooter/><PlayerBar/><LyricsPanel/></div></PlayerProvider>

<script src="https://cdn.zanderio.ai/widget/loader.js" data-id="wdg_nNJgWixLBZOf9BZDjUWCaTTG" defer></script>
</body></html>}
