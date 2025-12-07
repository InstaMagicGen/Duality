"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en";

type DualityResult = {
  future: string;
  shadow: string;
  avatarUrl?: string | null;
};

export default function DualityPage() {
  const router = useRouter();

  const [lang, setLang] = useState<Lang>("fr");

  const [text, setText] = useState("");
  const [result, setResult] = useState<DualityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Langue auto selon système
  useEffect(() => {
    if (typeof window === "undefined") return;
    const userLang = navigator.language?.toLowerCase() || "fr";
    setLang(userLang.startsWith("fr") ? "fr" : "en");
  }, []);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!text.trim()) {
      setError(
        lang === "fr"
          ? "Écris quelque chose avant de lancer l’analyse."
          : "Write something before running the analysis."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/duality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang, traits: [] }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur serveur.");
      }

      setResult({
        future: data.future,
        shadow: data.shadow,
        avatarUrl: data.avatarUrl ?? null,
      });
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white px-4 py-5">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-6 flex items-center justify-between gap-4">
        <button
          onClick={() => router.push("/")}
          className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-2"
        >
          <span className="inline-block h-4 w-4 rounded-full border border-slate-500 flex items-center justify-center text-[10px]">
            ←
          </span>
          {lang === "fr" ? "Retour à l’accueil" : "Back to home"}
        </button>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-300">
            Duality
          </p>
          <p className="text-xs text-slate-400">
            {lang === "fr"
              ? "Futur probable & ombre intérieure"
              : "Probable future & inner shadow"}
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Carte input */}
        <section className="rounded-3xl border border-amber-500/40 bg-black/70 backdrop-blur-xl px-5 py-5 md:px-7 md:py-6 shadow-[0_0_70px_rgba(212,175,55,0.25)]">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            {lang === "fr"
              ? "Écris ce que tu vis maintenant"
              : "Write what you're going through right now"}
          </h1>
          <p className="text-sm text-slate-300 mb-4">
            {lang === "fr"
              ? "Quelques lignes suffisent. Duality va générer deux miroirs : Life Echo (la trajectoire probable) et Shadowtalk (ce que ton ombre cherche à te dire)."
              : "A few lines are enough. Duality will create two mirrors: Life Echo (probable trajectory) and Shadowtalk (what your shadow is trying to say)."}
          </p>

          <form onSubmit={handleAnalyze} className="space-y-3">
            <textarea
              className="w-full h-32 md:h-40 rounded-2xl bg-black/80 border border-slate-700 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70 placeholder:text-slate-500"
              placeholder={
                lang === "fr"
                  ? "Exemple : Je me sens perdu, j’ai l’impression de tourner en rond malgré tous mes efforts..."
                  : "Example: I feel lost, like I’m going in circles despite all my efforts..."
              }
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {error && (
              <p className="text-xs text-red-400 mt-1 whitespace-pre-line">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-amber-400 text-black text-sm font-semibold px-6 py-2.5 shadow-[0_0_25px_rgba(212,175,55,0.7)] hover:bg-amber-300 disabled:opacity-60 disabled:shadow-none transition"
            >
              {loading
                ? lang === "fr"
                  ? "Analyse en cours..."
                  : "Analyzing..."
                : lang === "fr"
                ? "Analyser ma Dualité"
                : "Analyze my Duality"}
            </button>
          </form>
        </section>

        {/* Résultats (affichés uniquement après analyse) */}
        {result && (
          <section className="space-y-8">
            {/* Avatar centré */}
            <div className="bg-black/70 border border-[#d4af37]/40 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.7)] flex flex-col items-center text-center">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border border-[#d4af37]/70 overflow-hidden mb-4 bg-black/40 flex items-center justify-center">
                {result.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={result.avatarUrl}
                    alt="Avatar de ta Dualité"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-neutral-400 px-6">
                    {lang === "fr"
                      ? "Avatar non généré pour cette session."
                      : "Avatar not generated for this session."}
                  </span>
                )}
              </div>
              <h3 className="text-[#d4af37] font-semibold text-lg mb-2">
                {lang === "fr"
                  ? "Avatar de ta Dualité"
                  : "Avatar of your Duality"}
              </h3>
              <p className="text-sm text-neutral-300 max-w-2xl">
                {lang === "fr"
                  ? "Cet avatar symbolise l’énergie actuelle de ta Dualité. Il est généré à partir de tes mots lorsque l’API visuelle est disponible."
                  : "This avatar symbolizes the current energy of your Duality, generated from your words when the visual API is available."}
              </p>
            </div>

            {/* Life Echo & Shadowtalk */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/75 border border-[#d4af37]/40 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
                <h2 className="text-sm font-semibold text-[#d4af37] mb-2">
                  LIFE ECHO ·{" "}
                  {lang === "fr" ? "Ton futur probable" : "Your probable future"}
                </h2>
                <p className="text-xs text-neutral-400 mb-3">
                  {lang === "fr"
                    ? "2 à 4 phrases comme si ta propre conscience te parlait de la trajectoire que tu nourris."
                    : "2–4 sentences as if your own conscience was speaking about the path you’re feeding."}
                </p>
                <p className="text-sm text-neutral-50 whitespace-pre-line leading-relaxed">
                  {result.future}
                </p>
              </div>

              <div className="bg-black/75 border border-[#d4af37]/40 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
                <h2 className="text-sm font-semibold text-[#d4af37] mb-2">
                  SHADOWTALK ·{" "}
                  {lang === "fr" ? "Ton ombre intérieure" : "Your inner shadow"}
                </h2>
                <p className="text-xs text-neutral-400 mb-3">
                  {lang === "fr"
                    ? "2 à 4 phrases où ta part d’ombre te parle franchement de ce que tu évites, répètes ou crées en coulisse."
                    : "2–4 sentences where your shadow speaks honestly about what you avoid, repeat or create backstage."}
                </p>
                <p className="text-sm text-neutral-50 whitespace-pre-line leading-relaxed">
                  {result.shadow}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
