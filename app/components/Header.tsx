'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

type HeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  appName: string;
  slogan: string;
};

export default function Header({ theme, toggleTheme, appName, slogan }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-background text-foreground">
      <button onClick={toggleTheme} className="header-btn theme-btn">
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>

      <div className="text-center">
        <h1 className="text-2xl font-bold">{appName}</h1>
        <p className="text-sm italic">{slogan}</p>
      </div>

      <div className="flex gap-3">
        <button onClick={() => router.push('/login')} className="header-btn login-btn">
          Login
        </button>
        <button onClick={() => router.push('/signup')} className="header-btn signup-btn">
          Sign Up
        </button>
      </div>
    </header>
  );
}
