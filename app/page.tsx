"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "../lib/supabaseClient";

const MoodDashboard = dynamic(() => import("./components/MoodDashboard"), { ssr: false });

type Lang = "fr" | "en" | "ar";

type SessionUser = { id: string; email: string | null; };

type MoodLevel = 1 | 2 | 3 | 4 | 5;
type MoodLog = { id: string; createdAt: string; level: MoodLevel; note: string; };

const translations: Record<Lang, any> = {
  fr: {
    mainTitle: "Soulset Journeys",
    mainSubtitle: "Deux expériences guidées : Duality pour voir ton futur probable, Soulset Navigator pour scanner ta journée sur un coucher de soleil.",
    dualityTitle: "DUALITY · Futur probable",
    dualityDesc: "Tu écris ce que tu vis, Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (ta conscience profonde).",
    soulsetTitle: "SOULSET NAVIGATOR · Sunset Therapy",
    soulsetDesc: "Décris ton état du moment, puis laisse une phrase miroir courte se projeter sur un coucher de soleil apaisant.",
    openDuality: "Ouvrir Duality",
    openSoulset: "Commencer la Sunset Therapy",
    moodTitle: "Suivi de mood",
    moodQuestion: "Comment tu te sens aujourd’hui ?",
    moodLabel: "Note ton humeur (1 = très bas · 5 = très bien)",
    moodPlaceholder: 'Écris quelques mots sur ton ressenti du jour.',
    moodHistoryTitle: "Tes derniers moods (stockés localement).",
    moodSubmit: "Enregistrer",
    authLoggedAs: "Connecté en tant que",
    logout: "Déconnexion",
    headerLogin: "Connexion",
    headerSignup: "Créer un compte",
    moodLockedTitle: "Active ton suivi de mood",
    moodLockedBody: "Après chaque session, connecte-toi pour sauvegarder ton humeur et suivre l’évolution de ton état intérieur.",
    moodLockedButton: "Se connecter pour voir la carte de mood",
  },
  en: { /* ... mêmes clés en anglais ... */ },
  ar: { /* ... mêmes clés en arabe ... */ },
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

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const l = navigator.language?.toLowerCase() ?? "fr";
      if (l.startsWith("fr")) setLang("fr");
      else if (l.startsWith("ar")) setLang("ar");
      else setLang("en");
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    async function initSession() {
      const { data } = await supabase.auth.getSession();
      if (mounted && data.session?.user) {
        setUser({ id: data.session.user.id, email: data.session.user.email ?? null });
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
    setCheckingSession(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("soulset_moods");
      if (stored) setMoodLogs(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("soulset_moods", JSON.stringify(moodLogs));
  }, [moodLogs]);

  function handleSaveMood() {
    if (!moodNote.trim()) return;
    const newLog: MoodLog = { id: `${Date.now()}`, createdAt: new Date().toISOString(), level: moodLevel, note: moodNote.trim() };
    setMoodLogs((prev) => [newLog, ...prev].slice(0, 10));
    setMoodNote("");
  }

  async function handleLogout() { await supabase.auth.signOut(); setUser(null); }

  if (checkingSession) return <main className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</main>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white flex flex-col items-center px-4 py-6">
      {/* HEADER */}
      <header className="w-full max-w-6xl mb-10 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">{t.mainTitle}</h1>
          <p className="text-xs md:text-sm text-neutral-400 max-w-2xl mt-1">{t.mainSubtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          {!user && (
            <>
              <Link href="/auth?mode=login" className="px-4 py-1.5 rounded-full border border-neutral-600 bg-black/70 text-xs hover:border-yellow-300 hover:text-yellow-100 transition">{t.headerLogin}</Link>
              <Link href="/auth?mode=signup" className="px-4 py-1.5 rounded-full border border-yellow-400/80 bg-yellow-400 text-xs font-semibold text-black shadow-lg hover:bg-yellow-300 transition">{t.headerSignup}</Link>
            </>
          )}
          {user && (
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-neutral-400">{t.authLoggedAs} <span className="font-semibold text-neutral-100">{user.email}</span></span>
              <button onClick={handleLogout} className="px-4 py-1.5 rounded-full border border-yellow-400/80 bg-black/70 hover:bg-yellow-400 hover:text-black text-xs font-medium shadow-lg transition">{t.logout}</button>
            </div>
          )}
        </div>
      </header>

      {/* MoodDashboard */}
      {showMoodDashboard && <MoodDashboard initial={moodLogs} onClose={() => setShowMoodDashboard(false)} />}

      {/* Mood input & history */}
      {user && (
        <section className="w-full max-w-4xl mb-6">
          <div className="rounded-3xl border border-neutral-700/80 bg-black/80 p-6 md:p-7 shadow-[0_0_40px_rgba(15,23,42,0.9)] backdrop-blur-sm">
            <h3 className="text-base md:text-lg font-semibold text-neutral-50 mb-3">{t.moodTitle}</h3>
            <p className="text-sm text-neutral-300 mb-4">{t.moodQuestion}</p>

            <div className="mb-4">
              <label className="block text-xs text-neutral-400 mb-1">{t.moodLabel}</label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button key={lvl} onClick={() => setMoodLevel(lvl as MoodLevel)} className={`w-10 h-10 rounded-full text-sm flex items-center justify-center border transition ${moodLevel === lvl ? "border-yellow-300 bg-yellow-400 text-black shadow-lg" : "border-neutral-600 bg-black text-neutral-200 hover:border-yellow-400/80"}`}>{lvl}</button>
                ))}
              </div>
            </div>

            <textarea className="w-full h-24 rounded-2xl bg-black border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none placeholder:text-neutral-500" placeholder={t.moodPlaceholder} value={moodNote} onChange={(e) => setMoodNote(e.target.value)} />
            <button onClick={handleSaveMood} disabled={!moodNote.trim()} className="mt-3 w-full md:w-auto rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black px-6 py-2 text-sm font-semibold hover:brightness-110 disabled:opacity-60 transition"> {t.moodSubmit} </button>
          </div>
        </section>
      )}
    </main>
  );
}
