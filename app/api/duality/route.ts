import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, lang } = await req.json();

  const analysis = {
    fr: `Analyse Duality :

Ton message montre un écart clair entre ce que tu montres et ce que tu ressens.
Tu contrôles ton image, mais cela te coûte de l’énergie émotionnelle.
Cette dualité n’est pas négative : elle indique une conscience élevée.

Clé :
Aligner progressivement ton expression avec ta vérité intérieure.`,

    en: `Duality Analysis:

Your message shows a clear gap between what you show and what you feel.
You control your image, but it drains emotional energy.
This duality is not negative — it signals high self-awareness.

Key:
Gradually align your expression with your inner truth.`,

    ar: `تحليل Duality:

رسالتك تكشف فجوة واضحة بين ما تظهره وما تشعر به.
أنت تتحكم في صورتك، لكن ذلك يستهلك طاقتك العاطفية.
هذه الازدواجية ليست سلبية، بل تدل على وعي مرتفع.

المفتاح:
محاولة مواءمة تعبيرك الخارجي مع حقيقتك الداخلية.`,
  };

  return NextResponse.json({
    result: analysis[lang] || analysis.fr,
  });
}
