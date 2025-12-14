'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import MoodDashboard from './components/MoodDashboard'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Lang = 'fr' | 'en'

const TEXT: Record<Lang, any> = {
  fr: {
    title: 'Soulset Journeys',
    subtitle:
      'Deux expériences guidées : Duality pour voir ton futur probable, Soulset Navigator pour scanner ta journée sur un coucher de soleil.',
    dualityTitle: 'DUALITY · Futur probable',
    dualityDesc:
      'Tu écris ce que tu vis, Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (ta conscience profonde).',
    dualityBtn: 'Ouvrir Duality',
    soulsetTitle: 'SOULSET NAVIGATOR · Sunset Therapy',
    soulsetDesc:
      'Décris ton état du moment, puis laisse une phrase miroir courte se projeter sur un coucher de soleil apaisant.',
    soulsetBtn: 'Commencer la Sunset Therapy',
    moodBtn: 'Voir mon suivi de mood',
    logout: 'Déconnexion',
    login: 'Connexion'
  },
  en: {
    title: 'Soulset Journeys',
    subtitle:
      'Two guided experiences: Duality to see your probable future, Soulset Navigator to scan your day through a sunset.',
    dualityTitle: 'DUALITY · Probable Future',
    dualityDesc:
      'You write what you live. Duality returns a LIFE ECHO (probable future) and a SHADOWTALK (your deep awareness).',
    dualityBtn: 'Open Duality',
    soulsetTitle: 'SOULSET NAVIGATOR · Sunset Therapy',
    soulsetDesc:
      'Describe your current state and let a short mirror phrase project onto a calming sunset.',
    soulsetBtn: 'Start Sunset Therapy',
    moodBtn: 'View my mood tracking',
    logout: 'Logout',
    login: 'Login'
  }
}

export default function HomePage() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('fr')
  const [user, setUser] = useState<any>(null)

  const t = TEXT[lang]

  useEffect(() => {
    const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en'
    setLang(browserLang)

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <main className="min-h-screen bg-black text-white px-8 py-6">
      {/* HEADER */}
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl font-bold text-blue-300">{t.title}</h1>
          <p className="text-gray-400 mt-2 max-w-2xl">{t.subtitle}</p>
        </div>

        <div className="text-right">
          {user && (
            <p className="text-sm text-gray-400 mb-2">
              Connecté en tant que {user.email}
            </p>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition"
            >
              {t.logout}
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-5 py-2 rounded-full border border-blue-400 text-blue-300 hover:bg-blue-400 hover:text-black transition"
            >
              {t.login}
            </button>
          )}
        </div>
      </header>

      {/* MAIN CARDS */}
      <section className="flex flex-col lg:flex-row gap-12 justify-center items-center mt-24">
        {/* DUALITY */}
        <div className="w-full max-w-xl p-8 rounded-3xl border border-yellow-400 bg-gradient-to-br from-black to-yellow-900/10 shadow-[0_0_60px_rgba(255,215,0,0.15)]">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">
            {t.dualityTitle}
          </h2>
          <p className="text-gray-300 mb-8">{t.dualityDesc}</p>

          <button
            onClick={() => router.push('/duality')}
            className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:scale-105 transition"
          >
            {t.dualityBtn} →
          </button>
        </div>

        {/* SOULSET */}
        <div className="w-full max-w-xl p-8 rounded-3xl border border-cyan-400 bg-gradient-to-br from-black to-cyan-900/10 shadow-[0_0_60px_rgba(0,200,255,0.15)]">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">
            {t.soulsetTitle}
          </h2>
          <p className="text-gray-300 mb-8">{t.soulsetDesc}</p>

          <button
            onClick={() => router.push('/soulset')}
            className="px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:scale-105 transition"
          >
            {t.soulsetBtn} →
          </button>
        </div>
      </section>

      {/* MOOD */}
      {user && (
        <section className="mt-24 text-center">
          <button
            onClick={() => router.push('/mood')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold hover:scale-105 transition"
          >
            {t.moodBtn}
          </button>

          <div className="mt-12">
            <MoodDashboard userId={user.id} />
          </div>
        </section>
      )}
    </main>
  )
}
