'use client';
import Header from './Header';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  };

  const appName = 'Soulset Hub';
  const slogan = 'Votre parcours vers l’équilibre intérieur';

  return (
    <body>
      <Header theme={theme} toggleTheme={toggleTheme} appName={appName} slogan={slogan} />
      {children}
    </body>
  );
}
