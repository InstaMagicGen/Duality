"use client";

import { useTheme } from "../context/themeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <img src="/logo.png" alt="Logo" className="logo" />
      <div className="flex gap-2">
        <button className="header-btn signup-btn">Créer un compte</button>
        <button className="header-btn login-btn">Se connecter</button>
        <button className="header-btn theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}
