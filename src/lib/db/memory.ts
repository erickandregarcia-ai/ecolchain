import type {
  Cooperativa,
  Empresa,
  MatchResiduo,
  StatusMatch,
  TipoResiduo,
  UsuarioB2C,
} from "./types";

export const SEED_EMPRESAS: Empresa[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    nome: "Festival Sol Nascente",
    cnpj: "12.345.678/0001-90",
    localizacao: "São Paulo - SP",
    tipo_residuo: "PET",
    volume_estimado: 12.5,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    nome: "Arena Verde Eventos",
    cnpj: "98.765.432/0001-10",
    localizacao: "Rio de Janeiro - RJ",
    tipo_residuo: "Alumínio",
    volume_estimado: 8,
  },
];

export const SEED_COOPERATIVAS: Cooperativa[] = [
  {
    id: "33333333-3333-4333-8333-333333333333",
    nome: "Cooperativa Mulheres do Amanhã",
    localizacao: "São Paulo - SP",
    materiais_aceitos: ["PET", "Papelão", "Tetra Pak"],
    capacidade_toneladas: 40,
    indicador_impacto_renda: 62,
    percentual_mulheres: 78,
  },
  {
    id: "44444444-4444-4444-8444-444444444444",
    nome: "CooperFlor Recicla",
    localizacao: "Rio de Janeiro - RJ",
    materiais_aceitos: ["Alumínio", "Vidro", "PET"],
    capacidade_toneladas: 25,
    indicador_impacto_renda: 71,
    percentual_mulheres: 72,
  },
];

export const SEED_USUARIO: UsuarioB2C = {
  id: "55555555-5555-4555-8555-555555555555",
  nome: "Maria Clara",
  pontos_reciclagem: 320,
  cashback_acumulado: 18.5,
};

export const SEED_MATCHES: MatchResiduo[] = [
  {
    id: "66666666-6666-4666-8666-666666666666",
    evento_id: SEED_EMPRESAS[0].id,
    cooperativa_id: SEED_COOPERATIVAS[0].id,
    status: "auditado",
    hash_blockchain:
      "0x9f2c4a7d1e83b5f60a2c9d4e7b1f83a5c6d9e2f4a7b0c3d5e7f9a1b3c5d7e9f0",
    tipo_residuo: "PET",
    volume_estimado: 4.2,
    created_at: new Date(Date.now() - 5 * 86400_000).toISOString(),
  },
  {
    id: "77777777-7777-4777-8777-777777777777",
    evento_id: SEED_EMPRESAS[1].id,
    cooperativa_id: SEED_COOPERATIVAS[1].id,
    status: "aceito",
    hash_blockchain: null,
    tipo_residuo: "Alumínio",
    volume_estimado: 3.0,
    created_at: new Date(Date.now() - 2 * 86400_000).toISOString(),
  },
  {
    id: "88888888-8888-4888-8888-888888888888",
    evento_id: SEED_EMPRESAS[0].id,
    cooperativa_id: SEED_COOPERATIVAS[0].id,
    status: "pendente",
    hash_blockchain: null,
    tipo_residuo: "Papelão",
    volume_estimado: 2.0,
    created_at: new Date(Date.now() - 1 * 86400_000).toISOString(),
  },
];

interface MemoryState {
  empresas: Empresa[];
  cooperativas: Cooperativa[];
  matches: MatchResiduo[];
  usuarios: UsuarioB2C[];
}

const globalStore = globalThis as unknown as { __ecolchainState?: MemoryState };

function getState(): MemoryState {
  if (!globalStore.__ecolchainState) {
    globalStore.__ecolchainState = {
      empresas: SEED_EMPRESAS.map((e) => ({ ...e })),
      cooperativas: SEED_COOPERATIVAS.map((c) => ({
        ...c,
        materiais_aceitos: [...c.materiais_aceitos],
      })),
      matches: SEED_MATCHES.map((m) => ({ ...m })),
      usuarios: [{ ...SEED_USUARIO }],
    };
  }
  return globalStore.__ecolchainState;
}

export const memoryDb = {
  async listEmpresas(): Promise<Empresa[]> {
    return getState().empresas;
  },

  async listCooperativas(): Promise<Cooperativa[]> {
    return getState().cooperativas;
  },

  async buscarCooperativasPorMaterial(tipo: TipoResiduo): Promise<Cooperativa[]> {
    return getState().cooperativas.filter((c) =>
      c.materiais_aceitos.includes(tipo),
    );
  },

  async listMatches(): Promise<
    (MatchResiduo & { empresa: Empresa; cooperativa: Cooperativa })[]
  > {
    const state = getState();
    return state.matches
      .map((m) => ({
        ...m,
        empresa: state.empresas.find((e) => e.id === m.evento_id)!,
        cooperativa: state.cooperativas.find((c) => c.id === m.cooperativa_id)!,
      }))
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  },

  async criarMatch(input: {
    evento_id: string;
    cooperativa_id: string;
    tipo_residuo: TipoResiduo;
    volume_estimado: number;
  }): Promise<MatchResiduo> {
    const match: MatchResiduo = {
      id: crypto.randomUUID(),
      status: "pendente",
      hash_blockchain: null,
      created_at: new Date().toISOString(),
      ...input,
    };
    getState().matches.push(match);
    return match;
  },

  async atualizarStatusMatch(
    id: string,
    status: StatusMatch,
    hash?: string,
  ): Promise<void> {
    const match = getState().matches.find((m) => m.id === id);
    if (!match) throw new Error("Match não encontrado");
    match.status = status;
    if (hash) match.hash_blockchain = hash;
  },

  async getUsuario(id: string): Promise<UsuarioB2C | null> {
    return getState().usuarios.find((u) => u.id === id) ?? null;
  },

  async creditarPontos(
    id: string,
    pontos: number,
    cashback: number,
  ): Promise<UsuarioB2C> {
    const usuario = getState().usuarios.find((u) => u.id === id);
    if (!usuario) throw new Error("Usuário não encontrado");
    usuario.pontos_reciclagem += pontos;
    usuario.cashback_acumulado += cashback;
    return usuario;
  },
};
