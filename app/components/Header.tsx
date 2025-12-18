'use client'

import { useState } from 'react'
import { useTheme } from '../context/themeContext'  // Chemin relatif
// import { useLang } from './useLang'  // Décommente si tu as ce fichier

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  // const { t } = useLang()  // Décommente si tu utilises useLang
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      {/* ... reste du code identique ... */}
    </header>
  )
}