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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <Header t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      {/* Glow Backgrounds */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl z-10 flex flex-col items-center">
        {/* Grille des modules Duality / Soulset centrée */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-16 mt-24">
          
          {/* CARTE DUALITY */}
          <div className="bg-[#050505] rounded-[2.5rem] p-10 border border-white/5 shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)] flex flex-col justify-between min-h-[320px]">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-yellow-400">{t.duality.title}</h2>
              <p className="text-gray-400 text-lg leading-relaxed">{t.duality.desc}</p>
            </div>
            <div className="flex justify-between items-end mt-8">
              <span className="text-[10px] tracking-[0.2em] text-yellow-700 font-bold uppercase">{t.duality.tags}</span>
              <Link href="/duality">
                <button className="px-8 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition-all flex items-center gap-2">
                  {t.duality.btn} <span className="text-xl leading-none">↗</span>
                </button>
              </Link>
            </div>
          </div>

          {/* CARTE SOULSET */}
          <div className="bg-[#050505] rounded-[2.5rem] p-10 border border-white/5 shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] flex flex-col justify-between min-h-[320px]">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-cyan-400">{t.soulset.title}</h2>
              <p className="text-gray-400 text-lg leading-relaxed">{t.soulset.desc}</p>
            </div>
            <div className="flex justify-between items-end mt-8">
              <span className="text-[10px] tracking-[0.2em] text-cyan-700 font-bold uppercase">{t.soulset.tags}</span>
              <Link href="/soulset">
                <button className="px-8 py-3 bg-cyan-400 text-black rounded-full font-bold hover:bg-cyan-300 transition-all flex items-center gap-2">
                  {t.soulset.btn} <span className="text-xl leading-none">↗</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Bouton Mood Gradient */}
        <button className="px-14 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-black font-black text-xl hover:scale-105 transition-transform shadow-lg">
          {t.moodBtn}
        </button>
      </div>
    </main>
  );
}