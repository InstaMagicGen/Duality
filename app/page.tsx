'use client';

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import { translations, Lang } from "./components/translations";

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = translations[lang];

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-black">
      {/* Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-900/20 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="w-full max-w-6xl relative z-10 flex flex-col">
        <div className="absolute top-0 right-0 -mt-4 flex gap-2">
            {(['fr', 'en', 'ar'] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`text-xs uppercase px-2 py-1 rounded ${lang === l ? 'bg-white/20 text-white' : 'text-gray-600'}`}>
                    {l}
                </button>
            ))}
        </div>

        <Header t={t} />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Card Duality */}
          <div className="glow-card-yellow rounded-3xl p-8 flex flex-col justify-between min-h-[300px] relative bg-black/80">
            <div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 tracking-wide">{t.duality.title}</h2>
              <p className="text-gray-300 text-base leading-relaxed mb-6">{t.duality.desc}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-auto">
              <span className="text-[10px] font-bold tracking-[0.2em] text-yellow-600 uppercase">{t.duality.tags}</span>
              <Link href="/duality" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors">
                  {t.duality.btn} <ArrowUpRight size={20} />
                </button>
              </Link>
            </div>
          </div>

          {/* Card Soulset */}
          <div className="glow-card-blue rounded-3xl p-8 flex flex-col justify-between min-h-[300px] relative bg-black/80">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4 tracking-wide">{t.soulset.title}</h2>
              <p className="text-gray-300 text-base leading-relaxed mb-6">{t.soulset.desc}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-auto">
              <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-700 uppercase">{t.soulset.tags}</span>
              <Link href="/soulset" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cyan-300 text-black font-bold hover:bg-cyan-200 transition-colors">
                  {t.soulset.btn} <ArrowUpRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </section>

        <div className="flex justify-center pb-10">
          <button className="glow-gradient-btn px-10 py-4 rounded-full font-bold text-black text-lg">
            {t.moodBtn}
          </button>
        </div>
      </div>
    </main>
  );
}