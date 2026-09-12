"use server";

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/store";
import { RECOMPENSAS } from "@/lib/recompensas";
import type { Cooperativa, StatusMatch, TipoResiduo, UsuarioB2C } from "@/lib/db/types";

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
