'use client'

import { useRouter } from "next/navigation";

type HeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  appName: string;
  slogan: string;
};

export default function Header({ theme, toggleTheme, appName, slogan }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="header w-full">
      {/* Left: Dark/Light Theme */}
      <div>
        <button onClick={toggleTheme} className="header-btn theme-btn">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Center: Logo + Title */}
      <div className="header-left">
        <img src="/logo.png" alt="Logo Soulset" className="logo" />
        <div className="flex flex-col">
          <span className="header-title">{appName}</span>
          <span className="header-slogan">{slogan}</span>
        </div>
      </div>

      {/* Right: Login / Signup */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/login")} className="header-btn login-btn">Se connecter</button>
        <button onClick={() => router.push("/signup")} className="header-btn signup-btn">Créer un compte</button>
      </div>
    </header>
  );
}
