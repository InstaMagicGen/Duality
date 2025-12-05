"use client";

import React, { useEffect, useMemo, useState } from "react";

type DualityResult = {
  future: string;
  shadow: string;
};

type Lang = "fr" | "en";
type Mode = "landing" | "session";

type PersonalityTrait = {
  id: string;
  fr: string;
  en: string;
};

const TRAITS: PersonalityTrait[] = [
  { id: "sensitive", fr: "Sensible", en: "Sensitive" },
  { id: "ambitious", fr: "Ambitieux(se)", en: "Ambitious" },
  { id: "tired", fr: "Fatigué(e)", en: "Tired" },
  { id: "lost", fr: "Perdu(e)", en: "Lost" },
  { id: "creative", fr: "Créatif(ve)", en: "Creative" },
  { id: "control", fr: "Dans le contrôle", en: "Controlling" },
];

const translations: Record<Lang, any> = {
  fr: {
    title: "DUALITY",
    tagline:
      "L’app qui te montre ton futur probable et ce que ton ombre essaie de te dire.",
    landingTitle: "Comprends ta dualité avant de changer ta trajectoire.",
    landingSubtitle:
      "Une session Duality = ton futur probable (Life Echo) + la voix de ton ombre (ShadowTalk), générés à partir de tes mots et de ta personnalité.",
    stepsTitle: "Comment ça fonctionne ?",
    steps: [
      "Tu choisis les traits qui te décrivent en ce moment.",
      "Tu écris ce que tu vis ou ressens.",
      "Duality te renvoie deux réponses courtes : ton futur et ton ombre.",
    ],
    ctaPrimary: "Commencer une session",
    profileTitle: "Mémoire de ta personnalité",
    profileEmpty:
      "Choisis jusqu’à 3 traits qui te ressemblent aujourd’hui. Cette mémoire reste sur ton appareil.",
    personalityLabel: "Mémoire active",
    backToIntro: "← Retour à l’intro Duality",
    dayLabel: "Décris ce que tu vis ou ressens maintenant :",
    dayPlaceholder:
      "Exemple : Je me sens bloqué, j'hésite à prendre une décision importante...",
    analyze: "Analyser ma Dualité",
    futureTitle: "LIFE ECHO · Ton futur probable",
    futureDesc:
      "2 à 4 phrases courtes sur la trajectoire que tu es en train de nourrir.",
    futureEmpty:
      "Ton futur n'est pas encore généré. Écris quelque chose et lance l'analyse.",
    shadowTitle: "SHADOWTALK · Ton ombre intérieure",
    shadowDesc:
      "2 à 4 phrases courtes sur ce que tu évites, répètes ou crées en coulisse.",
    shadowEmpty:
      "Ton ombre ne s'est pas encore exprimée. Partage quelque chose et lance l'analyse.",
    footer:
      "Prototype v1 · Tout est stocké localement côté utilisateur (aucune base de données).",
    themeDark: "Sombre",
    themeLight: "Clair",
    avatarTitle: "Avatar Duality",
    avatarDesc:
      "Une représentation générée à partir de ton humeur du moment et de ta mémoire de personnalité.",
    avatarMissing: "Avatar non généré pour cette session.",
  },
  en: {
    title: "DUALITY",
    tagline:
      "The app that shows your probable future and what your shadow is trying to say.",
    landingTitle: "Understand your duality before changing your trajectory.",
    landingSubtitle:
      "One Duality session = your probable future (Life Echo) + your shadow’s voice (ShadowTalk), generated from your words and personality.",
    stepsTitle: "How it works",
    steps: [
      "You pick a few traits that describe you right now.",
      "You write what you are living or feeling.",
      "Duality returns two short answers: your future and your shadow.",
    ],
    ctaPrimary: "Start a session",
    profileTitle: "Your personality memory",
    profileEmpty:
      "Choose up to 3 traits that fit you today. This memory stays on your device.",
    personalityLabel: "Active memory",
    backToIntro: "← Back to intro",
    dayLabel: "Describe what you are living or feeling now:",
    dayPlaceholder:
      "Example: I feel stuck, I hesitate to make an important decision...",
    analyze: "Analyze my Duality",
    futureTitle: "LIFE ECHO · Your probable future",
    futureDesc:
      "2–4 short sentences about the trajectory you are feeding.",
    futureEmpty:
      "Your future is not generated yet. Write something and start the analysis.",
    shadowTitle: "SHADOWTALK · Your inner shadow",
    shadowDesc:
      "2–4 short sentences about what you avoid, repeat or create backstage.",
    shadowEmpty:
      "Your shadow has not spoken yet. Share something and run the analysis.",
    footer:
      "Prototype v1 · Everything is stored locally on the user side (no database).",
    themeDark: "Dark",
    themeLight: "Light",
    avatarTitle: "Duality Avatar",
    avatarDesc:
      "A visual representation generated from your current mood and personality memory.",
    avatarMissing: "Avatar not generated for this session.",
  },
};

export default function Home() {
  const [mounted, setMounted] = useState(false); // <== clé anti-hydratation
  const [lang, setLang] = useState<Lang>("fr");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mode, setMode] = useState<Mode>("landing");

  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [result, setResult] = useState<DualityResult | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------- MONTAGE : langue, thème, traits ----------
  useEffect(() => {
    setMounted(true); // après ce render, on peut afficher la vraie UI

    if (typeof window === "undefined") return;

    const userLang = navigator.language?.toLowerCase() || "fr";
    setLang(userLang.startsWith("fr") ? "fr" : "en");

    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
    const initialTheme = prefersDark ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    const stored = window.localStorage.getItem("duality_traits");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setSelectedTraits(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  // ---------- Avatar DiceBear ----------
  useEffect(() => {
    if (!result) {
      setAvatarUrl(null);
      return;
    }
    const seedBase =
      `${lang}-${selectedTraits.join("-")}-${text.slice(0, 40)}` || "duality";
    const seed = encodeURIComponent(seedBase);
    const url = `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=000000&radius=40`;
    setAvatarUrl(url);
  }, [result, lang, selectedTraits, text]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", next);
    }
  }

  function toggleTrait(id: string) {
    setSelectedTraits((prev) => {
      if (prev.includes(id)) {
        const updated = prev.filter((t) => t !== id);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("duality_traits", JSON.stringify(updated));
        }
        return updated;
      }
      if (prev.length >= 3) return prev;
      const updated = [...prev, id];
      if (typeof window !== "undefined") {
        window.localStorage.setItem("duality_traits", JSON.stringify(updated));
      }
      return updated;
    });
  }

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!text.trim()) {
      setError(
        lang === "fr" ? "Écris d'abord quelque chose." : "Write something first."
      );
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/duality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          lang,
          traits: selectedTraits,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Server error.");
      }
      setResult({ future: data.future, shadow: data.shadow });
    } catch (err: any) {
      setError(err.message || "Unknown error.");
    } finally {
      setLoading(false);
    }
  }

  const t = translations[lang];

  const activeTraitsLabel = useMemo(() => {
    if (!selectedTraits.length) {
      return lang === "fr" ? "aucun trait sélectionné." : "no trait selected.";
    }
    return TRAITS.filter((tr) => selectedTraits.includes(tr.id))
      .map((tr) => (lang === "fr" ? tr.fr : tr.en))
      .join(" • ");
  }, [selectedTraits, lang]);

  // ---------- ÉCRAN SQUELETTE SSR (anti-hydratation) ----------
  if (!mounted) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-sm text-neutral-400">Duality se prépare…</p>
      </main>
    );
  }

  // ---------- VRAIE UI APRÈS HYDRATATION ----------
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 bg-black text-white">
      {/* HEADER */}
      <header className="w-full max-w-5xl mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#d4af37] flex items-center justify-center text-lg font-semibold">
            Δ
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
              {t.title}
            </h1>
            <p className="text-xs md:text-sm text-neutral-400">{t.tagline}</p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="self-start md:self-auto px-3 py-1 rounded-full border border-[#d4af37] text-xs bg-black hover:bg-[#111111] transition"
        >
          {theme === "dark" ? t.themeDark : t.themeLight}
        </button>
      </header>

      {/* MODE LANDING */}
      {mode === "landing" && (
        <section className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Intro & CTA */}
          <div className="rounded-3xl border border-[#d4af37] bg-black/80 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              {t.landingTitle}
            </h2>
            <p className="text-sm text-neutral-300 mb-6">
              {t.landingSubtitle}
            </p>

            <p className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wide">
              {t.stepsTitle}
            </p>
            <ul className="space-y-2 text-xs text-neutral-300 mb-6">
              {t.steps.map((s: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setMode("session")}
              className="w-full rounded-full bg-[#d4af37] text-black py-2.5 text-sm font-semibold hover:bg-[#f0cf6b] transition"
            >
              {t.ctaPrimary}
            </button>
          </div>

          {/* Mémoire de personnalité */}
          <div className="rounded-3xl border border-[#d4af37] bg-black/80 p-6 md:p-8 flex flex-col">
            <h3 className="text-sm font-semibold text-[#d4af37] mb-2">
              {t.profileTitle}
            </h3>
            <p className="text-xs text-neutral-300 mb-4">
              {t.profileEmpty}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {TRAITS.map((trait) => {
                const active = selectedTraits.includes(trait.id);
                const label = lang === "fr" ? trait.fr : trait.en;
                return (
                  <button
                    key={trait.id}
                    type="button"
                    onClick={() => toggleTrait(trait.id)}
                    className={`px-3 py-1 rounded-full text-xs border transition ${
                      active
                        ? "border-[#d4af37] bg-[#d4af37] text-black"
                        : "border-neutral-600 bg-black text-neutral-300 hover:border-[#d4af37]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto text-[11px] text-neutral-400">
              <span className="text-[#d4af37] font-semibold">
                {t.personalityLabel} :
              </span>{" "}
              {activeTraitsLabel}
            </div>
          </div>
        </section>
      )}

      {/* MODE SESSION */}
      {mode === "session" && (
        <>
          <section className="w-full max-w-5xl mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <button
              onClick={() => setMode("landing")}
              className="text-xs text-neutral-400 hover:text-neutral-100 underline-offset-4 hover:underline"
            >
              {t.backToIntro}
            </button>

            <div className="rounded-full border border-[#d4af37] px-4 py-2 text-[11px] bg-black/80 text-neutral-200 flex flex-wrap gap-2 items-center">
              <span className="text-[#d4af37] font-semibold">
                {t.personalityLabel} :
              </span>
              {selectedTraits.length ? (
                TRAITS.filter((tr) => selectedTraits.includes(tr.id)).map(
                  (tr) => (
                    <span
                      key={tr.id}
                      className="px-2 py-[2px] rounded-full border border-[#d4af37] text-[11px]"
                    >
                      {lang === "fr" ? tr.fr : tr.en}
                    </span>
                  )
                )
              ) : (
                <span className="text-neutral-400">
                  {lang === "fr"
                    ? "aucun trait sélectionné (à définir sur l’intro)."
                    : "no trait selected (set on the intro)."}
                </span>
              )}
            </div>
          </section>

          <section className="w-full max-w-5xl rounded-3xl border border-[#d4af37] bg-black/90 p-6 md:p-8 space-y-6">
            {/* Input */}
            <form onSubmit={handleAnalyze} className="space-y-3">
              <label className="block text-sm text-neutral-100 mb-1">
                {t.dayLabel}
              </label>
              <textarea
                className="w-full h-32 rounded-2xl bg-black border border-neutral-600 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] resize-none placeholder:text-neutral-500"
                placeholder={t.dayPlaceholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              {error && (
                <p className="text-xs text-red-400 mt-1">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#d4af37] text-black py-2.5 text-sm font-semibold hover:bg-[#f0cf6b] disabled:opacity-60 transition"
              >
                {loading
                  ? lang === "fr"
                    ? "Analyse en cours..."
                    : "Analyzing..."
                  : t.analyze}
              </button>
            </form>

            {/* Résultats + Avatar */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr,2fr,1.4fr] gap-4">
              <div className="rounded-2xl border border-[#d4af37] bg-black p-4">
                <h2 className="text-sm font-semibold text-[#d4af37] mb-1">
                  {t.futureTitle}
                </h2>
                <p className="text-xs text-neutral-300 mb-2">
                  {t.futureDesc}
                </p>
                <div className="mt-2 text-sm leading-relaxed text-neutral-50 whitespace-pre-line">
                  {result?.future ? result.future : t.futureEmpty}
                </div>
              </div>

              <div className="rounded-2xl border border-[#d4af37] bg-black p-4">
                <h2 className="text-sm font-semibold text-[#d4af37] mb-1">
                  {t.shadowTitle}
                </h2>
                <p className="text-xs text-neutral-300 mb-2">
                  {t.shadowDesc}
                </p>
                <div className="mt-2 text-sm leading-relaxed text-neutral-50 whitespace-pre-line">
                  {result?.shadow ? result.shadow : t.shadowEmpty}
                </div>
              </div>

              <div className="rounded-2xl border border-[#d4af37] bg-black p-4 flex flex-col items-center text-center">
                <h2 className="text-sm font-semibold text-[#d4af37] mb-1">
                  {t.avatarTitle}
                </h2>
                <p className="text-xs text-neutral-300 mb-3">
                  {t.avatarDesc}
                </p>

                {avatarUrl ? (
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border border-[#d4af37] bg-black/80 mb-2">
                    <img
                      src={avatarUrl}
                      alt="Duality avatar"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <p className="text-[11px] text-neutral-500">
                    {t.avatarMissing}
                  </p>
                )}

                <p className="mt-2 text-[10px] text-neutral-500">
                  Généré via DiceBear (gratuit, aucune donnée perso envoyée).
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="mt-8 text-[10px] text-neutral-500 text-center max-w-4xl">
        {t.footer}
      </footer>
    </main>
  );
}
