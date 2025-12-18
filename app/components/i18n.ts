// Version TypeScript simple
export function useI18n() {
  const t = (key: string): string => {
    // Retourne juste la clé pour l'instant
    return key
  }
  
  return { t }
}
