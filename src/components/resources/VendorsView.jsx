import React, { useState } from 'react';
import { Store, Star, Phone, Mail, Plus, MapPin, Building2, CheckCircle2, DollarSign, X } from 'lucide-react';
import { vendorsData } from '../../data/mockData';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function VendorsView({ onNavigate }) {
  const { addToast } = useToast();
  const [vendorsList, setVendorsList] = useState(vendorsData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(vendorsData[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [newVendor, setNewVendor] = useState({
    name: '',
    category: 'Cement & Concrete',
    contactPerson: '',
    phone: '',
    email: '',
    gst: '',
    address: ''
  });

  const handleCreateVendor = (e) => {
    e.preventDefault();
    if (!newVendor.name.trim() || !newVendor.contactPerson.trim()) {
      addToast({
        title: 'Missing Required Fields',
        message: 'Supplier Name and Contact Person are required.',
        type: 'error'
      });
      return;
    }

    const created = {
      id: `VND-${String(vendorsList.length + 1).padStart(3, '0')}`,
      name: newVendor.name.trim(),
      category: newVendor.category,
      contactPerson: newVendor.contactPerson.trim(),
      phone: newVendor.phone.trim() || '+91 98290 12345',
      email: newVendor.email.trim() || 'sales@vendor.com',
      gst: newVendor.gst.trim() || '08AAACR1234E1Z1',
      rating: 4.8,
      ordersCount: 1,
      totalBilled: 0,
      status: 'Active',
      address: newVendor.address.trim() || 'VKIA Industrial Area, Jaipur, Rajasthan'
    };

    setVendorsList([created, ...vendorsList]);
    setSelectedVendor(created);
    setIsAddModalOpen(false);
    setNewVendor({
      name: '',
      category: 'Cement & Concrete',
      contactPerson: '',
      phone: '',
      email: '',
      gst: '',
      address: ''
    });
    addToast({
      title: 'Supplier Added',
      message: `${created.name} registered as an approved supplier.`,
      type: 'success'
    });
  };

  const statusTabs = [
    { id: 'all', label: 'All Suppliers', count: vendorsList.length },
    { id: 'active', label: 'Active Vendors', count: vendorsList.filter(v => v.status === 'Active').length },
    { id: 'preferred', label: 'Preferred Partners', count: 12 }
  ];

  const columns = [
    {
      header: 'Supplier Name',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
            <Store size={15} />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
            <p className="text-[10px] text-slate-500">{row.id} • {row.category}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Contact Person',
      key: 'contactPerson',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800">{row.contactPerson}</p>
          <p className="text-[10px] text-slate-400">{row.phone}</p>
        </div>
      )
    },
    {
      header: 'GSTIN',
      key: 'gst',
      render: (row) => <span className="font-mono text-[11px] text-slate-700 font-medium">{row.gst}</span>
    },
    {
      header: 'Rating',
      key: 'rating',
      align: 'center',
      render: (row) => (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-xs border border-amber-200">
          <Star size={11} className="fill-amber-400 text-amber-500" />
          {row.rating}
        </span>
      )
    },
    {
      header: 'Total Orders',
      key: 'ordersCount',
      align: 'center',
      render: (row) => <span className="font-bold text-slate-800">{row.ordersCount} POs</span>
    },
    {
      header: 'Total Billed',
      key: 'totalBilled',
      align: 'right',
      render: (row) => <span className="font-extrabold text-blue-600">{formatCurrencyINR(row.totalBilled, true)}</span>
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 062) */}
      <HeroBanner
        title="Vendors & Suppliers"
        subtitle="Manage approved building materials suppliers, rate contracts, vendor rating and procurement ledger."
        actionButton={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Supplier</span>
          </button>
        }
      />

      {/* 4 StatCards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <StatCard icon={Store} iconBg="bg-blue-600" value={String(vendorsList.length)} label="Registered Vendors" delta="100% KYC verified" isPositive={true} />
        <StatCard icon={CheckCircle2} iconBg="bg-emerald-600" value={String(vendorsList.filter(v => v.status === 'Active').length)} label="Active Suppliers" delta="Active purchase orders" isPositive={true} />
        <StatCard icon={DollarSign} iconBg="bg-purple-600" value="₹14.9 Cr" label="Total Annual Procurement" delta="Cement & Steel major" isPositive={true} />
        <StatCard icon={Star} iconBg="bg-amber-500" value="4.78" label="Avg Vendor Rating" delta="High SLA compliance" isPositive={true} />
      </div>

      <StatusTabs tabs={statusTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search vendor name, category, contact..." />

      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={vendorsList.filter(v => {
              if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const match = v.name.toLowerCase().includes(q) ||
                              v.contactPerson.toLowerCase().includes(q) ||
                              v.category.toLowerCase().includes(q);
                if (!match) return false;
              }
              if (activeTab === 'active' && v.status.toLowerCase() !== 'active') return false;
              return true;
            })}
            selectedRowId={selectedVendor?.id}
            onRowClick={(row) => {
              setSelectedVendor(row);
              setIsDetailOpen(true);
            }}
            entityName="vendors"
          />
        </div>

        {selectedVendor && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedVendor.name}
            subtitle={`${selectedVendor.id} • ${selectedVendor.category}`}
            statusBadge={<StatusBadge status={selectedVendor.status} />}
            tabs={[{ id: 'overview', label: 'Supplier Profile' }]}
            quickActions={
              <>
                <button
                  onClick={() => onNavigate('purchase_orders')}
                  className="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Plus size={12} />
                  <span>Create PO</span>
                </button>
                <button
                  onClick={() => addToast({ title: 'Calling Vendor', message: `Calling ${selectedVendor.contactPerson} (${selectedVendor.phone})`, type: 'info' })}
                  className="py-2 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Phone size={12} />
                  <span>Call Vendor</span>
                </button>
              </>
            }
          >
            {() => (
              <div className="space-y-3.5 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Billed:</span>
                    <span className="font-extrabold text-blue-600 text-sm">{formatCurrencyINR(selectedVendor.totalBilled, true)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-400">Contact:</span>
                    <span className="font-semibold text-slate-800">{selectedVendor.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-medium text-slate-700">{selectedVendor.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-medium text-slate-700">{selectedVendor.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">GSTIN:</span>
                    <span className="font-mono text-slate-700">{selectedVendor.gst}</span>
                  </div>
                  <div className="pt-1 text-slate-400 text-[10px] border-t border-slate-200">
                    {selectedVendor.address}
                  </div>
                </div>
              </div>
            )}
          </DetailDrawerPanel>
        )}
      </div>

      {/* Add Supplier Responsive Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <Store size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Add Approved Supplier</h3>
                  <p className="text-[11px] text-slate-500">Register new building materials vendor</p>
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
            <form onSubmit={handleCreateVendor} className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company / Supplier Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shree Cement & ReadyMix Pvt Ltd"
                    value={newVendor.name}
                    onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Trade / Category
                  </label>
                  <select
                    value={newVendor.category}
                    onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Cement & Concrete">Cement & Concrete</option>
                    <option value="Steel & TMT Rebars">Steel & TMT Rebars</option>
                    <option value="Aggregates & Stone">Aggregates & Stone</option>
                    <option value="Bricks & AAC Blocks">Bricks & AAC Blocks</option>
                    <option value="Electrical & Cables">Electrical & Cables</option>
                    <option value="Plumbing & Sanity">Plumbing & Sanitary</option>
                    <option value="Equipment Rental">Equipment Rental</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={newVendor.contactPerson}
                    onChange={(e) => setNewVendor({ ...newVendor, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98290 87654"
                    value={newVendor.phone}
                    onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="sales@vendor.com"
                    value={newVendor.email}
                    onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    GSTIN / Registration Number
                  </label>
                  <input
                    type="text"
                    placeholder="08AAACR5678B1Z2"
                    value={newVendor.gst}
                    onChange={(e) => setNewVendor({ ...newVendor, gst: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Office / Yard Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Plot No 42, VKIA Industrial Area, Jaipur, Rajasthan"
                    value={newVendor.address}
                    onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })}
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
                  <span>Register Supplier</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
