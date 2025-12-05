"use client";

import React, { useEffect, useState } from "react";

type Lang = "fr" | "en";
type Theme = "dark" | "light";
type ActiveApp = "home" | "duality" | "navigator";

type DualityResult = {
  future: string;
  shadow: string;
  avatarUrl?: string | null; // optionnel si ton API renvoie un avatar
};

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

const SUNSET_VIDEOS = [
  { id: 1, src: "/sunset/Sunset-1V.mp4", thumb: "/sunset/sunset-1.jpeg" },
  { id: 2, src: "/sunset/Sunset-2V.mp4", thumb: "/sunset/sunset-2.jpeg" },
  { id: 3, src: "/sunset/Sunset-3V.mp4", thumb: "/sunset/sunset-3.jpeg" },
  { id: 4, src: "/sunset/Sunset-4V.mp4", thumb: "/sunset/sunset-4.jpeg" },
];

const translations: Record<Lang, any> = {
  fr: {
    common: {
      dualityTitle: "DUALITY",
      navigatorTitle: "Soulset Navigator",
      backHome: "← Retour à l’écran d’accueil",
      themeDark: "Sombre",
      themeLight: "Clair",
      footer:
        "Prototype v1 · Tout est stocké localement côté utilisateur (aucune base de données).",
    },
    home: {
      title: "Choisis ton expérience",
      subtitle:
        "Deux portes, deux énergies : Duality pour décoder ta trajectoire, Soulset Navigator pour apaiser ton système nerveux.",
      dualityCardTitle: "DUALITY · Trajectoire & Ombre",
      dualityCardText:
        "Décris ce que tu vis maintenant. Duality te renvoie ton futur probable (Life Echo) et la voix de ton ombre (ShadowTalk).",
      dualityButton: "Explorer Duality",
      navigatorCardTitle: "Soulset Navigator · Sunset Therapy",
      navigatorCardText:
        "Une session courte pour respirer, regarder le coucher de soleil et laisser ton système se réguler.",
      navigatorButton: "Lancer Soulset Navigator",
    },
    duality: {
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
      emptyError: "Écris d'abord quelque chose.",
      loading: "Analyse en cours...",
      avatarTitle: "Avatar de cette session",
      avatarGenerated:
        "Ton avatar évolue en fonction de tes mots et de ta mémoire de personnalité.",
      avatarMissing: "Avatar non généré pour cette session.",
    },
    navigator: {
      tagline: "Une mini retraite de coucher de soleil, depuis ton écran.",
      heroTitle: "Sunset Therapy · Soulset Navigator",
      heroText:
        "Clique sur la session pour laisser l’application choisir un sunset aléatoire, mets le son, respire.",
      ctaSession: "Démarrer une session de sunset",
      howTitle: "Comment utiliser la Sunset Therapy ?",
      howSteps: [
        "Clique sur le bouton pour lancer un sunset aléatoire.",
        "Active le son ou ta propre musique calme.",
        "Respire profondément (inspire 4s, bloque 4s, expire 6s).",
        "Observe simplement sans jugement ce que tu ressens.",
      ],
      ambientTitle: "Bande son Sunset Ambient",
      ambientText:
        "Tu peux laisser tourner cette ambiance pendant que tu écris, réfléchis ou simplement te poses.",
    },
  },
  en: {
    common: {
      dualityTitle: "DUALITY",
      navigatorTitle: "Soulset Navigator",
      backHome: "← Back to home screen",
      themeDark: "Dark",
      themeLight: "Light",
      footer:
        "Prototype v1 · Everything is stored locally on the user side (no database).",
    },
    home: {
      title: "Choose your experience",
      subtitle:
        "Two doors, two energies: Duality to decode your trajectory, Soulset Navigator to calm your nervous system.",
      dualityCardTitle: "DUALITY · Trajectory & Shadow",
      dualityCardText:
        "Describe what you're living now. Duality returns your probable future (Life Echo) and your shadow’s voice (ShadowTalk).",
      dualityButton: "Explore Duality",
      navigatorCardTitle: "Soulset Navigator · Sunset Therapy",
      navigatorCardText:
        "A short session to breathe, watch the sunset and let your system regulate itself.",
      navigatorButton: "Start Soulset Navigator",
    },
    duality: {
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
      emptyError: "Write something first.",
      loading: "Analysis in progress...",
      avatarTitle: "Avatar for this session",
      avatarGenerated:
        "Your avatar evolves based on your words and personality memory.",
      avatarMissing: "Avatar not generated for this session.",
    },
    navigator: {
      tagline: "A mini sunset retreat, from your screen.",
      heroTitle: "Sunset Therapy · Soulset Navigator",
      heroText:
        "Click the button to let the app choose a random sunset, turn on the sound, breathe.",
      ctaSession: "Start a sunset session",
      howTitle: "How to use Sunset Therapy?",
      howSteps: [
        "Click the button to launch a random sunset.",
        "Turn on the sound or your own calm music.",
        "Breathe deeply (inhale 4s, hold 4s, exhale 6s).",
        "Simply observe what you feel, without judging.",
      ],
      ambientTitle: "Sunset Ambient soundtrack",
      ambientText:
        "You can let this ambience run while you write, think, or just rest.",
    },
  },
};

function randomSunsetId(exclude?: number): number {
  const ids = SUNSET_VIDEOS.map((v) => v.id);
  if (ids.length === 0) return 1;
  if (ids.length === 1) return ids[0];
  let id = ids[Math.floor(Math.random() * ids.length)];
  while (exclude !== undefined && id === exclude) {
    id = ids[Math.floor(Math.random() * ids.length)];
  }
  return id;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeApp, setActiveApp] = useState<ActiveApp>("home");

  // Duality internal state
  const [dualityMode, setDualityMode] = useState<"landing" | "session">(
    "landing"
  );
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [result, setResult] = useState<DualityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navigator state
  const [selectedSunsetId, setSelectedSunsetId] = useState<number>(
    randomSunsetId()
  );

  const t = translations[lang];
  const { common, home, duality, navigator } = t;

  // Detect language & theme on client
  useEffect(() => {
    if (typeof window === "undefined") return;

    const userLang = navigator.language?.toLowerCase() || "fr";
    setLang(userLang.startsWith("fr") ? "fr" : "en");

    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
    const initialTheme: Theme = prefersDark ? "dark" : "light";
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

  // Quand on arrive sur Soulset Navigator, on choisit direct un sunset aléatoire
  useEffect(() => {
    if (activeApp === "navigator") {
      setSelectedSunsetId((prev) => randomSunsetId(prev));
    }
  }, [activeApp]);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
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
      setError(duality.emptyError);
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
        throw new Error(data.error || "Server error");
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function startSunsetSession() {
    setSelectedSunsetId((prev) => randomSunsetId(prev));
    if (typeof document !== "undefined") {
      const el = document.getElementById("navigator-video");
      if (el && "scrollIntoView" in el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  const currentSunset =
    SUNSET_VIDEOS.find((v) => v.id === selectedSunsetId) || SUNSET_VIDEOS[0];

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 bg-black text-white">
      {/* HEADER GLOBAL */}
      <header className="w-full max-w-5xl mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#d4af37] flex items-center justify-center text-lg font-semibold">
              Δ
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
                {activeApp === "navigator"
                  ? common.navigatorTitle
                  : common.dualityTitle}
              </h1>
              {activeApp === "navigator" ? (
                <p className="text-xs md:text-sm text-neutral-400">
                  {navigator.tagline}
                </p>
              ) : activeApp === "duality" ? (
                <p className="text-xs md:text-sm text-neutral-400">
                  {duality.tagline}
                </p>
              ) : (
                <p className="text-xs md:text-sm text-neutral-400">
                  {home.subtitle}
                </p>
              )}
            </div>
          </div>

          {activeApp !== "home" && (
            <button
              onClick={() => {
                setActiveApp("home");
                setDualityMode("landing");
              }}
              className="text-[11px] text-neutral-400 hover:text-neutral-100 underline-offset-4 hover:underline mt-2"
            >
              {common.backHome}
            </button>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="self-start md:self-auto px-3 py-1 rounded-full border border-[#d4af37] text-xs bg-black hover:bg-[#111111] transition"
        >
          {theme === "dark" ? common.themeDark : common.themeLight}
        </button>
      </header>

      {/* HOME : CHOIX ENTRE LES 2 APPS */}
      {activeApp === "home" && (
        <section className="w-full max-w-5xl space-y-6">
          <div className="text-center mb-2">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              {home.title}
            </h2>
            <p className="text-sm text-neutral-300">{home.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duality card */}
            <div className="rounded-3xl border border-[#d4af37] bg-black/80 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {home.dualityCardTitle}
                </h3>
                <p className="text-sm text-neutral-300 mb-4">
                  {home.dualityCardText}
                </p>
              </div>
              <button
                onClick={() => setActiveApp("duality")}
                className="w-full rounded-full bg-[#d4af37] text-black py-2.5 text-sm font-semibold hover:bg-[#f0cf6b] transition"
              >
                {home.dualityButton}
              </button>
            </div>

            {/* Navigator card */}
            <div className="rounded-3xl border border-teal-400 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-teal-100">
                  {home.navigatorCardTitle}
                </h3>
                <p className="text-sm text-slate-200 mb-4">
                  {home.navigatorCardText}
                </p>
              </div>
              <button
                onClick={() => setActiveApp("navigator")}
                className="w-full rounded-full bg-teal-400 text-slate-950 py-2.5 text-sm font-semibold hover:bg-teal-300 transition"
              >
                {home.navigatorButton}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* DUALITY APP */}
      {activeApp === "duality" && (
        <>
          {/* MODE LANDING */}
          {dualityMode === "landing" && (
            <section className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-3xl border border-[#d4af37] bg-black/80 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  {duality.landingTitle}
                </h2>
                <p className="text-sm text-neutral-300 mb-6">
                  {duality.landingSubtitle}
                </p>

                <p className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wide">
                  {duality.stepsTitle}
                </p>
                <ul className="space-y-2 text-xs text-neutral-300 mb-6">
                  {duality.steps.map((s: string, i: number) => (
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
                  {duality.ctaPrimary}
                </button>
              </div>

              <div className="rounded-3xl border border-[#d4af37] bg-black/80 p-6 md:p-8 flex flex-col">
                <h3 className="text-sm font-semibold text-[#d4af37] mb-2">
                  {duality.profileTitle}
                </h3>
                <p className="text-xs text-neutral-300 mb-4">
                  {duality.profileEmpty}
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
                    {duality.personalityLabel} :
                  </span>{" "}
                  {selectedTraits.length
                    ? TRAITS.filter((tr) =>
                        selectedTraits.includes(tr.id)
                      )
                        .map((tr) => (lang === "fr" ? tr.fr : tr.en))
                        .join(" • ")
                    : lang === "fr"
                    ? "aucun trait sélectionné."
                    : "no trait selected."}
                </div>
              </div>
            </section>
          )}

          {/* MODE SESSION */}
          {dualityMode === "session" && (
            <>
              <section className="w-full max-w-5xl mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <button
                  onClick={() => setDualityMode("landing")}
                  className="text-xs text-neutral-400 hover:text-neutral-100 underline-offset-4 hover:underline"
                >
                  {duality.backToIntro}
                </button>

                <div className="rounded-full border border-[#d4af37] px-4 py-2 text-[11px] bg-black/80 text-neutral-200 flex flex-wrap gap-2 items-center">
                  <span className="text-[#d4af37] font-semibold">
                    {duality.personalityLabel} :
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

              <section className="w-full max-w-5xl rounded-3xl border border-[#d4af37] bg-black/90 p-6 md:p-8">
                {/* INPUT */}
                <form onSubmit={handleAnalyze} className="space-y-3 mb-6">
                  <label className="block text-sm text-neutral-100 mb-1">
                    {duality.dayLabel}
                  </label>
                  <textarea
                    className="w-full h-32 rounded-2xl bg-black border border-neutral-600 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] resize-none placeholder:text-neutral-500"
                    placeholder={duality.dayPlaceholder}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />

                  {error && (
                    <p className="text-xs text-red-400 mt-1">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-[#d4af37] text-black py-2.5 text-sm font-semibold hover:bg-[#f0cf6b] disabled:opacity-60 transition"
                  >
                    {loading ? duality.loading : duality.analyze}
                  </button>
                </form>

                {/* AVATAR EN PREMIER */}
                {result && (
                  <div className="mb-5 rounded-2xl border border-[#d4af37] bg-black/95 p-4 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#d4af37] via-purple-500 to-black flex items-center justify-center text-[10px] font-semibold text-black">
                      {result.avatarUrl ? (
                        <img
                          src={result.avatarUrl}
                          alt="Avatar de session"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>
                          {lang === "fr" ? "Avatar" : "Avatar"}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-300">
                      <p className="font-semibold mb-1">
                        {duality.avatarTitle}
                      </p>
                      <p>
                        {result.avatarUrl
                          ? duality.avatarGenerated
                          : duality.avatarMissing}
                      </p>
                    </div>
                  </div>
                )}

                {/* RÉSULTATS FUTUR / OMBRE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-[#d4af37] bg-black p-4">
                    <h2 className="text-sm font-semibold text-[#d4af37] mb-1">
                      {duality.futureTitle}
                    </h2>
                    <p className="text-xs text-neutral-300 mb-2">
                      {duality.futureDesc}
                    </p>
                    <div className="mt-2 text-sm leading-relaxed text-neutral-50 whitespace-pre-line">
                      {result?.future ? result.future : duality.futureEmpty}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#d4af37] bg-black p-4">
                    <h2 className="text-sm font-semibold text-[#d4af37] mb-1">
                      {duality.shadowTitle}
                    </h2>
                    <p className="text-xs text-neutral-300 mb-2">
                      {duality.shadowDesc}
                    </p>
                    <div className="mt-2 text-sm leading-relaxed text-neutral-50 whitespace-pre-line">
                      {result?.shadow ? result.shadow : duality.shadowEmpty}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      {/* SOULSET NAVIGATOR / SUNSET THERAPY */}
      {activeApp === "navigator" && (
        <section className="w-full max-w-5xl space-y-6">
          {/* Hero */}
          <div className="rounded-3xl border border-teal-400 bg-gradient-to-b from-slate-950 via-sky-950/40 to-slate-950 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-teal-100">
                {navigator.heroTitle}
              </h2>
              <p className="text-sm text-slate-200 mb-4">
                {navigator.heroText}
              </p>
              <button
                onClick={startSunsetSession}
                className="rounded-full bg-teal-400 text-slate-950 py-2.5 px-6 text-sm font-semibold hover:bg-teal-300 transition"
              >
                {navigator.ctaSession}
              </button>
            </div>
            <div className="rounded-2xl border border-teal-300/40 overflow-hidden bg-slate-950/60">
              <video
                id="navigator-video"
                src={currentSunset.src}
                controls
                className="w-full"
                poster={currentSunset.thumb}
              />
            </div>
          </div>

          {/* How to + ambient */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-teal-400/70 bg-slate-950/90 p-5">
              <h3 className="text-sm font-semibold text-teal-200 mb-2">
                {navigator.howTitle}
              </h3>
              <ul className="space-y-2 text-xs text-slate-200">
                {navigator.howSteps.map((s: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-300" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-teal-400/70 bg-slate-950/90 p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-sm font-semibold text-teal-200 mb-1">
                  {navigator.ambientTitle}
                </h3>
                <p className="text-xs text-slate-200 mb-3">
                  {navigator.ambientText}
                </p>
              </div>
              <div className="rounded-2xl border border-teal-300/40 overflow-hidden bg-slate-950">
                <video
                  src="/sunset/Sunset-ambient.mp4"
                  controls
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="mt-8 text-[10px] text-neutral-500 text-center max-w-4xl">
        {common.footer}
      </footer>
    </main>
  );
}
