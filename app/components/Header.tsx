"use client";

import React, { useEffect, useState } from "react";
import { t } from "./translations";

export type HeaderProps = {
  lang?: "fr" | "en" | "ar";
};

const Header: React.FC<HeaderProps> = ({ lang }) => {
  const [currentLang, setCurrentLang] = useState<"fr" | "en" | "ar">("fr");

  useEffect(() => {
    // Détection automatique de la langue du navigateur
    const navLang = navigator.language.slice(0, 2);
    if (["fr", "en", "ar"].includes(navLang)) {
      setCurrentLang(navLang as "fr" | "en" | "ar");
    }
  }, []);

  const displayedLang = lang || currentLang;

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Nom + slogan centré */}
      <div className="text-center flex-1">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Soulset</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t("subtitle", displayedLang)}</p>
      </div>

      {/* Boutons connexion / création */}
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          {t("login", displayedLang)}
        </button>
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          Sign Up
        </button>
      </div>

      {/* Toggle dark/light */}
      <div className="ml-4">
        <button
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
        >
          🌙 / ☀️
        </button>
      </div>
    </header>
  );
};

export default Header;
