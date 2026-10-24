import React, { useState } from 'react';
import { FileCheck, Calendar, Building2, Plus, Download, Eye } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function ContractsView({ onNavigate }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const contracts = [
    { id: 'CNT-2026-008', title: 'Main Civil Construction Agreement', client: 'Agarwal Infra Pvt. Ltd.', project: 'Skyline Residency', value: 125000000, signedDate: '15 Jan 2026', validTill: '30 Dec 2026', status: 'Active' },
    { id: 'CNT-2026-007', title: 'Duplex Villa Construction Contract', client: 'Mehta Developers', project: 'Green Valley Villas', value: 82000000, signedDate: '10 Mar 2026', validTill: '15 Mar 2027', status: 'Active' },
    { id: 'CNT-2026-006', title: 'Commercial Mall Structural Package', client: 'Sharma Builders', project: 'City Center Mall', value: 250000000, signedDate: '01 Feb 2026', validTill: '20 Nov 2026', status: 'Under Review' },
    { id: 'CNT-2026-005', title: 'Lake Front Residential Finishing', client: 'Green Infra Pvt Ltd', project: 'River View Apartments', value: 68000000, signedDate: '15 Nov 2025', validTill: '30 Sep 2026', status: 'Completed' }
  ];

  const [selectedContract, setSelectedContract] = useState(contracts[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  const statusTabs = [
    { id: 'all', label: 'All Contracts', count: 24 },
    { id: 'active', label: 'Active Contracts', count: 18 },
    { id: 'under review', label: 'Under Review', count: 4 },
    { id: 'completed', label: 'Completed', count: 2 }
  ];

  const columns = [
    {
      header: 'Contract ID',
      key: 'id',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.id}</p>
          <p className="text-[10px] text-slate-400">{row.title}</p>
        </div>
      )
    },
    {
      header: 'Client',
      key: 'client',
      render: (row) => <span className="font-semibold text-slate-800">{row.client}</span>
    },
    {
      header: 'Project',
      key: 'project',
      render: (row) => <span className="text-slate-700">{row.project}</span>
    },
    {
      header: 'Contract Value',
      key: 'value',
      align: 'right',
      render: (row) => <span className="font-extrabold text-blue-600">{formatCurrencyINR(row.value, true)}</span>
    },
    {
      header: 'Signed Date',
      key: 'signedDate',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.signedDate}</span>
    },
    {
      header: 'Valid Till',
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
      {/* Hero Banner (Screen 025) */}
      <HeroBanner
        title="Contracts & Agreements"
        subtitle="Track legal contracts, milestone delivery schedules, retention money and financial covenants."
        actionButton={
          <button
            onClick={() => addToast({ title: 'New Contract', message: 'Opening contract creator...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={15} />
            <span>Create Contract</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard icon={FileCheck} iconBg="bg-blue-600" value="24" label="Total Executed Contracts" delta="₹52.5 Cr value" isPositive={true} />
        <StatCard icon={FileCheck} iconBg="bg-emerald-600" value="18" label="Active In Execution" delta="100% SLA intact" isPositive={true} />
        <StatCard icon={Calendar} iconBg="bg-amber-500" value="3" label="Upcoming Renewal / Close" delta="Within 60 days" isPositive={false} />
        <StatCard icon={Building2} iconBg="bg-purple-600" value="₹2.6 Cr" label="Retention Money Held" delta="Bank guaranteed" isPositive={true} />
      </div>

      <StatusTabs tabs={statusTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search contract, client, project..." />

      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={contracts}
            selectedRowId={selectedContract?.id}
            onRowClick={(row) => {
              setSelectedContract(row);
              setIsDetailOpen(true);
            }}
            entityName="contracts"
          />
        </div>

        {selectedContract && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedContract.id}
            subtitle={selectedContract.client}
            statusBadge={<StatusBadge status={selectedContract.status} />}
            tabs={[{ id: 'overview', label: 'Milestones & Terms' }]}
            quickActions={
              <>
                <button
                  onClick={() => addToast({ title: 'Download Contract', message: `Exporting signed agreement ${selectedContract.id}.pdf`, type: 'info' })}
                  className="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Download size={12} />
                  <span>Download Signed PDF</span>
                </button>
                <button
                  onClick={() => onNavigate('invoices')}
                  className="py-2 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Building2 size={12} />
                  <span>View Invoices</span>
                </button>
              </>
            }
          >
            {() => (
              <div className="space-y-3.5 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Contract Value:</span>
                    <span className="font-extrabold text-blue-600 text-sm">{formatCurrencyINR(selectedContract.value, true)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-400">Project Name:</span>
                    <span className="font-semibold text-slate-800">{selectedContract.project}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Signed Date:</span>
                    <span className="font-medium text-slate-700">{selectedContract.signedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Completion Target:</span>
                    <span className="font-semibold text-slate-700">{selectedContract.validTill}</span>
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
