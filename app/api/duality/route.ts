import { NextResponse } from "next/server";

type Language = "fr" | "en" | "ar";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const text: string = body.text;
    const language: Language = body.language ?? "fr";

    const systemPrompt: Record<Language, string> = {
      fr: "Tu es Duality, une conscience miroir introspective.",
      en: "You are Duality, an introspective mirror consciousness.",
      ar: "أنت Duality، وعي مرآوي تأملي عميق."
    };

    const prompt = `
${systemPrompt[language]}

Analyse introspective profonde du texte suivant :
"${text}"
`;

    // ⚠️ Exemple de réponse mock (à remplacer par OpenAI si besoin)
    return NextResponse.json({
      success: true,
      language,
      analysis: prompt
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
