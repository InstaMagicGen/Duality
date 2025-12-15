'use client';

import { useRouter } from 'next/navigation';

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
    <header className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      
      {/* Left */}
      <button
        onClick={toggleTheme}
        className="rounded-full border px-3 py-1 text-sm"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>

      {/* Center */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">{appName}</h1>
        <p className="text-sm opacity-80 italic">{slogan}</p>
      </div>

      {/* Right */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 rounded-lg border hover:bg-opacity-10"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black"
        >
          Create Account
        </button>
      </div>
    </header>
  );
}
