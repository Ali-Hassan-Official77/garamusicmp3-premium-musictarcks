export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  artwork: string;
  duration: number;
  album?: string;
  genre?: string;
  playCount?: number;
  mood?: string;
  releaseDate?: string;
  description?: string;
  tags?: string[];
}
export interface LyricsResult {
  found: boolean;
  synced?: string | null;
  plain?: string | null;
  instrumental?: boolean;
  source?: string;
  match?: { title?: string; artist?: string; score?: number };
}
export interface LyricLine { time: number; text: string; }
