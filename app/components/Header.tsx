"use client";

import Image from "next/image";
import { useLang } from "./useLang";
import { t } from "./translations";

export default function Header() {
  const { lang, toggleLang } = useLang();

  return (
    <header className="header">
      <div className="header-left">
        <Image src="/logo.png" alt="Soulset" width={44} height={44} />
        <div>
          <h1>Soulset</h1>
          <p>{t("subtitle", lang)}</p>
        </div>
      </div>

      <button onClick={toggleLang} className="lang-btn">
        {lang.toUpperCase()}
      </button>
    </header>
  );
}
