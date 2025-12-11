"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "../lib/supabaseClient";

// import dynamique du composant MoodDashboard (ssr: false)
const MoodDashboard = dynamic(() => import("./components/MoodDashboard"), {
  ssr: false,
});

type Lang = "fr" | "en" | "ar";

type SessionUser = {
  id: string;
  email: string | null;
};

type MoodLevel = 1 | 2 | 3 | 4 | 5;

type MoodLog = {
  id: string;
  createdAt: string;
  level: MoodLevel;
  note: string;
};

const translations: Record<Lang, any> = {
  fr: {
    mainTitle: "Soulset Journeys",
    mainSubtitle:
      "Deux expériences guidées : Duality pour voir ton futur probable, Soulset Navigator pour scanner ta journée sur un coucher de soleil.",
    dualityTitle: "DUALITY · Futur probable",
    dualityDesc:
      "Tu écris ce que tu vis, Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (ta conscience profonde).",
    soulsetTitle: "SOULSET NAVIGATOR · Sunset Therapy",
    soulsetDesc:
      "Décris ton état du moment, puis laisse une phrase miroir courte se projeter sur un coucher de soleil apaisant.",
    openDuality: "Ouvrir Duality",
    openSoulset: "Commencer la Sunset Therapy",
    moodTitle: "Suivi de mood",
    moodQuestion: "Comment tu te sens aujourd’hui ?",
    moodLabel: "Note ton humeur (1 = très bas · 5 = très bien)",
    moodPlaceholder:
      'Écris quelques mots sur ton ressenti du jour. Exemple : "Beaucoup de pression au travail, je me sens épuisé."',
    moodHistoryTitle:
      "Tes derniers moods (stockés localement sur cet appareil pour l’instant).",
    moodSubmit: "Enregistrer",
    authLoggedAs: "Connecté en tant que",
    logout: "Déconnexion",
    headerLogin: "Connexion",
    headerSignup: "Créer un compte",
    moodLockedTitle: "Active ton suivi de mood",
    moodLockedBody:
      "Après chaque session, connecte-toi pour sauvegarder ton humeur et suivre l’évolution de ton état intérieur.",
    moodLockedButton: "Se connecter pour voir la carte de mood",
  },
  en: {
    mainTitle: "Soulset Journeys",
    mainSubtitle:
      "Two guided journeys: Duality to explore your probable future, Soulset Navigator to scan your day on a sunset.",
    dualityTitle: "DUALITY · Probable future",
    dualityDesc:
      "You type what you’re going through, Duality returns a LIFE ECHO (probable future) and a SHADOWTALK (your inner voice).",
    soulsetTitle: "SOULSET NAVIGATOR · Sunset Therapy",
    soulsetDesc:
      "Describe how you feel right now, then receive a short mirror sentence projected on a calming sunset.",
    openDuality: "Open Duality",
    openSoulset: "Start Sunset Therapy",
    moodTitle: "Mood tracking",
    moodQuestion: "How do you feel today?",
    moodLabel: "Rate your mood (1 = very low · 5 = very good)",
    moodPlaceholder:
      'Write a few words about your day. Example: "Heavy day, lots of pressure at work, I feel drained."',
    moodHistoryTitle: "Your recent moods (stored locally on this device for now).",
    moodSubmit: "Save",
    authLoggedAs: "Signed in as",
    logout: "Sign out",
    headerLogin: "Sign in",
    headerSignup: "Create account",
    moodLockedTitle: "Unlock your mood tracking",
    moodLockedBody:
      "After each session, sign in to save your mood and follow the evolution of your inner state.",
    moodLockedButton: "Sign in to view the mood card",
  },
  ar: {
    mainTitle: "رحلة السولسِت",
    mainSubtitle:
      "تجربتان موجهتان: Duality لرؤية مستقبلك المحتمل، وSoulset Navigator لمسح يومك على غروب هادئ.",
    dualityTitle: "DUALITY · المستقبل المحتمل",
    dualityDesc:
      "اكتب ما تعيشه الآن لتحصل على LIFE ECHO (مستقبل محتمل) و SHADOWTALK (صوتك الداخلي).",
    soulsetTitle: "SOULSET NAVIGATOR · علاج الغروب",
    soulsetDesc:
      "صف حالتك الآن، ودع عبارة عاكسة قصيرة تظهر على غروب شمس مهدئ.",
    openDuality: "فتح Duality",
    openSoulset: "ابدأ جلسة الغروب",
    moodTitle: "بطاقة متابعة المزاج",
    moodQuestion: "كيف تشعر اليوم؟",
    moodLabel: "قيّم مزاجك (1 = منخفض جداً · 5 = ممتاز)",
    moodPlaceholder:
      'اكتب بعض الكلمات عن يومك. مثال: "يوم متعب وضغط عمل كبير، أشعر بالإرهاق".',
    moodHistoryTitle: "آخر حالات المزاج (محفوظة محلياً على هذا الجهاز حالياً).",
    moodSubmit: "حفظ",
    authLoggedAs: "متصل كـ",
    logout: "تسجيل الخروج",
    headerLogin: "تسجيل الدخول",
    headerSignup: "إنشاء حساب",
    moodLockedTitle: "فعّل بطاقة متابعة المزاج",
    moodLockedBody:
      "بعد كل جلسة، سجّل الدخول لحفظ مزاجك ومتابعة تطوّر حالتك الداخلية.",
    moodLockedButton: "تسجيل الدخول لعرض بطاقة المزاج",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = translations[lang];

  const [user, setUser] = useState<SessionUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [moodLevel, setMoodLevel] = useState<MoodLevel>(3);
  const [moodNote, setMoodNote] = useState("");
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [showMoodDashboard, setShowMoodDashboard] = useState(false);

  // Détecter langue du navigateur
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const l = navigator.language?.toLowerCase() ?? "fr";
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  // Supabase session corrigé
  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) console.warn("getSession error", error);
        const supUser = session?.user;
        if (mounted && supUser) {
          setUser({ id: supUser.id, email: supUser.email ?? null });
        }
      } catch (err) {
        console.warn("initSession err", err);
      }

      const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
        if (!mounted) return;
        if (sess?.user) setUser({ id: sess.user.id, email: sess.user.email ?? null });
        else setUser(null);
      });

      return () => {
        mounted = false;
        listener.subscription.unsubscribe();
      };
    }

    initSession();
  }, []);

  // mood localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("soulset_moods");
    if (stored) setMoodLogs(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("soulset_moods", JSON.stringify(moodLogs));
  }, [moodLogs]);

  function handleSaveMood() {
    if (!moodNote.trim()) return;
    const newLog: MoodLog = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      level: moodLevel,
      note: moodNote.trim(),
    };
    setMoodLogs((prev) => [newLog, ...prev].slice(0, 10));
    setMoodNote("");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-neutral-400">
        <span className="animate-pulse text-sm">Soulset Journeys…</span>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white flex flex-col items-center px-4 py-6">
        {/* HEADER */}
        {/* ... ton header et cartes ... */}
        
        {/* MoodDashboard modal */}
        {showMoodDashboard && <MoodDashboard initial={moodLogs} enableSupabaseSync={true} />}
      </main>
    </>
  );
}
