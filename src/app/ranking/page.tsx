"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { ScorePill, ScoreRing } from "@/components/ui/ScoreRing";
import {
  COOPERATIVAS_RANKING,
  EMPRESAS_RANKING,
  RESUMO_RANKING_EMPRESAS,
  SETORES,
  TIPOS_INICIATIVA,
} from "@/lib/data/empresas";
import { RANKING_ESTADOS } from "@/lib/data/estados";
import { PROJETOS } from "@/lib/data/projetos";

type Aba = "Projetos" | "Empresas" | "Estados" | "Cooperativas";

const ABAS: { id: Aba; icone: string }[] = [
  { id: "Projetos", icone: "clipboard" },
  { id: "Empresas", icone: "building" },
  { id: "Estados", icone: "shield" },
  { id: "Cooperativas", icone: "file" },
];

const ICONE_RESUMO: Record<string, string> = {
  empresa: "building",
  verificado: "checkCircle",
  expansao: "clock",
  analise: "search",
};

const ESTADOS_FILTRO = ["Todos", ...RANKING_ESTADOS.map((e) => e.uf)];
const STATUS_FILTRO = ["Todos", "Verificado", "Em análise"];

export default function RankingPage() {
  const [aba, setAba] = useState<Aba>("Empresas");
  const [setor, setSetor] = useState("Todos");
  const [iniciativa, setIniciativa] = useState("Todos");
  const [estado, setEstado] = useState("Todos");
  const [statusVerificacao, setStatusVerificacao] = useState("Todos");

  const limpar = () => {
    setSetor("Todos");
    setIniciativa("Todos");
    setEstado("Todos");
    setStatusVerificacao("Todos");
  };

  const empresas = useMemo(
    () =>
      EMPRESAS_RANKING.filter((e) => setor === "Todos" || e.setor === setor)
        .filter((e) => iniciativa === "Todos" || e.iniciativas.includes(iniciativa))
        .filter((e) => statusVerificacao === "Todos" || e.status === statusVerificacao)
        .sort((a, b) => b.score - a.score),
    [setor, iniciativa, statusVerificacao],
  );

  const projetos = useMemo(
    () =>
      PROJETOS.filter((p) => estado === "Todos" || p.uf === estado).sort(
        (a, b) => b.score - a.score,
      ),
    [estado],
  );

  const cooperativas = useMemo(
    () =>
      COOPERATIVAS_RANKING.filter((c) => estado === "Todos" || c.uf === estado)
        .filter((c) => statusVerificacao === "Todos" || c.status === statusVerificacao)
        .sort((a, b) => b.score - a.score),
    [estado, statusVerificacao],
  );

  const filtros = [
    { rotulo: "Setor", icone: "factory", valor: setor, opcoes: SETORES, aplicar: setSetor },
    {
      rotulo: "Tipo de iniciativa",
      icone: "recycle",
      valor: iniciativa,
      opcoes: TIPOS_INICIATIVA,
      aplicar: setIniciativa,
    },
    { rotulo: "Estado", icone: "pin", valor: estado, opcoes: ESTADOS_FILTRO, aplicar: setEstado },
    {
      rotulo: "Status da verificação",
      icone: "shield",
      valor: statusVerificacao,
      opcoes: STATUS_FILTRO,
      aplicar: setStatusVerificacao,
    },
  ];

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 xl:grid-cols-[1fr_20rem]">
      <div className="flex min-w-0 flex-col gap-4">
        <PageHeader
          titulo="Ranking ECOLchain"
          descricao="Projetos e empresas avaliados pelo ECOLchain com base em evidências verificáveis, rastreabilidade e impacto socioambiental."
          trilha={[{ label: "Projetos", href: "/projetos" }, { label: "Ranking" }]}
        />

        <div className="flex flex-wrap gap-2">
          {ABAS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAba(a.id)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                aba === a.id
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-emerald-100 bg-white text-slate-600 hover:border-emerald-300"
              }`}
            >
              <Icon name={a.icone} size={16} />
              {a.id}
            </button>
          ))}
        </div>

        <Card className="flex flex-wrap items-center gap-4 border-emerald-100 bg-emerald-50/50">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
            <Icon name="leaf" size={24} />
          </span>
          <div className="min-w-48 flex-1">
            <h2 className="text-base font-semibold text-emerald-900">
              {aba === "Empresas"
                ? "Empresas que fazem a diferença"
                : aba === "Projetos"
                  ? "Projetos com impacto comprovado"
                  : aba === "Estados"
                    ? "Estados que puxam a economia circular"
                    : "Cooperativas no centro da cadeia"}
            </h2>
            <p className="text-sm text-slate-500">
              {aba === "Empresas"
                ? "Empresas com iniciativas comprovadas de logística reversa, reciclagem e economia circular."
                : aba === "Projetos"
                  ? "Projetos avaliados pelo ECOLchain Sustainability Score com evidências auditáveis."
                  : aba === "Estados"
                    ? "Desempenho dos estados na taxa de reciclagem e na tendência de evolução."
                    : "Cooperativas homologadas, com catadores e volumes rastreados."}
            </p>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
            <Icon name="info" size={15} className="text-emerald-600" />
            Como funciona o ranking
          </span>
          <span className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-emerald-800 shadow-sm ring-1 ring-emerald-200">
            <Icon name="checkCircle" size={15} className="text-emerald-600" />
            Evidência verificada pela ECOLchain
          </span>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            {aba === "Empresas" && (
              <table className="w-full min-w-[46rem] text-sm">
                <thead>
                  <tr className="border-b border-emerald-100 bg-emerald-50/40 text-left text-xs font-semibold text-slate-500">
                    <th className="w-12 px-4 py-3">#</th>
                    <th className="px-4 py-3">Empresa</th>
                    <th className="px-4 py-3">Setor</th>
                    <th className="px-4 py-3">Iniciativas</th>
                    <th className="px-4 py-3">
                      <span className="flex items-center gap-1">
                        ECOLchain Circularity Score
                        <Icon name="info" size={13} className="text-slate-400" />
                      </span>
                    </th>
                    <th className="px-4 py-3">Status</th>
                    <th className="w-10 px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {empresas.map((e, i) => (
                    <tr key={e.nome} className="border-b border-emerald-50 last:border-0 hover:bg-emerald-50/40">
                      <td className="px-4 py-4 font-semibold text-slate-400">{i + 1}</td>
                      <td className="px-4 py-4">
                        <span className="flex items-center gap-3">
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
                            style={{ background: e.cor }}
                          >
                            {e.sigla}
                          </span>
                          <span>
                            <span className="flex items-center gap-1.5 font-medium text-slate-800">
                              {e.nome}
                              <Icon name="checkCircle" size={14} className="text-emerald-500" />
                            </span>
                            <span className="block text-xs text-slate-400">{e.segmento}</span>
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <Badge tom="cinza">{e.setor}</Badge>
                      </td>
                      <td className="px-4 py-4">
                        <ul className="flex flex-col gap-1">
                          {e.iniciativas.map((it) => (
                            <li key={it} className="flex items-center gap-1.5 text-xs text-slate-600">
                              <Icon name="leaf" size={13} className="text-emerald-500" />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-4">
                        <ScoreRing score={e.score} />
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={e.status} />
                      </td>
                      <td className="px-4 py-4 text-slate-300">
                        <Icon name="chevronRight" size={18} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {aba === "Projetos" && (
              <table className="w-full min-w-[42rem] text-sm">
                <thead>
                  <tr className="border-b border-emerald-100 bg-emerald-50/40 text-left text-xs font-semibold text-slate-500">
                    <th className="w-12 px-4 py-3">#</th>
                    <th className="px-4 py-3">Projeto</th>
                    <th className="px-4 py-3">Organização</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projetos.map((p, i) => (
                    <tr key={p.slug} className="border-b border-emerald-50 last:border-0 hover:bg-emerald-50/40">
                      <td className="px-4 py-3 font-semibold text-slate-400">{i + 1}</td>
                      <td className="px-4 py-3">
                        <Link href={`/projetos/${p.slug}`} className="font-medium text-slate-800 hover:text-emerald-700">
                          {p.nome}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {aba === "Estados" && (
              <table className="w-full min-w-[36rem] text-sm">
                <thead>
                  <tr className="border-b border-emerald-100 bg-emerald-50/40 text-left text-xs font-semibold text-slate-500">
                    <th className="w-12 px-4 py-3">#</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Taxa de reciclagem</th>
                    <th className="px-4 py-3">Desempenho</th>
                  </tr>
                </thead>
                <tbody>
                  {RANKING_ESTADOS.slice(0, 10).map((e, i) => (
                    <tr key={e.uf} className="border-b border-emerald-50 last:border-0 hover:bg-emerald-50/40">
                      <td className="px-4 py-3 font-semibold text-slate-400">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-slate-700">{e.nome}</td>
                      <td className="px-4 py-3 text-slate-600">{e.taxa.toLocaleString("pt-BR")}%</td>
                      <td className="px-4 py-3 text-slate-600">{e.desempenho}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {aba === "Cooperativas" && (
              <table className="w-full min-w-[42rem] text-sm">
                <thead>
                  <tr className="border-b border-emerald-100 bg-emerald-50/40 text-left text-xs font-semibold text-slate-500">
                    <th className="w-12 px-4 py-3">#</th>
                    <th className="px-4 py-3">Cooperativa</th>
                    <th className="px-4 py-3">Cidade</th>
                    <th className="px-4 py-3">Catadores</th>
                    <th className="px-4 py-3">Volume</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cooperativas.map((c, i) => (
                    <tr key={c.nome} className="border-b border-emerald-50 last:border-0 hover:bg-emerald-50/40">
                      <td className="px-4 py-3 font-semibold text-slate-400">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-slate-700">{c.nome}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {c.cidade}/{c.uf}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{c.catadores}</td>
                      <td className="px-4 py-3 text-slate-600">{c.toneladas}</td>
                      <td className="px-4 py-3">
                        <ScorePill score={c.score} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

        <Card className="flex flex-wrap items-center gap-4 bg-emerald-50/60">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600">
            <Icon name="building" size={22} />
          </span>
          <div className="min-w-48 flex-1">
            <h2 className="text-sm font-semibold text-slate-800">
              Sua empresa também pode fazer parte deste ranking!
            </h2>
            <p className="text-sm text-slate-500">
              Cadastre suas iniciativas e comprove suas ações de economia circular.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Cadastrar empresa
            <Icon name="arrowRight" size={16} />
          </button>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Icon name="filter" size={17} className="text-emerald-600" />
              Filtros
            </h2>
            <button
              type="button"
              onClick={limpar}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
            >
              Limpar filtros
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {filtros.map((f) => (
              <label key={f.rotulo} className="block">
                <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Icon name={f.icone} size={14} className="text-emerald-600" />
                  {f.rotulo}
                </span>
                <select
                  value={f.valor}
                  onChange={(e) => f.aplicar(e.target.value)}
                  className="h-10 w-full rounded-xl border border-emerald-100 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300"
                >
                  {f.opcoes.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Resumo do ranking de empresas</h2>
          <ul className="grid grid-cols-2 gap-3">
            {RESUMO_RANKING_EMPRESAS.map((r) => (
              <li key={r.rotulo} className="rounded-xl border border-emerald-100 p-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Icon name={ICONE_RESUMO[r.icone]} size={16} />
                </span>
                <span className="mt-2 block text-xl font-bold text-slate-800">{r.valor}</span>
                <span className="block text-xs text-slate-500">{r.rotulo}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-emerald-700 to-emerald-500 text-white">
          <p className="text-sm font-medium leading-relaxed">
            Empresas que investem em economia circular impulsionam um futuro mais sustentável.
          </p>
          <Icon name="leaf" size={28} className="mt-4 text-emerald-200" />
        </Card>

        <Card className="flex items-center gap-3">
          <Icon name="chart" size={18} className="text-emerald-600" />
          <span className="flex-1 text-sm text-slate-600">Veja como o score é calculado</span>
          <Icon name="chevronRight" size={16} className="text-slate-300" />
        </Card>
      </div>
    </div>
  );
}
