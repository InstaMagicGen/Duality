"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Lang = 'en' | 'fr' | 'ar';

const translations: Record<Lang, any> = {
  en: {
    appName: 'Soulset Hub',
    login: 'Login',
    signup: 'Create Account',
    slogan: 'Your journey to inner balance',
    duality: {
      title: 'Duality',
      description: 'Explore your inner balance and navigate between shadow and light.'
    },
    soulset: {
      title: 'Soulset Navigator',
      description: 'Guided therapy to reflect, reset, and improve your emotional journey.'
    }
  },
  fr: {
    appName: 'Soulset Hub',
    login: 'Connexion',
    signup: 'Créer un compte',
    slogan: 'Votre parcours vers l’équilibre intérieur',
    duality: {
      title: 'Duality',
      description: 'Explore ton équilibre intérieur et navigue entre l’ombre et la lumière.'
    },
    soulset: {
      title: 'Soulset Navigator',
      description: 'Thérapie guidée pour réfléchir, se ressourcer et améliorer ton parcours émotionnel.'
    }
  },
  ar: {
    appName: 'سولسِت هاب',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    slogan: 'رحلتك نحو التوازن الداخلي',
    duality: {
      title: 'دوالِتي',
      description: 'اكتشف توازنك الداخلي وتنقل بين الظل والنور.'
    },
    soulset: {
      title: 'سولسِت نافيجيتور',
      description: 'علاج موجه للتأمل، إعادة التوازن، وتحسين رحلتك العاطفية.'
    }
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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <main
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 py-6 bg-background text-foreground transition-colors duration-300 relative"
    >
      {/* Top theme button */}
      <header className="w-full flex justify-end items-center absolute top-6 right-4 sm:right-6">
        <button onClick={toggleTheme} className="header-btn theme-btn">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </header>

      {/* App name + Slogan */}
      <section className="mt-24 flex flex-col items-center text-center px-4 sm:px-0">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">{t.appName}</h1>
        <p className="text-lg sm:text-2xl italic slogan-text max-w-xl">{t.slogan}</p>
      </section>

      {/* App Cards */}
      <section className="flex flex-row justify-center items-center gap-6 mt-12 w-full max-w-4xl px-2 sm:px-0">
        <div className="app-card duality-card">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{t.duality.title}</h2>
          <p className="mb-4 app-desc">{t.duality.description}</p>
          <button onClick={() => router.push("/duality")} className="app-btn duality-btn">{t.duality.title} ↗</button>
        </div>

        <div className="app-card soulset-card">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{t.soulset.title}</h2>
          <p className="mb-4 app-desc">{t.soulset.description}</p>
          <button onClick={() => router.push("/soulset")} className="app-btn soulset-btn">{t.soulset.title} ↗</button>
        </div>
      </section>
    </main>
  );
}
