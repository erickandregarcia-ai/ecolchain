import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LogoCompleta } from "@/components/ui/Logo";
import { USUARIO } from "@/lib/data/panorama";
import { BuscaGlobal } from "./BuscaGlobal";
import { Notificacoes } from "./Notificacoes";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0">
          <LogoCompleta />
        </Link>

        <BuscaGlobal />

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-emerald-100 px-3 py-2 text-sm text-slate-600 sm:flex">
            <Icon name="pin" size={16} className="text-emerald-600" />
            {USUARIO.cidade}
          </span>
          <Notificacoes />
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
