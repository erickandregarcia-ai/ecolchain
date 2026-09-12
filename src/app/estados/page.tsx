import { LinhaEvolucao } from "@/components/charts/Graficos";
import { MapaBrasil } from "@/components/mapa/MapaBrasil";
import { Card, CardTitle } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  EVOLUCAO_TAXA_NACIONAL,
  FAIXAS_TAXA,
  MELHOR_ESTADO,
  PIOR_ESTADO,
  RANKING_ESTADOS,
  TAXA_MEDIA_NACIONAL,
  type Tendencia,
} from "@/lib/data/estados";

const TENDENCIA: Record<Tendencia, { icone: string; classe: string; rotulo: string }> = {
  alta: { icone: "arrowUp", classe: "text-emerald-600", rotulo: "em alta" },
  estavel: { icone: "minus", classe: "text-amber-500", rotulo: "estável" },
  queda: { icone: "arrowDown", classe: "text-rose-500", rotulo: "em queda" },
};

const DESEMPENHO: Record<string, string> = {
  Alto: "bg-emerald-500",
  Médio: "bg-amber-400",
  Baixo: "bg-rose-400",
};

export default function EstadosPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <PageHeader
        titulo="Estados — panorama da reciclagem no Brasil"
        descricao="Taxa de reciclagem por estado, tendência e desempenho com base nos dados oficiais mais recentes."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <Card>
          <CardTitle icone="map">Taxa de reciclagem</CardTitle>
          <div className="flex gap-3">
            <div className="min-w-0 flex-1">
              <MapaBrasil destaque={MELHOR_ESTADO.uf} />
            </div>
            <ul className="flex w-28 shrink-0 flex-col gap-1.5 pt-2">
              {FAIXAS_TAXA.map((f) => (
                <li key={f.rotulo} className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="h-3 w-5 rounded-sm" style={{ background: f.cor }} />
                  {f.rotulo}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2 inline-flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Icon name="trophy" size={18} />
            </span>
            <span>
              <span className="block text-xs text-slate-500">{MELHOR_ESTADO.uf}</span>
              <span className="block text-lg font-bold text-emerald-800">
                {MELHOR_ESTADO.taxa.toLocaleString("pt-BR")}%
                <span className="ml-1 text-xs font-medium text-slate-500">(1º lugar)</span>
              </span>
            </span>
          </div>
        </Card>

        <Card className="p-0">
          <h2 className="border-b border-emerald-100 px-5 py-4 text-sm font-semibold text-slate-800">
            Ranking dos estados
          </h2>
          <div className="max-h-[30rem] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-emerald-50/70 text-left text-xs font-semibold text-slate-500">
                <tr>
                  <th className="w-10 px-4 py-2.5">#</th>
                  <th className="px-4 py-2.5">Estado</th>
                  <th className="px-4 py-2.5">Taxa de reciclagem</th>
                  <th className="px-4 py-2.5">Tendência</th>
                  <th className="px-4 py-2.5">Desempenho</th>
                </tr>
              </thead>
              <tbody>
                {RANKING_ESTADOS.map((e, i) => {
                  const t = TENDENCIA[e.tendencia];
                  return (
                    <tr key={e.uf} className="border-b border-emerald-50 last:border-0">
                      <td className="px-4 py-2.5 font-semibold text-slate-400">{i + 1}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-700">{e.nome}</td>
                      <td className="px-4 py-2.5 text-slate-600">
                        {e.taxa.toLocaleString("pt-BR")}%
                      </td>
                      <td className={`px-4 py-2.5 ${t.classe}`}>
                        <span className="flex items-center gap-1">
                          <Icon name={t.icone} size={15} />
                          <span className="sr-only">{t.rotulo}</span>
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="flex items-center gap-2 text-slate-600">
                          <span className={`h-2.5 w-2.5 rounded-full ${DESEMPENHO[e.desempenho]}`} />
                          {e.desempenho}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <p className="text-xs text-slate-500">Taxa média nacional</p>
              <p className="mt-1 text-2xl font-bold text-emerald-800">{TAXA_MEDIA_NACIONAL.valor}</p>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <Icon name="arrowUp" size={13} />
                {TAXA_MEDIA_NACIONAL.variacao}
              </p>
            </Card>
            <Card>
              <p className="text-xs text-slate-500">Melhor estado</p>
              <p className="mt-1 text-xl font-bold text-emerald-800">{MELHOR_ESTADO.nome}</p>
              <p className="mt-1 text-sm text-slate-500">
                {MELHOR_ESTADO.taxa.toLocaleString("pt-BR")}%
              </p>
            </Card>
            <Card>
              <p className="text-xs text-slate-500">Pior estado</p>
              <p className="mt-1 text-xl font-bold text-rose-600">{PIOR_ESTADO.nome}</p>
              <p className="mt-1 text-sm text-slate-500">
                {PIOR_ESTADO.taxa.toLocaleString("pt-BR")}%
              </p>
            </Card>
          </div>

          <Card>
            <CardTitle icone="chart">Evolução da taxa de reciclagem (Brasil)</CardTitle>
            <LinhaEvolucao dados={EVOLUCAO_TAXA_NACIONAL} />
          </Card>
        </div>

        <Card className="flex flex-col justify-between border-0 bg-gradient-to-br from-emerald-800 to-emerald-600 text-white">
          <p className="text-base font-semibold leading-relaxed">
            Estados que reciclam mais fortalecem a economia circular e geram mais impacto ambiental,
            social e econômico.
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-emerald-100">
            <Icon name="leaf" size={18} />
            ECOLchain
          </p>
        </Card>
      </div>
    </div>
  );
}
