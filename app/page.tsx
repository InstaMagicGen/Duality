"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "./components/Header";

type Lang = "fr" | "en" | "ar";

const translations: Record<Lang, any> = {
  fr: {
    duality: "Duality",
    dualityDesc: "Découvre ton futur probable en explorant tes choix.",
    soulset: "Soulset Navigator",
    soulsetDesc: "Scanne ta journée sur un coucher de soleil thérapeutique.",
  },
  en: {
    duality: "Duality",
    dualityDesc: "Discover your probable future by exploring your choices.",
    soulset: "Soulset Navigator",
    soulsetDesc: "Scan your day on a therapeutic sunset.",
  },
  ar: {
    duality: "دواليتي",
    dualityDesc: "اكتشف مستقبلك المحتمل من خلال استكشاف خياراتك.",
    soulset: "ملاح سولسيت",
    soulsetDesc: "امسح يومك على غروب الشمس العلاجي.",
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = translations[lang];

  useEffect(() => {
    const l = window.navigator.language?.toLowerCase() || "fr";
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  return (
    <>
      <Header />
      <main className="home-buttons-container flex flex-col md:flex-row justify-center items-center min-h-[80vh] gap-10 px-4">
        <Link href="/duality">
          <div className="home-button-box">
            <h2>{t.duality}</h2>
            <p>{t.dualityDesc}</p>
          </div>
        </Link>
        <Link href="/soulset">
          <div className="home-button-box">
            <h2>{t.soulset}</h2>
            <p>{t.soulsetDesc}</p>
          </div>
        </Link>
      </main>
    </>
  );
}
