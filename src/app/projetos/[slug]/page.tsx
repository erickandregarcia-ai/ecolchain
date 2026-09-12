import Link from "next/link";
import { notFound } from "next/navigation";
import { DonutMateriais } from "@/components/charts/Graficos";
import { SeloBadge, StatusBadge } from "@/components/ui/Badge";
import { Card, CardTitle } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ATUALIZADO_EM } from "@/lib/data/panorama";
import { PROJETOS, getProjeto } from "@/lib/data/projetos";

const ICONES: Record<string, string> = {
  reciclagem: "recycle",
  municipio: "building",
  cooperativa: "users",
  co2: "co2",
  pessoas: "users",
  material: "package",
};

export function generateStaticParams() {
  return PROJETOS.map((p) => ({ slug: p.slug }));
}

export default async function ProjetoPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const projeto = getProjeto(slug);
  if (!projeto) notFound();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/projetos"
          className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
        >
          <Icon name="chevronLeft" size={16} />
          Voltar para o ranking
        </Link>
        <span className="text-xs text-slate-400">Atualizado em {ATUALIZADO_EM}</span>
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <Icon name="blockchain" size={26} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-emerald-900 sm:text-2xl">{projeto.nome}</h1>
              <StatusBadge status={projeto.status} />
            </div>
            <p className="mt-0.5 text-sm text-slate-500">{projeto.resumo}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-emerald-50/70 px-5 py-3">
          <div>
            <p className="text-xs text-slate-500">ECOLchain Score</p>
            <p className="text-2xl font-bold text-emerald-800">
              {projeto.score}
              <span className="text-sm font-medium text-slate-400">/100</span>
            </p>
          </div>
          <SeloBadge selo={projeto.selo} />
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardTitle icone="chart">Indicadores do projeto</CardTitle>
          <ul className="flex flex-col gap-3">
            {projeto.indicadores.map((i) => (
              <li key={i.rotulo} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon name={ICONES[i.icone]} size={19} />
                </span>
                <span>
                  <span className="block text-lg font-bold text-slate-800">{i.valor}</span>
                  <span className="block text-xs text-slate-500">{i.rotulo}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle icone="leaf">Impacto estimado</CardTitle>
          <ul className="flex flex-col gap-3">
            {projeto.impacto.map((i) => (
              <li key={i.rotulo} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon name={ICONES[i.icone]} size={19} />
                </span>
                <span>
                  <span className="block text-lg font-bold text-slate-800">{i.valor}</span>
                  <span className="block text-xs text-slate-500">{i.rotulo}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle icone="package">Materiais</CardTitle>
          <DonutMateriais dados={projeto.materiais} altura={150} />
          <ul className="mt-3 flex flex-col gap-1.5">
            {projeto.materiais.map((m) => (
              <li key={m.nome} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.cor }} />
                <span className="flex-1">{m.nome}</span>
                <span className="font-semibold text-slate-700">{m.valor}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <Card>
          <CardTitle icone="info">Sobre o projeto</CardTitle>
          <p className="text-sm leading-relaxed text-slate-600">{projeto.sobre}</p>
          <Link
            href={`/projetos/${projeto.slug}/evidencias`}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Icon name="shield" size={16} />
            Ver Data Passport
          </Link>
        </Card>

        <Card>
          <CardTitle icone="clock">Linha do tempo</CardTitle>
          <ol className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-0">
            {projeto.linhaDoTempo.map((e, i) => (
              <li key={e.nome} className="relative flex flex-1 items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                {i < projeto.linhaDoTempo.length - 1 && (
                  <span
                    className={`absolute left-[13px] top-7 h-[calc(100%+0.5rem)] w-0.5 sm:left-1/2 sm:top-[13px] sm:h-0.5 sm:w-full ${
                      e.concluida ? "bg-emerald-400" : "bg-slate-200"
                    }`}
                  />
                )}
                <span
                  className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white ${
                    e.concluida ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <Icon name={e.concluida ? "check" : "clock"} size={14} />
                </span>
                <span className="sm:mt-2">
                  <span className="block text-xs font-semibold text-slate-700">{e.nome}</span>
                  <span className="block text-[11px] text-slate-400">{e.data}</span>
                </span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
