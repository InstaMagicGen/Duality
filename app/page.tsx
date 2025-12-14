'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Lang = 'en' | 'fr' | 'ar';

const translations: Record<Lang, any> = {
  en: {
    appName: 'Soulset Hub',
    login: 'Login',
    signup: 'Create Account',
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
      className="min-h-screen flex flex-col items-center justify-start px-6 py-6 bg-background text-foreground transition-colors duration-300 relative"
    >
      {/* Theme toggle top-left and login/signup top-right */}
      <header className="w-full flex justify-between items-center mb-16 absolute top-6 left-0 right-0 px-6">
        <button onClick={toggleTheme} className="header-btn theme-btn">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <div className="flex gap-3">
          <button onClick={() => router.push("/login")} className="header-btn login-btn">{t.login}</button>
          <button onClick={() => router.push("/signup")} className="header-btn signup-btn">{t.signup}</button>
        </div>
      </header>

      {/* App Name & Slogan */}
      <section className="text-center mt-32 mb-16">
        <h1 className="text-5xl font-extrabold mb-4">{t.appName}</h1>
        <p className="text-2xl text-zinc-300 italic">{t.duality.description}</p>
      </section>

      {/* App Cards Centered */}
      <section className="flex flex-col sm:flex-row justify-center items-center gap-8">
        {/* Duality Card */}
        <div className="app-card duality-card">
          <h2 className="text-2xl font-bold mb-2">{t.duality.title}</h2>
          <p className="text-zinc-300 mb-4">{t.duality.description}</p>
          <button onClick={() => router.push("/duality")} className="app-btn duality-btn">{t.duality.title} ↗</button>
        </div>

        {/* Soulset Navigator Card */}
        <div className="app-card soulset-card">
          <h2 className="text-2xl font-bold mb-2">{t.soulset.title}</h2>
          <p className="text-zinc-300 mb-4">{t.soulset.description}</p>
          <button onClick={() => router.push("/soulset")} className="app-btn soulset-btn">{t.soulset.title} ↗</button>
        </div>
      </section>
    </main>
  );
}
