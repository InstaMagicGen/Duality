"use client";

import React, { useState } from "react";
import { t } from "../components/translations";

export default function DualityPage({ lang }: { lang: "fr" | "en" | "ar" }) {
  const [userText, setUserText] = useState("");
  const [analysis, setAnalysis] = useState("");

  const generateAnalysis = () => {
    // Exemple de réponse aléatoire traduite
    const responses = [
      t("duality_analysis", lang),
      t("duality_analysis", lang) + " 🔹",
      t("duality_analysis", lang) + " ✨",
    ];
    setAnalysis(responses[Math.floor(Math.random() * responses.length)]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{t("duality_title", lang)}</h2>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows={5}
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        placeholder={lang === "fr" ? "Écris quelque chose..." : lang === "en" ? "Type something..." : "اكتب شيئًا..."}
      />
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={generateAnalysis}
      >
        {lang === "fr" ? "Analyser" : lang === "en" ? "Analyze" : "حلل"}
      </button>
      {analysis && <p className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">{analysis}</p>}
    </div>
  );
}
