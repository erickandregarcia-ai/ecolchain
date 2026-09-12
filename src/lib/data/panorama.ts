export const ATUALIZADO_EM = "07/06/2025 10:24";

export const USUARIO = { nome: "Nani", cidade: "São Paulo - SP" };

export const INDICADORES_BRASIL = [
  {
    id: "residuos",
    valor: "4,8 milhões t",
    titulo: "Resíduos recicláveis",
    detalhe: "ano 2024",
    icone: "reciclagem" as const,
  },
  {
    id: "pontos",
    valor: "6.824",
    titulo: "Pontos de coleta",
    detalhe: "ecopontos e totens ativos",
    icone: "ponto" as const,
  },
  {
    id: "cooperativas",
    valor: "1.245",
    titulo: "Cooperativas",
    detalhe: "homologadas na rede",
    icone: "cooperativa" as const,
  },
  {
    id: "projetos",
    valor: "342",
    titulo: "Projetos monitorados",
    detalhe: "com evidência verificável",
    icone: "projeto" as const,
  },
];

export const EVOLUCAO_RECICLAGEM = [
  { ano: "2020", valor: 2.9, rotulo: "2,9 mi t" },
  { ano: "2021", valor: 3.4, rotulo: "3,4 mi t" },
  { ano: "2022", valor: 3.9, rotulo: "3,9 mi t" },
  { ano: "2023", valor: 4.0, rotulo: "4,0 mi t" },
  { ano: "2024", valor: 4.8, rotulo: "4,8 mi t" },
];

export const VARIACAO_RECICLAGEM = "+19,3%";

export const MATERIAIS_RECICLADOS = [
  { nome: "Plástico", valor: 38.2, cor: "#0ea5e9" },
  { nome: "Papel", valor: 24.7, cor: "#22c55e" },
  { nome: "Vidro", valor: 16.5, cor: "#f59e0b" },
  { nome: "Metal", valor: 14.3, cor: "#6366f1" },
  { nome: "Outros", valor: 6.3, cor: "#94a3b8" },
];

export const IMPACTO_ESTIMADO = [
  { valor: "4,2 mi t", titulo: "CO₂ evitado", icone: "co2" as const },
  { valor: "1,6 mil", titulo: "Árvores equivalentes", icone: "arvore" as const },
];
