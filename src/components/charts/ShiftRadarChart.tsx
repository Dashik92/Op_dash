import { forwardRef } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { shiftData } from '@/data/dashboardData';
import type { FocusMode } from '@/lib/aiLogic';
import ChartCard from './ChartCard';

interface Props {
  focusMode: FocusMode;
}

const ShiftRadarChart = forwardRef<HTMLDivElement, Props>(({ focusMode }, ref) => {
  const isFocused = focusMode === 'dynamics';
  return (
    <ChartCard
      ref={ref}
      title="Сравнение смен"
      subtitle="Смена №1 vs Смена №2 по метрикам"
      isFocused={isFocused}
      focusColor="emerald"
    >
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={shiftData} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <PolarRadiusAxis tick={{ fill: '#64748b', fontSize: 10 }} angle={90} />
          <Radar
            name="Смена 1"
            dataKey="Смена1"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Смена 2"
            dataKey="Смена2"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              fontSize: '12px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
});

ShiftRadarChart.displayName = 'ShiftRadarChart';
export default ShiftRadarChart;
