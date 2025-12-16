// ./app/components/useLang.tsx
import { useState, useEffect } from 'react';

const useLang = () => {
  const [lang, setLang] = useState('en'); // Valeur par défaut en anglais
  
  useEffect(() => {
    // Logique pour récupérer la langue courante (locale, cookie, etc.)
    const savedLang = localStorage.getItem('lang') || 'en'; // Utilisation de localStorage pour stocker la langue choisie
    setLang(savedLang);
  }, []);

  return lang;
};

export { useLang };
