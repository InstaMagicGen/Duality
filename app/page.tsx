'use client'

import { useEffect, useState } from 'react'

type Lang = 'en' | 'fr' | 'ar'

const translations: Record<Lang, any> = {
  en: {
    appName: 'Duality',
    slogan: 'Explore your inner balance',
    description:
      'Duality is an introspective experience designed to help you understand your emotions and navigate between shadow and light.',
    soulset: 'Soulset',
    duality: 'Duality',
  },
  fr: {
    appName: 'Duality',
    slogan: 'Explore ton équilibre intérieur',
    description:
      'Duality est une expérience introspective conçue pour t’aider à comprendre tes émotions et à naviguer entre l’ombre et la lumière.',
    soulset: 'Soulset',
    duality: 'Duality',
  },
  ar: {
    appName: 'Duality',
    slogan: 'اكتشف توازنك الداخلي',
    description:
      'Duality هي تجربة تأملية مصممة لمساعدتك على فهم مشاعرك والتنقل بين الظل والنور.',
    soulset: 'سولسِت',
    duality: 'دوالِتي',
  },
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('en')

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
      className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center justify-center px-6"
    >
      {/* App name + slogan */}
      <header className="text-center mb-10 max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-wide">
          {t.appName}
        </h1>

        <p className="mt-3 text-xl text-zinc-300 italic">
          {t.slogan}
        </p>

        <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
          {t.description}
        </p>
      </header>

      {/* Buttons */}
      <section className="flex flex-col sm:flex-row gap-6 mt-6">
        <button
          className="
            px-10 py-5 rounded-2xl
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-lg font-semibold
            shadow-xl
            hover:scale-110 hover:shadow-indigo-500/40
            transition-all duration-300
          "
        >
          {t.soulset}
        </button>

        <button
          className="
            px-10 py-5 rounded-2xl
            bg-gradient-to-r from-emerald-600 to-teal-500
            text-lg font-semibold
            shadow-xl
            hover:scale-110 hover:shadow-emerald-500/40
            transition-all duration-300
          "
        >
          {t.duality}
        </button>
      </section>
    </main>
  )
}
