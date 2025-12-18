"use client";

import Header from "@/components/Header";
import { useLang } from "@/components/useLang";
import { t } from "@/components/translations";
import { useState } from "react";

export default function Soulset() {
  const { lang } = useLang();
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const analyze = async () => {
    const res = await fetch("/api/soulset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <>
      <Header />
      <main className="center">
        <h2>{t("soulsetTitle", lang)}</h2>

        <textarea
          className="input-box"
          placeholder={
            lang === "ar"
              ? "اكتب ما تشعر به بصدق..."
              : lang === "en"
              ? "Write what you truly feel..."
              : "Écris ce que tu ressens vraiment..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="main-btn" onClick={analyze}>
          {t("start", lang)}
        </button>

        {result && <pre className="result-box">{result}</pre>}
      </main>
    </>
  );
}
