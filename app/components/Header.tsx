'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type HeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  appName: string;
  slogan: string;
};

export default function Header({
  theme,
  toggleTheme,
  appName,
  slogan,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4">
      {/* LEFT */}
      <button onClick={toggleTheme}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>

      {/* CENTER */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">{appName}</h1>
        <p className="text-sm opacity-70">{slogan}</p>
      </div>

      {/* RIGHT */}
      <div className="flex gap-3">
        <button onClick={() => router.push('/login')}>Login</button>
        <button onClick={() => router.push('/signup')}>Sign up</button>
      </div>
    </header>
  );
}
