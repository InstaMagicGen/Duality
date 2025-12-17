"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Détection automatique de la langue du navigateur
  const [lang, setLang] = useState<"fr" | "en" | "ar">("fr");

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (["fr", "en", "ar"].includes(browserLang)) {
      setLang(browserLang as "fr" | "en" | "ar");
    }
  }, []);

  return (
    <html lang={lang}>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header lang={lang} />
        <main>{children}</main>
      </body>
    </html>
  );
}
