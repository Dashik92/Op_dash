import { forwardRef } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { kpiComparisonData } from '@/data/dashboardData';
import type { FocusMode } from '@/lib/aiLogic';
import ChartCard from './ChartCard';

interface Props {
  focusMode: FocusMode;
}

const KpiComparisonChart = forwardRef<HTMLDivElement, Props>(({ focusMode }, ref) => {
  const isFocused = focusMode === 'dynamics';
  return (
    <ChartCard
      ref={ref}
      title="Выполнение нормативов"
      subtitle="Факт vs Цель по ключевым KPI"
      isFocused={isFocused}
      focusColor="indigo"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={kpiComparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              fontSize: '12px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
            itemStyle={{ color: '#94a3b8' }}
            cursor={{ fill: 'rgba(99,102,241,0.08)' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="Цель" fill="#475569" radius={[4, 4, 0, 0]} barSize={18} />
          <Bar dataKey="Факт" radius={[4, 4, 0, 0]} barSize={18}>
            {kpiComparisonData.map((entry, i) => {
              const isClosed = entry.fullLabel.includes('Закрыт');
              const isGood = entry.Факт >= entry.Цель;
              const color = isGood && !isClosed ? '#f43f5e' : '#10b981';
              return <Cell key={i} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
});

KpiComparisonChart.displayName = 'KpiComparisonChart';
export default KpiComparisonChart;
