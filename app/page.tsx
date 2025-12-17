"use client";

import Header from "@/components/Header";
import { useLang } from "@/components/useLang";
import { t } from "@/components/translations";

export default function HomePage() {
  const { lang } = useLang();

  return (
    <>
      <Header />
      <main className="page">
        <h2>{t("home_title", lang)}</h2>
        <p>{t("home_desc", lang)}</p>

        <div className="cards">
          <a href="/soulset" className="card">
            <h3>{t("soulset", lang)}</h3>
            <p>{t("soulset_desc", lang)}</p>
          </a>

          <a href="/duality" className="card">
            <h3>{t("duality", lang)}</h3>
            <p>{t("duality_desc", lang)}</p>
          </a>
        </div>
      </main>
    </>
  );
}
