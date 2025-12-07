"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en";

type SoulsetResult = {
  quote: string;
  background: string;
};

const SUNSET_MEDIA = [
  "/sunset/Sunset-1V.mp4",
  "/sunset/Sunset-2V.mp4",
  "/sunset/Sunset-3V.mp4",
  "/sunset/Sunset-4V.mp4",
  "/sunset/sunset-1.jpeg",
  "/sunset/sunset-2.jpeg",
  "/sunset/sunset-3.jpeg",
  "/sunset/sunset-4.jpeg",
  "/sunset/sunset-5.jpeg",
  "/sunset/sunset-6.jpeg",
  "/sunset/Sunset-7.jpeg",
];

function detectLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const userLang = navigator.language?.toLowerCase() || "fr";
  return userLang.startsWith("fr") ? "fr" : "en";
}

// Génération locale d'une phrase miroir
function generateSoulsetQuote(text: string, lang: Lang): string {
  const t = text.toLowerCase();

  const isTired =
    t.includes("fatigu") ||
    t.includes("épuis") ||
    t.includes("tired") ||
    t.includes("exhaust");
  const isLost =
    t.includes("perdu") ||
    t.includes("lost") ||
    t.includes("sens") ||
    t.includes("meaning");
  const isOverwhelmed =
    t.includes("stress") ||
    t.includes("pression") ||
    t.includes("overwhelmed") ||
    t.includes("anxi");

  if (lang === "fr") {
    if (isTired)
      return "Tu as le droit de te reposer avant de prouver à nouveau que tu tiens le coup.";
    if (isLost)
      return "Tu n’es pas en retard, tu es simplement à l’endroit où ton ancienne vie et la nouvelle se croisent.";
    if (isOverwhelmed)
      return "Tu peux poser un poids à la fois sans devoir justifier ta fatigue.";
    return "Tu n’as pas besoin de tout comprendre pour avancer d’un demi-pas.";
  } else {
    if (isTired)
      return "You’re allowed to rest before proving once again that you can handle everything.";
    if (isLost)
      return "You’re not late, you’re simply standing where your old life and your new one intersect.";
    if (isOverwhelmed)
      return "You can put one weight down without having to justify your exhaustion.";
    return "You don’t need to understand everything to move half a step forward.";
  }
}

export default function SoulsetPage() {
  const router = useRouter();

  const [lang, setLang] = useState<Lang>("fr");
  const [text, setText] = useState("");
  const [mood, setMood] = useState<number | null>(null);
  const [result, setResult] = useState<SoulsetResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLang(detectLang());
  }, []);

  function pickRandomBackground() {
    return SUNSET_MEDIA[Math.floor(Math.random() * SUNSET_MEDIA.length)];
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!text.trim()) {
      setError(
        lang === "fr"
          ? "Décris d’abord ton état ou ta journée."
          : "Describe your state or your day first."
      );
      return;
    }

    setLoading(true);
    try {
      const quote = generateSoulsetQuote(text, lang);
      setResult({
        quote,
        background: pickRandomBackground(),
      });
    } finally {
      setLoading(false);
    }
  }

  const isFr = lang === "fr";

  // Vue résultat full-screen
  if (result) {
    const isVideo = result.background.toLowerCase().endsWith(".mp4");

    return (
      <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
        {isVideo ? (
          <video
            src={result.background}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={result.background}
            alt="Sunset"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/80" />

        <div className="relative z-10 flex flex-col h-full">
          <header className="flex items-center justify-between px-4 pt-4">
            <button
              onClick={() => setResult(null)}
              className="text-xs text-slate-200 hover:text-white inline-flex items-center gap-2 bg-black/35 px-3 py-1 rounded-full border border-slate-500/60 backdrop-blur"
            >
              <span className="inline-block h-4 w-4 rounded-full border border-slate-400 flex items-center justify-center text-[10px]">
                ←
              </span>
              {isFr ? "Revenir à la saisie" : "Back to input"}
            </button>
            <p className="text-[10px] uppercase tracking-[0.28em] text-sky-200 bg-black/35 px-3 py-1 rounded-full border border-sky-400/40 backdrop-blur">
              Soulset Navigator
            </p>
          </header>

          <div className="flex-1 flex items-center justify-center px-4 pb-12">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs text-sky-200/80 mb-3 uppercase tracking-[0.28em]">
                Sunset Therapy
              </p>
              <p className="text-2xl md:text-3xl font-medium text-slate-50 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] whitespace-pre-line leading-relaxed">
                {result.quote}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Vue formulaire
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 px-4 py-5">
      <header className="max-w-4xl mx-auto mb-6 flex items-center justify-between gap-4">
        <button
          onClick={() => router.push("/")}
          className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-2"
        >
          <span className="inline-block h-4 w-4 rounded-full border border-slate-500 flex items-center justify-center text-[10px]">
            ←
          </span>
          {isFr ? "Retour à l’accueil" : "Back to home"}
        </button>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.3em] text-sky-300">
            Soulset Navigator
          </p>
          <p className="text-xs text-sky-200/70">
            Sunset Therapy ·{" "}
            {isFr
              ? "phrase miroir + coucher de soleil"
              : "mirror sentence + sunset"}
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <section className="rounded-3xl border border-sky-400/35 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/35 px-6 py-6 md:px-7 md:py-7 shadow-[0_0_70px_rgba(56,189,248,0.25)] backdrop-blur-xl">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            {isFr ? "Scan ta journée" : "Scan your day"}
          </h1>
          <p className="text-sm text-slate-200 mb-4">
            {isFr
              ? "Décris ton état du moment comme si tu parlais à quelqu’un qui t’écoute vraiment. Une phrase miroir courte sera projetée sur un coucher de soleil."
              : "Describe how you feel as if you were talking to someone who truly listens. A short mirror sentence will be projected on a sunset."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-sky-100/80 mb-1">
              {isFr ? "Ton résumé du moment" : "Your current state"}
            </label>
            <textarea
              className="w-full h-32 md:h-40 rounded-2xl bg-black/40 border border-sky-500/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/80 placeholder:text-slate-400"
              placeholder={
                isFr
                  ? "Exemple : Journée chargée, beaucoup de pression et je me sens épuisé(e)..."
                  : "Example: Busy day, a lot of pressure and I feel exhausted..."
              }
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <p className="mt-2 mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/55">
              {isFr
                ? "Comment tu te sens juste avant la session ?"
                : "How do you feel right now?"}
            </p>

            <div className="mb-4 flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((level) => {
                const labelsFr: Record<number, string> = {
                  1: "Très bas",
                  2: "Bas",
                  3: "Neutre",
                  4: "Plutôt bien",
                  5: "Très bien",
                };
                const labelsEn: Record<number, string> = {
                  1: "Very low",
                  2: "Low",
                  3: "Neutral",
                  4: "Quite good",
                  5: "Very good",
                };
                const active = mood === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setMood(level)}
                    className={`flex h-16 w-full flex-col items-center justify-center rounded-full border text-[11px] font-medium transition ${
                      active
                        ? "border-sky-300 bg-white text-black shadow-lg shadow-sky-500/40"
                        : "border-white/15 bg-black/40 text-white/70 hover:border-sky-200/70 hover:bg-black/60"
                    }`}
                  >
                    <span className="text-[10px] leading-none opacity-80">
                      {level}
                    </span>
                    <span className="mt-1 leading-tight">
                      {isFr ? labelsFr[level] : labelsEn[level]}
                    </span>
                  </button>
                );
              })}
            </div>

            {error && (
              <p className="text-xs text-rose-300 whitespace-pre-line">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-full bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/40 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading
                ? isFr
                  ? "Analyse en cours..."
                  : "Analyzing..."
                : isFr
                ? "Commencer la Sunset Therapy"
                : "Start Sunset Therapy"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
