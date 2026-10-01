import { useRef, useEffect } from 'react';
import type { FocusMode } from '@/lib/aiLogic';
import KpiGrid from './KpiGrid';
import KeyInsights from './KeyInsights';
import KpiComparisonChart from './charts/KpiComparisonChart';
import ShiftRadarChart from './charts/ShiftRadarChart';
import OperatorDistChart from './charts/OperatorDistChart';
import ProblemOperatorsChart from './charts/ProblemOperatorsChart';
import EfficiencyScatterChart from './charts/EfficiencyScatterChart';

interface DashboardProps {
  focusMode: FocusMode;
}

export default function Dashboard({ focusMode }: DashboardProps) {
  const problemChartRef = useRef<HTMLDivElement>(null);
  const dynamicsRadarRef = useRef<HTMLDivElement>(null);
  const dynamicsKpiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusMode === 'problem' && problemChartRef.current) {
      setTimeout(() => {
        problemChartRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 300);
    } else if (focusMode === 'dynamics') {
      setTimeout(() => {
        dynamicsRadarRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 300);
    }
  }, [focusMode]);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <KpiGrid focusMode={focusMode} />

      {/* Key Insights */}
      <KeyInsights />

      {/* Row: KPI Comparison + Shift Radar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <KpiComparisonChart ref={dynamicsKpiRef} focusMode={focusMode} />
        <ShiftRadarChart ref={dynamicsRadarRef} focusMode={focusMode} />
      </div>

      {/* Row: Distribution + Problem Operators */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OperatorDistChart focusMode={focusMode} />
        <ProblemOperatorsChart ref={problemChartRef} focusMode={focusMode} />
      </div>

      {/* Row: Efficiency Scatter (full width) */}
      <EfficiencyScatterChart focusMode={focusMode} />
    </div>
  );
}
