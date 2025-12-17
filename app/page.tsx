"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { t } from "./components/translations";

type Props = { lang: "fr" | "en" | "ar" };

const HomePage: React.FC<Props> = ({ lang }) => {
  const router = useRouter();

  return (
    <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Soulset Card */}
      <div
        onClick={() => router.push("/soulset")}
        className="cursor-pointer p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition hover:scale-105"
      >
        <h2 className="text-xl font-bold">{t("soulset", lang)}</h2>
        <p className="mt-2">{t("soulset_desc", lang)}</p>
      </div>

      {/* Duality Card */}
      <div
        onClick={() => router.push("/duality")}
        className="cursor-pointer p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition hover:scale-105"
      >
        <h2 className="text-xl font-bold">{t("duality", lang)}</h2>
        <p className="mt-2">{t("duality_desc", lang)}</p>
      </div>
    </main>
  );
};

export default HomePage;
