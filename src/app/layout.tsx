import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aventuras de Dados",
  description: "RPG narrativo infantil para brincar, imaginar e aprender os números do dado.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
