// app/duality/page.tsx
"use client";
import Header from "../components/Header";
import { useLang } from "../components/useLang";
import { translations } from "../components/translations";

export default function DualityPage() {
  const lang = useLang();

  return (
    <>
      <Header />
      <main className="page-container">
        <h1>{translations.home.duality[lang].title}</h1>
        <p>{translations.home.duality[lang].desc}</p>
        {/* Analyse exemple */}
        <div className="analysis-box">
          <p>{translations.analysis.deep[lang]} « Ton analyse ici »</p>
        </div>
      </main>
    </>
  );
}
