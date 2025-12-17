"use client";

import "./globals.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Détection automatique de la langue
  const [lang, setLang] = useState<"fr" | "en" | "ar">("fr");

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === "fr" || browserLang === "en" || browserLang === "ar") {
      setLang(browserLang as "fr" | "en" | "ar");
    }
  }, []);

  return (
    <html lang={lang}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header lang={lang} />
        {children}
      </body>
    </html>
  );
}
