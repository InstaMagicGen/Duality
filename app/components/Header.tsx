"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="global-header">
      <div className="logo">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <span>SunsetApp</span>
      </div>

      <div className="center-title">
        <h1>SunsetApp</h1>
        <p>Explore your day & future with Duality + Soulset</p>
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </header>
  );
}
