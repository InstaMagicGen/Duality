'use client';

import './globals.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 bg-black/90 shadow-lg">
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 border border-yellow-400 rounded-full hover:brightness-110 transition"
        >
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-yellow-400">Soulset Journeys</h1>
          <p className="text-sm text-neutral-400">Votre parcours vers l’équilibre intérieur</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth?mode=login" className="btn-auth btn-gold">
            Se connecter
          </Link>
          <Link href="/auth?mode=signup" className="btn-auth btn-gold">
            Créer un compte
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
