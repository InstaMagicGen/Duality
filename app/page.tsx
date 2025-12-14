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
        {/* SOULSET Button */}
        <button
          onClick={() => router.push("/soulset")}
          className="soulset-btn"
        >
          {t.soulset} ↗
        </button>

        {/* DUALITY Button */}
        <button
          onClick={() => router.push("/duality")}
          className="duality-btn"
        >
          {t.duality} ↗
        </button>
      </section>

      {/* CSS intégré */}
      <style jsx>{`
        /* Bouton DUALITY (jaune, glow, futur) */
        .duality-btn {
          background: linear-gradient(135deg, #FFD84D, #FFB700);
          color: #000;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: 999px;
          box-shadow: 0 0 20px rgba(255, 200, 0, 0.6);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .duality-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 30px rgba(255, 220, 100, 0.9);
        }

        /* Bouton SOULSET (bleu, doux, sunset) */
        .soulset-btn {
          background: linear-gradient(135deg, #6EC6FF, #4A9EFF);
          color: #001F3F;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: 999px;
          box-shadow: 0 0 20px rgba(100, 180, 255, 0.6);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .soulset-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 30px rgba(140, 210, 255, 0.9);
        }
      `}</style>
    </main>
  )
}
