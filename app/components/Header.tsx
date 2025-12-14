"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="header">
      <div className="flex-1"></div> {/* espace vide à gauche */}
      
      <img src="/logo.png" alt="Logo Soulset" className="logo" />

      <div className="flex gap-3">
        <button
          onClick={() => router.push("/login")}
          className="header-btn login-btn"
        >
          Se connecter
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="header-btn signup-btn"
        >
          Créer un compte
        </button>
      </div>
    </header>
  );
}
