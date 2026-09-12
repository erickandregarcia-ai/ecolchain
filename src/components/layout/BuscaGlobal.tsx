"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function BuscaGlobal() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      className="relative hidden flex-1 items-center md:flex"
      onSubmit={(e) => {
        e.preventDefault();
        const termo = q.trim();
        router.push(
          termo ? `/projetos?q=${encodeURIComponent(termo)}` : "/projetos",
        );
      }}
    >
      <Icon
        name="search"
        size={18}
        className="absolute left-4 text-slate-400"
      />
      <span className="sr-only">Buscar na plataforma</span>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar projetos, blockchain, materiais, palavras-chave..."
        className="h-11 w-full rounded-full border border-emerald-100 bg-emerald-50/40 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white"
      />
    </form>
  );
}
