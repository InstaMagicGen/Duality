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
      <body className="min-h-screen flex flex-col">
        <header className="w-full flex justify-between items-center px-6 py-4 bg-background text-foreground">
          <button onClick={toggleTheme} className="header-btn">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          <div className="text-center">
            <h1 className="text-2xl font-bold">Soulset Hub</h1>
            <p className="text-sm italic">Votre parcours vers l’équilibre intérieur</p>
          </div>

          <div className="flex gap-4">
            <button onClick={() => window.location.href='/login'} className="header-btn footer-btn">
              Se connecter
            </button>
            <button onClick={() => window.location.href='/signup'} className="header-btn footer-btn">
              Créer un compte
            </button>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
