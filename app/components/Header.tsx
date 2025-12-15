'use client'

import { useRouter } from 'next/navigation'

type HeaderProps = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  appName: string
  slogan: string
}

export default function Header({
  theme,
  toggleTheme,
  appName,
  slogan,
}: HeaderProps) {
  const router = useRouter()

  return (
    <header className="header">
      <button onClick={toggleTheme} className="header-btn">
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>

      <div className="header-center">
        <h1>{appName}</h1>
        <p>{slogan}</p>
      </div>

      <div className="header-actions">
        <button onClick={() => router.push('/login')} className="header-btn">
          Login
        </button>
        <button onClick={() => router.push('/signup')} className="header-btn primary">
          Sign Up
        </button>
      </div>
    </header>
  )
}
