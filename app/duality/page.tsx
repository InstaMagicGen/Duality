"use client";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function DualityPage() {
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (["fr", "en", "ar"].includes(browserLang)) setLang(browserLang);
  }, []);

  const translations: Record<string, string> = {
    fr: "Explore tes choix et découvre ton futur probable.",
    en: "Explore your choices and discover your probable future.",
    ar: "استكشف خياراتك واكتشف مستقبلك المحتمل.",
  };

  return (
    <>
      <Header />
      <main className="page-container">
        <h1>Duality</h1>
        <p>{translations[lang]}</p>
        {/* Ici tu peux ajouter ton interface Duality */}
      </main>
    </>
  );
}
