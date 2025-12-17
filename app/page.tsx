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
    <main className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
      
      <Header t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      {/* Background Glows Premium */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-[130px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        
        {/* Grille des 2 modules (Alignés horizontalement et centrés) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mb-16">
          
          {/* CARTE DUALITY - OR PREMIUM */}
          <div className={`${isDark ? 'bg-[#050505]' : 'bg-white shadow-xl'} rounded-[3rem] p-12 border border-white/5 shadow-[0_0_50px_-15px_rgba(234,179,8,0.3)] flex flex-col items-center text-center`}>
            <h2 className="text-3xl font-bold mb-4 text-yellow-500 uppercase tracking-tighter italic">{t.duality.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-10 h-16">{t.duality.desc}</p>
            <Link href="/duality" className="w-full">
              <button className="w-full py-4 bg-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-all shadow-lg">
                {t.duality.btn} ↗
              </button>
            </Link>
          </div>

          {/* CARTE SOULSET - CYAN PREMIUM */}
          <div className={`${isDark ? 'bg-[#050505]' : 'bg-white shadow-xl'} rounded-[3rem] p-12 border border-white/5 shadow-[0_0_50px_-15px_rgba(6,182,212,0.3)] flex flex-col items-center text-center`}>
            <h2 className="text-3xl font-bold mb-4 text-cyan-400 uppercase tracking-tighter italic">{t.soulset.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-10 h-16">{t.soulset.desc}</p>
            <Link href="/soulset" className="w-full">
              <button className="w-full py-4 bg-cyan-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all shadow-lg">
                {t.soulset.btn} ↗
              </button>
            </Link>
          </div>

        </section>

        {/* Bouton Mood de la capture */}
        <button className="px-16 py-5 rounded-[2rem] bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-black font-black text-xl hover:scale-105 transition-transform shadow-2xl">
          {t.moodBtn}
        </button>
      </div>
    </main>
  );
}