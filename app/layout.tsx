import "./globals.css";
import { ThemeProvider, useTheme } from "./context/themeContext";

export const metadata = {
  title: "Duality App",
};

const Header = () => {
  const { toggleTheme } = useTheme();
  return (
    <header className="header relative">
      <div className="flex gap-4">
        <button className="header-btn login-btn">Se connecter</button>
        <button className="header-btn signup-btn">Créer un compte</button>
      </div>
      <img src="/logo.png" alt="Logo" className="logo" />
      <button
        className="header-btn theme-btn absolute right-4 top-4"
        onClick={toggleTheme}
      >
        🌗
      </button>
    </header>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <Header />
          <main className="flex justify-center items-center min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
