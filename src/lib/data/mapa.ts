export type TipoPonto = "Ecoponto" | "Cooperativa" | "Logística reversa" | "Recompensa";

export interface PontoMapa {
  id: string;
  nome: string;
  tipo: TipoPonto;
  endereco: string;
  distancia: string;
  materiais: string[];
  recompensa: boolean;
  x: number;
  y: number;
}

export const CORES_TIPO: Record<TipoPonto, string> = {
  Ecoponto: "#16a34a",
  Cooperativa: "#0ea5e9",
  "Logística reversa": "#8b5cf6",
  Recompensa: "#f59e0b",
};

export const TIPOS_PONTO: TipoPonto[] = [
  "Ecoponto",
  "Cooperativa",
  "Logística reversa",
  "Recompensa",
];

export const MATERIAIS_FILTRO = ["Plástico", "Papel", "Vidro", "Metal", "Eletrônicos"];

export const PONTOS: PontoMapa[] = [
  {
    id: "recicla-mais",
    nome: "Cooperativa Recicla Mais",
    tipo: "Cooperativa",
    endereco: "Rua das Flores, 245 – São Paulo/SP",
    distancia: "1,2 km",
    materiais: ["Papel", "Plástico", "Vidro", "Metal"],
    recompensa: true,
    x: 34,
    y: 42,
  },
  {
    id: "ecoponto-pinheiros",
    nome: "Ecoponto Pinheiros",
    tipo: "Ecoponto",
    endereco: "Av. Faria Lima, 1.080 – São Paulo/SP",
    distancia: "2,4 km",
    materiais: ["Plástico", "Papel", "Metal"],
    recompensa: false,
    x: 22,
    y: 68,
  },
  {
    id: "ecoponto-perdizes",
    nome: "Ecoponto Perdizes",
    tipo: "Ecoponto",
    endereco: "Rua Cardoso de Almeida, 540 – São Paulo/SP",
    distancia: "3,1 km",
    materiais: ["Vidro", "Papel"],
    recompensa: false,
    x: 46,
    y: 26,
  },
  {
    id: "totem-paulista",
    nome: "Totem Avenida Paulista",
    tipo: "Recompensa",
    endereco: "Av. Paulista, 900 – São Paulo/SP",
    distancia: "4,0 km",
    materiais: ["Plástico", "Metal"],
    recompensa: true,
    x: 62,
    y: 54,
  },
  {
    id: "log-reversa-lapa",
    nome: "Ponto de logística reversa Lapa",
    tipo: "Logística reversa",
    endereco: "Rua Guaicurus, 320 – São Paulo/SP",
    distancia: "5,3 km",
    materiais: ["Eletrônicos", "Metal"],
    recompensa: false,
    x: 14,
    y: 34,
  },
  {
    id: "ecoponto-vila-mariana",
    nome: "Ecoponto Vila Mariana",
    tipo: "Ecoponto",
    endereco: "Rua Domingos de Morais, 1.500 – São Paulo/SP",
    distancia: "6,2 km",
    materiais: ["Plástico", "Papel", "Vidro"],
    recompensa: false,
    x: 74,
    y: 76,
  },
  {
    id: "coop-butanta",
    nome: "Cooperativa Butantã Circular",
    tipo: "Cooperativa",
    endereco: "Av. Corifeu de Azevedo Marques, 200 – São Paulo/SP",
    distancia: "7,1 km",
    materiais: ["Papel", "Plástico"],
    recompensa: false,
    x: 8,
    y: 58,
  },
  {
    id: "log-reversa-santana",
    nome: "Ponto de logística reversa Santana",
    tipo: "Logística reversa",
    endereco: "Rua Voluntários da Pátria, 1.900 – São Paulo/SP",
    distancia: "8,4 km",
    materiais: ["Eletrônicos"],
    recompensa: false,
    x: 56,
    y: 12,
  },
  {
    id: "totem-ibirapuera",
    nome: "Totem Parque Ibirapuera",
    tipo: "Recompensa",
    endereco: "Av. Pedro Álvares Cabral, s/n – São Paulo/SP",
    distancia: "9,0 km",
    materiais: ["Plástico", "Vidro"],
    recompensa: true,
    x: 86,
    y: 44,
  },
];

export const RESUMO_PROXIMOS = [
  { valor: 12, rotulo: "ecopontos", tipo: "Ecoponto" as TipoPonto },
  { valor: 5, rotulo: "cooperativas", tipo: "Cooperativa" as TipoPonto },
  { valor: 3, rotulo: "recompensas", tipo: "Recompensa" as TipoPonto },
];
