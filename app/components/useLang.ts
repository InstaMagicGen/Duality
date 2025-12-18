"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "fr" | "en" | "ar";

const LangContext = createContext<any>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith("ar")) setLang("ar");
    else if (nav.startsWith("en")) setLang("en");
    else setLang("fr");
  }, []);

  const toggleLang = () => {
    setLang((l) => (l === "fr" ? "en" : l === "en" ? "ar" : "fr"));
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
