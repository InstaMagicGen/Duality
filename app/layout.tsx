'use client'

import './globals.css'
import { useState } from 'react'
import Header from './components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <html lang="en" data-theme={theme}>
      <body>
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          appName="Soulset Hub"
          slogan="Your journey to inner balance"
        />
        {children}
      </body>
    </html>
  )
}
