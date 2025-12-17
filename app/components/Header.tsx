"use client";

import React from "react";
import { Lang, useTranslations } from "./translations";

type HeaderProps = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = useTranslations(lang);

  return (
    <header className="header-container">
      <div className="logo">
        <h1>{t("home")}</h1>
      </div>

      <nav className="nav-links">
        <ul>
          <li>{t("soulset")}</li>
          <li>{t("duality")}</li>
          <li>{t("login")}</li>
        </ul>
      </nav>

      <div className="lang-switcher">
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
      </div>

      <style jsx>{`
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .nav-links ul {
          display: flex;
          list-style: none;
          gap: 1.5rem;
        }

        .nav-links li {
          cursor: pointer;
        }

        .lang-switcher button {
          margin-left: 0.5rem;
          padding: 0.3rem 0.6rem;
          cursor: pointer;
          border: 1px solid #ccc;
          background: none;
          border-radius: 4px;
        }

        .lang-switcher button.active {
          background-color: #333;
          color: #fff;
        }
      `}</style>
    </header>
  );
};

export default Header;
