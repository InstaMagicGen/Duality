// app/api/soulset/route.ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text, lang } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing text" },
        { status: 400 }
      );
    }

    const system =
      lang === "fr"
        ? "Tu es la voix intérieure calme de l'utilisateur. Tu réponds par une seule courte citation (1 à 2 phrases max), comme un mantra pour regarder le coucher de soleil. Tu ne te présentes jamais comme une IA."
        : "You are the user's calm inner voice. You answer with one short quote (1–2 sentences max), like a mantra to watch the sunset. Never present yourself as an AI.";

    const userPrompt =
      (lang === "fr"
        ? "Texte de la personne : "
        : "Person text: ") + `"${text}"`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        { role: "system", content: system },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 180,
    });

    const quote =
      completion.choices[0]?.message?.content?.trim() ??
      (lang === "fr"
        ? "Respire. Tu as le droit de ralentir aujourd’hui."
        : "Breathe. You are allowed to slow down today.");

    return NextResponse.json({ quote });
  } catch (err) {
    console.error("Soulset API error:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
