"use client";

import Header from "@/components/Header";
import { useLang } from "@/components/useLang";
import { t } from "@/components/translations";
import Link from "next/link";

export default function Home() {
  const { lang } = useLang();

  return (
    <>
      <Header />
      <main className="center">
        <h2>{t("homeTitle", lang)}</h2>
        <p className="intro">{t("homeText", lang)}</p>

        <div className="actions">
          <Link href="/soulset" className="main-btn">
            {t("soulsetTitle", lang)}
          </Link>
          <Link href="/duality" className="main-btn secondary">
            {t("dualityTitle", lang)}
          </Link>
        </div>
      </main>
    </>
  );
}
