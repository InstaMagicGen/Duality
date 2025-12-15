"use client";

import { useState } from "react";

type Lang = "fr" | "en" | "ar";

export default function Header() {
  const [lang, setLang] = useState<Lang>("fr");

  return (
    <header className="header">
      <h1 className="text-2xl font-bold">Soulset Journeys</h1>
      <select
        className="lang-select"
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
        <option value="ar">AR</option>
      </select>
    </header>
  );
}
