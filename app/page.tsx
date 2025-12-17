'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "./components/Header";
import { translations, Lang } from "./components/translations";

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0] as Lang;
    if (translations[browserLang]) setLang(browserLang);
  }, []);

  const t = translations[lang];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* HEADER FIXE EN HAUT */}
      <Header t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      {/* CONTENEUR PRINCIPAL CENTRÉ */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 pb-20">
        
        {/* GRILLE DES DEUX CARTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          
          {/* CARTE DUALITY (JAUNE/AMBRE) */}
          <div className="relative group p-[1px] rounded-[2rem] bg-gradient-to-b from-yellow-500/20 to-transparent">
            <div className="bg-[#050505] rounded-[2rem] p-10 h-full border border-white/5 shadow-[0_0_50px_-12px_rgba(234,179,8,0.3)]">
              <h2 className="text-3xl font-bold mb-4 text-yellow-400">
                {t.duality.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                {t.duality.desc}
              </p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-[10px] tracking-[0.2em] text-yellow-700 font-bold uppercase">
                  {t.duality.tags}
                </span>
                <Link href="/duality">
                  <button className="px-8 py-3 bg-yellow-400 text-black rounded-full font-bold flex items-center gap-2 hover:bg-yellow-300 transition-all text-sm">
                    {t.duality.btn} <span className="text-lg">↗</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* CARTE SOULSET (BLEU) */}
          <div className="relative group p-[1px] rounded-[2rem] bg-gradient-to-b from-cyan-500/20 to-transparent">
            <div className="bg-[#050505] rounded-[2rem] p-10 h-full border border-white/5 shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]">
              <h2 className="text-3xl font-bold mb-4 text-cyan-400">
                {t.soulset.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                {t.soulset.desc}
              </p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-[10px] tracking-[0.2em] text-cyan-700 font-bold uppercase">
                  {t.soulset.tags}
                </span>
                <Link href="/soulset">
                  <button className="px-8 py-3 bg-cyan-400 text-black rounded-full font-bold flex items-center gap-2 hover:bg-cyan-300 transition-all text-sm">
                    {t.soulset.btn} <span className="text-lg">↗</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* BOUTON MOOD GRADIENT (BAS) */}
        <div className="mt-16">
          <button className="px-12 py-4 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-black font-black rounded-2xl text-xl hover:scale-105 transition-transform shadow-lg">
            {t.moodBtn}
          </button>
        </div>
      </div>
    </main>
  );
}