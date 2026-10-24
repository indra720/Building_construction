import React, { useState } from 'react';
import { PieChart as PieChartIcon, AlertTriangle, TrendingUp, DollarSign, Plus } from 'lucide-react';
import { projectsData } from '../../data/mockData';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import { useToast } from '../common/Toast';

export default function BudgetView() {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    {
      header: 'Project Name',
      key: 'name',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
          <p className="text-[10px] text-slate-400">{row.code} • {row.client}</p>
        </div>
      )
    },
    {
      header: 'Total Allocated Budget',
      key: 'budget',
      align: 'right',
      render: (row) => <span className="font-bold text-slate-900">{formatCurrencyINR(row.budget, true)}</span>
    },
    {
      header: 'Actual Spent (To Date)',
      key: 'spent',
      align: 'right',
      render: (row) => <span className="font-bold text-orange-600">{formatCurrencyINR(row.spent, true)}</span>
    },
    {
      header: 'Remaining Balance',
      key: 'remaining',
      align: 'right',
      render: (row) => <span className="font-bold text-emerald-600">{formatCurrencyINR(row.remaining, true)}</span>
    },
    {
      header: 'Budget Utilization',
      key: 'progress',
      render: (row) => {
        const util = Math.round((row.spent / row.budget) * 100);
        const isOver = util > 90;
        return (
          <div className="flex items-center gap-2 w-32">
            <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${isOver ? 'bg-red-500' : 'bg-blue-600'}`}
                style={{ width: `${Math.min(util, 100)}%` }}
              ></div>
            </div>
            <span className={`text-[11px] font-bold ${isOver ? 'text-red-600' : 'text-slate-700'}`}>{util}%</span>
          </div>
        );
      }
    },
    {
      header: 'Variance Status',
      key: 'status',
      render: (row) => {
        const util = Math.round((row.spent / row.budget) * 100);
        if (util > 90) {
          return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Critical &gt;90%</span>;
        }
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">On Track</span>;
      }
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 053) */}
      <HeroBanner
        title="Budget & Cost Management"
        subtitle="Track project-wise budget allocation, actual expenditure variance, and cost-to-complete forecasts."
        actionButton={
          <button
            onClick={() => addToast({ title: 'Allocate Budget', message: 'Opening budget allocation form...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={15} />
            <span>Allocate Budget</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard icon={DollarSign} iconBg="bg-blue-600" value="₹115.2 Cr" label="Total Master Budget" delta="Active 10 projects" isPositive={true} />
        <StatCard icon={TrendingUp} iconBg="bg-orange-500" value="₹62.8 Cr" label="Total Actual Spent" delta="54.5% overall utilization" isPositive={true} />
        <StatCard icon={PieChartIcon} iconBg="bg-emerald-600" value="₹52.4 Cr" label="Remaining Funds" delta="Sufficient liquidity" isPositive={true} />
        <StatCard icon={AlertTriangle} iconBg="bg-rose-500" value="1 Project" label="Budget Alert Flag" delta="Skyline Residency near cap" isPositive={false} />
      </div>

      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search project, client code..." />

      <DataTable columns={columns} data={projectsData} entityName="project budgets" />
    </div>
  );
}
