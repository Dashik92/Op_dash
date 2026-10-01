import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { operatorDist } from '@/data/dashboardData';
import type { FocusMode } from '@/lib/aiLogic';
import ChartCard from './ChartCard';

interface Props {
  focusMode: FocusMode;
}

const barColors = ['#10b981', '#6366f1', '#6366f1', '#f59e0b', '#f43f5e', '#dc2626'];

export default function OperatorDistChart({ focusMode }: Props) {
  return (
    <ChartCard
      title="Распределение операторов"
      subtitle="По доле повторных обращений (30 дней)"
      isFocused={false}
      focusColor="indigo"
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={operatorDist} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="range" tick={{ fill: '#94a3b8', fontSize: 11 }} />
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
          <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={36}>
            {operatorDist.map((_, i) => (
              <Cell key={i} fill={barColors[i % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
