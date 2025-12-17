'use client';
import { Sun, Moon, LogOut } from "lucide-react";
import Link from "next/link";

export default function Header({ t, isDark, toggleTheme }: any) {
  return (
    <header className="w-full h-24 px-10 flex justify-between items-center fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
      {/* GAUCHE : Bouton Thème fonctionnel */}
      <div className="w-1/3 flex justify-start">
        <button 
          onClick={(e) => { e.preventDefault(); toggleTheme(); }}
          className="p-3 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* CENTRE : Nom App + Slogan (Centré) */}
      <div className="w-1/3 text-center">
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
          {t.header.appName}
        </h1>
        <p className="text-[9px] uppercase tracking-[0.4em] text-cyan-400 font-bold mt-1.5">
          ELEVATE YOUR INNER VISION
        </p>
      </div>

      {/* DROITE : Profil + Déconnexion */}
      <div className="w-1/3 flex flex-col items-end">
        <div className="text-[10px] text-gray-500 uppercase mb-1">
          <span className="text-white font-bold">zr.mehdi01@gmail.com</span>
        </div>
        <Link href="/auth">
          <button className="flex items-center gap-2 px-6 py-1.5 rounded-full border border-yellow-500/50 text-[11px] font-bold text-white hover:bg-yellow-500/20 transition-all shadow-[0_0_20px_rgba(234,179,8,0.15)]">
            DÉCONNEXION <LogOut size={12} />
          </button>
        </Link>
      </div>
    </header>
  );
}