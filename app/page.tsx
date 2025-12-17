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
    <main className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      
      <Header t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      {/* Conteneur principal - Aligne tout verticalement mais les cartes horizontalement */}
      <div className="w-full max-w-5xl px-6 pt-32 flex flex-col items-center gap-16 z-10">
        
        {/* GRILLE HORIZONTALE - C'est ici que l'alignement se joue */}
        <section className="flex flex-col md:flex-row gap-8 w-full justify-center">
          
          {/* CARTE DUALITY - JAUNE */}
          <div className="flex-1 bg-[#050505] rounded-[2.5rem] p-10 border border-white/5 shadow-[0_0_50px_-15px_rgba(234,179,8,0.4)] flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400 uppercase italic tracking-tighter">{t.duality.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-10 h-20">{t.duality.desc}</p>
            <Link href="/duality" className="w-full">
              <button className="w-full py-4 bg-yellow-400 text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-lg">
                Ouvrir Duality ↗
              </button>
            </Link>
          </div>

          {/* CARTE SOULSET - CYAN */}
          <div className="flex-1 bg-[#050505] rounded-[2.5rem] p-10 border border-white/5 shadow-[0_0_50px_-15px_rgba(6,182,212,0.4)] flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400 uppercase italic tracking-tighter">{t.soulset.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-10 h-20">{t.soulset.desc}</p>
            <Link href="/soulset" className="w-full">
              <button className="w-full py-4 bg-cyan-400 text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-lg">
                Démarrer Soulset ↗
              </button>
            </Link>
          </div>

        </section>

        {/* Bouton Mood de ta capture (Bas de page) */}
        <button className="px-16 py-5 rounded-[2rem] bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-black font-black text-xl hover:scale-110 transition-transform shadow-2xl">
          {t.moodBtn}
        </button>
      </div>

      {/* Lueurs d'arrière-plan (Détails premium) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/5 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px]" />
      </div>
    </main>
  );
}