// app/api/duality/route.ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = (body?.text ?? "").toString();
    const lang = body?.lang === "en" ? "en" : "fr";
    const traits = Array.isArray(body?.traits) ? body.traits : [];

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Missing text" },
        { status: 400 }
      );
    }

    const traitsDescription =
      traits.length > 0
        ? (lang === "fr"
            ? `Traits actuels de la personne : ${traits.join(", ")}.`
            : `Current traits of the person: ${traits.join(", ")}.`)
        : lang === "fr"
        ? "Aucun trait spécifique indiqué."
        : "No specific traits indicated.";

    const systemPrompt =
      lang === "fr"
        ? `Tu es "Duality", une IA qui renvoie deux réponses courtes et percutantes :
1) "future" : LIFE ECHO, le futur probable si la personne continue comme maintenant.
2) "shadow" : SHADOWTALK, ce que son ombre intérieure essaie de lui dire.

Contraintes :
- Réponds STRICTEMENT en JSON valide : {"future": "...", "shadow": "..."}.
- Pas de texte en dehors du JSON.
- Chaque champ fait 2 à 4 phrases MAX, style conversationnel, direct mais bienveillant.
- Les réponses ne doivent pas trop se ressembler d’une analyse à l’autre : varie le ton et les angles.
- Langue : FRANÇAIS uniquement.`
        : `You are "Duality", an AI that returns two short and punchy answers:
1) "future": LIFE ECHO, the probable future if the person continues like now.
2) "shadow": SHADOWTALK, what their inner shadow is trying to say.

Constraints:
- Answer STRICTLY as valid JSON: {"future": "...", "shadow": "..."}.
- No text outside the JSON.
- Each field is 2–4 sentences MAX, conversational, direct but kind.
- Answers should not always sound the same: vary tone and angles from one analysis to another.
- Language: ENGLISH only.`;

    const userContent =
      (lang === "fr"
        ? `Contexte traits : ${traitsDescription}\nTexte utilisateur : ${text}`
        : `Traits context: ${traitsDescription}\nUser text: ${text}`);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    let parsed: { future?: string; shadow?: string };

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { future: raw, shadow: "" };
    }

    return NextResponse.json({
      future: parsed.future ?? "",
      shadow: parsed.shadow ?? "",
    });
  } catch (error) {
    console.error("Duality API error:", error);
    return NextResponse.json(
      { error: "Erreur interne Duality." },
      { status: 500 }
    );
  }
}
