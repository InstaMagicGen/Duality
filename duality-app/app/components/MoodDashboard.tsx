"use client";

import React, { useEffect, useMemo, useState } from "react";

type MoodLevel = 1 | 2 | 3 | 4 | 5;
type MoodLog = { id: string; createdAt: string; level: MoodLevel; note: string; };

export default function MoodDashboard({
  logs,
  onSave,
}: {
  logs?: MoodLog[];
  onSave?: (note: string, level: MoodLevel) => void;
}) {
  const [level, setLevel] = useState<MoodLevel>(3);
  const [note, setNote] = useState("");
  const [localLogs, setLocalLogs] = useState<MoodLog[]>(logs ?? []);

  useEffect(() => {
    if (logs && logs.length) setLocalLogs(logs);
  }, [logs]);

  useEffect(() => {
    // keep localStorage in sync for the dashboard alone
    try {
      localStorage.setItem("soulset_moods", JSON.stringify(localLogs));
    } catch (e) {
      // ignore
    }
  }, [localLogs]);

  function save() {
    if (!note.trim()) return;
    const item: MoodLog = { id: `${Date.now()}`, createdAt: new Date().toISOString(), level, note: note.trim() };
    setLocalLogs(prev => [item, ...prev].slice(0, 50));
    setNote("");
    if (onSave) onSave(item.note, item.level);
  }

  const points = useMemo(() => {
    // create points for last up to 12 logs (reverse chronological)
    const recent = localLogs.slice(0, 12).reverse(); // oldest->newest
    return recent.map((l, i) => ({ x: i, y: l.level }));
  }, [localLogs]);

  // simple line path generator (SVG)
  const svgPath = useMemo(() => {
    if (!points || points.length === 0) return "";
    const W = 280, H = 80;
    const pad = 10;
    const step = points.length > 1 ? (W - pad * 2) / (points.length - 1) : 0;
    return points.map((p, i) => {
      const x = pad + i * step;
      const y = pad + (5 - p.y) * ((H - pad * 2) / 4);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  }, [points]);

  return (
    <div className="rounded-3xl border border-neutral-700/70 bg-gradient-to-br from-black/60 to-black/80 p-6 md:p-7 shadow-[0_0_40px_rgba(10,10,12,0.7)]">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-yellow-300">Suivi de mood</h3>
          <p className="text-sm text-neutral-400">Enregistre ton humeur — visualisation premium.</p>
        </div>
        <div className="text-xs text-neutral-500">Dernières {localLogs.length} entrées</div>
      </div>

      {/* mini chart */}
      <div className="flex gap-6 items-center mb-5">
        <svg width={320} height={110} viewBox="0 0 320 110" className="bg-gradient-to-b from-neutral-900/40 to-transparent rounded-xl p-2">
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#ffd54a" stopOpacity="0.45" />
              <stop offset="1" stopColor="#00d9ff" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width="100%" height="100%" rx={8} fill="transparent" />
          {svgPath && <path d={svgPath} fill="none" stroke="#ffd54a" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />}
          {points.map((p, i) => {
            const W = 280, H = 80, pad = 10;
            const step = points.length > 1 ? (W - pad * 2) / (points.length - 1) : 0;
            const x = 16 + i * step;
            const y = 16 + (5 - p.y) * ((H - pad * 2) / 4);
            return <circle key={i} cx={x} cy={y} r={4.5} fill="#ffd54a" stroke="#111" strokeWidth={1} />;
          })}
        </svg>

        <div className="flex-1">
          <div className="mb-2 text-xs text-neutral-400">Saisis ton ressenti</div>
          <div className="flex items-center gap-2 mb-2">
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setLevel(n as MoodLevel)} className={`w-9 h-9 rounded-full border ${level===n ? "bg-yellow-400 text-black border-yellow-300" : "bg-black text-neutral-200 border-neutral-600"}`}>
                {n}
              </button>
            ))}
          </div>
          <textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Décris ton ressenti du jour..." className="w-full rounded-xl bg-black/70 border border-neutral-700 p-3 text-sm text-white resize-none h-20 placeholder:text-neutral-400" />
          <div className="mt-3 flex gap-3">
            <button onClick={save} className="rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 px-5 py-2 text-black font-semibold shadow-[0_6px_30px_rgba(250,204,21,0.25)] hover:brightness-105">Enregistrer</button>
            <button onClick={()=>{ setNote(""); setLevel(3); }} className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300">Annuler</button>
          </div>
        </div>
      </div>

      {/* list recent */}
      <div>
        <p className="text-xs text-neutral-400 mb-2">Historique</p>
        <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {localLogs.length === 0 && <li className="text-sm text-neutral-500">Aucun mood enregistré — commence une session.</li>}
          {localLogs.map(l => (
            <li key={l.id} className="rounded-lg bg-black/60 border border-neutral-700 p-3 text-sm text-neutral-200 flex justify-between items-start">
              <div>
                <div className="text-xs text-neutral-400">{new Date(l.createdAt).toLocaleString()}</div>
                <div className="mt-1">{l.note}</div>
              </div>
              <div className="ml-4 text-yellow-300 font-semibold">{l.level}/5</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
