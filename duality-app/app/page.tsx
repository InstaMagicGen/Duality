"use client";

import React, { useEffect, useState } from "react";

type Lang = "fr" | "en";

type DualityResult = {
  future: string;
  shadow: string;
};

const SUNSET_VIDEOS = [
  "/sunset/Sunset-1V.mp4",
  "/sunset/Sunset-2V.mp4",
  "/sunset/Sunset-3V.mp4",
  "/sunset/Sunset-4V.mp4",
];

const translations: Record<Lang, any> = {
  fr: {
    appTitle: "DUALITY",
    appTagline:
      "Entre ton futur probable et ton ombre intérieure, avec une parenthèse de sunset therapy.",
    // Choix de mode
    chooseModeTitle: "Choisis ton expérience",
    dualityLabel: "Duality · Futur & Ombre",
    dualityDesc:
      "Analyse ta trajectoire actuelle et ce que ton ombre essaie de te dire.",
    soulsetLabel: "Soulset Navigator · Sunset Therapy",
    soulsetDesc:
      "Un sunset immersif et une phrase miroir pour t’aider à respirer et te recentrer.",

    // Duality
    dualityDayLabel: "Décris ce que tu vis ou ressens maintenant :",
    dualityDayPlaceholder:
      "Exemple : je me sens perdu, j’hésite à prendre une décision importante...",
    dualityAnalyze: "Analyser ma Dualité",
    dualityAnalyzing: "Analyse en cours...",
    dualityErrorEmpty: "Écris d’abord quelque chose.",
    dualityAvatarTitle: "Avatar de ta Dualité",
    dualityAvatarSubtitle:
      "Cet avatar symbolise l’énergie actuelle de ta Dualité. Il est généré à partir de tes mots via fal.ai.",
    dualityAvatarPending:
      "Avatar non généré pour cette session. L’analyse reste disponible.",
    dualityFutureTitle: "LIFE ECHO · Ton futur probable",
    dualityFutureDesc:
      "2 à 4 phrases courtes sur la trajectoire que tu es en train de nourrir.",
    dualityFutureEmpty:
      "Ton futur n’est pas encore généré. Lance une analyse pour le voir.",
    dualityShadowTitle: "SHADOWTALK · Ton ombre intérieure",
    dualityShadowDesc:
      "2 à 4 phrases courtes sur ce que tu évites, répètes ou crées en coulisse.",
    dualityShadowEmpty:
      "Ton ombre ne s’est pas encore exprimée. Lance une analyse pour l’entendre.",

    // Soulset
    soulsetTitle: "Soulset Navigator · Sunset Therapy",
    soulsetIntro:
      "Écris librement ce que tu ressens. Une phrase miroir te sera renvoyée, accompagnée d’un sunset immersif.",
    soulsetLabel: "Décris ton état ou ton problème du moment :",
    soulsetPlaceholder:
      "Exemple : je me sens épuisé, j’ai l’impression de tourner en rond...",
    soulsetAnalyze: "Commencer la Sunset Therapy",
    soulsetAnalyzing: "Génération de ta sunset therapy...",
    soulsetErrorEmpty: "Exprime d’abord ce que tu ressens.",
    soulsetNewSession: "Nouvelle session",
    footerNote:
      "Prototype v1 · Duality & Soulset Navigator. Aucune base de données, tout reste côté utilisateur.",
  },
  en: {
    appTitle: "DUALITY",
    appTagline:
      "Between your probable future and your inner shadow, with a sunset therapy pause.",
    // Mode
    chooseModeTitle: "Choose your experience",
    dualityLabel: "Duality · Future & Shadow",
    dualityDesc:
      "Analyse the path you are feeding and what your shadow is trying to say.",
    soulsetLabel: "Soulset Navigator · Sunset Therapy",
    soulsetDesc:
      "An immersive sunset and a mirroring sentence to help you breathe and recentre.",

    // Duality
    dualityDayLabel: "Describe what you are living or feeling right now:",
    dualityDayPlaceholder:
      "Example: I feel lost, I hesitate to make an important decision...",
    dualityAnalyze: "Analyze my Duality",
    dualityAnalyzing: "Analyzing...",
    dualityErrorEmpty: "Write something first.",
    dualityAvatarTitle: "Avatar of your Duality",
    dualityAvatarSubtitle:
      "This avatar represents the current energy of your Duality. It’s generated from your words via fal.ai.",
    dualityAvatarPending:
      "Avatar not generated for this session yet. The analysis is still available.",
    dualityFutureTitle: "LIFE ECHO · Your probable future",
    dualityFutureDesc:
      "2–4 short sentences about the trajectory you are feeding.",
    dualityFutureEmpty:
      "Your future is not generated yet. Run an analysis to see it.",
    dualityShadowTitle: "SHADOWTALK · Your inner shadow",
    dualityShadowDesc:
      "2–4 short sentences about what you avoid, repeat or create backstage.",
    dualityShadowEmpty:
      "Your shadow hasn’t spoken yet. Run an analysis to hear it.",

    // Soulset
    soulsetTitle: "Soulset Navigator · Sunset Therapy",
    soulsetIntro:
      "Write freely what you feel. A mirroring sentence will be returned, with an immersive sunset.",
    soulsetLabel: "Describe your current state or problem:",
    soulsetPlaceholder:
      "Example: I feel exhausted, it’s like I’m going in circles...",
    soulsetAnalyze: "Start Sunset Therapy",
    soulsetAnalyzing: "Generating your sunset therapy...",
    soulsetErrorEmpty: "Share what you feel first.",
    soulsetNewSession: "New session",
    footerNote:
      "Prototype v1 · Duality & Soulset Navigator. No database, everything stays on the user side.",
  },
};

// Génère une courte quote "thérapeutique" côté client à partir du texte
function buildSoulsetQuote(input: string, lang: Lang): string {
  const base = input.toLowerCase();

  const packs = {
    fr: {
      overwhelm: [
        "Tu n’es pas en retard sur ta vie. Tu es exactement au point où ton cœur te demande enfin d’écouter ce qui ne va plus.",
        "Ce que tu ressens n’est pas une faiblesse, c’est ton corps qui te murmure que tu as besoin de douceur, pas de performance.",
      ],
      lost: [
        "Se sentir perdu, c’est souvent la preuve que l’ancien chapitre est terminé mais que le nouveau n’a pas encore de nom.",
        "Tu as le droit de ne pas savoir. L’important, c’est de rester honnête avec ce que tu ressens, une petite vérité à la fois.",
      ],
      tired: [
        "Tu n’as pas été créé pour survivre en mode urgence permanente. Tu as le droit à la lenteur, au repos, au silence.",
        "Ta fatigue n’est pas un défaut à corriger, c’est un message à accueillir : « quelque chose a besoin de changer ».",
      ],
      generic: [
        "Tu n’es pas seul avec ce que tu ressens. Même si personne ne le voit, ton monde intérieur mérite de la douceur et du respect.",
        "Un pas, même minuscule, reste un pas. Aujourd’hui, le plus grand courage que tu peux avoir, c’est d’être vrai avec toi-même.",
      ],
    },
    en: {
      overwhelm: [
        "You’re not late in your life. You’re exactly where your heart finally asks you to listen to what no longer works.",
        "What you feel is not weakness, it’s your body whispering that you need kindness more than performance.",
      ],
      lost: [
        "Feeling lost is often proof that the old chapter is over but the new one hasn’t been named yet.",
        "You’re allowed not to know. What matters is staying honest with what you feel, one small truth at a time.",
      ],
      tired: [
        "You weren’t made to live in permanent emergency mode. You’re allowed to slow down, rest and breathe.",
        "Your tiredness is not a bug to fix, it’s a message to receive: “something needs to change”.",
      ],
      generic: [
        "You’re not alone with what you feel. Even if no one sees it, your inner world deserves gentleness and respect.",
        "One step, even tiny, is still a step. Today, your biggest courage is to be honest with yourself.",
      ],
    },
  };

  const set = packs[lang];

  const pick = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  if (base.includes("fatigu") || base.includes("tired") || base.includes("épuis"))
    return pick(set.tired);
  if (base.includes("perdu") || base.includes("lost") || base.includes("direction"))
    return pick(set.lost);
  if (
    base.includes("stress") ||
    base.includes("débord") ||
    base.includes("overwhelmed")
  )
    return pick(set.overwhelm);

  return pick(set.generic);
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");

  // Mode : "duality" ou "soulset"
  const [mode, setMode] = useState<"duality" | "soulset">("duality");

  // --- Duality state ---
  const [dualityText, setDualityText] = useState("");
  const [dualityResult, setDualityResult] = useState<DualityResult | null>(null);
  const [dualityLoading, setDualityLoading] = useState(false);
  const [dualityError, setDualityError] = useState<string | null>(null);
  const [hasDualityAnalyzed, setHasDualityAnalyzed] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // --- Soulset state ---
  const [soulText, setSoulText] = useState("");
  const [soulQuote, setSoulQuote] = useState<string | null>(null);
  const [soulVideo, setSoulVideo] = useState<string | null>(null);
  const [soulLoading, setSoulLoading] = useState(false);
  const [soulError, setSoulError] = useState<string | null>(null);

  const t = translations[lang];

  // Langue auto selon système
  useEffect(() => {
    if (typeof window === "undefined") return;
    const userLang = navigator.language?.toLowerCase() || "fr";
    setLang(userLang.startsWith("fr") ? "fr" : "en");
  }, []);

  // ----- Duality : handle analyze -----
  async function handleDualityAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setDualityError(null);

    if (!dualityText.trim()) {
      setDualityError(t.dualityErrorEmpty);
      return;
    }

    try {
      setDualityLoading(true);
      setHasDualityAnalyzed(false);
      setDualityResult(null);
      setAvatarUrl(null);

      // Appel API Duality (Groq ou autre)
      const res = await fetch("/api/duality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: dualityText, lang }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Server error");
      }

      setDualityResult({
        future: data.future ?? "",
        shadow: data.shadow ?? "",
      });

      // Appel séparé à /api/avatar (fal.ai) pour générer l’avatar
      try {
        const avatarRes = await fetch("/api/avatar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: dualityText }),
        });
        const avatarData = await avatarRes.json();
        if (avatarRes.ok && avatarData?.url) {
          setAvatarUrl(avatarData.url as string);
        }
      } catch {
        // on ignore en cas d’erreur d’avatar
      }

      setHasDualityAnalyzed(true);
    } catch (err: any) {
      setDualityError(err.message || "Erreur inconnue.");
    } finally {
      setDualityLoading(false);
    }
  }

  // ----- Soulset Navigator : handle analyze -----
  async function handleSoulsetAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setSoulError(null);

    if (!soulText.trim()) {
      setSoulError(t.soulsetErrorEmpty);
      return;
    }

    try {
      setSoulLoading(true);
      setSoulQuote(null);
      setSoulVideo(null);

      // Analyse simplifiée côté client → génération de quote
      const quote = buildSoulsetQuote(soulText, lang);
      const video =
        SUNSET_VIDEOS[Math.floor(Math.random() * SUNSET_VIDEOS.length)];

      setSoulQuote(quote);
      setSoulVideo(video);
    } finally {
      setSoulLoading(false);
    }
  }

  function resetSoulset() {
    setSoulQuote(null);
    setSoulVideo(null);
    setSoulText("");
    setSoulError(null);
  }

  // --- UI helpers ---
  const premiumCardClass =
    "rounded-3xl border border-[#d4af37]/40 bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden";

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
      {/* HEADER */}
      <header className="w-full max-w-5xl mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-[0.2em]">
            {t.appTitle}
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 mt-2 max-w-2xl">
            {t.appTagline}
          </p>
        </div>

        {/* Choix de mode */}
        <div className="flex gap-2 mt-2 md:mt-0">
          <button
            onClick={() => setMode("duality")}
            className={`px-4 py-2 text-xs rounded-full border transition ${
              mode === "duality"
                ? "border-[#d4af37] bg-[#d4af37] text-black"
                : "border-neutral-700 bg-black hover:border-[#d4af37]/70"
            }`}
          >
            Duality
          </button>
          <button
            onClick={() => setMode("soulset")}
            className={`px-4 py-2 text-xs rounded-full border transition ${
              mode === "soulset"
                ? "border-[#f8f0d9] bg-[#f8f0d9] text-black"
                : "border-neutral-700 bg-black hover:border-[#f8f0d9]/70"
            }`}
          >
            Soulset Navigator
          </button>
        </div>
      </header>

      {/* BANNIÈRE DE CHOIX */}
      <section className="w-full max-w-5xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setMode("duality")}
          className={`relative ${premiumCardClass} p-4 text-left group border-transparent ${
            mode === "duality"
              ? "border-[#d4af37]/60"
              : "border-neutral-800/60"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
          <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mb-1">
            Experience 01
          </p>
          <h2 className="text-sm font-semibold mb-1 text-[#f8f0d9]">
            {t.dualityLabel}
          </h2>
          <p className="text-xs text-neutral-300">{t.dualityDesc}</p>
        </button>

        <button
          onClick={() => setMode("soulset")}
          className={`relative ${premiumCardClass} p-4 text-left group border-transparent ${
            mode === "soulset"
              ? "border-[#f8f0d9]/70"
              : "border-neutral-800/60"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#f8f0d9]/12 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
          <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mb-1">
            Experience 02
          </p>
          <h2 className="text-sm font-semibold mb-1 text-[#f8f0d9]">
            {t.soulsetLabel}
          </h2>
          <p className="text-xs text-neutral-300">{t.soulsetDesc}</p>
        </button>
      </section>

      {/* ----------- MODE DUALITY ----------- */}
      {mode === "duality" && (
        <section className="w-full max-w-5xl space-y-6">
          {/* Carte d'entrée texte */}
          <div className={premiumCardClass}>
            <form onSubmit={handleDualityAnalyze} className="p-6 md:p-8">
              <label className="block text-sm text-neutral-100 mb-2">
                {t.dualityDayLabel}
              </label>
              <textarea
                className="w-full h-32 rounded-2xl bg-black border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] resize-none placeholder:text-neutral-500"
                placeholder={t.dualityDayPlaceholder}
                value={dualityText}
                onChange={(e) => setDualityText(e.target.value)}
              />
              {dualityError && (
                <p className="text-xs text-red-400 mt-2">{dualityError}</p>
              )}
              <button
                type="submit"
                disabled={dualityLoading}
                className="mt-4 w-full rounded-full bg-[#d4af37] text-black py-2.5 text-sm font-semibold hover:bg-[#f0cf6b] disabled:opacity-60 transition"
              >
                {dualityLoading ? t.dualityAnalyzing : t.dualityAnalyze}
              </button>
            </form>
          </div>

          {/* Résultats affichés *uniquement* après analyse */}
          {hasDualityAnalyzed && dualityResult && (
            <div className="space-y-6">
              {/* Avatar */}
              <div className={premiumCardClass}>
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative h-40 w-40 rounded-full bg-gradient-to-br from-[#d4af37]/30 via-black to-black border border-[#d4af37]/60 overflow-hidden flex items-center justify-center">
                    {avatarUrl ? (
                      // Avatar généré par fal.ai
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatarUrl}
                        alt="Avatar Duality"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <p className="text-[11px] text-center text-neutral-300 px-4 leading-relaxed">
                        {t.dualityAvatarPending}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#d4af37] mb-2">
                      {t.dualityAvatarTitle}
                    </h3>
                    <p className="text-xs text-neutral-300">
                      {t.dualityAvatarSubtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Life Echo + ShadowTalk */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={premiumCardClass}>
                  <div className="p-5 md:p-6">
                    <h3 className="text-sm font-semibold text-[#d4af37] mb-1">
                      {t.dualityFutureTitle}
                    </h3>
                    <p className="text-xs text-neutral-400 mb-3">
                      {t.dualityFutureDesc}
                    </p>
                    <div className="text-sm leading-relaxed text-neutral-50 whitespace-pre-line">
                      {dualityResult.future || t.dualityFutureEmpty}
                    </div>
                  </div>
                </div>

                <div className={premiumCardClass}>
                  <div className="p-5 md:p-6">
                    <h3 className="text-sm font-semibold text-[#d4af37] mb-1">
                      {t.dualityShadowTitle}
                    </h3>
                    <p className="text-xs text-neutral-400 mb-3">
                      {t.dualityShadowDesc}
                    </p>
                    <div className="text-sm leading-relaxed text-neutral-50 whitespace-pre-line">
                      {dualityResult.shadow || t.dualityShadowEmpty}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ----------- MODE SOULSET NAVIGATOR ----------- */}
      {mode === "soulset" && (
        <section className="w-full max-w-5xl space-y-6">
          {/* Tant qu’il n’y a pas encore de quote, on affiche la carte d’entrée */}
          {!soulQuote && (
            <div className={premiumCardClass}>
              <div className="p-6 md:p-8">
                <h2 className="text-sm font-semibold text-[#f8f0d9] mb-2">
                  {t.soulsetTitle}
                </h2>
                <p className="text-xs text-neutral-300 mb-4">
                  {t.soulsetIntro}
                </p>

                <form onSubmit={handleSoulsetAnalyze} className="space-y-3">
                  <label className="block text-sm text-neutral-100 mb-1">
                    {t.soulsetLabel}
                  </label>
                  <textarea
                    className="w-full h-32 rounded-2xl bg-black border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#f8f0d9] resize-none placeholder:text-neutral-500"
                    placeholder={t.soulsetPlaceholder}
                    value={soulText}
                    onChange={(e) => setSoulText(e.target.value)}
                  />
                  {soulError && (
                    <p className="text-xs text-red-400 mt-1">{soulError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={soulLoading}
                    className="mt-2 w-full rounded-full bg-[#f8f0d9] text-black py-2.5 text-sm font-semibold hover:bg-white disabled:opacity-60 transition"
                  >
                    {soulLoading ? t.soulsetAnalyzing : t.soulsetAnalyze}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Après analyse : on ne garde que la vidéo + la quote en overlay */}
          {soulQuote && soulVideo && (
            <div className="space-y-4">
              <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-[#f8f0d9]/40">
                <video
                  src={soulVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/25" />
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <p className="max-w-3xl text-center text-lg md:text-2xl font-semibold text-[#f8f0d9] drop-shadow-[0_0_25px_rgba(0,0,0,0.9)]">
                    {soulQuote}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={resetSoulset}
                  className="px-5 py-2 rounded-full border border-[#f8f0d9]/70 text-xs text-[#f8f0d9] hover:bg-[#f8f0d9] hover:text-black transition"
                >
                  {t.soulsetNewSession}
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      <footer className="mt-10 mb-4 text-[10px] text-neutral-500 text-center max-w-4xl">
        {t.footerNote}
      </footer>
    </main>
  );
}
