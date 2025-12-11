"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // facultatif : pour sync

type MoodLog = {
  id: string;
  createdAt: string;
  level: number; // 1..5
  note?: string;
};

type Props = {
  initial?: MoodLog[]; // optionnel, fournis depuis la page si tu veux
  enableSupabaseSync?: boolean; // si true, affiche le bouton "sync"
};

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
}

/** Convertit logs en array points normalisés */
function buildPoints(logs: MoodLog[], w: number, h: number) {
  if (!logs || logs.length === 0) return [];
  const max = Math.max(5, ...logs.map((l) => l.level));
  const min = Math.min(1, ...logs.map((l) => l.level));
  const range = max - min || 1;
  return logs.map((l, i) => {
    const x = (i / (logs.length - 1 || 1)) * (w - 40) + 20;
    const y = 20 + ((max - l.level) / range) * (h - 60);
    return { x, y, level: l.level, label: formatDate(l.createdAt) };
  });
}

export default function MoodDashboard({ initial = [], enableSupabaseSync = false }: Props) {
  const [logs, setLogs] = useState<MoodLog[]>(initial);
  const [loading, setLoading] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // load local logs if none passed
  useEffect(() => {
    if (initial?.length) return;
    try {
      const raw = localStorage.getItem("soulset_moods");
      if (raw) {
        setLogs(JSON.parse(raw));
      }
    } catch (e) {
      console.warn("Mood load error", e);
    }
  }, [initial]);

  // basic stats
  const stats = useMemo(() => {
    if (!logs.length) return { avg: 0, last: 0, delta: 0 };
    const avg = logs.reduce((s, l) => s + l.level, 0) / logs.length;
    const last = logs[0].level;
    const delta = logs.length > 1 ? last - logs[1].level : 0;
    return { avg: Number(avg.toFixed(2)), last, delta };
  }, [logs]);

  // SVG dimensions (responsive-ish)
  const W = 800;
  const H = 260;
  const points = buildPoints([...logs].slice(0, 12).reverse(), W, H); // latest 12

  async function syncToSupabase() {
    if (!enableSupabaseSync) return;
    setLoading(true);
    try {
      // On suppose table "mood_logs" (user_id to add server-side)
      const rows = logs.map((l) => ({
        created_at: l.createdAt,
        level: l.level,
        note: l.note ?? null,
      }));
      const { error } = await supabase.from("mood_logs").insert(rows);
      if (error) throw error;
      alert("Synchronisation réussie (Supabase).");
    } catch (err: any) {
      console.error(err);
      alert("Erreur sync Supabase : " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  function downloadSVGAsPNG() {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svg.clientWidth * 2;
      canvas.height = svg.clientHeight * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#081018";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => {
        if (!b) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = `mood-trend-${Date.now()}.png`;
        a.click();
      }, "image/png");
    };
    img.crossOrigin = "anonymous";
    img.src = url;
  }

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl p-6 bg-gradient-to-b from-neutral-900/80 to-black/80 border border-neutral-700 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-yellow-300">Suivi de ton mood</h3>
          <p className="text-xs text-neutral-400">
            Vue synthétique de tes derniers moods — évolution, moyenne et export.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-sm">
            <div className="text-xs text-neutral-400">Moyenne</div>
            <div className="text-white font-semibold">{stats.avg || "-"}/5</div>
          </div>
          <div className="text-right text-sm">
            <div className="text-xs text-neutral-400">Dernier</div>
            <div className="text-white font-semibold">{stats.last || "-"}/5</div>
          </div>
          <button
            onClick={downloadSVGAsPNG}
            className="px-3 py-1 rounded-full bg-yellow-400 text-black font-medium shadow-md hover:brightness-105"
          >
            Export PNG
          </button>
          {enableSupabaseSync && (
            <button
              onClick={syncToSupabase}
              disabled={loading}
              className="px-3 py-1 rounded-full border border-neutral-600 text-sm text-neutral-200 hover:border-yellow-300"
            >
              Sync
            </button>
          )}
        </div>
      </div>

      <div className="rounded-lg overflow-hidden bg-gradient-to-b from-slate-900/70 to-black p-4">
        <div className="flex gap-4">
          {/* SVG chart */}
          <div className="flex-1">
            {points.length === 0 ? (
              <div className="h-44 flex items-center justify-center text-neutral-500">
                Aucun mood enregistré pour l'instant.
              </div>
            ) : (
              <svg
                ref={svgRef}
                viewBox={`0 0 ${W} ${H}`}
                width="100%"
                height={H / 2}
                className="rounded"
                role="img"
                aria-label="Mood trend"
              >
                {/* background grid */}
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fde68a" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#fb923c" stopOpacity="0.06" />
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width={W} height={H} fill="#071226" rx="6" />

                {/* area under curve */}
                {points.length > 1 && (
                  <>
                    <path
                      d={
                        "M " +
                        points.map((p, i) => `${p.x},${p.y}`).join(" L ") +
                        ` L ${points[points.length - 1].x},${H - 20} L ${points[0].x},${H - 20} Z`
                      }
                      fill="url(#g1)"
                      opacity="0.9"
                    />
                    {/* polyline */}
                    <polyline
                      fill="none"
                      stroke="#facc15"
                      strokeWidth={3}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      points={points.map((p) => `${p.x},${p.y}`).join(" ")}
                    />
                  </>
                )}

                {/* points */}
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={6} fill="#f59e0b" stroke="#fff4" strokeWidth={1} />
                    <text x={p.x} y={p.y - 12} fontSize="11" textAnchor="middle" fill="#dbeafe">
                      {p.level}
                    </text>
                  </g>
                ))}

                {/* x labels */}
                {points.map((p, i) => (
                  <text key={"t" + i} x={p.x} y={H - 6} fontSize="10" textAnchor="middle" fill="#94a3b8">
                    {p.label}
                  </text>
                ))}
              </svg>
            )}
          </div>

          {/* right column: list + notes */}
          <div className="w-64">
            <div className="text-xs text-neutral-400 mb-2">Dernières entrées</div>
            <ul className="space-y-2 max-h-44 overflow-auto pr-1">
              {logs.length === 0 && <li className="text-xs text-neutral-500">Aucune</li>}
              {logs.map((l) => (
                <li key={l.id} className="bg-neutral-900/60 border border-neutral-700 rounded-lg p-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-yellow-300">{l.level}/5</span>
                    <span className="text-[11px] text-neutral-400">{formatDate(l.createdAt)}</span>
                  </div>
                  {l.note && <div className="text-xs text-neutral-300 mt-1">{l.note}</div>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
