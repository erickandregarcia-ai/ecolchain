-- ECOLchain — status "recusado" + histórico de devoluções do cidadão

alter table tabela_match_residuos
  drop constraint if exists tabela_match_residuos_status_check;

alter table tabela_match_residuos
  add constraint tabela_match_residuos_status_check
  check (status in ('pendente','aceito','auditado','recusado'));

create table if not exists tabela_devolucoes (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references tabela_usuarios_b2c(id),
  tipo_residuo text,
  pontos int default 0,
  cashback numeric default 0,
  created_at timestamptz default now()
);
