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
    // home
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
    logout: string;
    // auth screen
    authLoginTitle: string;
    authSignupTitle: string;
    authEmailLabel: string;
    authPasswordLabel: string;
    authPasswordHint: string;
    authShowPassword: string;
    authHidePassword: string;
    authLoginButton: string;
    authSignupButton: string;
    authGoogle: string;
    authSwitchToSignup: string;
    authSwitchToLogin: string;
    authErrorGeneric: string;
  }
> = {
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
    authLoginTitle: "Connexion",
    authSignupTitle: "Créer un compte",
    authEmailLabel: "E-mail",
    authPasswordLabel: "Mot de passe",
    authPasswordHint: "Minimum 6 caractères.",
    authShowPassword: "Afficher le mot de passe",
    authHidePassword: "Masquer le mot de passe",
    authLoginButton: "Se connecter",
    authSignupButton: "Créer le compte",
    authGoogle: "Continuer avec Google",
    authSwitchToSignup: "Pas encore de compte ? Créer un compte",
    authSwitchToLogin: "Tu as déjà un compte ? Se connecter",
    authErrorGeneric: "Identifiants invalides ou erreur inattendue.",
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
    moodHistoryTitle:
      "Your recent moods (stored locally on this device for now).",
    moodSubmit: "Save",
    authLoggedAs: "Signed in as",
    logout: "Sign out",
    authLoginTitle: "Sign in",
    authSignupTitle: "Create an account",
    authEmailLabel: "E-mail",
    authPasswordLabel: "Password",
    authPasswordHint: "At least 6 characters.",
    authShowPassword: "Show password",
    authHidePassword: "Hide password",
    authLoginButton: "Sign in",
    authSignupButton: "Create account",
    authGoogle: "Continue with Google",
    authSwitchToSignup: "No account yet? Create one",
    authSwitchToLogin: "Already have an account? Sign in",
    authErrorGeneric: "Invalid credentials or unexpected error.",
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
    moodHistoryTitle:
      "آخر حالات المزاج (محفوظة محلياً على هذا الجهاز حالياً).",
    moodSubmit: "حفظ",
    authLoggedAs: "متصل كـ",
    logout: "تسجيل الخروج",
    authLoginTitle: "تسجيل الدخول",
    authSignupTitle: "إنشاء حساب",
    authEmailLabel: "البريد الإلكتروني",
    authPasswordLabel: "كلمة المرور",
    authPasswordHint: "6 أحرف على الأقل.",
    authShowPassword: "إظهار كلمة المرور",
    authHidePassword: "إخفاء كلمة المرور",
    authLoginButton: "تسجيل الدخول",
    authSignupButton: "إنشاء الحساب",
    authGoogle: "المتابعة باستخدام Google",
    authSwitchToSignup: "ليس لديك حساب؟ أنشئ حساباً",
    authSwitchToLogin: "لديك حساب بالفعل؟ سجّل الدخول",
    authErrorGeneric: "بيانات غير صحيحة أو خطأ غير متوقع.",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = translations[lang];

  const [user, setUser] = useState<SessionUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [moodLevel, setMoodLevel] = useState<MoodLevel>(3);
  const [moodNote, setMoodNote] = useState("");
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);

  // détecter langue système
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const l = navigator.language?.toLowerCase() ?? "fr";
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  // récupérer la session
  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.warn("Supabase getUser error:", error.message);
        setCheckingSession(false);
        return;
      }
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? null,
        });
      }
      setCheckingSession(false);
    });
  }, []);

  // mood en localStorage
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

  async function handleEmailAuth() {
    setAuthError(null);
    if (!authEmail || !authPassword) {
      setAuthError(t.authErrorGeneric);
      return;
    }

    try {
      setAuthLoading(true);

      if (authMode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;

        // si confirmation par mail activée, Supabase peut ne pas renvoyer l'user tout de suite
        if (data.user) {
          setUser({ id: data.user.id, email: data.user.email ?? null });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        if (data.user) {
          setUser({ id: data.user.id, email: data.user.email ?? null });
        }
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(
        err?.message && typeof err.message === "string"
          ? err.message
          : t.authErrorGeneric
      );
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setAuthError(null);
    try {
      setAuthLoading(true);
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (typeof window !== "undefined" ? window.location.origin : undefined);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: siteUrl,
        },
      });
      if (error) throw error;
      // la redirection va prendre le relais, pas besoin de setUser ici
    } catch (err: any) {
      console.error(err);
      setAuthError(
        err?.message && typeof err.message === "string"
          ? err.message
          : t.authErrorGeneric
      );
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  }

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

  // écran de chargement court pendant la vérif de session
  if (checkingSession) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-neutral-400">
        <span className="animate-pulse text-sm">Soulset Journeys…</span>
      </main>
    );
  }

  // ============================
  // 1) ÉCRAN AUTH UNIQUEMENT SI PAS CONNECTÉ
  // ============================
  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-yellow-400/60 bg-neutral-900/95 shadow-[0_0_60px_rgba(234,179,8,0.35)] p-7 md:p-8">
          <div className="mb-6 text-center space-y-1">
            <h1 className="text-xl md:text-2xl font-semibold text-yellow-300">
              {authMode === "login"
                ? t.authLoginTitle
                : t.authSignupTitle}
            </h1>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              {t.mainSubtitle}
            </p>
          </div>

          {/* email */}
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            {t.authEmailLabel}
          </label>
          <input
            type="email"
            autoComplete="email"
            value={authEmail}
            onChange={(e) => setAuthEmail(e.target.value)}
            className="mb-4 w-full rounded-2xl bg-black/70 border border-neutral-600 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400 text-sm text-white px-4 py-3 placeholder:text-neutral-500 transition"
            placeholder="you@example.com"
          />

          {/* password */}
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            {t.authPasswordLabel}
          </label>
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete={
                authMode === "signup" ? "new-password" : "current-password"
              }
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              className="w-full rounded-2xl bg-black/70 border border-neutral-600 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400 text-sm text-white px-4 py-3 pr-11 placeholder:text-neutral-500 transition"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-xs text-neutral-400 hover:text-yellow-300"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <p className="text-[11px] text-neutral-500 mb-4">
            {t.authPasswordHint}
          </p>

          {authError && (
            <p className="text-[11px] text-red-400 mb-3">{authError}</p>
          )}

          {/* Bouton principal */}
          <button
            type="button"
            onClick={handleEmailAuth}
            disabled={authLoading}
            className="w-full mb-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black font-semibold text-sm py-2.5 shadow-[0_0_25px_rgba(250,204,21,0.6)] hover:brightness-110 disabled:opacity-60 disabled:shadow-none transition-transform transform hover:-translate-y-0.5"
          >
            {authMode === "login"
              ? t.authLoginButton
              : t.authSignupButton}
          </button>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={authLoading}
            className="w-full rounded-full border border-neutral-600 bg-black/60 text-sm text-neutral-100 py-2.5 hover:border-yellow-300 hover:text-yellow-100 transition flex items-center justify-center gap-2"
          >
            <span>⚡</span>
            <span>{t.authGoogle}</span>
          </button>

          {/* Switch mode */}
          <button
            type="button"
            onClick={() =>
              setAuthMode((m) => (m === "login" ? "signup" : "login"))
            }
            className="mt-4 w-full text-center text-[11px] text-neutral-400 hover:text-yellow-300 transition"
          >
            {authMode === "login"
              ? t.authSwitchToSignup
              : t.authSwitchToLogin}
          </button>
        </div>
      </main>
    );
  }

  // ============================
  // 2) VUE PRINCIPALE (user connecté)
  // ============================
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white flex flex-col items-center px-4 py-6">
      {/* HEADER */}
      <header className="w-full max-w-6xl mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
            {t.mainTitle}
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 max-w-2xl mt-1">
            {t.mainSubtitle}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[11px] text-neutral-400">
            {t.authLoggedAs}{" "}
            <span className="font-semibold text-neutral-100">
              {user.email ?? "user"}
            </span>
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded-full border border-yellow-400/80 bg-black/70 hover:bg-yellow-400 hover:text-black text-xs font-medium shadow-lg shadow-yellow-500/30 transition"
          >
            {t.logout}
          </button>
        </div>
      </header>

      {/* CARTES PRINCIPALES */}
      <section className="w-full max-w-6xl mb-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Duality card */}
          <Link
            href="/duality"
            className="group rounded-3xl border border-yellow-400/60 bg-gradient-to-br from-yellow-500/15 via-black/80 to-black/95 p-6 md:p-7 shadow-[0_0_50px_rgba(234,179,8,0.35)] hover:-translate-y-1 hover:shadow-[0_0_65px_rgba(250,204,21,0.55)] transition-transform duration-200"
          >
            <div className="flex flex-col h-full">
              <h2 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2">
                {t.dualityTitle}
              </h2>
              <p className="text-sm text-neutral-200 mb-4">{t.dualityDesc}</p>
              <div className="mt-auto flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-wide text-yellow-300/85">
                  LIFE ECHO · SHADOWTALK
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-black bg-yellow-300 rounded-full px-3 py-1 group-hover:bg-yellow-200 transition">
                  {t.openDuality}
                  <span className="text-[10px]">↗</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Soulset card */}
          <Link
            href="/soulset"
            className="group rounded-3xl border border-sky-400/60 bg-gradient-to-br from-sky-500/20 via-slate-900/90 to-black/95 p-6 md:p-7 shadow-[0_0_50px_rgba(56,189,248,0.35)] hover:-translate-y-1 hover:shadow-[0_0_65px_rgba(59,130,246,0.55)] transition-transform duration-200"
          >
            <div className="flex flex-col h-full">
              <h2 className="text-lg md:text-xl font-semibold text-sky-300 mb-2">
                {t.soulsetTitle}
              </h2>
              <p className="text-sm text-neutral-200 mb-4">{t.soulsetDesc}</p>
              <div className="mt-auto flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-wide text-sky-300/85">
                  SCAN · SUNSET THERAPY
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-black bg-sky-300 rounded-full px-3 py-1 group-hover:bg-sky-200 transition">
                  {t.openSoulset}
                  <span className="text-[10px]">↗</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CARTE DE SUIVI DE MOOD (seulement quand connecté) */}
      <section className="w-full max-w-4xl mb-6">
        <div className="rounded-3xl border border-neutral-700/80 bg-black/80 p-6 md:p-7 shadow-[0_0_40px_rgba(15,23,42,0.9)] backdrop-blur-sm">
          <h3 className="text-base md:text-lg font-semibold text-neutral-50 mb-3">
            {t.moodTitle}
          </h3>
          <p className="text-sm text-neutral-300 mb-4">{t.moodQuestion}</p>

          {/* niveaux */}
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

          {/* note */}
          <div className="mb-4">
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
            className="w-full md:w-auto rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black px-6 py-2 text-sm font-semibold hover:brightness-110 disabled:opacity-60 transition shadow-[0_0_25px_rgba(250,204,21,0.6)]"
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
                    className="rounded-xl border border-neutral-700/70 bg-black/70 px-3 py-2 text-xs text-neutral-200"
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

      <footer className="mt-2 text-[10px] text-neutral-500 text-center max-w-4xl pb-4">
        Prototype v1 · Les données de mood sont stockées localement sur ton
        appareil (liaison Supabase dans la suite).
      </footer>
    </main>
  );
}
