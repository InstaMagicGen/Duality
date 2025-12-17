"use client";

import React from "react";
import { t } from "../components/translations";
import Header from "../components/Header";
import { useLang } from "../components/useLang";

export default function AuthPage() {
  const { lang, setLang } = useLang();

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main className="page">
        <h2>{t("auth_title", lang)}</h2>
        <p>{t("auth_desc", lang)}</p>
      </main>
    </>
  );
}
