import { AlertTriangle } from 'lucide-react';
import { insights } from '@/data/dashboardData';

export default function KeyInsights() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
        </div>
        <h3 className="text-base font-semibold text-white">Ключевые выводы</h3>
      </div>
      <ul className="space-y-2.5">
        {insights.map((insight, i) => {
          const isCritical = insight.includes('1.7 раза');
          return (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  isCritical ? 'bg-rose-400' : 'bg-amber-400'
                }`}
              />
              <span
                className={`text-sm leading-relaxed ${
                  isCritical ? 'text-rose-200' : 'text-slate-300'
                }`}
              >
                {insight}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
