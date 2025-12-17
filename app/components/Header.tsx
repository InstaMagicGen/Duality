// app/components/Header.tsx
"use client";

import React from "react";
import { useTranslations } from "./translations";

export type Lang = "fr" | "en" | "ar";

interface HeaderProps {
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>; // correction du type
}

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = useTranslations();

  return (
    <header className="header">
      <h1>{t("header_title", lang)}</h1>
      <nav>
        <button onClick={() => setLang("fr")}>{t("lang_fr", lang)}</button>
        <button onClick={() => setLang("en")}>{t("lang_en", lang)}</button>
        <button onClick={() => setLang("ar")}>{t("lang_ar", lang)}</button>
      </nav>
    </header>
  );
};

export default Header;
