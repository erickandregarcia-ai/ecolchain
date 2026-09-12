import { createClient } from "@supabase/supabase-js";
import type {
  Cooperativa,
  Empresa,
  MatchResiduo,
  StatusMatch,
  TipoResiduo,
  UsuarioB2C,
} from "./types";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase não configurado");
  return createClient(url, key);
}

export const supabaseDb = {
  async listEmpresas(): Promise<Empresa[]> {
    const { data, error } = await getClient()
      .from("tabela_empresas_eventos")
      .select("*");
    if (error) throw new Error(error.message);
    return (data ?? []) as Empresa[];
  },

  async listCooperativas(): Promise<Cooperativa[]> {
    const { data, error } = await getClient()
      .from("tabela_cooperativas")
      .select("*");
    if (error) throw new Error(error.message);
    return (data ?? []) as Cooperativa[];
  },

  async buscarCooperativasPorMaterial(tipo: TipoResiduo): Promise<Cooperativa[]> {
    const { data, error } = await getClient()
      .from("tabela_cooperativas")
      .select("*")
      .contains("materiais_aceitos", [tipo]);
    if (error) throw new Error(error.message);
    return (data ?? []) as Cooperativa[];
  },

  async listMatches(): Promise<
    (MatchResiduo & { empresa: Empresa; cooperativa: Cooperativa })[]
  > {
    const { data, error } = await getClient()
      .from("tabela_match_residuos")
      .select(
        "*, empresa:tabela_empresas_eventos!evento_id(*), cooperativa:tabela_cooperativas!cooperativa_id(*)",
      )
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as (MatchResiduo & {
      empresa: Empresa;
      cooperativa: Cooperativa;
    })[];
  },

  async criarMatch(input: {
    evento_id: string;
    cooperativa_id: string;
    tipo_residuo: TipoResiduo;
    volume_estimado: number;
  }): Promise<MatchResiduo> {
    const { data, error } = await getClient()
      .from("tabela_match_residuos")
      .insert(input)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as MatchResiduo;
  },

  async atualizarStatusMatch(
    id: string,
    status: StatusMatch,
    hash?: string,
  ): Promise<void> {
    const update: Record<string, string> = { status };
    if (hash) update.hash_blockchain = hash;
    const { error } = await getClient()
      .from("tabela_match_residuos")
      .update(update)
      .eq("id", id);
    if (error) throw new Error(error.message);
  },

  async getUsuario(id: string): Promise<UsuarioB2C | null> {
    const { data, error } = await getClient()
      .from("tabela_usuarios_b2c")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (data as UsuarioB2C | null) ?? null;
  },

  async creditarPontos(
    id: string,
    pontos: number,
    cashback: number,
  ): Promise<UsuarioB2C> {
    const usuario = await this.getUsuario(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    const { data, error } = await getClient()
      .from("tabela_usuarios_b2c")
      .update({
        pontos_reciclagem: usuario.pontos_reciclagem + pontos,
        cashback_acumulado: usuario.cashback_acumulado + cashback,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as UsuarioB2C;
  },
};
