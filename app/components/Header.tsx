"use client";

import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { t } from "./translations";

type HeaderProps = {
  lang: "fr" | "en" | "ar";
};

const Header: React.FC<HeaderProps> = ({ lang }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-md">
      {/* Dark / Light mode */}
      <button
        onClick={toggleTheme}
        className="px-3 py-1 border rounded bg-gray-700 hover:bg-gray-600 transition"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      {/* App Name & Slogan */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Soulset</h1>
        <p className="text-sm">{t("subtitle", lang)}</p>
      </div>

      {/* Auth buttons */}
      <div className="space-x-2">
        <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition">
          {t("login", lang)}
        </button>
        <button className="px-4 py-2 rounded border border-blue-600 hover:bg-blue-600 hover:text-white transition">
          {t("signup", lang)}
        </button>
      </div>
    </header>
  );
};

export default Header;
