-- ECOLchain — inscrições em eventos (dados mínimos, sem email) + resultado do sorteio

create table if not exists tabela_inscricoes_eventos (
  id uuid primary key default gen_random_uuid(),
  evento_id uuid not null references tabela_empresas_eventos(id),
  nome text not null,
  telefone text not null,
  data_nascimento date not null,
  numero_sorte int not null check (numero_sorte between 0 and 100),
  data_visita timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists tabela_inscricoes_eventos_evento_idx
  on tabela_inscricoes_eventos (evento_id, created_at);

-- Prêmios: primeiro_lugar = Hotel, segundo_lugar = Bolo, terceiro_lugar = Chapéu
create table if not exists tabela_resultados_sorteios (
  evento_id uuid primary key references tabela_empresas_eventos(id),
  primeiro_lugar_id uuid not null references tabela_inscricoes_eventos(id),
  segundo_lugar_id uuid not null references tabela_inscricoes_eventos(id),
  terceiro_lugar_id uuid not null references tabela_inscricoes_eventos(id),
  sorteado_em timestamptz not null default now(),
  check (
    primeiro_lugar_id <> segundo_lugar_id
    and primeiro_lugar_id <> terceiro_lugar_id
    and segundo_lugar_id <> terceiro_lugar_id
  )
);
