// app/layout.tsx
import "./globals.css"; // <-- Assure-toi que le chemin correspond

export const metadata = {
  title: "Duality / Soulset",
  description: "Navigation app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang="fr"><body>{children}</body></html>;
}
