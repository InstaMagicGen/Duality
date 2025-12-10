"use client";

export const dynamic = "force-dynamic"; 
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

type Lang = "fr" | "en" | "ar";

type AuthMode = "login" | "signup";

const translations: Record<
  Lang,
  {
    loginTitle: string;
    signupTitle: string;
    subtitle: string;
    emailLabel: string;
    passwordLabel: string;
    passwordHint: string;
    showPassword: string;
    hidePassword: string;
    loginButton: string;
    signupButton: string;
    google: string;
    switchToSignup: string;
    switchToLogin: string;
    genericError: string;
  }
> = {
  fr: {
    loginTitle: "Connexion",
    signupTitle: "Créer un compte",
    subtitle:
      "Deux expériences guidées : Duality pour voir ton futur probable, Soulset Navigator pour scanner ta journée sur un coucher de soleil.",
    emailLabel: "E-mail",
    passwordLabel: "Mot de passe",
    passwordHint: "Minimum 6 caractères.",
    showPassword: "Afficher le mot de passe",
    hidePassword: "Masquer le mot de passe",
    loginButton: "Se connecter",
    signupButton: "Créer le compte",
    google: "Continuer avec Google",
    switchToSignup: "Pas encore de compte ? Créer un compte",
    switchToLogin: "Tu as déjà un compte ? Se connecter",
    genericError: "Identifiants invalides ou erreur inattendue.",
  },
  en: {
    loginTitle: "Sign in",
    signupTitle: "Create an account",
    subtitle:
      "Two guided journeys: Duality to explore your probable future, Soulset Navigator to scan your day on a sunset.",
    emailLabel: "E-mail",
    passwordLabel: "Password",
    passwordHint: "At least 6 characters.",
    showPassword: "Show password",
    hidePassword: "Hide password",
    loginButton: "Sign in",
    signupButton: "Create account",
    google: "Continue with Google",
    switchToSignup: "No account yet? Create one",
    switchToLogin: "Already have an account? Sign in",
    genericError: "Invalid credentials or unexpected error.",
  },
  ar: {
    loginTitle: "تسجيل الدخول",
    signupTitle: "إنشاء حساب",
    subtitle:
      "تجربتان موجهتان: Duality لرؤية مستقبلك المحتمل، وSoulset Navigator لمسح يومك على غروب هادئ.",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    passwordHint: "6 أحرف على الأقل.",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    loginButton: "تسجيل الدخول",
    signupButton: "إنشاء الحساب",
    google: "المتابعة باستخدام Google",
    switchToSignup: "ليس لديك حساب؟ أنشئ حساباً",
    switchToLogin: "لديك حساب بالفعل؟ سجّل الدخول",
    genericError: "بيانات غير صحيحة أو خطأ غير متوقع.",
  },
};

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialMode =
    (searchParams.get("mode") as AuthMode | null) ?? "login";
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const [lang, setLang] = useState<Lang>("fr");
  const t = translations[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const l = navigator.language?.toLowerCase() ?? "fr";
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  useEffect(() => {
    // si l'utilisateur est déjà connecté, on peut le renvoyer à /
    supabase.auth.getUser().then(({ data, error }) => {
      if (!error && data?.user) {
        router.replace("/");
      }
    });
  }, [router]);

  async function handleEmailAuth() {
    setErrorMsg(null);
    if (!email || !password) {
      setErrorMsg(t.genericError);
      return;
    }

    try {
      setLoading(true);
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          router.replace("/");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          router.replace("/");
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err?.message && typeof err.message === "string"
          ? err.message
          : t.genericError
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setErrorMsg(null);
    try {
      setLoading(true);
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
      // redirection par Google + Supabase
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err?.message && typeof err.message === "string"
          ? err.message
          : t.genericError
      );
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    const nextMode: AuthMode = mode === "login" ? "signup" : "login";
    setMode(nextMode);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-yellow-400/60 bg-neutral-900/95 shadow-[0_0_60px_rgba(234,179,8,0.35)] p-7 md:p-8">
        <div className="mb-6 text-center space-y-1">
          <h1 className="text-xl md:text-2xl font-semibold text-yellow-300">
            {mode === "login" ? t.loginTitle : t.signupTitle}
          </h1>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Email */}
        <label className="block text-xs font-medium text-neutral-300 mb-1">
          {t.emailLabel}
        </label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-2xl bg-black/80 border border-neutral-600 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400 text-sm text-white px-4 py-3 placeholder:text-neutral-500 transition"
          placeholder="you@example.com"
        />

        {/* Password */}
        <label className="block text-xs font-medium text-neutral-300 mb-1">
          {t.passwordLabel}
        </label>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl bg-black/80 border border-neutral-600 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400 text-sm text-white px-4 py-3 pr-11 placeholder:text-neutral-500 transition"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-xs text-neutral-400 hover:text-yellow-300"
            aria-label={showPassword ? t.hidePassword : t.showPassword}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <p className="text-[11px] text-neutral-500 mb-4">{t.passwordHint}</p>

        {errorMsg && (
          <p className="text-[11px] text-red-400 mb-3">{errorMsg}</p>
        )}

        {/* Bouton principal */}
        <button
          type="button"
          onClick={handleEmailAuth}
          disabled={loading}
          className="w-full mb-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black font-semibold text-sm py-2.5 shadow-[0_0_25px_rgba(250,204,21,0.6)] hover:brightness-110 disabled:opacity-60 disabled:shadow-none transition-transform transform hover:-translate-y-0.5"
        >
          {mode === "login" ? t.loginButton : t.signupButton}
        </button>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full rounded-full border border-neutral-600 bg-black/80 text-sm text-neutral-100 py-2.5 hover:border-yellow-300 hover:text-yellow-100 transition flex items-center justify-center gap-2"
        >
          <span>⚡</span>
          <span>{t.google}</span>
        </button>

        {/* Switch mode */}
        <button
          type="button"
          onClick={toggleMode}
          className="mt-4 w-full text-center text-[11px] text-neutral-400 hover:text-yellow-300 transition"
        >
          {mode === "login" ? t.switchToSignup : t.switchToLogin}
        </button>
      </div>
    </main>
  );
}
