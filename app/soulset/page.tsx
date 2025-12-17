"use client";

import React, { useState } from "react";
import { t } from "../components/translations";
import Header from "../components/Header";

export default function SoulsetPage() {
  const browserLang = typeof navigator !== "undefined" ? navigator.language.slice(0, 2) : "fr";
  const defaultLang = browserLang === "ar" ? "ar" : browserLang === "en" ? "en" : "fr";

  const [lang, setLang] = useState<"fr" | "en" | "ar">(defaultLang);
  const [userInput, setUserInput] = useState("");
  const [analysis, setAnalysis] = useState("");

  const handleAnalyze = () => {
    const analyses = [
      t("soulset_analysis", lang),
      "Votre état intérieur est équilibré mais vigilant.",
      "Des tensions internes apparaissent, il est temps de respirer profondément.",
      "Vous êtes dans une phase de réflexion intense et émotionnelle.",
    ];
    const randomIndex = Math.floor(Math.random() * analyses.length);
    setAnalysis(analyses[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header lang={lang} setLang={setLang} />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{t("soulset_title", lang)}</h1>
        <p className="mb-6">{t("soulset_desc", lang)}</p>

        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Exprimez vos pensées ici..."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800"
        />

        <button
          onClick={handleAnalyze}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          {t("home_desc", lang)}
        </button>

        {analysis && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p>{analysis}</p>
          </div>
        )}
      </main>
    </div>
  );
}
