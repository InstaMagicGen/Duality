'use client';

import { LogOut, Sun, Moon } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  t: any;
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ t, isDark, toggleTheme }: HeaderProps) {
  return (
    <header className="w-full p-8 flex justify-between items-start z-50">
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold text-white bg-blue-900/40 px-3 py-1 inline-block rounded">
          {t.header.appName}
        </h1>
        <p className="text-gray-500 text-sm mt-2 leading-tight">
          {t.header.subtitle}
        </p>
      </div>

      <div className="text-right flex flex-col items-end gap-4">
        <div className="flex items-center gap-4">
          {/* Bouton de Thème */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all text-white"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Connecté en tant que</p>
            <p className="text-white font-bold text-xs tracking-tight">zr.mehdi01@gmail.com</p>
          </div>
        </div>

        <button className="px-6 py-2 border border-yellow-500/50 rounded-full text-white text-xs font-bold hover:bg-yellow-500/10 transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)] flex items-center gap-2">
          Déconnexion <LogOut size={12} />
        </button>
      </div>
    </header>
  );
}