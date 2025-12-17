"use client";

import { useEffect, useState } from "react";
import type { Lang } from "./i18n";

export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved) setLang(saved);
  }, []);

  return lang;
}
