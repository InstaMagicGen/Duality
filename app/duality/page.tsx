"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en" | "ar";

type DualityResult = {
  future: string;
  shadow: string;
};

type PersonalityTrait = {
  id: string;
  fr: string;
  en: string;
  ar: string;
};

const TRAITS: PersonalityTrait[] = [
  { id: "sensitive", fr: "Sensible", en: "Sensitive", ar: "حساس" },
  { id: "ambitious", fr: "Ambitieux(se)", en: "Ambitious", ar: "طموح" },
  { id: "tired", fr: "Fatigué(e)", en: "Tired", ar: "متعب" },
  { id: "lost", fr: "Perdu(e)", en: "Lost", ar: "ضائع" },
  { id: "creative", fr: "Créatif(ve)", en: "Creative", ar: "مبدع" },
  { id: "control", fr: "Dans le contrôle", en: "Controlling", ar: "مسيطر" },
];

// Détecte la langue du navigateur
function detectLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const l = (navigator.language || "fr").toLowerCase();
  if (l.startsWith("fr") || l.startsWith("ar")) return l.startsWith("ar") ? "ar" : "fr";
  return "en";
}

// Avatar DiceBear
function buildAvatarUrl(text: string, traits: string[]): string {
  const base = (text || "").slice(0, 80);
  const traitsPart = traits.join("-");
  const seed = encodeURIComponent(`${base}__${traitsPart || "no-traits"}`);
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundColor=020617&radius=50`;
}

// 🔹 Variantes pour l'analyse aléatoire
const VARIANTS = {
  tired: {
    fr: [
      "Ton corps crie au repos, mais ton esprit veut continuer.",
      "Chaque pas te semble lourd, pourtant tu avances malgré la fatigue.",
      "Même épuisé(e), tu continues à porter des responsabilités invisibles."
    ],
    en: [
      "Your body is asking for rest, but your mind wants to keep going.",
      "Each step feels heavy, yet you keep moving despite tiredness.",
      "Even exhausted, you keep carrying unseen responsibilities."
    ],
    ar: [
      "جسمك يطلب الراحة، لكن عقلك يريد الاستمرار.",
      "كل خطوة تبدو ثقيلة، ومع ذلك تتقدم رغم التعب.",
      "حتى وأنت متعب، تواصل حمل المسؤوليات غير المرئية."
    ]
  },
  lost: {
    fr: [
      "Tu navigues dans le brouillard, cherchant un sens à tes choix.",
      "Ton chemin n’est pas clair, mais chaque détour t’apprend quelque chose.",
      "Perdu(e) aujourd’hui, tu trouveras demain des réponses inattendues."
    ],
    en: [
      "You navigate through fog, seeking meaning in your choices.",
      "Your path isn't clear, but every detour teaches you something.",
      "Lost today, you will find unexpected answers tomorrow."
    ],
    ar: [
      "تتنقل في الضباب، تبحث عن معنى لاختياراتك.",
      "طريقك غير واضح، لكن كل منعطف يعلمك شيئاً.",
      "ضائع اليوم، ستجد غداً إجابات غير متوقعة."
    ]
  },
  blocked: {
    fr: [
      "Tu sens un mur devant toi, mais il n’existe que dans ta perception.",
      "Les opportunités passent, mais ton moment viendra.",
      "Le blocage est temporaire, chaque petit geste te rapproche du débloquage."
    ],
    en: [
      "You feel a wall ahead, but it exists only in your perception.",
      "Opportunities pass, but your moment will come.",
      "The blockage is temporary; every small step brings you closer to release."
    ],
    ar: [
      "تشعر بجدار أمامك، لكنه موجود فقط في إدراكك.",
      "تمر الفرص، لكن لحظتك ستأتي.",
      "الانسداد مؤقت؛ كل خطوة صغيرة تقربك من التحرر."
    ]
  },
  hopeful: {
    fr: [
      "Ton intuition te guide vers de nouvelles possibilités.",
      "Chaque petit pas conscient construit ton futur aligné.",
      "Ta curiosité te pousse doucement vers ce qui te correspond vraiment."
    ],
    en: [
      "Your intuition guides you towards new possibilities.",
      "Every small conscious step builds your aligned future.",
      "Your curiosity gently pushes you towards what truly fits you."
    ],
    ar: [
      "حدسك يوجهك نحو إمكانيات جديدة.",
      "كل خطوة واعية صغيرة تبني مستقبلك المتناغم.",
      "فضولك يدفعك بلطف نحو ما يناسبك حقًا."
    ]
  }
};

// Fonction aléatoire
function randomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🔹 Génération dynamique et unique de l'analyse
function generateAnalysis(text: string, traits: string[], lang: Lang): DualityResult {
  const lower = text.toLowerCase();
  let futureSentences: string[] = [];
  let shadowSentences: string[] = [];

  if (lower.includes("fatigu") || lower.includes("tired")) {
    futureSentences.push(randomFrom(VARIANTS.tired[lang]));
    shadowSentences.push(randomFrom(VARIANTS.tired[lang]));
  }
  if (lower.includes("perdu") || lower.includes("lost")) {
    futureSentences.push(randomFrom(VARIANTS.lost[lang]));
    shadowSentences.push(randomFrom(VARIANTS.lost[lang]));
  }
  if (lower.includes("bloqu") || lower.includes("block")) {
    futureSentences.push(randomFrom(VARIANTS.blocked[lang]));
    shadowSentences.push(randomFrom(VARIANTS.blocked[lang]));
  }
  if (lower.includes("motivé") || lower.includes("hope") || lower.includes("envie")) {
    futureSentences.push(randomFrom(VARIANTS.hopeful[lang]));
    shadowSentences.push(randomFrom(VARIANTS.hopeful[lang]));
  }

  // Ajouter phrases par traits sélectionnés
  if (traits.includes("creative")) {
    futureSentences.push({
      fr: "Ton côté créatif pourrait te montrer une nouvelle voie inattendue.",
      en: "Your creative side might reveal an unexpected path.",
      ar: "جانبك الإبداعي قد يظهر لك مسارًا غير متوقع."
    }[lang]);
  }
  if (traits.includes("sensitive")) {
    shadowSentences.push({
      fr: "Ta sensibilité te permet de percevoir ce qui échappe aux autres.",
      en: "Your sensitivity lets you perceive what others miss.",
      ar: "حساسيتك تمكنك من إدراك ما يفوته الآخرون."
    }[lang]);
  }

  // Si aucune catégorie détectée
  if (!futureSentences.length) futureSentences.push({
    fr: "Chaque jour est unique, chaque émotion aussi. Observe-toi attentivement pour comprendre ce qui se passe en toi.",
    en: "Each day is unique, each emotion too. Observe yourself carefully to understand what's happening within.",
    ar: "كل يوم فريد، وكل شعور كذلك. راقب نفسك جيدًا لتفهم ما يحدث بداخلك."
  }[lang]);
  if (!shadowSentences.length) shadowSentences.push({
    fr: "Ton monde intérieur est riche et mérite toute ton attention.",
    en: "Your inner world is rich and deserves your full attention.",
    ar: "عالمك الداخلي غني ويستحق اهتمامك الكامل."
  }[lang]);

  return {
    future: futureSentences.join(" "),
    shadow: shadowSentences.join(" ")
  };
}

// --- Le reste de ton code page.tsx reste identique ---
// Remplace simplement l'appel à `analyzeDuality(text, lang)` par `generateAnalysis(text, selectedTraits, lang)`

export default function DualityPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("fr");
  const [text, setText] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [result, setResult] = useState<DualityResult | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cardMode, setCardMode] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [personalityCard, setPersonalityCard] = useState<string | null>(null);

  useEffect(() => {
    setLang(detectLang());
    if (typeof window !== "undefined") {
      const storedTraits = window.localStorage.getItem("duality_traits");
      if (storedTraits) try { const parsed = JSON.parse(storedTraits); if (Array.isArray(parsed)) setSelectedTraits(parsed); } catch {}
      const storedCount = window.localStorage.getItem("duality_sessions_count");
      if (storedCount) { const num = parseInt(storedCount, 10); if (!Number.isNaN(num)) setSessionCount(num); }
      const storedCard = window.localStorage.getItem("duality_personality_card");
      if (storedCard) setPersonalityCard(storedCard);
    }
  }, []);

  function toggleTrait(id: string) {
    setSelectedTraits(prev => {
      let updated: string[];
      if (prev.includes(id)) updated = prev.filter(t => t !== id);
      else { if (prev.length >= 3) return prev; updated = [...prev, id]; }
      if (typeof window !== "undefined") window.localStorage.setItem("duality_traits", JSON.stringify(updated));
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

    if (!text.trim()) { setError(lang === "fr" ? "Écris d'abord quelque chose." : lang === "ar" ? "اكتب شيئًا أولاً." : "Write something first."); return; }

    setLoading(true);
    try {
      const duality = generateAnalysis(text, selectedTraits, lang);
      const avatar = buildAvatarUrl(text, selectedTraits);
      setResult(duality);
      setAvatarUrl(avatar);

      if (typeof window !== "undefined") {
        const storedCount = window.localStorage.getItem("duality_sessions_count");
        const prev = storedCount ? parseInt(storedCount, 10) || 0 : 0;
        const nextCount = prev + 1;
        window.localStorage.setItem("duality_sessions_count", String(nextCount));
        setSessionCount(nextCount);

        if (nextCount >= 2) {
          const card = `Carte personnalisée à partir de cette session.`;
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

  // --- Le reste de ton code pour le rendu JSX reste identique ---
}
