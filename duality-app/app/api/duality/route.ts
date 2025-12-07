// app/api/duality/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // important pour Node (pas edge) si tu utilises fetch externe

const SYSTEM_PROMPT_FR = `
Tu es la voix intérieure de l'utilisateur.
Tu ne dis jamais que tu es une IA.
Tu renvoies deux blocs très courts (2 à 4 phrases chacun) :

1) LIFE ECHO : le futur probable si la personne continue comme maintenant.
2) SHADOWTALK : ce que son "ombre" essaie de lui dire (peurs, patterns, choses refoulées).

Style : direct mais bienveillant, comme une conscience lucide.
Pas de listes, pas de puces, pas de titres, juste du texte.
`;

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "fr", traits = [] } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing 'text' in body." },
        { status: 400 }
      );
    }

    const userLang = lang === "en" ? "en" : "fr";

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      console.error("GROQ_API_KEY manquant");
      return NextResponse.json(
        { error: "Server misconfigured (missing GROQ_API_KEY)." },
        { status: 500 }
      );
    }

    const promptTraits =
      traits && Array.isArray(traits) && traits.length
        ? `Traits de personnalité actuels : ${traits.join(", ")}.`
        : "";

    const userPrompt =
      userLang === "fr"
        ? `Texte de la personne : """${text}""".
${promptTraits}

Réponds d'abord avec le bloc LIFE ECHO (2 à 4 phrases).
Puis un séparateur clair : ---.
Puis le bloc SHADOWTALK (2 à 4 phrases).`
        : `User text: """${text}""".
${promptTraits}

First block: LIFE ECHO (2–4 sentences).
Then separator: ---.
Then second block: SHADOWTALK (2–4 sentences).`;

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-70b-versatile", // ou ton modèle Groq
          messages: [
            { role: "system", content: SYSTEM_PROMPT_FR },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.8,
          max_tokens: 400,
        }),
      }
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq error:", errText);
      return NextResponse.json(
        { error: "AI provider error (Groq)." },
        { status: 500 }
      );
    }

    const groqData: any = await groqRes.json();
    const full = groqData.choices?.[0]?.message?.content || "";

    const [futureRaw, shadowRaw] = full.split("---");
    const future = (futureRaw || "").trim();
    const shadow = (shadowRaw || "").trim();

    return NextResponse.json({ future, shadow });
  } catch (err) {
    console.error("Duality API error:", err);
    return NextResponse.json(
      { error: "Internal server error in /api/duality." },
      { status: 500 }
    );
  }
}
