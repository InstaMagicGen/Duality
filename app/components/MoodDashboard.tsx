"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export type MoodLog = {
  id: string;
  createdAt: string;
  level: MoodLevel;
  note: string;
};

interface MoodDashboardProps {
  initial?: MoodLog[];
  enableSupabaseSync?: boolean;
  onClose?: () => void;
}

export default function MoodDashboard({ initial = [], enableSupabaseSync = false, onClose }: MoodDashboardProps) {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(initial);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!enableSupabaseSync) return;

    const fetchMoods = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("mood_logs")
          .select("*")
          .order("createdAt", { ascending: false })
          .limit(50);

        if (error) console.error("Erreur récupération moods Supabase", error);
        else if (data) {
          const mapped = data.map((d: any) => ({
            id: d.id.toString(),
            createdAt: d.createdAt,
            level: d.level,
            note: d.note,
          })) as MoodLog[];
          setMoodLogs(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();

    const subscription = supabase
      .channel("public:mood_logs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mood_logs" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newLog: MoodLog = {
              id: payload.new.id.toString(),
              createdAt: payload.new.createdAt,
              level: payload.new.level,
              note: payload.new.note,
            };
            setMoodLogs((prev) => [newLog, ...prev]);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [enableSupabaseSync]);

  return (
    <div className="rounded-3xl border border-neutral-700/80 bg-black/90 p-6 md:p-7 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-sm max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-neutral-50">Mood Dashboard</h3>
        {onClose && (
          <button onClick={onClose} className="text-sm text-neutral-400 hover:text-yellow-300 transition">Fermer</button>
        )}
      </div>

      {loading && <p className="text-sm text-neutral-400 mb-3">Chargement…</p>}
      {moodLogs.length === 0 && !loading && <p className="text-sm text-neutral-400">Aucun mood enregistré.</p>}

      <ul className="space-y-3">
        {moodLogs.map((log) => (
          <li key={log.id} className="rounded-xl border border-neutral-700/70 bg-black/70 px-3 py-2 text-sm text-neutral-200">
            <div className="flex items-center justify-between mb-1 gap-2">
              <span className="font-semibold text-yellow-300">{log.level}/5</span>
              <span className="text-[10px] text-neutral-500">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
            <p className="leading-snug whitespace-pre-line">{log.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
