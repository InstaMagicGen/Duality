"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "fr" | "en" | "ar";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("ar")) setLang("ar");
    else if (browserLang.startsWith("en")) setLang("en");
    else setLang("fr");
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used inside LangProvider");
  }
  return context;
}
