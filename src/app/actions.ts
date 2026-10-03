"use server";

import { createHash, randomInt } from "node:crypto";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/store";
import { RECOMPENSAS } from "@/lib/recompensas";
import {
  NUMERO_SORTE_MAX,
  NUMERO_SORTE_MIN,
  type Cooperativa,
  type InscricaoEvento,
  type ResultadoSorteio,
  type StatusMatch,
  type TipoResiduo,
  type UsuarioB2C,
} from "@/lib/db/types";

export async function buscarCooperativas(tipo: TipoResiduo): Promise<Cooperativa[]> {
  return getDb().buscarCooperativasPorMaterial(tipo);
}

export async function solicitarColeta(formData: FormData): Promise<void> {
  const evento_id = String(formData.get("evento_id") ?? "");
  const cooperativa_id = String(formData.get("cooperativa_id") ?? "");
  const tipo_residuo = String(formData.get("tipo_residuo") ?? "") as TipoResiduo;
  const volume_estimado = Number(formData.get("volume_estimado") ?? 0);
  if (!evento_id || !cooperativa_id || !tipo_residuo || !volume_estimado) {
    throw new Error("Dados inválidos para solicitação de coleta");
  }
  await getDb().criarMatch({ evento_id, cooperativa_id, tipo_residuo, volume_estimado });
  revalidatePath("/empresa");
  revalidatePath("/cooperativa");
}

async function atualizarStatus(id: string, status: StatusMatch, hash?: string) {
  await getDb().atualizarStatusMatch(id, status, hash);
  revalidatePath("/empresa");
  revalidatePath("/cooperativa");
}

export async function aceitarColeta(id: string): Promise<void> {
  await atualizarStatus(id, "aceito");
}

export async function recusarColeta(id: string): Promise<void> {
  await atualizarStatus(id, "recusado");
}

export async function confirmarRecebimento(id: string): Promise<string> {
  const matches = await getDb().listMatches();
  const match = matches.find((m) => m.id === id);
  if (!match) throw new Error("Match não encontrado");
  const payload = {
    id: match.id,
    evento_id: match.evento_id,
    cooperativa_id: match.cooperativa_id,
    tipo_residuo: match.tipo_residuo,
    volume_estimado: match.volume_estimado,
    timestamp: new Date().toISOString(),
  };
  const hash = "0x" + createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  await atualizarStatus(id, "auditado", hash);
  return hash;
}

export interface NotificacaoColeta {
  id: string;
  status: StatusMatch;
  empresa: string;
  cooperativa: string;
  material: TipoResiduo;
  volume: number;
  data: string;
}

export async function listarNotificacoes(): Promise<NotificacaoColeta[]> {
  const matches = await getDb().listMatches();
  return matches.slice(0, 8).map((m) => ({
    id: m.id,
    status: m.status,
    empresa: m.empresa.nome,
    cooperativa: m.cooperativa.nome,
    material: m.tipo_residuo,
    volume: m.volume_estimado,
    data: m.created_at,
  }));
}

export interface CertificadoPublico {
  id: string;
  hash: string;
  empresa: string;
  cooperativa: string;
  material: TipoResiduo;
  volume: number;
  data: string;
}

export async function buscarCertificadoPorHash(
  hash: string,
): Promise<CertificadoPublico | null> {
  if (!hash.trim()) return null;
  const m = await getDb().buscarMatchPorHash(hash);
  if (!m || m.status !== "auditado" || !m.hash_blockchain) return null;
  return {
    id: m.id,
    hash: m.hash_blockchain,
    empresa: m.empresa.nome,
    cooperativa: m.cooperativa.nome,
    material: m.tipo_residuo,
    volume: m.volume_estimado,
    data: m.created_at,
  };
}

export async function simularScanQr(
  usuarioId: string,
  tipo: TipoResiduo = "PET",
): Promise<{ pontos: number; cashback: number; ganho: number; bonus: number }> {
  const r = RECOMPENSAS[tipo] ?? RECOMPENSAS.PET;
  const db = getDb();
  const usuario: UsuarioB2C = await db.creditarPontos(
    usuarioId,
    r.pontos,
    r.cashback,
  );
  await db.registrarDevolucao({
    usuario_id: usuarioId,
    tipo_residuo: tipo,
    pontos: r.pontos,
    cashback: r.cashback,
  });
  revalidatePath("/cidadao");
  return {
    pontos: usuario.pontos_reciclagem,
    cashback: usuario.cashback_acumulado,
    ganho: r.pontos,
    bonus: r.cashback,
  };
}

export interface ResumoRede {
  coletas: number;
  auditadas: number;
  toneladas: number;
  creditos: number;
  co2Evitado: number;
}

export async function resumoRede(): Promise<ResumoRede> {
  const matches = await getDb().listMatches();
  const auditadas = matches.filter((m) => m.status === "auditado");
  const toneladas = auditadas.reduce((s, m) => s + m.volume_estimado, 0);
  return {
    coletas: matches.length,
    auditadas: auditadas.length,
    toneladas,
    creditos: Math.floor(toneladas / 0.5),
    co2Evitado: toneladas * 0.975,
  };
}

export type ResultadoAcao<T = undefined> =
  | { ok: true; dados: T }
  | { ok: false; erro: string };

function validarDataNascimento(dia: string, mes: string, ano: string): string | null {
  if (!/^\d{1,2}$/.test(dia) || !/^\d{1,2}$/.test(mes) || !/^\d{4}$/.test(ano)) {
    return null;
  }
  const d = Number(dia);
  const m = Number(mes);
  const a = Number(ano);
  const data = new Date(Date.UTC(a, m - 1, d));
  if (
    data.getUTCFullYear() !== a ||
    data.getUTCMonth() !== m - 1 ||
    data.getUTCDate() !== d
  ) {
    return null;
  }
  if (a < 1900 || data.getTime() > Date.now()) return null;
  return `${ano}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export async function inscreverEmEvento(
  formData: FormData,
): Promise<ResultadoAcao<{ id: string }>> {
  const evento_id = String(formData.get("evento_id") ?? "").trim();
  const nome = String(formData.get("nome") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const numeroSorteRaw = String(formData.get("numero_sorte") ?? "").trim();

  if (!evento_id) return { ok: false, erro: "Evento inválido." };
  if (nome.length < 2) return { ok: false, erro: "Informe seu nome." };

  const digitosTelefone = telefone.replace(/\D/g, "");
  if (digitosTelefone.length < 10 || digitosTelefone.length > 13) {
    return { ok: false, erro: "Informe um telefone válido com DDD." };
  }

  const data_nascimento = validarDataNascimento(
    String(formData.get("dia") ?? "").trim(),
    String(formData.get("mes") ?? "").trim(),
    String(formData.get("ano") ?? "").trim(),
  );
  if (!data_nascimento) {
    return { ok: false, erro: "Informe uma data de nascimento válida." };
  }

  if (!/^\d{1,3}$/.test(numeroSorteRaw)) {
    return {
      ok: false,
      erro: `Escolha um número da sorte entre ${NUMERO_SORTE_MIN} e ${NUMERO_SORTE_MAX}.`,
    };
  }
  const numero_sorte = Number(numeroSorteRaw);
  if (numero_sorte < NUMERO_SORTE_MIN || numero_sorte > NUMERO_SORTE_MAX) {
    return {
      ok: false,
      erro: `Escolha um número da sorte entre ${NUMERO_SORTE_MIN} e ${NUMERO_SORTE_MAX}.`,
    };
  }

  const db = getDb();
  const empresas = await db.listEmpresas();
  if (!empresas.some((e) => e.id === evento_id)) {
    return { ok: false, erro: "Evento não encontrado." };
  }
  if (await db.obterResultadoSorteio(evento_id)) {
    return { ok: false, erro: "O sorteio deste evento já foi realizado." };
  }

  const inscricao = await db.criarInscricaoEvento({
    evento_id,
    nome,
    telefone,
    data_nascimento,
    numero_sorte,
    data_visita: new Date().toISOString(),
  });
  revalidatePath(`/evento/${evento_id}`);
  return { ok: true, dados: { id: inscricao.id } };
}

function sortearLugar(candidatas: InscricaoEvento[]): InscricaoEvento {
  const numero = randomInt(NUMERO_SORTE_MIN, NUMERO_SORTE_MAX + 1);
  return candidatas.reduce((melhor, atual) => {
    const dAtual = Math.abs(atual.numero_sorte - numero);
    const dMelhor = Math.abs(melhor.numero_sorte - numero);
    if (dAtual !== dMelhor) return dAtual < dMelhor ? atual : melhor;
    return new Date(atual.created_at).getTime() <
      new Date(melhor.created_at).getTime()
      ? atual
      : melhor;
  });
}

export async function sortearEvento(
  eventoId: string,
): Promise<ResultadoAcao<ResultadoSorteio>> {
  const db = getDb();
  if (await db.obterResultadoSorteio(eventoId)) {
    return { ok: false, erro: "O sorteio deste evento já foi realizado." };
  }
  const inscricoes = await db.listarInscricoesEvento(eventoId);
  if (inscricoes.length < 3) {
    return {
      ok: false,
      erro: "São necessárias ao menos 3 inscrições para realizar o sorteio.",
    };
  }

  const restantes = [...inscricoes];
  const retirar = () => {
    const vencedora = sortearLugar(restantes);
    restantes.splice(restantes.indexOf(vencedora), 1);
    return vencedora.id;
  };
  const terceiro_lugar_id = retirar();
  const segundo_lugar_id = retirar();
  const primeiro_lugar_id = retirar();

  const resultado = await db.registrarResultadoSorteio({
    evento_id: eventoId,
    primeiro_lugar_id,
    segundo_lugar_id,
    terceiro_lugar_id,
    sorteado_em: new Date().toISOString(),
  });
  revalidatePath(`/evento/${eventoId}`);
  return { ok: true, dados: resultado };
}
