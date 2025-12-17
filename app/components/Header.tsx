import { Moon, Sun, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  t: any;
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ t, isDark, toggleTheme }: HeaderProps) {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center bg-transparent backdrop-blur-md fixed top-0 left-0 z-50 border-b border-white/5">
      {/* GAUCHE : Theme Toggle */}
      <div className="flex-1">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-300"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* CENTRE : Branding */}
      <div className="flex-[2] text-center">
        <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
          {t.header.appName}
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold">
          Elevate Your Inner Vision
        </p>
      </div>

      {/* DROITE : Auth */}
      <div className="flex-1 flex justify-end gap-4">
        <Link href="/auth" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
          <LogIn size={14} /> {t.auth.loginTitle}
        </Link>
        <Link href="/auth" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-all shadow-lg shadow-white/5">
          <UserPlus size={14} /> Créer un compte
        </Link>
      </div>
    </header>
  );
}