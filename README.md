# ECOLchain

**Recicle · Monetize · Escale · Sustentabilidade**

Ecossistema de finanças regenerativas (ReFi) que usa blockchain e tokenomics para dar transparência e rastreabilidade a toda a **política reversa de resíduos** no Brasil. A visão é ser a maior plataforma de economia circular inclusiva da América Latina, conectando poder público, empresas, cooperativas e cidadãos em um modelo onde todos ganham.

Este repositório traz o MVP da plataforma, com três atores:

- **Empresas, indústrias e eventos** — solicitam coletas rastreáveis, comprovam as metas da PNRS (22% das embalagens) e do Decreto 12.688/2025 (32% do plástico) e recebem créditos de reciclagem auditados em blockchain (hash SHA-256 simulado).
- **Cooperativas de catadores** — recebem o material direto da fonte, sem atravessadores, e acompanham a dignidade econômica social (meta de +85% na renda média e 70% das vagas para mulheres).
- **Cidadãos** — devolvem embalagens limpas em ecopontos e totens, acompanham o destino auditável do resíduo e ganham pontos e cashback no clube de vantagens.

Materiais cobertos: PET, Tetra Pak, alumínio, vidro, papelão e eletroeletrônicos. Fase 1: São Paulo capital e região metropolitana.

## Como rodar

```bash
npm install
npm run dev
# http://localhost:3000
```

Sem nenhuma configuração, o app usa um **store em memória** com dados seed.

## Supabase (opcional)

1. Crie um projeto no [Supabase](https://supabase.com).
2. No SQL Editor, execute `supabase/migrations/0001_schema.sql` e depois `supabase/seed.sql`.
3. Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

Se as variáveis não estiverem definidas, o app usa o store em memória.

## O ciclo auditável da demo

1. **Empresa** (`/empresa`): selecione a empresa, a embalagem e o volume → **Buscar cooperativas homologadas** → **Solicitar coleta**.
2. **Cooperativa** (`/cooperativa`): o card aparece em "Novas solicitações" → **Aceitar coleta**.
3. **Cidadão** (`/cidadao`): **Devolver embalagem no totem** → a devolução é registrada (+50 pontos, +R$ 2,50 de cashback).
4. **Cooperativa**: na coluna "Em andamento" → **Confirmar recebimento** → gera o hash auditável.
5. **Empresa**: a coleta aparece em "Certificados de rastreabilidade" e alimenta o Painel ESG (toneladas, créditos de reciclagem e CO₂ evitado).

## Impacto projetado 2030

- 200.000 toneladas de resíduos reciclados
- 195.000 toneladas de CO₂ evitadas
- 15.000 a 20.000 catadores com +85% de renda média, 70% das vagas para mulheres
- Alinhamento a 8 dos 17 ODS da ONU e à Lei 14.260/2021 (Incentivo à Reciclagem)

## Stack

Next.js (App Router) · React 19 · Tailwind CSS 4 · Recharts · Supabase (opcional) · Server Actions.
