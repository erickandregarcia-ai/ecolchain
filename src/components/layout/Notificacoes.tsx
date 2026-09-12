"use client";

import { useEffect, useState, useTransition } from "react";
import {
  listarNotificacoes,
  type NotificacaoColeta,
} from "@/app/actions";
import { Icon } from "@/components/ui/Icon";

const ROTULO: Record<NotificacaoColeta["status"], string> = {
  pendente: "Nova solicitação de coleta",
  aceito: "Coleta em andamento",
  auditado: "Auditada na blockchain",
  recusado: "Coleta recusada",
};

const COR: Record<NotificacaoColeta["status"], string> = {
  pendente: "bg-amber-100 text-amber-700",
  aceito: "bg-emerald-100 text-emerald-700",
  auditado: "bg-emerald-600 text-white",
  recusado: "bg-red-100 text-red-600",
};

function relativo(iso: string) {
  const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  return `há ${Math.floor(h / 24)} d`;
}

export function Notificacoes() {
  const [aberto, setAberto] = useState(false);
  const [itens, setItens] = useState<NotificacaoColeta[]>([]);
  const [pending, startTransition] = useTransition();

  const pendentes = itens.filter((i) => i.status === "pendente").length;

  useEffect(() => {
    if (!aberto) return;
    startTransition(async () => setItens(await listarNotificacoes()));
  }, [aberto]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Notificações"
        onClick={() => setAberto((v) => !v)}
        className="relative rounded-full border border-emerald-100 p-2 text-slate-500 transition hover:bg-emerald-50"
      >
        <Icon name="bell" size={18} />
        {pendentes > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white">
            {pendentes}
          </span>
        )}
      </button>

      {aberto && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setAberto(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl">
            <p className="border-b border-emerald-100 px-4 py-3 text-sm font-semibold text-slate-800">
              Notificações
            </p>
            <ul className="max-h-80 overflow-y-auto">
              {pending && itens.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-slate-400">
                  Carregando…
                </li>
              )}
              {!pending && itens.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-slate-400">
                  Nenhuma atividade ainda.
                </li>
              )}
              {itens.map((n) => (
                <li
                  key={n.id}
                  className="flex items-start gap-3 border-b border-emerald-50 px-4 py-3 last:border-0"
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${COR[n.status]}`}
                  >
                    <Icon
                      name={
                        n.status === "auditado"
                          ? "blockchain"
                          : n.status === "aceito"
                            ? "recycle"
                            : n.status === "recusado"
                              ? "info"
                              : "clock"
                      }
                      size={15}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-slate-700">
                      {ROTULO[n.status]}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {n.empresa} → {n.cooperativa}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-slate-400">
                      {n.material} ·{" "}
                      {n.volume.toLocaleString("pt-BR")} t ·{" "}
                      {relativo(n.data)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
