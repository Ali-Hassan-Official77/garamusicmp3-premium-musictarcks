export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`gara-logo ${compact ? "gara-logo-compact" : ""}`} aria-label="Gara Music">
      <span className="gara-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="garaMark" x1="7" y1="5" x2="40" y2="43" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD45E"/><stop offset=".46" stopColor="#FF7B43"/><stop offset="1" stopColor="#FF315C"/>
            </linearGradient>
            <filter id="garaGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
          </defs>
          <circle cx="24" cy="24" r="17" fill="url(#garaMark)" opacity=".18" filter="url(#garaGlow)"/>
          <rect x="2" y="2" width="44" height="44" rx="14" fill="rgba(255,255,255,.035)" stroke="url(#garaMark)" strokeWidth="1.2"/>
          <path d="M31.6 12.2c-3.2-2.2-7.4-2.8-11.1-1.3-5.9 2.3-8.8 9-6.5 14.9 2.3 5.9 9 8.8 14.9 6.5 2.4-.9 4.4-2.5 5.7-4.6" stroke="url(#garaMark)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M24 23.2h10.8v5.2" stroke="#FFF7EC" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="34.6" r="2.2" fill="#FFD45E"/><circle cx="31.6" cy="34.6" r="2.2" fill="#FF4B57"/>
        </svg>
      </span>
      <span className="gara-logo-type"><strong>GARA</strong>{!compact && <small>MUSIC</small>}</span>
    </span>
  );
}
