import React, { useState } from 'react';
import {
  Receipt,
  Clock,
  Truck,
  CheckCircle2,
  Plus,
  Eye,
  Edit2,
  Calendar,
  Building2,
  Store,
  Download,
  X
} from 'lucide-react';
import { purchaseOrdersData } from '../../data/mockData';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function PurchaseOrdersListView({ onAddNew, onSelectPO, onNavigate }) {
  const { addToast } = useToast();
  const [poList, setPoList] = useState(purchaseOrdersData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPO, setSelectedPO] = useState(purchaseOrdersData[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [newPO, setNewPO] = useState({
    supplier: 'UltraTech Cement Ltd.',
    project: 'Skyline Residency',
    expectedDelivery: '',
    totalAmount: '',
    itemsDescription: '',
    paymentTerms: 'Net 30 Days'
  });

  const handleCreatePO = (e) => {
    e.preventDefault();
    if (!newPO.totalAmount) {
      addToast({
        title: 'Amount Required',
        message: 'Please provide the total estimated amount.',
        type: 'error'
      });
      return;
    }

    const created = {
      id: `PO-${1000 + poList.length + 1}`,
      poNumber: `PO-2026-${String(poList.length + 1).padStart(3, '0')}`,
      supplier: newPO.supplier,
      project: newPO.project,
      orderDate: '24 Oct 2026',
      expectedDelivery: newPO.expectedDelivery || '02 Nov 2026',
      totalAmount: parseFloat(newPO.totalAmount) || 280000,
      status: 'Pending Approval',
      stage: 'Awaiting MD Approval',
      createdBy: 'Kamlesh Sharma'
    };

    setPoList([created, ...poList]);
    setSelectedPO(created);
    setIsAddModalOpen(false);
    setNewPO({
      supplier: 'UltraTech Cement Ltd.',
      project: 'Skyline Residency',
      expectedDelivery: '',
      totalAmount: '',
      itemsDescription: '',
      paymentTerms: 'Net 30 Days'
    });
    addToast({
      title: 'Purchase Order Created',
      message: `${created.poNumber} created for ${created.supplier}.`,
      type: 'success'
    });
  };

  const statusTabs = [
    { id: 'all', label: 'All Purchase Orders', count: poList.length },
    { id: 'pending approval', label: 'Pending Approval', count: poList.filter(p => p.status === 'Pending Approval').length },
    { id: 'approved', label: 'Approved', count: poList.filter(p => p.status === 'Approved').length },
    { id: 'in transit', label: 'In Transit', count: poList.filter(p => p.status === 'In Transit').length },
    { id: 'delivered', label: 'Delivered', count: poList.filter(p => p.status === 'Delivered').length }
  ];

  const filteredPOs = poList.filter(po => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = po.poNumber.toLowerCase().includes(q) ||
                    po.supplier.toLowerCase().includes(q) ||
                    po.project.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeTab !== 'all' && po.status.toLowerCase() !== activeTab) return false;
    return true;
  });

  const columns = [
    {
      header: 'PO Number',
      key: 'poNumber',
      render: (row) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0">
            PO
          </div>
          <div className="whitespace-nowrap">
            <p className="font-bold text-slate-900 leading-tight">{row.poNumber}</p>
            <p className="text-[10px] text-slate-400">{row.priority} Priority</p>
          </div>
        </div>
      )
    },
    {
      header: 'Supplier',
      key: 'supplier',
      render: (row) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Store size={12} className="text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-800">{row.supplier}</span>
        </div>
      )
    },
    {
      header: 'Project / Site',
      key: 'project',
      render: (row) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Building2 size={12} className="text-slate-400 shrink-0" />
          <span className="text-slate-700">{row.project}</span>
        </div>
      )
    },
    {
      header: 'Order Date',
      key: 'orderDate',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.orderDate}</span>
    },
    {
      header: 'Expected Delivery',
      key: 'expectedDelivery',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.expectedDelivery}</span>
    },
    {
      header: 'Total Amount',
      key: 'totalAmount',
      align: 'right',
      render: (row) => <span className="font-extrabold text-blue-600">{formatCurrencyINR(row.totalAmount)}</span>
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
        <div className="flex items-center justify-center gap-1.5 text-slate-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectPO(row);
            }}
            className="p-1 hover:text-blue-600 rounded"
            title="View Details & Approval"
          >
            <Eye size={13} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 002) */}
      <HeroBanner
        title="Purchase Orders"
        subtitle="Manage material procurement, track PO approvals, deliveries and vendor reconciliation."
        actionButton={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Create Purchase Order</span>
          </button>
        }
      />

      {/* 4 StatCards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <StatCard
          icon={Receipt}
          iconBg="bg-blue-600"
          value={String(poList.length)}
          label="Total Purchase Orders"
          delta="14% this month"
          isPositive={true}
        />
        <StatCard
          icon={Clock}
          iconBg="bg-amber-500"
          value={String(poList.filter(p => p.status === 'Pending Approval').length)}
          label="Pending Approval"
          delta="4 urgent"
          isPositive={false}
        />
        <StatCard
          icon={Truck}
          iconBg="bg-purple-600"
          value={String(poList.filter(p => p.status === 'In Transit').length)}
          label="In Transit / Dispatched"
          delta="6 arriving today"
          isPositive={true}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-600"
          value={String(poList.filter(p => p.status === 'Delivered').length)}
          label="Delivered & GRN Verified"
          delta="₹1.4 Cr value"
          isPositive={true}
        />
      </div>

      {/* Status Tabs */}
      <StatusTabs
        tabs={statusTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Filter Bar */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search PO number, supplier, site..."
        onReset={() => setSearchQuery('')}
        onExport={() => addToast({ title: 'Exporting POs', message: 'Generating Excel sheet of PO register...', type: 'info' })}
      />

      {/* Main Grid: Data Table + Right Detail Drawer */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={filteredPOs}
            selectedRowId={selectedPO?.id}
            onRowClick={(row) => {
              setSelectedPO(row);
              setIsDetailOpen(true);
            }}
            entityName="purchase orders"
          />
        </div>

        {/* Right Drawer Panel */}
        {selectedPO && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedPO.poNumber}
            subtitle={selectedPO.supplier}
            statusBadge={<StatusBadge status={selectedPO.status} />}
            tabs={[
              { id: 'overview', label: 'Summary' },
              { id: 'items', label: 'Items' }
            ]}
            quickActions={
              <>
                <button
                  onClick={() => onSelectPO(selectedPO)}
                  className="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Eye size={12} />
                  <span>View Details & Approval</span>
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="py-2 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Plus size={12} />
                  <span>New PO</span>
                </button>
              </>
            }
          >
            {() => (
              <div className="space-y-3.5">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Total Amount:</span>
                    <span className="font-extrabold text-blue-600 text-sm">{formatCurrencyINR(selectedPO.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1 border-t border-slate-200">
                    <span className="text-slate-400">Project / Site:</span>
                    <span className="font-semibold text-slate-800">{selectedPO.project}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Order Date:</span>
                    <span className="font-medium text-slate-700">{selectedPO.orderDate}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Expected Delivery:</span>
                    <span className="font-medium text-slate-700">{selectedPO.expectedDelivery}</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approval Status</span>
                  <p className="font-bold text-slate-800">{selectedPO.stage || 'Approval Pending'}</p>
                  <p className="text-[11px] text-slate-500">Created by {selectedPO.createdBy || 'Kamlesh Sharma'}</p>
                </div>
              </div>
            )}
          </DetailDrawerPanel>
        )}
      </div>

      {/* Create Purchase Order Responsive Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <Receipt size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Create Purchase Order</h3>
                  <p className="text-[11px] text-slate-500">Generate procurement order for material delivery</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleCreatePO} className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Approved Supplier *
                  </label>
                  <select
                    value={newPO.supplier}
                    onChange={(e) => setNewPO({ ...newPO, supplier: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="UltraTech Cement Ltd.">UltraTech Cement Ltd. (Cement)</option>
                    <option value="Tata Steel Tiscon">Tata Steel Tiscon (Steel)</option>
                    <option value="Jaipur Aggregates Crusher">Jaipur Aggregates Crusher (Stone / Sand)</option>
                    <option value="Birla White Putty">Birla White Putty (Finishing)</option>
                    <option value="Havells India Electricals">Havells India Electricals (Cables / Switches)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Delivery Site Project *
                  </label>
                  <select
                    value={newPO.project}
                    onChange={(e) => setNewPO({ ...newPO, project: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Skyline Residency">Skyline Residency</option>
                    <option value="City Center Mall">City Center Mall</option>
                    <option value="Green Valley Villas">Green Valley Villas</option>
                    <option value="Highway Interchange Phase 1">Highway Interchange Phase 1</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Expected Delivery Date
                  </label>
                  <input
                    type="date"
                    value={newPO.expectedDelivery}
                    onChange={(e) => setNewPO({ ...newPO, expectedDelivery: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Total Estimated Amount (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 485000"
                    value={newPO.totalAmount}
                    onChange={(e) => setNewPO({ ...newPO, totalAmount: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Payment Terms
                  </label>
                  <select
                    value={newPO.paymentTerms}
                    onChange={(e) => setNewPO({ ...newPO, paymentTerms: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Immediate on GRN">Immediate on GRN Verification</option>
                    <option value="Net 15 Days">Net 15 Days</option>
                    <option value="Net 30 Days">Net 30 Days</option>
                    <option value="50% Advance, Balance on Delivery">50% Advance, Balance on Delivery</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Order Items Breakdown & Specifications
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 500 Bags OPC 53 Grade Cement @ ₹380/bag + 10 MT TMT Rebar 12mm @ ₹48,000/MT including delivery to Site Gate 2"
                    value={newPO.itemsDescription}
                    onChange={(e) => setNewPO({ ...newPO, itemsDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Submit for Approval</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
