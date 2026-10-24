import React, { useState } from 'react';
import { FileSpreadsheet, Plus, Calendar, Building2, User, Eye, Download, CheckCircle2 } from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function SiteReportsView() {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    { id: 'DPR-2026-148', date: '24 Oct 2026', project: 'Skyline Residency', author: 'Vikram Patel', workDone: '4th floor slab concrete casting completed (180 cum)', weather: 'Clear / 32°C', labour: 48, status: 'Approved' },
    { id: 'DPR-2026-147', date: '23 Oct 2026', project: 'Skyline Residency', author: 'Vikram Patel', workDone: 'Rebar binding and electrical conduit checking on slab 4', weather: 'Sunny / 34°C', labour: 46, status: 'Approved' },
    { id: 'DPR-2026-146', date: '24 Oct 2026', project: 'Green Valley Villas', author: 'Amit Verma', workDone: 'Villa 12 & 14 boundary brickwork and lintel beam shuttering', weather: 'Clear / 31°C', labour: 32, status: 'Approved' },
    { id: 'DPR-2026-145', date: '24 Oct 2026', project: 'City Center Mall', author: 'Vikram Patel', workDone: 'Excavation for basement ramp pit and soil shoring', weather: 'Clear / 33°C', labour: 42, status: 'Under Review' }
  ];

  const columns = [
    {
      header: 'Report ID & Date',
      key: 'id',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.id}</p>
          <p className="text-[10px] text-slate-400">{row.date}</p>
        </div>
      )
    },
    {
      header: 'Project / Site',
      key: 'project',
      render: (row) => <span className="font-semibold text-slate-800">{row.project}</span>
    },
    {
      header: 'Site Engineer',
      key: 'author',
      render: (row) => <span className="text-slate-700">{row.author}</span>
    },
    {
      header: 'Key Work Executed',
      key: 'workDone',
      render: (row) => <span className="text-slate-600 text-[11px] line-clamp-1">{row.workDone}</span>
    },
    {
      header: 'Labour On Site',
      key: 'labour',
      align: 'center',
      render: (row) => <span className="font-bold text-slate-800">{row.labour} Workers</span>
    },
    {
      header: 'Weather',
      key: 'weather',
      render: (row) => <span className="text-slate-500 text-[11px]">{row.weather}</span>
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 045 / 083) */}
      <HeroBanner
        title="Daily Site Progress Reports (DPR)"
        subtitle="Review daily engineering logs, concrete pour records, weather logs and labour strength."
        actionButton={
          <button
            onClick={() => addToast({ title: 'New DPR', message: 'Opening Daily Progress Report submission form...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={15} />
            <span>Create Daily Report</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard icon={FileSpreadsheet} iconBg="bg-blue-600" value="482" label="Total DPR Logs (FY26)" delta="All sites recorded" isPositive={true} />
        <StatCard icon={CheckCircle2} iconBg="bg-emerald-600" value="4" label="Submitted Today" delta="100% submission rate" isPositive={true} />
        <StatCard icon={Calendar} iconBg="bg-purple-600" value="380 cum" label="Concrete Poured Today" delta="M25 & M30 grades" isPositive={true} />
        <StatCard icon={User} iconBg="bg-amber-500" value="142" label="Labour Total Deployed" delta="Across 4 active sites" isPositive={true} />
      </div>

      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search DPR, project, engineer..." />

      <DataTable columns={columns} data={reports} entityName="site reports" />
    </div>
  );
}
