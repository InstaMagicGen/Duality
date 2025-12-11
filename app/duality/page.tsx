"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en";

type DualityResult = {
  future: string;
  shadow: string;
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

function detectLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const l = (navigator.language || "fr").toLowerCase();
  // FR + AR → français, sinon anglais
  if (l.startsWith("fr") || l.startsWith("ar")) return "fr";
  return "en";
}

// Avatar généré gratuitement côté front (DiceBear)
function buildAvatarUrl(text: string, traits: string[]): string {
  const base = (text || "").slice(0, 80);
  const traitsPart = traits.join("-");
  const seed = encodeURIComponent(`${base}__${traitsPart || "no-traits"}`);

  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundColor=020617&radius=50`;
}

// Analyse locale : on simule la conscience de l'utilisateur
function analyzeDuality(text: string, lang: Lang): DualityResult {
  const t = text.toLowerCase();

  const isTired =
    t.includes("fatigu") ||
    t.includes("épuis") ||
    t.includes("burn out") ||
    t.includes("burnout") ||
    t.includes("tired") ||
    t.includes("exhaust");
  const isLost =
    t.includes("perdu") ||
    t.includes("lost") ||
    t.includes("sens") ||
    t.includes("meaning") ||
    t.includes("direction");
  const isOverwhelmed =
    t.includes("pression") ||
    t.includes("stress") ||
    t.includes("stresse") ||
    t.includes("overwhelmed") ||
    t.includes("anxi");
  const isBlocked =
    t.includes("bloqu") ||
    t.includes("block") ||
    t.includes("peur") ||
    t.includes("fear");
  const isHopeful =
    t.includes("espoir") ||
    t.includes("hope") ||
    t.includes("envie") ||
    t.includes("motivé") ||
    t.includes("motivated") ||
    t.includes("changer") ||
    t.includes("change");

  if (lang === "fr") {
    if (isTired || isOverwhelmed) {
      return {
        future:
          "Si tu continues à tout porter comme maintenant, tu avanceras, mais en te vidant peu à peu de ton énergie. Tu risques de dire oui par réflexe, même quand ton corps et ton cœur te crient stop.",
        shadow:
          "Ta conscience te murmure : « Tu sais que tu es fatigué(e), mais tu te forces encore à jouer le rôle de celui/celle qui encaisse tout. Tu as peur de décevoir si tu poses des limites, pourtant c’est toi que tu laisses tomber quand tu ne dis rien. »",
      };
    }
    if (isLost) {
      return {
        future:
          "Si tu continues à avancer sans clarifier ce que tu veux vraiment, tu peux te retrouver dans une vie qui a l’air correcte de l’extérieur mais creuse à l’intérieur.",
        shadow:
          "Ta conscience te dit : « Tu sens déjà que quelque chose ne colle plus, mais tu repousses le moment de l’admettre. Tu as peur de tout recommencer ou de décevoir, alors tu restes dans une zone floue qui t’épuise. »",
      };
    }
    if (isBlocked) {
      return {
        future:
          "En restant dans cette hésitation permanente, tu verras passer des opportunités avec la sensation d’avoir toujours été “presque prêt(e)”.",
        shadow:
          "Ta conscience te souffle : « Tu te protèges tellement de l’échec que tu te prives aussi d’une vraie transformation. Tant que tu attends de ne plus avoir peur, tu attends surtout que ta vie change sans toi. »",
      };
    }
    if (isHopeful) {
      return {
        future:
          "Si tu continues à écouter cette petite voix qui veut mieux pour toi, tu peux doucement créer une trajectoire plus alignée avec ce que tu ressens vraiment.",
        shadow:
          "Ta conscience te confie : « Tu n’as plus envie de jouer le personnage qui s’adapte à tout. Tu as peur d’être ‘trop’ si tu assumes tes vrais besoins, mais rester à l’étroit n’est plus possible pour toi. »",
      };
    }

    return {
      future:
        "Si tu continues exactement comme maintenant, tu peux rester dans une zone tiède : rien n’est catastrophique, mais rien ne nourrit vraiment ton feu intérieur.",
      shadow:
        "Ta conscience te dit : « Tu minimises ce que tu ressens pour ne pas faire de vagues. À force, tu t’éloignes de ce que tu veux vraiment vivre. »",
    };
  } else {
    if (isTired || isOverwhelmed) {
      return {
        future:
          "If you keep carrying everything the way you do now, you’ll move forward but slowly drain your own energy. You may keep saying yes by reflex, even when your body and heart are begging you to stop.",
        shadow:
          "Your inner voice whispers: “You know you’re tired, but you still push yourself to play the one who can handle everything. You’re afraid to disappoint if you set boundaries, yet each time you stay silent, you disappoint yourself first.”",
      };
    }
    if (isLost) {
      return {
        future:
          "If you keep moving without clarifying what you truly want, you might end up in a life that looks fine on the outside but feels hollow on the inside.",
        shadow:
          "Your inner voice says: “You already feel that something doesn’t fit anymore, but you delay the moment you fully admit it. You’re afraid of starting over or disappointing people, so you remain in a blurry zone that quietly drains you.”",
      };
    }
    if (isBlocked) {
      return {
        future:
          "By staying in this constant hesitation, you may watch opportunities pass while feeling like you were always ‘almost ready’.",
        shadow:
          "Your inner voice tells you: “You’re protecting yourself so much from failure that you also shut the door on real transformation. As long as you wait to not be afraid anymore, you’re mostly waiting for life to change without you.”",
      };
    }
    if (isHopeful) {
      return {
        future:
          "If you keep listening to that small voice that wants better for you, you can slowly create a more aligned trajectory.",
        shadow:
          "Your inner voice confides: “You don’t want to keep playing the character who always adjusts to everything. You’re afraid of being ‘too much’ if you own your real needs, yet you also know that staying small is no longer an option.”",
      };
    }

    return {
      future:
        "If you keep going exactly like this, you might stay in a lukewarm space: nothing is truly catastrophic, but nothing deeply feeds you either.",
      shadow:
        "Your inner voice says: “You downplay what you feel to avoid making waves. But each time you ignore yourself, you move a little further away from who you are.”",
    };
  }
}

// Crée une "carte de personnalité" textuelle à partir des traits + type d'analyse
function buildPersonalityCard(
  result: DualityResult,
  traits: string[],
  lang: Lang
): string {
  const hasTired = result.future.toLowerCase().includes("énergie") ||
    result.future.toLowerCase().includes("energy");
  const hasLost = result.future.toLowerCase().includes("creuse") ||
    result.future.toLowerCase().includes("hollow");
  const hasHope =
    result.future.toLowerCase().includes("alignée") ||
    result.future.toLowerCase().includes("aligned");

  const traitLabels =
    traits.length === 0
      ? []
      : TRAITS.filter((t) => traits.includes(t.id)).map((t) =>
          lang === "fr" ? t.fr : t.en
        );

  if (lang === "fr") {
    const base =
      "Carte de personnalité actuelle :\n\nTu es quelqu’un de plus conscient(e) que tu ne le crois. Tu observes déjà tes schémas au lieu de les subir complètement.";
    const traitsLine = traitLabels.length
      ? `\n\nTraits dominants : ${traitLabels.join(" • ")}.`
      : "";

    let color = "";
    if (hasTired)
      color =
        "\n\nÉnergie : souvent en mode survie, tu portes beaucoup sans toujours t’autoriser à relâcher.";
    else if (hasLost)
      color =
        "\n\nDirection : tu es entre deux versions de toi, celle qui rassure tout le monde et celle qui te ressemble vraiment.";
    else if (hasHope)
      color =
        "\n\nTrajectoire : quelque chose en toi refuse que ta vie reste en mode pilote automatique, même si tu avances doucement.";

    const comeback =
      "\n\nCette carte évolue chaque fois que tu reviens. Plus tu reviens, plus elle devient précise.";

    return base + traitsLine + color + comeback;
  } else {
    const base =
      "Current personality card:\n\nYou’re more self-aware than you think. You’re already observing your patterns instead of fully enduring them.";
    const traitsLine = traitLabels.length
      ? `\n\nDominant traits: ${traitLabels.join(" • ")}.`
      : "";

    let color = "";
    if (hasTired)
      color =
        "\n\nEnergy: you often run in survival mode, carrying a lot without always allowing yourself to release.";
    else if (hasLost)
      color =
        "\n\nDirection: you’re between two versions of yourself, the one that reassures everyone and the one that truly feels like you.";
    else if (hasHope)
      color =
        "\n\nTrajectory: something in you refuses to let your life stay on autopilot, even if you move slowly.";

    const comeback =
      "\n\nThis card evolves every time you come back. The more you return, the more precise it gets.";

    return base + traitsLine + color + comeback;
  }
}

export default function DualityPage() {
  const router = useRouter();

  const [lang, setLang] = useState<Lang>("fr");
  const [text, setText] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [result, setResult] = useState<DualityResult | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cardMode, setCardMode] = useState(false); // MODE CARTE TIKTOK
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  const [sessionCount, setSessionCount] = useState(0);
  const [personalityCard, setPersonalityCard] = useState<string | null>(null);

  useEffect(() => {
    setLang(detectLang());

    if (typeof window !== "undefined") {
      const storedTraits = window.localStorage.getItem("duality_traits");
      if (storedTraits) {
        try {
          const parsed = JSON.parse(storedTraits);
          if (Array.isArray(parsed)) setSelectedTraits(parsed);
        } catch {
          // ignore
        }
      }

      const storedCount = window.localStorage.getItem(
        "duality_sessions_count"
      );
      if (storedCount) {
        const num = parseInt(storedCount, 10);
        if (!Number.isNaN(num)) setSessionCount(num);
      }

      const storedCard = window.localStorage.getItem(
        "duality_personality_card"
      );
      if (storedCard) {
        setPersonalityCard(storedCard);
      }
    }
  }, []);

  function toggleTrait(id: string) {
    setSelectedTraits((prev) => {
      if (prev.includes(id)) {
        const updated = prev.filter((t) => t !== id);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "duality_traits",
            JSON.stringify(updated)
          );
        }
        return updated;
      }
      if (prev.length >= 3) return prev;
      const updated = [...prev, id];
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "duality_traits",
          JSON.stringify(updated)
        );
      }
      return updated;
    });
  }

  function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setAvatarUrl(null);
    setShareMessage(null);
    setCardMode(false);

    if (!text.trim()) {
      setError(
        lang === "fr"
          ? "Écris d'abord quelque chose."
          : "Write something first."
      );
      return;
    }

    setLoading(true);
    try {
      const duality = analyzeDuality(text, lang);
      const avatar = buildAvatarUrl(text, selectedTraits);
      setResult(duality);
      setAvatarUrl(avatar);

      // Incrémenter le compteur de sessions
      if (typeof window !== "undefined") {
        const storedCount =
          window.localStorage.getItem("duality_sessions_count");
        const prev = storedCount ? parseInt(storedCount, 10) || 0 : 0;
        const nextCount = prev + 1;
        window.localStorage.setItem(
          "duality_sessions_count",
          String(nextCount)
        );
        setSessionCount(nextCount);

        // Mettre à jour la carte de personnalité à partir de la 2e session
        if (nextCount >= 2) {
          const card = buildPersonalityCard(duality, selectedTraits, lang);
          window.localStorage.setItem("duality_personality_card", card);
          setPersonalityCard(card);
        }
      }
    } catch (err: any) {
      setError(err?.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    if (!result) return;

    const isFr = lang === "fr";
    const url =
      typeof window !== "undefined" ? window.location.href : undefined;

    const shareText = isFr
      ? `Mon scan Duality 🌓

Life Echo (futur probable) :
${result.future}

Shadowtalk (ombre intérieure) :
${result.shadow}`
      : `My Duality scan 🌓

Life Echo (probable future):
${result.future}

Shadowtalk (inner shadow):
${result.shadow}`;

    try {
      const nav = typeof navigator !== "undefined" ? (navigator as any) : null;
      if (nav && typeof nav.share === "function") {
        await nav.share({
          title: "Duality • Soulset Journey",
          text: shareText,
          url,
        });
        setShareMessage(isFr ? "Partagé ✅" : "Shared ✅");
      } else if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(url || "");
        setShareMessage(
          isFr
            ? "Lien de la page copié dans le presse-papier."
            : "Page link copied to clipboard."
        );
      } else {
        setShareMessage(
          isFr
            ? "Partage non supporté sur ce navigateur."
            : "Sharing not supported on this browser."
        );
      }

      if (shareMessage) {
        setTimeout(() => setShareMessage(null), 2500);
      }
    } catch (err) {
      setShareMessage(
        lang === "fr"
          ? "Impossible de partager."
          : "Unable to share right now."
      );
    }
  }

  const isFr = lang === "fr";

  // 🔶 MODE CARTE TIKTOK : plein écran, format 9:16, pour capture + partage
  if (result && cardMode) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-6">
        <div className="relative w-full max-w-sm aspect-[9/16] rounded-3xl border border-[#d4af37]/70 bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.35)]">
          {/* Barre top dans la carte */}
          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
            <button
              onClick={() => setCardMode(false)}
              className="text-[10px] text-neutral-200 bg-black/60 px-2.5 py-1 rounded-full border border-neutral-500/70 backdrop-blur"
            >
              {isFr ? "Retour" : "Back"}
            </button>

            <div className="flex items-center gap-2">
              {shareMessage && (
                <span className="text-[9px] text-amber-100 bg-black/60 px-2 py-0.5 rounded-full border border-amber-300/70">
                  {shareMessage}
                </span>
              )}
              <button
                onClick={handleShare}
                className="text-[11px] text-amber-50 inline-flex items-center gap-1 bg-black/55 px-2.5 py-1 rounded-full border border-[#d4af37]/70 backdrop-blur hover:bg-[#d4af37] hover:text-black transition"
              >
                <span>📤</span>
                <span>{isFr ? "Partager" : "Share"}</span>
              </button>
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-between px-4 py-5">
            <div className="w-full flex justify-center mt-6">
              <div className="h-24 w-24 rounded-full border border-[#d4af37]/80 bg-black/80 overflow-hidden flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.6)]">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt="Avatar Duality"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-neutral-400 px-2 text-center">
                    Avatar
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center w-full">
              <div className="w-full text-center space-y-3 px-1">
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#f5e7a8]/90">
                  Duality • Life Echo
                </p>
                <p className="text-xs text-neutral-200 whitespace-pre-line leading-relaxed">
                  {result.future}
                </p>

                <div className="h-px w-16 bg-[#d4af37]/70 mx-auto my-2" />

                <p className="text-[10px] uppercase tracking-[0.32em] text-[#f5e7a8]/90">
                  Shadowtalk
                </p>
                <p className="text-xs text-neutral-200 whitespace-pre-line leading-relaxed">
                  {result.shadow}
                </p>
              </div>
            </div>

            <div className="w-full text-center pb-2">
              <p className="text-[9px] text-neutral-400">
                {isFr
                  ? "Capture ou partage cette carte sur TikTok / Instagram."
                  : "Screenshot or share this card on TikTok / Instagram."}
              </p>
              <p className="text-[9px] text-neutral-500 mt-1">
                duality • soulset journey
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 🔷 VUE NORMALE
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white px-4 py-6">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-6 flex items-center justify-between gap-4">
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
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-300">
            Duality
          </p>
          <p className="text-xs text-slate-400">
            {isFr
              ? "Futur probable & ombre intérieure"
              : "Probable future & inner shadow"}
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Traits */}
        <section className="rounded-3xl border border-amber-500/40 bg-black/80 backdrop-blur px-5 py-5 md:px-7 md:py-6">
          <h2 className="text-sm font-semibold text-[#d4af37] mb-2">
            {isFr
              ? "Mémoire de ta personnalité"
              : "Your personality memory"}
          </h2>
          <p className="text-xs text-neutral-300 mb-4">
            {isFr
              ? "Choisis jusqu’à 3 traits qui te ressemblent aujourd’hui. Ils seront mémorisés sur ton appareil."
              : "Choose up to 3 traits that fit you today. They are stored locally on your device."}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {TRAITS.map((trait) => {
              const active = selectedTraits.includes(trait.id);
              const label = isFr ? trait.fr : trait.en;
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

          <p className="text-[11px] text-neutral-400">
            <span className="text-[#d4af37] font-semibold">
              {isFr ? "Mémoire active :" : "Active memory:"}{" "}
            </span>
            {selectedTraits.length
              ? TRAITS.filter((tr) => selectedTraits.includes(tr.id))
                  .map((tr) => (isFr ? tr.fr : tr.en))
                  .join(" • ")
              : isFr
              ? "aucun trait sélectionné."
              : "no trait selected."}
          </p>
        </section>

        {/* Formulaire */}
        <section className="rounded-3xl border border-amber-500/50 bg-black/80 backdrop-blur px-5 py-6 md:px-7 md:py-7 shadow-[0_0_60px_rgba(212,175,55,0.25)]">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            {isFr
              ? "Écris ce que tu vis maintenant"
              : "Write what you’re going through now"}
          </h1>
          <p className="text-sm text-slate-300 mb-4">
            {isFr
              ? "Quelques lignes suffisent. Duality renverra deux miroirs : Life Echo (ta trajectoire probable) et Shadowtalk (ce que ton ombre essaie de te dire)."
              : "A few lines are enough. Duality will return two mirrors: Life Echo (probable path) and Shadowtalk (what your shadow is trying to say)."}
          </p>

          <form onSubmit={handleAnalyze} className="space-y-3">
            <textarea
              className="w-full h-32 md:h-40 rounded-2xl bg-black/80 border border-slate-700 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70 placeholder:text-slate-500"
              placeholder={
                isFr
                  ? "Exemple : Je me sens bloqué, j’ai l’impression de répéter les mêmes schémas..."
                  : "Example: I feel stuck, like I keep repeating the same patterns..."
              }
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {error && (
              <p className="text-xs text-red-400 whitespace-pre-line">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#d4af37] text-black py-2.5 text-sm font-semibold hover:bg-[#f0cf6b] disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading
                ? isFr
                  ? "Analyse en cours..."
                  : "Analyzing..."
                : isFr
                ? "Analyser ma Dualité"
                : "Analyze my Duality"}
            </button>
          </form>
        </section>

        {/* Avatar + Résultats */}
        {result && (
          <>
            {/* Avatar + TikTok uniquement */}
            <section className="w-full max-w-5xl mx-auto">
              <div className="flex flex-col items-center justify-center rounded-[32px] border border-[#d4af37]/60 bg-black/70 px-6 py-8 md:py-10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                <div className="relative h-48 w-48 rounded-full border border-[#d4af37]/80 bg-black/80 overflow-hidden flex items-center justify-center mb-5">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt="Avatar de ta Dualité"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <p className="text-xs text-neutral-400 text-center px-4">
                      Avatar non généré pour cette session.
                    </p>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-[#d4af37] mb-1">
                  {isFr
                    ? "Avatar symbolique de ta Dualité"
                    : "Symbolic avatar of your Duality"}
                </h2>
                <p className="text-xs text-neutral-300 max-w-md text-center mb-4">
                  {isFr
                    ? "Cet avatar est généré automatiquement à partir de tes mots et de tes traits. Il illustre ton énergie intérieure du moment."
                    : "This avatar is generated automatically from your words and traits. It illustrates your inner energy right now."}
                </p>

                <button
                  onClick={() => setCardMode(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-black/60 px-4 py-1.5 text-xs font-medium text-[#f5e7a8] hover:bg-black hover:border-[#f5e7a8] transition"
                >
                  <span>🎴</span>
                  <span>
                    {isFr
                      ? "Ouvrir la carte TikTok"
                      : "Open TikTok card"}
                  </span>
                </button>
              </div>
            </section>

            {/* Futur & Shadow */}
            <section className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="bg-black/80 border border-[#d4af37]/50 rounded-3xl p-6 md:p-7 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
                <h2 className="text-sm font-semibold text-[#d4af37] mb-2">
                  LIFE ECHO ·{" "}
                  {isFr ? "Ton futur probable" : "Your probable future"}
                </h2>
                <p className="text-xs text-neutral-400 mb-3">
                  {isFr
                    ? "Comme si ta propre conscience te parlait de la trajectoire que tu nourris si rien ne change."
                    : "As if your own conscience was speaking about the path you’re feeding if nothing changes."}
                </p>
                <p className="text-sm text-neutral-50 whitespace-pre-line leading-relaxed">
                  {result.future}
                </p>
              </div>

              <div className="bg-black/80 border border-[#d4af37]/50 rounded-3xl p-6 md:p-7 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
                <h2 className="text-sm font-semibold text-[#d4af37] mb-2">
                  SHADOWTALK ·{" "}
                  {isFr ? "Ton ombre intérieure" : "Your inner shadow"}
                </h2>
                <p className="text-xs text-neutral-400 mb-3">
                  {isFr
                    ? "Comme si ta part d’ombre te parlait franchement de ce que tu évites, répètes ou auto-sabotes."
                    : "As if your shadow was honestly speaking about what you avoid, repeat or self-sabotage."}
                </p>
                <p className="text-sm text-neutral-50 whitespace-pre-line leading-relaxed">
                  {result.shadow}
                </p>
              </div>
            </section>

            {/* 🧠 Carte de personnalité (après 2 sessions) */}
            {personalityCard && sessionCount >= 2 && (
              <section className="max-w-5xl mx-auto">
                <div className="mt-6 rounded-3xl border border-amber-500/45 bg-gradient-to-br from-black via-slate-950 to-amber-950/20 px-6 py-6 md:px-7 md:py-7 shadow-[0_0_70px_rgba(212,175,55,0.22)]">
                  <div className="flex items-center justify-between mb-3 gap-3">
                    <h3 className="text-sm font-semibold text-[#f5e7a8]">
                      {isFr
                        ? "Ta carte de personnalité Duality"
                        : "Your Duality personality card"}
                    </h3>
                    <span className="text-[10px] text-neutral-400">
                      {isFr
                        ? `Sessions analysées sur cet appareil : ${sessionCount}`
                        : `Sessions analyzed on this device: ${sessionCount}`}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 whitespace-pre-line leading-relaxed">
                    {personalityCard}
                  </p>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
