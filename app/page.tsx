'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

type Lang = 'en' | 'fr' | 'ar';

const translations: Record<Lang, any> = {
  en: {
    duality: { title: 'DUALITY · Futur probable', desc: 'Tu écris ce que tu vis, Duality renvoie un LIFE ECHO et un SHADOWTALK.', tags: 'LIFE ECHO · SHADOWTALK' },
    soulset: { title: 'SOULSET NAVIGATOR · Sunset Therapy', desc: 'Décris ton état du moment, puis laisse une phrase miroir se projeter sur un coucher de soleil apaisant.', tags: 'SCAN · SUNSET THERAPY' },
  },
  fr: {
    duality: { title: 'DUALITY · Futur probable', desc: 'Tu écris ce que tu vis, Duality renvoie un LIFE ECHO et un SHADOWTALK.', tags: 'LIFE ECHO · SHADOWTALK' },
    soulset: { title: 'SOULSET NAVIGATOR · Sunset Therapy', desc: 'Décris ton état du moment, puis laisse une phrase miroir se projeter sur un coucher de soleil apaisant.', tags: 'SCAN · SUNSET THERAPY' },
  },
  ar: {
    duality: { title: 'دوالِتي · المستقبل المحتمل', desc: 'اكتب ما تعيشه، Duality يُعيد LIFE ECHO و SHADOWTALK.', tags: 'LIFE ECHO · SHADOWTALK' },
    soulset: { title: 'سولسِت نافيجيتور · علاج الغروب', desc: 'صف حالتك الحالية، ثم اترك عبارة قصيرة تعكس شعورك على غروب الشمس.', tags: 'SCAN · SUNSET THERAPY' },
  },
};

export default function Page() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const systemLang = navigator.language.toLowerCase();
    if (systemLang.startsWith('fr')) setLang('fr');
    else if (systemLang.startsWith('ar')) setLang('ar');
    else setLang('en');
  }, []);

  const t = translations[lang];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
      <section className="flex flex-col sm:flex-row gap-8 mt-16">
        {/* Duality Box */}
        <div className="bg-black border border-yellow-400 glow-yellow p-6 rounded-xl max-w-xs text-center">
          <h2 className="text-yellow-400 font-bold text-xl mb-2">{t.duality.title}</h2>
          <p className="text-gray-200 mb-4">{t.duality.desc}</p>
          <p className="text-yellow-200 text-sm mb-4">{t.duality.tags}</p>
          <button
            onClick={() => router.push('/duality')}
            className="btn btn-duality flex items-center justify-center mx-auto gap-2"
          >
            Go <ArrowRight size={16} />
          </button>
        </div>

        {/* Soulset Navigator Box */}
        <div className="bg-black border border-cyan-400 glow-cyan p-6 rounded-xl max-w-xs text-center">
          <h2 className="text-cyan-400 font-bold text-xl mb-2">{t.soulset.title}</h2>
          <p className="text-gray-200 mb-4">{t.soulset.desc}</p>
          <p className="text-cyan-200 text-sm mb-4">{t.soulset.tags}</p>
          <button
            onClick={() => router.push('/soulset')}
            className="btn btn-soulset flex items-center justify-center mx-auto gap-2"
          >
            Go <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
