export function FundoMapa() {
  return (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="100" height="60" fill="#eef5ee" />
      <path d="M0 34 C18 30 26 40 40 38 C56 36 70 46 100 42 L100 60 L0 60 Z" fill="#dcefe0" />
      <path d="M62 0 C64 12 58 20 60 30 C62 42 56 52 58 60" stroke="#cfe4f2" strokeWidth="2.2" fill="none" />
      <g stroke="#ffffff" strokeWidth="1.6">
        <path d="M0 12 H100M0 24 H100M0 36 H100M0 48 H100" />
        <path d="M14 0 V60M32 0 V60M50 0 V60M68 0 V60M86 0 V60" />
      </g>
      <g stroke="#f7fbf8" strokeWidth="0.7">
        <path d="M0 6 H100M0 18 H100M0 30 H100M0 42 H100M0 54 H100" />
        <path d="M6 0 V60M22 0 V60M40 0 V60M58 0 V60M76 0 V60M94 0 V60" />
      </g>
      <rect x="72" y="6" width="20" height="12" rx="2" fill="#cdeacd" />
      <rect x="6" y="42" width="14" height="10" rx="2" fill="#cdeacd" />
    </svg>
  );
}
