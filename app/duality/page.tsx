'use client';

import { useState, useEffect } from "react";
import Header from "../components/Header";
import { translations, Lang } from "../components/translations";

export default function DualityPage() {
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0] as Lang;
    if (translations[browserLang]) setLang(browserLang);
  }, []);

  const t = translations[lang];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans">
      <Header t={t} />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-4xl p-[1px] rounded-[2rem] bg-gradient-to-b from-yellow-500/20 to-transparent">
          <div className="bg-[#050505] rounded-[2rem] p-12 border border-white/5 shadow-[0_0_60px_-12px_rgba(234,179,8,0.2)]">
            <h1 className="text-4xl font-bold text-yellow-400 mb-6 uppercase italic tracking-tighter">
              {t.duality.title}
            </h1>
            <div className="space-y-6 text-gray-400 text-lg">
               <p className="leading-relaxed">{t.duality.desc}</p>
               {/* Zone d'interaction future ici */}
               <div className="h-64 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-sm italic">
                 Interface Duality en cours d'initialisation...
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}