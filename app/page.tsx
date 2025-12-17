"use client";

import Link from "next/link";
import useLang from "./components/useLang";
import { t } from "./components/translations";

export default function HomePage() {
  const lang = useLang();

  return (
    <section className="home">
      <div className="cards">
        <div className="card duality">
          <h2>{t.duality.title[lang]}</h2>
          <p>{t.duality.desc[lang]}</p>
          <Link href="/duality">
            <button className="btn primary">{t.duality.cta[lang]}</button>
          </Link>
        </div>

        <div className="card soulset">
          <h2>{t.soulset.title[lang]}</h2>
          <p>{t.soulset.desc[lang]}</p>
          <Link href="/soulset">
            <button className="btn secondary">{t.soulset.cta[lang]}</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
