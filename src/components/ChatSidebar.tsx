import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  TrendingDown,
  BarChart3,
} from 'lucide-react';
import type { ChatMessage, FocusMode } from '@/lib/aiLogic';
import {
  classifyQuery,
  getAiResponse,
  getGenericResponse,
} from '@/lib/aiLogic';
import type { Kpi } from '@/data/dashboardData';
import { kpis, insights } from '@/data/dashboardData';

interface ChatSidebarProps {
  focusMode: FocusMode;
  onFocusChange: (mode: FocusMode) => void;
}

const quickSuggestions: { label: string; icon: typeof TrendingDown; mode: FocusMode }[] = [
  { label: 'Где просадка?', icon: TrendingDown, mode: 'problem' },
  { label: 'Покажи динамику за месяц', icon: BarChart3, mode: 'dynamics' },
  { label: 'Сбросить фокус', icon: RotateCcw, mode: 'none' },
];

const initialMessage: ChatMessage = {
  id: 'init',
  role: 'ai',
  text: 'Здравствуйте! Я ваш ИИ-аналитик операционных показателей. Спросите меня о просадках, динамике или эффективности — и я подсвечу нужные графики на дашборде.',
  timestamp: Date.now(),
};

export default function ChatSidebar({ focusMode, onFocusChange }: ChatSidebarProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleQuery = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        text: trimmed,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      const mode = classifyQuery(trimmed);
      const response =
        mode !== 'none' || trimmed.toLowerCase().match(/сброс|по умолчанию/)
          ? getAiResponse(mode)
          : getGenericResponse(trimmed);

      onFocusChange(mode);

      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          role: 'ai',
          text: response,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 700);
    },
    [onFocusChange],
  );

  const handleQuickAction = useCallback(
    (mode: FocusMode) => {
      const labels: Record<FocusMode, string> = {
        problem: 'Где просадка?',
        dynamics: 'Покажи динамику за месяц',
        none: 'Сбросить фокус',
      };
      handleQuery(labels[mode]);
    },
    [handleQuery],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuery(input);
  };

  return (
    <div className="flex h-full flex-col bg-slate-900/60 backdrop-blur-xl border-r border-slate-700/50">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-700/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">ИИ-аналитик</h2>
          <p className="text-xs text-slate-400">Операционные метрики</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400">онлайн</span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                msg.role === 'ai'
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                  : 'bg-slate-700'
              }`}
            >
              {msg.role === 'ai' ? (
                <Bot className="h-4 w-4 text-white" />
              ) : (
                <User className="h-4 w-4 text-slate-300" />
              )}
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === 'ai'
                  ? 'bg-slate-800/80 text-slate-200 rounded-tl-sm'
                  : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-slate-800/80 px-4 py-3 rounded-tl-sm">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
            </div>
          </div>
        )}
      </div>

      {/* Quick suggestions */}
      <div className="px-4 pb-3">
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((sugg) => {
            const Icon = sugg.icon;
            const isActive =
              (sugg.mode === 'problem' && focusMode === 'problem') ||
              (sugg.mode === 'dynamics' && focusMode === 'dynamics') ||
              (sugg.mode === 'none' && focusMode === 'none');
            return (
              <button
                key={sugg.label}
                onClick={() => handleQuickAction(sugg.mode)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-500/30 text-indigo-300 ring-1 ring-indigo-500/50'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {sugg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-slate-700/50 px-4 py-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Спросите о показателях…"
          className="flex-1 rounded-xl bg-slate-800/60 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none ring-1 ring-slate-700/50 focus:ring-indigo-500/50 transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40 disabled:opacity-40 disabled:shadow-none"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
