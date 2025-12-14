'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'

type Lang = 'en' | 'fr' | 'ar'

const translations: Record<Lang, any> = {
  en: {
    appName: 'Duality',
    slogan: 'Explore your inner balance',
    description:
      'Duality is an introspective experience designed to help you understand your emotions and navigate between shadow and light.',
    createAccount: 'Create Account',
    login: 'Login',
  },
  fr: {
    appName: 'Duality',
    slogan: 'Explore ton équilibre intérieur',
    description:
      'Duality est une expérience introspective conçue pour t’aider à comprendre tes émotions et à naviguer entre l’ombre et la lumière.',
    createAccount: 'Créer un compte',
    login: 'Connexion',
  },
  ar: {
    appName: 'Duality',
    slogan: 'اكتشف توازنك الداخلي',
    description:
      'Duality هي تجربة تأملية مصممة لمساعدتك على فهم مشاعرك والتنقل بين الظل والنور.',
    createAccount: 'إنشاء حساب',
    login: 'تسجيل الدخول',
  },
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
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6"
    >
      {/* App name + slogan */}
      <header className="text-center mb-16 max-w-2xl">
        <h1 className="text-6xl font-extrabold tracking-wide">
          {t.appName}
        </h1>

        <p className="mt-4 text-2xl text-zinc-300 italic">
          {t.slogan}
        </p>

        <p className="mt-6 text-zinc-400 text-base leading-relaxed">
          {t.description}
        </p>
      </header>

      {/* Boutons centraux */}
      <section className="flex flex-col sm:flex-row gap-8">
        <button
          onClick={() => router.push("/signup")}
          className="main-btn create-btn"
        >
          {t.createAccount} ↗
        </button>

        <button
          onClick={() => router.push("/login")}
          className="main-btn login-btn"
        >
          {t.login} ↗
        </button>
      </section>
    </main>
  )
}
