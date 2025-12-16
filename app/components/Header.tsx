"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [dark, setDark] = useState(true);

  function toggleTheme() {
    setDark(!dark);
    document.body.classList.toggle("light");
  }

  return (
    <header className="header">
      {/* LEFT */}
      <button onClick={toggleTheme} className="theme-btn">
        {dark ? "☀️" : "🌙"}
      </button>

      {/* CENTER */}
      <div className="logo">Soulset Journeys</div>

      {/* RIGHT */}
      <div className="auth">
        <Link href="/login" className="auth-btn">
          Se connecter
        </Link>
        <Link href="/signup" className="auth-btn outline">
          Créer un compte
        </Link>
      </div>
    </header>
  );
}
