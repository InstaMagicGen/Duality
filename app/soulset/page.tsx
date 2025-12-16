"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en" | "ar";

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

// Détecte la langue
function detectLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const l = (navigator.language || "fr").toLowerCase();
  if (l.startsWith("fr")) return "fr";
  if (l.startsWith("ar")) return "ar";
  return "en";
}

// Variantes de quotes aléatoires selon l'état
const QUOTE_VARIANTS = {
  tired: {
    fr: [
      "Tu as le droit de te reposer avant de prouver à nouveau que tu tiens le coup.",
      "Même fatigué(e), chaque petit pas te rapproche de ton équilibre.",
      "Ton corps demande une pause, écoute-le avec bienveillance."
    ],
    en: [
      "You’re allowed to rest before proving once again that you can handle everything.",
      "Even tired, each small step brings you closer to balance.",
      "Your body asks for a pause; listen to it kindly."
    ],
    ar: [
      "يحق لك أن ترتاح قبل أن تثبت مرة أخرى أنك قادر على المواصلة.",
      "حتى عند شعورك بالتعب، كل خطوة صغيرة تقربك من التوازن.",
      "جسمك يحتاج إلى استراحة، استمع إليه بلطف."
    ]
  },
  lost: {
    fr: [
      "Tu n’es pas en retard, tu es simplement à l’endroit où ton ancienne vie et la nouvelle se croisent.",
      "Être perdu(e) est une étape pour trouver ton vrai chemin.",
      "Chaque hésitation te guide doucement vers la clarté."
    ],
    en: [
      "You’re not late, you’re simply standing where your old life and your new one intersect.",
      "Being lost is a step to finding your true path.",
      "Each hesitation gently guides you toward clarity."
    ],
    ar: [
      "أنت لست متأخرًا، أنت ببساطة في المكان الذي يلتقي فيه حياتك القديمة والجديدة.",
      "الضياع هو خطوة لإيجاد طريقك الحقيقي.",
      "كل تردد يوجهك بلطف نحو الوضوح."
    ]
  },
  overwhelmed: {
    fr: [
      "Tu peux poser un poids à la fois sans devoir justifier ta fatigue.",
      "Chaque respiration est un pas vers la sérénité.",
      "Tout ne dépend pas de toi, laisse certaines choses glisser."
    ],
    en: [
      "You can put one weight down without having to justify your exhaustion.",
      "Each breath is a step towards serenity.",
      "Not everything depends on you; let some things slide."
    ],
    ar: [
      "يمكنك وضع عبء واحد جانبًا دون الحاجة لتبرير تعبك.",
      "كل نفس هو خطوة نحو الصفاء.",
      "ليس كل شيء يعتمد عليك، اترك بعض الأمور تمضي."
    ]
  },
  neutral: {
    fr: [
      "Tu n’as pas besoin de tout comprendre pour avancer d’un demi-pas.",
      "Chaque instant est une chance d’observer ce qui se passe en toi.",
      "La simplicité de l’instant présent est déjà une victoire."
    ],
    en: [
      "You don’t need to understand everything to move half a step forward.",
      "Each moment is a chance to observe what’s happening within you.",
      "The simplicity of the present moment is already a victory."
    ],
    ar: [
      "لا تحتاج إلى فهم كل شيء لتخطو نصف خطوة إلى الأمام.",
      "كل لحظة فرصة لمراقبة ما يحدث بداخلك.",
      "بساطة اللحظة الحالية هي بالفعل انتصار."
    ]
  }
};

// Fonction pour choisir une quote aléatoire
function randomQuote(quotes: string[]): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Génération dynamique et aléatoire d'une phrase miroir
function generateSoulsetQuote(text: string, lang: Lang): string {
  const t = text.toLowerCase();

  const isTired = t.includes("fatigu") || t.includes("épuis") || t.includes("tired") || t.includes("exhaust");
  const isLost = t.includes("perdu") || t.includes("lost") || t.includes("sens") || t.includes("meaning");
  const isOverwhelmed = t.includes("stress") || t.includes("pression") || t.includes("overwhelmed") || t.includes("anxi");

  if (isTired) return randomQuote(QUOTE_VARIANTS.tired[lang]);
  if (isLost) return randomQuote(QUOTE_VARIANTS.lost[lang]);
  if (isOverwhelmed) return randomQuote(QUOTE_VARIANTS.overwhelmed[lang]);
  return randomQuote(QUOTE_VARIANTS.neutral[lang]);
}

export default function SoulsetPage() {
  const router = useRouter();

  const [lang, setLang] = useState<Lang>("fr");
  const [text, setText] = useState("");
  const [result, setResult] = useState<SoulsetResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);

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
    setShareMessage(null);

    if (!text.trim()) {
      setError(lang === "fr" ? "Décris d’abord ton état ou ta journée." : lang === "ar" ? "صف حالتك أو يومك أولاً." : "Describe your state or your day first.");
      return;
    }

    setLoading(true);
    try {
      const quote = generateSoulsetQuote(text, lang);
      setResult({ quote, background: pickRandomBackground() });
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    if (!result) return;

    const isFr = lang === "fr";
    const isAr = lang === "ar";
    const url = typeof window !== "undefined" ? window.location.href : undefined;
    const shareText = isFr
      ? `Ma Sunset Therapy 🌅\n\nPhrase miroir :\n${result.quote}`
      : isAr
      ? `علاجي عند الغروب 🌅\n\nجملة مرآة:\n${result.quote}`
      : `My Sunset Therapy 🌅\n\nMirror sentence:\n${result.quote}`;

    try {
      const nav = typeof navigator !== "undefined" ? (navigator as any) : null;
      if (nav && typeof nav.share === "function") {
        await nav.share({ title: "Soulset Navigator • Sunset Therapy", text: shareText, url });
        setShareMessage(isFr ? "Partagé ✅" : isAr ? "تم المشاركة ✅" : "Shared ✅");
      } else if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(url || "");
        setShareMessage(isFr ? "Lien copié ✅" : isAr ? "تم نسخ الرابط ✅" : "Page link copied ✅");
      } else {
        setShareMessage(isFr ? "Partage non supporté." : isAr ? "المشاركة غير مدعومة." : "Sharing not supported.");
      }
    } catch {
      setShareMessage(isFr ? "Impossible de partager." : isAr ? "تعذر المشاركة الآن." : "Unable to share right now.");
    }
  }

  const isFr = lang === "fr";
  const isAr = lang === "ar";

  const directionClass = isAr ? "rtl text-right" : "ltr text-left";

  if (result) {
    const isVideo = result.background.toLowerCase().endsWith(".mp4");
    return (
      <main className={`relative h-screen w-screen overflow-hidden bg-black text-white ${directionClass}`}>
        {isVideo ? <video src={result.background} className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline /> : <img src={result.background} alt="Sunset" className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/80" />
        <div className="relative z-10 flex flex-col h-full">
          <header className="flex items-center justify-between px-4 pt-4">
            <button onClick={() => setResult(null)} className="text-xs text-slate-200 hover:text-white inline-flex items-center gap-2 bg-black/35 px-3 py-1 rounded-full border border-slate-500/60 backdrop-blur">
              <span className="inline-block h-4 w-4 rounded-full border border-slate-400 flex items-center justify-center text-[10px]">←</span>
              {isFr ? "Revenir à la saisie" : isAr ? "العودة للإدخال" : "Back to input"}
            </button>

            <div className="flex items-center gap-2">
              {shareMessage && <span className="text-[10px] text-slate-100 bg-black/40 px-2 py-1 rounded-full border border-slate-400/60">{shareMessage}</span>}
              <button onClick={handleShare} className="text-[11px] text-sky-50 inline-flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full border border-sky-300/70 backdrop-blur hover:bg-sky-500 hover:text-black hover:border-sky-200 transition">
                <span>📤</span>
                <span>{isFr ? "Partager" : isAr ? "مشاركة" : "Share"}</span>
              </button>
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center px-4 pb-12">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs text-sky-200/80 mb-3 uppercase tracking-[0.28em]">{isFr ? "Sunset Therapy" : isAr ? "علاج الغروب" : "Sunset Therapy"}</p>
              <p className="text-2xl md:text-3xl font-medium text-slate-50 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] whitespace-pre-line leading-relaxed">{result.quote}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 px-4 py-5 ${directionClass}`}>
      <header className="max-w-4xl mx-auto mb-6 flex items-center justify-between gap-4">
        <button onClick={() => router.push("/")} className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-2">
          <span className="inline-block h-4 w-4 rounded-full border border-slate-500 flex items-center justify-center text-[10px]">←</span>
          {isFr ? "Retour à l’accueil" : isAr ? "العودة للصفحة الرئيسية" : "Back to home"}
        </button>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.3em] text-sky-300">Soulset Navigator</p>
          <p className="text-xs text-sky-200/70">{isFr ? "Sunset Therapy · phrase miroir + coucher de soleil" : isAr ? "علاج الغروب · جملة مرآة + غروب الشمس" : "Sunset Therapy · mirror sentence + sunset"}</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <section className="rounded-3xl border border-sky-400/35 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/35 px-6 py-6 md:px-7 md:py-7 shadow-[0_0_70px_rgba(56,189,248,0.25)] backdrop-blur-xl">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">{isFr ? "Scan ta journée" : isAr ? "افحص يومك" : "Scan your day"}</h1>
          <p className="text-sm text-slate-200 mb-4">{isFr ? "Décris ton état du moment..." : isAr ? "صف حالتك الحالية..." : "Describe how you feel..."}</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-xs font-medium uppercase tracking-[0.2em] text-sky-100/80 mb-1">{isFr ? "Ton résumé du moment" : isAr ? "حالتك الحالية" : "Your current state"}</label>
            <textarea className="w-full h-32 md:h-40 rounded-2xl bg-black/40 border border-sky-500/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/80 placeholder:text-slate-400" placeholder={isFr ? "Exemple : Journée chargée..." : isAr ? "مثال: يوم مزدحم..." : "Example: Busy day..."} value={text} onChange={(e) => setText(e.target.value)} />

            {error && <p className="text-xs text-rose-300 whitespace-pre-line">{error}</p>}

            <button type="submit" disabled={loading} className="mt-1 w-full rounded-full bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/40 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition">{loading ? (isFr ? "Analyse en cours..." : isAr ? "جار التحليل..." : "Analyzing...") : (isFr ? "Commencer la Sunset Therapy" : isAr ? "ابدأ علاج الغروب" : "Start Sunset Therapy")}</button>
          </form>
        </section>
      </div>
    </main>
  );
}
