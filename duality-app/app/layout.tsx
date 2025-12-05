// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DUALITY – Futur & Ombre Intérieure",
  description:
    "DUALITY : l'application qui te montre ton futur probable et la voix de ton ombre intérieure, en temps réel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[#050711] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
