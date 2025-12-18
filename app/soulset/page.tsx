'use client';

import { useState } from 'react';
import { useI18n } from '../components/i18n';
import { Brain, Heart, Save, RotateCcw, ChevronRight, TrendingUp } from 'lucide-react';

type Question = {
  id: number;
  question: string;
  options: string[];
};

export default function SoulsetPage() {
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [saving, setSaving] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: t('soulset.question1'),
      options: [
        t('soulset.optionVeryGood'),
        t('soulset.optionGood'),
        t('soulset.optionNeutral'),
        t('soulset.optionBad'),
        t('soulset.optionVeryBad')
      ]
    },
    {
      id: 2,
      question: t('soulset.question2'),
      options: [
        'Très bas',
        'Bas',
        'Modéré',
        'Élevé',
        'Très élevé'
      ]
    },
    {
      id: 3,
      question: t('soulset.question3'),
      options: [
        'Très satisfait',
        'Satisfait',
        'Neutre',
        'Insatisfait',
        'Très insatisfait'
      ]
    },
    {
      id: 4,
      question: 'Comment gérez-vous le stress ?',
      options: [
        'Très bien',
        'Bien',
        'Moyennement',
        'Difficilement',
        'Très difficilement'
      ]
    },
    {
      id: 5,
      question: 'Quel est votre niveau d\'énergie ?',
      options: [
        'Très élevé',
        'Élevé',
        'Normal',
        'Bas',
        'Très bas'
      ]
    }
  ];

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Toutes les questions sont répondues
      const allAnswered = questions.every(q => answers[q.id] !== undefined);
      if (allAnswered) {
        setAnalysisComplete(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveResults = async () => {
    setSaving(true);
    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Résultats sauvegardés avec succès !');
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setAnalysisComplete(false);
  };

  const calculateResults = () => {
    const values = Object.values(answers);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    return {
      score: Math.round((1 - average / 4) * 100), // Convertir en pourcentage (0-100)
      mood: average < 1.5 ? 'Excellent' : average < 2.5 ? 'Bon' : average < 3.5 ? 'Neutre' : 'À améliorer',
      recommendations: [
        'Pratiquez la méditation quotidienne',
        'Faites de l\'exercice régulièrement',
        'Maintenez un journal de gratitude',
        'Passez du temps dans la nature'
      ]
    };
  };

  const results = analysisComplete ? calculateResults() : null;

  return (
    <div className="pt-20 pb-16 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('soulset.title')}
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t('soulset.description')}
        </p>
      </div>

      {!analysisComplete ? (
        /* Questionnaire */
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Question {currentStep + 1} sur {questions.length}
              </span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {Math.round(((currentStep + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Question */}
          <div className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {questions[currentStep].question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {questions[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(questions[currentStep].id, index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                    answers[questions[currentStep].id] === index
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-800 dark:text-white">
                      {option}
                    </span>
                    {answers[questions[currentStep].id] === index && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Précédent
            </button>
            <button
              onClick={handleNext}
              disabled={answers[questions[currentStep].id] === undefined}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
            >
              {currentStep < questions.length - 1 ? 'Suivant' : 'Terminer'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results */
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {t('soulset.results')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Voici l'analyse de votre état intérieur basée sur vos réponses
              </p>
            </div>

            {/* Score */}
            <div className="max-w-md mx-auto mb-10">
              <div className="relative">
                <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-1000"
                    style={{ width: `${results?.score || 0}%` }}
                  ></div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800 dark:text-white">
                      {results?.score}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Score de bien-être</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mood & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">
                  État général
                </h3>
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {results?.mood}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Votre état émotionnel est {results?.mood.toLowerCase()}. Continuez à prendre soin de vous.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">
                  Recommandations
                </h3>
                <ul className="space-y-3">
                  {results?.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSaveResults}
                disabled={saving}
                className="flex-1 max-w-xs mx-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    {t('soulset.save')}
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="flex-1 max-w-xs mx-auto px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                {t('soulset.retry')}
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Continuez votre exploration
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Découvrez vos contradictions intérieures avec notre analyse Duality
            </p>
            <a
              href="/duality"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Essayer Duality
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}