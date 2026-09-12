"use client";

import { useState } from "react";

interface Certificado {
  id: string;
  hash: string;
  empresa: string;
  cooperativa: string;
  material: string;
  volume: number;
  data: string;
}

export function Certificados({ certificados }: { certificados: Certificado[] }) {
  const [copiado, setCopiado] = useState<string | null>(null);

  async function copiar(id: string, hash: string) {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiado(id);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
      setCopiado(null);
    }
  }

  return (
    <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-emerald-900">
        Certificados de rastreabilidade
      </h2>
      <p className="mt-1 text-sm text-emerald-700">
        Comprovação auditável da política reversa, com segurança jurídica contra
        fraudes ambientais.
      </p>
      {certificados.length === 0 && (
        <p className="mt-4 text-sm text-emerald-700/70">
          Nenhuma coleta auditada ainda.
        </p>
      )}
      <div className="mt-4 flex flex-col gap-3">
        {certificados.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-emerald-900">
                {c.empresa} → {c.cooperativa}
              </p>
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                Auditado na blockchain (simulado)
              </span>
            </div>
            <p className="mt-1 text-sm text-emerald-700">
              {c.material} · {c.volume.toLocaleString("pt-BR")} t · {c.data}
            </p>
            <div className="mt-2 flex min-w-0 items-center gap-2">
              <code className="min-w-0 flex-1 truncate rounded bg-emerald-950 px-3 py-1.5 font-mono text-xs text-emerald-100">
                {c.hash}
              </code>
              <button
                type="button"
                onClick={() => copiar(c.id, c.hash)}
                className="shrink-0 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100"
              >
                {copiado === c.id ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
