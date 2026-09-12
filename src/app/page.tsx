import Link from "next/link";
import { MascoteSol } from "@/components/MascoteSol";

const paineis = [
  {
    href: "/empresa",
    titulo: "Painel da Empresa",
    descricao:
      "Empresas, indústrias e eventos solicitam coletas rastreáveis, comprovam as metas da política reversa (PNRS e Decreto 12.688/2025) e emitem créditos de reciclagem auditados em blockchain.",
    emoji: "🏢",
  },
  {
    href: "/cooperativa",
    titulo: "Painel da Cooperativa",
    descricao:
      "Cooperativas e catadores recebem o material direto da fonte, sem atravessadores, e acompanham a dignidade econômica social: renda média e participação de mulheres.",
    emoji: "♻️",
  },
  {
    href: "/cidadao",
    titulo: "dApp do Cidadão",
    descricao:
      "O cidadão devolve embalagens nos ecopontos e totens, acompanha o destino auditável do seu resíduo e é recompensado com pontos e cashback.",
    emoji: "📱",
  },
];

const indicadores = [
  { valor: "82 mi t", legenda: "de resíduos sólidos gerados no Brasil por ano" },
  { valor: "4%", legenda: "é tudo o que o país recicla hoje" },
  { valor: "96%", legenda: "de espaço para alcançar novos negócios" },
  { valor: "R$ 120 bi", legenda: "de prejuízo anual com a gestão ineficiente" },
];

const ciclo = [
  "Empresa solicita a coleta rastreável",
  "Cooperativa aceita e organiza a triagem",
  "Cidadão devolve a embalagem e ganha recompensa",
  "Cooperativa confirma o recebimento",
  "Crédito de reciclagem auditado na blockchain",
];

const impacto2030 = [
  "200.000 toneladas de resíduos reciclados",
  "195.000 toneladas de CO₂ evitadas",
  "15.000 a 20.000 catadores com +85% de renda média",
  "70% das vagas destinadas a mulheres",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12">
      <section className="flex flex-col items-center gap-6 text-center">
        <MascoteSol size={110} />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-emerald-900 sm:text-5xl">
            ECOLchain
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-base">
            Recicle · Monetize · Escale · Sustentabilidade
          </p>
        </div>
        <p className="max-w-2xl text-emerald-800/80">
          Ecossistema de finanças regenerativas (ReFi) que usa blockchain e
          tokenomics para dar transparência e rastreabilidade a toda a política
          reversa de resíduos — conectando poder público, empresas, cooperativas
          e cidadãos em um modelo onde todos ganham.
        </p>
        <p className="max-w-2xl text-sm font-medium text-emerald-700">
          Visão: ser a maior plataforma de economia circular inclusiva da
          América Latina, com escala global.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {indicadores.map((i) => (
          <div
            key={i.valor}
            className="rounded-2xl border border-emerald-200 bg-white p-4 text-center shadow-sm"
          >
            <p className="text-2xl font-extrabold text-emerald-600">{i.valor}</p>
            <p className="mt-1 text-xs text-emerald-800/70">{i.legenda}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {paineis.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-md"
          >
            <span className="text-3xl">{p.emoji}</span>
            <h2 className="mt-3 text-lg font-bold text-emerald-900 group-hover:text-emerald-600">
              {p.titulo}
            </h2>
            <p className="mt-2 text-sm text-emerald-800/70">{p.descricao}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-amber-300/60 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-amber-900">
          O ciclo auditável da ECOLchain
        </h2>
        <ol className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {ciclo.map((passo, i) => (
            <li
              key={passo}
              className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm sm:flex-1"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-emerald-900">
                {passo}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-900 p-6 text-emerald-50">
        <h2 className="text-lg font-bold text-amber-300">
          Impacto projetado 2030
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {impacto2030.map((m) => (
            <li key={m} className="flex items-start gap-2 text-sm">
              <span className="text-amber-300">◆</span>
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-emerald-200/80">
          Alinhado a 8 dos 17 Objetivos de Desenvolvimento Sustentável da ONU e
          à Lei 14.260/2021 (Incentivo à Reciclagem). Fase 1: São Paulo capital
          e região metropolitana.
        </p>
      </section>
    </main>
  );
}
