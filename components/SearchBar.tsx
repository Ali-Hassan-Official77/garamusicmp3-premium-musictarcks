"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
export default function SearchBar({large=false}:{large?:boolean}) {
 const router=useRouter(); const [query,setQuery]=useState("");
 function submit(e:FormEvent){e.preventDefault();const q=query.trim();router.push(q?`/search?q=${encodeURIComponent(q)}`:"/search")}
 return <form onSubmit={submit} className={`search-shell ${large?"search-shell-large":""}`}><Icon name="search" size={19} className="shrink-0 text-muted"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search songs, artists, genres…"/><button className="search-submit">Search</button></form>
}