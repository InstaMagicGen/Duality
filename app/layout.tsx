"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState<"fr"|"en"|"ar">("fr");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const l = window.navigator.language?.toLowerCase() ?? "fr";
    if(l.startsWith("fr")) setLang("fr");
    else if(l.startsWith("ar")) setLang("ar");
    else setLang("en");

    document.body.classList.toggle("light", !darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <html lang={lang}>
      <body>
        <header className="global-header">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <div className="text-center">
              <h1 className="text-lg font-bold">Soulset</h1>
              <p className="text-[11px]">{lang === "fr" ? "Explorer ton futur & ton humeur" : lang==="ar"?"استكشف مستقبلك ومزاجك":"Explore your future & mood"}</p>
            </div>
          </div>
          <button onClick={toggleDarkMode} className="dark-light-toggle">
            {darkMode ? "🌙" : "☀️"}
          </button>
        </header>
        {children}
      </body>
    </html>
  );
}
