// app/components/Header.tsx
"use client";

import Link from "next/link";
import { useLang } from "./useLang";
import { translations } from "./translations";

// Définition stricte des langues pour TypeScript
type Lang = "en" | "fr" | "ar";

export default function Header() {
  const lang = useLang();
  const langTyped = lang as Lang; // Force TypeScript à accepter

  return (
    <header className="header-container">
      <div className="logo">
        <Link href="/">Soulset</Link>
      </div>
      <nav>
        <Link href="/login" className="header-button">
          {translations.buttons.login[langTyped]}
        </Link>
        <Link href="/signup" className="header-button">
          {translations.buttons.signup[langTyped]}
        </Link>
      </nav>
    </header>
  );
}
