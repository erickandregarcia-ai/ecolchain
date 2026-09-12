"use client";

import { useMemo, useState } from "react";
import { FundoMapa } from "@/components/mapa/MapaCidade";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import {
  CORES_TIPO,
  MATERIAIS_FILTRO,
  PONTOS,
  RESUMO_PROXIMOS,
  TIPOS_PONTO,
  type PontoMapa,
  type TipoPonto,
} from "@/lib/data/mapa";

const ICONE_TIPO: Record<TipoPonto, string> = {
  Ecoponto: "recycle",
  Cooperativa: "users",
  "Logística reversa": "package",
  Recompensa: "star",
};

export default function MapaPage() {
  const [tipo, setTipo] = useState<TipoPonto | "Todos">("Todos");
  const [materiais, setMateriais] = useState<string[]>([]);
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<PontoMapa>(PONTOS[0]);
  const [voce, setVoce] = useState<{ x: number; y: number } | null>(null);
  const [localizando, setLocalizando] = useState(false);
  const [erroLoc, setErroLoc] = useState(false);

  const distanciaDe = (p: PontoMapa) =>
    voce ? Math.hypot(p.x - voce.x, p.y - voce.y) * 0.18 : null;

  const fmtDist = (p: PontoMapa) => {
    const d = distanciaDe(p);
    return d == null
      ? p.distancia
      : `${d.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} km`;
  };

  function localizar() {
    if (!navigator.geolocation) {
      setErroLoc(true);
      return;
    }
    setErroLoc(false);
    setLocalizando(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        const pos = { x: 50, y: 48 };
        setVoce(pos);
        setLocalizando(false);
        setSelecionado(
          PONTOS.reduce((a, b) =>
            Math.hypot(a.x - pos.x, a.y - pos.y) <
            Math.hypot(b.x - pos.x, b.y - pos.y)
              ? a
              : b,
          ),
        );
      },
      () => {
        setLocalizando(false);
        setErroLoc(true);
      },
      { timeout: 8000 },
    );
  }

  const pontos = useMemo(
    () =>
      PONTOS.filter((p) => tipo === "Todos" || p.tipo === tipo)
        .filter((p) => materiais.length === 0 || materiais.some((m) => p.materiais.includes(m)))
        .filter(
          (p) =>
            busca.trim() === "" ||
            `${p.nome} ${p.endereco} ${p.materiais.join(" ")}`
              .toLowerCase()
              .includes(busca.trim().toLowerCase()),
        ),
    [tipo, materiais, busca],
  );

  const pontosOrdenados = useMemo(
    () =>
      voce
        ? [...pontos].sort(
            (a, b) =>
              Math.hypot(a.x - voce.x, a.y - voce.y) -
              Math.hypot(b.x - voce.x, b.y - voce.y),
          )
        : pontos,
    [pontos, voce],
  );

  const alternarMaterial = (m: string) =>
    setMateriais((atual) =>
      atual.includes(m) ? atual.filter((x) => x !== m) : [...atual, m],
    );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-emerald-900 sm:text-3xl">
          Mapa de ecopontos e cooperativas
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Encontre pontos de coleta, cooperativas e logística reversa próximos de você.
        </p>
      </div>

      <Card className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative flex min-w-56 flex-1 items-center">
            <Icon name="search" size={18} className="absolute left-4 text-slate-400" />
            <span className="sr-only">Buscar ponto de coleta</span>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por endereço, bairro ou material"
              className="h-11 w-full rounded-full border border-emerald-100 bg-emerald-50/40 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white"
            />
          </label>
          <button
            type="button"
            onClick={localizar}
            disabled={localizando}
            className="flex h-11 items-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            <Icon name="locate" size={17} />
            {localizando ? "Localizando..." : "Minha localização"}
          </button>
          {erroLoc && (
            <span className="text-xs text-red-600">
              Não foi possível obter sua localização.
            </span>
          )}
          {voce && !erroLoc && (
            <span className="text-xs text-emerald-700">
              Distâncias recalculadas a partir de você.
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {(["Todos", ...TIPOS_PONTO] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                tipo === t
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              <Icon name={t === "Todos" ? "check" : ICONE_TIPO[t]} size={14} />
              {t === "Todos" ? "Todos" : t === "Ecoponto" ? "Ecopontos" : t === "Cooperativa" ? "Cooperativas" : t === "Recompensa" ? "Recompensas" : t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {MATERIAIS_FILTRO.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => alternarMaterial(m)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                materiais.includes(m)
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-white text-slate-500 hover:border-emerald-200"
              }`}
            >
              {m}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setMateriais([])}
            className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 transition hover:border-emerald-200"
          >
            <Icon name="plus" size={13} />
            Limpar materiais
          </button>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
        <Card className="relative overflow-hidden p-0">
          <div className="relative h-[26rem] w-full sm:h-[30rem]">
            <FundoMapa />

            {pontos.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelecionado(p)}
                style={{ left: `${p.x}%`, top: `${p.y}%`, color: CORES_TIPO[p.tipo] }}
                className="absolute -translate-x-1/2 -translate-y-full transition hover:scale-110"
                aria-label={`${p.tipo}: ${p.nome}`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full rounded-bl-none bg-current shadow-md ring-2 ring-white ${
                    selecionado.id === p.id ? "scale-110" : ""
                  }`}
                >
                  <Icon name={ICONE_TIPO[p.tipo]} size={16} className="text-white" />
                </span>
              </button>
            ))}

            {voce && (
              <span
                className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
                style={{ left: `${voce.x}%`, top: `${voce.y}%` }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full rounded-bl-none bg-slate-800 shadow-md ring-2 ring-white">
                  <Icon name="user" size={16} className="text-white" />
                </span>
                <span className="mt-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-800 shadow">
                  Você
                </span>
              </span>
            )}

            <div
              className="absolute w-64 max-w-[85%] -translate-x-1/2 rounded-2xl border border-emerald-100 bg-white p-3 shadow-lg"
              style={{
                left: `${Math.min(Math.max(selecionado.x, 20), 80)}%`,
                top: `calc(${selecionado.y}% + 14px)`,
              }}
            >
              <div className="flex items-start gap-2">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: CORES_TIPO[selecionado.tipo] }}
                >
                  <Icon name={ICONE_TIPO[selecionado.tipo]} size={16} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">{selecionado.nome}</p>
                  <p className="text-xs text-slate-400">
                    {selecionado.tipo} · {fmtDist(selecionado)}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">{selecionado.endereco}</p>
              <p className="mt-1 text-xs text-slate-500">
                Materiais: {selecionado.materiais.join(", ")}
              </p>
              {selecionado.recompensa && (
                <p className="mt-2">
                  <Badge tom="verde" icone="star">
                    Recompensa disponível
                  </Badge>
                </p>
              )}
              <button
                type="button"
                className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Ver detalhes
                <Icon name="chevronRight" size={13} />
              </button>
            </div>

            <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden rounded-lg border border-emerald-100 bg-white text-slate-600">
              <button type="button" className="px-2.5 py-1.5 hover:bg-emerald-50" aria-label="Aproximar">
                <Icon name="plus" size={15} />
              </button>
              <button type="button" className="border-t border-emerald-100 px-2.5 py-1.5 hover:bg-emerald-50" aria-label="Afastar">
                <Icon name="minus" size={15} />
              </button>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <h2 className="text-sm font-semibold text-slate-800">Próximos a você</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {RESUMO_PROXIMOS.map((r) => (
                <li key={r.rotulo} className="flex items-center gap-2 text-sm text-slate-600">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white"
                    style={{ background: CORES_TIPO[r.tipo] }}
                  >
                    <Icon name={ICONE_TIPO[r.tipo]} size={14} />
                  </span>
                  <strong className="font-semibold text-slate-800">{r.valor}</strong>
                  {r.rotulo}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-slate-800">Legenda</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {TIPOS_PONTO.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: CORES_TIPO[t] }} />
                  {t}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-0">
            <h2 className="border-b border-emerald-100 px-4 py-3 text-sm font-semibold text-slate-800">
              {pontos.length} resultado{pontos.length === 1 ? "" : "s"}
            </h2>
            <ul className="max-h-64 overflow-y-auto">
              {pontosOrdenados.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelecionado(p)}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition hover:bg-emerald-50/60 ${
                      selecionado.id === p.id ? "bg-emerald-50" : ""
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: CORES_TIPO[p.tipo] }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-slate-700">{p.nome}</span>
                      <span className="block text-xs text-slate-400">{fmtDist(p)}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
