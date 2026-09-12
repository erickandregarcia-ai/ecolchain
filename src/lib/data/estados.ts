export type Tendencia = "alta" | "estavel" | "queda";
export type Desempenho = "Alto" | "Médio" | "Baixo";

export interface EstadoDado {
  uf: string;
  nome: string;
  taxa: number;
  tendencia: Tendencia;
  desempenho: Desempenho;
}

export const ESTADOS: EstadoDado[] = [
  { uf: "SP", nome: "São Paulo", taxa: 26.8, tendencia: "alta", desempenho: "Alto" },
  { uf: "SC", nome: "Santa Catarina", taxa: 24.5, tendencia: "alta", desempenho: "Alto" },
  { uf: "PR", nome: "Paraná", taxa: 22.1, tendencia: "alta", desempenho: "Alto" },
  { uf: "RS", nome: "Rio Grande do Sul", taxa: 20.7, tendencia: "alta", desempenho: "Médio" },
  { uf: "MG", nome: "Minas Gerais", taxa: 18.4, tendencia: "estavel", desempenho: "Médio" },
  { uf: "ES", nome: "Espírito Santo", taxa: 16.1, tendencia: "alta", desempenho: "Médio" },
  { uf: "RJ", nome: "Rio de Janeiro", taxa: 16.5, tendencia: "alta", desempenho: "Médio" },
  { uf: "GO", nome: "Goiás", taxa: 12.7, tendencia: "alta", desempenho: "Médio" },
  { uf: "BA", nome: "Bahia", taxa: 11.9, tendencia: "alta", desempenho: "Médio" },
  { uf: "CE", nome: "Ceará", taxa: 10.6, tendencia: "alta", desempenho: "Médio" },
  { uf: "DF", nome: "Distrito Federal", taxa: 10.2, tendencia: "estavel", desempenho: "Médio" },
  { uf: "MS", nome: "Mato Grosso do Sul", taxa: 9.4, tendencia: "estavel", desempenho: "Médio" },
  { uf: "PE", nome: "Pernambuco", taxa: 8.9, tendencia: "alta", desempenho: "Médio" },
  { uf: "MT", nome: "Mato Grosso", taxa: 8.1, tendencia: "estavel", desempenho: "Baixo" },
  { uf: "PB", nome: "Paraíba", taxa: 7.4, tendencia: "estavel", desempenho: "Baixo" },
  { uf: "RN", nome: "Rio Grande do Norte", taxa: 7.1, tendencia: "queda", desempenho: "Baixo" },
  { uf: "AM", nome: "Amazonas", taxa: 6.8, tendencia: "estavel", desempenho: "Baixo" },
  { uf: "PA", nome: "Pará", taxa: 6.2, tendencia: "estavel", desempenho: "Baixo" },
  { uf: "SE", nome: "Sergipe", taxa: 5.9, tendencia: "queda", desempenho: "Baixo" },
  { uf: "TO", nome: "Tocantins", taxa: 5.4, tendencia: "estavel", desempenho: "Baixo" },
  { uf: "PI", nome: "Piauí", taxa: 4.8, tendencia: "estavel", desempenho: "Baixo" },
  { uf: "RO", nome: "Rondônia", taxa: 4.5, tendencia: "queda", desempenho: "Baixo" },
  { uf: "MA", nome: "Maranhão", taxa: 4.1, tendencia: "estavel", desempenho: "Baixo" },
  { uf: "AC", nome: "Acre", taxa: 3.6, tendencia: "queda", desempenho: "Baixo" },
  { uf: "AP", nome: "Amapá", taxa: 3.2, tendencia: "queda", desempenho: "Baixo" },
  { uf: "RR", nome: "Roraima", taxa: 2.9, tendencia: "queda", desempenho: "Baixo" },
  { uf: "AL", nome: "Alagoas", taxa: 2.1, tendencia: "queda", desempenho: "Baixo" },
];

export const RANKING_ESTADOS = [...ESTADOS].sort((a, b) => b.taxa - a.taxa);

export const TAXA_MEDIA_NACIONAL = { valor: "9,8%", variacao: "+1,4% vs 2023" };

export const MELHOR_ESTADO = RANKING_ESTADOS[0];
export const PIOR_ESTADO = RANKING_ESTADOS[RANKING_ESTADOS.length - 1];

export const EVOLUCAO_TAXA_NACIONAL = [
  { ano: "2020", taxa: 7.2 },
  { ano: "2021", taxa: 8.1 },
  { ano: "2022", taxa: 8.7 },
  { ano: "2023", taxa: 9.1 },
  { ano: "2024", taxa: 9.8 },
];

export const FAIXAS_TAXA = [
  { rotulo: "≥ 25%", min: 25, cor: "#065f46" },
  { rotulo: "20 – 24,9%", min: 20, cor: "#059669" },
  { rotulo: "15 – 19,9%", min: 15, cor: "#34d399" },
  { rotulo: "10 – 14,9%", min: 10, cor: "#6ee7b7" },
  { rotulo: "5 – 9,9%", min: 5, cor: "#a7f3d0" },
  { rotulo: "< 5%", min: 0, cor: "#e2f5ea" },
];

export function corDaTaxa(taxa: number) {
  return FAIXAS_TAXA.find((f) => taxa >= f.min)?.cor ?? FAIXAS_TAXA[FAIXAS_TAXA.length - 1].cor;
}
