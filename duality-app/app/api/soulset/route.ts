// app/api/soulset/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SUNSET_VIDEOS = [
  "/sunset/Sunset-1V.mp4",
  "/sunset/Sunset-2V.mp4",
  "/sunset/Sunset-3V.mp4",
  "/sunset/Sunset-4V.mp4",
];

const SYSTEM_PROMPT_SOULSET = `
Tu es une voix de guidance très courte, comme une phrase de thérapeute + poète.
Tu réponds par UNE SEULE PHRASE (max 2), sous forme de "quote" inspirante mais ancrée.
Tu t'adresses à la deuxième personne ("tu").
Pas de smileys, pas de hashtags.
`;

export async function POST(req: NextRequest) {
  try {
    const { text, mood = 3, lang = "fr" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing 'text' in body." },
        { status: 400 }
      );
    }

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      console.error("GROQ_API_KEY manquant pour Soulset");
      return NextResponse.json(
        { error: "Server misconfigured (missing GROQ_API_KEY)." },
        { status: 500 }
      );
    }

    const userMoodText =
      lang === "fr"
        ? `Niveau ressenti de la personne (1 très bas, 5 très bien) : ${mood}.`
        : `User feeling level (1 very low, 5 very good): ${mood}.`;

    const userPrompt =
      lang === "fr"
        ? `Résumé de la personne : """${text}""".
${userMoodText}
Renvoie une seule phrase miroir qui pourrait l'aider à se recentrer.`
        : `User summary: """${text}""".
${userMoodText}
Return one short mirror sentence that might help them recentre.`;

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT_SOULSET },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 120,
        }),
      }
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq Soulset error:", errText);
      return NextResponse.json(
        { error: "AI provider error (Groq) in Soulset." },
        { status: 500 }
      );
    }

    const data: any = await groqRes.json();
    const quote =
      data.choices?.[0]?.message?.content?.trim() ||
      (lang === "fr"
        ? "Même au milieu du chaos, tu restes capable de choisir le prochain pas."
        : "Even in the middle of chaos, you can still choose your next step.");

    const video =
      SUNSET_VIDEOS[Math.floor(Math.random() * SUNSET_VIDEOS.length)];

    return NextResponse.json({ quote, video });
  } catch (err) {
    console.error("Soulset API error:", err);
    return NextResponse.json(
      { error: "Internal server error in /api/soulset." },
      { status: 500 }
    );
  }
}
