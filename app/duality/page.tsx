"use client";

import Header from "../components/Header";
import { useLang } from "../components/useLang";
import { t } from "../components/translations";

export default function Duality() {
  const { lang } = useLang();

  return (
    <>
      <Header />
      <main className="page-container">
        <h1 className="title">{t("duality_title", lang)}</h1>

        <textarea
          className="input-box"
          placeholder={t("duality_placeholder", lang)}
        />

        <button className="gold-button">
          {t("analyze", lang)}
        </button>
      </main>
    </>
  );
}
