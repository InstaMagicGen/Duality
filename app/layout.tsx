import "./globals.css";
import { ReactNode, useState, useEffect } from "react";

export const metadata = {
  title: "Soulset Journeys",
  description: "Explore your inner balance",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <html lang="fr">
      <body className={`min-h-screen font-sans ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold">Soulset Journeys</h1>
            <p className="text-subtle">Explore your inner balance</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-auth btn-gold">Se connecter</button>
            <button className="btn-auth btn-blue">Créer un compte</button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex flex-col items-center justify-center px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
