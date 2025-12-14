import "./globals.css";
import { ThemeProvider } from "./context/themeContext";
import Header from "./components/Header";

export const metadata = { title: "Duality App" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
