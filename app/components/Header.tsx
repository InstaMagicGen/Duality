'use client'

import { useRouter } from "next/navigation";
import { useTheme } from "../context/themeContext";

export default function Header() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full flex justify-between items-center relative px-4 sm:px-6 py-4">
      {/* Dark/Light toggle */}
      <button onClick={toggleTheme} className="header-btn theme-btn">
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>

      {/* Logo centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img src="/logo.png" alt="Logo Soulset" className="h-12 sm:h-16" />
      </div>

      {/* Right buttons */}
      <div className="flex gap-3 ml-auto">
        <button onClick={() => router.push("/login")} className="header-btn login-btn">Se connecter</button>
        <button onClick={() => router.push("/signup")} className="header-btn signup-btn">Créer un compte</button>
      </div>
    </header>
  );
}
