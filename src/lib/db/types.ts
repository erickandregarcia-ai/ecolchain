export type TipoResiduo =
  | "PET"
  | "Tetra Pak"
  | "Alumínio"
  | "Vidro"
  | "Papelão"
  | "Eletroeletrônicos";

export const TIPOS_RESIDUO: TipoResiduo[] = [
  "PET",
  "Tetra Pak",
  "Alumínio",
  "Vidro",
  "Papelão",
  "Eletroeletrônicos",
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

export type StatusMatch = "pendente" | "aceito" | "auditado" | "recusado";

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

export interface Devolucao {
  id: string;
  usuario_id: string;
  tipo_residuo: TipoResiduo;
  pontos: number;
  cashback: number;
  created_at: string;
}

export interface InscricaoEvento {
  id: string;
  evento_id: string;
  nome: string;
  telefone: string;
  data_nascimento: string;
  numero_sorte: number;
  data_visita: string;
  created_at: string;
}

export interface ResultadoSorteio {
  evento_id: string;
  primeiro_lugar_id: string;
  segundo_lugar_id: string;
  terceiro_lugar_id: string;
  sorteado_em: string;
}

export type LugarSorteio = "primeiro" | "segundo" | "terceiro";

export const PREMIOS_SORTEIO: Record<LugarSorteio, string> = {
  primeiro: "Hotel",
  segundo: "Bolo",
  terceiro: "Chapéu",
};

export const NUMERO_SORTE_MIN = 0;
export const NUMERO_SORTE_MAX = 100;
