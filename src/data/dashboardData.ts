export type KpiStatus = 'good' | 'warning' | 'critical';

export interface Kpi {
  id: string;
  label: string;
  value: number;
  unit: string;
  display: string;
  target: number;
  targetLabel: string;
  status: KpiStatus;
  statusLabel: string;
}

export const kpis: Kpi[] = [
  {
    id: 'closed',
    label: 'Доля закрытых обращений',
    value: 64.05,
    unit: '%',
    display: '64.05%',
    target: 50,
    targetLabel: 'Норматив: 50%',
    status: 'good',
    statusLabel: 'Выполнено',
  },
  {
    id: 'repeat7',
    label: 'Повторные обращения (7 дней)',
    value: 6.37,
    unit: '%',
    display: '6.37%',
    target: 5,
    targetLabel: 'Норматив: 5%',
    status: 'warning',
    statusLabel: 'Превышение',
  },
  {
    id: 'repeat30',
    label: 'Повторные обращения (30 дней)',
    value: 22.33,
    unit: '%',
    display: '22.33%',
    target: 13,
    targetLabel: 'Норматив: 13%',
    status: 'critical',
    statusLabel: 'Критично',
  },
  {
    id: 'avgTime',
    label: 'Среднее время обработки',
    value: 24.11,
    unit: ' мин',
    display: '24.11 мин',
    target: 20,
    targetLabel: 'Норматив: 20 мин',
    status: 'warning',
    statusLabel: 'Превышение',
  },
  {
    id: 'output',
    label: 'Выработка',
    value: 9.18,
    unit: ' шт/ч',
    display: '9.18 шт/ч',
    target: 9,
    targetLabel: 'Норматив: 9 шт/ч',
    status: 'good',
    statusLabel: 'Выполнено',
  },
];

export const insights: string[] = [
  'Метрика «Повторные обращения (30 дней)» превышает норматив почти в 1.7 раза — требуется срочное вмешательство.',
  'Смена №2 стабильно превосходит Смену №1 по выработке (9.5+ против 8.3 шт/ч) и ближе к нормативу по времени обработки.',
  'Операторы №2, №13 и №20 вносят основной вклад в превышение по повторным обращениям за 30 дней.',
  'Среднее время обработки выше норматива на 4.11 мин — потенциал для оптимизации процессов обращения.',
  'Доля закрытых обращений 64.05% стабильно превышает норматив 50% — положительная динамика.',
];

export interface ShiftMetric {
  metric: string;
  Смена1: number;
  Смена2: number;
}

export const shiftData: ShiftMetric[] = [
  { metric: 'Закрытые %', Смена1: 60.1, Смена2: 67.8 },
  { metric: 'Повторные 7д', Смена1: 7.1, Смена2: 5.6 },
  { metric: 'Повторные 30д', Смена1: 24.5, Смена2: 20.1 },
  { metric: 'Время мин', Смена1: 26.3, Смена2: 21.9 },
  { metric: 'Выработка', Смена1: 8.3, Смена2: 9.5 },
];

export interface OperatorDist {
  range: string;
  count: number;
}

export const operatorDist: OperatorDist[] = [
  { range: '0–5%', count: 12 },
  { range: '5–10%', count: 18 },
  { range: '10–15%', count: 14 },
  { range: '15–20%', count: 9 },
  { range: '20–25%', count: 6 },
  { range: '25%+', count: 4 },
];

export interface ProblemOperator {
  name: string;
  repeat30: number;
  repeat7: number;
  avgTime: number;
}

export const problemOperators: ProblemOperator[] = [
  { name: 'Оператор №20', repeat30: 38.2, repeat7: 11.5, avgTime: 31.2 },
  { name: 'Оператор №13', repeat30: 35.7, repeat7: 10.8, avgTime: 28.9 },
  { name: 'Оператор №2', repeat30: 34.1, repeat7: 10.2, avgTime: 27.5 },
  { name: 'Оператор №7', repeat30: 29.3, repeat7: 8.9, avgTime: 26.1 },
  { name: 'Оператор №18', repeat30: 27.8, repeat7: 8.1, avgTime: 25.4 },
  { name: 'Оператор №4', repeat30: 26.2, repeat7: 7.7, avgTime: 24.8 },
  { name: 'Оператор №11', repeat30: 25.1, repeat7: 7.2, avgTime: 24.3 },
  { name: 'Оператор №9', repeat30: 24.0, repeat7: 6.8, avgTime: 23.9 },
  { name: 'Оператор №15', repeat30: 23.5, repeat7: 6.5, avgTime: 23.6 },
  { name: 'Оператор №6', repeat30: 22.8, repeat7: 6.2, avgTime: 23.2 },
];

export interface EfficiencyPoint {
  operator: string;
  output: number;
  avgTime: number;
  repeat30: number;
}

export const efficiencyData: EfficiencyPoint[] = [
  { operator: '№1', output: 10.2, avgTime: 18.5, repeat30: 8.1 },
  { operator: '№2', output: 7.1, avgTime: 27.5, repeat30: 34.1 },
  { operator: '№3', output: 9.8, avgTime: 19.2, repeat30: 10.3 },
  { operator: '№4', output: 8.0, avgTime: 24.8, repeat30: 26.2 },
  { operator: '№5', output: 9.5, avgTime: 20.1, repeat30: 12.5 },
  { operator: '№6', output: 8.3, avgTime: 23.2, repeat30: 22.8 },
  { operator: '№7', output: 7.8, avgTime: 26.1, repeat30: 29.3 },
  { operator: '№8', output: 9.2, avgTime: 21.0, repeat30: 14.0 },
  { operator: '№9', output: 8.5, avgTime: 23.9, repeat30: 24.0 },
  { operator: '№10', output: 9.0, avgTime: 22.0, repeat30: 15.2 },
  { operator: '№11', output: 8.2, avgTime: 24.3, repeat30: 25.1 },
  { operator: '№12', output: 9.7, avgTime: 19.8, repeat30: 9.5 },
  { operator: '№13', output: 7.3, avgTime: 28.9, repeat30: 35.7 },
  { operator: '№14', output: 9.3, avgTime: 20.5, repeat30: 11.8 },
  { operator: '№15', output: 8.4, avgTime: 23.6, repeat30: 23.5 },
  { operator: '№16', output: 9.6, avgTime: 20.3, repeat30: 10.0 },
  { operator: '№17', output: 8.8, avgTime: 22.5, repeat30: 16.4 },
  { operator: '№18', output: 7.9, avgTime: 25.4, repeat30: 27.8 },
  { operator: '№19', output: 9.1, avgTime: 21.5, repeat30: 13.2 },
  { operator: '№20', output: 6.9, avgTime: 31.2, repeat30: 38.2 },
];

export const kpiComparisonData = kpis.map((k) => ({
  label: k.label.length > 20 ? k.label.slice(0, 18) + '…' : k.label,
  fullLabel: k.label,
  Факт: k.value,
  Цель: k.target,
}));
