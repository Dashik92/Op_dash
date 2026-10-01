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
import { problemOperators } from '@/data/dashboardData';
import type { FocusMode } from '@/lib/aiLogic';
import ChartCard from './ChartCard';

interface Props {
  focusMode: FocusMode;
}

const ProblemOperatorsChart = forwardRef<HTMLDivElement, Props>(({ focusMode }, ref) => {
  const isHighlighted = focusMode === 'problem';
  return (
    <ChartCard
      ref={ref}
      title="Проблемные метрики по операторам"
      subtitle="Top-10 операторов с превышением повторных обращений (30 дней)"
      isFocused={isHighlighted}
      focusColor="rose"
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={problemOperators}
          layout="vertical"
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              fontSize: '12px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
            itemStyle={{ color: '#94a3b8' }}
            cursor={{ fill: 'rgba(244,63,94,0.08)' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="repeat30" name="Повторные 30д %" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={14}>
            {problemOperators.map((_, i) => (
              <Cell key={i} fill={i < 3 ? '#dc2626' : '#f43f5e'} />
            ))}
          </Bar>
          <Bar dataKey="repeat7" name="Повторные 7д %" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={14} />
          <Bar dataKey="avgTime" name="Время мин" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
});

ProblemOperatorsChart.displayName = 'ProblemOperatorsChart';
export default ProblemOperatorsChart;
