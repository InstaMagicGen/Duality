"use client";

import React from "react";
import { useLang } from "@/components/useLang";
import { t } from "@/components/translations";
import "../globals.css";

export default function DualityPage() {
  const { lang, setLang } = useLang();

  return (
    <div className="page-container">
      <header>
        <button onClick={() => setLang("fr")}>FR</button>
        <button onClick={() => setLang("en")}>EN</button>
        <button onClick={() => setLang("ar")}>AR</button>
      </header>
      <main>
        <h1>{t("duality_title", lang)}</h1>
        <p>{t("duality_description", lang)}</p>
        <button className="primary-btn">{t("start_duality", lang)}</button>
      </main>
    </div>
  );
}
