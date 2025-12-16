"use client";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function SoulsetPage() {
  const [lang, setLang] = useState("fr");
  const [analysis, setAnalysis] = useState("");

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (["fr", "en", "ar"].includes(browserLang)) setLang(browserLang);
  }, []);

  const translations: Record<string, string> = {
    fr: "Scanne ta journée et reçois ton analyse personnalisée.",
    en: "Scan your day and receive your personalized analysis.",
    ar: "امسح يومك واحصل على تحليلك الشخصي.",
  };

  const analyze = (input: string) => {
    const result = `Analyse (${lang}): ${input ? input : "Aucune donnée reçue."}`;
    setAnalysis(result);
  };

  return (
    <>
      <Header />
      <main className="page-container">
        <h1>Soulset Navigator</h1>
        <p>{translations[lang]}</p>
        <textarea
          placeholder={lang === "fr" ? "Écris ici..." : lang === "en" ? "Write here..." : "اكتب هنا..."}
          onChange={(e) => analyze(e.target.value)}
        />
        <p>{analysis}</p>
      </main>
    </>
  );
}
