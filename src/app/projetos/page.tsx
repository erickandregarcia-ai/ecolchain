"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ScorePill } from "@/components/ui/ScoreRing";
import { PROJETOS, SELOS, type Selo } from "@/lib/data/projetos";

export default function ProjetosPage() {
  const [selo, setSelo] = useState<Selo | "Todos">("Todos");
  const [busca, setBusca] = useState("");

  const projetos = useMemo(
    () =>
      PROJETOS.filter((p) => selo === "Todos" || p.selo === selo)
        .filter((p) =>
          `${p.nome} ${p.organizacao} ${p.uf} ${p.resumo}`
            .toLowerCase()
            .includes(busca.trim().toLowerCase()),
        )
        .sort((a, b) => b.score - a.score),
    [selo, busca],
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-emerald-900 sm:text-3xl">
          Ranking de projetos blockchain
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Projetos avaliados pelo ECOLchain Sustainability Score.
        </p>
      </div>

      <Card className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative flex min-w-56 flex-1 items-center">
            <Icon name="search" size={18} className="absolute left-4 text-slate-400" />
            <span className="sr-only">Buscar projeto</span>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar projeto, material ou organização..."
              className="h-11 w-full rounded-full border border-emerald-100 bg-emerald-50/40 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white"
            />
          </label>
          <button
            type="button"
            aria-label="Filtros"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-100 text-slate-500 transition hover:bg-emerald-50"
          >
            <Icon name="sliders" size={18} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["Todos", ...SELOS] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSelo(s)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                selo === s
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              <Icon name={s === "Todos" ? "check" : "star"} size={14} />
              {s}
            </button>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-sm">
            <thead>
              <tr className="border-b border-emerald-100 bg-emerald-50/40 text-left text-xs font-semibold text-slate-500">
                <th className="w-12 px-4 py-3">#</th>
                <th className="px-4 py-3">Projeto</th>
                <th className="px-4 py-3">Empresa/Cooperativa</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {projetos.map((p, i) => (
                <tr key={p.slug} className="border-b border-emerald-50 last:border-0 hover:bg-emerald-50/40">
                  <td className="px-4 py-3 font-semibold text-slate-400">{i + 1}</td>
                  <td className="px-4 py-3">
                    <Link href={`/projetos/${p.slug}`} className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                        <Icon name="blockchain" size={16} />
                      </span>
                      <span>
                        <span className="block font-medium text-slate-800">{p.nome}</span>
                        <span className="block text-xs text-slate-400">{p.resumo}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.organizacao}</td>
                  <td className="px-4 py-3 text-slate-600">{p.uf}</td>
                  <td className="px-4 py-3">
                    <ScorePill score={p.score} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/projetos/${p.slug}`}
                      aria-label={`Abrir ${p.nome}`}
                      className="text-slate-300 transition hover:text-emerald-600"
                    >
                      <Icon name="chevronRight" size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
              {projetos.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                    Nenhum projeto encontrado para esses filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="flex items-start gap-4 bg-emerald-50/60">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600">
          <Icon name="shield" size={22} />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-800">ECOLchain Sustainability Score</h2>
          <p className="mt-1 text-sm text-slate-500">
            Avalia projetos com base em critérios de rastreabilidade, impacto ambiental, social,
            inovação e governança.
          </p>
        </div>
        <Icon name="leaf" size={40} className="ml-auto hidden shrink-0 text-emerald-200 sm:block" />
      </Card>
    </div>
  );
}
