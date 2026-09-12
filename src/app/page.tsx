import Link from "next/link";
import { MascoteSol } from "@/components/MascoteSol";

const paineis = [
  {
    href: "/empresa",
    titulo: "Painel da Empresa",
    descricao:
      "Organizadores de eventos solicitam coletas, acompanham indicadores ESG e emitem certificados de rastreabilidade auditados.",
    emoji: "🏢",
  },
  {
    href: "/cooperativa",
    titulo: "Painel da Cooperativa",
    descricao:
      "Cooperativas de catadores recebem solicitações, aceitam coletas e confirmam o recebimento dos materiais com registro auditável.",
    emoji: "♻️",
  },
  {
    href: "/cidadao",
    titulo: "App do Cidadão",
    descricao:
      "Cidadãos depositam resíduos nos ecopontos, escaneiam o QR code do totem e acumulam pontos e cashback.",
    emoji: "📱",
  },
];

const caminhoFeliz = [
  "Evento solicita coleta",
  "Cooperativa aceita",
  "Cidadão deposita e ganha cashback",
  "Cooperativa confirma recebimento",
  "Empresa vê certificado Web3",
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
          <p className="mt-2 text-xl font-medium text-emerald-700">
            — logística reversa auditável
          </p>
        </div>
        <p className="max-w-2xl text-emerald-800/80">
          Plataforma ReFi que conecta eventos geradores de resíduos, cooperativas
          de catadores e cidadãos, com rastreabilidade simulada em blockchain e
          incentivos de cashback pela reciclagem.
        </p>
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
          Caminho feliz da demo
        </h2>
        <ol className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {caminhoFeliz.map((passo, i) => (
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
    </main>
  );
}
