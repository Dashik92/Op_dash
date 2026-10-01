import type { FocusMode } from '@/lib/aiLogic';
import type { Kpi } from '@/data/dashboardData';
import { statusConfig } from '@/lib/aiLogic';

interface KpiCardProps {
  kpi: Kpi;
  focusMode: FocusMode;
}

export default function KpiCard({ kpi, focusMode }: KpiCardProps) {
  const cfg = statusConfig[kpi.status];
  const isHighlighted = focusMode === 'problem' && kpi.id === 'repeat30';
  const isDimmed = focusMode === 'problem' && kpi.id !== 'repeat30';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-slate-800/40 p-4 transition-all duration-500 ${
        isHighlighted
          ? 'border-rose-500 ring-2 ring-rose-500/60 shadow-lg shadow-rose-500/30 animate-pulse'
          : isDimmed
            ? 'border-slate-700/30 opacity-40'
            : cfg.border
      }`}
    >
      {/* Gradient accent bar */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
          isHighlighted
            ? 'from-rose-500 to-red-600'
            : kpi.status === 'good'
              ? 'from-emerald-500 to-teal-500'
              : kpi.status === 'warning'
                ? 'from-amber-500 to-orange-500'
                : 'from-rose-500 to-red-600'
        }`}
      />

      <div className="flex items-start justify-between gap-2">
        <p
          className={`text-xs leading-snug font-medium ${
            isHighlighted ? 'text-rose-200' : 'text-slate-400'
          }`}
        >
          {kpi.label}
        </p>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}
        >
          {kpi.statusLabel}
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-1">
        <span
          className={`text-2xl font-bold ${
            isHighlighted ? 'text-rose-300' : 'text-white'
          }`}
        >
          {kpi.display}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
        <span className="text-xs text-slate-500">{kpi.targetLabel}</span>
      </div>

      {/* Mini progress bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-700/50">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isHighlighted
              ? 'bg-gradient-to-r from-rose-500 to-red-600'
              : kpi.status === 'good'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                : kpi.status === 'warning'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'bg-gradient-to-r from-rose-500 to-red-600'
          }`}
          style={{
            width: `${Math.min((kpi.value / (kpi.target * 2)) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
