import React from 'react';
import { Search, Filter, RotateCcw, Calendar, Download } from 'lucide-react';

export default function FilterBar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  filterValues = {},
  onFilterChange,
  onReset,
  dateRange = '01 Oct 2026 - 31 Oct 2026',
  showDateRange = true,
  onExport = null,
  viewSwitcher = null
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Left controls: Search + Dropdown Filters + Date Range */}
      <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
        {/* Search */}
        <div className="relative min-w-[200px] max-w-[280px] flex-1">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
            <Search size={14} />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50/70 hover:bg-slate-100/70 focus:bg-white text-xs rounded-lg border border-slate-200/90 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-slate-800 placeholder:text-slate-400 transition-all font-normal"
          />
        </div>

        {/* Dynamic Filters */}
        {filters.map((filter) => (
          <select
            key={filter.id}
            value={filterValues[filter.id] || ''}
            onChange={(e) => onFilterChange && onFilterChange(filter.id, e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs font-medium hover:border-slate-300 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => {
              const val = typeof opt === 'string' ? opt : opt.value;
              const lbl = typeof opt === 'string' ? opt : opt.label;
              return (
                <option key={val} value={val}>{lbl}</option>
              );
            })}
          </select>
        ))}

        {/* Date Range Picker Display */}
        {showDateRange && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 text-xs font-medium cursor-pointer hover:bg-slate-50 transition-colors">
            <Calendar size={13} className="text-slate-400" />
            <span>{dateRange}</span>
          </div>
        )}

        {/* Reset button */}
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1.5 text-slate-500 hover:text-slate-800 font-medium hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Right controls: View switcher & Export */}
      <div className="flex items-center gap-2">
        {viewSwitcher}
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition-colors"
          >
            <Download size={13} />
            <span>Export</span>
          </button>
        )}
      </div>
    </div>
  );
}
