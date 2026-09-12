import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar, NavMobile } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECOLchain | Dados reais. Impacto verificável.",
  description:
    "Plataforma de economia circular com dados reais, transparência e impacto: panorama da reciclagem, mapa de ecopontos, ranking de projetos e evidências auditáveis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f3faf5] text-slate-800">
        <Topbar />
        <NavMobile />
        <div className="flex flex-1">
          <Sidebar />
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
