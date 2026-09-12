-- ECOLchain — seed (mesmos UUIDs fixos usados pelo store em memória)

insert into tabela_empresas_eventos (id, nome, cnpj, localizacao, tipo_residuo, volume_estimado) values
  ('11111111-1111-4111-8111-111111111111', 'Festival Sol Nascente', '12.345.678/0001-90', 'São Paulo - SP', 'PET', 12.5),
  ('22222222-2222-4222-8222-222222222222', 'Arena Verde Eventos', '98.765.432/0001-10', 'Rio de Janeiro - RJ', 'Alumínio', 8);

insert into tabela_cooperativas (id, nome, localizacao, materiais_aceitos, capacidade_toneladas, indicador_impacto_renda, percentual_mulheres) values
  ('33333333-3333-4333-8333-333333333333', 'Cooperativa Mulheres do Amanhã', 'São Paulo - SP', array['PET','Papelão','Tetra Pak'], 40, 62, 78),
  ('44444444-4444-4444-8444-444444444444', 'CooperFlor Recicla', 'Rio de Janeiro - RJ', array['Alumínio','Vidro','PET'], 25, 71, 72);

insert into tabela_usuarios_b2c (id, nome, pontos_reciclagem, cashback_acumulado) values
  ('55555555-5555-4555-8555-555555555555', 'Maria Clara', 320, 18.50);

insert into tabela_match_residuos (id, evento_id, cooperativa_id, status, hash_blockchain, tipo_residuo, volume_estimado, created_at) values
  ('66666666-6666-4666-8666-666666666666', '11111111-1111-4111-8111-111111111111', '33333333-3333-4333-8333-333333333333', 'auditado', '0x9f2c4a7d1e83b5f60a2c9d4e7b1f83a5c6d9e2f4a7b0c3d5e7f9a1b3c5d7e9f0', 'PET', 4.2, now() - interval '5 days'),
  ('77777777-7777-4777-8777-777777777777', '22222222-2222-4222-8222-222222222222', '44444444-4444-4444-8444-444444444444', 'aceito', null, 'Alumínio', 3.0, now() - interval '2 days'),
  ('88888888-8888-4888-8888-888888888888', '11111111-1111-4111-8111-111111111111', '33333333-3333-4333-8333-333333333333', 'pendente', null, 'Papelão', 2.0, now() - interval '1 day');
