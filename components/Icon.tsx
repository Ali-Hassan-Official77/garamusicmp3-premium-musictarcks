import type { ReactNode } from "react";

type Name =
  | "search"
  | "menu"
  | "close"
  | "music"
  | "headphones"
  | "compass"
  | "library"
  | "heart"
  | "play"
  | "pause"
  | "next"
  | "prev"
  | "skipBack"
  | "skipForward"
  | "arrow"
  | "chevron"
  | "sparkles"
  | "radio"
  | "disc"
  | "waveform"
  | "shield"
  | "globe"
  | "mail"
  | "phone"
  | "message"
  | "clock"
  | "check"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "external"
  | "plus"
  | "user"
  | "playlist"
  | "list"
  | "volume"
  | "volume2"
  | "share";

const paths: Record<Name, ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.7" />
      <path d="m16.1 16.1 4.5 4.5" />
    </>
  ),

  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),

  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),

  music: (
    <>
      <path d="M9 18.2V5.8l10-2.1v12.4" />
      <path d="M9 16.9c0 1.6-1.5 2.8-3.4 2.8S2.2 18.5 2.2 17s1.5-2.8 3.4-2.8 3.4 1.3 3.4 2.8ZM19 14.8c0 1.6-1.5 2.8-3.4 2.8s-3.4-1.2-3.4-2.8 1.5-2.8 3.4-2.8 3.4 1.2 3.4 2.8Z" />
      <path d="M9 9.1 19 7" />
    </>
  ),

  headphones: (
    <>
      <path d="M4 13.5V12a8 8 0 0 1 16 0v1.5" />
      <path d="M4 13.5h1.7c.7 0 1.3.6 1.3 1.3v3.5c0 .7-.6 1.3-1.3 1.3H4.8A1.8 1.8 0 0 1 3 17.8v-2.5c0-1 .4-1.8 1-1.8ZM20 13.5h-1.7c-.7 0-1.3.6-1.3 1.3v3.5c0 .7.6 1.3 1.3 1.3h.9a1.8 1.8 0 0 0 1.8-1.8v-2.5c0-1-.4-1.8-1-1.8Z" />
    </>
  ),

  compass: (
    <>
      <circle cx="12" cy="12" r="8.7" />
      <path d="m15.9 8.1-2.3 5.5-5.5 2.3 2.3-5.5 5.5-2.3Z" />
    </>
  ),

  library: (
    <>
      <path d="M5 4v16M9 4v16M13 5l2-1 5 15-2 .7L13 5Z" />
      <path d="M3 20h18" />
    </>
  ),

  heart: (
    <path d="M20.5 8.8c0 5.1-8.5 10-8.5 10S3.5 13.9 3.5 8.8A4.5 4.5 0 0 1 12 6.5a4.5 4.5 0 0 1 8.5 2.3Z" />
  ),

  play: (
    <path d="M8.2 5.7v12.6c0 .9 1 1.4 1.8.9l9.3-6.3a1.1 1.1 0 0 0 0-1.8L10 4.8c-.8-.5-1.8 0-1.8.9Z" />
  ),

  pause: (
    <>
      <rect x="6.5" y="5.5" width="3.8" height="13" rx="1" />
      <rect x="13.7" y="5.5" width="3.8" height="13" rx="1" />
    </>
  ),

  next: (
    <>
      <path d="M16.8 5.2v13.6" />
      <path d="m5.4 6.2 8.4 5.8-8.4 5.8V6.2Z" />
    </>
  ),

  prev: (
    <>
      <path d="M7.2 5.2v13.6" />
      <path d="m18.6 6.2-8.4 5.8 8.4 5.8V6.2Z" />
    </>
  ),

  skipBack: (
    <>
      <path d="M6.5 5v14" />
      <path d="m19 6-8 6 8 6V6Z" />
    </>
  ),

  skipForward: (
    <>
      <path d="M17.5 5v14" />
      <path d="m5 6 8 6-8 6V6Z" />
    </>
  ),

  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),

  chevron: <path d="m8 10 4 4 4-4" />,

  sparkles: (
    <>
      <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </>
  ),

  radio: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M7.5 7.5a6.4 6.4 0 0 0 0 9M16.5 7.5a6.4 6.4 0 0 1 0 9M4.5 4.5a10.5 10.5 0 0 0 0 15M19.5 4.5a10.5 10.5 0 0 1 0 15" />
    </>
  ),

  disc: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 3.2v3M20.8 12h-3M12 20.8v-3M3.2 12h3" />
    </>
  ),

  waveform: (
    <path d="M3 12h2l1.3-5.2L9 18l2.2-12 2.3 10 2-6 1.4 2H21" />
  ),

  shield: (
    <>
      <path d="M12 3.2 19 6v5.2c0 4.3-2.8 7.8-7 9.6-4.2-1.8-7-5.3-7-9.6V6l7-2.8Z" />
      <path d="m8.8 12 2.1 2.1 4.5-4.5" />
    </>
  ),

  globe: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M3.5 12h17M12 3.2c2.3 2.4 3.5 5.3 3.5 8.8S14.3 18.4 12 20.8C9.7 18.4 8.5 15.5 8.5 12S9.7 5.6 12 3.2Z" />
    </>
  ),

  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),

  phone: (
    <path d="M7.3 3.8 9.5 3l2 4.6-1.8 1.4a13.7 13.7 0 0 0 5.3 5.3l1.4-1.8 4.6 2-.8 2.2a2.2 2.2 0 0 1-2.5 1.4C10.4 17 7 13.6 3.9 6.3a2.2 2.2 0 0 1 1.4-2.5l2-.7Z" />
  ),

  message: (
    <>
      <path d="M20 11.5a7.7 7.7 0 0 1-8 7.5 8.8 8.8 0 0 1-3.1-.6L4 20l1.3-4.1A7.2 7.2 0 0 1 4 11.5 7.7 7.7 0 0 1 12 4a7.7 7.7 0 0 1 8 7.5Z" />
      <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
    </>
  ),

  clock: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),

  check: <path d="m5.5 12.5 4.1 4.1L18.8 7.4" />,

  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.7" />
      <circle
        cx="17.4"
        cy="6.8"
        r=".8"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),

  facebook: (
    <path d="M13.5 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.3-1.3 1.4-1.3h1.5V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v1.7H7.7V13h2.5v7h3.3Z" />
  ),

  linkedin: (
    <>
      <path d="M5 8.5V20M5 5.2v.1M9.5 20v-6.2a3.1 3.1 0 0 1 6.2 0V20M9.5 11.2v8.8M18.5 20v-6.1a3 3 0 0 0-6-1.3" />
    </>
  ),

  external: (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
    </>
  ),

  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),

  user: (
    <>
      <circle cx="12" cy="8.2" r="3.2" />
      <path d="M5.3 20c.8-3.4 3.1-5.1 6.7-5.1s5.9 1.7 6.7 5.1" />
    </>
  ),

  playlist: (
    <>
      <path d="M4 6h11M4 10h11M4 14h7" />
      <path d="M17 13v6.2" />
      <path d="M17 19.2c0 1.1-1 1.9-2.2 1.9s-2.2-.8-2.2-1.8 1-1.8 2.2-1.8 2.2.7 2.2 1.7Z" />
      <path d="M17 13l4-1v6" />
    </>
  ),

  list: (
    <>
      <path d="M6 6h14M6 12h14M6 18h14" />
      <path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
    </>
  ),

  volume: (
    <>
      <path d="M4 10v4h3l4 3.5v-11L7 10H4Z" />
      <path d="M15 9.2a4 4 0 0 1 0 5.6M18 6.8a7.4 7.4 0 0 1 0 10.4" />
    </>
  ),

  volume2: (
    <>
      <path d="M4 10v4h3l4 3.5v-11L7 10H4Z" />
      <path d="M15 9.2a4 4 0 0 1 0 5.6" />
      <path d="M18 6.8a7.4 7.4 0 0 1 0 10.4" />
    </>
  ),

  share: (
    <>
      <circle cx="18" cy="5.5" r="2.2" />
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="18" cy="18.5" r="2.2" />
      <path d="m8 11 7.8-4.3M8 13l7.8 4.3" />
    </>
  ),
};

export default function Icon({
  name,
  size = 18,
  strokeWidth = 1.8,
  className = "",
}: {
  name: Name;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}