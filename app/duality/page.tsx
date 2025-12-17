"use client";

import React from "react";
import Header from "../components/Header";
import { t } from "../components/translations";

export default function DualityPage() {
  const lang = navigator.language.slice(0, 2) as "fr" | "en" | "ar" || "fr";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header lang={lang} />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{t("duality_title", lang)}</h1>
        <p className="mb-6">{t("duality_desc", lang)}</p>
        {/* Contenu Duality */}
      </main>
    </div>
  );
}
