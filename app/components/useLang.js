// app/components/useLang.ts
"use client";

import { useState, useEffect } from "react";

type Lang = "en" | "fr" | "ar";

export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang;
    if (storedLang && ["en", "fr", "ar"].includes(storedLang)) {
      setLang(storedLang);
    }
  }, []);

  return lang;
}
