"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const eixo = { fontSize: 11, fill: "#94a3b8" };

export function BarrasEvolucao({
  dados,
}: {
  dados: { ano: string; valor: number; rotulo: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <BarChart data={dados} margin={{ top: 22, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#eef6f1" />
        <XAxis dataKey="ano" tickLine={false} axisLine={false} tick={eixo} />
        <YAxis tickLine={false} axisLine={false} tick={eixo} width={38} />
        <Tooltip
          cursor={{ fill: "#f0fdf4" }}
          formatter={(v) => [`${Number(v).toLocaleString("pt-BR")} mi t`, "Reciclado"]}
          contentStyle={{ borderRadius: 12, border: "1px solid #d1fae5", fontSize: 12 }}
        />
        <Bar dataKey="valor" fill="#16a34a" radius={[6, 6, 0, 0]} maxBarSize={38}>
          <LabelList
            dataKey="rotulo"
            position="top"
            style={{ fontSize: 10, fill: "#0f7a46", fontWeight: 600 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DonutMateriais({
  dados,
  centroValor,
  centroRotulo,
  altura = 190,
}: {
  dados: { nome: string; valor: number; cor: string }[];
  centroValor?: string;
  centroRotulo?: string;
  altura?: number;
}) {
  return (
    <div className="relative" style={{ height: altura }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dados}
            dataKey="valor"
            nameKey="nome"
            innerRadius="62%"
            outerRadius="88%"
            paddingAngle={2}
            stroke="none"
          >
            {dados.map((d) => (
              <Cell key={d.nome} fill={d.cor} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v, n) => [`${Number(v).toLocaleString("pt-BR")}%`, String(n)]}
            contentStyle={{ borderRadius: 12, border: "1px solid #d1fae5", fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
      {centroValor && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-slate-800">{centroValor}</span>
          {centroRotulo && <span className="text-[11px] text-slate-400">{centroRotulo}</span>}
        </div>
      )}
    </div>
  );
}

export function LinhaEvolucao({
  dados,
}: {
  dados: { ano: string; taxa: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <LineChart data={dados} margin={{ top: 20, right: 12, left: -20, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#eef6f1" />
        <XAxis dataKey="ano" tickLine={false} axisLine={false} tick={eixo} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={eixo}
          width={40}
          domain={[0, 30]}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          formatter={(v) => [`${Number(v).toLocaleString("pt-BR")}%`, "Taxa de reciclagem"]}
          contentStyle={{ borderRadius: 12, border: "1px solid #d1fae5", fontSize: 12 }}
        />
        <Line
          type="monotone"
          dataKey="taxa"
          stroke="#16a34a"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#16a34a", strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        >
          <LabelList
            dataKey="taxa"
            position="top"
            formatter={(v) => `${Number(v).toLocaleString("pt-BR")}%`}
            style={{ fontSize: 10, fill: "#0f7a46", fontWeight: 600 }}
          />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
