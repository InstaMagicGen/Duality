'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

type Lang = 'en' | 'fr' | 'ar';

const translations: Record<Lang, any> = {
  en: {
    duality: {
      title: 'DUALITY · Probable Future',
      desc: 'You write what you live; Duality returns a LIFE ECHO and a SHADOWTALK.',
      tags: 'LIFE ECHO · SHADOWTALK',
      button: 'Enter Duality',
    },
    soulset: {
      title: 'SOULSET NAVIGATOR · Sunset Therapy',
      desc: 'Describe your current state and let a short mirror phrase project onto a calming sunset.',
      tags: 'SCAN · SUNSET THERAPY',
      button: 'Enter Soulset',
    },
    mood: 'View my mood tracking',
    loginRedirect: 'Login / Create Account to View Mood',
  },
  fr: {
    duality: {
      title: 'DUALITY · Futur probable',
      desc: 'Tu écris ce que tu vis ; Duality renvoie un LIFE ECHO et un SHADOWTALK.',
      tags: 'LIFE ECHO · SHADOWTALK',
      button: 'Accéder à Duality',
    },
    soulset: {
      title: 'SOULSET NAVIGATOR · Sunset Therapy',
      desc: 'Décris ton état du moment et laisse une courte phrase miroir se projeter.',
      tags: 'SCAN · SUNSET THERAPY',
      button: 'Accéder à Soulset',
    },
    mood: 'Voir mon suivi de mood',
    loginRedirect: 'Connecte-toi pour voir le suivi',
  },
  ar: {
    duality: {
      title: 'دوالِتي · المستقبل المحتمل',
      desc: 'أنت تكتب ما تعيشه؛ Duality تعكس LIFE ECHO وSHADOWTALK.',
      tags: 'LIFE ECHO · SHADOWTALK',
      button: 'الدخول إلى دوالِتي',
    },
    soulset: {
      title: 'سولسِت نافيجيتور · Sunset Therapy',
      desc: 'صف حالتك الحالية، ثم دع عبارة قصيرة تنعكس على غروب هادئ.',
      tags: 'SCAN · SUNSET THERAPY',
      button: 'الدخول إلى سولسِت',
    },
    mood: 'عرض تتبع المزاج',
    loginRedirect: 'سجل الدخول لعرض التتبع',
  },
};

export default function Page() {
  const [lang, setLang] = useState<Lang>('en');
  const router = useRouter();

  // Simule état de connexion
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const systemLang = navigator.language.toLowerCase();
    if (systemLang.startsWith('fr')) setLang('fr');
    else if (systemLang.startsWith('ar')) setLang('ar');
    else setLang('en');
  }, []);

  const t = translations[lang];

  const handleMoodClick = () => {
    if (!isLoggedIn) router.push('/login'); 
    else router.push('/mood-tracking'); 
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12 px-4 sm:px-6">
      <div className="flex flex-row gap-8 justify-center flex-wrap">
        {/* Duality */}
        <div className="app-card duality-card glow-yellow">
          <h2 className="text-yellow-400 text-xl font-bold mb-2">
            {t.duality.title}
          </h2>
          <p className="text-gray-200 mb-4">{t.duality.desc}</p>
          <p className="text-sm text-yellow-200 mb-4">{t.duality.tags}</p>
          <button
            onClick={() => router.push('/duality')}
            className="app-btn btn-duality"
          >
            {t.duality.button} <ArrowRight size={18} />
          </button>
        </div>

        {/* Soulset */}
        <div className="app-card soulset-card glow-cyan">
          <h2 className="text-cyan-400 text-xl font-bold mb-2">
            {t.soulset.title}
          </h2>
          <p className="text-gray-200 mb-4">{t.soulset.desc}</p>
          <p className="text-sm text-cyan-200 mb-4">{t.soulset.tags}</p>
          <button
            onClick={() => router.push('/soulset')}
            className="app-btn btn-soulset"
          >
            {t.soulset.button} <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Footer CTA — conditionnel */}
      <button className="footer-btn" onClick={handleMoodClick}>
        {!isLoggedIn ? t.loginRedirect : t.mood}
      </button>
    </main>
  );
}
