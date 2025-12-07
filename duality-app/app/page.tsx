"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Lang = "fr" | "en";

function detectLangHome(): Lang {
  if (typeof window === "undefined") return "fr";
  const l = (navigator.language || "fr").toLowerCase();

  // IMPORTANT :
  // - FR → français
  // - AR → on force français (ton cas : téléphone en arabe)
  // - sinon → anglais
  if (l.startsWith("fr") || l.startsWith("ar")) return "fr";
  return "en";
}

const homeTexts: Record<Lang, { title: string; subtitle: string; intro: string }> = {
  fr: {
    title: "Choisis ton expérience",
    subtitle: "Soulset Journey • Experiments",
    intro:
      "Duality explore ton futur probable et ton ombre intérieure. Soulset Navigator t’offre une phrase miroir accompagnée d’un coucher de soleil immersif.",
  },
  en: {
    title: "Choose your experience",
    subtitle: "Soulset Journey • Experiments",
    intro:
      "Duality explores your probable future and your inner shadow. Soulset Navigator offers you a mirror sentence with an immersive sunset.",
  },
};

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    setLang(detectLangHome());
  }, []);

  const t = homeTexts[lang];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="mb-10 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-amber-400 mb-2">
            {t.subtitle}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide mb-3">
            {t.title}
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            {t.intro}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Duality */}
          <button
            onClick={() => router.push("/duality")}
            className="group relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-br from-black via-slate-950 to-amber-950/20 px-6 py-6 text-left shadow-[0_0_60px_rgba(212,175,55,0.12)] transition hover:border-amber-400 hover:shadow-[0_0_80px_rgba(212,175,55,0.35)]"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-radial from-amber-500/15 via-transparent to-transparent" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300 mb-2">
                Duality
              </p>
              <h2 className="text-xl font-semibold mb-2">
                {lang === "fr"
                  ? "Futur probable & ombre intérieure"
                  : "Probable future & inner shadow"}
              </h2>
              <p className="text-sm text-slate-300 mb-4">
                {lang === "fr" ? (
                  <>
                    Tu écris ce que tu vis. Duality renvoie{" "}
                    <span className="text-amber-300">Life Echo</span> (ta
                    trajectoire probable) et{" "}
                    <span className="text-amber-300">Shadowtalk</span> (ce que
                    ton ombre essaie de te dire).
                  </>
                ) : (
                  <>
                    You write what you’re going through. Duality returns{" "}
                    <span className="text-amber-300">Life Echo</span> (your
                    probable path) and{" "}
                    <span className="text-amber-300">Shadowtalk</span> (what
                    your shadow is trying to say).
                  </>
                )}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-amber-300">
                {lang === "fr" ? "Lancer Duality" : "Start Duality"}
                <span className="h-px w-6 bg-amber-400" />
              </span>
            </div>
          </button>

          {/* Soulset Navigator */}
          <button
            onClick={() => router.push("/soulset")}
            className="group relative overflow-hidden rounded-3xl border border-sky-400/35 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/40 px-6 py-6 text-left shadow-[0_0_60px_rgba(56,189,248,0.18)] transition hover:border-sky-300 hover:shadow-[0_0_80px_rgba(56,189,248,0.40)]"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-radial from-sky-400/20 via-transparent to-transparent" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-300 mb-2">
                Soulset Navigator
              </p>
              <h2 className="text-xl font-semibold mb-2">
                {lang === "fr"
                  ? "Sunset Therapy – phrase miroir + coucher de soleil"
                  : "Sunset Therapy – mirror sentence + sunset"}
              </h2>
              <p className="text-sm text-slate-200 mb-4">
                {lang === "fr"
                  ? "Tu décris ton état du moment. Une phrase miroir courte apparaît sur un coucher de soleil en plein écran."
                  : "You describe how you feel. A short mirror sentence appears on a fullscreen sunset."}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-sky-200">
                {lang === "fr"
                  ? "Commencer la Sunset Therapy"
                  : "Start Sunset Therapy"}
                <span className="h-px w-6 bg-sky-300" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}
