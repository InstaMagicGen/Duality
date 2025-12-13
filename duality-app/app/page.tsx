"use client";

import { useEffect, useState } from "react";

/* =========================================================
   Traductions simples basées sur la langue système
   ========================================================= */

const translations = {
  fr: {
    title: "Duality",
    subtitle: "Un espace pour te situer intérieurement.",
    login: "Créer / Connexion",
    choosePath: "Choisis ton espace",
    soulset: "SoulsetNav",
    duality: "Duality",
    moodTitle: "Comment te sens-tu maintenant ?",
    footer: "Duality · Soulset Journey",
  },
  en: {
    title: "Duality",
    subtitle: "A space to locate yourself internally.",
    login: "Create / Login",
    choosePath: "Choose your space",
    soulset: "SoulsetNav",
    duality: "Duality",
    moodTitle: "How do you feel right now?",
    footer: "Duality · Soulset Journey",
  },
};

type Mood =
  | "calm"
  | "confused"
  | "sad"
  | "angry"
  | "tired"
  | "motivated";

const MOODS: { id: Mood; label: string }[] = [
  { id: "calm", label: "😌 Calm" },
  { id: "confused", label: "😕 Confused" },
  { id: "sad", label: "😔 Sad" },
  { id: "angry", label: "😠 Angry" },
  { id: "tired", label: "🥱 Tired" },
  { id: "motivated", label: "🔥 Motivated" },
];

export default function Page() {
  const [lang, setLang] = useState<"fr" | "en">("en");
  const [isConnected, setIsConnected] = useState(false);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  /* =========================================================
     Détection langue système
     ========================================================= */
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const systemLang = navigator.language.startsWith("fr") ? "fr" : "en";
      setLang(systemLang);
    }
  }, []);

  const t = translations[lang];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* ================= TOP BAR ================= */}
      <header className="w-full flex justify-end p-6">
        <button
          onClick={() => setIsConnected(true)}
          className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-all text-sm"
        >
          {t.login}
        </button>
      </header>

      {/* ================= CENTER ================= */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-semibold mb-4">{t.title}</h1>
        <p className="text-neutral-400 text-sm mb-12">{t.subtitle}</p>

        {/* ===== PATH BUTTONS ===== */}
        <h2 className="text-sm text-neutral-500 mb-4">
          {t.choosePath}
        </h2>

        <div className="flex gap-6">
          <button
            className="
              px-8 py-4 rounded-2xl
              bg-neutral-800 hover:bg-indigo-600
              transition-all duration-300
              hover:scale-105 hover:shadow-xl
            "
          >
            {t.soulset}
          </button>

          <button
            className="
              px-8 py-4 rounded-2xl
              bg-neutral-800 hover:bg-fuchsia-600
              transition-all duration-300
              hover:scale-105 hover:shadow-xl
            "
          >
            {t.duality}
          </button>
        </div>

        {/* ================= MOOD DASHBOARD ================= */}
        {isConnected && (
          <section className="mt-16 max-w-md w-full">
            <h3 className="text-lg mb-6">{t.moodTitle}</h3>

            <div className="grid grid-cols-2 gap-4">
              {MOODS.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`
                    px-4 py-3 rounded-xl text-sm
                    transition-all
                    ${
                      selectedMood === mood.id
                        ? "bg-indigo-500 text-black scale-105"
                        : "bg-neutral-800 hover:bg-neutral-700"
                    }
                  `}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-xs text-neutral-600 text-center p-6">
        {t.footer}
      </footer>
    </main>
  );
}
