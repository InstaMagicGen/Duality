'use client';
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { translations, Lang } from "../components/translations";
import { Wind, SunMedium } from "lucide-react";

export default function SoulsetPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [isDark, setIsDark] = useState(true);
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center">
      <Header t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <div className="w-full max-w-5xl mt-32 px-6 flex flex-col items-center text-center gap-12">
        <div className="flex flex-col items-center gap-2 text-cyan-400">
          <SunMedium size={48} className="animate-pulse" />
          <h1 className="text-4xl font-bold uppercase italic tracking-tighter">Soulset Navigator</h1>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px]">Sunset Therapy Mode</p>
        </div>

        {/* Espace immersif Sunset */}
        <div className="w-full aspect-video bg-gradient-to-t from-orange-500/20 via-blue-900/10 to-transparent rounded-[3rem] border border-cyan-500/20 flex items-center justify-center relative overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.1)]">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-700" />
            <p className="z-10 text-cyan-100 italic text-xl">"Respirez au rythme de l'horizon..."</p>
        </div>

        {/* Contrôles de thérapie */}
        <div className="flex gap-6 w-full max-w-2xl">
          <button className="flex-1 py-4 border border-cyan-500/30 rounded-2xl bg-cyan-500/5 hover:bg-cyan-500/10 transition-all font-bold text-xs uppercase tracking-widest">
            Scanner mon état
          </button>
          <button className="flex-1 py-4 bg-cyan-400 text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
            Démarrer la Sunset Therapy
          </button>
        </div>
      </div>
    </main>
  );
}