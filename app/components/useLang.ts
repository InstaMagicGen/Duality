"use client";
import { useState } from "react";

type Lang = "fr" | "en" | "ar";

export function useLang() {
  const [lang, setLang] = useState<Lang>("fr");
  return { lang, setLang };
}
