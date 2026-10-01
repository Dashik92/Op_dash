import { AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import type { FocusMode } from '@/lib/aiLogic';
import type { Kpi } from '@/data/dashboardData';
import { kpis } from '@/data/dashboardData';
import { statusConfig } from '@/lib/aiLogic';
import KpiCard from './KpiCard';

export default function KpiGrid({ focusMode }: { focusMode: FocusMode }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">Ключевые показатели</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} focusMode={focusMode} />
        ))}
      </div>
    </div>
  );
}
