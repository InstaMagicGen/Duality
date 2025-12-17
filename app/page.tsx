'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "./components/Header";
import { translations, Lang } from "./components/translations";

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [isDark, setIsDark] = useState(true);

  const t = translations[lang];

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-gray-100'}`}>
      
      <Header t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      <div className="w-full max-w-5xl px-6 flex flex-col items-center gap-12 pt-20">
        
        {/* SECTION DES CARTES : FLEX-ROW pour mettre côte à côte */}
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-stretch">
          
          {/* DUALITY (OR) */}
          <div className="flex-1 bg-[#050505] rounded-[2.5rem] p-10 border border-white/5 shadow-[0_0_50px_-15px_rgba(234,179,8,0.3)] flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-4 text-yellow-500 uppercase italic italic tracking-tighter">DUALITY</h2>
            <p className="text-gray-400 text-sm mb-10 h-12">Prédisez votre futur et dialoguez avec votre conscience profonde.</p>
            <Link href="/duality" className="w-full">
              <button className="w-full py-4 bg-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest text-[10px]">Explorer ↗</button>
            </Link>
          </div>

          {/* SOULSET (CYAN) */}
          <div className="flex-1 bg-[#050505] rounded-[2.5rem] p-10 border border-white/5 shadow-[0_0_50px_-15px_rgba(6,182,212,0.3)] flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400 uppercase italic tracking-tighter">SOULSET</h2>
            <p className="text-gray-400 text-sm mb-10 h-12">Thérapie immersive par le coucher de soleil et scan émotionnel.</p>
            <Link href="/soulset" className="w-full">
              <button className="w-full py-4 bg-cyan-400 text-black rounded-2xl font-black uppercase tracking-widest text-[10px]">Démarrer ↗</button>
            </Link>
          </div>

        </div>

        {/* BOUTON MOOD */}
        <button className="mt-4 px-12 py-5 rounded-[2rem] bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-black font-black text-xl shadow-2xl hover:scale-105 transition-transform">
          QUEL EST TON MOOD ?
        </button>
      </div>
    </main>
  );
}