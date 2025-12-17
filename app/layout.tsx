"use client";

import "./globals.css"; // chemin correct
import React, { useState } from "react"; // <-- ajout de useState
import Header from "./components/Header";  


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
