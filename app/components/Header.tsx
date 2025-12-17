import { LogOut } from "lucide-react";
import Link from "next/link";

export default function Header({ t }: { t: any }) {
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

      <div className="text-right flex flex-col items-end gap-2">
        <p className="text-[10px] text-gray-500">
          Connecté en tant que <span className="text-white font-bold">zr.mehdi01@gmail.com</span>
        </p>
        <button className="px-6 py-2 border border-yellow-500/50 rounded-full text-white text-xs hover:bg-yellow-500/10 transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)]">
          Déconnexion
        </button>
      </div>
    </header>
  );
}