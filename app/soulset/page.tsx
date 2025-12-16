// app/soulset/page.tsx
"use client";

import Header from "../components/Header";
import { useLang } from "../components/useLang";
import { translations } from "../components/translations";

export default function SoulsetPage() {
  const lang = useLang();

  return (
    <div>
      <Header />
      <main className="main-container">
        <h1>{translations.soulset.title[lang]}</h1>
        <p>{translations.soulset.description[lang]}</p>
      </main>
    </div>
  );
}
