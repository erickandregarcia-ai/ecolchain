import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card, CardTitle } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { PROJETOS, getProjeto } from "@/lib/data/projetos";

const ICONE_EVIDENCIA: Record<string, string> = {
  documento: "file",
  foto: "camera",
  comprovante: "receipt",
  auditoria: "audit",
};

export function generateStaticParams() {
  return PROJETOS.map((p) => ({ slug: p.slug }));
}

export default async function EvidenciasPage({
  params,
}: PageProps<"/projetos/[slug]/evidencias">) {
  const { slug } = await params;
  const projeto = getProjeto(slug);
  if (!projeto) notFound();

  const e = projeto.evidencia;

  const dadosBasicos = [
    { rotulo: "Indicador", valor: e.indicador },
    { rotulo: "Período", valor: e.periodo },
    { rotulo: "Fonte", valor: e.fonte },
    { rotulo: "Dataset", valor: e.dataset },
    { rotulo: "URL", valor: e.url, link: true },
  ];

  const proveniencia = [
    { rotulo: "Coleta", valor: e.coleta, icone: "database" },
    { rotulo: "Transformação", valor: e.transformacao, icone: "recycle" },
    { rotulo: "Hash", valor: e.hash, icone: "hash" },
    { rotulo: "Blockchain", valor: e.blockchain, icone: "blockchain" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <PageHeader
        titulo="Data Passport / Evidências"
        descricao="Transparência sobre a origem e a verificação dos dados."
        trilha={[
          { label: "Projetos", href: "/projetos" },
          { label: projeto.nome, href: `/projetos/${projeto.slug}` },
          { label: "Evidências" },
        ]}
      />

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Icon name="file" size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Registro de evidência {e.registro}
              </p>
              <p className="text-xs text-slate-400">{projeto.nome}</p>
            </div>
            <Badge tom={e.verificado ? "verde" : "ambar"} icone={e.verificado ? "checkCircle" : "clock"}>
              {e.verificado ? "Verificado" : "Em verificação"}
            </Badge>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            <Icon name="download" size={16} />
            Baixar relatório
          </button>
        </div>

        <div className="grid gap-6 pt-4 md:grid-cols-2">
          <div>
            <CardTitle icone="clipboard">Dados básicos</CardTitle>
            <dl className="flex flex-col gap-2.5">
              {dadosBasicos.map((d) => (
                <div key={d.rotulo} className="flex flex-wrap gap-x-3 border-b border-emerald-50 pb-2 last:border-0">
                  <dt className="w-28 shrink-0 text-xs text-slate-400">{d.rotulo}</dt>
                  <dd className="min-w-0 flex-1 break-words text-sm text-slate-700">
                    {d.link ? (
                      <a
                        href={d.valor}
                        className="text-emerald-700 underline underline-offset-2"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {d.valor}
                      </a>
                    ) : (
                      d.valor
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <CardTitle icone="link">Proveniência</CardTitle>
            <ul className="flex flex-col gap-3">
              {proveniencia.map((p) => (
                <li key={p.rotulo} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon name={p.icone} size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-400">{p.rotulo}</span>
                    <span className="block break-all font-mono text-sm text-slate-700">{p.valor}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle icone="shield">Evidências</CardTitle>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {e.itens.map((item) => (
            <li
              key={item.titulo}
              className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600">
                <Icon name={ICONE_EVIDENCIA[item.tipo]} size={19} />
              </span>
              <span>
                <span className="block text-sm font-medium text-slate-800">{item.titulo}</span>
                <span className="block text-xs text-slate-500">{item.detalhe}</span>
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
