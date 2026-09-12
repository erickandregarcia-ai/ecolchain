import { BarrasEvolucao, DonutMateriais } from "@/components/charts/Graficos";
import { Card, CardTitle } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { LogoMarca } from "@/components/ui/Logo";
import {
  ATUALIZADO_EM,
  EVOLUCAO_RECICLAGEM,
  IMPACTO_ESTIMADO,
  INDICADORES_BRASIL,
  MATERIAIS_RECICLADOS,
  USUARIO,
  VARIACAO_RECICLAGEM,
} from "@/lib/data/panorama";

const ICONES: Record<string, string> = {
  reciclagem: "recycle",
  ponto: "pin",
  cooperativa: "users",
  projeto: "clipboard",
  co2: "co2",
  arvore: "tree",
};

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-900 sm:text-3xl">
            Olá, {USUARIO.nome}! 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Veja o panorama da reciclagem no Brasil e acompanhe os principais indicadores.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Atualizado em {ATUALIZADO_EM}</span>
          <span className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-2 text-sm font-medium text-slate-600">
            <Icon name="globe" size={16} className="text-emerald-600" />
            Brasil
            <Icon name="chevronDown" size={14} className="text-slate-400" />
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {INDICADORES_BRASIL.map((i) => (
          <Card key={i.id} className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Icon name={ICONES[i.icone]} size={22} />
            </span>
            <span>
              <span className="block text-xl font-bold text-slate-800">{i.valor}</span>
              <span className="block text-sm text-slate-500">{i.titulo}</span>
              <span className="block text-[11px] text-slate-400">{i.detalhe}</span>
            </span>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_0.9fr]">
        <Card>
          <CardTitle
            icone="chart"
            acao={
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <Icon name="arrowUp" size={13} />
                {VARIACAO_RECICLAGEM}
                <span className="font-normal text-slate-400">(vs 2020)</span>
              </span>
            }
          >
            Evolução da reciclagem no Brasil
          </CardTitle>
          <BarrasEvolucao dados={EVOLUCAO_RECICLAGEM} />
        </Card>

        <Card>
          <CardTitle icone="package">Materiais reciclados (2024)</CardTitle>
          <DonutMateriais
            dados={MATERIAIS_RECICLADOS}
            centroValor="4,8 t"
            centroRotulo="total reciclado"
          />
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {MATERIAIS_RECICLADOS.map((m) => (
              <li key={m.nome} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.cor }} />
                <span className="flex-1">{m.nome}</span>
                <span className="font-semibold text-slate-700">
                  {m.valor.toLocaleString("pt-BR")}%
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle icone="leaf">Impacto estimado (2024)</CardTitle>
          <ul className="flex flex-col gap-3">
            {IMPACTO_ESTIMADO.map((i) => (
              <li
                key={i.titulo}
                className="flex items-center gap-3 rounded-xl bg-emerald-50/70 p-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-600">
                  <Icon name={ICONES[i.icone]} size={20} />
                </span>
                <span>
                  <span className="block text-lg font-bold text-slate-800">{i.valor}</span>
                  <span className="block text-xs text-slate-500">{i.titulo}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
            Estimativas calculadas sobre os volumes reciclados verificados na rede ECOLchain.
          </p>
        </Card>
      </div>

      <section className="flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-600 px-6 py-5 text-white">
        <p className="text-lg font-semibold sm:text-xl">
          Mais dados, mais transparência, mais impacto.
        </p>
        <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm">
          <LogoMarca size={24} />
          ECOLchain
        </span>
      </section>
    </div>
  );
}
