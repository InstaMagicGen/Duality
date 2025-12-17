'use client';

import { useState } from "react";
import Link from "next/link";
import { translations, Lang } from "../components/translations";

export default function AuthPage() {
  const [lang] = useState<Lang>("fr");
  const t = translations[lang].auth;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
       <div className="w-full max-w-md p-8 rounded-3xl border border-gray-800 bg-black/80 backdrop-blur-xl relative z-10">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">{t.loginTitle}</h1>
          <form className="flex flex-col gap-4">
            <input type="email" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white" placeholder={t.email} />
            <input type="password" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white" placeholder={t.password} />
            <button className="mt-4 w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                {t.submit}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">← {t.back}</Link>
          </div>
       </div>
    </div>
  );
}