import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

export const runtime = "nodejs";

fal.config({
  credentials: process.env.FAL_KEY!, // clé FAL depuis .env.local
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await fal.subscribe("fal-ai/flux-2-flex", {
      input: {
        prompt,
      },
      logs: false,
    });

    const imageUrl = result?.data?.images?.[0]?.url || null;

    return NextResponse.json({ avatarUrl: imageUrl });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Erreur génération avatar" },
      { status: 500 }
    );
  }
}
