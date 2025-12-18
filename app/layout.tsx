import "./globals.css";
import Header from "./components/Header";
import { LangProvider } from "./components/useLang";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <LangProvider>
          <Header />
          <main className="app-container">{children}</main>
        </LangProvider>
      </body>
    </html>
  );
}
