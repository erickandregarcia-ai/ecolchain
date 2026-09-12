import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { ATUALIZADO_EM } from "@/lib/data/panorama";

export function Breadcrumb({ trilha }: { trilha: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400" aria-label="Trilha de navegação">
      {trilha.map((t, i) => (
        <span key={t.label} className="flex items-center gap-1.5">
          {i > 0 && <Icon name="chevronRight" size={12} />}
          {t.href ? (
            <Link href={t.href} className="transition hover:text-emerald-700">
              {t.label}
            </Link>
          ) : (
            <span className="text-slate-500">{t.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHeader({
  titulo,
  descricao,
  trilha,
  acao,
}: {
  titulo: ReactNode;
  descricao?: ReactNode;
  trilha?: { label: string; href?: string }[];
  acao?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        {trilha && (
          <div className="mb-2">
            <Breadcrumb trilha={trilha} />
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-emerald-900 sm:text-3xl">{titulo}</h1>
        {descricao && <p className="mt-1 max-w-2xl text-sm text-slate-500">{descricao}</p>}
      </div>
      <div className="flex items-center gap-3">
        {acao}
        <span className="hidden text-xs text-slate-400 sm:block">Atualizado em {ATUALIZADO_EM}</span>
      </div>
    </div>
  );
}
