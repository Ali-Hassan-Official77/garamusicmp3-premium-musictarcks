import type { Config } from "tailwindcss";
const config: Config = { content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"], theme:{extend:{colors:{void:"var(--bg)",surface:"var(--surface)","surface-2":"var(--surface2)","surface-3":"var(--surface2)",gold:"var(--warm)",magenta:"var(--accent2)",cream:"var(--text)",muted:"var(--muted)"},fontFamily:{display:["var(--font-display)","serif"],body:["var(--font-body)","sans-serif"]},backgroundImage:{grain:"url('/noise.svg')"}}},plugins:[]};
export default config;
