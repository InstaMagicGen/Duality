export const translations = {
  fr: {
    home: "Accueil",
    soulset: "Soulset",
    duality: "Duality",
    soulset_desc: "Analyse profonde de ton état intérieur",
    duality_desc: "Lecture de tes contradictions mentales",
  },
  en: {
    home: "Home",
    soulset: "Soulset",
    duality: "Duality",
    soulset_desc: "Deep analysis of your inner state",
    duality_desc: "Reading of your mental contradictions",
  },
  ar: {
    home: "الرئيسية",
    soulset: "سولسِت",
    duality: "الثنائية",
    soulset_desc: "تحليل عميق لحالتك الداخلية",
    duality_desc: "قراءة التناقضات الذهنية",
  },
};

export const t = (key: string, lang: "fr" | "en" | "ar") =>
  (translations[lang] as Record<string, string>)[key] || key;
