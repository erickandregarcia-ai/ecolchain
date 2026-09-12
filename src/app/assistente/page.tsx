"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { LogoMarca } from "@/components/ui/Logo";
import { RANKING_ESTADOS } from "@/lib/data/estados";
import { PONTOS } from "@/lib/data/mapa";
import { PROJETOS } from "@/lib/data/projetos";

interface Mensagem {
  autor: "usuario" | "ia";
  texto: string;
  itens?: string[];
  fonte?: string;
}

const SUGESTOES = [
  "Mostre o mapa do estado",
  "Quais são os principais projetos?",
  "Onde ficam os ecopontos em SP?",
];

const topEstados = RANKING_ESTADOS.slice(0, 5).map(
  (e, i) => `${i + 1}. ${e.nome} – ${e.taxa.toLocaleString("pt-BR")}%`,
);

function responder(pergunta: string): Mensagem {
  const q = pergunta.toLowerCase();

  if (q.includes("ecoponto") || q.includes("mapa") || q.includes("coleta")) {
    return {
      autor: "ia",
      texto:
        "Os pontos mais próximos cadastrados na rede ECOLchain em São Paulo são:",
      itens: PONTOS.slice(0, 4).map((p) => `${p.nome} — ${p.endereco} (${p.distancia})`),
      fonte: "Rede ECOLchain | Atualização: 06/2025",
    };
  }

  if (q.includes("projeto")) {
    return {
      autor: "ia",
      texto: "Os projetos com maior ECOLchain Sustainability Score hoje são:",
      itens: PROJETOS.slice(0, 4).map((p) => `${p.nome} (${p.uf}) – score ${p.score}`),
      fonte: "ECOLchain Sustainability Score | Atualização: 06/2025",
    };
  }

  return {
    autor: "ia",
    texto:
      "Com base nos dados mais recentes do ECOLchain (2024), os estados com maior taxa de reciclagem são:",
    itens: topEstados,
    fonte: "SINIR | Atualização: 12/2024",
  };
}

const INICIAL: Mensagem[] = [
  { autor: "usuario", texto: "Quais são os estados que mais reciclam no Brasil?" },
  responder("estados"),
];

export default function AssistentePage() {
  const [mensagens, setMensagens] = useState<Mensagem[]>(INICIAL);
  const [texto, setTexto] = useState("");

  const enviar = (pergunta: string) => {
    const limpa = pergunta.trim();
    if (!limpa) return;
    setMensagens((m) => [...m, { autor: "usuario", texto: limpa }, responder(limpa)]);
    setTexto("");
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-emerald-900 sm:text-3xl">
          Assistente IA
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Pergunte sobre os projetos, pontos de coleta, dados e evidências.
        </p>
      </div>

      <Card className="flex flex-col gap-4">
        <ul className="flex min-h-[22rem] flex-col gap-4">
          {mensagens.map((m, i) => (
            <li
              key={`${m.autor}-${i}`}
              className={`flex gap-3 ${m.autor === "usuario" ? "justify-end" : ""}`}
            >
              {m.autor === "ia" && (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <LogoMarca size={22} />
                </span>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  m.autor === "usuario"
                    ? "rounded-br-sm bg-emerald-700 text-white"
                    : "rounded-bl-sm bg-emerald-50/80 text-slate-700"
                }`}
              >
                <p>{m.texto}</p>
                {m.itens && (
                  <ol className="mt-2 flex flex-col gap-1 pl-1">
                    {m.itens.map((item) => (
                      <li key={item} className="text-sm text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
                {m.fonte && <p className="mt-2 text-xs text-slate-400">Fonte: {m.fonte}</p>}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {SUGESTOES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => enviar(s)}
              className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800 transition hover:bg-emerald-50"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            enviar(texto);
          }}
          className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/40 py-1.5 pl-4 pr-1.5"
        >
          <label className="flex-1">
            <span className="sr-only">Digite sua pergunta</span>
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite sua pergunta..."
              className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>
          <button
            type="submit"
            aria-label="Enviar pergunta"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700"
          >
            <Icon name="send" size={16} />
          </button>
        </form>
      </Card>
    </div>
  );
}
