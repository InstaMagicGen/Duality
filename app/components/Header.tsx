"use client";

import React, { useState, useEffect } from "react";

type HeaderProps = {
  lang: "fr" | "en" | "ar";
};

const Header: React.FC<HeaderProps> = ({ lang }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const toggleTheme = () => setDark(!dark);

  const translations = {
    fr: { login: "Connexion", signup: "Créer un compte", appName: "Soulset", slogan: "Explorer ton futur et ton état intérieur" },
    en: { login: "Login", signup: "Sign Up", appName: "Soulset", slogan: "Explore your future and inner state" },
    ar: { login: "تسجيل الدخول", signup: "إنشاء حساب", appName: "Soulset", slogan: "اكتشف مستقبلك وحالتك الداخلية" },
  };

  const t = translations[lang];

  return (
    <header className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
      {/* Dark/Light */}
      <button
        onClick={toggleTheme}
        className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {dark ? "🌙" : "☀️"}
      </button>

      {/* Nom + Slogan */}
      <div className="text-center">
        <h1 className="text-xl font-bold">{t.appName}</h1>
        <p className="text-sm">{t.slogan}</p>
      </div>

      {/* Connexion / Créer un compte */}
      <div className="space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">{t.login}</button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">{t.signup}</button>
      </div>
    </header>
  );
};

export default Header;
