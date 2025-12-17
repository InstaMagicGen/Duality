import { LogOut } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  t: any;
  userEmail?: string;
}

export default function Header({ t, userEmail = "zr.mehdi01@gmail.com" }: HeaderProps) {
  return (
    <header className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 relative z-10">
      <div>
        <h1 className="text-4xl font-bold text-white mb-3">
          <span className="bg-white/10 px-3 py-1 -ml-2 rounded-md">{t.header.appName}</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">{t.header.subtitle}</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <div className="text-xs text-gray-500 text-right">
          {t.header.connectedAs} <br />
          <span className="text-gray-300 text-sm">{userEmail}</span>
        </div>
        <Link href="/auth">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-700 text-sm text-gray-300 hover:text-white transition-colors">
            {t.header.logout} <LogOut size={14} />
          </button>
        </Link>
      </div>
    </header>
  );
}