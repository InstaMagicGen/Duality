"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<"fr" | "en" | "ar">("fr");

  return (
    <html lang={lang}>
      <body>
        <Header lang={lang} setLang={setLang} />
        {children}
      </body>
    </html>
  );
}
