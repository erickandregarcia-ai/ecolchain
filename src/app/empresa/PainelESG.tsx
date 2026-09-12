"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TipoResiduo } from "@/lib/db/types";

export interface DadoGrafico {
  tipo: TipoResiduo;
  toneladas: number;
}

interface Props {
  dados: DadoGrafico[];
  toneladasTotal: number;
  creditosESG: number;
  co2Evitado: number;
  coletasAuditadas: number;
}

export function PainelESG({
  dados,
  toneladasTotal,
  creditosESG,
  co2Evitado,
  coletasAuditadas,
}: Props) {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-emerald-900">
        Painel ESG e créditos de reciclagem
      </h2>
      <p className="mt-1 text-sm text-emerald-700">
        Relatório de pegada de carbono e impacto ESG, rastreável e transparente.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-emerald-600 p-4 text-white">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-100">
            Toneladas Recicladas
          </p>
          <p className="mt-1 text-2xl font-extrabold">
            {toneladasTotal.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} t
          </p>
        </div>
        <div className="rounded-xl bg-amber-400 p-4 text-amber-950">
          <p className="text-xs font-medium uppercase tracking-wide text-amber-800">
            Créditos de reciclagem
          </p>
          <p className="mt-1 text-2xl font-extrabold">{creditosESG}</p>
          <p className="text-xs text-amber-800">1 crédito a cada 0,5 t</p>
        </div>
        <div className="rounded-xl bg-emerald-700 p-4 text-white">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-100">
            CO₂ evitado
          </p>
          <p className="mt-1 text-2xl font-extrabold">
            {co2Evitado.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} t
          </p>
          <p className="text-xs text-emerald-100">
            base: 195 mil t de CO₂ a cada 200 mil t recicladas
          </p>
        </div>
        <div className="rounded-xl bg-emerald-900 p-4 text-white">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-200">
            Coletas auditadas em blockchain
          </p>
          <p className="mt-1 text-2xl font-extrabold">{coletasAuditadas}</p>
        </div>
      </div>

      <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-emerald-700">
        Toneladas recicladas por material
      </h3>
      <div className="mt-2 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dados} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
            <XAxis dataKey="tipo" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} unit=" t" />
            <Tooltip
              formatter={(v) => [
                `${Number(v).toLocaleString("pt-BR")} t`,
                "Reciclado",
              ]}
            />
            <Bar dataKey="toneladas" fill="#059669" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
