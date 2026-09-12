import { ESTADOS, corDaTaxa } from "@/lib/data/estados";
import { ESTADOS_GEO, MAPA_VIEWBOX } from "@/lib/data/estados-geo";

const taxaPorUf = new Map(ESTADOS.map((e) => [e.uf, e]));

export function MapaBrasil({ destaque }: { destaque?: string }) {
  return (
    <svg viewBox={MAPA_VIEWBOX} className="h-auto w-full" role="img" aria-label="Mapa da taxa de reciclagem por estado">
      {ESTADOS_GEO.map((g) => {
        const dado = taxaPorUf.get(g.uf);
        return (
          <path
            key={g.uf}
            d={g.d}
            fill={dado ? corDaTaxa(dado.taxa) : "#e2f5ea"}
            stroke={destaque === g.uf ? "#064e3b" : "#ffffff"}
            strokeWidth={destaque === g.uf ? 2.5 : 1}
          >
            <title>{`${g.nome}: ${dado ? `${dado.taxa.toLocaleString("pt-BR")}%` : "sem dados"}`}</title>
          </path>
        );
      })}
      {ESTADOS_GEO.map((g) => (
        <text
          key={`t-${g.uf}`}
          x={g.cx}
          y={g.cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="13"
          fontWeight="600"
          fill={(taxaPorUf.get(g.uf)?.taxa ?? 0) >= 15 ? "#ffffff" : "#0f5132"}
        >
          {g.uf}
        </text>
      ))}
    </svg>
  );
}
