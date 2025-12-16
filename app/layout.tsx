// app/layout.tsx
import "/globals.css"; // <-- chemin direct depuis la racine

export const metadata = {
  title: "Soulset",
  description: "Soulset Navigator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
