import type { KpiStatus } from '@/data/dashboardData';

export type FocusMode = 'none' | 'problem' | 'dynamics';

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export const statusConfig: Record<
  KpiStatus,
  { bg: string; text: string; border: string; dot: string }
> = {
  good: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-300',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  warning: {
    bg: 'bg-amber-500/15',
    text: 'text-amber-300',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
  },
  critical: {
    bg: 'bg-rose-500/15',
    text: 'text-rose-300',
    border: 'border-rose-500/30',
    dot: 'bg-rose-400',
  },
};

export function classifyQuery(query: string): FocusMode {
  const q = query.toLowerCase().trim();
  const problemKeywords = [
    'где просадка',
    'покажи проблемы',
    'проблем',
    'просадка',
    'проблемные',
    'падение',
    'провал',
  ];
  const dynamicsKeywords = [
    'покажи динамику за месяц',
    'эффективность смен',
    'динамика',
    'эффективность',
    'смен',
    'смена',
    'динамик',
  ];
  const resetKeywords = ['сбросить', 'по умолчанию', 'сброс', 'default', 'очистить'];

  if (resetKeywords.some((kw) => q.includes(kw))) return 'none';
  if (problemKeywords.some((kw) => q.includes(kw))) return 'problem';
  if (dynamicsKeywords.some((kw) => q.includes(kw))) return 'dynamics';
  return 'none';
}

export function getAiResponse(mode: FocusMode): string {
  switch (mode) {
    case 'problem':
      return "Критическая просадка обнаружена в метрике «Повторные обращения (30 дней)» — она составляет 22.33% при норме 13% (превышение в 1.7 раза). Основной вклад вносят Операторы №2, №13 и №20. Я подсветил проблемные зоны на дашборде.";
    case 'dynamics':
      return "Анализ динамики и эффективности показывает, что Смена №2 работает значительно продуктивнее Смены №1. Их выработка составляет 9.5+ против 8.3 заявок в час, а среднее время обработки ближе к нормативу. Графики сравнения смен сфокусированы на экране.";
    case 'none':
    default:
      return "Все подсветки и акценты сброшены. Дашборд возвращён к исходному состоянию. Задайте вопрос или выберите подсказку ниже.";
  }
}

export function getGenericResponse(query: string): string {
  const q = query.toLowerCase().trim();
  if (q.includes('выработка') || q.includes('выработк')) {
    return 'Средняя выработка по команде составляет 9.18 шт/ч при нормативе 9 шт/ч. Лидеры — Операторы №1, №3 и №12. Отстающие — Операторы №20, №13 и №2 (выработка ниже 7.5 шт/ч).';
  }
  if (q.includes('время') || q.includes('обработ')) {
    return 'Среднее время обработки — 24.11 мин при нормативе 20 мин. Наибольшее время у Операторов №20 (31.2 мин), №13 (28.9 мин) и №2 (27.5 мин). Рекомендуется дополнительное обучение и анализ скриптов.';
  }
  if (q.includes('закрыт') || q.includes('доля')) {
    return 'Доля закрытых обращений — 64.05%, норматив 50%. Показатель стабильно выполняется. Смена №2 закрывает 67.8%, Смена №1 — 60.1%.';
  }
  if (q.includes('повторн') || q.includes('обращен')) {
    return 'Повторные обращения: за 7 дней — 6.37% (норма 5%, превышение), за 30 дней — 22.33% (норма 13%, критично). Основной вклад — Операторы №20, №13, №2. Требуется анализ качества первичной обработки.';
  }
  return 'Я анализирую операционные метрики команды. Спросите меня о просадках, динамике за месяц, эффективности смен или конкретных показателях — и я подсвечу нужные графики на дашборде.';
}
