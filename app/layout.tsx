"use client";

import "./globals.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<"fr" | "en" | "ar">("fr");

  // Détection automatique de la langue
  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (["fr", "en", "ar"].includes(browserLang)) {
      setLang(browserLang as "fr" | "en" | "ar");
    }
  }, []);

  return (
    <html lang={lang}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        {children}
      </body>
    </html>
  );
}
