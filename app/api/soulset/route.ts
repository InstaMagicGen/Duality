// app/api/soulset/route.ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.warn("[SOULSET] Supabase désactivé : variables manquantes.");
    return null;
  }

  return createClient(url, serviceKey);
}

function safeString(v: unknown) {
  return typeof v === "string" ? v.slice(0, 5000) : "";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const rawText = safeString(body.text);
    const mood = Number.isFinite(body.mood) ? Number(body.mood) : 3;
    const lang = body.lang === "en" ? "en" : body.lang === "ar" ? "ar" : "fr";
    const clientId = safeString(body.clientId || "");

    if (!rawText.trim()) {
      return NextResponse.json(
        { error: "Missing 'text' in request body." },
        { status: 400 }
      );
    }

    const moodLabel =
      lang === "en"
        ? ["very low", "low", "neutral", "quite good", "very good"][
            Math.min(Math.max(mood - 1, 0), 4)
          ]
        : lang === "ar"
        ? ["منخفض جدًا", "منخفض", "محايد", "جيد نوعًا ما", "جيد جدًا"][
            Math.min(Math.max(mood - 1, 0), 4)
          ]
        : ["très bas", "bas", "neutre", "plutôt bien", "très bien"][
            Math.min(Math.max(mood - 1, 0), 4)
          ];

    const systemPromptFr = `Tu es "Soulset Navigator", un guide calme qui reflète l’état émotionnel de la personne en une phrase courte, comme une citation projetée sur un coucher de soleil.
Tu ne donnes PAS de conseils longs, juste une phrase ou deux qui captent l’essence de ce qu’elle vit.`;

    const systemPromptEn = `You are "Soulset Navigator", a calm guide that reflects the emotional state of the person in a short quote, as if written over a sunset.
You do NOT give long advice, only one or two sentences capturing the essence of what they are living.`;

    const systemPromptAr = `أنت "Soulset Navigator"، مرشد هادئ يعكس الحالة العاطفية للشخص في جملة قصيرة تشبه اقتباساً مكتوباً فوق غروب الشمس.
لا تعطي نصائح طويلة، فقط جملة أو جملتان تلخصان جوهر ما يمرّ به.`;

    const systemPrompt =
      lang === "en" ? systemPromptEn : lang === "ar" ? systemPromptAr : systemPromptFr;

    const userPrompt =
      lang === "en"
        ? `User summary of the moment:\n${rawText}\nMood just before the session: ${moodLabel} (1–5).\n\nReturn ONLY one or two short sentences, like an intimate quote addressed to "you".`
        : lang === "ar"
        ? `ملخص حالة الشخص الآن:\n${rawText}\nالمزاج قبل الجلسة: ${moodLabel} (1–5).\n\nأعد فقط جملة أو جملتين قصيرتين، كاقتباس شخصي موجّه بصيغة "أنت".`
        : `Résumé de ce que la personne vit :\n${rawText}\nHumeur juste avant la session : ${moodLabel} (1–5).\n\nRéponds UNIQUEMENT par une ou deux phrases très courtes, comme une citation intime, en la tutoyant.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.2-70b-preview",
      temperature: 0.9,
      max_tokens: 200,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const quote =
      completion.choices?.[0]?.message?.content?.toString().trim() || "";

    const payload = {
      quote: safeString(quote),
    };

    // ---------- SAUVEGARDE SUPABASE ----------
    try {
      const supabase = getSupabase();
      if (supabase) {
        const { error } = await supabase.from("soulset_sessions").insert({
          client_id: clientId || null,
          lang,
          mood,
          input_text: rawText,
          quote: payload.quote,
        });
        if (error) {
          console.error("[SOULSET] Erreur Supabase", error);
        }
      }
    } catch (err) {
      console.error("[SOULSET] Exception Supabase", err);
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (err: any) {
    console.error("[SOULSET] Erreur serveur", err);
    return NextResponse.json(
      { error: "Internal error (soulset)." },
      { status: 500 }
    );
  }
}
