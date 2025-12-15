"use client";

import "./globals.css";
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";

export const metadata = {
  title: "Soulset Journeys",
  description: "Two premium guided journeys: Duality & Soulset Navigator",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <html lang="fr">
      <body className="bg-neutral-900 dark:bg-black text-white transition-colors">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-yellow-500">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <div className="text-center">
            <h1 className="font-bold text-xl md:text-2xl text-yellow-400">
              Soulset Journeys
            </h1>
            <p className="text-xs text-neutral-400">Explore your journey</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/auth"
              className="px-4 py-2 rounded-full border border-yellow-400 hover:bg-yellow-400 hover:text-black transition"
            >
              Se connecter
            </Link>
            <Link
              href="/auth?mode=signup"
              className="px-4 py-2 rounded-full border border-yellow-400 hover:bg-yellow-400 hover:text-black transition"
            >
              Créer un compte
            </Link>
          </div>
        </header>

        {/* Boutons principaux Duality / Soulset */}
        <main className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-4">
          <div className="flex gap-6">
            <Link
              href="/duality"
              className="flex flex-col items-center justify-center w-40 h-40 bg-duality rounded-2xl border-2 border-gold text-white text-center p-4 hover:scale-105 transition-transform"
            >
              <h2 className="font-bold text-lg">Duality</h2>
              <p className="text-sm mt-2">Explore your probable future</p>
            </Link>

            <Link
              href="/soulset"
              className="flex flex-col items-center justify-center w-40 h-40 bg-soulset rounded-2xl border-2 border-gold text-white text-center p-4 hover:scale-105 transition-transform"
            >
              <h2 className="font-bold text-lg">Soulset</h2>
              <p className="text-sm mt-2">Scan your day on a sunset</p>
            </Link>
          </div>

          {/* Zone enfants (ex: pages dynamiques) */}
          {children}
        </main>
      </body>
    </html>
  );
}
