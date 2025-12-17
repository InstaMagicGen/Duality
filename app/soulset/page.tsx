"use client";

import useLang from "../components/useLang";
import { t } from "../components/translations";

export default function SoulsetPage() {
  const lang = useLang();

  return (
    <section className="journey soulset">
      <h1>{t.soulset.title[lang]}</h1>
      <p>{t.soulset.desc[lang]}</p>
      <textarea placeholder="..." />
    </section>
  );
}
