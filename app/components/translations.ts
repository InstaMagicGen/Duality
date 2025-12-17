export type Lang = "fr" | "en" | "ar";
export const translations = {
  fr: {
    subtitle: "Explorer ton futur et ton état intérieur",
    home: "Accueil",
    soulset: "Soulset",
    duality: "Duality",
    login: "Connexion",

    home_title: "Bienvenue dans Soulset",
    home_desc: "Une exploration émotionnelle et cognitive personnalisée.",

    soulset_desc: "Analyse profonde de ton état intérieur",
    duality_desc: "Lecture de tes contradictions mentales",

    soulset_title: "Analyse Soulset",
    soulset_analysis:
      "Cette analyse explore ton état émotionnel actuel et révèle les tensions internes dominantes.",

    duality_title: "Analyse Duality",
    duality_analysis:
      "Duality met en lumière le conflit entre ce que tu montres et ce que tu ressens.",

    auth_title: "Accès sécurisé",
    auth_desc: "Connecte-toi pour sauvegarder ton parcours",
  },

  en: {
    subtitle: "Explore your future and inner state",
    home: "Home",
    soulset: "Soulset",
    duality: "Duality",
    login: "Login",

    home_title: "Welcome to Soulset",
    home_desc: "A personalized emotional and cognitive exploration.",

    soulset_desc: "Deep analysis of your inner state",
    duality_desc: "Reading of your mental contradictions",

    soulset_title: "Soulset Analysis",
    soulset_analysis:
      "This analysis explores your current emotional state and dominant inner tensions.",

    duality_title: "Duality Analysis",
    duality_analysis:
      "Duality reveals the conflict between what you show and what you feel.",

    auth_title: "Secure access",
    auth_desc: "Log in to save your journey",
  },

  ar: {
    subtitle: "اكتشف مستقبلك وحالتك الداخلية",
    home: "الرئيسية",
    soulset: "سولسِت",
    duality: "الثنائية",
    login: "تسجيل الدخول",

    home_title: "مرحبًا بك في Soulset",
    home_desc: "استكشاف عاطفي وذهني مخصص لك.",

    soulset_desc: "تحليل عميق لحالتك الداخلية",
    duality_desc: "قراءة التناقضات الذهنية",

    soulset_title: "تحليل Soulset",
    soulset_analysis:
      "هذا التحليل يستكشف حالتك العاطفية الحالية ويكشف التوترات الداخلية.",

    duality_title: "تحليل Duality",
    duality_analysis:
      "Duality يكشف الصراع بين ما تُظهره وما تشعر به.",

    auth_title: "وصول آمن",
    auth_desc: "سجل الدخول لحفظ رحلتك",
  },
};

// Fonction simple pour accéder aux traductions directement
export const t = (key: string, lang: "fr" | "en" | "ar") =>
  translations[lang][key] || key;

// Hook React pour utiliser dans les composants
export const useTranslations = (lang: "fr" | "en" | "ar") => {
  return (key: string) => translations[lang][key] || key;
};
