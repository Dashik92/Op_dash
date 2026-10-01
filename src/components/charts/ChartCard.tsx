import { forwardRef } from 'react';

interface ChartCardProps {
  title: string;
  subtitle: string;
  isFocused: boolean;
  focusColor: 'indigo' | 'emerald' | 'rose';
  children: React.ReactNode;
}

const focusStyles: Record<ChartCardProps['focusColor'], string> = {
  indigo: 'ring-2 ring-indigo-500/60 shadow-lg shadow-indigo-500/20 bg-indigo-500/5 animate-pulse',
  emerald:
    'ring-2 ring-emerald-500/60 shadow-lg shadow-emerald-500/20 bg-emerald-500/5 animate-pulse',
  rose: 'ring-2 ring-rose-500/70 shadow-lg shadow-rose-500/30 bg-rose-500/5 animate-pulse',
};

const ChartCard = forwardRef<HTMLDivElement, ChartCardProps>(
  ({ title, subtitle, isFocused, focusColor, children }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl border border-slate-700/50 bg-slate-800/40 p-5 transition-all duration-500 ${
          isFocused ? focusStyles[focusColor] : ''
        }`}
      >
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
        </div>
        {children}
      </div>
    );
  },
);

ChartCard.displayName = 'ChartCard';
export default ChartCard;
