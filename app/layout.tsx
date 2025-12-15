'use client'

import React, { useState } from 'react';
import Header from './components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          appName="Soulset Journeys"
          slogan="Explore your inner balance"
        />
        {children}
      </body>
    </html>
  );
}
