"use client";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

type Lang = "fr" | "en" | "ar";

const translations: Record<Lang, { title: string; subtitle: string; placeholder: string; button: string }> = {
  fr: {
    title: "Scan ta journée",
    subtitle: "Décris ton état du moment...",
    placeholder: "Exemple : Journée chargée...",
    button: "Voir ma phrase miroir",
  },
  en: {
    title: "Scan your day",
    subtitle: "Describe how you feel...",
    placeholder: "Example: Busy day...",
    button: "Get mirror phrase",
  },
  ar: {
    title: "افحص يومك",
    subtitle: "صف حالتك الحالية...",
    placeholder: "مثال: يوم مزدحم...",
    button: "اعرض الجملة",
  },
};

export default function DualityPage() {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const l = (navigator.language || "fr").toLowerCase();
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  const t = translations[lang];
  const directionClass = lang === "ar" ? "rtl" : "ltr";

  return (
    <main className={`min-h-screen px-4 py-5 ${directionClass}`}>
      <Header />
      <div className="form-container">
        <h1 className="text-xl mb-2">{t.title}</h1>
        <p className="mb-4">{t.subtitle}</p>
        <textarea placeholder={t.placeholder}></textarea>
        <button className="primary mt-4">{t.button}</button>
      </div>
    </main>
  );
}
