-- ECOLchain — schema inicial (hackathon MVP)

create table if not exists tabela_empresas_eventos (
  id uuid primary key default gen_random_uuid(),
  nome text,
  cnpj text,
  localizacao text,
  tipo_residuo text,
  volume_estimado numeric
);

create table if not exists tabela_cooperativas (
  id uuid primary key default gen_random_uuid(),
  nome text,
  localizacao text,
  materiais_aceitos text[],
  capacidade_toneladas numeric,
  indicador_impacto_renda numeric,
  percentual_mulheres numeric
);

create table if not exists tabela_match_residuos (
  id uuid primary key default gen_random_uuid(),
  evento_id uuid references tabela_empresas_eventos(id),
  cooperativa_id uuid references tabela_cooperativas(id),
  status text check (status in ('pendente','aceito','auditado')) default 'pendente',
  hash_blockchain text,
  tipo_residuo text,
  volume_estimado numeric,
  created_at timestamptz default now()
);

create table if not exists tabela_usuarios_b2c (
  id uuid primary key default gen_random_uuid(),
  nome text,
  pontos_reciclagem int default 0,
  cashback_acumulado numeric default 0
);
