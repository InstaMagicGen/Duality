'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface MoodLog {
  id: string;
  mood: string;
  created_at: string;
}

interface MoodDashboardProps {
  moodLogs: MoodLog[];
  enableSupabaseSync: boolean;
}

interface MoodDashboardHandlers {
  onClose: () => void;
}

export default function MoodDashboard({
  moodLogs,
  enableSupabaseSync,
  onClose,
}: MoodDashboardProps & MoodDashboardHandlers) {
  const [logs, setLogs] = useState<MoodLog[]>(moodLogs || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enableSupabaseSync) return;

    const fetchMoods = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from<MoodLog>('mood_logs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setLogs(data);
      } catch (err) {
        console.error('Erreur récupération moods:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();

    // Optional: realtime subscription
    const subscription = supabase
      .from('mood_logs')
      .on('INSERT', (payload) => setLogs((prev) => [payload.new, ...prev]))
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [enableSupabaseSync]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-xl">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Mood Dashboard</h2>

        {loading && <p>Loading...</p>}

        {!loading && logs.length === 0 && (
          <p>No moods logged yet.</p>
        )}

        {!loading && logs.length > 0 && (
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {logs.map((log) => (
              <li
                key={log.id}
                className="p-2 border rounded flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span>{log.mood}</span>
                <span className="text-xs text-gray-400">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

