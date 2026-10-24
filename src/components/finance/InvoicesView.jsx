import React, { useState } from 'react';
import { Receipt, DollarSign, Clock, CheckCircle2, Plus, Download, Eye, Calendar, Building2 } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function InvoicesView({ onNavigate }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const invoices = [
    { id: 'INV-2026-089', client: 'Agarwal Infra Pvt. Ltd.', project: 'Skyline Residency', amount: 4250000, date: '15 Oct 2026', dueDate: '25 Oct 2026', status: 'Paid', milestone: 'Milestone 3: 4th Floor Slab' },
    { id: 'INV-2026-090', client: 'Sharma Builders', project: 'City Center Mall', amount: 2800000, date: '18 Oct 2026', dueDate: '05 Nov 2026', status: 'Pending', milestone: 'Milestone 1: Excavation & Raft' },
    { id: 'INV-2026-091', client: 'Mehta Developers', project: 'Green Valley Villas', amount: 1840000, date: '20 Oct 2026', dueDate: '15 Nov 2026', status: 'Draft', milestone: 'Milestone 2: Plinth Beam' },
    { id: 'INV-2026-092', client: 'RK Constructions', project: 'Skyline Residency', amount: 5600000, date: '10 Oct 2026', dueDate: '20 Oct 2026', status: 'Paid', milestone: 'Advance Mobilization' }
  ];

  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  const statusTabs = [
    { id: 'all', label: 'All Invoices', count: 48 },
    { id: 'paid', label: 'Paid', count: 32 },
    { id: 'pending', label: 'Pending', count: 12 },
    { id: 'draft', label: 'Draft', count: 4 }
  ];

  const columns = [
    {
      header: 'Invoice #',
      key: 'id',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px]">
            INV
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.id}</p>
            <p className="text-[10px] text-slate-400">{row.milestone}</p>
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
      header: 'Project',
      key: 'project',
      render: (row) => <span className="text-slate-700">{row.project}</span>
    },
    {
      header: 'Invoice Date',
      key: 'date',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.date}</span>
    },
    {
      header: 'Due Date',
      key: 'dueDate',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.dueDate}</span>
    },
    {
      header: 'Amount',
      key: 'amount',
      align: 'right',
      render: (row) => <span className="font-extrabold text-blue-600">{formatCurrencyINR(row.amount)}</span>
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 024) */}
      <HeroBanner
        title="Invoices & Payments"
        subtitle="Manage client progress billing, GST invoices, payment receipts and outstanding aging analysis."
        actionButton={
          <button
            onClick={() => addToast({ title: 'New Invoice', message: 'Opening Create Invoice modal...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={15} />
            <span>Create Invoice</span>
          </button>
        }
      />

      {/* 4 StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          icon={Receipt}
          iconBg="bg-blue-600"
          value="₹4.85 Cr"
          label="Total Invoiced (This Year)"
          delta="18% growth"
          isPositive={true}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-600"
          value="₹4.12 Cr"
          label="Total Collected"
          delta="85% realization"
          isPositive={true}
        />
        <StatCard
          icon={Clock}
          iconBg="bg-amber-500"
          value="₹73.0 Lakh"
          label="Outstanding Receivables"
          delta="4 overdue"
          isPositive={false}
        />
        <StatCard
          icon={DollarSign}
          iconBg="bg-purple-600"
          value="₹14.2 Lakh"
          label="GST Paid / Settled"
          delta="100% compliant"
          isPositive={true}
        />
      </div>

      <StatusTabs tabs={statusTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search invoice, client, project..." />

      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={invoices}
            selectedRowId={selectedInvoice?.id}
            onRowClick={(row) => {
              setSelectedInvoice(row);
              setIsDetailOpen(true);
            }}
            entityName="invoices"
          />
        </div>

        {selectedInvoice && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedInvoice.id}
            subtitle={selectedInvoice.client}
            statusBadge={<StatusBadge status={selectedInvoice.status} />}
            tabs={[{ id: 'overview', label: 'Payment Details' }]}
            quickActions={
              <>
                <button
                  onClick={() => addToast({ title: 'Download PDF', message: `Exporting ${selectedInvoice.id} tax invoice`, type: 'info' })}
                  className="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Download size={12} />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => addToast({ title: 'Record Payment', message: 'Opening payment receipt voucher...', type: 'success' })}
                  className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <DollarSign size={12} />
                  <span>Record Payment</span>
                </button>
              </>
            }
          >
            {() => (
              <div className="space-y-3.5 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Billed:</span>
                    <span className="font-extrabold text-blue-600 text-sm">{formatCurrencyINR(selectedInvoice.amount)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-400">Project:</span>
                    <span className="font-semibold text-slate-800">{selectedInvoice.project}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Milestone:</span>
                    <span className="font-medium text-slate-700">{selectedInvoice.milestone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Due Date:</span>
                    <span className="font-semibold text-slate-700">{selectedInvoice.dueDate}</span>
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
