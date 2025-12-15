"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

type Lang = "fr" | "en" | "ar";

const translations: Record<
  Lang,
  {
    dualityTitle: string;
    dualityDesc: string;
    soulsetTitle: string;
    soulsetDesc: string;
  }
> = {
  fr: {
    dualityTitle: "Duality",
    dualityDesc: "Explore ton futur probable",
    soulsetTitle: "Soulset",
    soulsetDesc: "Scanne ta journée sur un coucher de soleil",
  },
  en: {
    dualityTitle: "Duality",
    dualityDesc: "Explore your probable future",
    soulsetTitle: "Soulset",
    soulsetDesc: "Scan your day on a sunset",
  },
  ar: {
    dualityTitle: "دوالتي",
    dualityDesc: "استكشاف مستقبلك المحتمل",
    soulsetTitle: "سولست",
    soulsetDesc: "امسح يومك على غروب الشمس",
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Détecter la langue du navigateur
    const l = window.navigator.language.toLowerCase();
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");

    // Vérifier session Supabase
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  const t = translations[lang];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 gap-10">
      {/* Boutons principaux */}
      <div className="flex gap-6">
        <Link
          href="/duality"
          className="flex flex-col items-center justify-center w-40 h-40 bg-duality rounded-2xl border-2 border-gold text-white text-center p-4 hover:scale-105 transition-transform"
        >
          <h2 className="font-bold text-lg">{t.dualityTitle}</h2>
          <p className="text-sm mt-2">{t.dualityDesc}</p>
        </Link>

        <Link
          href="/soulset"
          className="flex flex-col items-center justify-center w-40 h-40 bg-soulset rounded-2xl border-2 border-gold text-white text-center p-4 hover:scale-105 transition-transform"
        >
          <h2 className="font-bold text-lg">{t.soulsetTitle}</h2>
          <p className="text-sm mt-2">{t.soulsetDesc}</p>
        </Link>
      </div>

      {/* Boutons connexion / mood */}
      <div className="flex gap-4">
        {!user && (
          <>
            <Link
              href="/auth"
              className="px-6 py-3 rounded-full border border-gold text-white hover:bg-gold hover:text-black transition w-44 text-center"
            >
              Se connecter
            </Link>
            <Link
              href="/auth?mode=signup"
              className="px-6 py-3 rounded-full border border-gold text-white hover:bg-gold hover:text-black transition w-44 text-center"
            >
              Créer un compte
            </Link>
          </>
        )}

        {user && (
          <Link
            href="/mood"
            className="px-6 py-3 rounded-full border border-gold text-white hover:bg-gold hover:text-black transition w-44 text-center"
          >
            Suivre mon mood
          </Link>
        )}
      </div>
    </main>
  );
}
