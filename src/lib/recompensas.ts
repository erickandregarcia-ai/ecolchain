import type { TipoResiduo } from "@/lib/db/types";

export const RECOMPENSAS: Record<
  TipoResiduo,
  { pontos: number; cashback: number }
> = {
  PET: { pontos: 50, cashback: 2.5 },
  "Tetra Pak": { pontos: 45, cashback: 2 },
  Alumínio: { pontos: 120, cashback: 6 },
  Vidro: { pontos: 40, cashback: 1.5 },
  Papelão: { pontos: 30, cashback: 1 },
  Eletroeletrônicos: { pontos: 200, cashback: 10 },
};
