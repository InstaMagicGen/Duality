export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      duality: "Dualité",
      soulset: "Soulset"
    },
    home: {
      title: "Explorer ton monde intérieur"
    }
  },
  en: {
    nav: {
      home: "Home",
      duality: "Duality",
      soulset: "Soulset"
    },
    home: {
      title: "Explore your inner world"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      duality: "الثنائية",
      soulset: "روحك"
    },
    home: {
      title: "اكتشف عالمك الداخلي"
    }
  }
};

export function t(path: string, lang: "fr" | "en" | "ar") {
  return path.split(".").reduce((obj: any, key) => obj?.[key], translations[lang]);
}
