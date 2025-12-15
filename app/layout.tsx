'use client';
import './globals.css';
import { useState } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {/* Header */}
        <header className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-700">
          {/* Bouton dark/light */}
          <div>
            <button onClick={toggleTheme} className="header-btn">
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Logo + nom + slogan */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">Soulset Journeys</h1>
            <p className="text-gray-400 italic">Votre parcours vers l'équilibre intérieur</p>
          </div>

          {/* Boutons connexion/créer compte */}
          <div className="flex gap-4">
            <button className="header-btn border border-gray-500">Se connecter</button>
            <button className="header-btn border border-gray-500">Créer un compte</button>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
