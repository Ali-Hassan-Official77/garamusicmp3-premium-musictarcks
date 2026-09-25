"use client";
import { useState } from "react";
import Icon from "./Icon";
const items=[
 ["What is Gara Music?","Gara Music is a music discovery and listening platform focused on independent catalogue discovery, playback and personal collections."],
 ["Where does the catalogue come from?","The current build uses Audius catalogue data and LRCLIB for lyrics. Provider attribution remains visible in the product experience."],
 ["Can Gara Music support creators or music businesses?","Yes. The information architecture leaves room for creator profiles, editorial collections, business offerings and verified contact flows."],
 ["Are reviews, registrations and contact details included?","Only verified business information should be published. This build intentionally avoids inventing registration numbers, reviews, phone numbers or customer claims."],
];
export default function FAQ(){const [open,setOpen]=useState<number|null>(0);return <div className="faq-list">{items.map(([q,a],i)=><div className={`faq-item ${open===i?"open":""}`} key={q}><button onClick={()=>setOpen(open===i?null:i)}><span>{q}</span><Icon name="plus" size={17}/></button>{open===i&&<p>{a}</p>}</div>)}</div>}
