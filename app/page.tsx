'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'

type Lang = 'en' | 'fr' | 'ar'

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
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('en')
  const router = useRouter()

  useEffect(() => {
    const systemLang = navigator.language.toLowerCase()
    if (systemLang.startsWith('fr')) setLang('fr')
    else if (systemLang.startsWith('ar')) setLang('ar')
    else setLang('en')
  }, [])

  const t = translations[lang]

  return (
    <main
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-black text-white flex flex-col px-6"
    >
      {/* Header top right */}
      <header className="flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold">{t.appName}</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="header-btn login-btn"
          >
            {t.login}
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="header-btn signup-btn"
          >
            {t.signup}
          </button>
        </div>
      </header>

      {/* Applications centralisées */}
      <section className="flex flex-col sm:flex-row justify-center items-center gap-12 mt-16 flex-1">
        {/* Duality */}
        <div className="app-card">
          <h2 className="text-3xl font-bold mb-3">{t.duality.title}</h2>
          <p className="text-zinc-300 mb-6 max-w-xs">{t.duality.description}</p>
          <button
            onClick={() => router.push("/duality")}
            className="app-btn duality-btn"
          >
            Open {t.duality.title} ↗
          </button>
        </div>

        {/* Soulset Navigator */}
        <div className="app-card">
          <h2 className="text-3xl font-bold mb-3">{t.soulset.title}</h2>
          <p className="text-zinc-300 mb-6 max-w-xs">{t.soulset.description}</p>
          <button
            onClick={() => router.push("/soulset")}
            className="app-btn soulset-btn"
          >
            Open {t.soulset.title} ↗
          </button>
        </div>
      </section>
    </main>
  )
}
