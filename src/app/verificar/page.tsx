import { buscarCertificadoPorHash } from "@/app/actions";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";

export const dynamic = "force-dynamic";

export default async function VerificarPage({
  searchParams,
}: {
  searchParams: Promise<{ hash?: string }>;
}) {
  const { hash } = await searchParams;
  const consulta = (hash ?? "").trim();
  const cert = consulta ? await buscarCertificadoPorHash(consulta) : null;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <PageHeader
        titulo="Verificar certificado"
        descricao="Cole o hash de uma coleta auditada para confirmar a autenticidade do registro na rede ECOLchain."
        trilha={[{ label: "Verificação pública" }]}
      />

      <form
        action="/verificar"
        method="get"
        className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm"
      >
        <Icon name="hash" size={18} className="ml-2 shrink-0 text-slate-400" />
        <label className="flex-1">
          <span className="sr-only">Hash do certificado</span>
          <input
            name="hash"
            defaultValue={consulta}
            placeholder="0x9f2c4a7d..."
            className="h-10 w-full bg-transparent font-mono text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>
        <button
          type="submit"
          className="flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <Icon name="audit" size={16} />
          Verificar
        </button>
      </form>

      {consulta && cert && (
        <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Icon name="checkCircle" size={22} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-emerald-900">
                Certificado autêntico
              </h2>
              <p className="text-sm text-emerald-700">
                Registro auditado na blockchain ECOLchain (simulado).
              </p>
            </div>
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-emerald-50/70 p-3">
              <dt className="text-xs font-medium text-slate-500">Empresa</dt>
              <dd className="text-sm font-semibold text-slate-800">
                {cert.empresa}
              </dd>
            </div>
            <div className="rounded-xl bg-emerald-50/70 p-3">
              <dt className="text-xs font-medium text-slate-500">
                Cooperativa
              </dt>
              <dd className="text-sm font-semibold text-slate-800">
                {cert.cooperativa}
              </dd>
            </div>
            <div className="rounded-xl bg-emerald-50/70 p-3">
              <dt className="text-xs font-medium text-slate-500">Material</dt>
              <dd className="text-sm font-semibold text-slate-800">
                {cert.material} ·{" "}
                {cert.volume.toLocaleString("pt-BR")} t
              </dd>
            </div>
            <div className="rounded-xl bg-emerald-50/70 p-3">
              <dt className="text-xs font-medium text-slate-500">
                Data da auditoria
              </dt>
              <dd className="text-sm font-semibold text-slate-800">
                {new Date(cert.data).toLocaleDateString("pt-BR")}
              </dd>
            </div>
          </dl>
          <code className="mt-4 block break-all rounded-xl bg-emerald-950 px-4 py-3 font-mono text-xs text-emerald-100">
            {cert.hash}
          </code>
        </section>
      )}

      {consulta && !cert && (
        <section className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Icon name="info" size={20} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-red-800">
              Hash não encontrado
            </h2>
            <p className="text-sm text-red-700/80">
              Nenhuma coleta auditada corresponde a este hash na rede
              ECOLchain. Confira o valor e tente novamente.
            </p>
          </div>
        </section>
      )}

      {!consulta && (
        <p className="text-center text-sm text-slate-400">
          Você encontra o hash nos certificados do painel da empresa.
        </p>
      )}
    </div>
  );
}
