interface Props {
  size?: number;
  className?: string;
}

export function LogoMarca({ size = 40, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="ECOLchain"
    >
      <path
        d="M24 2.5 42 12v24L24 45.5 6 36V12L24 2.5z"
        fill="#0f7a46"
        stroke="#0b5c35"
        strokeWidth="1.5"
      />
      <path
        d="M31.5 15c-9 0-14 4.5-14 11a7 7 0 0 0 2 4.9C21.5 26 25 22.5 30 20.5c-3.8 2.6-6.6 6-8.2 10.4 1.1.4 2.3.6 3.5.6 4.5 0 6.2-3.4 6.2-16.5z"
        fill="#c8f3d8"
      />
      <path
        d="M17 33.5c1.2-5 4.5-9.5 9-12.5"
        stroke="#8ce0ae"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function LogoCompleta({ compacta = false }: { compacta?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMarca size={compacta ? 32 : 42} />
      {!compacta && (
        <span className="leading-tight">
          <span className="block text-xl font-extrabold tracking-tight text-[#0f7a46]">
            ECOL<span className="font-semibold text-[#0f7a46]/80">chain</span>
          </span>
          <span className="block text-[11px] text-emerald-700/70">
            Dados reais. Impacto verificável.
          </span>
        </span>
      )}
    </span>
  );
}
