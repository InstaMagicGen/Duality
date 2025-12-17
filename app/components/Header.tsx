"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en" | "ar";

interface HeaderProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const translations = {
  fr: { home: "Accueil", duality: "Dualité", soulset: "Soulset" },
  en: { home: "Home", duality: "Duality", soulset: "Soulset" },
  ar: { home: "الصفحة الرئيسية", duality: "الازدواجية", soulset: "روح" },
};

export default function Header({ lang, setLang }: HeaderProps) {
  const router = useRouter();
  const t = translations[lang];

  return (
    <header className="global-header">
      <div className="header-left">
        <h1>InstaMagicGen</h1>
      </div>

      <div className="header-center">
        <h1>{t.home}</h1>
      </div>

      <div className="header-right">
        <button className="btn btn-gold" onClick={() => router.push("/")}>{t.home}</button>
        <button className="btn btn-gold-outline" onClick={() => router.push("/duality")}>{t.duality}</button>
        <button className="btn btn-blue" onClick={() => router.push("/soulset")}>{t.soulset}</button>

        {/* Sélecteur de langue */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
          className="btn btn-gold-outline"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
      </div>
    </header>
  );
}
