'use client';

import { useState } from 'react';
import { useI18n } from './i18n';
import { TrendingUp, Calendar, Filter, Download } from 'lucide-react';

export default function MoodDashboard() {
  const { t } = useI18n();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const moodData = {
    week: [
      { day: 'Lun', value: 75 },
      { day: 'Mar', value: 80 },
      { day: 'Mer', value: 65 },
      { day: 'Jeu', value: 70 },
      { day: 'Ven', value: 85 },
      { day: 'Sam', value: 90 },
      { day: 'Dim', value: 75 }
    ],
    month: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      value: 60 + Math.random() * 40
    })),
    year: Array.from({ length: 12 }, (_, i) => ({
      day: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'][i],
      value: 50 + Math.random() * 50
    }))
  };

  const currentData = moodData[timeRange];
  const maxValue = Math.max(...currentData.map(d => d.value));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Tableau de bord d'humeur
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Suivez l'évolution de votre état émotionnel
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </select>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-8">
        <div className="flex items-end h-48 space-x-2">
          {currentData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full rounded-t-lg transition-all duration-500"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  background: item.value > 75 
                    ? 'linear-gradient(to top, #4ade80, #22c55e)' 
                    : item.value > 50 
                    ? 'linear-gradient(to top, #fbbf24, #f59e0b)'
                    : 'linear-gradient(to top, #f87171, #ef4444)'
                }}
              ></div>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                {typeof item.day === 'number' && timeRange === 'month' ? item.day : item.day}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Moyenne</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round(currentData.reduce((a, b) => a + b.value, 0) / currentData.length)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Maximum</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round(maxValue)}%
              </p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tendance</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {currentData[currentData.length - 1].value > currentData[0].value ? '↑' : '↓'}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">i</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}