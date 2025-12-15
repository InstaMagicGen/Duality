'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Lang = 'en' | 'fr' | 'ar';

const translations: Record<Lang, any> = {
  en: {
    duality: {
      title: 'Duality',
      description:
        'Explore your inner balance between shadow and light.',
      button: 'Enter Duality ↗',
    },
    soulset: {
      title: 'Soulset Navigator',
      description:
        'Guided therapy to reflect, reset and grow.',
      button: 'Enter Soulset ↗',
    },
  },
  fr: {
    duality: {
      title: 'Duality',
      description:
        'Explore ton équilibre intérieur entre l’ombre et la lumière.',
      button: 'Entrer dans Duality ↗',
    },
    soulset: {
      title: 'Soulset Navigator',
      description:
        'Thérapie guidée pour réfléchir, se recentrer et évoluer.',
      button: 'Entrer dans Soulset ↗',
    },
  },
  ar: {
    duality: {
      title: 'دوالِتي',
      description:
        'اكتشف توازنك الداخلي بين الظل والنور.',
      button: 'الدخول إلى Duality ↗',
    },
    soulset: {
      title: 'سولسِت نافيجيتور',
      description:
        'علاج موجه للتأمل وإعادة التوازن والنمو.',
      button: 'الدخول إلى Soulset ↗',
    },
  },
};

export default function Page() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const systemLang = navigator.language.toLowerCase();
    if (systemLang.startsWith('fr')) setLang('fr');
    else if (systemLang.startsWith('ar')) setLang('ar');
    else setLang('en');
  }, []);

  const t = translations[lang];

  return (
    <main
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground"
    >
      {/* App Cards */}
      <section className="flex flex-col md:flex-row justify-center items-stretch gap-10 w-full max-w-5xl">

        {/* Duality – Conscience */}
        <div
          className="w-full md:w-1/2 rounded-2xl p-8 border
                     bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-cyan-400/10
                     border-indigo-400/30 text-center shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-3">
            {t.duality.title}
          </h2>
          <p className="mb-8 opacity-80">
            {t.duality.description}
          </p>
          <button
            onClick={() => router.push('/duality')}
            className="px-8 py-3 rounded-xl border border-indigo-400
                       text-indigo-300 hover:bg-indigo-500/10 transition"
          >
            {t.duality.button}
          </button>
        </div>

        {/* Soulset – Sunset */}
        <div
          className="w-full md:w-1/2 rounded-2xl p-8 border
                     bg-gradient-to-br from-orange-400/20 via-rose-400/10 to-yellow-300/10
                     border-orange-400/30 text-center shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-3">
            {t.soulset.title}
          </h2>
          <p className="mb-8 opacity-80">
            {t.soulset.description}
          </p>
          <button
            onClick={() => router.push('/soulset')}
            className="px-8 py-3 rounded-xl border border-orange-400
                       text-orange-300 hover:bg-orange-500/10 transition"
          >
            {t.soulset.button}
          </button>
        </div>

      </section>
    </main>
  );
}
