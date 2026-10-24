import React, { useState } from 'react';
import {
  Building2,
  Users,
  Plus,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Edit2,
  MoreVertical,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  FileText,
  X
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
import { clientsData } from '../../data/mockData';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function ClientsListView({ onAddNew, onNavigate }) {
  const { addToast } = useToast();
  const [clientsList, setClientsList] = useState(clientsData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [selectedClient, setSelectedClient] = useState(clientsData[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [newClient, setNewClient] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: 'Commercial Construction',
    location: '',
    gst: '',
    type: 'Corporate',
    projectsCount: 1,
    totalBilled: ''
  });

  const handleCreateClient = (e) => {
    e.preventDefault();
    if (!newClient.name.trim() || !newClient.contactPerson.trim()) {
      addToast({
        title: 'Required Information Missing',
        message: 'Please provide both Company Name and Contact Person.',
        type: 'error'
      });
      return;
    }

    const created = {
      id: `CLT-2026-${String(clientsList.length + 1).padStart(3, '0')}`,
      name: newClient.name.trim(),
      contactPerson: newClient.contactPerson.trim(),
      email: newClient.email.trim() || 'contact@client.com',
      phone: newClient.phone.trim() || '+91 98290 12345',
      industry: newClient.industry,
      location: newClient.location.trim() || 'Jaipur, Rajasthan',
      gst: newClient.gst.trim() || '08AAACR1234E1Z1',
      status: 'Active',
      type: newClient.type,
      projectsCount: parseInt(newClient.projectsCount) || 1,
      totalBilled: parseFloat(newClient.totalBilled) || 18000000,
      outstanding: 0,
      logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?w=100&auto=format&fit=crop&q=80'
    };

    setClientsList([created, ...clientsList]);
    setSelectedClient(created);
    setIsAddModalOpen(false);
    setNewClient({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      industry: 'Commercial Construction',
      location: '',
      gst: '',
      type: 'Corporate',
      projectsCount: 1,
      totalBilled: ''
    });
    addToast({
      title: 'Client Registered',
      message: `${created.name} registered and added to accounts directory.`,
      type: 'success'
    });
  };

  const statusTabs = [
    { id: 'all', label: 'All Clients', count: clientsList.length },
    { id: 'active', label: 'Active Clients', count: clientsList.filter(c => c.status === 'Active').length },
    { id: 'enterprise', label: 'Enterprise', count: clientsList.filter(c => c.type === 'Enterprise').length },
    { id: 'review', label: 'Under Review', count: 4 }
  ];

  const filterConfigs = [
    {
      id: 'industry',
      label: 'Industry',
      options: ['Real Estate & Infrastructure', 'Commercial Construction', 'Residential & Commercial']
    }
  ];

  const filteredClients = clientsList.filter(client => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = client.name.toLowerCase().includes(q) ||
                    client.contactPerson.toLowerCase().includes(q) ||
                    client.email.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeTab === 'active' && client.status.toLowerCase() !== 'active') return false;
    if (activeTab === 'enterprise' && client.type.toLowerCase() !== 'enterprise') return false;
    if (industryFilter && client.industry !== industryFilter) return false;
    return true;
  });

  const columns = [
    {
      header: 'Company Name',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img src={row.logo} alt={row.name} className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 shrink-0" />
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
            <p className="text-[10px] text-slate-500">{row.id} • {row.type}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Industry',
      key: 'industry',
      render: (row) => <span className="font-medium text-slate-700">{row.industry}</span>
    },
    {
      header: 'Primary Contact',
      key: 'contactPerson',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-900">{row.contactPerson}</p>
          <p className="text-[10px] text-slate-500">{row.designation}</p>
        </div>
      )
    },
    {
      header: 'Contact Info',
      key: 'phone',
      render: (row) => (
        <div>
          <p className="text-slate-800 font-medium">{row.phone}</p>
          <p className="text-[10px] text-slate-400">{row.email}</p>
        </div>
      )
    },
    {
      header: 'Projects',
      key: 'projectsCount',
      align: 'center',
      render: (row) => (
        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
          {row.projectsCount}
        </span>
      )
    },
    {
      header: 'Total Value',
      key: 'totalValue',
      align: 'right',
      render: (row) => <span className="font-extrabold text-slate-900">{formatCurrencyINR(row.totalValue, true)}</span>
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
              onNavigate('contacts');
            }}
            className="p-1 hover:text-blue-600 rounded"
            title="View Details"
          >
            <Users size={13} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddNew();
            }}
            className="p-1 hover:text-slate-800 rounded"
            title="Edit Client"
          >
            <Edit2 size={13} />
          </button>
        </div>
      )
    }
  ];

  const industryDist = [
    { name: 'Real Estate & Infra', value: 45, color: '#1D5DF0' },
    { name: 'Commercial', value: 30, color: '#F97316' },
    { name: 'Residential', value: 15, color: '#16A34A' },
    { name: 'Industrial', value: 10, color: '#7C3AED' }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Header */}
      <HeroBanner
        title="Clients Management"
        subtitle="Manage client accounts, view active contracts, related projects and payment statuses."
        actionButton={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Client</span>
          </button>
        }
      />

      {/* 4 StatCards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <StatCard
          icon={Building2}
          iconBg="bg-blue-600"
          value={String(clientsList.length)}
          label="Total Clients"
          delta="18% this month"
          isPositive={true}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-600"
          value={String(clientsList.filter(c => c.status === 'Active').length)}
          label="Active Clients"
          delta="12% this month"
          isPositive={true}
        />
        <StatCard
          icon={DollarSign}
          iconBg="bg-purple-600"
          value="₹86.4 Cr"
          label="Total Portfolio Value"
          delta="24% this year"
          isPositive={true}
        />
        <StatCard
          icon={TrendingUp}
          iconBg="bg-orange-500"
          value="16"
          label="Enterprise Partners"
          delta="3 new this quarter"
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
        searchPlaceholder="Search client name, contact, email..."
        filters={filterConfigs}
        filterValues={{ industry: industryFilter }}
        onFilterChange={(_, val) => setIndustryFilter(val)}
        onReset={() => {
          setSearchQuery('');
          setIndustryFilter('');
        }}
      />

      {/* Main Grid: Data Table + Detail Drawer */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={filteredClients}
            selectedRowId={selectedClient?.id}
            onRowClick={(row) => {
              setSelectedClient(row);
              setIsDetailOpen(true);
            }}
            entityName="clients"
          />
        </div>

        {/* Right Detail Panel */}
        {selectedClient && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedClient.name}
            subtitle={`${selectedClient.id} • ${selectedClient.industry}`}
            avatar={selectedClient.logo}
            statusBadge={<StatusBadge status={selectedClient.status} />}
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'projects', label: 'Projects' },
              { id: 'finance', label: 'Financial' }
            ]}
            quickActions={
              <>
                <button
                  onClick={() => {
                    addToast({ title: 'Projects Filter', message: `Showing projects for ${selectedClient.name}`, type: 'info' });
                    onNavigate('projects');
                  }}
                  className="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Building2 size={12} />
                  <span>View Projects</span>
                </button>
                <button
                  onClick={() => onAddNew()}
                  className="py-2 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Edit2 size={12} />
                  <span>Edit Client</span>
                </button>
              </>
            }
          >
            {(currentTab) => (
              <div className="space-y-3.5">
                {/* Contact Card */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Contact</span>
                    <button
                      onClick={() => addToast({ title: 'Calling', message: `Calling ${selectedClient.contactPerson} (${selectedClient.phone})`, type: 'info' })}
                      className="p-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <Phone size={12} />
                    </button>
                  </div>
                  <p className="font-bold text-slate-900 text-xs">{selectedClient.contactPerson} ({selectedClient.designation})</p>
                  <p className="text-slate-600 text-[11px]">{selectedClient.phone}</p>
                  <p className="text-slate-500 text-[11px]">{selectedClient.email}</p>
                  <p className="text-slate-400 text-[10px] pt-1 border-t border-slate-200">{selectedClient.address}</p>
                </div>

                {/* Tax & Financial Info */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tax & Financial Info</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">GSTIN</span>
                      <span className="font-semibold text-slate-800">{selectedClient.gst}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">PAN</span>
                      <span className="font-semibold text-slate-800">{selectedClient.pan}</span>
                    </div>
                    <div className="pt-1.5 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Credit Limit</span>
                      <span className="font-bold text-slate-900">{formatCurrencyINR(selectedClient.creditLimit)}</span>
                    </div>
                    <div className="pt-1.5 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Client Since</span>
                      <span className="font-semibold text-slate-700">{selectedClient.clientSince}</span>
                    </div>
                  </div>
                </div>

                {/* Portfolio Summary */}
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Portfolio Highlights</span>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-600">Total Active Projects:</span>
                    <span className="font-bold text-slate-900">{selectedClient.projectsCount} Projects</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Total Contract Value:</span>
                    <span className="font-extrabold text-blue-700">{formatCurrencyINR(selectedClient.totalValue, true)}</span>
                  </div>
                </div>
              </div>
            )}
          </DetailDrawerPanel>
        )}
      </div>

      {/* Bottom Chart Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Clients by Industry</h3>
          <div className="relative h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={industryDist} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                  {industryDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-base font-extrabold text-slate-900 leading-none">124</span>
              <span className="text-[9px] text-slate-400 font-medium">Clients</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100">
            {industryDist.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Quick Client Actions</h3>
            <p className="text-xs text-slate-500 mt-1">Frequently used operations for account management.</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5 my-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 text-left transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
                <Building2 size={15} />
              </div>
              <p className="font-bold text-slate-900 text-xs">Register New Client</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Add tax & contact records</p>
            </button>
            <button
              onClick={() => onNavigate('contracts')}
              className="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 text-left transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
                <FileText size={15} />
              </div>
              <p className="font-bold text-slate-900 text-xs">Review Contracts</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Check milestone agreements</p>
            </button>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
            💡 Pro tip: Client code is automatically attached to project billing and PO verification.
          </div>
        </div>
      </div>

      {/* Add Client Responsive Modal Form */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Register Client</h3>
                  <p className="text-[11px] text-slate-500">Create client profile and commercial contract records</p>
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
            <form onSubmit={handleCreateClient} className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company / Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Infra & Developers Ltd."
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Meena"
                    value={newClient.contactPerson}
                    onChange={(e) => setNewClient({ ...newClient, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Account Classification
                  </label>
                  <select
                    value={newClient.type}
                    onChange={(e) => setNewClient({ ...newClient, type: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Corporate">Corporate</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Government">Government / PSU</option>
                    <option value="Individual">Individual Developer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="contact@client.com"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98290 12345"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Industry Sector
                  </label>
                  <select
                    value={newClient.industry}
                    onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Real Estate & Infrastructure">Real Estate & Infrastructure</option>
                    <option value="Commercial Construction">Commercial Construction</option>
                    <option value="Residential & Commercial">Residential & Commercial</option>
                    <option value="Industrial Turnkey">Industrial Turnkey</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    GSTIN / Tax ID
                  </label>
                  <input
                    type="text"
                    placeholder="08AAACR1234E1Z1"
                    value={newClient.gst}
                    onChange={(e) => setNewClient({ ...newClient, gst: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Office Address & City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. C-Scheme, Jaipur, Rajasthan"
                    value={newClient.location}
                    onChange={(e) => setNewClient({ ...newClient, location: e.target.value })}
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
                  <span>Register Client</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
