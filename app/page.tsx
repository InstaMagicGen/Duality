'use client';

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react"; // Note: J'ai changé pour ArrowUpRight pour matcher la capture

type Lang = "en" | "fr" | "ar";

const translations: Record<Lang, any> = {
  fr: {
    appName: "Soulset Journeys",
    subtitle: "Deux expériences guidées : Duality pour voir ton futur probable, Soulset Navigator pour scanner ta journée sur un coucher de soleil.",
    connectedAs: "Connecté en tant que",
    logout: "Déconnexion",
    duality: {
      title: "DUALITY · Futur probable",
      text: "Tu écris ce que tu vis, Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (ta conscience profonde).",
      tags: "LIFE ECHO · SHADOWTALK",
      button: "Ouvrir Duality",
    },
    soulset: {
      title: "SOULSET NAVIGATOR · Sunset Therapy",
      text: "Décris ton état du moment, puis laisse une phrase miroir courte se projeter sur un coucher de soleil apaisant.",
      tags: "SCAN · SUNSET THERAPY",
      button: "Commencer la Sunset Therapy",
    },
    mood: "Voir mon suivi de mood",
  },
  en: {
    appName: "Soulset Journeys",
    subtitle: "Two guided experiences: Duality to see your probable future, Soulset Navigator to scan your day on a sunset.",
    connectedAs: "Connected as",
    logout: "Logout",
    duality: {
      title: "DUALITY · Probable Future",
      text: "You write what you live, Duality returns a LIFE ECHO (probable future) and a SHADOWTALK (your deep consciousness).",
      tags: "LIFE ECHO · SHADOWTALK",
      button: "Open Duality",
    },
    soulset: {
      title: "SOULSET NAVIGATOR · Sunset Therapy",
      text: "Describe your current state, then let a short mirror phrase project onto a soothing sunset.",
      tags: "SCAN · SUNSET THERAPY",
      button: "Start Sunset Therapy",
    },
    mood: "View my mood tracking",
  },
  ar: {
    appName: "رحلات سولسِت",
    subtitle: "تجربتان موجهتان: دواليتي لرؤية مستقبلك المحتمل، وسولسِت نافيغيتور لمسح يومك عند غروب الشمس.",
    connectedAs: "متصل باسم",
    logout: "تسجيل الخروج",
    duality: {
      title: "دوالِتي · المستقبل المحتمل",
      text: "أنت تكتب ما تعيشه، ودوالِتي يعكس صدى الحياة والحديث العميق للوعي.",
      tags: "صدى الحياة · حديث الظل",
      button: "فتح دوالِتي",
    },
    soulset: {
      title: "سولسِت نافيجيتور · علاج الغروب",
      text: "صف حالتك الحالية ودع جملة قصيرة تنعكس على غروب هادئ.",
      tags: "فحص · علاج الغروب",
      button: "بدء علاج الغروب",
    },
    mood: "عرض تتبع المزاج",
  },
};

export default function Page() {
  const [lang, setLang] = useState<Lang>("fr"); // Défaut en FR pour correspondre à la capture

  useEffect(() => {
    // Optionnel : détection de langue navigateur
    // const systemLang = navigator.language.toLowerCase();
    // if (systemLang.startsWith("fr")) setLang("fr");
    // else if (systemLang.startsWith("ar")) setLang("ar");
    // else setLang("en");
  }, []);

  const t = translations[lang];

  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-black text-gray-200"
    >
      {/* Background glow effects (Ambience) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-yellow-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-6xl z-10 flex flex-col gap-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            {/* Title with highlighted style logic */}
            <h1 className="text-4xl font-bold text-white mb-2 selection:bg-blue-300 selection:text-blue-900">
                <span className="bg-white/10 px-2 py-1 -ml-2 rounded-sm">{t.appName}</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed selection:bg-blue-300 selection:text-blue-900">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <span className="text-xs text-gray-500 font-medium">
              {t.connectedAs} <span className="text-gray-300">zr.mehdi01@gmail.com</span>
            </span>
            <button className="px-5 py-2 rounded-full border border-gray-700 text-sm text-gray-300 hover:border-gray-500 hover:text-white transition-colors bg-black/50 backdrop-blur-sm">
              {t.logout}
            </button>
          </div>
        </header>

        {/* Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Duality Card (Yellow) */}
          <div className="group relative p-8 rounded-3xl border border-yellow-500/30 bg-black card-glow-yellow flex flex-col justify-between min-h-[280px]">
             {/* Inner Glow Helper */}
            <div className="absolute inset-0 bg-yellow-500/5 rounded-3xl pointer-events-none" />
            
            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4 tracking-wide">
                {t.duality.title}
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-8">
                {t.duality.text}
                </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <span className="text-xs font-bold tracking-widest text-yellow-600 uppercase">
                {t.duality.tags}
              </span>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                {t.duality.button}
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>

          {/* Soulset Card (Blue) */}
          <div className="group relative p-8 rounded-3xl border border-cyan-500/30 bg-black card-glow-blue flex flex-col justify-between min-h-[280px]">
            {/* Inner Glow Helper */}
            <div className="absolute inset-0 bg-cyan-500/5 rounded-3xl pointer-events-none" />

            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4 tracking-wide">
                {t.soulset.title}
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-8">
                {t.soulset.text}
                </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <span className="text-xs font-bold tracking-widest text-cyan-700 uppercase">
                {t.soulset.tags}
              </span>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition-colors shadow-lg shadow-cyan-400/20">
                {t.soulset.button}
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="flex justify-center mt-4">
          <button className="relative px-12 py-4 rounded-full font-bold text-black text-lg bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(236,72,153,0.6)]">
            {t.mood}
          </button>
        </div>

      </div>
    </main>
  );
}