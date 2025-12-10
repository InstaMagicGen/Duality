"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

type Lang = "fr" | "en" | "ar";
type MoodLevel = 1 | 2 | 3 | 4 | 5;

type MoodLog = {
  id: string;
  createdAt: string;
  level: MoodLevel;
  note: string;
};

const translations: Record<Lang, any> = {
  fr: {
    mainTitle: "Soulset Journeys",
    mainSubtitle:
      "Duality pour le futur, Soulset Navigator pour scanner ta journée.",
    dualityTitle: "DUALITY",
    dualityDesc: "Voir ton futur probable.",
    soulsetTitle: "SOULSET NAVIGATOR",
    soulsetDesc: "Scanner ton état sur un coucher de soleil.",
    openDuality: "Ouvrir Duality",
    openSoulset: "Commencer",
    moodTitle: "Suivi de mood",
    moodQuestion: "Comment tu te sens aujourd’hui ?",
    moodLabel: "Note ton humeur (1 à 5)",
    moodPlaceholder: "Décris ton ressenti du jour...",
    moodSubmit: "Enregistrer",
    authLogin: "Connexion",
    authSignup: "Créer un compte",
    authLogout: "Déconnexion",
  },
  en: {},
  ar: {},
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = translations[lang];

  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [moodLevel, setMoodLevel] = useState<MoodLevel>(3);
  const [moodNote, setMoodNote] = useState("");
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });
  }, []);

  async function handleAuth() {
    if (mode === "signup") {
      await supabase.auth.signUp({ email, password });
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert("Invalid login credentials");
    }
    setEmail("");
    setPassword("");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  function handleSaveMood() {
    const newLog = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      level: moodLevel,
      note: moodNote,
    };
    setMoodLogs([newLog, ...moodLogs]);
    setMoodNote("");
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{t.mainTitle}</h1>

        <div className="flex gap-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-full border border-yellow-400"
            >
              {t.authLogout}
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setMode("signup");
                  setShowAuth(true);
                }}
                className="px-4 py-1 rounded-full border border-yellow-400"
              >
                {t.authSignup}
              </button>
              <button
                onClick={() => {
                  setMode("login");
                  setShowAuth(true);
                }}
                className="px-4 py-1 rounded-full bg-yellow-400 text-black"
              >
                {t.authLogin}
              </button>
            </>
          )}
        </div>
      </header>

      {/* AUTH MODAL */}
      {showAuth && !user && (
        <div className="max-w-sm mx-auto bg-zinc-900 p-6 rounded-xl mb-8">
          <h2 className="mb-4 text-lg">
            {mode === "login" ? "Connexion" : "Créer un compte"}
          </h2>

          <input
            className="w-full mb-2 p-2 rounded text-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-2">
            <input
              className="w-full p-2 rounded text-black"
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-xs text-black"
            >
              👁
            </button>
          </div>

          <button
            onClick={handleAuth}
            className="w-full bg-yellow-400 text-black py-2 rounded mb-2"
          >
            {mode === "login" ? "Se connecter" : "Créer"}
          </button>

          <button
            onClick={() =>
              supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo:
                    process.env.NEXT_PUBLIC_SITE_URL + "/",
                },
              })
            }
            className="w-full border py-2 rounded"
          >
            Continuer avec Google
          </button>

          <button
            onClick={() => setShowAuth(false)}
            className="text-xs mt-2 text-neutral-400"
          >
            Fermer
          </button>
        </div>
      )}

      {/* CARTES */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/duality"
          className="p-6 border rounded-xl hover:bg-zinc-800"
        >
          <h2>{t.dualityTitle}</h2>
          <p>{t.dualityDesc}</p>
        </Link>

        <Link
          href="/soulset"
          className="p-6 border rounded-xl hover:bg-zinc-800"
        >
          <h2>{t.soulsetTitle}</h2>
          <p>{t.soulsetDesc}</p>
        </Link>
      </section>

      {/* MOOD — UNIQUEMENT SI CONNECTÉ */}
      {user && (
        <section className="max-w-xl mx-auto bg-zinc-900 p-6 rounded-xl">
          <h3 className="mb-2">{t.moodTitle}</h3>

          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setMoodLevel(n as MoodLevel)}
                className={`w-8 h-8 rounded-full ${
                  moodLevel === n ? "bg-yellow-400 text-black" : "border"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <textarea
            className="w-full text-black p-2 rounded mb-3"
            placeholder={t.moodPlaceholder}
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
          />

          <button
            onClick={handleSaveMood}
            className="w-full bg-yellow-400 text-black py-2 rounded"
          >
            {t.moodSubmit}
          </button>
        </section>
      )}
    </main>
  );
}
