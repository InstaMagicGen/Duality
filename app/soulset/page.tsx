"use client";

import React from "react";
import { t } from "../components/translations";

type Props = { lang: "fr" | "en" | "ar" };

const SoulsetPage: React.FC<Props> = ({ lang }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{t("soulset", lang)}</h1>
        <p className="mb-6">{t("soulset_desc", lang)}</p>
      </main>
    </div>
  );
};

export default SoulsetPage;
