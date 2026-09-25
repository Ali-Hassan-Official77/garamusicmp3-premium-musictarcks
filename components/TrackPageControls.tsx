"use client";
import { Track } from "@/lib/types";
import { usePlayer } from "./PlayerProvider";
import Icon from "./Icon";
export default function TrackPageControls({track}:{track:Track}){const {play,track:current,isPlaying,toggleLike,isLiked}=usePlayer();const active=current?.id===track.id;const liked=isLiked(track.id);return <div className="mt-6 flex flex-wrap gap-2"><button className="button-primary" onClick={()=>play(track)}><Icon name={active&&isPlaying?"pause":"play"} size={16}/>{active&&isPlaying?"Pause":"Play track"}</button><button className={`button-secondary ${liked?"liked-control":""}`} onClick={()=>toggleLike(track)}><Icon name="heart" size={16}/>{liked?"Saved":"Save to library"}</button></div>}