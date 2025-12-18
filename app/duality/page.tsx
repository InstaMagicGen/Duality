'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '../components/i18n';
import { Zap, Target, Brain, TrendingUp, Download, RefreshCw, AlertTriangle } from 'lucide-react';

type Conflict = {
  id: number;
  external: string;
  internal: string;
  tensionLevel: number;
  description: string;
  advice: string[];
};

export default function DualityPage() {
  const { t } = useI18n();
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedConflict, setSelectedConflict] = useState<Conflict | null>(null);

  const conflicts: Conflict[] = [
    {
      id: 1,
      external: 'Calme et contrôlé',
      internal: 'Stressé et anxieux',
      tensionLevel: 85,
      description: 'Vous montrez un calme apparent mais ressentez une forte anxiété intérieure. Cette tension peut entraîner de la fatigue mentale.',
      advice: [
        'Pratiquez des exercices de respiration',
        'Exprimez vos émotions dans un journal',
        'Consultez un professionnel si nécessaire'
      ]
    },
    {
      id: 2,
      external: 'Extraverti et sociable',
      internal: 'Besoin de solitude',
      tensionLevel: 70,
      description: 'Vous jouez un rôle sociable mais avez un réel besoin de temps seul pour recharger vos énergies.',
      advice: [
        'Planifiez des moments de solitude',
        'Communiquez vos besoins à votre entourage',
        'Équilibrez vie sociale et temps personnel'
      ]
    },
    {
      id: 3,
      external: 'Confiant et sûr de soi',
      internal: 'Doutes fréquents',
      tensionLevel: 65,
      description: 'Votre assurance extérieure cache des doutes intérieurs sur vos capacités et décisions.',
      advice: [
        'Reconnaissez vos réussites passées',
        'Pratiquez l\'auto-compassion',
        'Demandez des feedbacks constructifs'
      ]
    }
  ];

  useEffect(() => {
    if (analysisStarted && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setAnalysisComplete(true);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [progress, analysisStarted]);

  const startAnalysis = () => {
    setAnalysisStarted(true);
    setProgress(0);
    setAnalysisComplete(false);
  };

  const resetAnalysis = () => {
    setAnalysisStarted(false);
    setProgress(0);
    setAnalysisComplete(false);
    setSelectedConflict(null);
  };

  const exportResults = () => {
    const data = {
      date: new Date().toISOString(),
      conflicts: conflicts,
      selectedConflict: selectedConflict
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `duality-analysis-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-20 pb-16 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('duality.title')}
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t('duality.description')}
        </p>
      </div>

      {!analysisStarted ? (
        /* Start Analysis Card */
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-3xl shadow-2xl p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              Prêt à découvrir vos contradictions intérieures ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
              Notre analyse avancée examine les tensions entre votre personnalité publique et vos sentiments privés pour révéler des insights profonds sur votre psyché.
            </p>
            <button
              onClick={startAnalysis}
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center mx-auto"
            >
              <Target className="w-6 h-6 mr-3" />
              {t('duality.startAnalysis')}
            </button>
          </div>
        </div>
      ) : !analysisComplete ? (
        /* Analysis in Progress */
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="relative mb-10">
              <div className="w-48 h-48 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    className="dark:stroke-gray-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
                      {progress}%
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Analyse en cours...</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  {progress < 30 && 'Analyse des schémas comportementaux...'}
                  {progress >= 30 && progress < 60 && 'Identification des tensions émotionnelles...'}
                  {progress >= 60 && progress < 90 && 'Génération des insights personnalisés...'}
                  {progress >= 90 && 'Finalisation de l\'analyse...'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto animate-bounce" />
            </div>
          </div>
        </div>
      ) : (
        /* Results */
        <div className="space-y-8">
          {/* Summary Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Analyse Duality Complète
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Nous avons identifié {conflicts.length} tensions principales entre votre moi public et privé.
              </p>
            </div>

            {/* Tensions Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {conflicts.map((conflict) => (
                <button
                  key={conflict.id}
                  onClick={() => setSelectedConflict(conflict)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedConflict?.id === conflict.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      Tension {conflict.id}
                    </span>
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="mb-4">
                    <div className="text-lg font-bold text-gray-800 dark:text-white truncate">
                      {conflict.external}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">vs</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white truncate">
                      {conflict.internal}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full"
                      style={{ width: `${conflict.tensionLevel}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {conflict.tensionLevel}% de tension
                  </div>
                </button>
              ))}
            </div>

            {/* Detailed View */}
            {selectedConflict && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Analyse détaillée
                  </h3>
                  <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-full text-sm font-medium">
                    {selectedConflict.tensionLevel}% tension
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
                      {t('duality.external')}
                    </h4>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                      <p className="text-lg font-medium text-gray-800 dark:text-white">
                        {selectedConflict.external}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
                      {t('duality.internal')}
                    </h4>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                      <p className="text-lg font-medium text-gray-800 dark:text-white">
                        {selectedConflict.internal}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
                    {t('duality.conflict')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedConflict.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
                    {t('duality.advice')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedConflict.advice.map((advice, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <span className="text-purple-600 dark:text-purple-400 font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{advice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button
                onClick={exportResults}
                className="flex-1 max-w-xs mx-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Exporter les résultats
              </button>
              <button
                onClick={resetAnalysis}
                className="flex-1 max-w-xs mx-auto px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Nouvelle analyse
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Continuez votre développement personnel
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Pour une analyse plus approfondie de votre état émotionnel, essayez notre module Soulset
            </p>
            <a
              href="/soulset"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Explorer Soulset
              <Target className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}