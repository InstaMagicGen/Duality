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
    if (browserLang === "en" || browserLang === "ar") setLang(browserLang);
    else setLang("fr");
  }, []);

  const t = TEXT[lang];

  return (
    <main className="home max-w-6xl mx-auto text-center px-4 py-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <p className="subtitle mb-12 text-lg md:text-xl">{t.subtitle}</p>

      <div className="cards flex flex-col md:flex-row justify-center gap-10 mb-12">
        {/* DUALITY */}
        <div className="card duality flex-1 border-2 border-yellow-400 rounded-3xl p-8 shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3">{t.dualityTitle}</h2>
          <p className="mb-6 opacity-80">{t.dualityDesc}</p>
          <Link href="/duality" className="card-btn yellow px-6 py-3 rounded-full font-semibold inline-block">
            {t.dualityBtn}
          </Link>
        </div>

        {/* SOULSET */}
        <div className="card soulset flex-1 border-2 border-sky-400 rounded-3xl p-8 shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3">{t.soulsetTitle}</h2>
          <p className="mb-6 opacity-80">{t.soulsetDesc}</p>
          <Link href="/soulset" className="card-btn blue px-6 py-3 rounded-full font-semibold inline-block">
            {t.soulsetBtn}
          </Link>
        </div>
      </div>

      <Link href="/mood" className="mood-btn bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 px-8 py-4 rounded-full inline-block font-bold text-black hover:brightness-110 transition">
        {t.moodBtn}
      </Link>
    </main>
  );
}
