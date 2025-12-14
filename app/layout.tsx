'use client';

import './globals.css';
import { useState } from 'react';
import Header from './components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <html lang="fr" data-theme={theme}>
      <body className={theme}>
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          appName="DUALITY"
          slogan="Unify your inner forces"
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
