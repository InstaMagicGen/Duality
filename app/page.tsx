'use client';
import { useState } from "react";
import Header from "./components/Header";
import { translations } from "./components/translations";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const t = translations["fr"];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center">
      <Header t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      {/* Padding-top important pour éviter le chevauchement avec le Header */}
      <div className="w-full max-w-6xl px-6 pt-32 pb-20 flex flex-col items-center gap-12">
        
        {/* Section des deux cartes - Espacées proprement */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* CARTE DUALITY */}
          <div className="relative group rounded-[2.5rem] p-[1px] bg-gradient-to-b from-yellow-500/30 to-transparent">
            <div className="bg-[#050505] rounded-[2.5rem] p-10 h-full border border-white/5 shadow-[0_0_40px_-15px_rgba(234,179,8,0.3)]">
              <h2 className="text-3xl font-bold mb-4 text-yellow-400 uppercase italic">{t.duality.title}</h2>
              <p className="text-gray-400 text-base leading-relaxed mb-10 h-24">{t.duality.desc}</p>
              <button className="w-full py-4 bg-yellow-400 text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-yellow-300 transition-all">
                {t.duality.btn} ↗
              </button>
            </div>
          </div>

          {/* CARTE SOULSET */}
          <div className="relative group rounded-[2.5rem] p-[1px] bg-gradient-to-b from-cyan-500/30 to-transparent">
            <div className="bg-[#050505] rounded-[2.5rem] p-10 h-full border border-white/5 shadow-[0_0_40px_-15px_rgba(6,182,212,0.3)]">
              <h2 className="text-3xl font-bold mb-4 text-cyan-400 uppercase italic">{t.soulset.title}</h2>
              <p className="text-gray-400 text-base leading-relaxed mb-10 h-24">{t.soulset.desc}</p>
              <button className="w-full py-4 bg-cyan-400 text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-300 transition-all">
                {t.soulset.btn} ↗
              </button>
            </div>
          </div>

        </section>

        {/* Bouton Mood Gradient en bas */}
        <button className="mt-8 px-12 py-5 rounded-[2rem] bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-black font-black text-xl hover:scale-105 transition-transform shadow-2xl">
          {t.moodBtn}
        </button>
      </div>
    </main>
  );
}