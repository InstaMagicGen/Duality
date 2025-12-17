"use client";

import { useEffect, useState } from "react";

export type Lang = "fr" | "en" | "ar";

export default function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const l = navigator.language.toLowerCase();
    if (l.startsWith("fr")) setLang("fr");
    else if (l.startsWith("ar")) setLang("ar");
    else setLang("en");
  }, []);

  return lang;
}
