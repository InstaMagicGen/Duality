"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type Lang = "fr" | "en" | "ar";

const slogans: Record<Lang, string> = {
  fr: "Explore ton futur, scanne ta journée",
  en: "Explore your future, scan your day",
  ar: "استكشف مستقبلك، امسح يومك",
};

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const l = window.navigator.language.toLowerCase();
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <header className="w-full flex justify-between items-center py-4 px-6 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 dark:from-gray-800 dark:to-gray-900 shadow-md">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <div className="text-white dark:text-yellow-300 font-bold text-lg">
          Soulset App
          <p className="text-xs font-normal">{slogans[lang]}</p>
        </div>
      </div>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="bg-white dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded-lg shadow hover:brightness-110 transition"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}
