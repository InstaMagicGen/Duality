'use client'

import { useEffect, useState } from 'react'

type Lang = 'fr' | 'en' | 'ar'
type MoodLevel = 1 | 2 | 3 | 4 | 5

type MoodLog = {
  date: string
  level: MoodLevel
  note: string
}

const translations: Record<Lang, any> = {
  fr: {
    title: 'Duality',
    subtitle: 'Exploration intérieure & clarté mentale',
    connect: 'Créer une connexion',
    navSoulset: 'Soulset',
    navDuality: 'Duality',
    moodTitle: 'Suivi de ton humeur',
    note: 'Note',
    save: 'Enregistrer',
  },
  en: {
    title: 'Duality',
    subtitle: 'Inner exploration & mental clarity',
    connect: 'Create connection',
    navSoulset: 'Soulset',
    navDuality: 'Duality',
    moodTitle: 'Mood tracking',
    note: 'Note',
    save: 'Save',
  },
  ar: {
    title: 'Duality',
    subtitle: 'الاستكشاف الداخلي والوضوح الذهني',
    connect: 'إنشاء اتصال',
    navSoulset: 'سولسِت',
    navDuality: 'ديوليتي',
    moodTitle: 'متابعة المزاج',
    note: 'ملاحظة',
    save: 'حفظ',
  },
}

function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'en'
  const l = navigator.language
  if (l.startsWith('fr')) return 'fr'
  if (l.startsWith('ar')) return 'ar'
  return 'en'
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('en')
  const [connected, setConnected] = useState(false)
  const [logs, setLogs] = useState<MoodLog[]>([])
  const [level, setLevel] = useState<MoodLevel>(3)
  const [note, setNote] = useState('')

  const t = translations[lang]

  useEffect(() => {
    setLang(detectLang())
  }, [])

  const saveMood = () => {
    setLogs([
      ...logs,
      {
        date: new Date().toISOString(),
        level,
        note,
      },
    ])
    setNote('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white px-6 py-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">{t.title}</h1>
        {!connected && (
          <button
            onClick={() => setConnected(true)}
            className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            {t.connect}
          </button>
        )}
      </header>

      {/* Center buttons */}
      {!connected && (
        <section className="flex flex-col items-center justify-center h-[70vh] gap-6">
          <h2 className="text-3xl font-light text-center">{t.subtitle}</h2>

          <div className="flex gap-6">
            <button className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 hover:scale-110 transition shadow-lg">
              {t.navSoulset}
            </button>
            <button className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 hover:scale-110 transition shadow-lg">
              {t.navDuality}
            </button>
          </div>
        </section>
      )}

      {/* Mood dashboard */}
      {connected && (
        <section className="max-w-xl mx-auto mt-16">
          <h2 className="text-2xl mb-6">{t.moodTitle}</h2>

          <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl space-y-4">
            <input
              type="range"
              min={1}
              max={5}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value) as MoodLevel)}
              className="w-full"
            />

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.note}
              className="w-full p-3 rounded-xl bg-black border border-zinc-700"
            />

            <button
              onClick={saveMood}
              className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
            >
              {t.save}
            </button>
          </div>

          <div className="mt-6 space-y-2">
            {logs.map((l, i) => (
              <div
                key={i}
                className="text-sm bg-zinc-800 p-3 rounded-xl"
              >
                {new Date(l.date).toLocaleString()} — Mood {l.level} — {l.note}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
