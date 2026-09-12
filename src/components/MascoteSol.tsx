interface Props {
  size?: number;
  className?: string;
}

export function MascoteSol({ size = 64, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="SOL, o mascote da ECOLchain"
    >
      {/* raios */}
      <g stroke="#f59e0b" strokeWidth="4" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          const x1 = 50 + Math.cos(a) * 34;
          const y1 = 50 + Math.sin(a) * 34;
          const x2 = 50 + Math.cos(a) * 44;
          const y2 = 50 + Math.sin(a) * 44;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      {/* rosto */}
      <circle cx="50" cy="50" r="30" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
      {/* olhos */}
      <circle cx="41" cy="45" r="3.2" fill="#78350f" />
      <circle cx="59" cy="45" r="3.2" fill="#78350f" />
      {/* sorriso */}
      <path
        d="M 40 56 Q 50 65 60 56"
        fill="none"
        stroke="#78350f"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* bochechas */}
      <circle cx="36" cy="53" r="3" fill="#f59e0b" opacity="0.5" />
      <circle cx="64" cy="53" r="3" fill="#f59e0b" opacity="0.5" />
      {/* folha */}
      <path
        d="M 66 22 Q 82 14 86 26 Q 78 34 66 30 Q 63 25 66 22 Z"
        fill="#059669"
        stroke="#047857"
        strokeWidth="1.5"
      />
      <path
        d="M 67 27 Q 76 24 84 26"
        fill="none"
        stroke="#a7f3d0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
