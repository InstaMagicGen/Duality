'use client';

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

type Lang = "en" | "fr" | "ar";

const translations: Record<Lang, any> = {
  en: {
    appName: "Soulset Journeys",
    subtitle: "Inner exploration & augmented consciousness",
    connectedAs: "Connected as",
    logout: "Logout",
    duality: {
      title: "DUALITY · Probable Future",
      text: "You write what you live. Duality returns a LIFE ECHO (probable future) and a SHADOWTALK (deep consciousness).",
      tags: ["LIFE ECHO", "SHADOWTALK"],
      button: "Enter Duality",
    },
    soulset: {
      title: "SOULSET NAVIGATOR · Sunset Therapy",
      text: "Describe your current state and let a short mirror phrase project onto a calming sunset.",
      tags: ["SCAN", "SUNSET THERAPY"],
      button: "Enter Soulset",
    },
    mood: "View my mood tracking",
  },

  fr: {
    appName: "Soulset Journeys",
    subtitle: "Exploration intérieure & conscience augmentée",
    connectedAs: "Connecté en tant que",
    logout: "Déconnexion",
    duality: {
      title: "DUALITY · Futur probable",
      text: "Tu écris ce que tu vis. Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (conscience profonde).",
      tags: ["LIFE ECHO", "SHADOWTALK"],
      button: "Accéder à Duality",
    },
    soulset: {
      title: "SOULSET NAVIGATOR · Sunset Therapy",
      text: "Décris ton état du moment puis laisse une phrase miroir se projeter sur un coucher de soleil apaisant.",
      tags: ["SCAN", "SUNSET THERAPY"],
      button: "Accéder à Soulset",
    },
    mood: "Voir mon suivi de mood",
  },

  ar: {
    appName: "رحلات سولسِت",
    subtitle: "استكشاف داخلي ووعي معزز",
    connectedAs: "متصل باسم",
    logout: "تسجيل الخروج",
    duality: {
      title: "دوالِتي · المستقبل المحتمل",
      text: "أنت تكتب ما تعيشه، ودوالِتي يعكس صدى الحياة والحديث العميق للوعي.",
      tags: ["صدى الحياة", "حديث الظل"],
      button: "الدخول إلى دوالِتي",
    },
    soulset: {
      title: "سولسِت نافيجيتور · علاج الغروب",
      text: "صف حالتك الحالية ودع جملة قصيرة تنعكس على غروب هادئ.",
      tags: ["فحص", "علاج الغروب"],
      button: "الدخول إلى سولسِت",
    },
    mood: "عرض تتبع المزاج",
  },
};

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const systemLang = navigator.language.toLowerCase();
    if (systemLang.startsWith("fr")) setLang("fr");
    else if (systemLang.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  const t = translations[lang];

  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen flex flex-col items-center px-6 py-10 relative overflow-hidden bg-black text-gray-200"
    >
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-start mb-16 relative z-10">
        <div>
          <h1 className="text-3xl font-bold">{t.appName}</h1>
          <p className="text-gray-400 mt-1">{t.subtitle}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500 mb-2">
            {t.connectedAs} zr.mehdi01@gmail.com
          </p>
          <button className="px-4 py-2 rounded-lg border border-gray-600 text-sm hover:border-gray-400 transition">
            {t.logout}
          </button>
        </div>
      </header>

      {/* Cards */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Duality */}
        <div className="p-6 rounded-2xl border border-yellow-400/70 bg-black glow-yellow">
          <h2 className="text-yellow-400 font-semibold mb-3">
            {t.duality.title}
          </h2>

          <p className="text-sm text-gray-300 mb-6">
            {t.duality.text}
          </p>

          <div className="flex gap-2 mb-6 flex-wrap">
            {t.duality.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border border-yellow-400/40 text-yellow-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition">
            {t.duality.button}
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Soulset */}
        <div className="p-6 rounded-2xl border border-cyan-400/70 bg-black glow-blue">
          <h2 className="text-cyan-400 font-semibold mb-3">
            {t.soulset.title}
          </h2>

          <p className="text-sm text-gray-300 mb-6">
            {t.soulset.text}
          </p>

          <div className="flex gap-2 mb-6 flex-wrap">
            {t.soulset.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border border-cyan-400/40 text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 text-black font-medium hover:bg-cyan-300 transition">
            {t.soulset.button}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="mt-20 relative z-10">
        <button className="px-10 py-4 rounded-full font-semibold text-black bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 glow-gradient hover:scale-105 transition-transform">
          {t.mood}
        </button>
      </div>
    </main>
  );
}
