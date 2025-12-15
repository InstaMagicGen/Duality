'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Lang = 'en' | 'fr' | 'ar';

const translations: Record<Lang, any> = {
  en: {
    duality: {
      title: 'Duality',
      description: 'Conscious awareness between shadow and light.',
      button: 'Open Duality',
    },
    soulset: {
      title: 'Soulset Navigator',
      description: 'Emotional balance, reflection and inner sunset.',
      button: 'Open Soulset',
    },
  },
  fr: {
    duality: {
      title: 'Duality',
      description: 'Conscience lucide entre l’ombre et la lumière.',
      button: 'Ouvrir Duality',
    },
    soulset: {
      title: 'Soulset Navigator',
      description: 'Équilibre émotionnel et apaisement intérieur.',
      button: 'Ouvrir Soulset',
    },
  },
  ar: {
    duality: {
      title: 'دوالِتي',
      description: 'وعي داخلي بين الظل والنور.',
      button: 'فتح Duality',
    },
    soulset: {
      title: 'سولسِت نافيجيتور',
      description: 'توازن عاطفي وهدوء داخلي.',
      button: 'فتح Soulset',
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
      className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground"
    >
      <section className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">

        {/* Duality – Conscience */}
        <div className="flex flex-col justify-between w-full md:w-1/2 p-8 rounded-2xl border border-indigo-400/30
                        bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 text-center shadow-lg">
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              {t.duality.title}
            </h2>
            <p className="text-sm opacity-80">
              {t.duality.description}
            </p>
          </div>

          <button
            onClick={() => router.push('/duality')}
            className="mt-8 w-full py-3 rounded-xl border border-indigo-400
                       text-indigo-300 hover:bg-indigo-500/10 transition"
          >
            {t.duality.button}
          </button>
        </div>

        {/* Soulset – Sunset */}
        <div className="flex flex-col justify-between w-full md:w-1/2 p-8 rounded-2xl border border-orange-400/30
                        bg-gradient-to-br from-orange-400/20 to-rose-400/10 text-center shadow-lg">
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              {t.soulset.title}
            </h2>
            <p className="text-sm opacity-80">
              {t.soulset.description}
            </p>
          </div>

          <button
            onClick={() => router.push('/soulset')}
            className="mt-8 w-full py-3 rounded-xl border border-orange-400
                       text-orange-300 hover:bg-orange-500/10 transition"
          >
            {t.soulset.button}
          </button>
        </div>

      </section>
    </main>
  );
}
