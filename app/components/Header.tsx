'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 relative bg-background">
      {/* Dark/Light toggle à gauche */}
      <button onClick={toggleTheme} className="header-btn theme-btn mr-4">
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>

      {/* Logo + App name + slogan */}
      <div className="flex flex-col items-center absolute left-1/2 transform -translate-x-1/2">
        <img src="/logo.png" alt="Logo Soulset" className="w-20 h-20 mb-2" />
        <h1 className="font-extrabold text-2xl sm:text-3xl text-foreground">{theme === 'dark' ? 'Soulset Hub' : 'Soulset Hub'}</h1>
        <p className="text-sm sm:text-base italic text-foreground">{theme === 'dark' ? 'Your journey to inner balance' : 'Votre parcours vers l’équilibre intérieur'}</p>
      </div>

      {/* Boutons à droite */}
      <div className="flex gap-4">
        <button onClick={() => router.push("/login")} className="header-btn login-btn">Se connecter</button>
        <button onClick={() => router.push("/signup")} className="header-btn signup-btn">Créer un compte</button>
      </div>
    </header>
  );
}
