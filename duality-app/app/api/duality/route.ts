// app/api/duality/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GROQ_MODEL = "llama-3.1-8b-instant"; // ou le modèle que tu utilises chez Groq

type DualityBody = {
  text: string;
  traits?: string[];
  lang?: "fr" | "en";
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("[DUALITY] GROQ_API_KEY manquante");
      return NextResponse.json(
        { error: "Serveur mal configuré : GROQ_API_KEY manquante." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as DualityBody;
    const { text, traits = [], lang = "fr" } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Texte manquant pour l'analyse." },
        { status: 400 }
      );
    }

    const langLabel = lang === "fr" ? "en français" : "in English";

    const systemPrompt = `
Tu es "Duality", la conscience intérieure de l'utilisateur.
Tu analyses son texte et tu renvoies STRICTEMENT un JSON de la forme :

{
  "future": "2 à 4 phrases sur la trajectoire probable, en mode miroir, ${langLabel}.",
  "shadow": "2 à 4 phrases sur ce que son ombre lui dit, ${langLabel}."
}

- Ne mets aucun texte autour du JSON.
- Pas de markdown, pas de commentaire, pas de texte avant ou après.
- Tu parles ${langLabel}.
    `.trim();

    const traitsText = traits.length ? traits.join(", ") : "aucun trait précisé";

    const userPrompt = `
Texte de l'utilisateur :
"""${text}"""

Traits de personnalité actifs :
${traitsText}
    `.trim();

    const resp = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
        }),
      }
    );

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error(
        "[DUALITY] Erreur Groq HTTP",
        resp.status,
        resp.statusText,
        errorText
      );
      return NextResponse.json(
        { error: "Erreur Groq (voir logs serveur)." },
        { status: 500 }
      );
    }

    const data = await resp.json();

    const rawContent: string =
      data?.choices?.[0]?.message?.content?.trim() || "";

    let parsed: { future?: string; shadow?: string } = {};

    try {
      parsed = JSON.parse(rawContent);
    } catch (e) {
      console.error(
        "[DUALITY] Impossible de parser le JSON renvoyé par Groq :",
        rawContent
      );
      return NextResponse.json(
        {
          error:
            "Réponse du modèle incorrecte (JSON invalide). Vérifie les logs.",
        },
        { status: 500 }
      );
    }

    const future = parsed.future || "";
    const shadow = parsed.shadow || "";

    return NextResponse.json({
      future,
      shadow,
      // avatarUrl sera géré par une autre route (fal.ai)
      avatarUrl: null,
    });
  } catch (err) {
    console.error("[DUALITY] Erreur serveur globale :", err);
    return NextResponse.json(
      { error: "Erreur interne du serveur (Duality)." },
      { status: 500 }
    );
  }
}
