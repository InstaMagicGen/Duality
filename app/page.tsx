"use client";

import React from "react";

const translations = {
  fr: { title: "Bienvenue sur InstaMagicGen", desc: "Votre univers créatif" },
  en: { title: "Welcome to InstaMagicGen", desc: "Your creative universe" },
  ar: { title: "مرحبًا بك في InstaMagicGen", desc: "عالمك الإبداعي" },
};

export default function Home() {
  // Langue par défaut, sera remplacée via Header
  const lang = "fr";
  const t = translations[lang];

  return (
    <main className="page">
      <h1>{t.title}</h1>
      <p>{t.desc}</p>

      <div className="cards">
        <div className="card card-gold">
          <h2>Card 1</h2>
          <p>Exemple de contenu pour la carte 1</p>
        </div>
        <div className="card card-blue">
          <h2>Card 2</h2>
          <p>Exemple de contenu pour la carte 2</p>
        </div>
      </div>
    </main>
  );
}
