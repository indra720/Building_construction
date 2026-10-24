import React, { useState } from 'react';
import {
  AlertTriangle,
  Receipt,
  CheckCircle2,
  Clock,
  Building2,
  Store,
  DollarSign,
  TrendingDown,
  Plus,
  Eye,
  FileCheck,
  Search,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrencyINR } from '../../utils/formatters';
import { useToast } from '../common/Toast';

export default function ClaimsAnalyticsView({ onNavigate }) {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Seeded claims records
  const claimsData = [
    {
      id: 'CLM-2026-001',
      supplier: 'UltraTech Cement Ltd.',
      poRef: 'PO-2026-046',
      site: 'Skyline Residency',
      date: '18 Oct 2026',
      reason: 'Bags torn & moisture caked during monsoon transit (80 bags)',
      amount: 48000,
      recoveryMethod: 'Credit Note issued',
      status: 'Approved'
    },
    {
      id: 'CLM-2026-002',
      supplier: 'Tata Steel Ltd.',
      poRef: 'PO-2026-045',
      site: 'Tech Park Phase 1',
      date: '20 Oct 2026',
      reason: '16mm TMT rebars surface rust beyond allowable IS 1786 standard',
      amount: 140000,
      recoveryMethod: 'Replacement scheduled',
      status: 'Approved'
    },
    {
      id: 'CLM-2026-003',
      supplier: 'Shree Build Mart',
      poRef: 'PO-2026-044',
      site: 'City Center Mall',
      date: '21 Oct 2026',
      reason: 'Red Clay Bricks broken exceeding 5% contract breakage allowance',
      amount: 32000,
      recoveryMethod: 'Debit Note deducted from invoice',
      status: 'Approved'
    },
    {
      id: 'CLM-2026-004',
      supplier: 'Asian Paints Corp',
      poRef: 'PO-2026-043',
      site: 'Green Valley Villas',
      date: '22 Oct 2026',
      reason: 'Tins dented and seal ruptured causing internal drying',
      amount: 65000,
      recoveryMethod: 'Vendor investigation underway',
      status: 'In Review'
    },
    {
      id: 'CLM-2026-005',
      supplier: 'ACC Cement Ltd.',
      poRef: 'PO-2026-039',
      site: 'River View Apts',
      date: '15 Oct 2026',
      reason: 'Late delivery penalty (5 days delayed, halted slab casting)',
      amount: 85000,
      recoveryMethod: 'Vendor disputed penalty clause',
      status: 'Disputed'
    },
    {
      id: 'CLM-2026-006',
      supplier: 'Jindal Steel & Power',
      poRef: 'PO-2026-038',
      site: 'Skyline Residency',
      date: '12 Oct 2026',
      reason: 'Weight bridge discrepancy (-1.2 MT variance at site scale)',
      amount: 72000,
      recoveryMethod: 'Dispute resolved via joint recalibration',
      status: 'Approved'
    }
  ];

  const reasonDonutData = [
    { name: 'Transit Damage', value: 42, color: '#F97316' },
    { name: 'Grade / Rust Mismatch', value: 26, color: '#1D5DF0' },
    { name: 'Moisture / Spoilage', value: 18, color: '#16A34A' },
    { name: 'Delivery Penalty', value: 14, color: '#7C3AED' }
  ];

  const vendorClaimsData = [
    { name: 'UltraTech Cement', claims: 3, amount: 145000 },
    { name: 'Tata Steel', claims: 2, amount: 280000 },
    { name: 'Shree Build Mart', claims: 4, amount: 98000 },
    { name: 'Asian Paints', claims: 2, amount: 85000 },
    { name: 'ACC Cement', claims: 3, amount: 120000 }
  ];

  const filteredClaims = claimsData.filter((c) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = c.id.toLowerCase().includes(q) || c.supplier.toLowerCase().includes(q) || c.poRef.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    return true;
  });

  const columns = [
    {
      header: 'Claim ID',
      key: 'id',
      render: (row) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="w-7 h-7 rounded bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-[10px] shrink-0">
            <AlertTriangle size={13} />
          </div>
          <div className="whitespace-nowrap">
            <p className="font-bold text-slate-900 leading-tight">{row.id}</p>
            <p className="text-[10px] text-slate-400">{row.poRef}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Supplier / Vendor',
      key: 'supplier',
      render: (row) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Store size={12} className="text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-800">{row.supplier}</span>
        </div>
      )
    },
    {
      header: 'Project Site',
      key: 'site',
      render: (row) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Building2 size={12} className="text-slate-400 shrink-0" />
          <span className="text-slate-700">{row.site}</span>
        </div>
      )
    },
    {
      header: 'Claim Reason & Root Cause',
      key: 'reason',
      render: (row) => (
        <span className="text-slate-700 text-xs font-medium max-w-xs block truncate" title={row.reason}>
          {row.reason}
        </span>
      )
    },
    {
      header: 'Claim Amount',
      key: 'amount',
      align: 'right',
      render: (row) => <span className="font-extrabold text-blue-600 whitespace-nowrap">{formatCurrencyINR(row.amount)}</span>
    },
    {
      header: 'Recovery Settlement',
      key: 'recoveryMethod',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.recoveryMethod}</span>
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'center',
      render: (row) => (
        <button
          onClick={() => addToast({ title: 'Claim Dossier', message: `Displaying GRN inspection report for ${row.id}`, type: 'info' })}
          className="p-1 hover:text-blue-600 hover:bg-slate-100 rounded text-slate-400 transition-colors"
          title="Inspect Evidence"
        >
          <Eye size={13} />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <HeroBanner
        title="Supplier Claims & Damage Analytics"
        subtitle="Track procurement damages, transit breakages, specification mismatches, and debit note recoveries."
        actionButton={
          <button
            onClick={() => addToast({ title: 'New Claim Form', message: 'Opening Material Damage Claim filing workflow...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>File Damage Claim</span>
          </button>
        }
      />

      {/* 4 StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          icon={AlertTriangle}
          iconBg="bg-amber-500"
          value="₹18,40,000"
          label="Total Claims Value"
          delta="14 claims filed"
          isPositive={false}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-600"
          value="₹12,20,000"
          label="Settled & Reimbursed"
          delta="8 claims settled"
          isPositive={true}
        />
        <StatCard
          icon={Clock}
          iconBg="bg-blue-600"
          value="₹4,80,000"
          label="In Investigation / Dispute"
          delta="4 pending review"
          isPositive={false}
        />
        <StatCard
          icon={FileCheck}
          iconBg="bg-purple-600"
          value="9.4 Days"
          label="Avg Settlement Velocity"
          delta="2.2 days faster"
          isPositive={true}
        />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Claims Breakdown Donut */}
        <div className="md:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-card p-4 flex flex-col justify-between">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Claims Reason Distribution</h3>
          <div className="relative h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reasonDonutData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {reasonDonutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold text-slate-900 leading-none">14</span>
              <span className="text-[10px] text-slate-400 font-medium">Claims</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
            {reasonDonutData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600 truncate">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Claims Bar Chart */}
        <div className="md:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 text-sm">Vendor Claims Value</h3>
            <span className="text-[10px] text-slate-400 font-semibold">₹ Amount Recovered</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorClaimsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="amount" fill="#F97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Claims Register Data Table */}
      <div className="space-y-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Claim ID, supplier, PO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved / Settled</option>
              <option value="In Review">In Review</option>
              <option value="Disputed">Disputed</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredClaims}
          entityName="claims records"
        />
      </div>
    </div>
  );
}
