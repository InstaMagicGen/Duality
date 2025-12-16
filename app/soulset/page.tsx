"use client";
import Header from "../components/Header";
import { useEffect, useState } from "react";

type Lang = "fr" | "en" | "ar";

const translations: Record<Lang, { title: string; desc: string }> = {
  fr: { title: "Soulset Navigator", desc: "Scanne ta journée sur un coucher de soleil thérapeutique et découvre des insights uniques." },
  en: { title: "Soulset Navigator", desc: "Scan your day on a therapeutic sunset and discover unique insights." },
  ar: { title: "ملاح سولسيت", desc: "امسح يومك على غروب الشمس العلاجي واكتشف رؤى فريدة." },
};

export default function SoulsetPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = translations[lang];

  useEffect(() => {
    const l = window.navigator.language.toLowerCase();
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white px-4">
        <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
        <p className="text-center max-w-xl">{t.desc}</p>
      </main>
    </>
  );
}
