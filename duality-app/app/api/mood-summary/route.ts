// app/api/mood-summary/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.warn("[MOOD] Supabase désactivé : variables manquantes.");
    return null;
  }

  return createClient(url, serviceKey);
}

function safeString(v: unknown) {
  return typeof v === "string" ? v.slice(0, 255) : "";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const clientId = safeString(body.clientId);

    if (!clientId) {
      return NextResponse.json(
        { error: "Missing clientId" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    // On récupère les 30 dernières sessions Soulset de cet utilisateur
    const { data, error } = await supabase
      .from("soulset_sessions")
      .select("created_at, mood")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      console.error("[MOOD] Erreur Supabase", error);
      return NextResponse.json(
        { error: "Supabase query error" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { hasData: false, points: [] },
        { status: 200 }
      );
    }

    // Calculs simples
    const points = data
      .slice()
      .reverse()
      .map((row) => ({
        date: row.created_at,
        mood: row.mood ?? 3,
      }));

    const last = points[points.length - 1];
    const first = points[0];

    const avgMood =
      points.reduce((sum, p) => sum + (p.mood ?? 3), 0) / points.length;

    const trend =
      last.mood > first.mood
        ? "up"
        : last.mood < first.mood
        ? "down"
        : "stable";

    return NextResponse.json(
      {
        hasData: true,
        points,
        lastMood: last.mood,
        averageMood: avgMood,
        trend,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[MOOD] Erreur serveur", err);
    return NextResponse.json(
      { error: "Internal error (mood-summary)." },
      { status: 500 }
    );
  }
}
