"use client";

import Header from "@/components/Header";
import { useLang } from "@/components/useLang";
import { t } from "@/components/translations";

export default function Duality() {
  const { lang } = useLang();

  return (
    <>
      <Header />
      <main className="center">
        <h2>{t("dualityTitle", lang)}</h2>
        <p className="analysis">{t("dualityText", lang)}</p>
        <button className="main-btn secondary">{t("start", lang)}</button>
      </main>
    </>
  );
}
