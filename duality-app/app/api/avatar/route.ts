// app/api/avatar/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "fr" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing 'text' in body." },
        { status: 400 }
      );
    }

    const falKey = process.env.FAL_KEY;
    if (!falKey) {
      console.error("FAL_KEY manquant");
      return NextResponse.json(
        { error: "Server misconfigured (missing FAL_KEY)." },
        { status: 500 }
      );
    }

    const prompt =
      lang === "fr"
        ? `Portrait 3D stylisé qui symbolise l'état intérieur actuel de la personne.
Pas de visage réaliste précis, plutôt une silhouette ou un avatar symbolique.
Ambiance douce, légèrement mystique, fond sombre avec un halo de lumière.
Voici le texte qui décrit son état : """${text}""" .`
        : `Stylized 3D portrait symbolizing the user's current inner state.
No realistic specific face, more like an iconic avatar.
Soft, slightly mystical vibe, dark background with subtle glow.
User text: """${text}""" .`;

    const falRes = await fetch(
      "https://fal.run/api/v1.2/fal-ai/flux-1.1-pro",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key ${falKey}`,
        },
        body: JSON.stringify({
          input: {
            prompt,
            width: 768,
            height: 768,
            num_inference_steps: 24,
            guidance_scale: 3.5,
          },
        }),
      }
    );

    if (!falRes.ok) {
      const errText = await falRes.text();
      console.error("Fal error:", errText);
      return NextResponse.json(
        { error: "Avatar generation failed (Fal.ai)." },
        { status: 500 }
      );
    }

    const data: any = await falRes.json();

    // La plupart des endpoints Fal renvoient data.images[0].url
    const avatarUrl =
      data.images?.[0]?.url || data.image?.url || data.image_url || null;

    if (!avatarUrl) {
      console.error("Fal response without image url:", data);
      return NextResponse.json(
        { error: "No avatar URL in Fal.ai response." },
        { status: 500 }
      );
    }

    return NextResponse.json({ avatarUrl });
  } catch (err) {
    console.error("Avatar API error:", err);
    return NextResponse.json(
      { error: "Internal server error in /api/avatar." },
      { status: 500 }
    );
  }
}
