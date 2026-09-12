export function ScoreRing({
  score,
  size = 48,
  mostrarTotal = true,
}: {
  score: number;
  size?: number;
  mostrarTotal?: boolean;
}) {
  const r = size / 2 - 4;
  const c = 2 * Math.PI * r;
  const cor = score >= 85 ? "#059669" : score >= 75 ? "#10b981" : "#f59e0b";

  return (
    <span className="flex items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e6f5ec" strokeWidth="4" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={cor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${(c * score) / 100} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="flex items-baseline gap-0.5">
        <span className="text-lg font-bold text-slate-800">{score}</span>
        {mostrarTotal && <span className="text-xs text-slate-400">/100</span>}
      </span>
      <span className="sr-only">Score {score} de 100</span>
    </span>
  );
}

export function ScorePill({ score }: { score: number }) {
  const tom =
    score >= 85
      ? "bg-emerald-100 text-emerald-800"
      : score >= 80
        ? "bg-lime-100 text-lime-800"
        : score >= 77
          ? "bg-sky-100 text-sky-800"
          : "bg-amber-100 text-amber-800";
  return (
    <span className={`inline-flex h-8 min-w-10 items-center justify-center rounded-full px-2.5 text-sm font-bold ${tom}`}>
      {score}
    </span>
  );
}
