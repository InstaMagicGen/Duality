// app/api/avatar/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "fr" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const FAL_KEY = process.env.FAL_KEY;

    if (!FAL_KEY) {
      return NextResponse.json(
        { error: "FAL_KEY missing" },
        { status: 500 }
      );
    }

    const prompt =
      lang === "fr"
        ? `Portrait 3D artistique symbolisant l’état intérieur de la personne. Lumière douce, ambiance mystique. Texte source: ${text}`
        : `3D artistic portrait symbolizing the inner state of the person. Soft light, mystical mood. Source text: ${text}`;

    const response = await fetch(
      "https://fal.run/api/v1.2/fal-ai/flux-1.1-pro",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${FAL_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            prompt,
            width: 768,
            height: 768,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Fal error:", err);
      return NextResponse.json(
        { error: "Fal generation failed" },
        { status: 500 }
      );
    }

    const data: any = await response.json();

    const avatarUrl =
      data?.images?.[0]?.url ||
      data?.image?.url ||
      data?.output?.[0]?.url ||
      null;

    if (!avatarUrl) {
      return NextResponse.json(
        { error: "No image from Fal" },
        { status: 500 }
      );
    }

    return NextResponse.json({ avatarUrl });
  } catch (e) {
    console.error("Avatar fatal error:", e);
    return NextResponse.json(
      { error: "Internal avatar error" },
      { status: 500 }
    );
  }
}
