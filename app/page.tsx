'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Lang = 'en' | 'fr' | 'ar';

const translations: Record<Lang, any> = {
  en: {
    appName: 'Soulset Hub',
    slogan: 'Your journey to inner balance',
    duality: { title: 'Duality', description: 'Explore your inner balance and navigate between shadow and light.' },
    soulset: { title: 'Soulset Navigator', description: 'Guided therapy to reflect, reset, and improve your emotional journey.' }
  },
  fr: {
    appName: 'Soulset Hub',
    slogan: 'Votre parcours vers l’équilibre intérieur',
    duality: { title: 'Duality', description: 'Explore ton équilibre intérieur et navigue entre l’ombre et la lumière.' },
    soulset: { title: 'Soulset Navigator', description: 'Thérapie guidée pour réfléchir, se ressourcer et améliorer ton parcours émotionnel.' }
  },
  ar: {
    appName: 'سولسِت هاب',
    slogan: 'رحلتك نحو التوازن الداخلي',
    duality: { title: 'دوالِتي', description: 'اكتشف توازنك الداخلي وتنقل بين الظل والنور.' },
    soulset: { title: 'سولسِت نافيجيتور', description: 'علاج موجه للتأمل، إعادة التوازن، وتحسين رحلتك العاطفية.' }
  }
};

export default function Page() {
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const router = useRouter();

  useEffect(() => {
    const systemLang = navigator.language.toLowerCase();
    if (systemLang.startsWith('fr')) setLang('fr');
    else if (systemLang.startsWith('ar')) setLang('ar');
    else setLang('en');
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const t = translations[lang];

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 py-6 bg-background text-foreground transition-colors duration-300">
      {/* App Cards */}
      <section className="flex flex-row justify-center items-stretch gap-6 mt-12 w-full max-w-4xl px-2 sm:px-0">
        <div className="app-card duality-card flex-1 flex flex-col justify-between">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">{t.duality.title}</h2>
          <p className="mb-4 text-center">{t.duality.description}</p>
          <button onClick={() => router.push("/duality")} className="app-btn duality-btn w-full py-3">{t.duality.title} ↗</button>
        </div>

        <div className="app-card soulset-card flex-1 flex flex-col justify-between">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">{t.soulset.title}</h2>
          <p className="mb-4 text-center">{t.soulset.description}</p>
          <button onClick={() => router.push("/soulset")} className="app-btn soulset-btn w-full py-3">{t.soulset.title} ↗</button>
        </div>
      </section>
    </main>
  );
}
