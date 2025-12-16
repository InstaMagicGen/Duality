// app/soulset/page.tsx
"use client";
import Header from "../components/Header";
import { useLang } from "../components/useLang";
import { translations } from "../components/translations";

export default function SoulsetPage() {
  const lang = useLang();

  return (
    <>
      <Header />
      <main className="page-container">
        <h1>{translations.home.soulset[lang].title}</h1>
        <p>{translations.home.soulset[lang].desc}</p>
      </main>
    </>
  );
}
