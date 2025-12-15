'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Lang = 'en' | 'fr' | 'ar'

const translations: Record<Lang, any> = {
  en: {
    duality: {
      title: 'Duality',
      description: 'Explore your inner balance and navigate between shadow and light.',
    },
    soulset: {
      title: 'Soulset Navigator',
      description: 'Guided therapy to reflect, reset, and improve your emotional journey.',
    },
  },
  fr: {
    duality: {
      title: 'Duality',
      description: 'Explore ton équilibre intérieur et navigue entre l’ombre et la lumière.',
    },
    soulset: {
      title: 'Soulset Navigator',
      description:
        'Thérapie guidée pour réfléchir, se ressourcer et améliorer ton parcours émotionnel.',
    },
  },
  ar: {
    duality: {
      title: 'دوالِتي',
      description: 'اكتشف توازنك الداخلي وتنقل بين الظل والنور.',
    },
    soulset: {
      title: 'سولسِت نافيجيتور',
      description: 'علاج موجه للتأمل، إعادة التوازن، وتحسين رحلتك العاطفية.',
    },
  },
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('en')
  const router = useRouter()

  useEffect(() => {
    const l = navigator.language.toLowerCase()
    if (l.startsWith('fr')) setLang('fr')
    else if (l.startsWith('ar')) setLang('ar')
  }, [])

  const t = translations[lang]

  return (
    <main
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="page-container"
    >
      <section className="cards">
        <div className="card">
          <h2>{t.duality.title}</h2>
          <p>{t.duality.description}</p>
          <button onClick={() => router.push('/duality')}>
            Open ↗
          </button>
        </div>

        <div className="card">
          <h2>{t.soulset.title}</h2>
          <p>{t.soulset.description}</p>
          <button onClick={() => router.push('/soulset')}>
            Open ↗
          </button>
        </div>
      </section>
    </main>
  )
}
