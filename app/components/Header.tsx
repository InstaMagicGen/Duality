"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "./useLang";
import { t } from "./translations";

export default function Header() {
  const { lang, toggleLang } = useLang();

  return (
    <header className="global-header">
      <div className="header-left">
        <Image src="/logo.png" alt="Soulset" width={42} height={42} />
        <div>
          <h1>Soulset</h1>
          <p>{t("subtitle", lang)}</p>
        </div>
      </div>

      <nav className="header-nav">
        <Link href="/">{t("home", lang)}</Link>
        <Link href="/soulset">{t("soulset", lang)}</Link>
        <Link href="/duality">{t("duality", lang)}</Link>
        <Link href="/auth">{t("login", lang)}</Link>
      </nav>

      <button onClick={toggleLang} className="lang-btn">
        {lang.toUpperCase()}
      </button>
    </header>
  );
}
