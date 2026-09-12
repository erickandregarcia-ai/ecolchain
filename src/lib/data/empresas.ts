export type StatusVerificacao = "Verificado" | "Em análise";

export interface EmpresaRanking {
  nome: string;
  sigla: string;
  segmento: string;
  setor: string;
  cor: string;
  iniciativas: string[];
  score: number;
  status: StatusVerificacao;
}

export const EMPRESAS_RANKING: EmpresaRanking[] = [
  {
    nome: "Natura",
    sigla: "NA",
    segmento: "Cosméticos e higiene pessoal",
    setor: "Cosméticos",
    cor: "#f97316",
    iniciativas: ["Logística reversa", "Reciclagem de embalagens", "Apoio a cooperativas"],
    score: 92,
    status: "Verificado",
  },
  {
    nome: "Ambev",
    sigla: "AM",
    segmento: "Bebidas",
    setor: "Bebidas",
    cor: "#2563eb",
    iniciativas: ["Logística reversa", "Embalagens retornáveis", "Reciclagem"],
    score: 89,
    status: "Verificado",
  },
  {
    nome: "Tetra Pak",
    sigla: "TP",
    segmento: "Embalagens",
    setor: "Embalagens",
    cor: "#1d4ed8",
    iniciativas: ["Reciclagem", "Materiais reciclados", "Parcerias com cooperativas"],
    score: 86,
    status: "Verificado",
  },
  {
    nome: "Whirlpool",
    sigla: "WP",
    segmento: "Eletrodomésticos",
    setor: "Eletrodomésticos",
    cor: "#475569",
    iniciativas: ["Logística reversa", "Reparo e reuso", "Reciclagem de materiais"],
    score: 82,
    status: "Verificado",
  },
  {
    nome: "Johnson & Johnson",
    sigla: "JJ",
    segmento: "Saúde e bem-estar",
    setor: "Farmacêutico",
    cor: "#dc2626",
    iniciativas: ["Logística reversa", "Gestão de resíduos", "Apoio a cooperativas"],
    score: 78,
    status: "Em análise",
  },
];

export const SETORES = [
  "Todos",
  ...Array.from(new Set(EMPRESAS_RANKING.map((e) => e.setor))),
];

export const TIPOS_INICIATIVA = [
  "Todos",
  ...Array.from(new Set(EMPRESAS_RANKING.flatMap((e) => e.iniciativas))),
];

export const RESUMO_RANKING_EMPRESAS = [
  { valor: "42", rotulo: "Empresas analisadas", icone: "empresa" as const },
  { valor: "28", rotulo: "Em operação", icone: "verificado" as const },
  { valor: "8", rotulo: "Em expansão", icone: "expansao" as const },
  { valor: "6", rotulo: "Em análise", icone: "analise" as const },
];

export interface CooperativaRanking {
  nome: string;
  cidade: string;
  uf: string;
  catadores: number;
  toneladas: string;
  score: number;
  status: StatusVerificacao;
}

export const COOPERATIVAS_RANKING: CooperativaRanking[] = [
  { nome: "Cooperativa Recicla Mais", cidade: "São Paulo", uf: "SP", catadores: 86, toneladas: "1.240 t", score: 90, status: "Verificado" },
  { nome: "Coopercicla", cidade: "Curitiba", uf: "PR", catadores: 64, toneladas: "980 t", score: 87, status: "Verificado" },
  { nome: "Cooperativa Vida Nova", cidade: "Belo Horizonte", uf: "MG", catadores: 52, toneladas: "820 t", score: 83, status: "Verificado" },
  { nome: "Rede Catavida", cidade: "Porto Alegre", uf: "RS", catadores: 47, toneladas: "690 t", score: 79, status: "Em análise" },
  { nome: "Cooperativa Renascer", cidade: "Florianópolis", uf: "SC", catadores: 38, toneladas: "540 t", score: 75, status: "Verificado" },
];
