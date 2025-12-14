export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    // 🔐 Sécurité : on vérifie la clé ICI
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY missing" },
        { status: 500 }
      );
    }

    // ✅ Instanciation ICI (et seulement ici)
    const openai = new OpenAI({ apiKey });

    const body = await req.json();
    const { text, language } = body;

    const systemPrompt = {
      fr: "Tu es Duality, une conscience miroir introspective.",
      en: "You are Duality, an introspective mirror consciousness.",
      ar: "أنت Duality، وعي مرآوي تأملي عميق."
    }[language || "en"];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ]
    });

    return NextResponse.json({
      result: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("Duality API error:", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
