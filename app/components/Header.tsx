'use client'

import { useState } from 'react'
import { useTheme } from '../context/themeContext'
import { useI18n } from './i18n' // Utilise useI18n directement

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n() // Décommente cette ligne
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      {/* ... reste du code ... */}
      {/* Utilise t() pour les textes si besoin */}
      <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('signup')}
      </button>
      {/* ... */}
    </header>
  )
}