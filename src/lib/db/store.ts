import type {
  Cooperativa,
  Devolucao,
  Empresa,
  MatchResiduo,
  StatusMatch,
  TipoResiduo,
  UsuarioB2C,
} from "./types";
import { memoryDb } from "./memory";
import { supabaseDb } from "./supabase";

export interface Db {
  listEmpresas(): Promise<Empresa[]>;
  listCooperativas(): Promise<Cooperativa[]>;
  buscarCooperativasPorMaterial(tipo: TipoResiduo): Promise<Cooperativa[]>;
  listMatches(): Promise<
    (MatchResiduo & { empresa: Empresa; cooperativa: Cooperativa })[]
  >;
  buscarMatchPorHash(
    hash: string,
  ): Promise<
    (MatchResiduo & { empresa: Empresa; cooperativa: Cooperativa }) | null
  >;
  criarMatch(input: {
    evento_id: string;
    cooperativa_id: string;
    tipo_residuo: TipoResiduo;
    volume_estimado: number;
  }): Promise<MatchResiduo>;
  atualizarStatusMatch(
    id: string,
    status: StatusMatch,
    hash?: string,
  ): Promise<void>;
  getUsuario(id: string): Promise<UsuarioB2C | null>;
  creditarPontos(id: string, pontos: number, cashback: number): Promise<UsuarioB2C>;
  registrarDevolucao(input: {
    usuario_id: string;
    tipo_residuo: TipoResiduo;
    pontos: number;
    cashback: number;
  }): Promise<Devolucao>;
  listarDevolucoes(usuarioId: string): Promise<Devolucao[]>;
}

export function getDb(): Db {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return supabaseDb;
  }
  return memoryDb;
}
