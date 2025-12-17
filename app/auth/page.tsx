"use client";

import React from "react";
import Header from "../components/Header";
import { t } from "../components/translations";

export default function AuthPage() {
  const lang = navigator.language.slice(0, 2) as "fr" | "en" | "ar" || "fr";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">{t("auth_title", lang)}</h2>
        <p>{t("auth_desc", lang)}</p>
        {/* Formulaire login / signup ici */}
      </main>
    </div>
  );
}
