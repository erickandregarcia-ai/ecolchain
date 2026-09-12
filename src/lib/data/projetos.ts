export type Selo = "Platinum" | "Gold" | "Silver" | "Bronze";
export type StatusProjeto = "Em operação" | "Em expansão" | "Piloto" | "Em análise";

export interface Indicador {
  valor: string;
  rotulo: string;
  icone: "reciclagem" | "municipio" | "cooperativa" | "co2" | "pessoas" | "material";
}

export interface EtapaLinhaDoTempo {
  nome: string;
  data: string;
  concluida: boolean;
}

export interface Evidencia {
  titulo: string;
  detalhe: string;
  tipo: "documento" | "foto" | "comprovante" | "auditoria";
}

export interface Projeto {
  slug: string;
  nome: string;
  organizacao: string;
  uf: string;
  score: number;
  selo: Selo;
  status: StatusProjeto;
  resumo: string;
  sobre: string;
  indicadores: Indicador[];
  impacto: Indicador[];
  materiais: { nome: string; valor: number; cor: string }[];
  linhaDoTempo: EtapaLinhaDoTempo[];
  evidencia: {
    registro: string;
    indicador: string;
    periodo: string;
    fonte: string;
    dataset: string;
    url: string;
    coleta: string;
    transformacao: string;
    hash: string;
    blockchain: string;
    verificado: boolean;
    itens: Evidencia[];
  };
}

const materiaisPadrao = [
  { nome: "Plástico", valor: 42, cor: "#0ea5e9" },
  { nome: "Papel", valor: 22, cor: "#22c55e" },
  { nome: "Vidro", valor: 14, cor: "#f59e0b" },
  { nome: "Metal", valor: 12, cor: "#6366f1" },
  { nome: "Outros", valor: 10, cor: "#94a3b8" },
];

export const PROJETOS: Projeto[] = [
  {
    slug: "greenchain-brasil",
    nome: "GreenChain Brasil",
    organizacao: "GreenChain Brasil",
    uf: "SP",
    score: 92,
    selo: "Gold",
    status: "Em operação",
    resumo: "Rastreabilidade de plástico com blockchain",
    sobre:
      "Projeto de logística reversa que utiliza blockchain para rastrear embalagens plásticas desde a coleta até a reciclagem, garantindo transparência e impacto ambiental mensurável.",
    indicadores: [
      { valor: "12.430 t", rotulo: "Plástico reciclado", icone: "reciclagem" },
      { valor: "84", rotulo: "Municípios", icone: "municipio" },
      { valor: "37", rotulo: "Cooperativas", icone: "cooperativa" },
    ],
    impacto: [
      { valor: "6,2 mil t", rotulo: "CO₂ evitado", icone: "co2" },
      { valor: "1.680 t", rotulo: "Recicláveis beneficiados", icone: "material" },
      { valor: "+248", rotulo: "Pessoas beneficiadas", icone: "pessoas" },
    ],
    materiais: materiaisPadrao,
    linhaDoTempo: [
      { nome: "Planejamento", data: "01/2024", concluida: true },
      { nome: "Coleta", data: "03/2024", concluida: true },
      { nome: "Triagem", data: "05/2024", concluida: true },
      { nome: "Reciclagem", data: "08/2024", concluida: true },
      { nome: "Transformação", data: "10/2024", concluida: true },
    ],
    evidencia: {
      registro: "#BR-2025-001234",
      indicador: "Rastreabilidade de plástico",
      periodo: "01/01/2024 – 31/12/2024",
      fonte: "Sistema Nacional de Informações sobre a Gestão de Resíduos (SINIR)",
      dataset: "residuos_reciclaveis_2024",
      url: "https://sinir.gov.br/dados",
      coleta: "Fonte oficial (SINIR)",
      transformacao: "ETL — ECOLchain v1.0",
      hash: "3f5e9d4e...7c9e2f1",
      blockchain: "Polygon – Tx 0x7a3e...98dc",
      verificado: true,
      itens: [
        { titulo: "Documento oficial", detalhe: "PDF · 2,4 MB", tipo: "documento" },
        { titulo: "Foto georreferenciada", detalhe: "JPG · 1,1 MB", tipo: "foto" },
        { titulo: "Comprovante físico", detalhe: "PDF · 0,8 MB", tipo: "comprovante" },
        { titulo: "Auditoria independente", detalhe: "Em análise", tipo: "auditoria" },
      ],
    },
  },
  {
    slug: "reciloop",
    nome: "ReciLoop",
    organizacao: "EcoPlast",
    uf: "PR",
    score: 87,
    selo: "Gold",
    status: "Em expansão",
    resumo: "Retorno de embalagens em rede de varejo",
    sobre:
      "Rede de máquinas de retorno de embalagens instaladas em supermercados, integrando cidadãos, cooperativas e indústria recicladora em um único circuito auditável.",
    indicadores: [
      { valor: "8.940 t", rotulo: "Embalagens recolhidas", icone: "reciclagem" },
      { valor: "52", rotulo: "Municípios", icone: "municipio" },
      { valor: "24", rotulo: "Cooperativas", icone: "cooperativa" },
    ],
    impacto: [
      { valor: "4,1 mil t", rotulo: "CO₂ evitado", icone: "co2" },
      { valor: "1.120 t", rotulo: "Recicláveis beneficiados", icone: "material" },
      { valor: "+180", rotulo: "Pessoas beneficiadas", icone: "pessoas" },
    ],
    materiais: [
      { nome: "Plástico", valor: 36, cor: "#0ea5e9" },
      { nome: "Papel", valor: 26, cor: "#22c55e" },
      { nome: "Vidro", valor: 18, cor: "#f59e0b" },
      { nome: "Metal", valor: 12, cor: "#6366f1" },
      { nome: "Outros", valor: 8, cor: "#94a3b8" },
    ],
    linhaDoTempo: [
      { nome: "Planejamento", data: "02/2024", concluida: true },
      { nome: "Coleta", data: "04/2024", concluida: true },
      { nome: "Triagem", data: "07/2024", concluida: true },
      { nome: "Reciclagem", data: "11/2024", concluida: true },
      { nome: "Transformação", data: "03/2025", concluida: false },
    ],
    evidencia: {
      registro: "#BR-2025-001812",
      indicador: "Retorno de embalagens em varejo",
      periodo: "01/01/2024 – 31/12/2024",
      fonte: "Sistema Nacional de Informações sobre a Gestão de Resíduos (SINIR)",
      dataset: "logistica_reversa_varejo_2024",
      url: "https://sinir.gov.br/dados",
      coleta: "Fonte oficial (SINIR)",
      transformacao: "ETL — ECOLchain v1.0",
      hash: "91ac7b20...4d1f8ab",
      blockchain: "Polygon – Tx 0x5c91...11ae",
      verificado: true,
      itens: [
        { titulo: "Documento oficial", detalhe: "PDF · 1,9 MB", tipo: "documento" },
        { titulo: "Foto georreferenciada", detalhe: "JPG · 0,9 MB", tipo: "foto" },
        { titulo: "Comprovante físico", detalhe: "PDF · 0,6 MB", tipo: "comprovante" },
        { titulo: "Auditoria independente", detalhe: "Verificada", tipo: "auditoria" },
      ],
    },
  },
  {
    slug: "ecoplast",
    nome: "EcoPlast",
    organizacao: "ReciLoop",
    uf: "MG",
    score: 84,
    selo: "Silver",
    status: "Em operação",
    resumo: "Reciclagem mecânica de PET pós-consumo",
    sobre:
      "Planta de reciclagem mecânica que transforma PET pós-consumo em resina reciclada com certificação de origem e rastreabilidade por lote.",
    indicadores: [
      { valor: "6.210 t", rotulo: "PET reciclado", icone: "reciclagem" },
      { valor: "31", rotulo: "Municípios", icone: "municipio" },
      { valor: "18", rotulo: "Cooperativas", icone: "cooperativa" },
    ],
    impacto: [
      { valor: "3,0 mil t", rotulo: "CO₂ evitado", icone: "co2" },
      { valor: "860 t", rotulo: "Recicláveis beneficiados", icone: "material" },
      { valor: "+132", rotulo: "Pessoas beneficiadas", icone: "pessoas" },
    ],
    materiais: [
      { nome: "Plástico", valor: 64, cor: "#0ea5e9" },
      { nome: "Papel", valor: 12, cor: "#22c55e" },
      { nome: "Vidro", valor: 8, cor: "#f59e0b" },
      { nome: "Metal", valor: 9, cor: "#6366f1" },
      { nome: "Outros", valor: 7, cor: "#94a3b8" },
    ],
    linhaDoTempo: [
      { nome: "Planejamento", data: "11/2023", concluida: true },
      { nome: "Coleta", data: "02/2024", concluida: true },
      { nome: "Triagem", data: "04/2024", concluida: true },
      { nome: "Reciclagem", data: "09/2024", concluida: true },
      { nome: "Transformação", data: "12/2024", concluida: true },
    ],
    evidencia: {
      registro: "#BR-2025-002045",
      indicador: "Reciclagem mecânica de PET",
      periodo: "01/01/2024 – 31/12/2024",
      fonte: "Sistema Nacional de Informações sobre a Gestão de Resíduos (SINIR)",
      dataset: "pet_pos_consumo_2024",
      url: "https://sinir.gov.br/dados",
      coleta: "Fonte oficial (SINIR)",
      transformacao: "ETL — ECOLchain v1.0",
      hash: "c40de118...ba27e5d",
      blockchain: "Polygon – Tx 0x2fd7...73b0",
      verificado: true,
      itens: [
        { titulo: "Documento oficial", detalhe: "PDF · 3,1 MB", tipo: "documento" },
        { titulo: "Foto georreferenciada", detalhe: "JPG · 1,4 MB", tipo: "foto" },
        { titulo: "Comprovante físico", detalhe: "PDF · 0,7 MB", tipo: "comprovante" },
        { titulo: "Auditoria independente", detalhe: "Em análise", tipo: "auditoria" },
      ],
    },
  },
  {
    slug: "logistica-reversa-4-0",
    nome: "Logística Reversa 4.0",
    organizacao: "Plastic Tech",
    uf: "RS",
    score: 78,
    selo: "Silver",
    status: "Piloto",
    resumo: "Coleta inteligente com sensores em contêineres",
    sobre:
      "Piloto de coleta inteligente com sensores de nível em contêineres, otimizando rotas e reduzindo emissões no transporte de recicláveis.",
    indicadores: [
      { valor: "2.480 t", rotulo: "Material coletado", icone: "reciclagem" },
      { valor: "12", rotulo: "Municípios", icone: "municipio" },
      { valor: "9", rotulo: "Cooperativas", icone: "cooperativa" },
    ],
    impacto: [
      { valor: "1,2 mil t", rotulo: "CO₂ evitado", icone: "co2" },
      { valor: "410 t", rotulo: "Recicláveis beneficiados", icone: "material" },
      { valor: "+74", rotulo: "Pessoas beneficiadas", icone: "pessoas" },
    ],
    materiais: materiaisPadrao,
    linhaDoTempo: [
      { nome: "Planejamento", data: "06/2024", concluida: true },
      { nome: "Coleta", data: "09/2024", concluida: true },
      { nome: "Triagem", data: "11/2024", concluida: true },
      { nome: "Reciclagem", data: "02/2025", concluida: false },
      { nome: "Transformação", data: "05/2025", concluida: false },
    ],
    evidencia: {
      registro: "#BR-2025-002310",
      indicador: "Coleta inteligente de recicláveis",
      periodo: "01/06/2024 – 31/12/2024",
      fonte: "Sistema Nacional de Informações sobre a Gestão de Resíduos (SINIR)",
      dataset: "coleta_sensorizada_2024",
      url: "https://sinir.gov.br/dados",
      coleta: "Fonte oficial (SINIR)",
      transformacao: "ETL — ECOLchain v1.0",
      hash: "7b1f3c99...ee40a12",
      blockchain: "Polygon – Tx 0x9ab4...2fc7",
      verificado: false,
      itens: [
        { titulo: "Documento oficial", detalhe: "PDF · 1,2 MB", tipo: "documento" },
        { titulo: "Foto georreferenciada", detalhe: "JPG · 0,8 MB", tipo: "foto" },
        { titulo: "Comprovante físico", detalhe: "Pendente", tipo: "comprovante" },
        { titulo: "Auditoria independente", detalhe: "Em análise", tipo: "auditoria" },
      ],
    },
  },
  {
    slug: "ecopontos-inteligentes",
    nome: "Ecopontos Inteligentes",
    organizacao: "Circular Plastics",
    uf: "SC",
    score: 76,
    selo: "Bronze",
    status: "Em expansão",
    resumo: "Rede de ecopontos com recompensa ao cidadão",
    sobre:
      "Rede de ecopontos urbanos com identificação do cidadão e recompensa em cashback, ampliando a taxa de devolução de embalagens limpas.",
    indicadores: [
      { valor: "1.940 t", rotulo: "Material recebido", icone: "reciclagem" },
      { valor: "23", rotulo: "Municípios", icone: "municipio" },
      { valor: "14", rotulo: "Cooperativas", icone: "cooperativa" },
    ],
    impacto: [
      { valor: "0,9 mil t", rotulo: "CO₂ evitado", icone: "co2" },
      { valor: "320 t", rotulo: "Recicláveis beneficiados", icone: "material" },
      { valor: "+96", rotulo: "Pessoas beneficiadas", icone: "pessoas" },
    ],
    materiais: materiaisPadrao,
    linhaDoTempo: [
      { nome: "Planejamento", data: "03/2024", concluida: true },
      { nome: "Coleta", data: "06/2024", concluida: true },
      { nome: "Triagem", data: "08/2024", concluida: true },
      { nome: "Reciclagem", data: "01/2025", concluida: false },
      { nome: "Transformação", data: "04/2025", concluida: false },
    ],
    evidencia: {
      registro: "#BR-2025-002588",
      indicador: "Devolução de embalagens em ecopontos",
      periodo: "01/03/2024 – 31/12/2024",
      fonte: "Sistema Nacional de Informações sobre a Gestão de Resíduos (SINIR)",
      dataset: "ecopontos_urbanos_2024",
      url: "https://sinir.gov.br/dados",
      coleta: "Fonte oficial (SINIR)",
      transformacao: "ETL — ECOLchain v1.0",
      hash: "d82a5f37...10c6b4e",
      blockchain: "Polygon – Tx 0x4e08...c5d1",
      verificado: true,
      itens: [
        { titulo: "Documento oficial", detalhe: "PDF · 1,6 MB", tipo: "documento" },
        { titulo: "Foto georreferenciada", detalhe: "JPG · 1,0 MB", tipo: "foto" },
        { titulo: "Comprovante físico", detalhe: "PDF · 0,5 MB", tipo: "comprovante" },
        { titulo: "Auditoria independente", detalhe: "Em análise", tipo: "auditoria" },
      ],
    },
  },
];

export const SELOS: Selo[] = ["Platinum", "Gold", "Silver", "Bronze"];

export function getProjeto(slug: string) {
  return PROJETOS.find((p) => p.slug === slug);
}
