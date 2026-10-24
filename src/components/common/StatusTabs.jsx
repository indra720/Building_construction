import React from 'react';

export default function StatusTabs({
  tabs = [],
  activeTab,
  onTabChange,
  className = ''
}) {
  return (
    <div className={`flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              isActive
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                : 'bg-white hover:bg-slate-100/80 text-slate-600 border border-slate-200/80'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
