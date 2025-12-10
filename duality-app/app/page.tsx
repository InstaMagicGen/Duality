"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

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

const translations: Record<
  Lang,
  {
    mainTitle: string;
    mainSubtitle: string;
    dualityTitle: string;
    dualityDesc: string;
    soulsetTitle: string;
    soulsetDesc: string;
    openDuality: string;
    openSoulset: string;
    moodTitle: string;
    moodQuestion: string;
    moodLabel: string;
    moodPlaceholder: string;
    moodHistoryTitle: string;
    moodSubmit: string;
    authLoggedAs: string;
    authLoginButton: string;
    authSignupButton: string;
    authLogout: string;
    authEmailLabel: string;
    authPasswordLabel: string;
    authPasswordPlaceholder: string;
    authSubmitLogin: string;
    authSubmitSignup: string;
    authGoogle: string;
    authFormTitleLogin: string;
    authFormTitleSignup: string;
    authErrorGeneric: string;
  }
> = {
  fr: {
    mainTitle: "Soulset Journeys",
    mainSubtitle:
      "Deux expériences guidées : Duality pour voir ton futur probable, Soulset Navigator pour scanner ta journée sur un coucher de soleil.",
    dualityTitle: "DUALITY · Futur probable",
    dualityDesc:
      "Entre ce que tu vis, Duality te renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (ta conscience profonde).",
    soulsetTitle: "SOULSET NAVIGATOR · Sunset Therapy",
    soulsetDesc:
      "Décris ton état du moment, laisse une phrase miroir courte se projeter sur un coucher de soleil apaisant.",
    openDuality: "Ouvrir Duality",
    openSoulset: "Commencer la Sunset Therapy",
    moodTitle: "Carte de suivi de mood",
    moodQuestion: "Comment tu te sens aujourd’hui ?",
    moodLabel: "Note ton humeur (1 = très bas · 5 = très bien)",
    moodPlaceholder:
      'Écris quelques mots sur ton ressenti du jour. Exemple : "Beaucoup de pression au travail, je me sens épuisé."',
    moodHistoryTitle:
      "Tes derniers moods (local, non sauvegardé en ligne pour l’instant)",
    moodSubmit: "Enregistrer ce mood",
    authLoggedAs: "Connecté en tant que",
    authLoginButton: "Connexion",
    authSignupButton: "Créer un compte",
    authLogout: "Se déconnecter",
    authEmailLabel: "E-mail",
    authPasswordLabel: "Mot de passe",
    authPasswordPlaceholder: "Au moins 6 caractères",
    authSubmitLogin: "Se connecter",
    authSubmitSignup: "Créer mon compte",
    authGoogle: "Continuer avec Google",
    authFormTitleLogin: "Connexion par e-mail",
    authFormTitleSignup: "Créer un compte par e-mail",
    authErrorGeneric: "Une erreur est survenue pendant l’authentification.",
  },
  en: {
    mainTitle: "Soulset Journeys",
    mainSubtitle:
      "Two guided journeys: Duality to explore your probable future, Soulset Navigator to scan your day on a sunset.",
    dualityTitle: "DUALITY · Probable future",
    dualityDesc:
      "Type what you’re going through, Duality returns a LIFE ECHO (probable future) and a SHADOWTALK (your inner voice).",
    soulsetTitle: "SOULSET NAVIGATOR · Sunset Therapy",
    soulsetDesc:
      "Describe how you feel right now, then receive a short mirror sentence projected on a calming sunset.",
    openDuality: "Open Duality",
    openSoulset: "Start Sunset Therapy",
    moodTitle: "Mood tracking card",
    moodQuestion: "How do you feel today?",
    moodLabel: "Rate your mood (1 = very low · 5 = very good)",
    moodPlaceholder:
      'Write a few words about your day. Example: "Heavy day, lots of pressure at work, I feel drained."',
    moodHistoryTitle: "Your last moods (local only for now, not saved online)",
    moodSubmit: "Save this mood",
    authLoggedAs: "Signed in as",
    authLoginButton: "Sign in",
    authSignupButton: "Create account",
    authLogout: "Sign out",
    authEmailLabel: "E-mail",
    authPasswordLabel: "Password",
    authPasswordPlaceholder: "At least 6 characters",
    authSubmitLogin: "Sign in",
    authSubmitSignup: "Create my account",
    authGoogle: "Continue with Google",
    authFormTitleLogin: "Sign in with e-mail",
    authFormTitleSignup: "Create an account with e-mail",
    authErrorGeneric: "An error occurred during authentication.",
  },
  ar: {
    mainTitle: "رحلة السولسِت",
    mainSubtitle:
      "تجربتان موجهتان: Duality لرؤية مستقبلك المحتمل، وSoulset Navigator لمسح يومك على غروب هادئ.",
    dualityTitle: "DUALITY · المستقبل المحتمل",
    dualityDesc:
      "اكتب ما تعيشه الآن، لتحصل على LIFE ECHO (مستقبل محتمل) و SHADOWTALK (صوتك الداخلي).",
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
    moodHistoryTitle: "آخر مزاجاتك (محلياً فقط حالياً، غير محفوظة على الإنترنت)",
    moodSubmit: "حفظ هذا المزاج",
    authLoggedAs: "متصل كـ",
    authLoginButton: "تسجيل الدخول",
    authSignupButton: "إنشاء حساب",
    authLogout: "تسجيل الخروج",
    authEmailLabel: "البريد الإلكتروني",
    authPasswordLabel: "كلمة المرور",
    authPasswordPlaceholder: "ستة أحرف على الأقل",
    authSubmitLogin: "تسجيل الدخول",
    authSubmitSignup: "إنشاء حساب",
    authGoogle: "المتابعة باستخدام Google",
    authFormTitleLogin: "تسجيل الدخول بالبريد الإلكتروني",
    authFormTitleSignup: "إنشاء حساب بالبريد الإلكتروني",
    authErrorGeneric: "حدث خطأ أثناء عملية تسجيل الدخول.",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = translations[lang];

  const [user, setUser] = useState<SessionUser | null>(null);

  // authMode: "none" | "login" | "signup"
  const [authMode, setAuthMode] = useState<"none" | "login" | "signup">("none");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [moodLevel, setMoodLevel] = useState<MoodLevel>(3);
  const [moodNote, setMoodNote] = useState("");
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);

  // Détection de langue système
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const l = navigator.language?.toLowerCase() ?? "fr";
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  // Récupération session Supabase
  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.warn("Supabase getUser error:", error.message);
        return;
      }
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? null,
        });
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? null,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  // Mood en localStorage (en attendant la DB)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("soulset_moods");
      if (!stored) return;
      const parsed: MoodLog[] = JSON.parse(stored);
      setMoodLogs(parsed);
    } catch (e) {
      console.warn("Erreur lecture mood localStorage", e);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("soulset_moods", JSON.stringify(moodLogs));
    } catch (e) {
      console.warn("Erreur écriture mood localStorage", e);
    }
  }, [moodLogs]);

  // ---------------- AUTH HANDLERS (email + mot de passe) ----------------

  function openAuth(mode: "login" | "signup") {
    setAuthError(null);
    setAuthMode((prev) => (prev === mode ? "none" : mode));
  }

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);

    if (!authEmail || !authPassword) {
      setAuthError(t.authErrorGeneric);
      return;
    }

    try {
      setAuthLoading(true);

      if (authMode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) {
          console.error("signInWithPassword error:", error.message);
          setAuthError(error.message);
          return;
        }
        if (data?.user) {
          setUser({
            id: data.user.id,
            email: data.user.email ?? null,
          });
          setAuthMode("none");
          setAuthPassword("");
        }
      } else if (authMode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
        });
        if (error) {
          console.error("signUp error:", error.message);
          setAuthError(error.message);
          return;
        }

        if (data?.user) {
          // Si l’e-mail est auto-confirmé
          setUser({
            id: data.user.id,
            email: data.user.email ?? null,
          });
          setAuthMode("none");
          setAuthPassword("");
        } else {
          // Si confirmation e-mail nécesssaire
          alert(
            lang === "fr"
              ? "Compte créé. Vérifie ton e-mail pour confirmer ton adresse."
              : lang === "ar"
              ? "تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد العنوان."
              : "Account created. Please check your e-mail to confirm."
          );
          setAuthMode("none");
          setAuthPassword("");
        }
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(t.authErrorGeneric);
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setAuthMode("none");
      setAuthEmail("");
      setAuthPassword("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleGoogleAuth() {
    setAuthError(null);
    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            typeof window !== "undefined"
              ? window.location.origin
              : undefined,
        },
      });
      if (error) {
        console.error("Google OAuth error:", error.message);
        setAuthError(error.message);
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(t.authErrorGeneric);
    } finally {
      setAuthLoading(false);
    }
  }

  // ---------------- MOOD SAVE ----------------

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

  // ---------------- RENDER ----------------

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white flex flex-col items-center px-4 py-8">
      {/* HEADER */}
      <header className="w-full max-w-5xl mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#d4af37] flex items-center justify-center text-lg font-semibold shadow-lg shadow-yellow-500/30">
            Δ
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
              {t.mainTitle}
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 max-w-xl">
              {t.mainSubtitle}
            </p>
          </div>
        </div>

        {/* Zone auth */}
        <div className="flex flex-col items-end gap-2 w-full md:w-auto">
          {user && (
            <span className="text-[11px] text-neutral-400">
              {t.authLoggedAs}{" "}
              <span className="font-semibold text-neutral-100">
                {user.email ?? "user"}
              </span>
            </span>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-full border border-[#d4af37] text-xs bg-black/70 hover:bg-[#111111] transition shadow-lg shadow-yellow-500/20"
            >
              {t.authLogout}
            </button>
          ) : (
            <div className="flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => openAuth("login")}
                className={`px-4 py-1.5 rounded-full border text-xs transition shadow-lg ${
                  authMode === "login"
                    ? "border-[#d4af37] bg-[#d4af37] text-black shadow-yellow-500/30"
                    : "border-[#d4af37] bg-black/70 text-white hover:bg-[#111111] shadow-yellow-500/20"
                }`}
              >
                {t.authLoginButton}
              </button>
              <button
                type="button"
                onClick={() => openAuth("signup")}
                className={`px-4 py-1.5 rounded-full border text-xs transition shadow-lg ${
                  authMode === "signup"
                    ? "border-sky-400 bg-sky-400 text-black shadow-sky-500/40"
                    : "border-sky-400 bg-black/70 text-white hover:bg-slate-900 shadow-sky-500/20"
                }`}
              >
                {t.authSignupButton}
              </button>
            </div>
          )}

          {/* Petit formulaire déroulant */}
          {!user && authMode !== "none" && (
            <form
              onSubmit={handleAuthSubmit}
              className="mt-2 w-full md:w-80 rounded-2xl border border-neutral-700 bg-black/80 p-4 shadow-[0_0_25px_rgba(15,23,42,0.8)] backdrop-blur-md space-y-3"
            >
              <p className="text-xs font-semibold text-neutral-200">
                {authMode === "login"
                  ? t.authFormTitleLogin
                  : t.authFormTitleSignup}
              </p>

              <div className="space-y-1">
                <label className="text-[11px] text-neutral-400">
                  {t.authEmailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full rounded-xl bg-black border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-neutral-400">
                  {t.authPasswordLabel}
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder={t.authPasswordPlaceholder}
                  className="w-full rounded-xl bg-black border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {authError && (
                <p className="text-[11px] text-red-400">{authError}</p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full rounded-full bg-yellow-400 text-black px-4 py-2 text-xs font-semibold hover:bg-yellow-300 disabled:opacity-60 transition"
              >
                {authLoading
                  ? "⋯"
                  : authMode === "login"
                  ? t.authSubmitLogin
                  : t.authSubmitSignup}
              </button>

              {/* Bouton Google (optionnel, si configuré côté Supabase) */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={authLoading}
                className="w-full rounded-full border border-neutral-600 text-xs px-4 py-2 text-neutral-100 bg-black/70 hover:bg-neutral-900 transition"
              >
                {t.authGoogle}
              </button>
            </form>
          )}
        </div>
      </header>

      {/* CARTES PRINCIPALES : DUALITY & SOULSET */}
      <section className="w-full max-w-5xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
          {/* Duality card */}
          <Link
            href="/duality"
            className="group w-full max-w-md rounded-3xl border border-yellow-500/40 bg-gradient-to-b from-yellow-500/10 via-black/60 to-black/80 p-6 md:p-7 shadow-[0_0_40px_rgba(234,179,8,0.25)] hover:border-yellow-300/70 hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="flex flex-col h-full">
              <h2 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2">
                {t.dualityTitle}
              </h2>
              <p className="text-sm text-neutral-200 mb-4">{t.dualityDesc}</p>
              <div className="mt-auto flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-wide text-yellow-400/80">
                  LIFE ECHO · SHADOWTALK
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-black bg-yellow-300 rounded-full px-3 py-1 group-hover:bg-yellow-200 transition">
                  {t.openDuality}
                  <span className="text-[10px]">↗</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Soulset card */}
          <Link
            href="/soulset"
            className="group w-full max-w-md rounded-3xl border border-sky-400/40 bg-gradient-to-b from-sky-500/10 via-slate-950/80 to-black/80 p-6 md:p-7 shadow-[0_0_40px_rgba(56,189,248,0.25)] hover:border-sky-300/70 hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="flex flex-col h-full">
              <h2 className="text-lg md:text-xl font-semibold text-sky-300 mb-2">
                {t.soulsetTitle}
              </h2>
              <p className="text-sm text-neutral-200 mb-4">{t.soulsetDesc}</p>
              <div className="mt-auto flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-wide text-sky-300/80">
                  SCAN · SUNSET THERAPY
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-black bg-sky-300 rounded-full px-3 py-1 group-hover:bg-sky-200 transition">
                  {t.openSoulset}
                  <span className="text-[10px]">↗</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CARTE DE SUIVI DE MOOD */}
      <section className="w-full max-w-5xl mb-6">
        <div className="rounded-3xl border border-neutral-700 bg-black/70 p-6 md:p-7 shadow-[0_0_35px_rgba(15,23,42,0.7)] backdrop-blur-sm">
          <h3 className="text-base md:text-lg font-semibold text-neutral-50 mb-3">
            {t.moodTitle}
          </h3>
          <p className="text-sm text-neutral-300 mb-4">{t.moodQuestion}</p>

          <div className="mb-4">
            <label className="block text-xs text-neutral-400 mb-1">
              {t.moodLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setMoodLevel(lvl as MoodLevel)}
                  className={`w-10 h-10 rounded-full text-sm flex items-center justify-center border transition ${
                    moodLevel === lvl
                      ? "border-yellow-300 bg-yellow-400 text-black shadow-lg shadow-yellow-500/40"
                      : "border-neutral-600 bg-black text-neutral-200 hover:border-yellow-400/80"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-neutral-400 mb-1">
              {t.moodLabel}
            </label>
            <textarea
              className="w-full h-24 rounded-2xl bg-black border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none placeholder:text-neutral-500"
              placeholder={t.moodPlaceholder}
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleSaveMood}
            disabled={!moodNote.trim()}
            className="w-full md:w-auto rounded-full bg-yellow-400 text-black px-5 py-2 text-sm font-semibold hover:bg-yellow-300 disabled:opacity-60 transition"
          >
            {t.moodSubmit}
          </button>

          {moodLogs.length > 0 && (
            <div className="mt-6">
              <p className="text-[11px] text-neutral-400 mb-2">
                {t.moodHistoryTitle}
              </p>
              <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {moodLogs.map((log) => (
                  <li
                    key={log.id}
                    className="rounded-xl border border-neutral-700/70 bg-black/60 px-3 py-2 text-xs text-neutral-200"
                  >
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <span className="font-semibold text-yellow-300">
                        {log.level}/5
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="leading-snug whitespace-pre-line">
                      {log.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <footer className="mt-4 text-[10px] text-neutral-500 text-center max-w-4xl">
        Prototype v1 · Données d’humeur stockées localement sur ton appareil
        (connexion Supabase + carte perso déjà prête pour la suite).
      </footer>
    </main>
  );
}
