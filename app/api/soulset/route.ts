import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, lang } = await req.json();

  if (!text || text.length < 10) {
    return NextResponse.json({
      result:
        lang === "ar"
          ? "الرجاء كتابة نص أعمق للتحليل."
          : lang === "en"
          ? "Please write a deeper text for analysis."
          : "Merci d’écrire un texte plus profond pour l’analyse.",
    });
  }

  const analysis = {
    fr: `Analyse Soulset :

Ton texte révèle un état émotionnel dominé par une tension intérieure silencieuse.
Tu sembles en phase de transition, partagé entre lucidité et fatigue mentale.
Il existe une volonté de compréhension profonde, mais aussi une peur de l’immobilité.

Conseil :
Accorde-toi un moment de pause consciente. Ton esprit réclame de la clarté, pas de la pression.`,

    en: `Soulset Analysis:

Your text reveals a dominant inner emotional tension.
You appear to be in a transitional phase, between clarity and mental fatigue.
There is a strong desire for understanding, mixed with a fear of stagnation.

Advice:
Allow yourself conscious pauses. Your mind needs clarity, not pressure.`,

    ar: `تحليل Soulset:

نصك يكشف عن توتر داخلي عاطفي مسيطر.
يبدو أنك تمر بمرحلة انتقالية بين الوضوح والإرهاق الذهني.
هناك رغبة عميقة في الفهم، يقابلها خوف من الجمود.

نصيحة:
امنح نفسك لحظات وعي وهدوء. عقلك يحتاج إلى وضوح لا إلى ضغط.`,
  };

  return NextResponse.json({
    result: analysis[lang] || analysis.fr,
  });
}
