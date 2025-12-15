'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

type Lang = 'en' | 'fr' | 'ar';

const translations: Record<Lang, any> = {
  en: {
    duality: {
      title: 'DUALITY · Futur probable',
      desc: 'Tu écris ce que tu vis, Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (ta conscience profonde).',
      tags: 'LIFE ECHO · SHADOWTALK'
    },
    soulset: {
      title: 'SOULSET NAVIGATOR · Sunset Therapy',
      desc: 'Décris ton état du moment, puis laisse une phrase miroir courte se projeter sur un coucher de soleil apaisant.',
      tags: 'SCAN · SUNSET THERAPY'
    },
    footerBtn: 'Voir mon suivi de mood'
  },
  fr: {
    duality: {
      title: 'DUALITY · Futur probable',
      desc: 'Tu écris ce que tu vis, Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (ta conscience profonde).',
      tags: 'LIFE ECHO · SHADOWTALK'
    },
    soulset: {
      title: 'SOULSET NAVIGATOR · Sunset Therapy',
      desc: 'Décris ton état du moment, puis laisse une phrase miroir courte se projeter sur un coucher de soleil apaisant.',
      tags: 'SCAN · SUNSET THERAPY'
    },
    footerBtn: 'Voir mon suivi de mood'
  },
  ar: {
    duality: {
      title: 'دوالِتي · المستقبل المحتمل',
      desc: 'اكتب ما تعيشه، Duality تعكس LIFE ECHO (المستقبل المحتمل) وSHADOWTALK (وعيك العميق).',
      tags: 'LIFE ECHO · SHADOWTALK'
    },
    soulset: {
      title: 'سولسِت نافيجيتور · Sunset Therapy',
      desc: 'صف حالتك الحالية، ثم دع جملة قصيرة تنعكس على غروب الشمس المريح.',
      tags: 'SCAN · SUNSET THERAPY'
    },
    footerBtn: 'عرض تتبع مزاجي'
  }
};

export default function Page() {
  const [lang, setLang] = useState<Lang>('en');
  const router = useRouter();
  const t = translations[lang];

  useEffect(() => {
    const systemLang = navigator.language.toLowerCase();
    if (systemLang.startsWith('fr')) setLang('fr');
    else if (systemLang.startsWith('ar')) setLang('ar');
    else setLang('en');
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12 px-4 sm:px-6">
      {/* Boxes container */}
      <div className="flex flex-row gap-8 justify-center items-start flex-wrap">
        {/* DUALITY */}
        <div className="app-card glow-yellow border border-yellow-500">
          <h2 className="text-yellow-400 text-xl font-bold mb-2">{t.duality.title}</h2>
          <p className="text-gray-300 mb-4">{t.duality.desc}</p>
          <p className="text-sm text-yellow-200 mb-4">{t.duality.tags}</p>
          <button
            className="app-btn bg-yellow-400 text-black"
            onClick={() => router.push('/duality')}
          >
            {t.duality.title} <ArrowRight size={18} />
          </button>
        </div>

        {/* SOULSET NAVIGATOR */}
        <div className="app-card glow-cyan border border-cyan-400">
          <h2 className="text-cyan-400 text-xl font-bold mb-2">{t.soulset.title}</h2>
          <p className="text-gray-300 mb-4">{t.soulset.desc}</p>
          <p className="text-sm text-cyan-200 mb-4">{t.soulset.tags}</p>
          <button
            className="app-btn bg-cyan-400 text-black"
            onClick={() => router.push('/soulset')}
          >
            {t.soulset.title} <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Footer Button */}
      <button className="footer-btn mt-12">{t.footerBtn}</button>
    </main>
  );
}
