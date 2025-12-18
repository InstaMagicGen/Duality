"use client";

import Link from "next/link";
import { useLang } from "./useLang";
import { t } from "./translations";

export default function Header() {
  const { lang, setLang } = useLang();

  return (
    <header className="header">
      <h1 className="logo">DUALITY</h1>

      <nav className="nav">
        <Link href="/">{t("nav.home", lang)}</Link>
        <Link href="/duality">{t("nav.duality", lang)}</Link>
        <Link href="/soulset">{t("nav.soulset", lang)}</Link>
      </nav>

      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="lang-switch"
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
        <option value="ar">AR</option>
      </select>
    </header>
  );
}
