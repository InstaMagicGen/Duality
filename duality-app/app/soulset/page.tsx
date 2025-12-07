// app/soulset/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type TherapyResult = {
  quote: string;
};

type Media = {
  src: string;
  type: "video" | "image";
};

const SUNSET_MEDIA: Media[] = [
  { src: "/sunset/Sunset-1V.mp4", type: "video" },
  { src: "/sunset/Sunset-2V.mp4", type: "video" },
  { src: "/sunset/Sunset-3V.mp4", type: "video" },
  { src: "/sunset/Sunset-4V.mp4", type: "video" },
  { src: "/sunset/sunset-1.jpeg", type: "image" },
  { src: "/sunset/sunset-2.jpeg", type: "image" },
  { src: "/sunset/sunset-3.jpeg", type: "image" },
  { src: "/sunset/sunset-4.jpeg", type: "image" },
  { src: "/sunset/sunset-5.jpeg", type: "image" },
  { src: "/sunset/sunset-6.jpeg", type: "image" },
  { src: "/sunset/Sunset-7.jpeg", type: "image" },
];

export default function SoulsetPage() {
  const router = useRouter();

  const [text, setText] = useState("");
  const [quote, setQuote] = useState<string | null>(null);
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTherapy, setShowTherapy] = useState(false);

  function pickRandomMedia(): Media {
    return SUNSET_MEDIA[Math.floor(Math.random() * SUNSET_MEDIA.length)];
  }

  async function handleTherapy(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!text.trim()) {
      setError("Décris d’abord ton état ou ton problème.");
      return;
    }

    try {
      setLoading(true);

      // Appel à ton endpoint Soulset (à adapter si besoin)
      const res = await fetch("/api/soulset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang: "fr" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la Sunset Therapy.");
      }

      const q: string =
        data.quote || data.message || data.text || "Respire. Tu as le droit de recommencer doucement.";

      setQuote(q.trim());
      setMedia(pickRandomMedia());
      setShowTherapy(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur inconnue.");
      setShowTherapy(false);
    } finally {
      setLoading(false);
    }
  }

  // Vue THERAPY : plein écran vidéo/image + quote au centre
  if (showTherapy && quote && media) {
    return (
      <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
        {media.type === "video" ? (
          <video
            src={media.src}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.src}
            alt="Sunset"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Voile sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />

        {/* Quote au centre */}
        <div className="relative z-10 flex h-full w-full flex-col">
          <header className="flex items-center justify-between px-4 pt-4">
            <button
              onClick={() => {
                setShowTherapy(false);
              }}
              className="text-xs text-slate-200 hover:text-white inline-flex items-center gap-2 bg-black/35 px-3 py-1 rounded-full border border-slate-500/60 backdrop-blur"
            >
              ← Revenir à la saisie
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
                {quote}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Vue FORMULAIRE / préparation
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 px-4 py-5">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-6 flex items-center justify-between gap-4">
        <button
          onClick={() => router.push("/")}
          className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-2"
        >
          <span className="inline-block h-4 w-4 rounded-full border border-slate-500 flex items-center justify-center text-[10px]">
            ←
          </span>
          Retour à l’accueil
        </button>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.3em] text-sky-300">
            Soulset Navigator
          </p>
          <p className="text-xs text-sky-200/70">
            Sunset Therapy · Phrase miroir + sunset immersif
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <section className="rounded-3xl border border-sky-400/35 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/35 px-6 py-6 md:px-7 md:py-7 shadow-[0_0_70px_rgba(56,189,248,0.25)] backdrop-blur-xl">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            Une phrase miroir pour ton état du moment
          </h1>
          <p className="text-sm text-slate-200 mb-4">
            Décris ton problème ou ton état personnel comme si tu parlais à un
            ami. L’IA va renvoyer une phrase courte qui t’aide à recadrer la
            situation. Elle sera projetée sur un sunset immersif, en plein écran.
          </p>

          <form onSubmit={handleTherapy} className="space-y-3">
            <label className="block text-xs font-medium text-sky-100/80 mb-1">
              Décris ton état ou ton problème du moment :
            </label>
            <textarea
              className="w-full h-32 md:h-40 rounded-2xl bg-black/40 border border-sky-500/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/80 placeholder:text-slate-400"
              placeholder="Exemple : Je me sens épuisé(e), j’ai du mal à lâcher prise même quand je regarde un coucher de soleil..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {error && (
              <p className="text-xs text-red-400 whitespace-pre-line">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-sky-400 text-slate-950 text-sm font-semibold px-6 py-2.5 shadow-[0_0_25px_rgba(56,189,248,0.75)] hover:bg-sky-300 disabled:opacity-60 disabled:shadow-none transition"
            >
              {loading ? "Analyse en cours..." : "Lancer la Sunset Therapy"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
