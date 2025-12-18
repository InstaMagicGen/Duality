'use client'

import React, { createContext, useContext, ReactNode } from 'react'

// Traductions simplifiées
const translations = {
  // Français par défaut
  'welcome': 'Bienvenue',
  'start': 'Commencer',
  'explore': 'Explorer',
  'login': 'Se connecter',
  'signup': 'Créer un compte',
  'theme': 'Thème',
  'home': 'Accueil',
  'features': 'Caractéristiques',
  'mood': 'Humeur',
  'future': 'Futur',
  'therapy': 'Thérapie',
  // Ajoute d'autres clés selon tes besoins
}

type Translations = typeof translations

const I18nContext = createContext<{
  t: (key: keyof Translations) => string
} | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const t = (key: keyof Translations) => {
    return translations[key] || key
  }

  return (
    <I18nContext.Provider value={{ t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}