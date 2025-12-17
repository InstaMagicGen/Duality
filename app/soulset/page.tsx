"use client";

import Header from "@/components/Header";
import { useLang } from "@/components/useLang";
import { t } from "@/components/translations";

export default function SoulsetPage() {
  const { lang } = useLang();

  return (
    <>
      <Header />
      <main className="page">
        <h2>{t("soulset_title", lang)}</h2>
        <p>{t("soulset_analysis", lang)}</p>
      </main>
    </>
  );
}
