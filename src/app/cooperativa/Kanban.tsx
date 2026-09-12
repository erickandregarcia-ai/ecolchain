"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  aceitarColeta,
  confirmarRecebimento,
  recusarColeta,
} from "@/app/actions";

export interface MatchCard {
  id: string;
  status: "pendente" | "aceito" | "auditado" | "recusado";
  empresa: string;
  material: string;
  volume: number;
  hash: string | null;
}

interface Props {
  pendentes: MatchCard[];
  aceitos: MatchCard[];
  auditados: MatchCard[];
  recusados: MatchCard[];
}

function Card({ match }: { match: MatchCard }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [hashGerado, setHashGerado] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  return (
    <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
      <p className="font-bold text-emerald-900">{match.empresa}</p>
      <p className="mt-1 text-sm text-emerald-700">
        {match.material} · {match.volume.toLocaleString("pt-BR")} t
      </p>
      {match.status === "pendente" && (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await aceitarColeta(match.id);
                router.refresh();
              })
            }
            className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {pending ? "..." : "Aceitar coleta"}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await recusarColeta(match.id);
                router.refresh();
              })
            }
            className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            Recusar
          </button>
        </div>
      )}
      {match.status === "aceito" && (
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              const hash = await confirmarRecebimento(match.id);
              setHashGerado(hash);
              router.refresh();
            })
          }
          className="mt-3 w-full rounded-lg bg-amber-400 px-3 py-2 text-sm font-bold text-amber-950 transition hover:bg-amber-500 disabled:opacity-50"
        >
          {pending ? "Auditando..." : "Confirmar recebimento"}
        </button>
      )}
      {match.status === "auditado" && match.hash && (
        <p className="mt-3 truncate rounded bg-emerald-950 px-2 py-1.5 font-mono text-xs text-emerald-100">
          ⛓ {match.hash.slice(0, 18)}…
        </p>
      )}

      {hashGerado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/60 p-4"
          onClick={() => setHashGerado(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-extrabold text-emerald-900">
              Coleta auditada na blockchain!
            </h2>
            <p className="mt-1 text-sm text-emerald-700">
              O recebimento foi registrado e o hash auditável já comprova a
              política reversa para a empresa.
            </p>
            <code className="mt-4 block break-all rounded-xl bg-emerald-950 px-4 py-3 font-mono text-xs text-emerald-100">
              {hashGerado}
            </code>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(hashGerado);
                    setCopiado(true);
                    setTimeout(() => setCopiado(false), 2000);
                  } catch {
                    setCopiado(false);
                  }
                }}
                className="flex-1 rounded-xl border border-emerald-300 bg-white px-4 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
              >
                {copiado ? "Copiado!" : "Copiar hash"}
              </button>
              <button
                type="button"
                onClick={() => setHashGerado(null)}
                className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
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

export function Kanban({ pendentes, aceitos, auditados, recusados }: Props) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <Coluna
          titulo="Novas solicitações"
          cor="bg-amber-100/70 border border-amber-200"
          cards={pendentes}
        />
        <Coluna
          titulo="Em andamento"
          cor="bg-emerald-100/70 border border-emerald-200"
          cards={aceitos}
        />
        <Coluna
          titulo="Auditadas na blockchain"
          cor="bg-emerald-200/60 border border-emerald-300"
          cards={auditados}
        />
      </div>
      {recusados.length > 0 && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50/60 p-4">
          <h3 className="text-sm font-bold text-red-800">
            Recusadas ({recusados.length})
          </h3>
          <ul className="mt-2 flex flex-col gap-1">
            {recusados.map((m) => (
              <li key={m.id} className="text-xs text-red-700/80">
                {m.empresa} · {m.material} ·{" "}
                {m.volume.toLocaleString("pt-BR")} t
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
