import React from "react";

type HeaderProps = {
  lang: "fr" | "en" | "ar";
};

export default function Header({ lang }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      {/* Dark/Light toggle */}
      <button className="px-3 py-1 border rounded text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
        🌙 / ☀️
      </button>

      {/* Nom de l'app + slogan */}
      <div className="text-center">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-gray-100">Soulset</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Explorer ton futur et ton état intérieur</p>
      </div>

      {/* Boutons connexion / créer compte */}
      <div className="flex gap-4">
        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition">
          Se connecter
        </button>
        <button className="px-4 py-2 bg-gold text-white rounded hover:bg-yellow-500 transition">
          Créer un compte
        </button>
      </div>
    </header>
  );
}
