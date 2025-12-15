"use client";

import "./globals.css";
import { ReactNode } from "react";
import Header from "./components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
