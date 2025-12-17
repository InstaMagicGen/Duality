"use client";

import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { t } from "./translations";

type HeaderProps = {
  lang: "fr" | "en" | "ar";
};

export default function Header({ lang }: HeaderProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Dark/Light toggle */}
      <button
        onClick={toggleTheme}
        className="mr-4 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      {/* App name + slogan */}
      <div className="text-center flex-1">
        <h1 className="text-xl font-bold">Soulset</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("subtitle", lang)}
        </p>
      </div>

      {/* Boutons connexion / créer compte */}
      <div className="flex gap-4">
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
          {t("login", lang)}
        </button>
        <button className="px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-800 transition">
          {lang === "fr" ? "Créer un compte" : lang === "en" ? "Sign Up" : "إنشاء حساب"}
        </button>
      </div>
    </header>
  );
}
