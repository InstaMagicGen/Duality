"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (["fr", "en", "ar"].includes(browserLang)) setLang(browserLang);
  }, []);

  const translations: Record<string, Record<string, string>> = {
    home: { fr: "Accueil", en: "Home", ar: "الرئيسية" },
    duality: { fr: "Dualité", en: "Duality", ar: "الثنائية" },
    soulset: { fr: "Soulset Navigator", en: "Soulset Navigator", ar: "ملاح الروح" },
    login: { fr: "Connexion", en: "Login", ar: "تسجيل الدخول" },
    signup: { fr: "Créer un compte", en: "Sign Up", ar: "إنشاء حساب" },
  };

  return (
    <header className="header-container">
      <nav>
        <Link href="/">{translations.home[lang]}</Link>
        <Link href="/duality">{translations.duality[lang]}</Link>
        <Link href="/soulset">{translations.soulset[lang]}</Link>
        <Link href="/login">{translations.login[lang]}</Link>
        <Link href="/signup">{translations.signup[lang]}</Link>
      </nav>
    </header>
  );
}
