"use client";

import React from "react";

const translations = {
  fr: { title: "Dualité", desc: "Explorez les deux côtés de votre créativité" },
  en: { title: "Duality", desc: "Explore the two sides of your creativity" },
  ar: { title: "الازدواجية", desc: "استكشف جانبي إبداعك" },
};

export default function Duality() {
  const lang = "fr";
  const t = translations[lang];

  return (
    <main className="page">
      <h1>{t.title}</h1>
      <p>{t.desc}</p>
    </main>
  );
}
