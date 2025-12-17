"use client";

import React from "react";

type HeaderProps = {
  lang: string;
  setLang: (lang: string) => void;
};

export default function Header({ lang, setLang }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <h1>Duality App</h1>
      </div>
      <nav>
        <button
          className={lang === "fr" ? "active" : ""}
          onClick={() => setLang("fr")}
        >
          FR
        </button>
        <button
          className={lang === "en" ? "active" : ""}
          onClick={() => setLang("en")}
        >
          EN
        </button>
        <button
          className={lang === "ar" ? "active" : ""}
          onClick={() => setLang("ar")}
        >
          AR
        </button>
      </nav>
    </header>
  );
}
