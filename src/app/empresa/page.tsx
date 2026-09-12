import { getDb } from "@/lib/db/store";
import { TIPOS_RESIDUO, type TipoResiduo } from "@/lib/db/types";
import { NovaSolicitacao } from "./NovaSolicitacao";
import { PainelESG, type DadoGrafico } from "./PainelESG";
import { Certificados } from "./Certificados";

export const dynamic = "force-dynamic";

export default async function EmpresaPage() {
  const db = getDb();
  const [empresas, matches] = await Promise.all([
    db.listEmpresas(),
    db.listMatches(),
  ]);

  const auditados = matches.filter((m) => m.status === "auditado");
  const porMaterial = new Map<TipoResiduo, number>();
  for (const m of auditados) {
    porMaterial.set(
      m.tipo_residuo,
      (porMaterial.get(m.tipo_residuo) ?? 0) + m.volume_estimado,
    );
  }
  const dados: DadoGrafico[] = TIPOS_RESIDUO.map((tipo) => ({
    tipo,
    toneladas: porMaterial.get(tipo) ?? 0,
  }));
  const toneladasTotal = auditados.reduce((s, m) => s + m.volume_estimado, 0);
  const creditosESG = Math.floor(toneladasTotal / 0.5);

  const certificados = auditados.map((m) => ({
    id: m.id,
    hash: m.hash_blockchain ?? "",
    empresa: m.empresa.nome,
    cooperativa: m.cooperativa.nome,
    material: m.tipo_residuo,
    volume: m.volume_estimado,
    data: new Date(m.created_at).toLocaleDateString("pt-BR"),
  }));

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-extrabold text-emerald-900">
        Painel da Empresa
      </h1>
      <p className="mt-1 text-sm text-emerald-700">
        Solicite coletas de resíduos, acompanhe o impacto ESG e emita
        certificados auditáveis.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <NovaSolicitacao empresas={empresas} />
        </div>
        <div className="min-w-0">
          <PainelESG
            dados={dados}
            toneladasTotal={toneladasTotal}
            creditosESG={creditosESG}
            coletasAuditadas={auditados.length}
          />
        </div>
        <div className="min-w-0 lg:col-span-2">
          <Certificados certificados={certificados} />
        </div>
      </div>
    </main>
  );
}
