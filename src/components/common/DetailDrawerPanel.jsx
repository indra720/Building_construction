import React, { useState } from 'react';
import { X, Star, ExternalLink, ChevronRight } from 'lucide-react';

export default function DetailDrawerPanel({
  isOpen = true,
  onClose,
  title,
  subtitle,
  avatar = null,
  statusBadge = null,
  tabs = [],
  children,
  width = 'w-full lg:w-[375px]',
  quickActions = null
}) {
  const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].id : null);
  const [isStarred, setIsStarred] = useState(false);

  if (!isOpen) return null;

  return (
    <div className={`${width} shrink-0 bg-white rounded-xl border border-slate-200/90 shadow-card flex flex-col h-fit lg:sticky lg:top-20 max-h-none lg:max-h-[calc(100vh-100px)] overflow-hidden transition-all text-xs`}>
      {/* Panel Top Header */}
      <div className="p-3.5 border-b border-slate-200 flex items-start justify-between gap-2 bg-slate-50/50">
        <div className="flex items-center gap-3 overflow-hidden">
          {avatar && (
            <div className="shrink-0">
              {typeof avatar === 'string' ? (
                <img src={avatar} alt={title} className="w-11 h-11 rounded-lg object-cover ring-2 ring-slate-200" />
              ) : (
                avatar
              )}
            </div>
          )}
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-bold text-slate-900 text-sm truncate leading-tight">
                {title}
              </h3>
              {statusBadge}
            </div>
            {subtitle && (
              <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 text-slate-400">
          <button
            onClick={() => setIsStarred(!isStarred)}
            className={`p-1 rounded hover:bg-slate-200/60 transition-colors ${isStarred ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`}
            title="Star item"
          >
            <Star size={14} className={isStarred ? 'fill-amber-400 text-amber-500' : ''} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-200/60 text-slate-500 hover:text-slate-800 transition-colors"
              title="Close panel"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="flex items-center border-b border-slate-200 px-3 bg-white overflow-x-auto scrollbar-none text-[11px] font-semibold">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-2.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Scrollable Content Body */}
      <div className="p-4 overflow-y-auto space-y-4 max-h-[calc(100vh-230px)]">
        {typeof children === 'function' ? children(activeTab) : children}

        {/* Quick Actions Grid if provided */}
        {quickActions && (
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickActions}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
