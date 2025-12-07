import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const FAL_KEY = process.env.FAL_KEY;

// Client Groq seulement si la clé existe
const groq = GROQ_API_KEY ? new Groq({ apiKey: GROQ_API_KEY }) : null;

export async function POST(req: NextRequest) {
  try {
    const { text, lang, traits } = await req.json();

    const userLang: "fr" | "en" =
      (lang ?? "fr").toString().toLowerCase().startsWith("fr") ? "fr" : "en";

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing text" },
        { status: 400 }
      );
    }

    const traitsLine =
      Array.isArray(traits) && traits.length
        ? userLang === "fr"
          ? `Traits actuels : ${traits.join(", ")}.`
          : `Current traits: ${traits.join(", ")}.`
        : "";

    // 🔹 CAS 1 : Aucune clé GROQ → on renvoie un résultat "fallback" pour éviter l'erreur interne
    if (!groq) {
      const futureFallback =
        userLang === "fr"
          ? "Si tu continues comme maintenant, tu avances, mais sans vraiment écouter ce que ton corps et ton cœur essaient de te dire. Tu auras besoin de poser des limites plus claires pour ne pas t’épuiser."
          : "If you keep going like this, you’ll move forward but without really listening to what your body and heart are trying to say. You’ll need clearer boundaries to avoid burning out.";

      const shadowFallback =
        userLang === "fr"
          ? "Ton ombre te murmure que tu portes trop tout seul. Tu évites de demander de l’aide par peur de déranger, mais tu t’oublies au passage."
          : "Your shadow is whispering that you carry too much alone. You avoid asking for help because you’re afraid to bother others, but you’re forgetting yourself in the process.";

      return NextResponse.json({
        future: futureFallback,
        shadow: shadowFallback,
        avatarUrl: null,
      });
    }

    // 🔹 CAS 2 : Clé GROQ disponible → appel modèle
    const systemPrompt =
      userLang === "fr"
        ? `Tu es la conscience intérieure de la personne.
Tu ne dis JAMAIS que tu es une IA.
Tu produis STRICTEMENT un JSON de la forme :
{"future":"...", "shadow":"..."}

- "future" : 2 à 4 phrases lucides et bienveillantes, comme si la personne se parlait à elle-même de son futur probable si rien ne change.
- "shadow" : 2 à 4 phrases honnêtes où sa part d’ombre lui parle avec compassion (peurs, répétitions, auto-sabotage), sans la juger.`
        : `You are the person's inner conscience.
You NEVER say you are an AI.
You MUST output STRICT JSON:
{"future":"...", "shadow":"..."}

- "future": 2–4 lucid and kind sentences as if the person is talking to themselves about their probable future if nothing changes.
- "shadow": 2–4 honest sentences where their shadow speaks with compassion (fears, loops, self-sabotage), without judging them.`;

    const userMessage =
      `${traitsLine}\n\n` +
      (userLang === "fr"
        ? `Texte de la personne : """${text}"""`
        : `Person's text: """${text}"""`);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.95,
      max_tokens: 480,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";

    let future = "";
    let shadow = "";

    try {
      const parsed = JSON.parse(raw);
      future = String(parsed.future ?? "");
      shadow = String(parsed.shadow ?? "");
    } catch {
      // Si le modèle n’a pas respecté le JSON, on tombe sur un fallback.
      future =
        future ||
        (userLang === "fr"
          ? "Tu sens déjà ce qui ne te convient plus. Si tu continues comme avant, tu restes en terrain connu, mais tu t’éloignes un peu plus de ce qui te nourrit vraiment."
          : "You already feel what no longer fits. If you keep going the same way, you’ll stay in familiar land but move further from what truly nourishes you.");
      shadow =
        shadow ||
        (userLang === "fr"
          ? "Ton ombre voit que tu t’ignores souvent pour rester “sage” ou rassurant pour les autres. Elle te pousse à dire non, même si cela fait peur."
          : "Your shadow sees how often you ignore yourself to stay 'reasonable' or reassuring for others. It is pushing you to say no, even if it feels scary.");
    }

    // ===== AVATAR FAL (OPTIONNEL) =====
    let avatarUrl: string | null = null;

    if (FAL_KEY) {
      try {
        const falRes = await fetch("https://fal.run/fal-ai/flux-1.1-pro", {
          method: "POST",
          headers: {
            Authorization: `Key ${FAL_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: {
              prompt:
                (userLang === "fr"
                  ? "Portrait 3D stylisé, avatar symbolique, lumière douce, ambiance coucher de soleil, centré, énergie émotionnelle de la personne. "
                  : "Stylized 3D symbolic portrait, soft light, sunset mood, centered, showing the person's emotional energy. ") +
                traitsLine,
              width: 768,
              height: 768,
            },
          }),
        });

        const falJson = await falRes.json();
        avatarUrl =
          falJson.images?.[0]?.url ??
          falJson.image?.url ??
          falJson.output?.[0]?.url ??
          null;
      } catch (err) {
        console.error("Fal avatar error:", err);
        avatarUrl = null;
      }
    }

    return NextResponse.json({
      future,
      shadow,
      avatarUrl,
    });
  } catch (error) {
    console.error("Duality API error:", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
