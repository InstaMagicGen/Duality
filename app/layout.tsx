import "./globals.css";
import { LangProvider } from "./components/useLang";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
