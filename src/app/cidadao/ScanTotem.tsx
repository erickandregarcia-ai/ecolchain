"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { simularScanQr } from "@/app/actions";
import { MascoteSol } from "@/components/MascoteSol";

export function ScanTotem({ usuarioId }: { usuarioId: string }) {
  const router = useRouter();
  const [aberto, setAberto] = useState(false);
  const [pending, startTransition] = useTransition();

  function escanear() {
    startTransition(async () => {
      await simularScanQr(usuarioId);
      setAberto(true);
    });
  }

  function fechar() {
    setAberto(false);
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={escanear}
        disabled={pending}
        className="mt-6 w-full rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {pending ? "Escaneando..." : "📷 Devolver embalagem no totem"}
      </button>

      {aberto && (
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
              <span className="font-bold text-emerald-600">+50 pontos</span> e{" "}
              <span className="font-bold text-amber-600">+R$ 2,50</span> de
              cashback
            </p>
            <p className="mt-2 text-xs text-emerald-700/70">
              Seu esforço foi recompensado e o material segue rastreável até a
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
