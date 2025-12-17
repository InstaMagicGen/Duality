"use client";

import React, { useEffect, useState } from "react";
import { t } from "../components/translations";

const SoulsetPage: React.FC = () => {
  const [lang, setLang] = useState<"fr" | "en" | "ar">("fr");

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (["fr", "en", "ar"].includes(browserLang)) setLang(browserLang as "fr" | "en" | "ar");
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{t("soulset_title", lang)}</h1>
      <p className="mb-6">{t("soulset_analysis", lang)}</p>
    </main>
  );
};

export default SoulsetPage;
