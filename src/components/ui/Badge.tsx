import type { ReactNode } from "react";
import { Icon } from "./Icon";

const ESTILOS: Record<string, string> = {
  verde: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  ambar: "bg-amber-50 text-amber-700 ring-amber-200",
  azul: "bg-sky-50 text-sky-700 ring-sky-200",
  cinza: "bg-slate-100 text-slate-600 ring-slate-200",
  roxo: "bg-violet-50 text-violet-700 ring-violet-200",
};

export type TomBadge = keyof typeof ESTILOS;

export function Badge({
  children,
  tom = "cinza",
  icone,
}: {
  children: ReactNode;
  tom?: TomBadge;
  icone?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${ESTILOS[tom]}`}
    >
      {icone && <Icon name={icone} size={13} />}
      {children}
    </span>
  );
}

const TOM_STATUS: Record<string, { tom: TomBadge; icone: string }> = {
  "Em operação": { tom: "verde", icone: "checkCircle" },
  "Em expansão": { tom: "ambar", icone: "arrowUp" },
  Piloto: { tom: "azul", icone: "info" },
  "Em análise": { tom: "ambar", icone: "clock" },
  Verificado: { tom: "verde", icone: "checkCircle" },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = TOM_STATUS[status] ?? { tom: "cinza" as TomBadge, icone: "info" };
  return (
    <Badge tom={cfg.tom} icone={cfg.icone}>
      {status}
    </Badge>
  );
}

const TOM_SELO: Record<string, string> = {
  Platinum: "bg-slate-100 text-slate-700 ring-slate-300",
  Gold: "bg-amber-50 text-amber-700 ring-amber-300",
  Silver: "bg-zinc-100 text-zinc-600 ring-zinc-300",
  Bronze: "bg-orange-50 text-orange-700 ring-orange-300",
};

export function SeloBadge({ selo }: { selo: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
        TOM_SELO[selo] ?? TOM_SELO.Bronze
      }`}
    >
      <Icon name="star" size={13} />
      {selo}
    </span>
  );
}
