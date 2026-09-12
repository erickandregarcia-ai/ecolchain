# ECOLchain

Plataforma ReFi (Regenerative Finance) para **logística reversa auditável** de resíduos gerados em eventos no Brasil. Conecta três atores:

- **Empresas/Eventos** — solicitam coletas e recebem certificados de rastreabilidade "Web3" (hash SHA-256 simulado).
- **Cooperativas de catadores** — aceitam coletas, confirmam recebimento e acompanham indicadores de impacto social (renda, participação de mulheres).
- **Cidadãos** — depositam resíduos em ecopontos, escaneiam QR codes de totens e ganham pontos + cashback.

## Como rodar

```bash
npm install
npm run dev
# http://localhost:3000
```

Sem nenhuma configuração, o app usa um **store em memória** com dados seed — perfeito para demo de hackathon.

## Supabase (opcional)

1. Crie um projeto no [Supabase](https://supabase.com).
2. No SQL Editor, execute `supabase/migrations/0001_schema.sql` e depois `supabase/seed.sql`.
3. Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

Se as variáveis não estiverem definidas, o app usa o store em memória.

## Caminho feliz da demo

1. **Empresa** (`/empresa`): selecione o evento, o material e o volume → **Buscar Cooperativas Próximas** → **Solicitar Coleta**.
2. **Cooperativa** (`/cooperativa`): o card aparece em "Novas Solicitações" → **Aceitar Coleta**.
3. **Cidadão** (`/cidadao`): **Escanear QR Code do Totem** → modal confirma o depósito (+50 pontos, +R$ 2,50 cashback).
4. **Cooperativa**: na coluna "Em Andamento" → **Confirmar Recebimento** → gera hash auditável.
5. **Empresa**: a coleta aparece em "Certificados de Rastreabilidade" com badge "Auditado na blockchain (simulado)" e alimenta o Painel ESG.

## Stack

Next.js (App Router) · React 19 · Tailwind CSS 4 · Recharts · Supabase (opcional) · Server Actions.
