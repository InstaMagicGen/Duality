"use client";

import useLang from "../components/useLang";
import { t } from "../components/translations";

export default function DualityPage() {
  const lang = useLang();

  return (
    <section className="journey duality">
      <h1>{t.duality.title[lang]}</h1>
      <p>{t.duality.desc[lang]}</p>
      <textarea placeholder="..." />
    </section>
  );
}
