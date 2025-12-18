'use client';

import { useI18n } from './components/i18n';
import Link from 'next/link';
import { ArrowRight, Brain, Heart, Target, Zap } from 'lucide-react';
import Footer from './components/Footer';

export default function HomePage() {
  const { t } = useI18n();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: t('home.feature1'),
      description: t('home.soulsetDesc')
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('home.feature2'),
      description: "Évaluez vos capacités cognitives avec des tests validés scientifiquement"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t('home.feature3'),
      description: "Visualisez vos progrès avec des graphiques clairs et détaillés"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('home.feature4'),
      description: "Recevez des recommandations adaptées à votre profil unique"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/soulset"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1"
            >
              {t('home.getStarted')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/duality"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
            >
              {t('nav.duality')}
            </Link>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('home.featuresTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Soulset & Duality Preview */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {t('home.soulsetTitle')}
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {t('home.soulsetDesc')}
            </p>
            <Link
              href="/soulset"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Explorer Soulset
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-3xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {t('home.dualityTitle')}
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {t('home.dualityDesc')}
            </p>
            <Link
              href="/duality"
              className="inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:underline"
            >
              Découvrir Duality
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à explorer votre monde intérieur ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté et commencez votre voyage de découverte personnelle aujourd'hui.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Commencer gratuitement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}