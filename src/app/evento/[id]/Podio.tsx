import { PREMIOS_SORTEIO, type LugarSorteio } from "@/lib/db/types";

const DEGRAUS: { lugar: LugarSorteio; rotulo: string; altura: string; cor: string }[] = [
  { lugar: "segundo", rotulo: "2º lugar", altura: "h-24", cor: "bg-slate-200 text-slate-700" },
  { lugar: "primeiro", rotulo: "1º lugar", altura: "h-32", cor: "bg-amber-300 text-amber-950" },
  { lugar: "terceiro", rotulo: "3º lugar", altura: "h-16", cor: "bg-orange-200 text-orange-900" },
];

export function Podio({ vencedores }: { vencedores: Record<LugarSorteio, string> }) {
  return (
    <ol className="grid grid-cols-3 items-end gap-3" aria-label="Pódio do sorteio">
      {DEGRAUS.map((d) => (
        <li key={d.lugar} className="flex flex-col items-center text-center">
          <span className="mb-2 line-clamp-2 text-sm font-bold text-emerald-900">
            {vencedores[d.lugar]}
          </span>
          <div
            className={`flex w-full flex-col items-center justify-center rounded-t-xl ${d.altura} ${d.cor}`}
          >
            <span className="text-sm font-extrabold">{d.rotulo}</span>
            <span className="text-xs font-semibold">{PREMIOS_SORTEIO[d.lugar]}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
