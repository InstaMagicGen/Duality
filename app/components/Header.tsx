"use client";

import React from "react";
import { useLang } from "./useLang";
import { t } from "./translations";
import "../globals.css";


export default function Header() {
  const { lang, setLang } = useLang();

  return (
    <header className="header-container">
      <h1>{t("welcome", lang)}</h1>
      <nav>
        <button onClick={() => setLang("fr")}>FR</button>
        <button onClick={() => setLang("en")}>EN</button>
        <button onClick={() => setLang("ar")}>AR</button>
      </nav>
    </header>
  );
}
