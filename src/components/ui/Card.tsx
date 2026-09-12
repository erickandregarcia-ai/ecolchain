import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-emerald-100 bg-white p-5 shadow-[0_1px_2px_rgba(16,84,52,0.06)] ${className}`}
    >
      {children}
    </section>
  );
}

export function CardTitle({
  children,
  icone,
  acao,
}: {
  children: ReactNode;
  icone?: string;
  acao?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        {icone && <Icon name={icone} size={18} className="text-emerald-600" />}
        {children}
      </h2>
      {acao}
    </div>
  );
}
