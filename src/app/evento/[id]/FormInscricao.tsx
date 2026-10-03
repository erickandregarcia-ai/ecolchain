"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { inscreverEmEvento } from "@/app/actions";
import {
  NUMERO_SORTE_MAX,
  NUMERO_SORTE_MIN,
  PREMIOS_SORTEIO,
} from "@/lib/db/types";

const PREMIOS_EXIBICAO = [
  { lugar: "3º lugar", premio: PREMIOS_SORTEIO.terceiro },
  { lugar: "2º lugar", premio: PREMIOS_SORTEIO.segundo },
  { lugar: "1º lugar", premio: PREMIOS_SORTEIO.primeiro },
];

const CAMPO =
  "mt-1 w-full rounded-lg border border-emerald-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none";

function dataValida(dia: string, mes: string, ano: string): boolean {
  if (!/^\d{1,2}$/.test(dia) || !/^\d{1,2}$/.test(mes) || !/^\d{4}$/.test(ano)) {
    return false;
  }
  const d = Number(dia);
  const m = Number(mes);
  const a = Number(ano);
  const data = new Date(Date.UTC(a, m - 1, d));
  return (
    data.getUTCFullYear() === a &&
    data.getUTCMonth() === m - 1 &&
    data.getUTCDate() === d &&
    a >= 1900 &&
    data.getTime() <= Date.now()
  );
}

interface Props {
  eventoId: string;
  encerrado?: boolean;
}

export function FormInscricao({ eventoId, encerrado = false }: Props) {
  const router = useRouter();
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setErro(null);
    setSucesso(null);
    const dia = String(formData.get("dia") ?? "").trim();
    const mes = String(formData.get("mes") ?? "").trim();
    const ano = String(formData.get("ano") ?? "").trim();
    if (!dataValida(dia, mes, ano)) {
      setErro("Informe uma data de nascimento válida.");
      return;
    }
    formData.set("evento_id", eventoId);
    const numero = String(formData.get("numero_sorte") ?? "");
    startTransition(async () => {
      const r = await inscreverEmEvento(formData);
      if (!r.ok) {
        setErro(r.erro);
        return;
      }
      setSucesso(`Inscrição confirmada! Seu número da sorte é ${numero}. Boa sorte!`);
      form.reset();
      router.refresh();
    });
  }

  return (
    <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-emerald-900">Inscrição no sorteio</h2>
      <p className="mt-1 text-sm text-emerald-700">
        Pedimos apenas o essencial para identificar os vencedores.
      </p>

      <div className="mt-4 rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-900">
          Prêmios do sorteio
        </p>
        <ul className="mt-2 grid gap-1 text-sm text-amber-950 sm:grid-cols-3">
          {PREMIOS_EXIBICAO.map((p) => (
            <li key={p.lugar}>
              <span className="font-semibold">{p.lugar}</span> – {p.premio}
            </li>
          ))}
        </ul>
      </div>

      {encerrado ? (
        <p className="mt-4 rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600">
          O sorteio deste evento já foi realizado. Inscrições encerradas.
        </p>
      ) : (
        <form onSubmit={enviar} className="mt-4 flex flex-col gap-4">
          <label className="block text-sm font-medium text-emerald-800">
            Nome
            <input name="nome" required minLength={2} autoComplete="name" className={CAMPO} />
          </label>

          <label className="block text-sm font-medium text-emerald-800">
            Telefone
            <input
              name="telefone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="(11) 91234-5678"
              className={CAMPO}
            />
          </label>

          <fieldset>
            <legend className="text-sm font-medium text-emerald-800">Data de nascimento</legend>
            <div className="mt-1 grid grid-cols-[1fr_1fr_1.5fr] gap-2">
              <input
                name="dia"
                aria-label="Dia"
                placeholder="Dia"
                required
                inputMode="numeric"
                pattern="\d{1,2}"
                maxLength={2}
                className={CAMPO}
              />
              <input
                name="mes"
                aria-label="Mês"
                placeholder="Mês"
                required
                inputMode="numeric"
                pattern="\d{1,2}"
                maxLength={2}
                className={CAMPO}
              />
              <input
                name="ano"
                aria-label="Ano"
                placeholder="Ano"
                required
                inputMode="numeric"
                pattern="\d{4}"
                maxLength={4}
                className={CAMPO}
              />
            </div>
          </fieldset>

          <label className="block text-sm font-medium text-emerald-800">
            Número da sorte ({NUMERO_SORTE_MIN} a {NUMERO_SORTE_MAX})
            <input
              name="numero_sorte"
              type="number"
              required
              min={NUMERO_SORTE_MIN}
              max={NUMERO_SORTE_MAX}
              step={1}
              inputMode="numeric"
              className={CAMPO}
            />
          </label>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {pending ? "Enviando..." : "Confirmar inscrição"}
          </button>
        </form>
      )}

      {erro && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {erro}
        </p>
      )}
      {sucesso && (
        <p className="mt-4 rounded-lg bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">
          {sucesso}
        </p>
      )}
    </section>
  );
}
