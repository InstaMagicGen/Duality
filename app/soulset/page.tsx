"use client";

import React from "react";
import { useLang } from "@/components/useLang";
import { t } from "@/components/translations";
import "../globals.css";

export default function SoulsetPage() {
  const { lang, setLang } = useLang();

  return (
    <div className="page-container">
      <header>
        <button onClick={() => setLang("fr")}>FR</button>
        <button onClick={() => setLang("en")}>EN</button>
        <button onClick={() => setLang("ar")}>AR</button>
      </header>
      <main>
        <h1>{t("soulset_title", lang)}</h1>
        <p>{t("soulset_description", lang)}</p>
        <button className="primary-btn">{t("start_soulset", lang)}</button>
      </main>
    </div>
  );
}
