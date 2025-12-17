"use client";

import React from "react";
import Header from "../components/Header";
import { t } from "../components/translations";

type Props = {
  lang: "fr" | "en" | "ar";
  setLang: (lang: "fr" | "en" | "ar") => void;
};


const AuthPage: React.FC<Props> = ({ lang, setLang }) => {
  return (
    <div className="min-h-screen">
      <Header lang={lang} setLang={setLang} />
      <main className="auth-box">
        <h2 className="text-2xl font-bold mb-4">{t("auth_title", lang)}</h2>
        <p>{t("auth_desc", lang)}</p>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn btn-gold w-full">Login</button>
      </main>
    </div>
  );
};

export default AuthPage;
