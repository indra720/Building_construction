import React, { useState } from 'react';
import {
  Boxes,
  AlertTriangle,
  PackageCheck,
  Plus,
  Eye,
  Store,
  Layers,
  ArrowUpDown,
  TrendingDown,
  RefreshCw,
  X
} from 'lucide-react';
import { materialsData } from '../../data/mockData';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function MaterialsInventoryView({ onAddNew, onNavigate }) {
  const { addToast } = useToast();
  const [materialsList, setMaterialsList] = useState(materialsData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(materialsData[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [newMaterial, setNewMaterial] = useState({
    name: '',
    category: 'Cement & Concrete',
    sku: '',
    unit: 'Bags',
    currentStock: '',
    minStock: '',
    maxStock: '',
    unitPrice: '',
    supplier: 'UltraTech Cement Ltd.',
    location: 'Site Warehouse A'
  });

  const handleCreateMaterial = (e) => {
    e.preventDefault();
    if (!newMaterial.name.trim()) {
      addToast({
        title: 'Material Name Required',
        message: 'Please provide the material description.',
        type: 'error'
      });
      return;
    }

    const created = {
      id: `MAT-2026-${String(materialsList.length + 1).padStart(3, '0')}`,
      sku: newMaterial.sku.trim() || `SKU-${1000 + materialsList.length}`,
      name: newMaterial.name.trim(),
      category: newMaterial.category,
      unit: newMaterial.unit,
      currentStock: parseFloat(newMaterial.currentStock) || 100,
      minStock: parseFloat(newMaterial.minStock) || 20,
      maxStock: parseFloat(newMaterial.maxStock) || 500,
      unitPrice: parseFloat(newMaterial.unitPrice) || 350,
      supplier: newMaterial.supplier,
      location: newMaterial.location,
      status: (parseFloat(newMaterial.currentStock) || 100) <= (parseFloat(newMaterial.minStock) || 20) ? 'Low Stock' : 'In Stock'
    };

    setMaterialsList([created, ...materialsList]);
    setSelectedMaterial(created);
    setIsAddModalOpen(false);
    setNewMaterial({
      name: '',
      category: 'Cement & Concrete',
      sku: '',
      unit: 'Bags',
      currentStock: '',
      minStock: '',
      maxStock: '',
      unitPrice: '',
      supplier: 'UltraTech Cement Ltd.',
      location: 'Site Warehouse A'
    });
    addToast({
      title: 'Material Added',
      message: `${created.name} (${created.sku}) added to catalog.`,
      type: 'success'
    });
  };

  const statusTabs = [
    { id: 'all', label: 'All Materials', count: materialsList.length },
    { id: 'in stock', label: 'In Stock', count: materialsList.filter(m => m.status === 'In Stock').length },
    { id: 'low stock', label: 'Low Stock Alerts', count: materialsList.filter(m => m.status === 'Low Stock').length }
  ];

  const filterConfigs = [
    {
      id: 'category',
      label: 'Category',
      options: ['Cement & Concrete', 'Steel & Metals', 'Masonry', 'Aggregates', 'Plumbing', 'Paints & Chemicals']
    }
  ];

  const filteredMaterials = materialsList.filter(m => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = m.name.toLowerCase().includes(q) ||
                    m.sku.toLowerCase().includes(q) ||
                    m.category.toLowerCase().includes(q) ||
                    m.supplier.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeTab !== 'all' && m.status.toLowerCase() !== activeTab) return false;
    if (categoryFilter && m.category !== categoryFilter) return false;
    return true;
  });

  const columns = [
    {
      header: 'Material Name',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
            <Boxes size={15} />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
            <p className="text-[10px] text-slate-500 font-mono">{row.sku} • {row.brand}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      key: 'category',
      render: (row) => <span className="font-medium text-slate-700">{row.category}</span>
    },
    {
      header: 'Available Stock',
      key: 'stock',
      align: 'right',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900">{row.stock}</span>{' '}
          <span className="text-[11px] text-slate-500">{row.unit}</span>
        </div>
      )
    },
    {
      header: 'Min Stock',
      key: 'minStock',
      align: 'right',
      render: (row) => <span className="text-slate-600 font-medium">{row.minStock} {row.unit}</span>
    },
    {
      header: 'Unit Rate (₹)',
      key: 'rate',
      align: 'right',
      render: (row) => <span className="font-bold text-slate-900">{formatCurrencyINR(row.rate)}</span>
    },
    {
      header: 'Warehouse Location',
      key: 'location',
      render: (row) => <span className="text-slate-600 text-[11px]">{row.location}</span>
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
              setSelectedMaterial(row);
              setIsDetailOpen(true);
            }}
            className="p-1 hover:text-blue-600 rounded"
            title="View Details"
          >
            <Eye size={13} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Header (Screen 085) */}
      <HeroBanner
        title="Materials & Inventory"
        subtitle="Track site-wise inventory, stock movements, min-max thresholds and material reorders."
        actionButton={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Material</span>
          </button>
        }
      />

      {/* 4 StatCards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <StatCard
          icon={Boxes}
          iconBg="bg-blue-600"
          value={String(materialsList.length)}
          label="Total Catalog Items"
          delta="12 categories"
          isPositive={true}
        />
        <StatCard
          icon={Layers}
          iconBg="bg-emerald-600"
          value="₹3.42 Cr"
          label="Total Inventory Valuation"
          delta="Across 4 sites"
          isPositive={true}
        />
        <StatCard
          icon={AlertTriangle}
          iconBg="bg-amber-500"
          value={String(materialsList.filter(m => m.status === 'Low Stock').length)}
          label="Low Stock Alerts"
          delta="Immediate PR required"
          isPositive={false}
        />
        <StatCard
          icon={PackageCheck}
          iconBg="bg-purple-600"
          value="98.2%"
          label="Stock Accuracy Rate"
          delta="Verified in last audit"
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
        searchPlaceholder="Search material name, SKU, category..."
        filters={filterConfigs}
        filterValues={{ category: categoryFilter }}
        onFilterChange={(_, val) => setCategoryFilter(val)}
        onReset={() => {
          setSearchQuery('');
          setCategoryFilter('');
        }}
      />

      {/* Main Grid: Data Table + Detail Drawer */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={filteredMaterials}
            selectedRowId={selectedMaterial?.id}
            onRowClick={(row) => {
              setSelectedMaterial(row);
              setIsDetailOpen(true);
            }}
            entityName="materials"
          />
        </div>

        {/* Right Detail Panel */}
        {selectedMaterial && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedMaterial.name}
            subtitle={`${selectedMaterial.sku} • ${selectedMaterial.brand}`}
            statusBadge={<StatusBadge status={selectedMaterial.status} />}
            tabs={[
              { id: 'stock', label: 'Stock Overview' },
              { id: 'suppliers', label: 'Suppliers' }
            ]}
            quickActions={
              <>
                <button
                  onClick={() => {
                    addToast({ title: 'Create PR', message: `Generating Purchase Request for ${selectedMaterial.name}...`, type: 'success' });
                    onNavigate('purchase_orders');
                  }}
                  className="py-2 px-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Plus size={12} />
                  <span>Create PR</span>
                </button>
                <button
                  onClick={() => addToast({ title: 'Stock Transfer', message: `Transferring ${selectedMaterial.name} between site warehouses`, type: 'info' })}
                  className="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <ArrowUpDown size={12} />
                  <span>Transfer Stock</span>
                </button>
              </>
            }
          >
            {() => (
              <div className="space-y-3.5 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Available Quantity</span>
                    <span className="font-extrabold text-blue-600 text-sm">{selectedMaterial.stock} {selectedMaterial.unit}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-400">Standard Rate:</span>
                    <span className="font-bold text-slate-800">{formatCurrencyINR(selectedMaterial.rate)} / {selectedMaterial.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">GST Rate:</span>
                    <span className="font-semibold text-slate-700">{selectedMaterial.gst}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Min Threshold:</span>
                    <span className="font-semibold text-slate-700">{selectedMaterial.minStock} {selectedMaterial.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Capacity:</span>
                    <span className="font-semibold text-slate-700">{selectedMaterial.maxStock} {selectedMaterial.unit}</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Storage & Primary Supplier</span>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Storage Location:</span>
                    <span className="font-semibold text-slate-800">{selectedMaterial.location}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Primary Vendor:</span>
                    <span className="font-semibold text-slate-800">{selectedMaterial.supplier}</span>
                  </div>
                </div>
              </div>
            )}
          </DetailDrawerPanel>
        )}
      </div>

      {/* Add Material Responsive Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <Boxes size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Add Material to Inventory</h3>
                  <p className="text-[11px] text-slate-500">Record new stock item and min/max threshold</p>
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
            <form onSubmit={handleCreateMaterial} className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Material / Item Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TMT Steel Rebar Fe550D (16mm)"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Cement & Concrete">Cement & Concrete</option>
                    <option value="Steel & Metals">Steel & Metals</option>
                    <option value="Masonry">Masonry</option>
                    <option value="Aggregates">Aggregates</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Paints & Chemicals">Paints & Chemicals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    SKU / Item Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. STL-TMT-16"
                    value={newMaterial.sku}
                    onChange={(e) => setNewMaterial({ ...newMaterial, sku: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Unit of Measurement (UOM)
                  </label>
                  <select
                    value={newMaterial.unit}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Bags">Bags (50 kg)</option>
                    <option value="MT">Metric Ton (MT)</option>
                    <option value="Cu.m">Cubic Meter (Cu.m)</option>
                    <option value="CFT">Cubic Feet (CFT)</option>
                    <option value="Nos">Pieces / Nos</option>
                    <option value="Liters">Liters</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Unit Price / Rate (INR)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 380"
                    value={newMaterial.unitPrice}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unitPrice: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Initial Stock Count
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 150"
                    value={newMaterial.currentStock}
                    onChange={(e) => setNewMaterial({ ...newMaterial, currentStock: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Min Reorder Threshold
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 30"
                    value={newMaterial.minStock}
                    onChange={(e) => setNewMaterial({ ...newMaterial, minStock: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Supplier
                  </label>
                  <select
                    value={newMaterial.supplier}
                    onChange={(e) => setNewMaterial({ ...newMaterial, supplier: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="UltraTech Cement Ltd.">UltraTech Cement Ltd.</option>
                    <option value="Tata Steel Tiscon">Tata Steel Tiscon</option>
                    <option value="Jaipur Aggregates & Stone Crusher">Jaipur Aggregates & Stone Crusher</option>
                    <option value="Birla White Putty">Birla White Putty</option>
                    <option value="Asian Paints Ltd.">Asian Paints Ltd.</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Storage Yard / Warehouse Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Site Warehouse A, Rack 04"
                    value={newMaterial.location}
                    onChange={(e) => setNewMaterial({ ...newMaterial, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
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
                  <span>Save Material</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
