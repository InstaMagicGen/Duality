"use client";
import Link from "next/link";
import Header from "./components/Header";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (["fr", "en", "ar"].includes(browserLang)) setLang(browserLang);
  }, []);

  const translations: Record<string, Record<string, string>> = {
    duality: {
      fr: "Découvre ton futur probable en explorant tes choix.",
      en: "Discover your probable future by exploring your choices.",
      ar: "اكتشف مستقبلك المحتمل من خلال استكشاف خياراتك.",
    },
    soulset: {
      fr: "Scanne ta journée sur un coucher de soleil thérapeutique.",
      en: "Scan your day on a therapeutic sunset.",
      ar: "امسح يومك على غروب الشمس العلاجي.",
    },
  };

  return (
    <>
      <Header />
      <main className="home-buttons-container">
        <Link href="/duality">
          <div className="home-button-box">
            <h2>Duality</h2>
            <p>{translations.duality[lang]}</p>
          </div>
        </Link>
        <Link href="/soulset">
          <div className="home-button-box">
            <h2>Soulset Navigator</h2>
            <p>{translations.soulset[lang]}</p>
          </div>
        </Link>
      </main>
    </>
  );
}
