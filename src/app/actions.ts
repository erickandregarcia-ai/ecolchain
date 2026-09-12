"use server";

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/store";
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

export async function simularScanQr(
  usuarioId: string,
): Promise<{ pontos: number; cashback: number }> {
  const usuario: UsuarioB2C = await getDb().creditarPontos(usuarioId, 50, 2.5);
  revalidatePath("/cidadao");
  return {
    pontos: usuario.pontos_reciclagem,
    cashback: usuario.cashback_acumulado,
  };
}
