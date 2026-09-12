export type TipoResiduo = "PET" | "Tetra Pak" | "Alumínio" | "Vidro" | "Papelão";

export const TIPOS_RESIDUO: TipoResiduo[] = [
  "PET",
  "Tetra Pak",
  "Alumínio",
  "Vidro",
  "Papelão",
];

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  localizacao: string;
  tipo_residuo: TipoResiduo;
  volume_estimado: number;
}

export interface Cooperativa {
  id: string;
  nome: string;
  localizacao: string;
  materiais_aceitos: TipoResiduo[];
  capacidade_toneladas: number;
  indicador_impacto_renda: number;
  percentual_mulheres: number;
}

export type StatusMatch = "pendente" | "aceito" | "auditado";

export interface MatchResiduo {
  id: string;
  evento_id: string;
  cooperativa_id: string;
  status: StatusMatch;
  hash_blockchain: string | null;
  tipo_residuo: TipoResiduo;
  volume_estimado: number;
  created_at: string;
}

export interface UsuarioB2C {
  id: string;
  nome: string;
  pontos_reciclagem: number;
  cashback_acumulado: number;
}
