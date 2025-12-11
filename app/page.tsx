'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/supabase-js';
import MoodDashboard, { MoodLog } from './components/MoodDashboard';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const supabase = createClientComponentClient();
  const { t, i18n } = useTranslation();

  // Détection automatique de la langue du navigateur
  useEffect(() => {
    const lang = navigator.language || navigator['userLanguage'] || 'en';
    i18n.changeLanguage(lang.startsWith('fr') ? 'fr' : 'en');
  }, [i18n]);

  const [session, setSession] = useState<Session | null>(null);
  const [showMoodDashboard, setShowMoodDashboard] = useState(false);
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [user, setUser] = useState<any>(null);

  // Récupération session Supabase
  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
    };
    fetchSession();
  }, [supabase]);

  // Exemple: récupération des MoodLogs si connecté
  useEffect(() => {
    if (!user) return;

    const fetchMoods = async () => {
      const { data, error } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) setMoodLogs(data as MoodLog[]);
    };
    fetchMoods();
  }, [user, supabase]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      {/* Header */}
      <header className="w-full flex justify-end p-4 bg-white shadow-md">
        <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          {t('Connexion')}
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          {t('Créer un compte')}
        </button>
      </header>

      {/* Contenu central */}
      <section className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-6">{t('Duality')}</h1>
        <div className="flex space-x-4">
          <button
            className="px-6 py-4 bg-indigo-500 text-white rounded shadow-lg hover:bg-indigo-600 transition"
            onClick={() => setShowMoodDashboard(true)}
          >
            {t('Mood Dashboard')}
          </button>
          <button className="px-6 py-4 bg-purple-500 text-white rounded shadow-lg hover:bg-purple-600 transition">
            {t('Autre Action')}
          </button>
        </div>
      </section>

      {/* MoodDashboard */}
      {showMoodDashboard && user && (
        <MoodDashboard
          moodLogs={moodLogs}
          enableSupabaseSync={!!user}
          onClose={() => setShowMoodDashboard(false)}
        />
      )}
    </main>
  );
}
