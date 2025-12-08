// app/api/duality/route.ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// --- Groq client (texte) ---
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// --- Supabase (serveur uniquement) ---
function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.warn("[DUALITY] Supabase désactivé : variables manquantes.");
    return null;
  }

  return createClient(url, serviceKey);
}

// Petit helper de sécurité
function safeString(v: unknown) {
  return typeof v === "string" ? v.slice(0, 5000) : "";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const rawText = safeString(body.text);
    const lang = body.lang === "en" ? "en" : body.lang === "ar" ? "ar" : "fr";
    const traits = Array.isArray(body.traits) ? body.traits.slice(0, 5) : [];
    const clientId = safeString(body.clientId || "");

    if (!rawText.trim()) {
      return NextResponse.json(
        { error: "Missing 'text' in request body." },
        { status: 400 }
      );
    }

    // --------- PROMPTS GROQ ----------
    const systemPromptFr = `Tu es "Duality", la voix intérieure d'une personne.
Tu réponds comme sa propre conscience lucide, pas comme une IA.

Tu dois produire deux blocs très courts (2 à 4 phrases chacun) :
1) LIFE ECHO : futur probable si la personne continue sur la même trajectoire.
2) SHADOWTALK : ce que son "ombre" ou inconscient essaie de lui dire.

Style :
- ton humain, simple, bienveillant
- pas de listes, pas de puces, juste un texte fluide
- tutoie la personne
- pas de phrases génériques, ancre-toi dans ce qu'elle vit vraiment.`;

    const systemPromptEn = `You are "Duality", someone's inner voice.
You answer as their lucid conscience, not as an AI.

You must produce two very short blocks (2–4 sentences each):
1) LIFE ECHO: most probable future if they keep the same trajectory.
2) SHADOWTALK: what their "shadow" or unconscious is trying to say.

Style:
- human, simple, caring tone
- no bullet points, just flowing text
- talk to them directly in "you"
- be specific to what they are experiencing, not generic advice.`;

    const systemPromptAr = `أنت "Duality"، صوت وعي الشخص الداخلي.
تجيب كأنك ضميره الواضح وليس ذكاءً اصطناعياً.

عليك إنتاج فقرتين قصيرتين (2 إلى 4 جمل لكل منهما):
1) LIFE ECHO: المستقبل المرجَّح إذا استمر بنفس المسار.
2) SHADOWTALK: ما تحاول "ظلاله" أو لاوعيه أن تخبره به.

الأسلوب:
- نبرة إنسانية، بسيطة، لطيفة
- دون نقاط تعداد، فقط نص متّصل
- خاطبه مباشرة بصيغة "أنت"
- كن محدّدًا قدر الإمكان بحسب ما يعيشه الآن.`;

    const systemPrompt =
      lang === "en" ? systemPromptEn : lang === "ar" ? systemPromptAr : systemPromptFr;

    const traitsText =
      traits.length > 0 ? `Traits / état du moment : ${traits.join(", ")}.` : "";

    const userPrompt =
      lang === "en"
        ? `User text:\n${rawText}\n\n${traitsText}\n\nReturn JSON strictly in this format:\n{"future": "...", "shadow": "..."}.`
        : lang === "ar"
        ? `نص المستخدم:\n${rawText}\n\n${traitsText}\n\nأعد الإجابة بصيغة JSON فقط بالشكل التالي:\n{"future": "...", "shadow": "..."}.`
        : `Texte de la personne :\n${rawText}\n\n${traitsText}\n\nRéponds uniquement au format JSON :\n{"future": "...", "shadow": "..."}.`;

    // --------- APPEL GROQ ----------
    const completion = await groq.chat.completions.create({
      model: "llama-3.2-70b-preview", // modèle supporté (2025)
      temperature: 0.8,
      max_tokens: 600,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const rawAnswer =
      completion.choices?.[0]?.message?.content?.toString().trim() || "";

    let future = "";
    let shadow = "";

    try {
      // Essaye de parser du JSON propre
      const parsed = JSON.parse(rawAnswer);
      future = safeString(parsed.future);
      shadow = safeString(parsed.shadow);
    } catch {
      // fallback si le modèle ne renvoie pas du JSON pur
      const parts = rawAnswer.split(/SHADOWTALK[:\-]/i);
      if (parts.length === 2) {
        future = safeString(parts[0].replace(/LIFE ECHO[:\-]/i, "").trim());
        shadow = safeString(parts[1].trim());
      } else {
        future = rawAnswer.slice(0, 4000);
        shadow = "";
      }
    }

    const payload = {
      future,
      shadow,
    };

    // --------- SAUVEGARDE SUPABASE ----------
    try {
      const supabase = getSupabase();
      if (supabase) {
        const { error } = await supabase.from("duality_sessions").insert({
          client_id: clientId || null,
          lang,
          traits,
          input_text: rawText,
          future,
          shadow,
        });
        if (error) {
          console.error("[DUALITY] Erreur Supabase", error);
        }
      }
    } catch (err) {
      console.error("[DUALITY] Exception Supabase", err);
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (err: any) {
    console.error("[DUALITY] Erreur serveur", err);
    return NextResponse.json(
      { error: "Internal error (duality)." },
      { status: 500 }
    );
  }
}
