'use client';
import { Sun, Moon, LogOut } from "lucide-react";

export default function Header({ t, isDark, toggleTheme }: any) {
  return (
    <header className="fixed top-0 left-0 w-full h-20 px-8 flex justify-between items-center z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="flex-1">
        <button onClick={toggleTheme} className="p-2 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex-1 text-center">
        <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">
          {t.header.appName}
        </h1>
        <p className="text-[9px] uppercase tracking-[0.3em] text-cyan-400 font-bold mt-1">
          ELEVATE YOUR INNER VISION
        </p>
      </div>

      <div className="flex-1 flex flex-col items-end gap-1">
        <span className="text-[10px] text-gray-400 font-medium">zr.mehdi01@gmail.com</span>
        <button className="flex items-center gap-2 px-4 py-1 rounded-full border border-yellow-500/50 text-[10px] font-bold text-white hover:bg-yellow-500/10 transition-all">
          DÉCONNEXION <LogOut size={12} />
        </button>
      </div>
    </header>
  );
}