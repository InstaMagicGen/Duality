"use client";

import Link from "next/link";
import useLang from "./useLang";
import { t } from "./translations";

export default function Header() {
  const lang = useLang();

  return (
    <header className="header">
      <div className="header-left">Logo</div>

      <div className="header-center">
        <h1>{t.header.title[lang]}</h1>
        <p>{t.header.subtitle[lang]}</p>
      </div>

      <div className="header-right">
        <Link href="/auth">
          <button className="btn ghost">{t.header.login[lang]}</button>
        </Link>
        <Link href="/auth">
          <button className="btn outline">{t.header.signup[lang]}</button>
        </Link>
      </div>
    </header>
  );
}
