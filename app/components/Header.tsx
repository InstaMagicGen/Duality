'use client';
import { Sun, Moon, LogOut } from "lucide-react";
import Link from "next/link";

export default function Header({ t, isDark, toggleTheme }: any) {
  return (
    <header className="w-full py-6 px-10 flex justify-between items-center fixed top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/5">
      {/* GAUCHE : Theme Switch */}
      <div className="flex-1 flex justify-start">
        <button onClick={toggleTheme} className="p-2 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* CENTRE : Branding & Slogan */}
      <div className="flex-[2] text-center">
        <h1 className="text-3xl font-black text-white uppercase italic leading-none tracking-tighter">
          {t.header.appName}
        </h1>
        <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold mt-1">
          ELEVATE YOUR INNER VISION
        </p>
      </div>

      {/* DROITE : Auth */}
      <div className="flex-1 flex flex-col items-end gap-1">
        <div className="text-[10px] text-gray-500 uppercase">Connecté : <span className="text-white font-bold">zr.mehdi01@gmail.com</span></div>
        <Link href="/auth">
          <button className="flex items-center gap-2 px-5 py-1.5 rounded-full border border-yellow-500/50 text-[11px] font-bold text-white hover:bg-yellow-500/10 transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            Déconnexion <LogOut size={12} />
          </button>
        </Link>
      </div>
    </header>
  );
}