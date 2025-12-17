'use client';
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { translations, Lang } from "../components/translations";
import { Sparkles, Terminal } from "lucide-react";

export default function DualityPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [isDark, setIsDark] = useState(true);
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center">
      <Header t={t} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <div className="w-full max-w-5xl mt-32 px-6 flex flex-col gap-8">
        {/* Header de la page spécifique */}
        <div className="flex items-center gap-4 text-yellow-500">
          <Sparkles size={32} />
          <h1 className="text-4xl font-bold uppercase italic tracking-tighter">Duality · Life Echo</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section Futur Probable */}
          <div className="bg-[#050505] border border-yellow-500/20 rounded-[2rem] p-8 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
            <h3 className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
              <Terminal size={18} /> FUTURE PROBABLE (LIFE ECHO)
            </h3>
            <div className="h-48 bg-black/40 rounded-xl border border-white/5 p-4 text-sm font-mono text-gray-400 italic">
              "L'écho de vos actions actuelles suggère une convergence vers..."
            </div>
          </div>

          {/* Section ShadowTalk (Conscience) */}
          <div className="bg-[#050505] border border-white/10 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="text-gray-300 font-bold mb-4 uppercase tracking-widest text-xs">ShadowTalk · Conscience Profonde</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Écrivez à votre conscience..." className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:border-yellow-500 outline-none transition-all" />
              <button className="w-full py-3 bg-white text-black font-bold rounded-full text-xs uppercase tracking-widest">Écouter l'écho</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}