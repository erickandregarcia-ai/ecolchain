"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { aceitarColeta, confirmarRecebimento } from "@/app/actions";

export interface MatchCard {
  id: string;
  status: "pendente" | "aceito" | "auditado";
  empresa: string;
  material: string;
  volume: number;
  hash: string | null;
}

interface Props {
  pendentes: MatchCard[];
  aceitos: MatchCard[];
  auditados: MatchCard[];
}

function Card({ match }: { match: MatchCard }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
      <p className="font-bold text-emerald-900">{match.empresa}</p>
      <p className="mt-1 text-sm text-emerald-700">
        {match.material} · {match.volume.toLocaleString("pt-BR")} t
      </p>
      {match.status === "pendente" && (
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await aceitarColeta(match.id);
              router.refresh();
            })
          }
          className="mt-3 w-full rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {pending ? "..." : "Aceitar Coleta"}
        </button>
      )}
      {match.status === "aceito" && (
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await confirmarRecebimento(match.id);
              router.refresh();
            })
          }
          className="mt-3 w-full rounded-lg bg-amber-400 px-3 py-2 text-sm font-bold text-amber-950 transition hover:bg-amber-500 disabled:opacity-50"
        >
          {pending ? "Auditando..." : "Confirmar Recebimento"}
        </button>
      )}
      {match.status === "auditado" && match.hash && (
        <p className="mt-3 truncate rounded bg-emerald-950 px-2 py-1.5 font-mono text-xs text-emerald-100">
          ⛓ {match.hash.slice(0, 18)}…
        </p>
      )}
    </div>
  );
}

function Coluna({
  titulo,
  cor,
  cards,
}: {
  titulo: string;
  cor: string;
  cards: MatchCard[];
}) {
  return (
    <div className={`rounded-2xl p-4 ${cor}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-emerald-900">{titulo}</h3>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-emerald-800 shadow-sm">
          {cards.length}
        </span>
      </div>
      <div className="mt-3 flex flex-col gap-3">
        {cards.map((m) => (
          <Card key={m.id} match={m} />
        ))}
        {cards.length === 0 && (
          <p className="py-6 text-center text-sm text-emerald-700/60">
            Nenhuma coleta
          </p>
        )}
      </div>
    </div>
  );
}

export function Kanban({ pendentes, aceitos, auditados }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Coluna
        titulo="Novas Solicitações"
        cor="bg-amber-100/70 border border-amber-200"
        cards={pendentes}
      />
      <Coluna
        titulo="Em Andamento"
        cor="bg-emerald-100/70 border border-emerald-200"
        cards={aceitos}
      />
      <Coluna
        titulo="Finalizadas"
        cor="bg-emerald-200/60 border border-emerald-300"
        cards={auditados}
      />
    </div>
  );
}
