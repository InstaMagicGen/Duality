'use client';

import { useState, useEffect } from "react";
import { Sparkles, Wind } from "lucide-react";
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
    <main className={`min-h-screen flex flex-col ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      
      {/* Background Glows (Arrière-plan uniquement) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      {/* HEADER */}
      <Header t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      {/* CONTENU CENTRAL */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 z-10">
        
        {/* Grille des modules Duality / Soulset */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
          
          {/* CARTE DUALITY */}
          <div className="group relative bg-[#0a0a0a] rounded-[2.5rem] p-10 border border-white/10 hover:border-amber-500/50 transition-all duration-500 shadow-2xl flex flex-col items-center text-center">
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 text-amber-500">
              <Sparkles size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-amber-100 uppercase tracking-tight">
              {t.duality.title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {t.duality.desc}
            </p>
            <Link href="/duality" className="w-full">
              <button className="w-full py-4 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-widest text-xs hover:bg-amber-400 transition-all">
                {t.duality.btn}
              </button>
            </Link>
          </div>

          {/* CARTE SOULSET */}
          <div className="group relative bg-[#0a0a0a] rounded-[2.5rem] p-10 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl flex flex-col items-center text-center">
            <div className="mb-6 p-4 rounded-2xl bg-cyan-500/10 text-cyan-500">
              <Wind size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-100 uppercase tracking-tight">
              {t.soulset.title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {t.soulset.desc}
            </p>
            <Link href="/soulset" className="w-full">
              <button className="w-full py-4 rounded-2xl bg-cyan-500 text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all">
                {t.soulset.btn}
              </button>
            </Link>
          </div>

        </section>

        {/* BOUTON MOOD (Bas de page mais dans le flux) */}
        <div className="mt-16">
          <button className="px-10 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
            {t.moodBtn}
          </button>
        </div>
      </div>
    </main>
  );
}