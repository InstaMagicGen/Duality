// app/components/translations.ts
type Lang = "en" | "fr" | "ar";

export const translations: any = {
  buttons: {
    login: { en: "Login", fr: "Se connecter", ar: "تسجيل الدخول" },
    signup: { en: "Sign Up", fr: "Créer un compte", ar: "إنشاء حساب" },
  },
  home: {
    title: { en: "Welcome Home", fr: "Bienvenue", ar: "مرحبا" },
    description: {
      en: "This is the home page",
      fr: "Ceci est la page d'accueil",
      ar: "هذه هي الصفحة الرئيسية",
    },
  },
  duality: {
    title: { en: "Duality", fr: "Dualité", ar: "الازدواجية" },
    description: {
      en: "Explore your duality",
      fr: "Explorez votre dualité",
      ar: "استكشف ازدواجيتك",
    },
  },
  soulset: {
    title: { en: "Soulset", fr: "Soulset", ar: "Soulset" },
    description: {
      en: "Dive into your soul",
      fr: "Plongez dans votre âme",
      ar: "اغمر في روحك",
    },
  },
};
