import React, { useState } from 'react';
import { Calculator, Plus, Send, CheckCircle2, Clock, Eye, Download, Building2, FolderGit2 } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function EstimatesView({ onNavigate }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const estimates = [
    { id: 'EST-2026-042', client: 'RK Constructions', project: 'Skyline Residency Tower C', amount: 38500000, date: '18 Oct 2026', validTill: '18 Nov 2026', status: 'Approved', preparedBy: 'Amit Verma' },
    { id: 'EST-2026-041', client: 'Mehta Developers', project: 'Green Valley Club House', amount: 14200000, date: '14 Oct 2026', validTill: '14 Nov 2026', status: 'Sent', preparedBy: 'Vikram Patel' },
    { id: 'EST-2026-040', client: 'Sharma Builders', project: 'Basement Parking Phase 2', amount: 22000000, date: '10 Oct 2026', validTill: '10 Nov 2026', status: 'Under Review', preparedBy: 'Amit Verma' },
    { id: 'EST-2026-039', client: 'Malhotra Group', project: 'PEB Industrial Shed', amount: 65000000, date: '05 Oct 2026', validTill: '05 Nov 2026', status: 'Draft', preparedBy: 'Rohit Jain' }
  ];

  const [selectedEst, setSelectedEst] = useState(estimates[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  const statusTabs = [
    { id: 'all', label: 'All Quotations', count: 32 },
    { id: 'sent', label: 'Sent to Client', count: 12 },
    { id: 'under review', label: 'In Negotiation', count: 8 },
    { id: 'approved', label: 'Approved', count: 10 },
    { id: 'draft', label: 'Draft', count: 2 }
  ];

  const columns = [
    {
      header: 'Estimate #',
      key: 'id',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-[10px]">
            EST
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.id}</p>
            <p className="text-[10px] text-slate-400">By {row.preparedBy}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Client',
      key: 'client',
      render: (row) => <span className="font-semibold text-slate-800">{row.client}</span>
    },
    {
      header: 'Proposed Project',
      key: 'project',
      render: (row) => <span className="text-slate-700">{row.project}</span>
    },
    {
      header: 'Estimated Value',
      key: 'amount',
      align: 'right',
      render: (row) => <span className="font-extrabold text-blue-600">{formatCurrencyINR(row.amount, true)}</span>
    },
    {
      header: 'Created Date',
      key: 'date',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.date}</span>
    },
    {
      header: 'Validity',
      key: 'validTill',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.validTill}</span>
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 058) */}
      <HeroBanner
        title="Estimates & Quotations"
        subtitle="Create BOQ (Bill of Quantities) based cost estimates, item rate analysis and formal client quotations."
        actionButton={
          <button
            onClick={() => addToast({ title: 'New Estimate', message: 'Opening BOQ estimate sheet...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={15} />
            <span>Create Quotation</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard icon={Calculator} iconBg="bg-blue-600" value="32" label="Total Quotations (FY26)" delta="₹148 Cr quoted" isPositive={true} />
        <StatCard icon={CheckCircle2} iconBg="bg-emerald-600" value="₹52.7 Cr" label="Approved & Won" delta="35% win rate" isPositive={true} />
        <StatCard icon={Clock} iconBg="bg-amber-500" value="12" label="Under Client Review" delta="Follow up required" isPositive={false} />
        <StatCard icon={Send} iconBg="bg-purple-600" value="8" label="Sent This Month" delta="4 closing next week" isPositive={true} />
      </div>

      <StatusTabs tabs={statusTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search estimate, client, project..." />

      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={estimates}
            selectedRowId={selectedEst?.id}
            onRowClick={(row) => {
              setSelectedEst(row);
              setIsDetailOpen(true);
            }}
            entityName="quotations"
          />
        </div>

        {selectedEst && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedEst.id}
            subtitle={selectedEst.client}
            statusBadge={<StatusBadge status={selectedEst.status} />}
            tabs={[{ id: 'overview', label: 'Quotation Summary' }]}
            quickActions={
              <>
                <button
                  onClick={() => {
                    addToast({ title: 'Project Created', message: `Converting ${selectedEst.id} to new Project...`, type: 'success' });
                    onNavigate('projects');
                  }}
                  className="py-2 px-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <FolderGit2 size={12} />
                  <span>Convert to Project</span>
                </button>
                <button
                  onClick={() => addToast({ title: 'Send PDF', message: `Quotation PDF sent to client email`, type: 'info' })}
                  className="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Send size={12} />
                  <span>Send to Client</span>
                </button>
              </>
            }
          >
            {() => (
              <div className="space-y-3.5 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Estimated Cost:</span>
                    <span className="font-extrabold text-blue-600 text-sm">{formatCurrencyINR(selectedEst.amount, true)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-400">Project:</span>
                    <span className="font-semibold text-slate-800">{selectedEst.project}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Created Date:</span>
                    <span className="font-medium text-slate-700">{selectedEst.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Price Validity:</span>
                    <span className="font-semibold text-slate-700">{selectedEst.validTill}</span>
                  </div>
                </div>
              </div>
            )}
          </DetailDrawerPanel>
        )}
      </div>
    </div>
  );
}
