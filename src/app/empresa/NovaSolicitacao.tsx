"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { buscarCooperativas, solicitarColeta } from "@/app/actions";
import type { Cooperativa, Empresa, TipoResiduo } from "@/lib/db/types";
import { TIPOS_RESIDUO } from "@/lib/db/types";

interface Props {
  empresas: Empresa[];
}

export function NovaSolicitacao({ empresas }: Props) {
  const router = useRouter();
  const [empresaId, setEmpresaId] = useState(empresas[0]?.id ?? "");
  const [tipo, setTipo] = useState<TipoResiduo>("PET");
  const [volume, setVolume] = useState("5");
  const [resultados, setResultados] = useState<Cooperativa[] | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function buscar() {
    setMensagem(null);
    startTransition(async () => {
      const coops = await buscarCooperativas(tipo);
      setResultados(coops);
    });
  }

  function solicitar(cooperativaId: string) {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("evento_id", empresaId);
      fd.set("cooperativa_id", cooperativaId);
      fd.set("tipo_residuo", tipo);
      fd.set("volume_estimado", volume);
      await solicitarColeta(fd);
      setMensagem(
        "✅ Coleta solicitada! A cooperativa foi notificada e o material segue direto da fonte para a reciclagem, sem atravessadores.",
      );
      setResultados(null);
      router.refresh();
    });
  }

  return (
    <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-emerald-900">
        Nova solicitação de coleta rastreável
      </h2>

      <label className="mt-4 block text-sm font-medium text-emerald-800">
        Empresa, indústria ou evento
      </label>
      <select
        value={empresaId}
        onChange={(e) => setEmpresaId(e.target.value)}
        className="mt-1 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm"
      >
        {empresas.map((e) => (
          <option key={e.id} value={e.id}>
            {e.nome} — {e.localizacao}
          </option>
        ))}
      </select>

      <p className="mt-4 text-sm font-medium text-emerald-800">
        Embalagem de alto valor
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TIPOS_RESIDUO.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTipo(t)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              tipo === t
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-emerald-300 bg-emerald-50 text-emerald-800 hover:border-emerald-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <label className="mt-4 block text-sm font-medium text-emerald-800">
        Volume estimado (toneladas)
      </label>
      <input
        type="number"
        min={0.1}
        step={0.1}
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        className="mt-1 w-full rounded-lg border border-emerald-300 px-3 py-2 text-sm"
      />

      <button
        type="button"
        onClick={buscar}
        disabled={pending}
        className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {pending ? "Buscando..." : "Buscar cooperativas homologadas"}
      </button>

      {mensagem && (
        <p className="mt-4 rounded-lg bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">
          {mensagem}
        </p>
      )}

      {resultados && (
        <div className="mt-5 flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Cooperativas homologadas ({resultados.length})
          </h3>
          {resultados.length === 0 && (
            <p className="text-sm text-emerald-700/70">
              Nenhuma cooperativa aceita {tipo} no momento.
            </p>
          )}
          {resultados.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-amber-300 bg-amber-50 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-emerald-900">{c.nome}</p>
                  <p className="text-sm text-emerald-700">
                    📍 {c.localizacao} · Capacidade {c.capacidade_toneladas} t ·{" "}
                    {c.percentual_mulheres}% de vagas para mulheres
                  </p>
                  <p className="mt-1 text-xs text-emerald-600">
                    Aceita: {c.materiais_aceitos.join(", ")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => solicitar(c.id)}
                  disabled={pending}
                  className="shrink-0 rounded-lg bg-amber-400 px-3 py-2 text-sm font-bold text-amber-950 transition hover:bg-amber-500 disabled:opacity-50"
                >
                  Solicitar coleta
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
