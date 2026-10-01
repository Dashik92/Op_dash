import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { efficiencyData } from '@/data/dashboardData';
import type { FocusMode } from '@/lib/aiLogic';
import ChartCard from './ChartCard';

interface Props {
  focusMode: FocusMode;
}

const goodData = efficiencyData.filter((d) => d.repeat30 < 20);
const warnData = efficiencyData.filter((d) => d.repeat30 >= 20 && d.repeat30 < 30);
const critData = efficiencyData.filter((d) => d.repeat30 >= 30);

export default function EfficiencyScatterChart({ focusMode }: Props) {
  return (
    <ChartCard
      title="Выработка и время обработки"
      subtitle="Корреляция производительности по операторам (размер = повторные 30д)"
      isFocused={false}
      focusColor="indigo"
    >
      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            type="number"
            dataKey="output"
            name="Выработка"
            unit=" шт/ч"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{ value: 'Выработка (шт/ч)', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 11 }}
          />
          <YAxis
            type="number"
            dataKey="avgTime"
            name="Время"
            unit=" мин"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{ value: 'Время (мин)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
          />
          <ZAxis type="number" dataKey="repeat30" range={[60, 400]} name="Повторные 30д" />
          <ReferenceLine x={9} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Норма выработки', fill: '#10b981', fontSize: 10 }} />
          <ReferenceLine y={20} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Норма времени', fill: '#f59e0b', fontSize: 10 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              fontSize: '12px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
            itemStyle={{ color: '#94a3b8' }}
            cursor={{ strokeDasharray: '3 3', stroke: '#475569' }}
          />
          <Scatter name="Норма" data={goodData} fill="#10b981" fillOpacity={0.7} />
          <Scatter name="Превышение" data={warnData} fill="#f59e0b" fillOpacity={0.7} />
          <Scatter name="Критично" data={critData} fill="#f43f5e" fillOpacity={0.8} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
