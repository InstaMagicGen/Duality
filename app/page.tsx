"use client";

import Header from "./components/Header";
import { useLang } from "./components/useLang";
import { t } from "./components/translations";
import Link from "next/link";

export default function Home() {
  const { lang } = useLang();

  return (
    <>
      <Header />
      <main className="main-container">
        <h1 className="title">{t("home_title", lang)}</h1>
        <p className="subtitle">{t("home_subtitle", lang)}</p>

        <div className="actions">
          <Link href="/duality" className="gold-button">
            {t("duality", lang)}
          </Link>
          <Link href="/soulset" className="gold-button">
            {t("soulset", lang)}
          </Link>
        </div>
      </main>
    </>
  );
}
