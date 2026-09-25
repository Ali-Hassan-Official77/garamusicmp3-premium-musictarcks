# GARA MUSIC

Premium responsive music discovery and listening interface built with Next.js, React and Audius.

## Setup

1. Install dependencies with `npm install`.
2. Create `.env.local` from `.env.example`.
3. Add your Audius credentials:

```env
AUDIUS_API_KEY=
AUDIUS_BEARER_TOKEN=
AUDIUS_API_BASE_URL=https://api.audius.co/v1
AUDIUS_APP_NAME=Gara Music
```

4. Run `npm run dev`.
5. Production build: `npm run build`.

The Audius credentials stay server-side. The app exposes search, trending, track detail and streaming routes through Next.js API routes.

## Included

- Gara Music premium replay-inspired home interface
- Responsive desktop/tablet/mobile navigation
- Dark/light mode with persisted preference
- Audius-powered trending, genre browsing, search and track playback
- Persistent audio player, queue navigation, seek and volume controls
- Local browser library with liked tracks
- Lyrics panel through LRCLIB
- Premium footer with Gara contact email and Silverloft credit
- SVG logo and favicon
