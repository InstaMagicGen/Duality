"use client";

import "./globals.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<"fr" | "en" | "ar">("fr");

  // Détection automatique de la langue
  useEffect(() => {
    const userLang = navigator.language.slice(0, 2);
    if (["fr", "en", "ar"].includes(userLang)) setLang(userLang as "fr" | "en" | "ar");
  }, []);

  return (
    <html lang={lang}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header lang={lang} />
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
