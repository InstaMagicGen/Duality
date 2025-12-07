import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const FAL_KEY = process.env.FAL_KEY;

export async function POST(req: NextRequest) {
  try {
    const { text, lang, traits } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing text" },
        { status: 400 }
      );
    }

    const traitsLine =
      Array.isArray(traits) && traits.length
        ? (lang === "fr"
            ? `Traits actuels : ${traits.join(", ")}`
            : `Current traits: ${traits.join(", ")}`)
        : "";

    const system =
      lang === "fr"
        ? `Tu es la conscience intérieure de la personne.
Tu ne dis JAMAIS que tu es une IA.
Tu produis uniquement un JSON strict :
{"future":"...", "shadow":"..."}

- future : 2 à 4 phrases lucides, bienveillantes, comme si elle se parlait à elle-même du futur probable.
- shadow : 2 à 4 phrases honnêtes comme si son ombre lui parlait avec compassion.`
        : `You are the person's inner conscience.
You NEVER say you are an AI.
You output strict JSON:
{"future":"...", "shadow":"..."}

- future: 2–4 lucid and kind sentences as self-talk about the probable future.
- shadow: 2–4 honest sentences as the shadow speaking with compassion.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        { role: "system", content: system },
        { role: "user", content: `${traitsLine}\n\n${text}` },
      ],
      temperature: 0.95,
      max_tokens: 420,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";

    let future = "";
    let shadow = "";

    try {
      const parsed = JSON.parse(raw);
      future = String(parsed.future ?? "");
      shadow = String(parsed.shadow ?? "");
    } catch {
      future = raw;
      shadow =
        lang === "fr"
          ? "Ton ombre tente de te parler, mais le message est brouillé."
          : "Your shadow is trying to speak, but the message is blurred.";
    }

    // ===== AVATAR FAL =====
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
                (lang === "fr"
                  ? "Portrait 3D stylisé, avatar symbolique, énergie émotionnelle, lumière douce, centrée."
                  : "Stylized 3D symbolic avatar, emotional energy, soft light, centered."),
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
