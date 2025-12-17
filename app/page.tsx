'use client';

import { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, Wind } from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import { translations, Lang } from "./components/translations";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [isDark, setIsDark] = useState(true);

  // Détection automatique de la langue
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0] as Lang;
    if (translations[browserLang]) {
      setLang(browserLang);
    }
  }, []);

  const t = translations[lang];

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      
      {/* Background Premium Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      <Header t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      <div className="w-full max-w-5xl relative z-10">
        {/* Grille centrée avec marges */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-12 mt-20">
          
          {/* DUALITY - Style Or Royal */}
          <div className="group relative flex flex-col items-center text-center max-w-sm">
            <div className="w-full p-[1px] rounded-[2rem] bg-gradient-to-b from-amber-200/40 to-transparent">
              <div className="bg-[#0a0a0a] rounded-[2rem] p-10 border border-white/5 hover:border-amber-500/50 transition-all duration-500 shadow-2xl">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-amber-500/10 text-amber-500">
                  <Sparkles size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-4 tracking-tight text-amber-100">{t.duality.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 h-20">
                  {t.duality.desc}
                </p>
                <Link href="/duality">
                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                    {t.duality.btn}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* SOULSET - Style Bleu Électrique */}
          <div className="group relative flex flex-col items-center text-center max-w-sm">
            <div className="w-full p-[1px] rounded-[2rem] bg-gradient-to-b from-cyan-200/40 to-transparent">
              <div className="bg-[#0a0a0a] rounded-[2rem] p-10 border border-white/5 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-cyan-500/10 text-cyan-500">
                  <Wind size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-4 tracking-tight text-cyan-100">{t.soulset.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 h-20">
                  {t.soulset.desc}
                </p>
                <Link href="/soulset">
                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-400 text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(8,145,178,0.3)]">
                    {t.soulset.btn}
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </section>

        {/* Bouton Mood Centré Bas */}
        <div className="mt-24 flex justify-center">
          <button className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
            {t.moodBtn}
          </button>
        </div>
      </div>
    </main>
  );
}