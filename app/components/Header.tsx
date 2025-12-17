"use client";

import Link from "next/link";
import { useLang } from "./useLang";
import { i18n } from "./i18n";

export default function Header() {
  const lang = useLang();

  return (
    <header className="header">
      <h1>{i18n.header.title[lang]}</h1>

      <div className="header-buttons">
        <Link href="/login" className="btn">
          {i18n.header.login[lang]}
        </Link>

        <Link href="/signup" className="btn btn-outline">
          {i18n.header.signup[lang]}
        </Link>
      </div>
    </header>
  );
}
