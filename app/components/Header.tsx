'use client';
import { Sun, Moon, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  return (
    <header className="fixed top-0 left-0 w-full h-20 px-8 flex justify-between items-center z-[999] bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="flex-1">
        <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="flex-[2] text-center">
        <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">SOULSET JOURNEYS</h1>
        <p className="text-[8px] uppercase tracking-[0.3em] text-cyan-400 font-bold mt-1">ELEVATE YOUR INNER VISION</p>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        <Link href="/auth" className="text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-1">
          <LogIn size={14} /> CONNEXION
        </Link>
        <Link href="/auth" className="px-4 py-2 rounded-full bg-white text-black text-[10px] font-black">S'INSCRIRE</Link>
      </div>
    </header>
  );
}