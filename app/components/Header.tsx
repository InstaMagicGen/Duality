"use client";

import React from "react";
import { t } from "./translations";

type HeaderProps = {
  lang: "fr" | "en" | "ar";
  setLang: React.Dispatch<React.SetStateAction<"fr" | "en" | "ar">>;
};

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  return (
    <header className="global-header">
      <div className="header-left">
        <h1>{t("home", lang)}</h1>
      </div>
      <div className="header-center">
        <h1>{t("subtitle", lang)}</h1>
        <p>{t("home_desc", lang)}</p>
      </div>
      <div className="header-right">
        <button className="btn btn-gold" onClick={() => setLang("fr")}>FR</button>
        <button className="btn btn-gold" onClick={() => setLang("en")}>EN</button>
        <button className="btn btn-gold" onClick={() => setLang("ar")}>AR</button>
      </div>
    </header>
  );
};

export default Header;
