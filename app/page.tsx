"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lang = "fr" | "en" | "ar";

const TEXT: Record<Lang, any> = {
  fr: {
    subtitle:
      "Deux expériences guidées : Duality pour voir ton futur probable, Soulset Navigator pour scanner ta journée sur un coucher de soleil.",
    dualityTitle: "DUALITY · Futur probable",
    dualityDesc:
      "Tu écris ce que tu vis. Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (conscience profonde).",
    dualityBtn: "Ouvrir Duality →",
    soulsetTitle: "SOULSET NAVIGATOR · Sunset Therapy",
    soulsetDesc:
      "Décris ton état du moment, puis laisse une phrase miroir se projeter sur un coucher de soleil apaisant.",
    soulsetBtn: "Commencer la Sunset Therapy →",
    moodBtn: "Voir mon suivi de mood",
  },
  en: {
    subtitle:
      "Two guided experiences: Duality to glimpse your probable future, Soulset Navigator to scan your day through a sunset.",
    dualityTitle: "DUALITY · Probable future",
    dualityDesc:
      "You write what you experience. Duality returns a LIFE ECHO (probable future) and a SHADOWTALK (deep awareness).",
    dualityBtn: "Open Duality →",
    soulsetTitle: "SOULSET NAVIGATOR · Sunset Therapy",
    soulsetDesc:
      "Describe your current state, then let a mirror phrase unfold on a soothing sunset.",
    soulsetBtn: "Start Sunset Therapy →",
    moodBtn: "View my mood tracking",
  },
  ar: {
    subtitle:
      "تجربتان موجهتان: Duality لرؤية مستقبلك المحتمل، وSoulset Navigator لمسح يومك عبر غروب الشمس.",
    dualityTitle: "DUALITY · المستقبل المحتمل",
    dualityDesc:
      "تكتب ما تعيشه. Duality يعيد LIFE ECHO (مستقبل محتمل) وSHADOWTALK (الوعي العميق).",
    dualityBtn: "فتح Duality ←",
    soulsetTitle: "SOULSET NAVIGATOR · علاج الغروب",
    soulsetDesc:
      "صف حالتك الحالية، ثم دع عبارة مرآة تنعكس على غروب شمس مهدئ.",
    soulsetBtn: "بدء علاج الغروب ←",
    moodBtn: "عرض تتبع المزاج",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === "en" || browserLang === "ar") {
      setLang(browserLang);
    } else {
      setLang("fr");
    }
  }, []);

  const t = TEXT[lang];

  return (
    <main className="home" dir={lang === "ar" ? "rtl" : "ltr"}>
      <p className="subtitle">{t.subtitle}</p>

      <div className="cards">
        {/* DUALITY */}
        <div className="card duality">
          <h2>{t.dualityTitle}</h2>
          <p>{t.dualityDesc}</p>

          <Link href="/duality" className="card-btn yellow">
            {t.dualityBtn}
          </Link>
        </div>

        {/* SOULSET */}
        <div className="card soulset">
          <h2>{t.soulsetTitle}</h2>
          <p>{t.soulsetDesc}</p>

          <Link href="/soulset" className="card-btn blue">
            {t.soulsetBtn}
          </Link>
        </div>
      </div>

      <Link href="/mood" className="mood-btn">
        {t.moodBtn}
      </Link>
    </main>
  );
}
