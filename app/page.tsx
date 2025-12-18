import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="pt-12 pb-20">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Bienvenue dans <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Soulset</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explorer ton futur et ton état intérieur
        </p>
      </section>

      {/* Deux boutons principaux - DUALITY et SOULSET */}
      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Carte DUALITY */}
          <Link href="/duality">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-4 right-4 text-3xl">🌀</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                DUALITY
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-semibold">Futur probable</span>
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Tu écris ce que tu vis, Duality renvoie un LIFE ECHO (futur probable) et un SHADOWTALK (ta conscience profonde).
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  LIFE ECHO : SHADOWTALK
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg group-hover:shadow-lg transition-shadow">
                  Ouvrir Duality
                </span>
              </div>
            </div>
          </Link>

          {/* Carte SOULSET NAVIGATOR */}
          <Link href="/souiset">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-4 right-4 text-3xl">🌅</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                SOULSET NAVIGATOR
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-semibold">Sunset Therapy</span>
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Décris ton état du moment, puis laisse une phrase miroir courte se projeter sur un coucher de soleil apaisant.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  SCAN : SUNSET THERAPY
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg group-hover:shadow-lg transition-shadow">
                  Commencer la Sunset Therapy
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Bouton de suivi de mood */}
        <div className="text-center mt-12">
          <Link href="/mood-summary">
            <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">
              Voir mon suivi de mood
            </button>
          </Link>
        </div>
      </section>

      {/* Section caractéristiques (optionnel - garde tes features actuelles) */}
      <section className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Caractéristiques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tes features actuelles ici */}
        </div>
      </section>
    </div>
  )
}