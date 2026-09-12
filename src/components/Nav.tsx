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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <MascoteSol size={34} />
          <span className="text-lg font-bold text-amber-400">
            ECOL<span className="text-emerald-300">chain</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-emerald-100 transition hover:bg-emerald-800 hover:text-amber-300"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
