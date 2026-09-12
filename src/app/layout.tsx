import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECOLchain | Recicle, monetize, escale sustentabilidade",
  description:
    "Ecossistema ReFi de economia circular inclusiva: blockchain e tokenomics para dar transparência e rastreabilidade à política reversa de resíduos no Brasil.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-emerald-50/60 text-emerald-950">
        <Nav />
        {children}
      </body>
    </html>
  );
}
