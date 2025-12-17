"use client";

import React, { Dispatch, SetStateAction, useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { t } from "./translations";
import { useRouter } from "next/navigation";

type HeaderProps = {
  lang: "fr" | "en" | "ar";
  setLang: Dispatch<SetStateAction<"fr" | "en" | "ar">>;
};

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
      {/* Dark / Light toggle */}
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg transition hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {theme === "light" ? "🌞" : "🌙"}
      </button>

      {/* App name + slogan */}
      <div className="text-center">
        <h1 className="text-xl font-bold">Soulset</h1>
        <p className="text-sm">{t("subtitle", lang)}</p>
      </div>

      {/* Connexion / Créer un compte */}
      <div className="space-x-4">
        <button
          onClick={() => router.push("/auth")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {t("login", lang)}
        </button>
        <button
          onClick={() => router.push("/auth")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          {lang === "fr" ? "Créer un compte" : lang === "en" ? "Sign Up" : "إنشاء حساب"}
        </button>
      </div>
    </header>
  );
};

export default Header;
