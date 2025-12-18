"use client";

import Header from "../components/Header";
import { useLang } from "../components/useLang";
import { t } from "../components/translations";

export default function AuthPage() {
  const { lang } = useLang();

  return (
    <>
      <Header />
      <main className="page-container">
        <h1 className="title">{t("auth_title", lang)}</h1>

        <input className="input-box" placeholder={t("email", lang)} />
        <input
          className="input-box"
          type="password"
          placeholder={t("password", lang)}
        />

        <button className="gold-button">
          {t("login", lang)}
        </button>
      </main>
    </>
  );
}
