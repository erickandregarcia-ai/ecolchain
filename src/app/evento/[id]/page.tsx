import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { getDb } from "@/lib/db/store";
import { FormInscricao } from "./FormInscricao";
import { Podio } from "./Podio";
import { SortearBotao } from "./SortearBotao";

export const dynamic = "force-dynamic";

export default async function EventoPage({ params }: PageProps<"/evento/[id]">) {
  const { id } = await params;
  const db = getDb();
  const [empresas, inscricoes, resultado] = await Promise.all([
    db.listEmpresas(),
    db.listarInscricoesEvento(id),
    db.obterResultadoSorteio(id),
  ]);
  const evento = empresas.find((e) => e.id === id);
  if (!evento) notFound();

  const nomePorId = new Map(inscricoes.map((i) => [i.id, i.nome]));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <PageHeader
        titulo={evento.nome}
        descricao={`${evento.localizacao} · Inscreva-se e escolha seu número da sorte para concorrer aos prêmios.`}
        trilha={[{ label: "Eventos" }, { label: evento.nome }]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <FormInscricao eventoId={evento.id} encerrado={!!resultado} />

        <Card>
          <CardTitle icone="trophy">Resultado do sorteio</CardTitle>
          {resultado ? (
            <>
              <Podio
                vencedores={{
                  primeiro: nomePorId.get(resultado.primeiro_lugar_id) ?? "—",
                  segundo: nomePorId.get(resultado.segundo_lugar_id) ?? "—",
                  terceiro: nomePorId.get(resultado.terceiro_lugar_id) ?? "—",
                }}
              />
              <p className="mt-4 text-xs text-slate-400">
                Sorteado em {new Date(resultado.sorteado_em).toLocaleString("pt-BR")}
              </p>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-500">
                {inscricoes.length} inscrição(ões) até agora. O sorteio começa pelo 3º lugar,
                depois 2º e por fim o 1º; vence quem escolheu o número mais próximo do sorteado.
              </p>
              <SortearBotao eventoId={evento.id} disabled={inscricoes.length < 3} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
