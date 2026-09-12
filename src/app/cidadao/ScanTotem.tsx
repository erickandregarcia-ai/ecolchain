"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { simularScanQr } from "@/app/actions";
import { RECOMPENSAS } from "@/lib/recompensas";
import { TIPOS_RESIDUO, type TipoResiduo } from "@/lib/db/types";
import { MascoteSol } from "@/components/MascoteSol";

export function ScanTotem({ usuarioId }: { usuarioId: string }) {
  const router = useRouter();
  const [tipo, setTipo] = useState<TipoResiduo>("PET");
  const [resultado, setResultado] = useState<{
    ganho: number;
    bonus: number;
  } | null>(null);
  const [pending, startTransition] = useTransition();

  const recompensa = RECOMPENSAS[tipo];

  function escanear() {
    startTransition(async () => {
      const res = await simularScanQr(usuarioId, tipo);
      setResultado({ ganho: res.ganho, bonus: res.bonus });
    });
  }

  function fechar() {
    setResultado(null);
    router.refresh();
  }

  return (
    <>
      <p className="mt-6 text-sm font-medium text-emerald-800">
        O que você está devolvendo?
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TIPOS_RESIDUO.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTipo(t)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              tipo === t
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-emerald-300 bg-emerald-50 text-emerald-800 hover:border-emerald-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={escanear}
        disabled={pending}
        className="mt-4 w-full rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {pending ? "Escaneando..." : "📷 Devolver embalagem no totem"}
      </button>
      <p className="mt-2 text-center text-xs font-medium text-emerald-700">
        {tipo}: +{recompensa.pontos} pontos · +
        {recompensa.cashback.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}{" "}
        de cashback
      </p>

      {resultado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/60 p-4"
          onClick={fechar}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center">
              <MascoteSol size={90} />
            </div>
            <h2 className="mt-4 text-xl font-extrabold text-emerald-900">
              Devolução registrada na blockchain!
            </h2>
            <p className="mt-2 text-emerald-700">
              <span className="font-bold text-emerald-600">
                +{resultado.ganho} pontos
              </span>{" "}
              e{" "}
              <span className="font-bold text-amber-600">
                +
                {resultado.bonus.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>{" "}
              de cashback
            </p>
            <p className="mt-2 text-xs text-emerald-700/70">
              Seu {tipo} foi recompensado e o material segue rastreável até a
              indústria recicladora.
            </p>
            <button
              type="button"
              onClick={fechar}
              className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
