"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

const links = [
  { href: "/", label: "Início", icone: "home" },
  { href: "/mapa", label: "Mapa", icone: "pin" },
  { href: "/projetos", label: "Projetos", icone: "trophy" },
  { href: "/ranking", label: "Ranking", icone: "star" },
  { href: "/estados", label: "Estados", icone: "clipboard" },
  { href: "/assistente", label: "Assistente IA", icone: "shield" },
];

const fluxo = [
  { href: "/empresa", label: "Empresa", icone: "building" },
  { href: "/cooperativa", label: "Cooperativa", icone: "recycle" },
  { href: "/cidadao", label: "Cidadão", icone: "users" },
];

export function Sidebar() {
  const pathname = usePathname();

  const ativo = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-emerald-100 bg-white px-3 py-5 lg:flex">
      <nav className="flex flex-col gap-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={ativo(l.href) ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              ativo(l.href)
                ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                : "text-slate-600 hover:bg-emerald-50/60 hover:text-emerald-800"
            }`}
          >
            <Icon name={l.icone} size={19} className={ativo(l.href) ? "text-emerald-600" : "text-slate-400"} />
            {l.label}
          </Link>
        ))}

        <p className="mt-5 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Fluxo da demo
        </p>
        {fluxo.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={ativo(l.href) ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
              ativo(l.href)
                ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                : "text-slate-500 hover:bg-emerald-50/60 hover:text-emerald-800"
            }`}
          >
            <Icon name={l.icone} size={18} className={ativo(l.href) ? "text-emerald-600" : "text-slate-400"} />
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 overflow-hidden rounded-2xl bg-emerald-50 p-3">
        <p className="flex items-start gap-2 text-xs font-medium text-emerald-800">
          <Icon name="leaf" size={16} className="mt-0.5 shrink-0 text-emerald-600" />
          Juntos por uma economia circular.
        </p>
        <svg viewBox="0 0 160 60" className="mt-2 w-full text-emerald-200" aria-hidden="true">
          <g fill="currentColor">
            <rect x="8" y="28" width="18" height="32" rx="2" />
            <rect x="30" y="18" width="14" height="42" rx="2" />
            <rect x="48" y="34" width="20" height="26" rx="2" />
            <rect x="72" y="12" width="12" height="48" rx="2" />
            <rect x="88" y="26" width="22" height="34" rx="2" />
            <rect x="114" y="20" width="14" height="40" rx="2" />
            <rect x="132" y="32" width="20" height="28" rx="2" />
          </g>
          <path d="M78 12 78 2M74 6l4-4 4 4" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </aside>
  );
}

export function NavMobile() {
  const pathname = usePathname();
  const ativo = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-emerald-100 bg-white px-3 py-2 lg:hidden">
      {[...links, ...fluxo].map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
            ativo(l.href)
              ? "bg-emerald-600 text-white"
              : "bg-emerald-50 text-emerald-800"
          }`}
        >
          <Icon name={l.icone} size={14} />
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
