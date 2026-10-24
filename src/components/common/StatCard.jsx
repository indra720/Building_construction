import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  icon: Icon,
  iconBg = 'bg-blue-500',
  iconColor = 'text-white',
  value,
  label,
  delta,
  isPositive = true,
  donut = null,
  className = ''
}) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-card hover-lift transition-all flex flex-col justify-between min-w-0 ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">
            {label}
          </p>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight tracking-tight mt-1 truncate">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-xs`}>
            <Icon size={16} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
        {delta && (
          <div className={`flex items-center gap-1 text-[10px] sm:text-[11px] font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'} truncate`}>
            {isPositive ? <ArrowUpRight size={12} className="shrink-0" /> : <ArrowDownRight size={12} className="shrink-0" />}
            <span className="truncate">{delta}</span>
          </div>
        )}
        {donut && (
          <div className="w-8 h-8 shrink-0 ml-auto">
            {donut}
          </div>
        )}
      </div>
    </div>
  );
}
