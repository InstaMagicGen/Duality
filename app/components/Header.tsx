"use client";

import { useLang, Lang } from "./useLang";
import Link from "next/link";

export default function Header() {
  const { lang, setLang } = useLang();

  return (
    <header className="global-header">
      <div className="header-left">
        <h1 className="logo">Soulset</h1>
        <nav className="nav-links">
          <Link href="/duality">
            {lang === "fr" ? "Duality" : lang === "ar" ? "الثنائية" : "Duality"}
          </Link>
          <Link href="/soulset">
            {lang === "fr"
              ? "Soulset Navigator"
              : lang === "ar"
              ? "ملاّح Soulset"
              : "Soulset Navigator"}
          </Link>
        </nav>
      </div>

      <div className="header-right">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
          className="lang-switch"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>

        <Link href="/auth" className="auth-btn">
          {lang === "fr"
            ? "Se connecter"
            : lang === "ar"
            ? "تسجيل الدخول"
            : "Sign in"}
        </Link>
      </div>
    </header>
  );
}
