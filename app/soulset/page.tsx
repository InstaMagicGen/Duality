"use client";

import Header from "../components/Header";
import { useLang } from "../components/useLang";
import { i18n } from "../components/i18n";

export default function SoulsetPage() {
  const lang = useLang();

  return (
    <div className="page">
      <Header />

      <main>
        <h2>{i18n.soulset.title[lang]}</h2>
        <p>{i18n.soulset.description[lang]}</p>

        <p className="analysis">
          {i18n.analysis[lang]}
        </p>
      </main>
    </div>
  );
}
