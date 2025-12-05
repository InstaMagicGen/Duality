"use client";

import React, { useEffect, useState } from "react";

// ==== IMPORTS DES FICHIERS À LA RACINE DU PROJET ====
// Vidéos sunset
import sunset1Video from "../Sunset-1V.mp4";
import sunset2Video from "../Sunset-2V.mp4";
import sunset3Video from "../Sunset-3V.mp4";
import sunset4Video from "../Sunset-4V.mp4";

// Images sunset
import sunset1Img from "../sunset-1.jpeg";
import sunset2Img from "../sunset-2.jpeg";
import sunset3Img from "../sunset-3.jpeg";
import sunset4Img from "../Sunset-4.jpeg";
import sunset5Img from "../Sunset-5.jpeg";
import sunset6Img from "../Sunset-6.jpeg";
import sunset7Img from "../Sunset-7.jpeg";

// Audio ambiance
import sunsetAmbient from "../Sunset-ambient.mp4";

// ================== TYPES & DONNÉES ==================

type DualityResult = {
  future: string;
  shadow: string;
};

type Lang = "fr" | "en";
type Experience = "home" | "duality" | "navigator";
type DualityMode = "landing" | "session";

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

const SUNSET_SLIDES = [
  { id: 1, video: sunset1Video, image: sunset1Img },
  { id: 2, video: sunset2Video, image: sunset2Img },
  { id: 3, video: sunset3Video, image: sunset3Img },
  { id: 4, video: sunset4Video, image: sunset4Img },
  { id: 5, image: sunset5Img },
  { id: 6, image: sunset6Img },
  { id: 7, image: sunset7Img },
];

const translations: Record<Lang, any> = {
  fr: {
    appTitle: "Soulset • Duality Lab",
    appSubtitle:
      "Entre ton futur probable, ton ombre intérieure et ton coucher de soleil thérapeutique.",
    experienceChoiceTitle: "Choisis ton expérience pour ce moment :",
    expDualityTitle: "DUALITY",
    expDualityDesc:
      "Analyse rapide de ta dualité : ton futur probable (Life Echo) + la voix de ton ombre (ShadowTalk).",
    expNavigatorTitle: "Soulset Navigator",
    expNavigatorDesc:
      "Sunset therapy guidée pour calmer le mental, relâcher la pression et revenir dans ton corps.",
    startDuality: "Entrer dans Duality",
    startNavigator: "Lancer la Sunset Therapy",

    // Duality
    dualityTagline:
      "L’app qui te montre ton futur probable et ce que ton ombre essaie de te dire.",
    landingTitle: "Comprends ta dualité avant de changer ta trajectoire.",
    landingSubtitle:
      "Une session Duality = ton futur probable (Life Echo) + la voix de ton ombre (ShadowTalk), générés à partir de tes mots et de ta personnalité.",
    stepsTitle: "Comment ça fonctionne ?",
    steps: [
      "Tu choisis les traits qui te décrivent en ce moment.",
      "Tu écris ce que tu vis ou ressens concrètement.",
      "Duality te renvoie deux réponses courtes : ton futur et ton ombre.",
    ],
    ctaPrimary: "Commencer une session Duality",
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

    // Sunset navigator
    navigatorTitle: "Sunset Therapy • Soulset Navigator",
    navigatorIntro:
      "Ferme un peu la boucle mentale. Laisse le coucher de soleil faire le travail à ta place.",
    breathingTitle: "Rituel rapide",
    breathingSteps: [
      "Inspire doucement pendant 4 secondes en regardant la lumière du sunset.",
      "Garde l’air pendant 4 secondes, observe ce que tu ressens.",
      "Expire lentement pendant 8 secondes, laisse tomber les tensions.",
    ],
    ambientOn: "Son d’ambiance actif",
    ambientOff: "Activer le son d’ambiance",
    previous: "Précédent",
    next: "Suivant",

    footer:
      "Prototype v1 · Duality & Soulset Navigator · Tout est stocké côté utilisateur (aucune base de données).",
    themeDark: "Mode sombre",
    themeLight: "Mode clair",
  },
  en: {
    appTitle: "Soulset • Duality Lab",
    appSubtitle:
      "Between your probable future, your inner shadow and your sunset therapy.",
    experienceChoiceTitle: "Choose your experience for this moment:",
    expDualityTitle: "DUALITY",
    expDualityDesc:
      "Quick analysis of your duality: your probable future (Life Echo) + your shadow’s voice (ShadowTalk).",
    expNavigatorTitle: "Soulset Navigator",
    expNavigatorDesc:
      "Guided sunset therapy to calm the mind, release pressure and come back into your body.",
    startDuality: "Enter Duality",
    startNavigator: "Start Sunset Therapy",

    // Duality
    dualityTagline:
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
    ctaPrimary: "Start a Duality session",
    profileTitle: "Your personality memory",
    profileEmpty:
      "Choose up to 3 traits that fit you today. This memory stays on your device.",
    personalityLabel: "Active memory",
    backToIntro: "← Back to Duality intro",
    dayLabel: "Describe what you are living or feeling now:",
    dayPlaceholder:
      "Example: I feel stuck, I hesitate to make an important decision...",
    analyze: "Analyze my Duality",
    futureTitle: "LIFE ECHO · Your probable future",
    futureDesc: "2–4 short sentences about the trajectory you are feeding.",
    futureEmpty:
      "Your future is not generated yet. Write something and start the analysis.",
    shadowTitle: "SHADOWTALK · Your inner shadow",
    shadowDesc:
      "2–4 short sentences about what you avoid, repeat or create backstage.",
    shadowEmpty:
      "Your shadow has not spoken yet. Share something and run the analysis.",

    // Sunset navigator
    navigatorTitle: "Sunset Therapy • Soulset Navigator",
    navigatorIntro:
      "Loosen the mental loop. Let the sunset do the work for a few minutes.",
    breathingTitle: "Quick ritual",
    breathingSteps: [
      "Inhale gently for 4 seconds while watching the sunset light.",
      "Hold for 4 seconds, just notice what you feel.",
      "Exhale slowly for 8 seconds, let the tension drop.",
    ],
    ambientOn: "Ambient sound on",
    ambientOff: "Turn on ambient sound",
    previous: "Previous",
    next: "Next",

    footer:
      "Prototype v1 · Duality & Soulset Navigator · Everything is stored on the user side (no database).",
    themeDark: "Dark mode",
    themeLight: "Light mode",
  },
};

// ================== COMPOSANT PRINCIPAL ==================

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hydrated, setHydrated] = useState(false);

  const [experience, setExperience] = useState<Experience>("home");
  const [dualityMode, setDualityMode] = useState<DualityMode>("landing");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [result, setResult] = useState<DualityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Soulset navigator
  const [activeSlide, setActiveSlide] = useState(0);
  const [ambientOn, setAmbientOn] = useState(false);

  const t = translations[lang];

  // ===== Hydratation + détection langue / thème =====
  useEffect(() => {
    setHydrated(true);

    if (typeof window !== "undefined") {
      const userLang = navigator.language?.toLowerCase() || "fr";
      setLang(userLang.startsWith("fr") ? "fr" : "en");

      const prefersDark =
        window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
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
        throw new Error(data.error || "Erreur serveur.");
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  function goNextSlide() {
    setActiveSlide((prev) => (prev + 1) % SUNSET_SLIDES.length);
  }

  function goPrevSlide() {
    setActiveSlide((prev) =>
      prev === 0 ? SUNSET_SLIDES.length - 1 : prev - 1
    );
  }

  if (!hydrated) {
    return <main className="min-h-screen bg-black" />;
  }

  const currentSlide = SUNSET_SLIDES[activeSlide];

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 bg-black text-white">
      {/* HEADER GLOBAL */}
      <header className="w-full max-w-5xl mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#d4af37] flex items-center justify-center text-lg font-semibold shadow-lg shadow-yellow-500/30">
            Δ
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
              {t.appTitle}
            </h1>
            <p className="text-xs md:text-sm text-neutral-400">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-full border border-[#d4af37] text-xs bg-black hover:bg-[#111111] transition"
          >
            {theme === "dark" ? t.themeDark : t.themeLight}
          </button>
        </div>
      </header>

      {/* ===================== ÉCRAN D'ACCUEIL ===================== */}
      {experience === "home" && (
        <section className="w-full max-w-5xl space-y-6">
          <div className="rounded-3xl border border-[#d4af37] bg-black/80 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              {t.experienceChoiceTitle}
            </h2>
            <p className="text-sm text-neutral-300 mb-6">{t.dualityTagline}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Duality card */}
              <button
                onClick={() => {
                  setExperience("duality");
                  setDualityMode("landing");
                }}
                className="group text-left rounded-3xl border border-[#d4af37] bg-gradient-to-br from-black via-black to-[#1b1308] p-5 hover:border-yellow-300 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[#d4af37]">
                    {t.expDualityTitle}
                  </span>
                  <span className="text-[11px] px-2 py-[2px] rounded-full border border-[#d4af37] text-[#d4af37]">
                    5–7 min
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mb-4">
                  {t.expDualityDesc}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-black bg-[#d4af37] px-4 py-2 rounded-full group-hover:bg-yellow-300">
                  {t.startDuality}
                  <span>↗</span>
                </span>
              </button>

              {/* Soulset Navigator card */}
              <button
                onClick={() => setExperience("navigator")}
                className="group text-left rounded-3xl border border-[#d4af37] bg-gradient-to-br from-black via-[#05030a] to-[#170c25] p-5 hover:border-yellow-300 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[#d4af37]">
                    {t.expNavigatorTitle}
                  </span>
                  <span className="text-[11px] px-2 py-[2px] rounded-full border border-[#d4af37] text-[#d4af37]">
                    3–10 min
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mb-4">
                  {t.expNavigatorDesc}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-black bg-[#d4af37] px-4 py-2 rounded-full group-hover:bg-yellow-300">
                  {t.startNavigator}
                  <span>☼</span>
                </span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ===================== DUALITY ===================== */}
      {experience === "duality" && (
        <>
          {/* Bandeau retour & mémoire */}
          <section className="w-full max-w-5xl mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <button
              onClick={() => {
                if (dualityMode === "landing") setExperience("home");
                else setDualityMode("landing");
              }}
              className="text-xs text-neutral-400 hover:text-neutral-100 underline-offset-4 hover:underline"
            >
              {dualityMode === "landing" ? "← Home" : t.backToIntro}
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
                    ? "aucun trait sélectionné."
                    : "no trait selected."}
                </span>
              )}
            </div>
          </section>

          {/* LANDING */}
          {dualityMode === "landing" && (
            <section className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  onClick={() => setDualityMode("session")}
                  className="w-full rounded-full bg-[#d4af37] text-black py-2.5 text-sm font-semibold hover:bg-[#f0cf6b] transition"
                >
                  {t.ctaPrimary}
                </button>
              </div>

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
                  {selectedTraits.length
                    ? TRAITS.filter((tr) => selectedTraits.includes(tr.id))
                        .map((tr) => (lang === "fr" ? tr.fr : tr.en))
                        .join(" • ")
                    : lang === "fr"
                    ? "aucun trait sélectionné."
                    : "no trait selected."}
                </div>
              </div>
            </section>
          )}

          {/* SESSION */}
          {dualityMode === "session" && (
            <section className="w-full max-w-5xl rounded-3xl border border-[#d4af37] bg-black/90 p-6 md:p-8">
              <form onSubmit={handleAnalyze} className="space-y-3 mb-6">
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
                  {loading ? "Analyse en cours..." : t.analyze}
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </section>
          )}
        </>
      )}

      {/* ===================== SOULSET NAVIGATOR / SUNSET ===================== */}
      {experience === "navigator" && (
        <section className="w-full max-w-5xl space-y-5">
          <button
            onClick={() => setExperience("home")}
            className="text-xs text-neutral-400 hover:text-neutral-100 underline-offset-4 hover:underline"
          >
            ← Home
          </button>

          <div className="rounded-3xl border border-[#d4af37] bg-black/80 p-6 md:p-8 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-1">
                  {t.navigatorTitle}
                </h2>
                <p className="text-xs md:text-sm text-neutral-300">
                  {t.navigatorIntro}
                </p>
              </div>

              <button
                onClick={() => setAmbientOn((p) => !p)}
                className="self-start md:self-auto px-4 py-2 rounded-full border border-[#d4af37] text-xs bg-black hover:bg-[#111111] transition flex items-center gap-2"
              >
                <span>{ambientOn ? "🔊" : "🎧"}</span>
                <span>{ambientOn ? t.ambientOn : t.ambientOff}</span>
              </button>
            </div>

            {/* Player sunset */}
            <div className="relative rounded-3xl overflow-hidden border border-[#d4af37] bg-black/90">
              <div className="aspect-[16/9] w-full bg-black">
                {currentSlide.video ? (
                  <video
                    key={activeSlide}
                    src={currentSlide.video}
                    autoPlay
                    loop
                    muted={!ambientOn}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentSlide.image as string}
                    alt="Sunset"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Contrôles */}
              <div className="flex items-center justify-between px-4 py-3 text-xs bg-black/70 backdrop-blur">
                <button
                  onClick={goPrevSlide}
                  className="px-3 py-1 rounded-full border border-[#d4af37] hover:bg-[#111111]"
                >
                  {t.previous}
                </button>

                <div className="flex items-center gap-2">
                  {SUNSET_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 w-2 rounded-full border border-[#d4af37] ${
                        idx === activeSlide ? "bg-[#d4af37]" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={goNextSlide}
                  className="px-3 py-1 rounded-full border border-[#d4af37] hover:bg-[#111111]"
                >
                  {t.next}
                </button>
              </div>
            </div>

            {/* Rituel respiration */}
            <div className="rounded-2xl border border-[#d4af37] bg-black/80 p-4">
              <h3 className="text-sm font-semibold text-[#d4af37] mb-2">
                {t.breathingTitle}
              </h3>
              <ul className="text-xs text-neutral-300 space-y-2">
                {t.breathingSteps.map((step: string, idx: number) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {ambientOn && (
            <audio src={sunsetAmbient} autoPlay loop />
          )}
        </section>
      )}

      <footer className="mt-8 text-[10px] text-neutral-500 text-center max-w-4xl">
        {t.footer}
      </footer>
    </main>
  );
}
