import { getDb } from "@/lib/db/store";
import { Kanban, type MatchCard } from "./Kanban";

export const dynamic = "force-dynamic";

const COOP_DESTAQUE = "33333333-3333-4333-8333-333333333333"; // Cooperativa Mulheres do Amanhã
const META_RENDA = 85;

export default async function CooperativaPage() {
  const db = getDb();
  const [matches, cooperativas] = await Promise.all([
    db.listMatches(),
    db.listCooperativas(),
  ]);

  const toCard = (status: MatchCard["status"]): MatchCard[] =>
    matches
      .filter((m) => m.status === status)
      .map((m) => ({
        id: m.id,
        status: m.status,
        empresa: m.empresa.nome,
        material: m.tipo_residuo,
        volume: m.volume_estimado,
        hash: m.hash_blockchain,
      }));

  const destaque = cooperativas.find((c) => c.id === COOP_DESTAQUE);
  const renda = destaque?.indicador_impacto_renda ?? 0;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-extrabold text-emerald-900">
        Painel da Cooperativa
      </h1>
      <p className="mt-1 text-sm text-emerald-700">
        Gerencie as solicitações de coleta e acompanhe o impacto social da sua
        equipe.
      </p>

      <section className="mt-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-emerald-900">
              Evolução da renda média
            </h2>
            <p className="text-sm text-emerald-700">
              {destaque?.nome ?? "Cooperativa"} · rumo à meta de {META_RENDA}% de
              aumento de renda
            </p>
          </div>
          <span className="rounded-full bg-amber-400 px-4 py-1.5 text-sm font-bold text-amber-950">
            {destaque?.percentual_mulheres}% mulheres na equipe (meta 70%)
          </span>
        </div>
        <div className="mt-4 flex items-end gap-4">
          <p className="text-5xl font-extrabold leading-none text-emerald-600">
            {renda}%
          </p>
          <p className="pb-1 text-sm font-medium text-emerald-700">
            de aumento de renda alcançado
          </p>
        </div>
        <div className="mt-3 h-6 w-full overflow-hidden rounded-full bg-emerald-100">
          <div
            className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 pr-3 text-xs font-bold text-white transition-all"
            style={{ width: `${Math.min(100, (renda / META_RENDA) * 100)}%` }}
          >
            meta {META_RENDA}%
          </div>
        </div>
      </section>

      <div className="mt-6">
        <Kanban
          pendentes={toCard("pendente")}
          aceitos={toCard("aceito")}
          auditados={toCard("auditado")}
        />
      </div>
    </main>
  );
}
