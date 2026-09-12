import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LogoCompleta } from "@/components/ui/Logo";
import { USUARIO } from "@/lib/data/panorama";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0">
          <LogoCompleta />
        </Link>

        <label className="relative hidden flex-1 items-center md:flex">
          <Icon name="search" size={18} className="absolute left-4 text-slate-400" />
          <span className="sr-only">Buscar na plataforma</span>
          <input
            type="search"
            placeholder="Buscar projetos, blockchain, materiais, palavras-chave..."
            className="h-11 w-full rounded-full border border-emerald-100 bg-emerald-50/40 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white"
          />
        </label>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-emerald-100 px-3 py-2 text-sm text-slate-600 sm:flex">
            <Icon name="pin" size={16} className="text-emerald-600" />
            {USUARIO.cidade}
          </span>
          <button
            type="button"
            aria-label="Notificações"
            className="relative rounded-full border border-emerald-100 p-2 text-slate-500 transition hover:bg-emerald-50"
          >
            <Icon name="bell" size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
          </button>
          <span className="flex items-center gap-2 rounded-full bg-emerald-600 py-1.5 pl-1.5 pr-3 text-sm font-medium text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
              <Icon name="user" size={16} />
            </span>
            {USUARIO.nome}
          </span>
        </div>
      </div>
    </header>
  );
}
