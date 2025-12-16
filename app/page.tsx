// app/page.tsx
"use client";
import Link from "next/link";
import Header from "./components/Header";
import { translations } from "./components/translations";
import { useLang } from "./components/useLang";

export default function HomePage() {
  const lang = useLang();

  return (
    <>
      <Header />
      <main className="home-buttons-container">
        <Link href="/duality">
          <div className="home-button-box">
            <h2>{translations.home.duality[lang].title}</h2>
            <p>{translations.home.duality[lang].desc}</p>
          </div>
        </Link>
        <Link href="/soulset">
          <div className="home-button-box">
            <h2>{translations.home.soulset[lang].title}</h2>
            <p>{translations.home.soulset[lang].desc}</p>
          </div>
        </Link>
      </main>
    </>
  );
}
