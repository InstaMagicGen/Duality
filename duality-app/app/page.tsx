"use client";

import Link from "next/link";
import React from "react";

export default function Home() {
  function handleLoginClick() {
    // Placeholder connexion – à remplacer plus tard par Supabase Auth
    alert(
      "Le système de connexion (Supabase Auth) arrive dans la prochaine étape."
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* halo de fond */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
      </div>

      {/* barre du haut */}
      <header className="absolute top-4 left-0 right-0 flex items-center justify-between px-5 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-400 to-fuchsia-500 flex items-center justify-center text-sm font-semibold">
            Δ
          </div>
          <div className="text-xs sm:text-sm text-slate-300">
            <p className="font-semibold tracking-wide uppercase text-[11px] text-slate-100">
              Soulset Journeys
            </p>
            <p className="text-[11px]">Sunset-guided self-therapy studio</p>
          </div>
        </div>

        <button
          onClick={handleLoginClick}
          className="rounded-full border border-slate-500/60 bg-slate-900/60 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-100 shadow-sm backdrop-blur-md hover:border-amber-400 hover:text-amber-200 transition-all"
        >
          Se connecter
        </button>
      </header>

      {/* contenu centré */}
      <section className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-50 drop-shadow-[0_0_18px_rgba(0,0,0,0.7)]">
          Choisis ton voyage intérieur
        </h1>
        <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-300">
          Deux expériences complémentaires :{" "}
          <span className="font-semibold text-amber-300">Duality</span> pour
          voir ton futur probable & ton ombre,{" "}
          <span className="font-semibold text-sky-300">
            Soulset Navigator
          </span>{" "}
          pour scanner ta journée sur un coucher de soleil guidé.
        </p>

        {/* cartes centrées */}
        <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Carte Duality */}
          <Link
            href="/duality"
            className="group relative overflow-hidden rounded-3xl border border-amber-400/30 bg-slate-950/80 px-6 py-6 sm:px-7 sm:py-7 shadow-[0_18px_45px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-[0_22px_60px_rgba(0,0,0,0.85)]"
          >
            {/* glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-300 to-fuchsia-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/40">
                  Δ
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium tracking-[0.2em] text-amber-300/80 uppercase">
                    Mode profond
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold text-amber-100">
                    Duality
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-sm text-amber-50/90">
                Analyse ton texte pour révéler{" "}
                <span className="font-semibold text-amber-300">
                  ton futur probable (Life Echo)
                </span>{" "}
                et{" "}
                <span className="font-semibold text-amber-200">
                  la voix de ton ombre (ShadowTalk)
                </span>
                . Idéal pour les moments de décision ou de crise intérieure.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.18em] text-amber-300/90">
                  Entrer dans Duality
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/70 bg-amber-300/10 text-xs text-amber-200 transition group-hover:bg-amber-300 group-hover:text-slate-950">
                  ↗
                </span>
              </div>
            </div>
          </Link>

          {/* Carte Soulset Navigator */}
          <Link
            href="/soulset"
            className="group relative overflow-hidden rounded-3xl border border-sky-400/35 bg-slate-950/80 px-6 py-6 sm:px-7 sm:py-7 shadow-[0_18px_45px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-[0_22px_60px_rgba(0,0,0,0.85)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-400 via-cyan-300 to-emerald-400 text-slate-950 font-semibold shadow-lg shadow-sky-500/40">
                  ☼
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium tracking-[0.2em] text-sky-300/80 uppercase">
                    Mode sunset
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold text-sky-100">
                    Soulset Navigator
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-sm text-sky-50/90">
                Écris ton ressenti du moment, choisis ton mood et reçois une
                <span className="font-semibold text-sky-300">
                  {" "}
                  phrase-miroir
                </span>{" "}
                projetée sur un coucher de soleil immersif.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.18em] text-sky-300/90">
                  Commencer la Sunset Therapy
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-300/70 bg-sky-300/10 text-xs text-sky-200 transition group-hover:bg-sky-300 group-hover:text-slate-950">
                  ↗
                </span>
              </div>
            </div>
          </Link>
        </div>

        <p className="mt-6 text-[11px] text-slate-500">
          Prototype v1 — Ne remplace pas un suivi médical ou thérapeutique
          professionnel.
        </p>
      </section>
    </main>
  );
}
