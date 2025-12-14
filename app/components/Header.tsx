"use client";

import { useTheme } from "../context/themeContext";
import Image from "next/image";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      {/* Bouton Créer un compte à gauche */}
      <button className="header-btn signup-btn">Créer un compte</button>

      {/* Logo centré */}
      <div className="logo">
        <Image src="/logo.png" alt="Logo" width={120} height={50} />
      </div>

      <div className="header-right" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Bouton Dark/Light */}
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Bouton Se connecter à droite */}
        <button className="header-btn login-btn">Se connecter</button>
      </div>
    </header>
  );
}
