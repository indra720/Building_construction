import React, { useState } from 'react';
import { Milestone, CheckCircle2, Clock, Calendar, Plus, Building2 } from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function MilestonesView() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const milestones = [
    { id: 'MLS-01', title: 'Foundation & Raft Concreting', project: 'Skyline Residency', targetDate: '15 Mar 2026', completionDate: '12 Mar 2026', progress: 100, weightage: '15%', status: 'Completed' },
    { id: 'MLS-02', title: 'Sub-structure & Plinth Beam', project: 'Skyline Residency', targetDate: '30 Apr 2026', completionDate: '28 Apr 2026', progress: 100, weightage: '15%', status: 'Completed' },
    { id: 'MLS-03', title: 'RCC Superstructure (Tower A - 6th Floor)', project: 'Skyline Residency', targetDate: '15 Oct 2026', completionDate: 'In Progress', progress: 85, weightage: '25%', status: 'In Progress' },
    { id: 'MLS-04', title: 'Brick Masonry & Internal Plaster', project: 'Skyline Residency', targetDate: '30 Nov 2026', completionDate: 'Pending', progress: 40, weightage: '20%', status: 'In Progress' },
    { id: 'MLS-05', title: 'Electrical & Plumbing Rough-in', project: 'City Center Mall', targetDate: '15 Dec 2026', completionDate: 'Pending', progress: 10, weightage: '15%', status: 'Planning' }
  ];

  const columns = [
    {
      header: 'Milestone Title',
      key: 'title',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs shrink-0">
            <Milestone size={14} />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.title}</p>
            <p className="text-[10px] text-slate-400">{row.id} • Weightage: {row.weightage}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Project',
      key: 'project',
      render: (row) => <span className="font-semibold text-slate-800">{row.project}</span>
    },
    {
      header: 'Target Date',
      key: 'targetDate',
      render: (row) => <span className="text-slate-600 text-[11px] font-medium">{row.targetDate}</span>
    },
    {
      header: 'Progress',
      key: 'progress',
      render: (row) => (
        <div className="flex items-center gap-2 w-28">
          <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className={`h-full rounded-full ${row.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${row.progress}%` }}></div>
          </div>
          <span className="text-[10px] font-bold text-slate-700">{row.progress}%</span>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 022 / 035) */}
      <HeroBanner
        title="Project Milestones & Deliverables"
        subtitle="Track critical path milestones, client sign-offs, billing trigger stages and delivery timelines."
        actionButton={
          <button
            onClick={() => addToast({ title: 'New Milestone', message: 'Opening Milestone form...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={15} />
            <span>Add Milestone</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard icon={Milestone} iconBg="bg-blue-600" value="48" label="Total Milestones (Active)" delta="Across 12 projects" isPositive={true} />
        <StatCard icon={CheckCircle2} iconBg="bg-emerald-600" value="28" label="Achieved & Signed Off" delta="100% billed" isPositive={true} />
        <StatCard icon={Clock} iconBg="bg-amber-500" value="14" label="In Execution" delta="4 due this month" isPositive={true} />
        <StatCard icon={Calendar} iconBg="bg-purple-600" value="6" label="Upcoming Scheduled" delta="Ready for kickoff" isPositive={true} />
      </div>

      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search milestone, project name..." />

      <DataTable columns={columns} data={milestones} entityName="milestones" />
    </div>
  );
}
