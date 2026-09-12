import { getDb } from "@/lib/db/store";
import {
  TIPOS_RESIDUO,
  type StatusMatch,
  type TipoResiduo,
} from "@/lib/db/types";
import { NovaSolicitacao } from "./NovaSolicitacao";
import { PainelESG, type DadoGrafico } from "./PainelESG";
import { Certificados } from "./Certificados";

export const dynamic = "force-dynamic";

const META_PNRS = 22;

const ROTULO_STATUS: Record<StatusMatch, string> = {
  pendente: "Aguardando cooperativa",
  aceito: "Em andamento",
  auditado: "Auditado",
  recusado: "Recusada",
};

const COR_STATUS: Record<StatusMatch, string> = {
  pendente: "bg-amber-100 text-amber-800",
  aceito: "bg-emerald-100 text-emerald-800",
  auditado: "bg-emerald-600 text-white",
  recusado: "bg-red-100 text-red-700",
};

export default async function EmpresaPage() {
  const db = getDb();
  const [empresas, matches] = await Promise.all([
    db.listEmpresas(),
    db.listMatches(),
  ]);

  const auditados = matches.filter((m) => m.status === "auditado");
  const emAberto = matches.filter((m) => m.status !== "auditado");
  const porMaterial = new Map<TipoResiduo, number>();
  for (const m of auditados) {
    porMaterial.set(
      m.tipo_residuo,
      (porMaterial.get(m.tipo_residuo) ?? 0) + m.volume_estimado,
    );
  }
  const dados: DadoGrafico[] = TIPOS_RESIDUO.map((tipo) => ({
    tipo,
    toneladas: porMaterial.get(tipo) ?? 0,
  }));
  const toneladasTotal = auditados.reduce((s, m) => s + m.volume_estimado, 0);
  const creditosESG = Math.floor(toneladasTotal / 0.5);
  const co2Evitado = toneladasTotal * 0.975;

  const colocadoNoMercado = empresas.reduce(
    (s, e) => s + e.volume_estimado,
    0,
  );
  const pctComprovado =
    colocadoNoMercado > 0 ? (toneladasTotal / colocadoNoMercado) * 100 : 0;

  const certificados = auditados.map((m) => ({
    id: m.id,
    hash: m.hash_blockchain ?? "",
    empresa: m.empresa.nome,
    cooperativa: m.cooperativa.nome,
    material: m.tipo_residuo,
    volume: m.volume_estimado,
    data: new Date(m.created_at).toLocaleDateString("pt-BR"),
  }));

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-extrabold text-emerald-900">
        Painel da Empresa
      </h1>
      <p className="mt-1 text-sm text-emerald-700">
        Solicite coletas rastreáveis, comprove as metas da política reversa de
        embalagens e adquira créditos de reciclagem auditados em blockchain.
      </p>
      <p className="mt-3 rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-xs text-amber-900">
        Pela PNRS, fabricantes precisam comprovar a reciclagem de ao menos 22%
        das embalagens colocadas no mercado. O Decreto 12.688/2025 elevou a meta
        para 32% do plástico, com multas de até R$ 50 milhões e risco de perda
        da licença ambiental. Os dados auditados em blockchain dão segurança
        jurídica contra fraudes ambientais.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <NovaSolicitacao empresas={empresas} />
        </div>
        <div className="min-w-0">
          <PainelESG
            dados={dados}
            toneladasTotal={toneladasTotal}
            creditosESG={creditosESG}
            co2Evitado={co2Evitado}
            coletasAuditadas={auditados.length}
          />
        </div>

        <section className="min-w-0 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-emerald-900">Minhas coletas</h2>
          <p className="mt-1 text-sm text-emerald-700">
            Acompanhe o status das solicitações em tempo real.
          </p>
          {emAberto.length === 0 && (
            <p className="mt-4 text-sm text-emerald-700/70">
              Nenhuma coleta em aberto.
            </p>
          )}
          <ul className="mt-4 flex flex-col gap-3">
            {emAberto.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-emerald-900">
                    {m.empresa.nome} → {m.cooperativa.nome}
                  </p>
                  <p className="text-xs text-emerald-700">
                    {m.tipo_residuo} ·{" "}
                    {m.volume_estimado.toLocaleString("pt-BR")} t ·{" "}
                    {new Date(m.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${COR_STATUS[m.status]}`}
                >
                  {ROTULO_STATUS[m.status]}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="min-w-0 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-emerald-900">
            Meta de logística reversa (PNRS)
          </h2>
          <p className="mt-1 text-sm text-emerald-700">
            {pctComprovado.toLocaleString("pt-BR", {
              maximumFractionDigits: 1,
            })}
            % comprovado · meta {META_PNRS}% das embalagens colocadas no mercado
          </p>
          <div className="relative mt-4 h-6 w-full overflow-hidden rounded-full bg-emerald-100">
            <div
              className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 pr-3 text-xs font-bold text-white transition-all"
              style={{
                width: `${Math.min(100, (pctComprovado / META_PNRS) * 100)}%`,
              }}
            >
              {pctComprovado >= META_PNRS ? "meta atingida" : ""}
            </div>
          </div>
          <div className="mt-1 flex justify-between text-xs text-emerald-700/80">
            <span>
              {toneladasTotal.toLocaleString("pt-BR", {
                maximumFractionDigits: 1,
              })}{" "}
              t comprovadas de{" "}
              {colocadoNoMercado.toLocaleString("pt-BR", {
                maximumFractionDigits: 1,
              })}{" "}
              t no mercado
            </span>
            <span>meta {META_PNRS}%</span>
          </div>
          <p className="mt-3 text-xs text-emerald-700/80">
            O Decreto 12.688/2025 eleva a meta para 32% do plástico. Coletas
            auditadas em blockchain contam como prova jurídica.
          </p>
        </section>

        <div className="min-w-0 lg:col-span-2">
          <Certificados certificados={certificados} />
        </div>
      </div>
    </main>
  );
}
