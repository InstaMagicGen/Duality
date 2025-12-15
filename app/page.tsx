'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Lang = 'fr' | 'en' | 'ar';

const translations: Record<Lang, any> = {
  en: {
    duality: {
      title: 'DUALITY · Probable Future',
      desc: 'Write what you live. Duality returns a LIFE ECHO and SHADOWTALK.',
      tags: 'LIFE ECHO · SHADOWTALK',
      btn: 'Go to Duality',
    },
    soulset: {
      title: 'SOULSET NAVIGATOR · Sunset Therapy',
      desc: 'Describe your current state and see a mirrored phrase on a soothing sunset.',
      tags: 'SCAN · SUNSET THERAPY',
      btn: 'Go to Soulset',
    },
    mood: 'See my mood tracking',
  },
  fr: {
    duality: {
      title: 'DUALITY · Futur probable',
      desc: 'Tu écris ce que tu vis. Duality renvoie un LIFE ECHO et SHADOWTALK.',
      tags: 'LIFE ECHO · SHADOWTALK',
      btn: 'Aller à Duality',
    },
    soulset: {
      title: 'SOULSET NAVIGATOR · Sunset Therapy',
      desc: 'Décris ton état du moment et laisse une phrase miroir sur un coucher de soleil.',
      tags: 'SCAN · SUNSET THERAPY',
      btn: 'Aller à Soulset',
    },
    mood: 'Voir mon suivi de mood',
  },
  ar: {
    duality: {
      title: 'دوالِتي · المستقبل المحتمل',
      desc: 'اكتب ما تعيشه. Duality تُرجع LIFE ECHO و SHADOWTALK.',
      tags: 'LIFE ECHO · SHADOWTALK',
      btn: 'اذهب إلى Duality',
    },
    soulset: {
      title: 'سولسِت نافيجيتور · Sunset Therapy',
      desc: 'صف حالتك الحالية واترك جملة قصيرة تنعكس على غروب هادئ.',
      tags: 'SCAN · SUNSET THERAPY',
      btn: 'اذهب إلى Soulset',
    },
    mood: 'عرض تتبع المزاج الخاص بي',
  },
};

export default function Page() {
  const [lang, setLang] = useState<Lang>('fr');
  const router = useRouter();
  const t = translations[lang];

  useEffect(() => {
    const l = navigator.language.toLowerCase();
    if (l.startsWith('fr')) setLang('fr');
    else if (l.startsWith('ar')) setLang('ar');
    else setLang('en');
  }, []);

  const user = null; // TODO: remplacer par supabase.auth.getUser().user si connecté

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-8">
      {/* CARTES */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {/* DUALITY */}
        <div className="w-72 md:w-80 p-5 border-2 border-yellow-400 glow-yellow rounded-2xl flex flex-col justify-between">
          <h2 className="text-yellow-400 font-bold text-lg mb-2">{t.duality.title}</h2>
          <p className="text-sm text-neutral-300 mb-3">{t.duality.desc}</p>
          <p className="text-xs text-neutral-400 mb-3">{t.duality.tags}</p>
          <button
            onClick={() => router.push('/duality')}
            className="w-full py-2 rounded-full bg-yellow-400 text-black font-semibold shadow-lg hover:brightness-110 transition"
          >
            {t.duality.btn}
          </button>
        </div>

        {/* SOULSET NAV */}
        <div className="w-72 md:w-80 p-5 border-2 border-cyan-400 glow-cyan rounded-2xl flex flex-col justify-between">
          <h2 className="text-cyan-400 font-bold text-lg mb-2">{t.soulset.title}</h2>
          <p className="text-sm text-neutral-300 mb-3">{t.soulset.desc}</p>
          <p className="text-xs text-neutral-400 mb-3">{t.soulset.tags}</p>
          <button
            onClick={() => router.push('/soulset')}
            className="w-full py-2 rounded-full bg-cyan-400 text-black font-semibold shadow-lg hover:brightness-110 transition"
          >
            {t.soulset.btn}
          </button>
        </div>
      </div>

      {/* BOUTON MOOD */}
      <div className="mt-12">
        <button
          onClick={() => {
            if (user) router.push('/mood');
            else router.push('/auth?mode=login');
          }}
          className="btn-mood"
        >
          {t.mood}
        </button>
      </div>
    </div>
  );
}
