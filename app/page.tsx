"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { t } from "../components/translations";

type Props = {
  lang: "fr" | "en" | "ar";
};

const HomePage: React.FC<Props> = ({ lang }) => {
  const router = useRouter();

  return (
    <main className="page">
      <div className="cards">
        <div
          className="card card-gold"
          onClick={() => router.push("/soulset")}
        >
          <h2>{t("soulset", lang)}</h2>
          <p>{t("soulset_desc", lang)}</p>
        </div>
        <div
          className="card card-blue"
          onClick={() => router.push("/duality")}
        >
          <h2>{t("duality", lang)}</h2>
          <p>{t("duality_desc", lang)}</p>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
