"use client";

import React, { useEffect, useState } from "react";

type Lang = "fr" | "en";
type Mode = "home" | "duality" | "soulset";

type DualityResult = {
  future: string;
  shadow: string;
};

type SoulsetMedia = {
  src: string;
  type: "video" | "image";
};

// Media Sunset (tous dans /public/sunset)
const SUNSET_VIDEOS: SoulsetMedia[] = [
  { src: "/sunset/Sunset-1V.mp4", type: "video" },
  { src: "/sunset/Sunset-2V.mp4", type: "video" },
  { src: "/sunset/Sunset-3V.mp4", type: "video" },
  { src: "/sunset/Sunset-4V.mp4", type: "video" },
];

const SUNSET_IMAGES: SoulsetMedia[] = [
  { src: "/sunset/sunset-1.jpeg", type: "image" },
  { src: "/sunset/sunset-2.jpeg", type: "image" },
  { src: "/sunset/sunset-3.jpeg", type: "image" },
  { src: "/sunset/sunset-4.jpeg", type: "image" },
  { src: "/sunset/sunset-5.jpeg", type: "image" },
  { src: "/sunset/sunset-6.jpeg", type: "image" },
  { src: "/sunset/Sunset-7.jpeg", type: "image" },
];

const SOULSET_QUOTES: Record<Lang, string[]> = {
  fr: [
    "Tu n’as pas besoin d’aller vite, seulement d’avancer.",
    "Ce que tu ressens maintenant n’est pas définitif.",
    "Tu peux être à la fois fatigué et courageux.",
    "Ton cœur sait déjà ce qu’il cherche, ton esprit rattrape doucement.",
    "Tu mérites un espace où tu n’as plus à être fort.",
    "Respire : tout ce que tu ne contrôles pas ne t’appartient pas.",
    "Ta valeur ne se mesure pas à ta productivité.",
    "Même les couchers de soleil recommencent chaque jour.",
    "Accepte la vague, tu n’es pas obligé de la maîtriser.",
    "Tu as le droit d’être en transition sans avoir déjà la réponse.",
  ],
  en: [
    "You don’t need to go fast, you just need to move.",
    "What you feel now is not final.",
    "You can be both tired and brave.",
    "Your heart already knows; your mind is slowly catching up.",
    "You deserve a space where you don’t have to be strong.",
    "Breathe: what you can’t control doesn’t belong to you.",
    "Your worth is not measured by productivity.",
    "Even sunsets start over every day.",
    "Let the wave pass, you don’t have to control it.",
    "You’re allowed to be in transition without having the answer yet.",
  ],
};

const translations: Record<Lang, any> = {
  fr: {
    appTitle: "DUALITY • Soulset Navigator",
    tagline:
      "Entre ton futur probable, ton ombre intérieure et une thérapie sunset pour revenir à toi.",
    modeDualityTitle: "DUALITY",
    modeDualityDesc:
      "Analyse ta situation actuelle pour voir ton futur probable (Life Echo) et ce que ton ombre essaie de te dire (ShadowTalk).",
    modeSoulsetTitle: "Soulset Navigator",
    modeSoulsetDesc:
      "Une mini séance de sunset therapy : tu décris ce que tu vis, tu reçois une citation et un coucher de soleil pour t’aider à souffler.",
    goDuality: "Accéder à Duality",
    goSoulset: "Commencer la Sunset Therapy",
    backHome: "← Retour à l’écran d’accueil",
    themeDark: "Sombre",
    themeLight: "Clair",

    // Duality
    dualityTitle: "DUALITY",
    dualityTagline:
      "L’app qui te montre ton futur probable et ce que ton ombre essaie de te dire.",
    personalityTitle: "Mémoire de ta personnalité",
    personalityLabel: "Mémoire active",
    dayLabel: "Décris ce que tu vis ou ressens maintenant :",
    dayPlaceholder:
      "Exemple : Je me sens bloqué, j'hésite à prendre une décision importante...",
    analyze: "Analyser ma Dualité",
    analyzeLoading: "Analyse en cours...",
    errorEmpty: "Écris d'abord quelque chose.",
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
    avatarTitle: "Avatar de ta Dualité",
    avatarLoading: "Génération de ton avatar en cours...",
    avatarMissing:
      "Avatar non généré pour cette session. L’analyse reste disponible.",

    // Soulset
    soulTitle: "Soulset Navigator · Sunset Therapy",
    soulIntro:
      "Écris librement ce que tu traverses. Tu recevras une citation courte et un coucher de soleil pour t’accompagner.",
    soulLabel: "Décris ton état ou ton problème du moment :",
    soulPlaceholder:
      "Exemple : je me sens vidé, j’ai l’impression de tourner en rond, je doute de mes choix...",
    soulButton: "Lancer ma séance",
    soulButtonLoading: "Création de ta séance...",
    soulErrorEmpty: "Partage au moins une phrase sur ce que tu ressens.",
    soulResultTitle: "Ta citation du moment",
    soulResultHint:
      "Garde cette phrase avec toi aujourd’hui. Tu peux relancer une séance quand tu veux.",
    soulMediaLegend: "Sunset choisi au hasard pour t’accompagner.",
    footer:
      "Prototype v1 · Aucune base de données. Les textes restent côté utilisateur.",
  },
  en: {
    appTitle: "DUALITY • Soulset Navigator",
    tagline:
      "Between your probable future, your inner shadow and sunset therapy to come back to yourself.",
    modeDualityTitle: "DUALITY",
    modeDualityDesc:
      "Analyze your current situation to see your probable future (Life Echo) and what your shadow is trying to say (ShadowTalk).",
    modeSoulsetTitle: "Soulset Navigator",
    modeSoulsetDesc:
      "A mini sunset therapy session: describe what you’re going through, receive a quote and a sunset to help you breathe.",
    goDuality: "Go to Duality",
    goSoulset: "Start Sunset Therapy",
    backHome: "← Back to home",
    themeDark: "Dark",
    themeLight: "Light",

    // Duality
    dualityTitle: "DUALITY",
    dualityTagline:
      "The app that shows your probable future and what your shadow is trying to say.",
    personalityTitle: "Your personality memory",
    personalityLabel: "Active memory",
    dayLabel: "Describe what you are living or feeling now:",
    dayPlaceholder:
      "Example: I feel stuck, I hesitate to make an important decision...",
    analyze: "Analyze my Duality",
    analyzeLoading: "Analyzing...",
    errorEmpty: "Write something first.",
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
    avatarTitle: "Your Duality Avatar",
    avatarLoading: "Generating your avatar...",
    avatarMissing:
      "Avatar was not generated for this session. The analysis is still available.",

    // Soulset
    soulTitle: "Soulset Navigator · Sunset Therapy",
    soulIntro:
      "Freely write what you’re going through. You’ll receive a short quote and a sunset to accompany you.",
    soulLabel: "Describe your current state or problem:",
    soulPlaceholder:
      "Example: I feel drained, stuck in the same loop, doubting my choices...",
    soulButton: "Start my session",
    soulButtonLoading: "Creating your session...",
    soulErrorEmpty: "Share at least one sentence about how you feel.",
    soulResultTitle: "Your quote for today",
    soulResultHint:
      "Keep this sentence with you today. You can start another session anytime.",
    soulMediaLegend: "Randomly chosen sunset to accompany you.",
    footer:
      "Prototype v1 · No database. Everything stays on the user side.",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mode, setMode] = useState<Mode>("home");

  // Duality
  const [text, setText] = useState("");
  const [result, setResult] = useState<DualityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);

  // Soulset
  const [soulText, setSoulText] = useState("");
  const [soulQuote, setSoulQuote] = useState<string | null>(null);
  const [soulMedia, setSoulMedia] = useState<SoulsetMedia | null>(null);
  const [soulError, setSoulError] = useState<string | null>(null);
  const [soulLoading, setSoulLoading] = useState(false);

  const t = translations[lang];

  // Lang & theme auto
  useEffect(() => {
    if (typeof window === "undefined") return;

    const userLang = navigator.language?.toLowerCase() || "fr";
    setLang(userLang.startsWith("fr") ? "fr" : "en");

    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
    const initialTheme: "dark" | "light" = prefersDark ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }

  // --- Duality handler ---
  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setAvatarUrl(null);

    if (!text.trim()) {
      setError(t.errorEmpty as string);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/duality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Server error");
      }

      setResult(data as DualityResult);

      // Avatar: on essaye d'appeler l'API /api/avatar mais on gère le 404 proprement
      try {
        setAvatarLoading(true);
        const aRes = await fetch("/api/avatar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (aRes.ok) {
          const aData = await aRes.json();
          if (aData?.url) {
            setAvatarUrl(aData.url as string);
          } else {
            setAvatarUrl(null);
          }
        } else {
          setAvatarUrl(null);
        }
      } catch {
        setAvatarUrl(null);
      } finally {
        setAvatarLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  // --- Soulset handler (locale, sans API) ---
  function handleSoulsetSession(e: React.FormEvent) {
    e.preventDefault();
    setSoulError(null);
    setSoulQuote(null);
    setSoulMedia(null);

    if (!soulText.trim()) {
      setSoulError(t.soulErrorEmpty as string);
      return;
    }

    setSoulLoading(true);

    // simulation d’une petite “analyse” locale
    const quotes = SOULSET_QUOTES[lang];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const allMedia = [...SUNSET_VIDEOS, ...SUNSET_IMAGES];
    const randomMedia = allMedia[Math.floor(Math.random() * allMedia.length)];

    setTimeout(() => {
      setSoulQuote(randomQuote);
      setSoulMedia(randomMedia);
      setSoulLoading(false);
    }, 600); // petit délai pour ressentir la “séance”
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 bg-black text-white">
      {/* HEADER GLOBAL */}
      <header className="w-full max-w-6xl mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#d4af37] flex items-center justify-center text-lg font-semibold">
            Δ
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
              {t.appTitle}
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

      {/* MODE HOME : choix entre Duality & Soulset */}
      {mode === "home" && (
        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Carte Duality */}
          <button
            onClick={() => setMode("duality")}
            className="text-left rounded-3xl border border-[#d4af37] bg-black/80 p-6 md:p-8 hover:bg-[#111111] transition group"
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#d4af37] mb-3">
              Duality
            </p>
            <h2 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-[#f1e3a0]">
              {t.modeDualityTitle}
            </h2>
            <p className="text-sm text-neutral-300 mb-5">
              {t.modeDualityDesc}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] text-black px-4 py-2 text-xs font-semibold group-hover:bg-[#f0cf6b]">
              {t.goDuality}
              <span>↗</span>
            </span>
          </button>

          {/* Carte Soulset */}
          <button
            onClick={() => setMode("soulset")}
            className="text-left rounded-3xl border border-[#22c1c3] bg-gradient-to-br from-[#022c43] via-[#053f5c] to-[#115173] p-6 md:p-8 hover:from-[#032134] hover:via-[#063852] hover:to-[#0e3d60] transition group"
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8df3ff] mb-3">
              Soulset Navigator
            </p>
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#e0fbff] group-hover:text-white">
              {t.modeSoulsetTitle}
            </h2>
            <p className="text-sm text-[#d0f0ff] mb-5">
              {t.modeSoulsetDesc}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 text-[#053f5c] px-4 py-2 text-xs font-semibold group-hover:bg-white">
              {t.goSoulset}
              <span>☾</span>
            </span>
          </button>
        </section>
      )}

      {/* BOUTON RETOUR quand on n’est plus sur l’accueil */}
      {mode !== "home" && (
        <div className="w-full max-w-6xl mt-3 mb-4">
          <button
            onClick={() => setMode("home")}
            className="text-xs text-neutral-400 hover:text-neutral-100 underline-offset-4 hover:underline"
          >
            {t.backHome}
          </button>
        </div>
      )}

      {/* MODE DUALITY */}
      {mode === "duality" && (
        <section className="w-full max-w-6xl space-y-6">
          {/* Intro Duality + petite bulle mémoire (simplifiée ici) */}
          <div className="rounded-3xl border border-[#d4af37] bg-black/80 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              {t.dualityTitle}
            </h2>
            <p className="text-sm text-neutral-300 mb-4">
              {t.dualityTagline}
            </p>
          </div>

          {/* Bloc principal Duality */}
          <div className="rounded-3xl border border-[#d4af37] bg-black/90 p-6 md:p-8 space-y-6">
            {/* Formulaire */}
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
                {loading ? (t.analyzeLoading as string) : (t.analyze as string)}
              </button>
            </form>

            {/* Résultats Duality */}
            <div className="space-y-4">
              {/* Avatar EN PREMIER */}
              <div className="rounded-2xl border border-[#d4af37] bg-black p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-40 md:h-40 flex items-center justify-center">
                  {avatarLoading ? (
                    <div className="w-32 h-32 rounded-full border border-dashed border-[#d4af37] flex items-center justify-center text-[11px] text-neutral-300 text-center px-4">
                      {t.avatarLoading}
                    </div>
                  ) : avatarUrl ? (
                    // l’avatar peut venir de ton API ou être un simple lien d’image
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt="Duality avatar"
                      className="w-32 h-32 rounded-full object-cover shadow-lg shadow-[#d4af37]/40"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border border-neutral-700 flex items-center justify-center text-[11px] text-neutral-400 text-center px-4">
                      {t.avatarMissing}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[#d4af37] mb-1">
                    {t.avatarTitle}
                  </h3>
                  <p className="text-xs text-neutral-300">
                    {lang === "fr"
                      ? "Cet avatar symbolise l’énergie actuelle de ta Dualité. Il est généré à partir de ton texte quand l’API est disponible."
                      : "This avatar symbolizes the current energy of your Duality. It is generated from your text when the API is available."}
                  </p>
                </div>
              </div>

              {/* Cartes Future + Shadow */}
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
            </div>
          </div>
        </section>
      )}

      {/* MODE SOULSET NAVIGATOR */}
      {mode === "soulset" && (
        <section className="w-full max-w-6xl space-y-6">
          <div className="rounded-3xl border border-[#22c1c3] bg-gradient-to-br from-[#022c43] via-[#053f5c] to-[#115173] p-6 md:p-8 text-[#e0fbff]">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              {t.soulTitle}
            </h2>
            <p className="text-sm mb-2">{t.soulIntro}</p>
          </div>

          <div className="rounded-3xl border border-[#22c1c3] bg-[#021724] p-6 md:p-8 space-y-6">
            {/* Formulaire Soulset */}
            <form onSubmit={handleSoulsetSession} className="space-y-3">
              <label className="block text-sm text-[#e0fbff] mb-1">
                {t.soulLabel}
              </label>
              <textarea
                className="w-full h-32 rounded-2xl bg-[#02101a] border border-[#1c4b57] px-4 py-3 text-sm text-[#e0fbff] focus:outline-none focus:ring-2 focus:ring-[#22c1c3] resize-none placeholder:text-[#527b86]"
                placeholder={t.soulPlaceholder}
                value={soulText}
                onChange={(e) => setSoulText(e.target.value)}
              />
              {soulError && (
                <p className="text-xs text-red-300 mt-1">{soulError}</p>
              )}

              <button
                type="submit"
                disabled={soulLoading}
                className="w-full rounded-full bg-[#22c1c3] text-[#022c43] py-2.5 text-sm font-semibold hover:bg-[#3dd5dd] disabled:opacity-60 transition"
              >
                {soulLoading
                  ? (t.soulButtonLoading as string)
                  : (t.soulButton as string)}
              </button>
            </form>

            {/* Résultat Soulset */}
            {(soulQuote || soulMedia) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-[#22c1c3]/60 bg-[#031a26] p-4 flex flex-col">
                  <h3 className="text-sm font-semibold text-[#8df3ff] mb-2">
                    {t.soulResultTitle}
                  </h3>
                  <p className="text-base leading-relaxed text-[#e0fbff] mb-3">
                    {soulQuote}
                  </p>
                  <p className="text-[11px] text-[#7cb6c7] mt-auto">
                    {t.soulResultHint}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#22c1c3]/60 bg-[#031a26] p-4 flex flex-col items-center">
                  {soulMedia && soulMedia.type === "video" && (
                    <video
                      src={soulMedia.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full max-h-64 rounded-2xl object-cover mb-3"
                    />
                  )}
                  {soulMedia && soulMedia.type === "image" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={soulMedia.src}
                      alt="Sunset"
                      className="w-full max-h-64 rounded-2xl object-cover mb-3"
                    />
                  )}
                  <p className="text-[11px] text-[#7cb6c7] text-center">
                    {t.soulMediaLegend}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <footer className="mt-8 text-[10px] text-neutral-500 text-center max-w-4xl">
        {t.footer}
      </footer>
    </main>
  );
}
