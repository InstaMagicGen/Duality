export const translations = {
  fr: {
    subtitle: "Exploration intérieure & conscience émotionnelle",
    homeTitle: "Bienvenue dans Soulset",
    homeText:
      "Une expérience immersive pour comprendre ton état mental, émotionnel et énergétique.",
    soulsetTitle: "Analyse Soulset",
    soulsetText:
      "Soulset révèle ton état intérieur dominant à travers une lecture émotionnelle profonde.",
    dualityTitle: "Analyse Duality",
    dualityText:
      "Duality met en lumière le conflit entre ton masque social et ton moi réel.",
    start: "Commencer l'analyse",
    login: "Connexion",
  },

  en: {
    subtitle: "Inner exploration & emotional awareness",
    homeTitle: "Welcome to Soulset",
    homeText:
      "An immersive experience to understand your mental and emotional state.",
    soulsetTitle: "Soulset Analysis",
    soulsetText:
      "Soulset reveals your dominant inner emotional state through deep analysis.",
    dualityTitle: "Duality Analysis",
    dualityText:
      "Duality exposes the conflict between your social mask and true self.",
    start: "Start analysis",
    login: "Login",
  },

  ar: {
    subtitle: "استكشاف داخلي ووعي عاطفي",
    homeTitle: "مرحبًا بك في Soulset",
    homeText:
      "تجربة غامرة لفهم حالتك الذهنية والعاطفية والطاقية.",
    soulsetTitle: "تحليل Soulset",
    soulsetText:
      "Soulset يكشف حالتك العاطفية الداخلية العميقة.",
    dualityTitle: "تحليل Duality",
    dualityText:
      "Duality يكشف الصراع بين قناعك الاجتماعي وذاتك الحقيقية.",
    start: "ابدأ التحليل",
    login: "تسجيل الدخول",
  },
};

export const t = (key: string, lang: "fr" | "en" | "ar") =>
  translations[lang][key];
