'use client'

import { useState } from 'react'
import { useTheme } from '@/context/themeContext'
import { useLang } from './useLang'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLang()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        {/* Première ligne : Logo + Boutons droite */}
        <div className="flex justify-between items-center py-4">
          {/* Logo et nom de l'app - GAUCHE */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Soulset</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                Explorer ton futur et ton état intérieur
              </p>
            </div>
          </div>

          {/* Boutons droite */}
          <div className="flex items-center space-x-4">
            {/* Bouton thème dark/light */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Changer de thème"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Boutons auth */}
            <div className="hidden md:flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Créer un compte
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md">
                Se connecter
              </button>
            </div>

            {/* Menu mobile */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-gray-700 dark:text-gray-300">☰</span>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-3">
              <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Créer un compte
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">
                Se connecter
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}