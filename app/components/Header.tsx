import { Moon, Sun, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  t: any;
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ t, isDark, toggleTheme }: HeaderProps) {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/10">
      {/* GAUCHE : Theme Toggle */}
      <div className="w-1/3 flex justify-start">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition-all text-white"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* CENTRE : Branding */}
      <div className="w-1/3 text-center">
        <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
          {t.header.appName}
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold mt-1">
          ELEVATE YOUR INNER VISION
        </p>
      </div>

      {/* DROITE : Auth */}
      <div className="w-1/3 flex justify-end items-center gap-6">
        <Link href="/auth" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
          <LogIn size={14} /> {t.auth.loginTitle}
        </Link>
        <Link href="/auth" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-all">
          <UserPlus size={14} /> Créer un compte
        </Link>
      </div>
    </header>
  );
}