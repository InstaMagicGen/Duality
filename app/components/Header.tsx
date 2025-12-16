// app/components/Header.tsx
"use client";
import Link from "next/link";
import { translations } from "./translations";
import { useLang } from "./useLang";

export default function Header() {
  const lang = useLang();

  return (
    <header className="header-container">
      <nav>
        <Link href="/login" className="header-button">
          {translations.buttons.login[lang]}
        </Link>
        <Link href="/signup" className="header-button">
          {translations.buttons.signup[lang]}
        </Link>
      </nav>
    </header>
  );
}
