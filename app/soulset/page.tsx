"use client";

import React from "react";

const translations = {
  fr: { title: "Soulset", desc: "Plongez dans votre univers intérieur" },
  en: { title: "Soulset", desc: "Dive into your inner universe" },
  ar: { title: "روح", desc: "اغمر في عالمك الداخلي" },
};

export default function Soulset() {
  const lang = "fr";
  const t = translations[lang];

  return (
    <main className="page">
      <h1>{t.title}</h1>
      <p>{t.desc}</p>
    </main>
  );
}
