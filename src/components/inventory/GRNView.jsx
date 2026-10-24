import React, { useState } from 'react';
import { PackageCheck, Plus, CheckCircle2, AlertTriangle, FileText, Store, Calendar } from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function GRNView({ onNavigate }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const grnList = [
    { id: 'GRN-2026-031', poNumber: 'PO-2026-044', supplier: 'Shree Build Mart', site: 'Skyline Residency', date: '22 Oct 2026', vehicleNo: 'RJ-14-GA-4521', itemsReceived: '500 Bags Cement', qualityStatus: 'Passed Quality', status: 'Received' },
    { id: 'GRN-2026-030', poNumber: 'PO-2026-043', supplier: 'Asian Paints Dealer', site: 'Green Valley Villas', date: '20 Oct 2026', vehicleNo: 'RJ-14-UB-8899', itemsReceived: '20 Buckets Exterior Paint', qualityStatus: 'Passed Quality', status: 'Received' },
    { id: 'GRN-2026-029', poNumber: 'PO-2026-042', supplier: 'Tata Steel Ltd.', site: 'Tech Park Phase 1', date: '18 Oct 2026', vehicleNo: 'RJ-14-TR-1200', itemsReceived: '12 Ton TMT 12mm', qualityStatus: 'Under Inspection', status: 'Pending' }
  ];

  const [selectedGRN, setSelectedGRN] = useState(grnList[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  const statusTabs = [
    { id: 'all', label: 'All Receipts', count: 42 },
    { id: 'received', label: 'Verified & Stocked', count: 36 },
    { id: 'pending', label: 'Under Inspection', count: 6 }
  ];

  const columns = [
    {
      header: 'GRN Number',
      key: 'id',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px]">
            GRN
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.id}</p>
            <p className="text-[10px] text-slate-400">Ref: {row.poNumber}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Supplier',
      key: 'supplier',
      render: (row) => <span className="font-semibold text-slate-800">{row.supplier}</span>
    },
    {
      header: 'Delivered To Site',
      key: 'site',
      render: (row) => <span className="text-slate-700">{row.site}</span>
    },
    {
      header: 'Receipt Date',
      key: 'date',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.date}</span>
    },
    {
      header: 'Items Received',
      key: 'itemsReceived',
      render: (row) => <span className="font-medium text-slate-800">{row.itemsReceived}</span>
    },
    {
      header: 'Vehicle No.',
      key: 'vehicleNo',
      render: (row) => <span className="font-mono text-slate-600 text-[11px]">{row.vehicleNo}</span>
    },
    {
      header: 'Quality Inspection',
      key: 'qualityStatus',
      render: (row) => <StatusBadge status={row.qualityStatus} />
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 009 / 090) */}
      <HeroBanner
        title="Goods Received Notes (GRN)"
        subtitle="Manage warehouse stock-in, gate pass entry, material quantity verification and quality inspection (QI) checks."
        actionButton={
          <button
            onClick={() => addToast({ title: 'Create GRN', message: 'Opening Stock-In / GRN entry form (Screen 014)...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={15} />
            <span>Create Receipt (GRN)</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard icon={PackageCheck} iconBg="bg-blue-600" value="42" label="Total GRNs (October)" delta="100% matched with PO" isPositive={true} />
        <StatCard icon={CheckCircle2} iconBg="bg-emerald-600" value="38" label="Passed Quality Inspection" delta="Inventory updated" isPositive={true} />
        <StatCard icon={AlertTriangle} iconBg="bg-amber-500" value="4" label="Under Quality Testing" delta="Cube test in progress" isPositive={false} />
        <StatCard icon={Store} iconBg="bg-purple-600" value="0" label="Rejected / Returned" delta="Zero defect batches" isPositive={true} />
      </div>

      <StatusTabs tabs={statusTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search GRN, PO number, supplier, vehicle..." />

      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={grnList}
            selectedRowId={selectedGRN?.id}
            onRowClick={(row) => {
              setSelectedGRN(row);
              setIsDetailOpen(true);
            }}
            entityName="receipts"
          />
        </div>

        {selectedGRN && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedGRN.id}
            subtitle={selectedGRN.supplier}
            statusBadge={<StatusBadge status={selectedGRN.qualityStatus} />}
            tabs={[{ id: 'overview', label: 'Inspection Checklist' }]}
            quickActions={
              <>
                <button
                  onClick={() => addToast({ title: 'Quality Passed', message: 'All materials accepted and stock credited to inventory', type: 'success' })}
                  className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <CheckCircle2 size={12} />
                  <span>Pass Quality</span>
                </button>
                <button
                  onClick={() => addToast({ title: 'Discrepancy Report', message: 'Generating Discrepancy & Damage Report (Screen 077)...', type: 'info' })}
                  className="py-2 px-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <AlertTriangle size={12} />
                  <span>Discrepancy</span>
                </button>
              </>
            }
          >
            {() => (
              <div className="space-y-3.5 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">PO Reference:</span>
                    <span className="font-bold text-slate-800">{selectedGRN.poNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Delivery Site:</span>
                    <span className="font-semibold text-slate-800">{selectedGRN.site}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Delivery Vehicle:</span>
                    <span className="font-mono text-slate-700">{selectedGRN.vehicleNo}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                    <span className="text-slate-400">Received Items:</span>
                    <span className="font-bold text-blue-600">{selectedGRN.itemsReceived}</span>
                  </div>
                </div>

                {/* Inspection checklist (Screen 090) */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quality Checklist</span>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-slate-700 text-xs">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span>Physical quantity matches delivery challan</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-700 text-xs">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span>Manufacturer test certificate received</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-700 text-xs">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span>Packaging condition intact (no moisture/damage)</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-700 text-xs">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span>Batch number & ISI mark verified</span>
                    </label>
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
