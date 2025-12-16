"use client";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

type Lang = "fr" | "en" | "ar";

const translations: Record<Lang, { title: string; subtitle: string; placeholder: string; button: string }> = {
  fr: {
    title: "Soulset Navigator",
    subtitle: "Décris ton état pour recevoir ta phrase miroir...",
    placeholder: "Exemple : Journée fatigante...",
    button: "Voir ma phrase miroir",
  },
  en: {
    title: "Soulset Navigator",
    subtitle: "Describe your state to get your mirror phrase...",
    placeholder: "Example: Tiring day...",
    button: "Get mirror phrase",
  },
  ar: {
    title: "ملاح غروب الروح",
    subtitle: "صف حالتك للحصول على الجملة المرآة...",
    placeholder: "مثال: يوم متعب...",
    button: "اعرض الجملة",
  },
};

export default function SoulsetPage() {
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
