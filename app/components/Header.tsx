'use client';
import { Sun, Moon, LogOut, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";

export default function Header({ t, isDark, toggleTheme }: any) {
  return (
    <header className="fixed top-0 left-0 w-full h-24 px-10 flex justify-between items-center z-[100] bg-black/80 backdrop-blur-md border-b border-white/5">
      {/* GAUCHE : Theme Switch */}
      <div className="flex-1">
        <button 
          onClick={toggleTheme} 
          className="p-3 rounded-full border border-white/10 text-white hover:bg-white/20 transition-all active:scale-90"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* CENTRE : Titre */}
      <div className="flex-1 text-center">
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
          {t.header.appName}
        </h1>
        <p className="text-[9px] uppercase tracking-[0.4em] text-cyan-400 font-bold mt-1">
          ELEVATE YOUR INNER VISION
        </p>
      </div>

      {/* DROITE : Boutons Auth Fonctionnels */}
      <div className="flex-1 flex justify-end items-center gap-4">
        <Link href="/auth" className="text-xs font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <LogIn size={14} /> Connexion
        </Link>
        <Link href="/auth" className="px-5 py-2 rounded-full bg-white text-black text-xs font-black hover:bg-gray-200 transition-all flex items-center gap-2">
          <UserPlus size={14} /> Créer un compte
        </Link>
      </div>
    </header>
  );
}'use client';
import { Sun, Moon, LogOut, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";

export default function Header({ t, isDark, toggleTheme }: any) {
  return (
    <header className="fixed top-0 left-0 w-full h-24 px-10 flex justify-between items-center z-[100] bg-black/80 backdrop-blur-md border-b border-white/5">
      {/* GAUCHE : Theme Switch */}
      <div className="flex-1">
        <button 
          onClick={toggleTheme} 
          className="p-3 rounded-full border border-white/10 text-white hover:bg-white/20 transition-all active:scale-90"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* CENTRE : Titre */}
      <div className="flex-1 text-center">
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
          {t.header.appName}
        </h1>
        <p className="text-[9px] uppercase tracking-[0.4em] text-cyan-400 font-bold mt-1">
          ELEVATE YOUR INNER VISION
        </p>
      </div>

      {/* DROITE : Boutons Auth Fonctionnels */}
      <div className="flex-1 flex justify-end items-center gap-4">
        <Link href="/auth" className="text-xs font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <LogIn size={14} /> Connexion
        </Link>
        <Link href="/auth" className="px-5 py-2 rounded-full bg-white text-black text-xs font-black hover:bg-gray-200 transition-all flex items-center gap-2">
          <UserPlus size={14} /> Créer un compte
        </Link>
      </div>
    </header>
  );
}