"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Lang = "fr" | "en" | "ar";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const l = navigator.language.toLowerCase();
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");

    document.body.classList.toggle("light", !darkMode);
  }, [darkMode]);

  return (
    <header className="global-header">
      <div className="header-left">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
      </div>

      <div className="header-center">
        <h1>Soulset</h1>
        <p>
          {lang === "fr"
            ? "Explorer ton futur & ton humeur"
            : lang === "ar"
            ? "استكشف مستقبلك ومزاجك"
            : "Explore your future & mood"}
        </p>
      </div>

      <div className="header-right">
        <button
          className="dark-light-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        <Link href="/auth?mode=login" className="header-btn">
          {lang === "fr" ? "Se connecter" : lang === "ar" ? "تسجيل" : "Login"}
        </Link>

        <Link href="/auth?mode=signup" className="header-btn outline">
          {lang === "fr"
            ? "Créer un compte"
            : lang === "ar"
            ? "حساب جديد"
            : "Sign up"}
        </Link>
      </div>
    </header>
  );
}
