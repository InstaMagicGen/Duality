"use client";
import Header from "../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

type Lang = "fr" | "en" | "ar";

const translations: Record<Lang, { duality: string; soulset: string; dualityDesc: string; soulsetDesc: string }> = {
  fr: {
    duality: "Duality",
    soulset: "Soulset Navigator",
    dualityDesc: "Découvre ton futur probable en explorant tes choix.",
    soulsetDesc: "Scanne ta journée sur un coucher de soleil thérapeutique.",
  },
  en: {
    duality: "Duality",
    soulset: "Soulset Navigator",
    dualityDesc: "Explore your probable future through your choices.",
    soulsetDesc: "Scan your day on a therapeutic sunset.",
  },
  ar: {
    duality: "ثنائية",
    soulset: "ملاح غروب الروح",
    dualityDesc: "اكتشف مستقبلك المحتمل من خلال خياراتك.",
    soulsetDesc: "مسح يومك على غروب شمس علاجي.",
  },
};

export default function HomePage() {
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
    <main className={directionClass}>
      <Header />
      <div className="home-buttons-container">
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
      </div>
    </main>
  );
}
