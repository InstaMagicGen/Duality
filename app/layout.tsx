import "./global.css";

export const metadata = {
  title: "Soulset",
  description: "Duality & Soulset Journey",
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
