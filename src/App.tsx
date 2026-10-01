import { useState } from 'react';
import { Activity, Gauge } from 'lucide-react';
import type { FocusMode } from '@/lib/aiLogic';
import ChatSidebar from '@/components/ChatSidebar';
import Dashboard from '@/components/Dashboard';

function App() {
  const [focusMode, setFocusMode] = useState<FocusMode>('none');

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-950 text-slate-100">
      {/* Ambient gradient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col">
        {/* Top bar */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-700/50 bg-slate-900/60 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
              <Gauge className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Аналитика операторов</h1>
              <p className="text-xs text-slate-400">Панель производительности · Октябрь 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="flex items-center gap-1.5 rounded-full bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300">
                <Activity className="h-3.5 w-3.5 text-emerald-400" />
                Данные обновлены
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-white">Аналитик</p>
                <p className="text-[10px] text-slate-400">Старший supervisor</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main split layout */}
        <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
          {/* Sidebar — 32% on desktop, full on mobile */}
          <aside className="h-[45vh] shrink-0 lg:h-full lg:w-[33%] xl:w-[32%]">
            <ChatSidebar focusMode={focusMode} onFocusChange={setFocusMode} />
          </aside>

          {/* Dashboard */}
          <main className="flex-1 overflow-y-auto p-5 lg:p-6">
            <Dashboard focusMode={focusMode} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
