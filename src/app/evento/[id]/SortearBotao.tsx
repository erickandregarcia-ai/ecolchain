"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { sortearEvento } from "@/app/actions";

export function SortearBotao({ eventoId, disabled }: { eventoId: string; disabled?: boolean }) {
  const router = useRouter();
  const [erro, setErro] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function sortear() {
    setErro(null);
    startTransition(async () => {
      const r = await sortearEvento(eventoId);
      if (!r.ok) {
        setErro(r.erro);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={sortear}
        disabled={pending || disabled}
        className="w-full rounded-lg bg-amber-400 px-4 py-2.5 font-bold text-amber-950 transition hover:bg-amber-500 disabled:opacity-50"
      >
        {pending ? "Sorteando..." : "Realizar sorteio (3º → 2º → 1º)"}
      </button>
      {erro && (
        <p role="alert" className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {erro}
        </p>
      )}
    </div>
  );
}
