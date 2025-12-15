"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "en" | "fr" | "ar";

const translations: Record<Lang, any> = {
  en: {
    duality: { title: "DUALITY · Futur probable", desc: "Tu écris ce que tu vis, Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (ta conscience profonde)." },
    soulset: { title: "SOULSET NAVIGATOR · Sunset Therapy", desc: "Décris ton état du moment, puis laisse une phrase miroir courte se projeter sur un coucher de soleil apaisant." },
  },
  fr: {
    duality: { title: "DUALITY · Futur probable", desc: "Tu écris ce que tu vis, Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (ta conscience profonde)." },
    soulset: { title: "SOULSET NAVIGATOR · Sunset Therapy", desc: "Décris ton état du moment, puis laisse une phrase miroir courte se projeter sur un coucher de soleil apaisant." },
  },
  ar: {
    duality: { title: "دوالِتي · المستقبل المحتمل", desc: "اكتب ما تعيشه، Duality تعكس LIFE ECHO (المستقبل المحتمل) و SHADOWTALK (وعيك العميق)." },
    soulset: { title: "سولسِت نافيجيتور · Sunset Therapy", desc: "صف حالتك الحالية، ثم دع جملة قصيرة تعكس حالتك على غروب الشمس." },
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("fr");
  const router = useRouter();

  useEffect(() => {
    const l = window.navigator.language.toLowerCase();
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  const t = translations[lang];

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-12 max-w-5xl mx-auto">
      <div className="flex gap-6 w-full justify-center">
        {/* DUALITY */}
        <div className="flex-1 border border-yellow-400 rounded-2xl p-6 bg-black glow-yellow max-w-sm">
          <h2 className="text-xl font-bold text-yellow-300 mb-2">{t.duality.title}</h2>
          <p className="text-subtle mb-4">{t.duality.desc}</p>
          <button
            className="btn-auth btn-gold w-full flex justify-center gap-2"
            onClick={() => router.push("/duality")}
          >
            {t.duality.title} ➔
          </button>
        </div>

        {/* SOULSET NAVIGATOR */}
        <div className="flex-1 border border-cyan-400 rounded-2xl p-6 bg-black glow-cyan max-w-sm">
          <h2 className="text-xl font-bold text-cyan-300 mb-2">{t.soulset.title}</h2>
          <p className="text-subtle mb-4">{t.soulset.desc}</p>
          <button
            className="btn-auth btn-blue w-full flex justify-center gap-2"
            onClick={() => router.push("/soulset")}
          >
            {t.soulset.title} ➔
          </button>
        </div>
      </div>

      {/* Bouton Mood - uniquement après connexion */}
      <button
        className="btn-mood mt-12"
        onClick={() => router.push("/auth")}
      >
        Voir mon suivi de mood
      </button>
    </div>
  );
}
