import React, { useState } from 'react';
import {
  TrendingUp,
  Wallet,
  PieChart as PieChartIcon,
  Activity,
  Users,
  Calendar,
  Filter,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Building,
  CheckCircle2,
  HardHat,
  ShieldCheck,
  CheckSquare,
  FileSpreadsheet,
  AlertTriangle,
  Award,
  Layers,
  Store
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { analyticsData, teamMembers, projectsData, clientsData } from '../../data/mockData';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import { useToast } from '../common/Toast';

export default function DashboardView({ onNavigate }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('All Projects');
  const [selectedClientFilter, setSelectedClientFilter] = useState('All Clients');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All Status');

  const tabs = [
    { id: 'overview', label: 'Business Overview' },
    { id: 'projects', label: 'Project Analytics' },
    { id: 'financial', label: 'Financial Analytics' },
    { id: 'clients', label: 'Client Analytics' },
    { id: 'site', label: 'Site Analytics' },
    { id: 'team', label: 'Team Performance' }
  ];

  const handleApplyFilters = () => {
    addToast({
      title: 'Filters Applied',
      message: `Analytics updated for ${selectedProjectFilter} / ${selectedClientFilter}.`,
      type: 'success'
    });
  };

  const handleResetFilters = () => {
    setSelectedProjectFilter('All Projects');
    setSelectedClientFilter('All Clients');
    setSelectedStatusFilter('All Status');
    addToast({
      title: 'Filters Reset',
      message: 'All analytics filters returned to default.',
      type: 'info'
    });
  };

  // Additional mock datasets for tabs
  const projectCompletionData = [
    { name: 'Skyline Residency', completion: 67, budget: 120000000, spent: 78000000 },
    { name: 'Green Valley Villas', completion: 45, budget: 85000000, spent: 38250000 },
    { name: 'City Center Mall', completion: 82, budget: 240000000, spent: 196800000 },
    { name: 'Tech Park Phase 1', completion: 30, budget: 180000000, spent: 54000000 },
    { name: 'River View Apts', completion: 15, budget: 65000000, spent: 9750000 }
  ];

  const milestoneDistribution = [
    { name: 'Completed', value: 42, color: '#16A34A' },
    { name: 'In Progress', value: 36, color: '#1D5DF0' },
    { name: 'Upcoming', value: 16, color: '#7C3AED' },
    { name: 'Delayed', value: 6, color: '#EF4444' }
  ];

  const cashFlowData = [
    { month: 'May', inflow: 95, outflow: 72 },
    { month: 'Jun', inflow: 110, outflow: 85 },
    { month: 'Jul', inflow: 128, outflow: 92 },
    { month: 'Aug', inflow: 115, outflow: 88 },
    { month: 'Sep', inflow: 135, outflow: 94 },
    { month: 'Oct', inflow: 142.5, outflow: 98.3 }
  ];

  const gstBreakdownData = [
    { name: 'CGST Output (9%)', value: 12.8, color: '#1D5DF0' },
    { name: 'SGST Output (9%)', value: 12.8, color: '#0EA5E9' },
    { name: 'ITC Input Credit', value: 18.4, color: '#16A34A' },
    { name: 'TDS Withheld (194C)', value: 2.8, color: '#F97316' }
  ];

  const clientSectorData = [
    { name: 'Residential Builders', value: 48, color: '#1D5DF0' },
    { name: 'Commercial Infra', value: 32, color: '#F97316' },
    { name: 'Industrial Plants', value: 14, color: '#16A34A' },
    { name: 'Hospitality / Fitout', value: 6, color: '#7C3AED' }
  ];

  const siteAttendanceData = [
    { site: 'Skyline', workers: 115, target: 120 },
    { site: 'Green Valley', workers: 85, target: 80 },
    { site: 'City Center', workers: 95, target: 100 },
    { site: 'Tech Park', workers: 75, target: 70 },
    { site: 'River View', workers: 50, target: 50 }
  ];

  const teamVelocityData = [
    { name: 'Amit Verma', closed: 42, pending: 6, score: 96 },
    { name: 'Neha Singh', closed: 38, pending: 8, score: 92 },
    { name: 'Rohit Jain', closed: 35, pending: 5, score: 94 },
    { name: 'Pooja Mehta', closed: 46, pending: 4, score: 98 },
    { name: 'Vikram Joshi', closed: 28, pending: 10, score: 86 }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Hero Banner Header */}
      <HeroBanner
        title="Analytics Dashboard"
        subtitle="Get deep insights into your construction business performance with interactive charts, KPIs, and progress audits."
        extraRight={
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar size={13} className="text-blue-600" />
            <span>01 Oct 2026 - 31 Oct 2026</span>
          </div>
        }
      />

      {/* 5 Executive KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
        <StatCard
          icon={TrendingUp}
          iconBg="bg-blue-600"
          value="₹1,42,50,000"
          label="Total Revenue"
          delta="22% this month"
          isPositive={true}
        />
        <StatCard
          icon={Wallet}
          iconBg="bg-orange-500"
          value="₹98,30,000"
          label="Total Expenses"
          delta="12% this month"
          isPositive={false}
        />
        <StatCard
          icon={PieChartIcon}
          iconBg="bg-emerald-600"
          value="₹44,20,000"
          label="Net Profit"
          delta="36% this month"
          isPositive={true}
        />
        <StatCard
          icon={Activity}
          iconBg="bg-purple-600"
          value="67%"
          label="Project Completion"
          delta="8% this month"
          isPositive={true}
        />
        <StatCard
          icon={Users}
          iconBg="bg-red-500"
          value="124"
          label="Total Clients"
          delta="18% this month"
          isPositive={true}
          className="col-span-2 sm:col-span-1"
        />
      </div>

      {/* Dynamic 6 Tabs Strip */}
      <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl w-fit text-xs font-semibold overflow-x-auto max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              addToast({ title: tab.label, message: `Switched analytics view to ${tab.label}.`, type: 'info' });
            }}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-orange-500 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Dynamic Tab Content (9 cols) + Right Sticky Analytics Filters (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Left Dynamic Charts & Data Area */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* TAB 1: Business Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Row 1: Revenue vs Expenses Line Chart + Project Status Donut */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Revenue vs Expenses */}
                <div className="md:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Revenue vs Expenses</h3>
                      <span className="text-[11px] text-slate-400 font-medium">₹ Lakh</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-semibold">
                      <span className="flex items-center gap-1.5 text-blue-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>Revenue</span>
                      <span className="flex items-center gap-1.5 text-orange-500"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>Expenses</span>
                      <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>Profit</span>
                    </div>
                  </div>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData.revenueVsExpenses} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1D5DF0" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#1D5DF0" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F97316" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#1D5DF0" strokeWidth={2.5} fillOpacity={1} fill="url(#revGrad)" />
                        <Area type="monotone" dataKey="expenses" stroke="#F97316" strokeWidth={2.5} fillOpacity={1} fill="url(#expGrad)" />
                        <Area type="monotone" dataKey="profit" stroke="#16A34A" strokeWidth={2.5} fillOpacity={1} fill="url(#profGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Project Status Distribution Donut */}
                <div className="md:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-card p-4 flex flex-col justify-between">
                  <h3 className="font-bold text-slate-800 text-sm mb-1">Project Status Distribution</h3>
                  <div className="relative h-44 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analyticsData.projectStatusDonut}
                          innerRadius={52}
                          outerRadius={72}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {analyticsData.projectStatusDonut.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xl font-extrabold text-slate-900 leading-none">24</span>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5">Total Projects</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                    {analyticsData.projectStatusDonut.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                          <span className="text-slate-600 font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-800">{item.value} ({item.percentage})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2: Top Projects by Revenue + Client Acquisition Trend */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6 bg-white rounded-xl border border-slate-200/90 shadow-card p-4 space-y-3">
                  <h3 className="font-bold text-slate-800 text-sm">Top Projects by Revenue</h3>
                  <div className="space-y-3">
                    {analyticsData.topProjects.map((p) => (
                      <div key={p.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <img src={p.image} alt={p.name} className="w-6 h-6 rounded-md object-cover" />
                            <span className="font-semibold text-slate-800 text-[11px]">{p.name}</span>
                          </div>
                          <span className="font-bold text-slate-900 text-xs">{formatCurrencyINR(p.revenue)}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${p.percent}%`, backgroundColor: p.color }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-6 bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-800 text-sm">Client Acquisition Trend</h3>
                    <div className="flex items-center gap-3 text-[11px] font-semibold">
                      <span className="flex items-center gap-1.5 text-blue-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>New Clients</span>
                      <span className="flex items-center gap-1.5 text-orange-500"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>Total Clients</span>
                    </div>
                  </div>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData.clientAcquisition} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                        <Bar dataKey="newClients" fill="#1D5DF0" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="totalClients" fill="#F97316" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Project Analytics */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Project Completion Progress */}
                <div className="md:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Project Completion Status</h3>
                      <span className="text-[11px] text-slate-400 font-medium">% Work Finished</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Avg 67% Complete
                    </span>
                  </div>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={projectCompletionData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#0f172a' }} />
                        <Tooltip />
                        <Bar dataKey="completion" fill="#1D5DF0" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Milestone Distribution Donut */}
                <div className="md:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-card p-4 flex flex-col justify-between">
                  <h3 className="font-bold text-slate-800 text-sm mb-1">Milestone Velocity</h3>
                  <div className="relative h-44 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={milestoneDistribution}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {milestoneDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xl font-extrabold text-slate-900 leading-none">94</span>
                      <span className="text-[10px] text-slate-400 font-medium">Milestones</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                    {milestoneDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                          <span className="text-slate-600">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-800">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Projects Status Table */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4 space-y-3">
                <h3 className="font-bold text-slate-800 text-sm">Site Progress & Budget Burn</h3>
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full min-w-[700px] text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider whitespace-nowrap">
                        <th className="py-2.5 px-3">Project</th>
                        <th className="py-2.5 px-3">Total Budget</th>
                        <th className="py-2.5 px-3">Spent to Date</th>
                        <th className="py-2.5 px-3">Progress</th>
                        <th className="py-2.5 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 whitespace-nowrap font-medium">
                      {projectCompletionData.map((p) => (
                        <tr key={p.name} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{p.name}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-700">{formatCurrencyINR(p.budget)}</td>
                          <td className="py-2.5 px-3 font-bold text-blue-600">{formatCurrencyINR(p.spent)}</td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-28 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${p.completion}%` }}></div>
                              </div>
                              <span className="font-bold text-slate-800">{p.completion}%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              On Schedule
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Financial Analytics */}
          {activeTab === 'financial' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Cash Inflow vs Outflow */}
                <div className="md:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Monthly Cash Inflow vs Outflow</h3>
                      <span className="text-[11px] text-slate-400 font-medium">₹ Lakh (Collections vs Disbursements)</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-semibold">
                      <span className="flex items-center gap-1.5 text-blue-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>Inflow</span>
                      <span className="flex items-center gap-1.5 text-orange-500"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>Outflow</span>
                    </div>
                  </div>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="inflow" fill="#1D5DF0" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="outflow" fill="#F97316" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* GST Liability & Input Tax Credit Donut */}
                <div className="md:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-card p-4 flex flex-col justify-between">
                  <h3 className="font-bold text-slate-800 text-sm mb-1">GST & Tax Compliance</h3>
                  <div className="relative h-44 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={gstBreakdownData}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {gstBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xl font-extrabold text-slate-900 leading-none">₹46.8L</span>
                      <span className="text-[10px] text-slate-400 font-medium">Total Tax</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
                    {gstBreakdownData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                          <span className="text-slate-600">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-800">₹{item.value} Lakh</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Client Analytics */}
          {activeTab === 'clients' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Client Sector Revenue */}
                <div className="md:col-span-6 bg-white rounded-xl border border-slate-200/90 shadow-card p-4 flex flex-col justify-between">
                  <h3 className="font-bold text-slate-800 text-sm mb-1">Revenue by Client Segment</h3>
                  <div className="relative h-44 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={clientSectorData}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {clientSectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xl font-extrabold text-slate-900 leading-none">124</span>
                      <span className="text-[10px] text-slate-400 font-medium">Clients</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                    {clientSectorData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                          <span className="text-slate-600">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-800">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VIP Clients Table */}
                <div className="md:col-span-6 bg-white rounded-xl border border-slate-200/90 shadow-card p-4 space-y-3">
                  <h3 className="font-bold text-slate-800 text-sm">Top Enterprise Clients</h3>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Skyline Builders Pvt. Ltd.', contract: '₹48,25,000', rating: '98%', projects: 3 },
                      { name: 'Agarwal Infra Developers', contract: '₹32,60,000', rating: '96%', projects: 2 },
                      { name: 'Mehta Developers Jaipur', contract: '₹28,50,000', rating: '94%', projects: 1 },
                      { name: 'RK Constructions Group', contract: '₹22,40,000', rating: '92%', projects: 2 },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs">
                        <div>
                          <p className="font-bold text-slate-900">{c.name}</p>
                          <p className="text-[10px] text-slate-400">{c.projects} Active Contracts • {c.rating} On-time Pay</p>
                        </div>
                        <span className="font-extrabold text-blue-600">{c.contract}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Site Analytics */}
          {activeTab === 'site' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Daily Labour Attendance */}
                <div className="md:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-800 text-sm">Site Worker Attendance Today</h3>
                    <div className="flex items-center gap-3 text-[11px] font-semibold">
                      <span className="flex items-center gap-1.5 text-blue-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>Present</span>
                      <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>Target</span>
                    </div>
                  </div>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={siteAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="site" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="workers" fill="#1D5DF0" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Safety & Quality Inspections */}
                <div className="md:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-card p-4 space-y-3">
                  <h3 className="font-bold text-slate-800 text-sm">Site Safety & Quality Index</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={18} className="text-emerald-600" />
                        <div>
                          <p className="font-bold text-emerald-950">142 Days Zero Incidents</p>
                          <p className="text-[10px] text-emerald-700">OSHA / NBC compliant sites</p>
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-emerald-700">99.8%</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-500">Concrete Cube Compressive Strength:</span>
                        <span className="font-bold text-slate-800">M25 Grade Passed (28.4 N/mm²)</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-500">Rebar Reinforcement Checks:</span>
                        <span className="font-bold text-slate-800">100% Cleared before pour</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-500">PPE Helmet & Boots Adherence:</span>
                        <span className="font-bold text-emerald-600">98% Active Compliance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Team Performance */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Project Manager Velocity */}
                <div className="md:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-800 text-sm">Work Orders Closed by Lead</h3>
                    <span className="text-[10px] text-slate-400 font-semibold">Tasks / Month</span>
                  </div>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={teamVelocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="closed" fill="#F97316" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="pending" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Team Productivity Leaders */}
                <div className="md:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-card p-4 space-y-3">
                  <h3 className="font-bold text-slate-800 text-sm">Efficiency Leaderboard</h3>
                  <div className="space-y-2.5">
                    {teamMembers.slice(0, 5).map((m, idx) => (
                      <div key={m.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover shrink-0 aspect-square ring-1 ring-slate-200" />
                          <div>
                            <p className="font-bold text-slate-900">{m.name}</p>
                            <p className="text-[10px] text-slate-400">{m.role}</p>
                          </div>
                        </div>
                        <span className="font-extrabold text-emerald-600">{m.productivity}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Sticky Column: Analytics Filters + Quick Insights */}
        <div className="lg:col-span-3 space-y-4 sticky top-20">
          
          {/* Card 1: Analytics Filters */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-sm">Analytics Filters</h4>
            
            <div className="space-y-2.5">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Date Range</label>
                <div className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
                  <Calendar size={13} className="text-slate-400" />
                  <span>01 Oct 2026 - 31 Oct 2026</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Project</label>
                <select
                  value={selectedProjectFilter}
                  onChange={(e) => setSelectedProjectFilter(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option>All Projects</option>
                  <option>Skyline Residency</option>
                  <option>Green Valley Villas</option>
                  <option>City Center Mall</option>
                  <option>River View Apartments</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Client</label>
                <select
                  value={selectedClientFilter}
                  onChange={(e) => setSelectedClientFilter(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option>All Clients</option>
                  <option>Agarwal Infra Pvt. Ltd.</option>
                  <option>Skyline Builders Pvt. Ltd.</option>
                  <option>RK Constructions</option>
                  <option>Mehta Developers</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Project Type</label>
                <select className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:border-blue-500 cursor-pointer">
                  <option>All Types</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                  <option>Hospitality</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Status</label>
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option>All Status</option>
                  <option>Ongoing</option>
                  <option>Planning</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-center transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 py-1.5 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-center flex items-center justify-center gap-1.5 shadow-xs shadow-orange-500/20 transition-all cursor-pointer"
              >
                <Filter size={12} />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>

          {/* Card 2: Quick Insights */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-sm">Quick Insights</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowUpRight size={14} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Revenue increased by 22%</p>
                  <p className="text-[10px] text-slate-400">Compared to last month</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowDownRight size={14} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Expenses increased by 12%</p>
                  <p className="text-[10px] text-slate-400">Due to bulk cement procurement</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowUpRight size={14} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Net profit increased by 36%</p>
                  <p className="text-[10px] text-slate-400">Higher margin on residential delivery</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Users size={14} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Client growth 18%</p>
                  <p className="text-[10px] text-slate-400">24 new clients this month</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={14} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Project completion rate 67%</p>
                  <p className="text-[10px] text-slate-400">16 out of 24 projects in progress</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
