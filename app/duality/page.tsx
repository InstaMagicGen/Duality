"use client";

import Header from "@/components/Header";
import { useLang } from "@/components/useLang";
import { t } from "@/components/translations";

export default function DualityPage() {
  const { lang } = useLang();

  return (
    <>
      <Header />
      <main className="page">
        <h2>{t("duality_title", lang)}</h2>
        <p>{t("duality_analysis", lang)}</p>
      </main>
    </>
  );
}
