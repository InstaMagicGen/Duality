"use client";

import Header from "@/components/Header";
import { useLang } from "@/components/useLang";
import { t } from "@/components/translations";


export default function AuthPage() {
  const { lang } = useLang();

  return (
    <>
      <Header />
      <main className="page">
        <h2>{t("auth_title", lang)}</h2>
        <p>{t("auth_desc", lang)}</p>
      </main>
    </>
  );
}
