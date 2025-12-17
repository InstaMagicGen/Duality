"use client";

import { useState } from "react";

export function useLang() {
  const [lang, setLang] = useState<"fr" | "en" | "ar">("fr");
  return { lang, setLang };
}
