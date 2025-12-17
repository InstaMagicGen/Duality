"use client";

import React from "react";
import { t } from "./translations";

export type HeaderProps = {
  lang: "fr" | "en" | "ar";
  setLang: React.Dispatch<React.SetStateAction<"fr" | "en" | "ar">>;
};

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  return (
    <header className="global-header">
      <div className="header-left">
        <h1>{t("home_title", lang)}</h1>
      </div>
      <div className="header-center">
        <p>{t("subtitle", lang)}</p>
      </div>
      <div className="header-right">
        <button className="btn btn-gold-outline" onClick={() => setLang("fr")}>FR</button>
        <button className="btn btn-gold-outline" onClick={() => setLang("en")}>EN</button>
        <button className="btn btn-gold-outline" onClick={() => setLang("ar")}>AR</button>
        <button className="btn btn-blue">{t("login", lang)}</button>
      </div>
    </header>
  );
};

export default Header;
