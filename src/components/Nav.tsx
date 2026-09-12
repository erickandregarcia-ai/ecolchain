import Link from "next/link";
import { MascoteSol } from "./MascoteSol";

const links = [
  { href: "/", label: "Início" },
  { href: "/empresa", label: "Empresa" },
  { href: "/cooperativa", label: "Cooperativa" },
  { href: "/cidadao", label: "Cidadão" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/20 bg-emerald-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <MascoteSol size={34} />
          <span className="text-base font-bold text-amber-400 sm:text-lg">
            ECOL<span className="text-emerald-300">chain</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-2.5 py-1 text-xs font-medium text-emerald-100 transition hover:bg-emerald-800 hover:text-amber-300 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
