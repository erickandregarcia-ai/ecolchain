import { getDb } from "@/lib/db/store";
import { MascoteSol } from "@/components/MascoteSol";
import { ScanTotem } from "./ScanTotem";

export const dynamic = "force-dynamic";

const USUARIO_ID = "55555555-5555-4555-8555-555555555555"; // Maria Clara

const vouchers = [
  { titulo: "10% off — Feira Orgânica", custo: "200 pts" },
  { titulo: "R$ 5 off — Bilhete Metrô", custo: "300 pts" },
  { titulo: "Café grátis — Padoca Verde", custo: "150 pts" },
];

const ecopontos = [
  { nome: "Ecoponto Vila Mariana", top: "22%", left: "25%" },
  { nome: "Totem Mercado Municipal", top: "55%", left: "58%" },
  { nome: "Ecoponto Estação Butantã", top: "74%", left: "35%" },
];

export default async function CidadaoPage() {
  const usuario = await getDb().getUsuario(USUARIO_ID);

  return (
    <main className="flex flex-1 items-start justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-[2rem] border border-emerald-200 bg-white p-6 shadow-xl sm:my-4 sm:rounded-[2.5rem]">
        {/* cabeçalho com mascote e dica */}
        <div className="flex items-center gap-3">
          <MascoteSol size={64} />
          <div className="relative flex-1 rounded-2xl rounded-bl-sm bg-amber-100 px-4 py-3 text-sm font-medium text-amber-900">
            Oi, {usuario?.nome ?? "reciclador(a)"}! Sou o SOL. Devolva sua
            embalagem limpa e acompanhe o destino dela até a indústria ☀️
          </div>
        </div>

        {/* saldos */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-emerald-600 p-4 text-white">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-100">
              Pontos
            </p>
            <p className="mt-1 text-3xl font-extrabold">
              {usuario?.pontos_reciclagem ?? 0}
            </p>
          </div>
          <div className="rounded-2xl bg-amber-400 p-4 text-amber-950">
            <p className="text-xs font-medium uppercase tracking-wide text-amber-800">
              Cashback
            </p>
            <p className="mt-1 text-3xl font-extrabold">
              R${" "}
              {(usuario?.cashback_acumulado ?? 0).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        {/* descontos */}
        <h2 className="mt-6 text-sm font-bold uppercase tracking-wide text-emerald-700">
          Clube de vantagens
        </h2>
        <div className="mt-2 flex flex-col gap-2">
          {vouchers.map((v) => (
            <div
              key={v.titulo}
              className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
            >
              <span className="text-sm font-medium text-emerald-900">
                🎟 {v.titulo}
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {v.custo}
              </span>
            </div>
          ))}
        </div>

        {/* mapa de ecopontos */}
        <h2 className="mt-6 text-sm font-bold uppercase tracking-wide text-emerald-700">
          Ecopontos e totens próximos
        </h2>
        <div className="relative mt-2 h-52 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-100 via-emerald-50 to-amber-50">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(#05966933 1px, transparent 1px), linear-gradient(90deg, #05966933 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {ecopontos.map((e) => (
            <div
              key={e.nome}
              className="absolute flex -translate-x-1/2 flex-col items-center"
              style={{ top: e.top, left: e.left }}
            >
              <span className="text-xl leading-none">📍</span>
              <span className="mt-1 whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-emerald-900 shadow">
                {e.nome}
              </span>
            </div>
          ))}
        </div>

        <ScanTotem usuarioId={USUARIO_ID} />

        <p className="mt-4 text-center text-xs text-emerald-700/70">
          Cada devolução é registrada em blockchain: você recicla, a cooperativa
          ganha renda e a empresa comprova a política reversa.
        </p>
      </div>
    </main>
  );
}
