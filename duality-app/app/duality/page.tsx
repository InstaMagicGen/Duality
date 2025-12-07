// app/duality/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type DualityResult = {
  future: string;
  shadow: string;
};

export default function DualityPage() {
  const router = useRouter();

  const [text, setText] = useState("");
  const [result, setResult] = useState<DualityResult | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setAvatarUrl(null);

    if (!text.trim()) {
      setError("Écris quelque chose avant de lancer l’analyse.");
      return;
    }

    try {
      setLoading(true);

      // 1) Appel à ton endpoint d’analyse (Groq / OpenAI côté serveur)
      const res = await fetch("/api/duality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang: "fr" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l’analyse.");
      }

      setResult({
        future: data.future ?? "",
        shadow: data.shadow ?? "",
      });
      setHasAnalyzed(true);

      // 2) Avatar FAL.ai (endpoint séparé)
      try {
        setAvatarLoading(true);
        const avatarRes = await fetch("/api/avatar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const avatarData = await avatarRes.json();
        if (avatarRes.ok) {
          const url =
            avatarData.url ||
            avatarData.imageUrl ||
            avatarData.avatarUrl ||
            avatarData.output?.image_url;
          if (url) setAvatarUrl(url);
        }
      } catch (err) {
        console.error("Erreur avatar:", err);
      } finally {
        setAvatarLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur inconnue.");
      setHasAnalyzed(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white px-4 py-5">
      {/* Barre supérieure */}
      <header className="max-w-5xl mx-auto mb-6 flex items-center justify-between gap-4">
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
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-300">
            Duality
          </p>
          <p className="text-xs text-slate-400">
            Futur probable &amp; ombre intérieure
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Carte input + bouton */}
        <section className="rounded-3xl border border-amber-500/40 bg-black/70 backdrop-blur-xl px-5 py-5 md:px-7 md:py-6 shadow-[0_0_70px_rgba(212,175,55,0.25)]">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            Écris ce que tu vis maintenant
          </h1>
          <p className="text-sm text-slate-300 mb-4">
            Quelques lignes suffisent. Duality va générer deux miroirs :{" "}
            <span className="text-amber-300 font-medium">Life Echo</span> (la
            trajectoire que tu nourris) et{" "}
            <span className="text-amber-300 font-medium">Shadowtalk</span> (ce
            que ton ombre essaie de te dire).
          </p>

          <form onSubmit={handleAnalyze} className="space-y-3">
            <textarea
              className="w-full h-32 md:h-40 rounded-2xl bg-black/80 border border-slate-700 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70 placeholder:text-slate-500"
              placeholder="Exemple : Je me sens perdu, j’ai l’impression de tourner en rond malgré tous mes efforts..."
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
              {loading ? "Analyse en cours..." : "Analyser ma Dualité"}
            </button>
          </form>
        </section>

        {/* Avatar – affiché SEULEMENT après analyse */}
        {hasAnalyzed && (
          <section className="rounded-3xl border border-amber-500/35 bg-black/70 backdrop-blur-xl px-5 py-5 md:px-7 md:py-6 shadow-[0_0_70px_rgba(212,175,55,0.25)]">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative h-40 w-40 flex-shrink-0 rounded-full border border-amber-400/60 bg-gradient-to-br from-black via-slate-900 to-amber-900/50 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                {avatarUrl ? (
                  // Avatar généré par FAL.ai
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt="Avatar de la Dualité"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center px-4">
                    <p className="text-[11px] text-amber-200 font-medium mb-1 uppercase tracking-[0.2em]">
                      Avatar en cours
                    </p>
                    <p className="text-xs text-slate-300">
                      {avatarLoading
                        ? "Génération de l’avatar..."
                        : "Avatar non généré pour cette session."}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  Avatar de ta Dualité
                </h2>
                <p className="text-sm text-slate-200">
                  Cet avatar symbolise l’énergie actuelle de ta Dualité. Il est
                  généré par une IA visuelle à partir de ton texte, quand l’API
                  FAL.ai est disponible.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Résultats – cachés tant qu’il n’y a pas eu d’analyse */}
        {hasAnalyzed && result && (
          <section className="grid gap-5 md:grid-cols-2">
            {/* Life Echo */}
            <div className="rounded-3xl border border-amber-400/40 bg-black/75 backdrop-blur-xl px-5 py-5 md:px-6 md:py-6 shadow-[0_0_60px_rgba(212,175,55,0.22)]">
              <h3 className="text-sm font-semibold text-amber-300 mb-1 uppercase tracking-[0.22em]">
                Life Echo · Ton futur probable
              </h3>
              <p className="text-xs text-slate-300 mb-3">
                2 à 4 phrases courtes sur la trajectoire que tu nourris en ce
                moment.
              </p>
              <p className="text-sm leading-relaxed text-slate-50 whitespace-pre-line">
                {result.future}
              </p>
            </div>

            {/* Shadowtalk */}
            <div className="rounded-3xl border border-amber-400/40 bg-black/75 backdrop-blur-xl px-5 py-5 md:px-6 md:py-6 shadow-[0_0_60px_rgba(212,175,55,0.22)]">
              <h3 className="text-sm font-semibold text-amber-300 mb-1 uppercase tracking-[0.22em]">
                Shadowtalk · Ton ombre intérieure
              </h3>
              <p className="text-xs text-slate-300 mb-3">
                2 à 4 phrases courtes sur ce que tu évites, répètes ou crées en
                coulisse.
              </p>
              <p className="text-sm leading-relaxed text-slate-50 whitespace-pre-line">
                {result.shadow}
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
