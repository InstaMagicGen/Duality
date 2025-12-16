// app/page.tsx
"use client";

import Header from "./components/Header";
import { useLang } from "./components/useLang";
import { translations } from "./components/translations";

export default function HomePage() {
  const lang = useLang();

  return (
    <div>
      <Header />
      <main className="main-container">
        <h1>{translations.home.title[lang]}</h1>
        <p>{translations.home.description[lang]}</p>
      </main>
    </div>
  );
}
